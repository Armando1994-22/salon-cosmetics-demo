import { Star } from "lucide-react";

const Reviews_Mock = [
   { id: 1, name: "Sophia R.", rating: 5, text: "Absolutely obsessed with my powder brows! The shape is perfection and the healing process was exactly as explained. Worth every dollar." },
  { id: 2, name: "Liam M.", rating: 5, text: "Extremely clean, professional environment. They took time to map everything exactly to my preferences. Highly recommend their clinical skin therapy." },
  { id: 3, name: "Elena K.", rating: 5, text: "The lip blush treatment looks so natural! The team's attention to detail and color matching was remarkable." }
]

export default function ReviewSection() {
    return (
        <section className="max-w-xl mx-auto my-16 px-4">
            <h2 className="text-xl font-bold font-serif text-vanillaPetal  mb-6 border-b pb-2 border-stone-800 tracking-wider uppercase text-xs">
                Client Testimonials
            </h2>
            <div>
                {Reviews_Mock.map((review) => (
                    <div key={review.id} className="bg-cardCharcoal p-6 rounded-xl border border-stone-800 flex flex-col justify-between">
                        <div>
                            <div  className="flex text-roseAccent gap-1 mb-3">
                                {[...Array(review.rating)].map((_, i) => <Star key={i} size={14} fill='currentColor'/>)}
                            </div>
                            <p className="text-stone-400 text-xs italic leading-relaxed">{review.text}</p>
                        </div>
                         <p className="text-vanillaPetal text-xs font-bold tracking-wide mt-4 text-right">— {review.name}</p>
                    </div>
                ))}
                
            </div>
        </section>
    )
}