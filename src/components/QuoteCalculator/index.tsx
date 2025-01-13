import React, { useState, useRef } from 'react';
import { Calculator, MapPin, Loader, Upload, Building2, User2, Camera } from 'lucide-react';
import { calculateDistance } from '../../utils/maps';
import { calculateDeliveryCost } from '../../utils/pricing';
import PriceDisplay from './PriceDisplay';
import { US_STATES } from '../../utils/states';
import { services } from '../../data/services';

interface AddressDetails {
  street: string;
  city: string;
  state: string;
  zip: string;
}

interface CustomerDetails {
  type: 'individual' | 'business';
  fullName: string;
  email: string;
  phone: string;
  businessName?: string;
  dotNumber?: string;
  mcNumber?: string;
  serviceType: string;
  photos: File[];
}

export default function QuoteCalculator() {
  const [customerType, setCustomerType] = useState<'individual' | 'business'>('individual');
  const [customer, setCustomer] = useState<CustomerDetails>({
    type: 'individual',
    fullName: '',
    email: '',
    phone: '',
    businessName: '',
    dotNumber: '',
    mcNumber: '',
    serviceType: services[0].title,
    photos: []
  });

  const [pickup, setPickup] = useState<AddressDetails>({
    street: '',
    city: '',
    state: '',
    zip: ''
  });

  const [delivery, setDelivery] = useState<AddressDetails>({
    street: '',
    city: '',
    state: '',
    zip: ''
  });

  const [loading, setLoading] = useState(false);
  const [quote, setQuote] = useState<number | null>(null);
  const [error, setError] = useState<string>('');
  const [photoPreview, setPhotoPreview] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showCamera, setShowCamera] = useState(false);

  // Rest of the component remains the same...
  // All the existing functions and JSX stay unchanged
  const isPhotoRequired = ['Junk Removal', 'Towing Services'].includes(customer.serviceType);

  const validateAddress = (address: AddressDetails) => {
    if (!Object.values(address).every(value => value.trim())) {
      return false;
    }

    const zipRegex = /^\d{5}(-\d{4})?$/;
    if (!zipRegex.test(address.zip)) {
      setError('Please enter a valid ZIP code (e.g., 12345 or 12345-6789)');
      return false;
    }

    return true;
  };

  const handleCustomerTypeChange = (type: 'individual' | 'business') => {
    setCustomerType(type);
    setCustomer(prev => ({
      ...prev,
      type,
      businessName: type === 'individual' ? '' : prev.businessName,
      dotNumber: type === 'individual' ? '' : prev.dotNumber,
      mcNumber: type === 'individual' ? '' : prev.mcNumber
    }));
    setError('');
    setQuote(null);
  };

  const handleCustomerChange = (field: keyof CustomerDetails, value: string) => {
    setCustomer(prev => ({ ...prev, [field]: value }));
    setError('');
    setQuote(null);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const validFiles = files.filter(file => {
        if (file.size > 5 * 1024 * 1024) {
          setError('Each image must be less than 5MB');
          return false;
        }
        return true;
      });

      const newPreviews = validFiles.map(file => URL.createObjectURL(file));
      setPhotoPreview(prev => [...prev, ...newPreviews]);
      setCustomer(prev => ({
        ...prev,
        photos: [...prev.photos, ...validFiles]
      }));
      setError('');
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setShowCamera(true);
      }
    } catch (err) {
      setError('Unable to access camera. Please try uploading photos instead.');
    }
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext('2d')?.drawImage(videoRef.current, 0, 0);
      
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], `photo-${Date.now()}.jpg`, { type: 'image/jpeg' });
          const preview = URL.createObjectURL(blob);
          setPhotoPreview(prev => [...prev, preview]);
          setCustomer(prev => ({
            ...prev,
            photos: [...prev.photos, file]
          }));
        }
      }, 'image/jpeg');

      // Stop camera after capturing
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      setShowCamera(false);
    }
  };

  const handleAddressChange = (
    type: 'pickup' | 'delivery',
    field: keyof AddressDetails,
    value: string
  ) => {
    if (type === 'pickup') {
      setPickup(prev => ({ ...prev, [field]: value }));
    } else {
      setDelivery(prev => ({ ...prev, [field]: value }));
    }
    setError('');
    setQuote(null);
  };

  const validateForm = () => {
    if (!customer.fullName || !customer.email || !customer.phone) {
      setError('Please fill in all customer details');
      return false;
    }
    if (customerType === 'business' && (!customer.businessName || !customer.dotNumber)) {
      setError('Please fill in all required business details (Business Name and DOT Number)');
      return false;
    }
    if (!validateAddress(pickup)) {
      setError('Please fill in all pickup address fields');
      return false;
    }
    if (customer.serviceType !== 'Junk Removal' && !validateAddress(delivery)) {
      setError('Please fill in all delivery address fields');
      return false;
    }
    if (isPhotoRequired && customer.photos.length === 0) {
      setError('Please upload at least one photo');
      return false;
    }
    return true;
  };

  const formatAddress = (addr: AddressDetails) => {
    return `${addr.street}, ${addr.city}, ${addr.state} ${addr.zip}`;
  };

  const calculateQuote = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      if (customer.serviceType === 'Junk Removal') {
        const basePrice = 150;
        setQuote(basePrice);
      } else {
        const pickupStr = formatAddress(pickup);
        const deliveryStr = formatAddress(delivery);
        
        const miles = await calculateDistance(pickupStr, deliveryStr);
        
        if (miles <= 0) {
          throw new Error('Invalid distance calculated. Please check your addresses.');
        }
        
        const cost = calculateDeliveryCost(miles);
        setQuote(cost);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Please verify the addresses and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="quote-form bg-white p-8 rounded-xl shadow-xl max-w-4xl w-full">
      <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
        <Calculator className="w-6 h-6 text-green-600" />
        Get Shipping Quote
      </h3>

      {/* Customer Type Selection */}
      <div className="mb-8">
        <div className="flex gap-4">
          <button
            onClick={() => handleCustomerTypeChange('individual')}
            className={`flex-1 p-4 rounded-lg flex items-center justify-center gap-2 ${
              customerType === 'individual'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <User2 className="w-5 h-5" />
            Individual
          </button>
          <button
            onClick={() => handleCustomerTypeChange('business')}
            className={`flex-1 p-4 rounded-lg flex items-center justify-center gap-2 ${
              customerType === 'business'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Building2 className="w-5 h-5" />
            Business
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {/* Customer Details */}
        <div className="space-y-4">
          <h4 className="font-semibold text-lg">Customer Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              value={customer.fullName}
              onChange={(e) => handleCustomerChange('fullName', e.target.value)}
              placeholder="Full Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
            />
            <input
              type="email"
              value={customer.email}
              onChange={(e) => handleCustomerChange('email', e.target.value)}
              placeholder="Email Address"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
            />
            <input
              type="tel"
              value={customer.phone}
              onChange={(e) => handleCustomerChange('phone', e.target.value)}
              placeholder="Phone Number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
            />
            <select
              value={customer.serviceType}
              onChange={(e) => handleCustomerChange('serviceType', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
            >
              {services.map(service => (
                <option key={service.title} value={service.title}>
                  {service.title}
                </option>
              ))}
            </select>
          </div>

          {/* Business-specific fields */}
          {customerType === 'business' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                value={customer.businessName}
                onChange={(e) => handleCustomerChange('businessName', e.target.value)}
                placeholder="Business Name *"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              />
              <input
                type="text"
                value={customer.dotNumber}
                onChange={(e) => handleCustomerChange('dotNumber', e.target.value)}
                placeholder="DOT Number *"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              />
              <input
                type="text"
                value={customer.mcNumber}
                onChange={(e) => handleCustomerChange('mcNumber', e.target.value)}
                placeholder="MC Number (Optional)"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              />
            </div>
          )}
        </div>

        {/* Pickup Address */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-green-600" />
            <h4 className="font-semibold text-lg">Pickup Address</h4>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              value={pickup.street}
              onChange={(e) => handleAddressChange('pickup', 'street', e.target.value)}
              placeholder="Street Address"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
            />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <input
                type="text"
                value={pickup.city}
                onChange={(e) => handleAddressChange('pickup', 'city', e.target.value)}
                placeholder="City"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              />
              <select
                value={pickup.state}
                onChange={(e) => handleAddressChange('pickup', 'state', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Select State</option>
                {US_STATES.map(state => (
                  <option key={state.value} value={state.value}>
                    {state.label}
                  </option>
                ))}
              </select>
              <input
                type="text"
                value={pickup.zip}
                onChange={(e) => handleAddressChange('pickup', 'zip', e.target.value)}
                placeholder="ZIP Code"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>
        </div>

        {/* Delivery Address - Only show if not Junk Removal */}
        {customer.serviceType !== 'Junk Removal' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-green-600" />
              <h4 className="font-semibold text-lg">Delivery Address</h4>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <input
                type="text"
                value={delivery.street}
                onChange={(e) => handleAddressChange('delivery', 'street', e.target.value)}
                placeholder="Street Address"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              />
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  value={delivery.city}
                  onChange={(e) => handleAddressChange('delivery', 'city', e.target.value)}
                  placeholder="City"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                />
                <select
                  value={delivery.state}
                  onChange={(e) => handleAddressChange('delivery', 'state', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">Select State</option>
                  {US_STATES.map(state => (
                    <option key={state.value} value={state.value}>
                      {state.label}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  value={delivery.zip}
                  onChange={(e) => handleAddressChange('delivery', 'zip', e.target.value)}
                  placeholder="ZIP Code"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Photo Upload Section - Only show for Towing and Junk Removal */}
        {isPhotoRequired && (
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Upload Photos</h4>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
              <div className="flex flex-col items-center">
                <div className="flex gap-4 mb-6">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    <Upload className="w-5 h-5" />
                    Upload Photos
                  </button>
                  <button
                    onClick={startCamera}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <Camera className="w-5 h-5" />
                    Take Photo
                  </button>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                {showCamera && (
                  <div className="relative w-full max-w-md mb-4">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      className="w-full rounded-lg"
                    />
                    <button
                      onClick={capturePhoto}
                      className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      Capture
                    </button>
                  </div>
                )}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full mt-4">
                  {photoPreview.map((preview, index) => (
                    <div key={index} className="relative">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => {
                          setPhotoPreview(prev => prev.filter((_, i) => i !== index));
                          setCustomer(prev => ({
                            ...prev,
                            photos: prev.photos.filter((_, i) => i !== index)
                          }));
                        }}
                        className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {error && (
          <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">{error}</p>
        )}
        
        <button
          onClick={calculateQuote}
          disabled={loading}
          className="w-full py-4 px-6 rounded-lg font-semibold transition-all bg-green-600 hover:bg-green-700 text-white disabled:bg-green-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading && <Loader className="w-5 h-5 animate-spin" />}
          {loading ? 'Calculating...' : 'Calculate Quote'}
        </button>
        
        {quote !== null && (
          <PriceDisplay 
            quote={quote}
            customer={customer}
            pickup={pickup}
            delivery={delivery}
            isJunkRemoval={customer.serviceType === 'Junk Removal'}
            photos={photoPreview}
          />
        )}
      </div>
    </div>
  );
}