import { Truck, Package, Trash2, Wrench, Snowflake } from 'lucide-react';

export interface Service {
  title: string;
  description: string;
  icon: typeof Truck;
  features?: string[];
}

export const services: Service[] = [
  {
    title: 'Moving Services',
    description: 'Professional moving services for residential and commercial clients.',
    icon: Package,
    features: ['Professional packing', 'Safe transportation', 'On-time delivery']
  },
  {
    title: 'Warehousing & Transportation',
    description: 'Secure storage and reliable transportation solutions.',
    icon: Truck,
    features: ['Secure storage', 'Inventory management', 'Reliable delivery']
  },
  {
    title: 'Junk Removal',
    description: 'Efficient removal of residential and commercial waste.',
    icon: Trash2,
    features: ['Residential cleanup', 'Commercial debris', 'Eco-friendly disposal']
  },
  {
    title: 'Towing Services',
    description: '24/7 professional towing for all vehicle types.',
    icon: Wrench,
    features: ['24/7 emergency service', 'All vehicle types', 'Professional handling']
  },
  {
    title: 'Refrigerated Transport',
    description: 'Temperature-controlled transportation for perishable goods.',
    icon: Snowflake,
    features: ['Temperature control', 'Food safety compliance', 'Real-time monitoring']
  }
];