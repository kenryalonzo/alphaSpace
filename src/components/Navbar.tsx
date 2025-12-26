import LinksDesktop from "./LinksDesktop";
import LinksMobile from "./LinksMobile";

const Navbar = () => {
  return (
    <nav className="sticky top-[73px] z-40 bg-black/90 backdrop-blur-md border-b border-white/10">
      <div className="align-element">
        <div className="flex items-center justify-between py-4">
          <LinksMobile />
          <LinksDesktop />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
