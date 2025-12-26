import { SectionTitle } from "../components";
import { MOCK_WEBB } from "../services/api";

const Webb = () => {
  return (
    <div className="align-element py-12 text-white">
      <SectionTitle text="James Webb Space Telescope" subtitle="Unfolding the Universe" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate__animated animate__fadeIn">
        {MOCK_WEBB.map((item, index) => (
            <div 
                key={item.id} 
                className={`glass rounded-2xl overflow-hidden group ${index === 0 || index === 3 ? 'md:col-span-2' : ''}`}
            >
                <div className="relative overflow-hidden aspect-video md:aspect-[21/9] bg-gray-900">
                    <img 
                        src={item.imageUrl} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                        onError={(e) => {
                            // Image de secours si la source échoue
                            const target = e.target as HTMLImageElement;
                            if (target.src !== 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?q=80&w=2070&auto=format&fit=crop') {
                                target.src = 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?q=80&w=2070&auto=format&fit=crop';
                            }
                        }}
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <h3 className="text-3xl font-bold mb-2 cube-font text-primary">{item.title}</h3>
                        <p className="text-gray-300 max-w-2xl text-lg font-light opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                            {item.description}
                        </p>
                        <span className="text-xs font-mono text-gray-500 mt-4 block">{item.date}</span>
                    </div>
                </div>
            </div>
        ))}
      </div>
    </div>
  )
}

export default Webb
