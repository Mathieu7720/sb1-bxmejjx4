import React from 'react';
import { Truck, Clock, Shield } from 'lucide-react';
import { features } from '../data/features';

export default function Hero() {
  return (
    <div className="relative bg-gray-900 text-white min-h-screen" role="banner">
      {/* Enhanced Navigation Bar with Larger Logo */}
      <nav className="absolute top-0 left-0 right-0 z-10 bg-black/80 backdrop-blur-lg border-b border-white/10" role="navigation" aria-label="Main navigation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            <div className="flex-shrink-0">
              <span className="text-4xl font-bold text-white" role="heading" aria-level="1">
                Mathieu Express
              </span>
            </div>
            <div>
              <a 
                href="#quote" 
                className="btn-3d px-8 py-3 text-white rounded-full font-semibold tracking-wide"
                role="button"
                aria-label="Get a quote"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Enhanced Hero Background with Overlay */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <img
          src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=2400&h=1200&q=100"
          alt="International Box Truck with Sleeper"
          className="w-full h-full object-cover"
          role="img"
        />
      </div>

      {/* Enhanced Hero Content with Much Larger Title */}
      <div className="relative max-w-7xl mx-auto px-4 py-32 sm:px-6 lg:px-8 pt-40">
        <div className="text-center hero-card space-y-12" role="region" aria-label="Welcome section">
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 inline-block mx-auto">
              <h1 className="text-7xl sm:text-8xl lg:text-9xl font-black tracking-tight text-white">
                MATHIEU
                <span className="block mt-2 text-green-400">EXPRESS</span>
              </h1>
              <p className="text-4xl sm:text-5xl font-bold text-white mt-4 tracking-widest">
                COURIER LLC
              </p>
            </div>
          </div>
          <p className="mt-8 text-2xl sm:text-3xl max-w-3xl mx-auto text-white font-light">
            Your trusted partner in professional delivery solutions
          </p>
          <div className="flex justify-center gap-6 mt-12" role="group" aria-label="Main actions">
            <a 
              href="#services" 
              className="btn-3d px-10 py-5 rounded-full font-bold tracking-wide text-xl"
              role="button"
              aria-label="View our services"
            >
              Our Services
            </a>
            <a 
              href="#quote" 
              className="px-10 py-5 rounded-full font-bold tracking-wide text-xl border-4 border-green-400 hover:bg-green-400 hover:text-white transition-all"
              role="button"
              aria-label="Get a quote"
            >
              Get Quote
            </a>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-1 gap-8 md:grid-cols-3" role="list" aria-label="Key features">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="feature-card p-8 rounded-xl backdrop-blur-lg bg-white/10 text-center space-y-4"
              role="listitem"
              aria-label={feature.title}
              style={{ 
                animationDelay: `${index * 0.2}s`,
                animation: 'float 6s ease-in-out infinite'
              }}
            >
              <feature.icon className="w-16 h-16 mx-auto text-green-400" aria-hidden="true" />
              <h3 className="text-2xl font-bold text-white">{feature.title}</h3>
              <p className="text-gray-300 text-lg">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}