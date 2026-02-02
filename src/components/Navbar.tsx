import { Home, Globe, FileText, HelpCircle, Star, ShoppingCart, Users } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleProductsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (location.pathname === "/") {
      document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mr-10">
            <img 
              src="https://cdn.imgchest.com/files/331434c35d9f.webp" 
              alt="GC Keys Logo" 
              className="w-7 h-7 rounded-md object-cover"
            />
            <span className="text-lg font-semibold text-foreground">GC Keys</span>
          </Link>

          {/* Navigation - after logo */}
          <div className="hidden md:flex items-center gap-6">
            <a href="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Home className="w-4 h-4" />
              <span>Home</span>
            </a>
            <a href="https://gckeys.cc/#products" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Globe className="w-4 h-4" />
              <span>Products</span>
            </a>
            <a href="https://gckeys.cc/terms" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <FileText className="w-4 h-4" />
              <span>Terms</span>
            </a>
            <a href="https://discord.com/invite/aCwcJukUf6" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <HelpCircle className="w-4 h-4" />
              <span>Support</span>
            </a>
          </div>

          {/* Stats - pushed to right */}
          <div className="hidden sm:flex items-center gap-5 ml-auto text-sm">
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium text-foreground">4.98</span>
              <span className="text-xs text-muted-foreground tracking-wide">RATING</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShoppingCart className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium text-foreground">8K+</span>
              <span className="text-xs text-muted-foreground tracking-wide">SALES</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium text-foreground">6K+</span>
              <span className="text-xs text-muted-foreground tracking-wide">CUSTOMERS</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
