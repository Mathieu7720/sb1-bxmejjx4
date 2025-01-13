import React, { useEffect, useRef } from 'react';
import { DollarSign, MapPin, User2, Phone, Mail, Building2, Image, Wallet, ExternalLink, Copy, CheckCircle2 } from 'lucide-react';

interface PriceDisplayProps {
  quote: number;
  customer: {
    type: 'individual' | 'business';
    fullName: string;
    email: string;
    phone: string;
    businessName?: string;
    dotNumber?: string;
    mcNumber?: string;
    serviceType: string;
  };
  pickup: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  delivery: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  isJunkRemoval: boolean;
  photos: string[];
}

declare global {
  interface Window {
    paypal?: any;
  }
}

export default function PriceDisplay({ 
  quote, 
  customer,
  pickup,
  delivery,
  isJunkRemoval,
  photos
}: PriceDisplayProps) {
  const [copiedField, setCopiedField] = React.useState<string | null>(null);
  const paypalButtonRef = useRef<HTMLDivElement>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  const paypalEmail = "sainvilmemathieu31@gmail.com";
  const zelleEmail = "sainvilmemathieu31@gmail.com";
  const paypalUrl = 'https://paypal.me/sainvilmemathieu31';
  const paypalQrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(paypalUrl)}`;
  const zelleQrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(zelleEmail)}`;

  useEffect(() => {
    let isMounted = true;

    const loadPayPalScript = async () => {
      // Remove any existing PayPal script
      if (scriptRef.current) {
        scriptRef.current.remove();
      }

      // Clear the PayPal button container
      if (paypalButtonRef.current) {
        paypalButtonRef.current.innerHTML = '';
      }

      // Create and load new PayPal script
      const script = document.createElement('script');
      script.src = `https://www.paypal.com/sdk/js?client-id=${import.meta.env.VITE_PAYPAL_CLIENT_ID}&currency=USD`;
      script.async = true;
      scriptRef.current = script;

      return new Promise<void>((resolve, reject) => {
        script.onload = () => resolve();
        script.onerror = () => reject();
        document.body.appendChild(script);
      });
    };

    const initializePayPalButton = async () => {
      try {
        await loadPayPalScript();

        if (!isMounted || !window.paypal || !paypalButtonRef.current) return;

        window.paypal.Buttons({
          style: {
            layout: 'vertical',
            color: 'blue',
            shape: 'rect',
            label: 'paypal'
          },
          createOrder: (_data: any, actions: any) => {
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: quote.toFixed(2),
                  currency_code: 'USD'
                },
                description: `${customer.serviceType} Service - ${customer.fullName}`
              }]
            });
          },
          onApprove: async (_data: any, actions: any) => {
            try {
              const order = await actions.order.capture();
              alert('Payment completed! Order ID: ' + order.id);
            } catch (error) {
              console.error('Payment capture failed:', error);
              alert('There was an error processing your payment. Please try again.');
            }
          },
          onError: (err: any) => {
            console.error('PayPal Error:', err);
            alert('There was an error processing your payment. Please try again.');
          }
        }).render(paypalButtonRef.current);
      } catch (error) {
        console.error('PayPal initialization failed:', error);
      }
    };

    initializePayPalButton();

    return () => {
      isMounted = false;
      if (scriptRef.current) {
        scriptRef.current.remove();
        scriptRef.current = null;
      }
    };
  }, [quote, customer.serviceType, customer.fullName]);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="mt-8 p-8 bg-gray-50 rounded-xl space-y-6">
      {/* Quote Summary Section */}
      <div className="space-y-6">
        <h4 className="text-2xl font-bold">Quote Summary</h4>
        
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <p className="text-3xl font-bold flex items-center gap-2 text-green-600">
            <DollarSign className="w-8 h-8" />
            ${quote.toFixed(2)}
          </p>
          <p className="text-gray-500 mt-2">
            {isJunkRemoval ? 'Base price for junk removal - Final price may vary based on volume' : 'Based on distance calculation'}
          </p>
        </div>

        {/* Payment Methods Section */}
        <div className="space-y-4">
          <h4 className="text-2xl font-bold flex items-center gap-2">
            <Wallet className="w-6 h-6 text-green-600" />
            Payment Methods
          </h4>
          
          {/* PayPal Smart Payment Button */}
          <div className="relative overflow-hidden group bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 transition-all duration-300 hover:shadow-lg">
            <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 bg-[#0070ba] rounded-full opacity-10"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">💳</span>
                <div>
                  <h6 className="font-bold text-lg">PayPal</h6>
                  <p className="text-sm text-gray-600">Secure payment with PayPal protection</p>
                </div>
              </div>
              <div ref={paypalButtonRef} className="max-w-md mx-auto"></div>
            </div>
          </div>

          {/* Zelle Payment */}
          <div className="relative overflow-hidden group bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6 transition-all duration-300 hover:shadow-lg">
            <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 bg-purple-600 rounded-full opacity-10"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">💸</span>
                  <div>
                    <h6 className="font-bold text-lg">Zelle</h6>
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-gray-600">{zelleEmail}</p>
                      <button
                        onClick={() => handleCopy(zelleEmail, 'zelle')}
                        className="text-purple-600 hover:text-purple-700"
                        title="Copy Zelle email"
                      >
                        {copiedField === 'zelle' ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <div className="bg-white bg-opacity-50 rounded-lg p-3">
                  <p className="text-sm text-gray-600 mb-2">
                    Send payment via Zelle using the email or scan QR code
                  </p>
                  <p className="text-xs text-gray-500">
                    Instant transfer with no additional fees
                  </p>
                </div>
                <div className="flex justify-center">
                  <img
                    src={zelleQrCodeUrl}
                    alt="Zelle QR Code"
                    className="w-32 h-32 bg-white p-2 rounded-lg shadow-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}