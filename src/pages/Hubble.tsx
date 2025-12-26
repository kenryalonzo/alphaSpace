import { SectionTitle } from "../components";
import { MOCK_HUBBLE } from "../services/api";

const Hubble = () => {
  return (
    <div className="align-element py-12 text-white">
      <SectionTitle text="Hubble Space Telescope" subtitle="The eye that changed our view of the universe" />

      <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 animate__animated animate__fadeIn">
        {MOCK_HUBBLE.map((item) => (
            <div key={item.id} className="glass break-inside-avoid rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300">
                <div className="relative bg-gray-900 aspect-video overflow-hidden">
                    <img 
                        src={item.imageUrl} 
                        alt={item.title} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            // Image de secours si la source échoue
                            const target = e.target as HTMLImageElement;
                            if (target.src !== 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?q=80&w=2070&auto=format&fit=crop') {
                                target.src = 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?q=80&w=2070&auto=format&fit=crop';
                            }
                        }}
                        loading="lazy"
                    />
                </div>
                <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 cube-font">{item.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">
                        {item.description}
                    </p>
                    <div className="flex justify-between items-center border-t border-white/10 pt-4">
                         <span className="text-xs font-mono text-primary">{item.date}</span>
                         <span className="text-xs text-gray-500 uppercase tracking-widest">ESA/Hubble</span>
                    </div>
                </div>
            </div>
        ))}
      </div>
    </div>
  )
}

export default Hubble
