import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import spaceImg from '../assets/images/rocket.webp';
import { Rocket } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/95 backdrop-blur-md border-b border-white/10 shadow-lg' 
          : 'bg-black/80 backdrop-blur-sm'
      }`}
    >
      <div className="align-element">
        <div className="flex items-center justify-between py-4">
          {/* Logo Section */}
          <Link 
            to='/' 
            className="flex items-center gap-3 group transition-transform hover:scale-105"
          >
            <div className="relative">
              <img 
                src={spaceImg} 
                alt="alphaSpace Logo" 
                className="h-12 w-12 object-cover rounded-lg border border-primary/20 group-hover:border-primary/50 transition-colors"
              />
              <div className="absolute -inset-1 bg-primary/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
            </div>
            <div className="flex flex-col">
              <h1 className="cube-font text-xl md:text-2xl tracking-tight text-white group-hover:text-primary transition-colors">
                alphaSpace
              </h1>
              <span className="text-xs text-gray-400 font-mono hidden sm:block">
                Explore the Cosmos
              </span>
            </div>
          </Link>

          {/* Right Section - Current Page Indicator */}
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Rocket className="w-4 h-4 text-primary animate-pulse" />
            <span className="hidden md:inline font-mono capitalize">
              {location.pathname === '/' ? 'Home' : location.pathname.slice(1).replace('-', ' ')}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
