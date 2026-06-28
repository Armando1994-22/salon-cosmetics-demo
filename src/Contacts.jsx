import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle } from 'lucide-react';

export default function ContactSection() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [clientName, setClientName] = useState('');

  const handleContactSubmit = (e) => {
    e.preventDefault();
    // Grab the name from the form event to personalize the message
    const formData = new FormData(e.target);
    setClientName(formData.get('name') || 'Client');
    setFormSubmitted(true);
  };

  return (
    <section className="max-w-6xl mx-auto my-16 px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Contact Details Grid */}
      <div className="md:col-span-1 space-y-6 bg-cardCharcoal/20 p-6 rounded-xl border border-stone-800/60 h-fit">
        <div>
          <h3 className="text-vanillaPetal font-serif text-lg font-bold mb-1">Get in Touch</h3>
          <p className="text-stone-500 text-xs">Have questions before booking? Reach out directly.</p>
        </div>
        <div className="space-y-4 text-xs text-stone-400">
          <div className="flex items-center gap-3">
            <MapPin size={16} className="text-roseAccent" />
            <span>123 Luxury Lane, Suite 400 • Cosmetics, World</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone size={16} className="text-roseAccent" />
            <span>+1 (234) 567-8910</span>
          </div>
          <div className="flex items-center gap-3">
            <Mail size={16} className="text-roseAccent" />
            <span>hello@vanillacosmetics.com</span>
          </div>
        </div>
      </div>

      {/* Interactive Contact Form Box */}
      <div className="md:col-span-2 bg-cardCharcoal p-6 rounded-xl border border-stone-800 shadow-md flex flex-col justify-center min-h-[320px]">
        {!formSubmitted ? (
          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1 font-bold">Your Name</label>
                <input 
                  type="text" 
                  name="name" 
                  required 
                  className="w-full bg-luxuryBlack border border-stone-800 rounded-lg p-2.5 text-stone-300 text-sm focus:outline-none focus:border-roseAccent/60" 
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1 font-bold">Email Address</label>
                <input 
                  type="email" 
                  required 
                  className="w-full bg-luxuryBlack border border-stone-800 rounded-lg p-2.5 text-stone-300 text-sm focus:outline-none focus:border-roseAccent/60" 
                />
              </div>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1 font-bold">Message</label>
              <textarea 
                rows="4" 
                required 
                className="w-full bg-luxuryBlack border border-stone-800 rounded-lg p-2.5 text-stone-300 text-sm focus:outline-none focus:border-roseAccent/60 resize-none"
              ></textarea>
            </div>
            <button 
              type="submit" 
              className="bg-stone-800 hover:bg-stone-700 text-vanillaPetal font-bold py-2.5 px-6 rounded-lg text-xs tracking-wider uppercase transition cursor-pointer"
            >
              Send Inquiry
            </button>
          </form>
        ) : (
          /* Elegant Portfolio Explainer Banner replacing the form layout */
          <div className="text-center p-6 bg-luxuryBlack/50 rounded-xl border border-roseAccent/20 animate-fadeIn">
            <div className="flex justify-center mb-3 text-roseAccent">
              <CheckCircle size={36} />
            </div>
            <h4 className="text-vanillaPetal font-serif text-lg font-bold mb-2">
              Message Sent! (Demo Notice)
            </h4>
            <div className="text-stone-400 text-xs sm:text-sm max-w-md mx-auto space-y-3 leading-relaxed">
              <p>
                Thank you, <span className="text-roseAccent font-bold">{clientName}</span>. Your mock message was processed successfully.
              </p>
              <div className="p-3 bg-cardCharcoal/80 rounded-lg border border-stone-800 text-[11px] text-stone-500 text-left">
                <span className="text-roseAccent font-bold uppercase block mb-1 tracking-wider text-[9px]">💡 Developer Portfolio Info:</span>
                In a production build, this submit trigger will immediately transmit an email or dashboard notification straight to the cosmetic clinic owner.
              </div>
            </div>
            <button 
              onClick={() => setFormSubmitted(false)}
              className="mt-6 text-xs text-stone-500 hover:text-roseAccent underline underline-offset-4 cursor-pointer"
            >
              Send another message
            </button>
          </div>
        )}
      </div>
    </section>
  );
}