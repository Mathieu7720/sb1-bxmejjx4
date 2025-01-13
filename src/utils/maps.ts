import { Loader } from '@googlemaps/js-api-loader';

// Create a singleton loader instance
const loader = new Loader({
  apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  version: "weekly",
  libraries: ["places", "geometry", "distance-matrix"],
  retries: 0 // Disable built-in retries as we'll handle them ourselves
});

let googleMapsPromise: Promise<typeof google> | null = null;

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const loadGoogleMaps = async (retryCount = 0): Promise<typeof google> => {
  if (!googleMapsPromise) {
    googleMapsPromise = (async () => {
      try {
        return await loader.load();
      } catch (error) {
        googleMapsPromise = null;
        if (retryCount < 3) {
          const waitTime = Math.min(1000 * Math.pow(2, retryCount), 10000);
          await delay(waitTime);
          return loadGoogleMaps(retryCount + 1);
        }
        throw new Error('Failed to load Google Maps after multiple attempts');
      }
    })();
  }
  return googleMapsPromise;
};

const validateAddress = (address: string): boolean => {
  return address.trim().length > 0 && 
         /^[a-zA-Z0-9\s,.-]+$/.test(address);
};

export const calculateDistance = async (origin: string, destination: string): Promise<number> => {
  if (!origin || !destination) {
    throw new Error('Both origin and destination addresses are required');
  }

  if (!validateAddress(origin) || !validateAddress(destination)) {
    throw new Error('Invalid address format');
  }

  try {
    const google = await loadGoogleMaps();
    const service = new google.maps.DistanceMatrixService();
    
    const response = await new Promise<google.maps.DistanceMatrixResponse>((resolve, reject) => {
      service.getDistanceMatrix({
        origins: [origin],
        destinations: [destination],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.IMPERIAL,
        avoidHighways: false,
        avoidTolls: false
      }, (result, status) => {
        if (status === 'OK') {
          resolve(result);
        } else {
          reject(new Error(`Distance Matrix failed: ${status}`));
        }
      });
    });

    const element = response.rows?.[0]?.elements?.[0];
    
    if (!element || element.status !== 'OK' || !element.distance) {
      throw new Error('Could not calculate distance between these locations');
    }

    const miles = Math.round((element.distance.value / 1609.34) * 100) / 100;
    
    if (miles <= 0) {
      throw new Error('Invalid distance calculated');
    }

    return miles;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Distance calculation failed: ${error.message}`);
    }
    throw new Error('Unable to calculate distance. Please verify the addresses and try again.');
  }
};