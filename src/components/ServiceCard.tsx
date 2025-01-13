import React from 'react';
import type { Service } from '../data/services';

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const Icon = service.icon;
  
  return (
    <div 
      className="service-card p-8 rounded-xl hover:scale-105 transition-all duration-300"
      role="article"
      aria-labelledby={`service-title-${service.title}`}
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 rounded-lg bg-green-100" aria-hidden="true">
          <Icon className="w-8 h-8 text-green-600" />
        </div>
        <h3 id={`service-title-${service.title}`} className="text-2xl font-bold text-gray-800">
          {service.title}
        </h3>
      </div>
      <p className="text-gray-600 mb-6 text-lg">{service.description}</p>
      {service.features && (
        <ul className="space-y-3" role="list" aria-label={`${service.title} features`}>
          {service.features.map((feature, index) => (
            <li 
              key={index} 
              className="flex items-center gap-3 text-gray-700"
              role="listitem"
            >
              <span className="w-2 h-2 bg-green-500 rounded-full" aria-hidden="true"></span>
              <span className="text-base">{feature}</span>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-6 pt-6 border-t border-gray-100">
        <a 
          href="#quote" 
          className="btn-3d inline-block w-full text-center py-3 rounded-lg text-white font-semibold"
          role="button"
          aria-label={`Get quote for ${service.title}`}
        >
          Get Quote
        </a>
      </div>
    </div>
  );
}