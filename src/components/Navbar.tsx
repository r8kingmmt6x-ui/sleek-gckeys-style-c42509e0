import { Home, Package, HelpCircle, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="https://cdn.imgchest.com/files/331434c35d9f.webp" 
              alt="GC Keys Logo" 
              className="w-7 h-7 rounded-md object-cover"
            />
            <span className="text-lg font-bold">GC Keys</span>
          </Link>

          <div className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
            <a href="/" className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors">
              <Home className="w-4 h-4" />
              <span>Home</span>
            </a>
            <a href="#products" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <Package className="w-4 h-4" />
              <span>Products</span>
            </a>
            <Link to="/terms" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <FileText className="w-4 h-4" />
              <span>Terms of Service</span>
            </Link>
            <a href="https://discord.com/invite/aCwcJukUf6" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <HelpCircle className="w-4 h-4" />
              <span>Support</span>
            </a>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <div className="text-center">
              <div className="font-bold text-foreground">4.98</div>
              <div className="text-[10px] text-muted-foreground tracking-wide">RATING</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-foreground">8K+</div>
              <div className="text-[10px] text-muted-foreground tracking-wide">SALES</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-foreground">6K+</div>
              <div className="text-[10px] text-muted-foreground tracking-wide">CUSTOMERS</div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;