import React, { useState, useEffect } from 'react';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the portfolio visitor has already clicked accept before
    const consent = localStorage.getItem('demo-cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('demo-cookie-consent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:max-w-md bg-cardCharcoal border border-stone-800 p-4 rounded-xl shadow-2xl z-50 flex flex-col gap-3 animate-slideUp">
      <div className="text-xs text-stone-400 leading-relaxed">
        <span className="text-vanillaPetal font-bold block mb-1 font-serif">Demo Cookie Notification</span>
        This portfolio application utilizes local state variables and standard session cookies to optimize interface responses, track styling preferences, and safeguard admin authorization paths. "Only a sample"
      </div>
      <div className="flex justify-end gap-2">
        <button 
          onClick={handleAccept}
          className="bg-roseAccent hover:bg-roseAccent/90 text-luxuryBlack text-[11px] font-bold py-1.5 px-4 rounded-md transition duration-200 cursor-pointer"
        >
          Accept Analytics
        </button>
      </div>
    </div>
  );
}