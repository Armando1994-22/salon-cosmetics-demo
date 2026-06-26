import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient'; // Verify your Supabase client configuration path
import { Sparkles, DollarSign, Clock, Calendar } from 'lucide-react';
import LogoImg from './assets/logo.png';

export default function VanillaPermanenteCosmetics() {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  // Fetch salon services from Supabase when page loads
  useEffect(() => {
    async function fetchServices() {
      const { data, error } = await supabase
        .from('salon_services')
        .select('*');
      
      if (error) {
        console.error('Error fetching services:', error);
      } else {
        console.log("Database response output:", data); 
        setServices(data || []);
      }
      setLoading(false);
    }
    fetchServices();
  }, []);

  // Handle form submission to create a booking
  const handleBooking = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!selectedService || !appointmentTime) {
      setMessage('Please select a service and a date/time.');
      return;
    }

    const { error } = await supabase
      .from('salon_bookings')
      .insert([
        { 
          service_id: selectedService, 
          appointment_time: appointmentTime,
          status: 'pending'
        }
      ]);

    if (error) {
      setMessage(`Booking failed: ${error.message}`);
    } else {
      setMessage('✨ Appointment reserved successfully! ✨');
      setSelectedService('');
      setAppointmentTime('');
    }
  };

  return (
    // 🎨 Using your exact custom colors: luxuryBlack, vanillaPetal, roseAccent, cardCharcoal
    <div className="min-h-screen bg-luxuryBlack font-sans text-stone-300">
      <header className="bg-cardCharcoal border-b border-stone-800 py-10 text-center shadow-md">
      <div className="mb-4 relative group">
          <div className="absolute  -inset-0.5 bg-roseAccent rounded-full opacity-30 group-hover:opacity-60 transition duration-300 blur-xs"></div>
          <img 
            src={LogoImg} 
            alt="Vanilla Permanente Cosmetics Logo" 
            className="relative w-32 h-32 rounded-full object-cover shadow-lg border border-stone-800"
          />
        </div>
      {/* 🖤 Premium Logo-Matched Dark Header */}
      
        <h1 className="text-4xl font-serif text-vanillaPetal tracking-wide flex justify-center items-center gap-2 font-bold">
          <Sparkles className="text-roseAccent animate-pulse" size={24} /> 
          Vanilla <span className="text-roseAccent font-normal italic">Permanente</span> Cosmetics
        </h1>
        <p className="text-stone-500 font-medium text-xs tracking-widest uppercase mt-2">
          PERMANENT COSMETIC • CLINICAL ESTHETICS
        </p>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* 🌸 Services Catalog */}
        <div className="md:col-span-2">
          <h2 className="text-xl font-bold font-serif text-vanillaPetal mb-6 border-b pb-2 border-stone-800 tracking-wider uppercase text-sm">
            Our Specialist Procedures
          </h2>
          
          {loading ? (
            <p className="text-roseAccent italic animate-pulse">Gathering treatment menu...</p>
          ) : services.length === 0 ? (
            <div className="bg-cardCharcoal p-6 rounded-xl border border-stone-800 text-center shadow-sm">
              <p className="text-stone-400">No treatments found in your database.</p>
              <p className="text-xs text-stone-500 mt-2">Add your permanent makeup procedures to Supabase to preview!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {services.map((service) => (
                <div 
                  key={service.id} 
                  className="bg-cardCharcoal p-6 rounded-xl border border-stone-800 shadow-md flex flex-col justify-between hover:border-roseAccent/40 hover:shadow-lg transition-all duration-300 group"
                >
                  <div>
                    <h3 className="font-bold text-vanillaPetal text-lg group-hover:text-roseAccent transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-stone-400 text-sm mt-2 line-clamp-2 leading-relaxed">
                      {service.description || "Premium tailor-made aesthetic formulation treatment."}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-stone-800/60 flex justify-between items-center text-sm">
                    <span className="flex items-center gap-0.5 font-bold text-roseAccent text-base">
                      <DollarSign size={16} />{service.price}
                    </span>
                    <span className="flex items-center gap-1 text-stone-500">
                      <Clock size={15} />{service.duration_minutes || '60'} mins
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 📅 Booking Card */}
        <div className="bg-cardCharcoal p-6 rounded-2xl border border-stone-800 shadow-xl h-fit">
          <h2 className="text-xl font-bold font-serif text-vanillaPetal mb-4 flex items-center gap-2 border-b pb-3 border-stone-800 tracking-wider uppercase text-sm">
            <Calendar size={18} className="text-roseAccent" /> Secure a Session
          </h2>
          
          <form onSubmit={handleBooking} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1.5">
                Select Procedure
              </label>
              <select 
                value={selectedService} 
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full p-3 bg-luxuryBlack border border-stone-800 rounded-lg text-sm text-vanillaPetal focus:outline-none focus:border-roseAccent focus:ring-1 focus:ring-roseAccent transition-all"
              >
                <option value="" className="bg-cardCharcoal">-- Choose a cosmetic service --</option>
                {services.map((service) => (
                  <option key={service.id} value={service.id} className="bg-cardCharcoal">
                    {service.name} (${service.price})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1.5">
                Date & Time
              </label>
              <input 
                type="datetime-local" 
                value={appointmentTime}
                onChange={(e) => setAppointmentTime(e.target.value)}
                className="w-full p-3 bg-luxuryBlack border border-stone-800 rounded-lg text-sm text-vanillaPetal focus:outline-none focus:border-roseAccent focus:ring-1 focus:ring-roseAccent transition-all"
                style={{ colorScheme: 'dark' }} // Native input dark-mode helper
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-roseAccent hover:bg-roseAccent/90 text-luxuryBlack font-bold py-3 px-4 rounded-lg transition-all text-sm tracking-widest uppercase shadow-md mt-2"
            >
              Confirm Reservation
            </button>
          </form>

          {message && (
            <div className={`mt-4 p-3 rounded-lg text-xs text-center font-semibold border ${
              message.includes('successfully') 
                ? 'bg-emerald-950/40 text-emerald-400 border-emerald-900/50' 
                : 'bg-rose-950/40 text-rose-400 border-rose-900/50'
            }`}>
              {message}
            </div>
          )}
        </div>

      </main>
    </div>
  );
}