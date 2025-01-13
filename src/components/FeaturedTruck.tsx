import React from 'react';
import { Truck, Star, Shield } from 'lucide-react';

export default function FeaturedTruck() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">Our Premium Fleet</h2>
          <p className="text-lg text-gray-600">
            Experience reliable delivery with our modern fleet of International box trucks. 
            Each vehicle is equipped with state-of-the-art technology and maintained to the 
            highest standards.
          </p>
          <ul className="space-y-4">
            <li className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-green-600" />
              <span>Modern International box trucks with sleeper cabs</span>
            </li>
            <li className="flex items-center gap-2">
              <Star className="w-5 h-5 text-green-600" />
              <span>Regular maintenance and safety inspections</span>
            </li>
            <li className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-600" />
              <span>GPS tracking and real-time updates</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}