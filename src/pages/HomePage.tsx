import React from 'react';
import Hero from '../components/Hero';
import FeaturedTruck from '../components/FeaturedTruck';
import About from '../components/About';
import Services from '../components/Services';
import QuoteCalculator from '../components/QuoteCalculator/index';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FeaturedTruck />
        <About />
        <Services />
        <div id="quote" className="flex justify-center pb-16">
          <QuoteCalculator />
        </div>
      </main>
      <Footer />
    </div>
  );
}