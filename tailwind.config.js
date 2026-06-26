export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        luxuryBlack: '#0D0C0C',    // The solid black background of the logo
        vanillaPetal: '#F9F6F0',   // The pearlescent off-white flower petals
        roseAccent: '#E5A99E',     // The soft pinkish-gold/rose script line color
        cardCharcoal: '#1A1817',   // A slightly lighter charcoal tone for structural card separation
      },
    },
  },
  plugins: [],
}