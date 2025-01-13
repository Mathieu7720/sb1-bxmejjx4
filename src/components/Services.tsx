import React from 'react';
import { services } from '../data/services';
import ServiceCard from './ServiceCard';

export default function Services() {
  return (
    <section id="services" className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900">Our Services</h2>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          At Mathieu Express Courier, we are proud to offer a comprehensive range of transportation 
          and logistics solutions designed to meet the diverse needs of our customers. These services 
          we provide are executed with the utmost professionalism, reliability, and care.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <ServiceCard key={index} service={service} />
        ))}
      </div>
    </section>
  );
}