import React from 'react';
import { History, Award, Users, Star } from 'lucide-react';

export default function About() {
  return (
    <section className="py-24 relative overflow-hidden" role="region" aria-label="About Us">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-green-50 opacity-50" aria-hidden="true"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4" id="about-heading">About Us</h2>
          <div className="w-24 h-1 bg-green-500 mx-auto rounded-full" aria-hidden="true"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <p className="text-xl text-gray-700 leading-relaxed">
              Welcome to Mathieu Express Courier, where excellence meets reliability. 
              With over 12 months of dedicated service in the trucking industry, 
              we've built our reputation on a foundation of trust, efficiency, and 
              unwavering commitment to customer satisfaction.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6" role="list" aria-label="Company highlights">
              <div className="glass p-6 rounded-xl space-y-4 hover:scale-105 transition-all duration-300" role="listitem">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-green-100" aria-hidden="true">
                    <History className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Experience</h3>
                    <p className="text-gray-600">12+ Months of Excellence</p>
                  </div>
                </div>
              </div>
              <div className="glass p-6 rounded-xl space-y-4 hover:scale-105 transition-all duration-300" role="listitem">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-green-100" aria-hidden="true">
                    <Award className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Quality</h3>
                    <p className="text-gray-600">Premium Service</p>
                  </div>
                </div>
              </div>
              <div className="glass p-6 rounded-xl space-y-4 hover:scale-105 transition-all duration-300" role="listitem">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-green-100" aria-hidden="true">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Clients</h3>
                    <p className="text-gray-600">Satisfied Customers</p>
                  </div>
                </div>
              </div>
              <div className="glass p-6 rounded-xl space-y-4 hover:scale-105 transition-all duration-300" role="listitem">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-green-100" aria-hidden="true">
                    <Star className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Service</h3>
                    <p className="text-gray-600">24/7 Support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative" aria-label="Company image">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600 rounded-xl transform rotate-3 scale-105" aria-hidden="true"></div>
            <div className="relative h-[500px] rounded-xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=2400&h=1600&q=100"
                alt="Professional Trucking Team"
                className="w-full h-full object-cover hover:scale-110 transition-all duration-700"
                role="img"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}