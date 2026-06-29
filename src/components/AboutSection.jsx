export default function () {
    return (
        <section className='bg-cardCharcoal/40 border border-stone-800/80 rounded-2xl p-8 max-w-6xl mx-auto my-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center'>
         <div>
            <span className="text-xs font-bold tracking-widest text-roseAccent uppercase">Master Esthetician</span>
                <h2 className="text-2xl sm:text-3xl font-serif text-vanillaPetal font-bold mt-1 mb-4">
                    Meet the Artisan Behind the Needle
                </h2>
                <p className="text-stone-400 text-sm leading-relaxed mb-4">
                    Hi, I'm the founder of (Business Name). With years of clinical training in permanent cosmetics and skin science, I treat permanent makeup as an art form tailored completely to your facial structure.
                </p>
                <p className="text-stone-400 text-sm leading-relaxed">
                    Our clinic specializes in ultra-realistic hyper-pigmentation procedures, custom brow mapping, and clinical esthetics designed to enhance your natural beauty while saving you valuable morning routines.
                </p>
         </div>
         <div className="relative group overflow-hidden rounded-xl border border-stone-800 shadow-xl h-64 sm:h-80">
            <div className="absolute inset-0 bg-gradient-to-t from-luxuryBlack via-transparent to-transparent opacity-60 z-10"></div>
            <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRRAJoiN3qC2YnDytTOyDDJqJAhMLphu72jrVjdIlLfA&s=10"
            alt="Esthetician working" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
         </div>
        </section>
    )
}