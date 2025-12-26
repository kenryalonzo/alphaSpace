import { NavLink, useLocation } from "react-router-dom";
import { links } from "../utils/links";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const LinksMobile = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const currentLink = links.find(link => link.ref === location.pathname);

  return (
    <div className="lg:hidden">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            className="border-white/20 bg-white/5 hover:bg-white/10 text-white"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            {currentLink && (
              <span className="ml-2 text-sm capitalize hidden sm:inline">
                {currentLink.label}
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          className="lg:hidden w-56 bg-black/95 backdrop-blur-md border-white/10" 
          sideOffset={10}
          align="end"
        >
          {links.map((link) => {
            const { ref, label } = link;
            const isActive = location.pathname === ref;
            
            return (
              <DropdownMenuItem 
                key={label}
                className="p-0 focus:bg-white/5"
                onClick={() => setOpen(false)}
              >
                <NavLink
                  to={ref}
                  className={`w-full px-4 py-3 capitalize tracking-wide transition-colors flex items-center gap-3 ${
                    isActive
                      ? 'text-primary bg-primary/10 border-l-2 border-primary'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    isActive ? 'bg-primary' : 'bg-gray-500'
                  }`} />
                  {label}
                </NavLink>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default LinksMobile;
