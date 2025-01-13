import React from 'react';
import SocialLinks from './SocialLinks';
import { Phone, Mail, MessageCircle, Clock, Calendar } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="bg-gray-800/50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Mail className="w-5 h-5 text-green-400" />
              Contact Us
            </h3>
            <div className="space-y-4">
              <div className="hover:text-green-400 transition-colors">
                <span className="text-gray-400 text-sm">Email:</span>
                <a 
                  href="mailto:Mathieu772@mathieuexpresscourierllc.com" 
                  className="text-sm break-all hover:text-green-400"
                >
                  Mathieu772@mathieuexpresscourierllc.com
                </a>
              </div>
              <div className="hover:text-green-400 transition-colors">
                <span className="text-gray-400 text-sm">Phone:</span><br />
                <a href="tel:+17707768436" className="text-lg hover:text-green-400">
                  (770) 776-8436
                </a>
              </div>
              <a 
                href="https://wa.me/17726210049"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors mt-2 w-full justify-center"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Quick Response
              </a>
            </div>
          </div>
          
          <div className="bg-gray-800/50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-green-400" />
              Business Hours
            </h3>
            <div className="space-y-4">
              <div className="bg-gray-700/50 p-3 rounded-md">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-green-400 mt-1" />
                  <div>
                    <p className="font-semibold text-green-400">24/7 Service</p>
                    <p className="text-gray-400">Always Available</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-700/50 p-3 rounded-md">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-green-400 mt-1" />
                  <div>
                    <p className="font-semibold text-green-400">Office Hours</p>
                    <p className="text-gray-400">Monday - Friday</p>
                    <p className="text-gray-400">9:00 AM - 5:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800/50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#services" className="hover:text-green-400 transition-colors block p-2 rounded-md bg-gray-700/50">Services</a>
              </li>
              <li>
                <a href="#quote" className="hover:text-green-400 transition-colors block p-2 rounded-md bg-gray-700/50">Get Quote</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-green-400 transition-colors block p-2 rounded-md bg-gray-700/50">Contact</a>
              </li>
            </ul>
          </div>
          
          <div className="bg-gray-800/50 p-6 rounded-lg">
            <SocialLinks />
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p>&copy; {new Date().getFullYear()} Mathieu Express Courier LLC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}