import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative h-[calc(100vh-140px)] min-h-[600px] w-full overflow-hidden flex items-center justify-center">
        {/* Background Image with Overlay */}
        <div 
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2111&auto=format&fit=crop')`
            }}
        >
            <div className="absolute inset-0 bg-black/60" /> {/* Dark Overlay */}
        </div>

        {/* Content */}
        <div className="z-10 text-center space-y-6 max-w-4xl px-4 animate__animated animate__fadeIn">
            <h1 className="text-5xl md:text-7xl font-bold text-white cube-font tracking-wide drop-shadow-lg">
                BEYOND THE <span className="text-primary">HORIZON</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 font-light max-w-2xl mx-auto leading-relaxed">
                Journey through the cosmos with alphaSpace. Explore the latest discoveries from James Webb, SpaceX launches, and the wonders of our universe.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center pt-4 animate__animated animate__fadeInUp animate__delay-1s">
                <Link to="/apod">
                    <Button size="lg" className="rounded-full text-lg px-8 py-6 bg-white text-black hover:bg-gray-200 transition-all duration-300">
                        Daily Photo
                    </Button>
                </Link>
                <Link to="/spacex">
                    <Button size="lg" variant="outline" className="rounded-full text-lg px-8 py-6 border-white text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300 group">
                        SpaceX Launches <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"/>
                    </Button>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Hero
