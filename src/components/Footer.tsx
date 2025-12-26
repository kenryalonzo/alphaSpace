import { ExternalLink, Github, Rocket, Telescope, Satellite } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const resources = [
    {
      category: "NASA",
      links: [
        { name: "NASA Official", url: "https://www.nasa.gov", icon: Satellite },
        { name: "NASA API", url: "https://api.nasa.gov", icon: ExternalLink },
        { name: "NASA YouTube", url: "https://www.youtube.com/@NASA", icon: ExternalLink },
      ],
    },
    {
      category: "Telescopes",
      links: [
        { name: "James Webb Space Telescope", url: "https://webb.nasa.gov", icon: Telescope },
        { name: "JWST API", url: "https://api.jwstapi.com", icon: ExternalLink },
        { name: "Hubble Space Telescope", url: "https://hubblesite.org", icon: Telescope },
      ],
    },
    {
      category: "Space Companies",
      links: [
        { name: "SpaceX", url: "https://www.spacex.com", icon: Rocket },
        { name: "SpaceX API", url: "https://docs.spacexdata.com", icon: ExternalLink },
      ],
    },
    {
      category: "Data Sources",
      links: [
        { name: "Spaceflight News API", url: "https://spaceflightnewsapi.net", icon: ExternalLink },
        { name: "DataStro", url: "https://datastro.eu", icon: ExternalLink },
      ],
    },
  ];

  return (
    <footer className="bg-black border-t border-white/10 mt-20">
      <div className="align-element">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Rocket className="w-6 h-6 text-primary" />
              <h3 className="cube-font text-xl text-white">alphaSpace</h3>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Explorez l'univers à travers les dernières actualités spatiales, 
              les images époustouflantes de la NASA et les lancements SpaceX.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Resources Sections */}
          {resources.map((section, index) => (
            <div key={index} className="space-y-4">
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider">
                {section.category}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => {
                  const Icon = link.icon;
                  return (
                    <li key={linkIndex}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-gray-400 hover:text-primary transition-colors group"
                      >
                        <Icon className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" />
                        <span>{link.name}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500 text-center md:text-left">
              © {currentYear} alphaSpace. Tous droits réservés.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Créé avec</span>
              <span className="text-red-500 animate-pulse">❤️</span>
              <span>par</span>
              <span className="text-primary font-mono">Ghost</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
