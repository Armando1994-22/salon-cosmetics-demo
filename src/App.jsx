import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient'; // Verify your Supabase client configuration path
import { Sparkles, DollarSign, Clock, Calendar } from 'lucide-react';
import LogoImg from './assets/logo.png';
import AboutSection from './components/AboutSection';
import ReviewSection from './components/Reviews';
import ContactSection from './components/Contacts';

  // function to generate 15 time slots
  const generateTimeSlots = () => {
  const slots = [];
  const startHour = 9;
  const endHour = 18;

  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const displayHour = hour % 12 || 12;
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const displayMinute = minute === 0 ? '00' : minute;
      
      const label = `${displayHour}:${displayMinute} ${ampm}`;
      const value = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:00`;
      
      slots.push({ label, value });
    }
  }
  return slots;
};

const getTodayDateString = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

function ServiceCard({ service, onSelect }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const description = service.description || "Premium tailor-made aesthetic formulation treatment.";
  
  // Decides whether to show the "See More" link based on text length
  const isLongDescription = description.length > 90;

  return (
    <div className="bg-cardCharcoal p-6 rounded-xl border border-stone-800 shadow-md flex flex-col justify-between hover:border-roseAccent/40 hover:shadow-lg transition-all duration-300 group">
      <div>
        <h3 className="font-bold text-vanillaPetal text-lg group-hover:text-roseAccent transition-colors">
          {service.name}
        </h3>
        
        {/* Dynamic height block with your theme colors */}
        <p className={`text-stone-400 text-sm mt-2 leading-relaxed transition-all duration-300 ${
          !isExpanded && isLongDescription ? 'line-clamp-2' : ''
        }`}>
          {description}
        </p>

        {/* See More / See Less trigger button */}
        {isLongDescription && (
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs font-bold text-roseAccent/80 hover:text-roseAccent mt-1 underline underline-offset-4 tracking-wide cursor-pointer transition-colors"
          >
            {isExpanded ? 'See Less' : 'See More'}
          </button>
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-stone-800/60 flex justify-between items-center text-sm">
        <span className="flex items-center gap-0.5 font-bold text-roseAccent text-base">
          <DollarSign size={16} />{service.price}
        </span>
        <span className="flex items-center gap-1 text-stone-500">
          <Clock size={15} />{service.duration_minutes || '60'} mins
        </span>
      </div>
      <button 
      type="button"
      onClick={onSelect}
      className="bg-stone-800/80 hover:bg-roseAccent hover:text-luxuryBlack text-vanillaPatel font-bold py-1.5 px-3 rounded-lg text-xs tracking-wide transition-all duration-300 cursor-pointer border border-stone700/50 hover:border-roseAccent">
        Book Now
      </button>
    </div>
  );
}

export default function App() {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const timeSlot = generateTimeSlots();
  
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

  // Auto Connecting the seperate date and time 15 slots for the supabase table

  useEffect(() => {
    if (selectedDate && selectedTimeSlot) {
      setAppointmentTime(`${selectedDate}T${selectedTimeSlot}`);
    } else {
      setAppointmentTime('');
    }
  }, [selectedDate, selectedTimeSlot]);

  // Handle form submission to create a booking
  const handleBooking = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsSuccess(false); 
    
    if (isSubmitting) return;

    if (!selectedService || !selectedDate || !selectedTimeSlot) {
    setMessage('Please select a service, date, and time slot.');
    return;
  }
  if (selectedDate < getTodayDateString()) {
  setMessage('Cannot book an appointment in the past.');
  return;
}

    setIsSubmitting(true);

    const finalAppointmentTime = `${selectedDate}T${selectedTimeSlot}`;

    const { error } = await supabase
      .from('salon_bookings')
      .insert([
        { 
          service_id: selectedService, 
          appointment_time: finalAppointmentTime,
          status: 'pending'
        }
      ]);

      setIsSubmitting(false);

    if (error) {
      setMessage(`Booking failed: ${error.message}`);
      setIsSuccess(false);
    } else {
      setMessage('✨ Request received! We are checking our availability and will email you shortly to confirm your session. ✨');
      setIsSuccess(true);
      setSelectedService('');
      setSelectedDate('');
      setSelectedTimeSlot('');
      setAppointmentTime('');
    }
  };

    const handleSelectedService = (serviceId) => {
      setSelectedService(serviceId);
      const bookingFormElement = document.getElementById('booking-section');
      if (bookingFormElement){
        bookingFormElement.scrollIntoView({behavior: 'smooth', block: 'start'})
      }
    };
  

  return (
    // 🎨 Using your exact custom colors: luxuryBlack, vanillaPetal, roseAccent, cardCharcoal
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-luxuryBlack font-sans text-stone-300">
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
      
        <h1 className="text-2xl sm:text-4xl font-serif text-vanillaPetal tracking-wide flex flex-wrap justify-center items-center gap-2 font-bold px-4">
          <Sparkles className="text-roseAccent animate-pulse shrink-0" size={24} /> 
            <span>Your <span className="text-roseAccent font-normal italic">Company/Business Name</span> Will Go Here</span>
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
                <ServiceCard key={service.id} service={service} onSelect={() => handleSelectedService(service.id)}/>))}
            </div>
          )}
        </div>

        {/* 📅 Booking Card */}
        <div id="booking-section" className="bg-cardCharcoal p-6 rounded-2xl border border-stone-800 shadow-xl h-fit scroll-mt-6">
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
              <label className='block text-[10px] font-bold text-stone-400 uppercase tracking-widest md-1.5'>
                Appointment Date
              </label>
              <input
               type="date"
               value={selectedDate}
               min={getTodayDateString()}
               onChange={(e) => setSelectedDate(e.target.value)}
               className="w-full p-3 bg-luxuryBlack border border-stone-800 rounded-lg text-sm text-vanillaPetal focus:outline-none focus:border-roseAccent focus:ring-1 focus:ring-roseAccent transition-all"
               style={{ colorScheme: 'dark' }}
              />
            </div>
            <div>
              <label className='block text-[10px] font-bold text-stone-400 uppercase tracking-widest md-1.5'>
                Available Time
              </label>
              <select
                value={selectedTimeSlot}
                onChange={(e) => setSelectedTimeSlot(e.target.value)}
                className='w-full p-3 bg-luxuryBlack border border-stone-800 rounded-lg text-sm text-vanillaPetal focus:outline-none focus:border-roseAccent focus:ring-1 focus:ring-roseAccent transition-all'
              >
                <option value='' className='bg-cardCharcoal'>-- Choose an appointment time --</option>
                  {timeSlot.map((slot) => (
                    <option key={slot.value} value={slot.value} className='bg-cardCharcoal'>
                      {slot.label}
                    </option>
                  ))}
              </select>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting} // 👈 Disables the button completely while loading
              className={`w-full font-bold py-3 px-4 rounded-xl transition duration-300 shadow-md text-sm mt-2 tracking-wide text-luxuryBlack ${
              isSubmitting 
                ? 'bg-roseAccent/50 cursor-not-allowed opacity-70' // UI changes when busy
                : 'bg-roseAccent hover:bg-roseAccent/90 cursor-pointer'
             }`}
            >
              {isSubmitting ? 'Processing request...' : 'Request Booking'} 
            </button>
          </form>

          {message && (
            <div className={`mt-4 p-3 rounded-lg text-xs text-center font-semibold border ${
              isSuccess  
                ? 'bg-emerald-950/40 text-emerald-400 border-emerald-900/50' 
                : 'bg-rose-950/40 text-rose-400 border-rose-900/50'
            }`}>
              {message}
            </div>
          )}
        </div>
      </main>
          <AboutSection/>
          <ReviewSection/>
          <ContactSection/>
    </div>
  );
}