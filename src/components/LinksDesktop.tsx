import { NavLink } from "react-router-dom";
import { links } from "../utils/links";
import { 
  Home, 
  Rocket, 
  Telescope, 
  Eye, 
  Newspaper, 
  Image as ImageIcon 
} from "lucide-react";

const iconMap = {
  home: Home,
  spacex: Rocket,
  "james webb": Telescope,
  hubble: Eye,
  news: Newspaper,
  "nasa's day photo": ImageIcon,
};

const LinksDesktop = () => {
  return (
    <nav className="hidden lg:flex items-center gap-1">
      {links.map((link) => {
        const { ref, label } = link;
        const Icon = iconMap[label.toLowerCase() as keyof typeof iconMap] || Home;
        
        return (
          <NavLink
            key={label}
            to={ref}
            className={({ isActive }) =>
              `relative flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 group ${
                isActive
                  ? 'text-primary bg-primary/10'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon 
                  className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-primary' : 'text-gray-400 group-hover:text-white'
                  }`} 
                />
                <span className="capitalize tracking-wide">{label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-primary rounded-full" />
                )}
              </>
            )}
          </NavLink>
        );
      })}
    </nav>
  );
};

export default LinksDesktop;
