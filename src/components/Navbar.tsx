import { Home, Package, HelpCircle, FileText, Star, ShoppingCart, Users } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleProductsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (location.pathname === "/") {
      // Already on homepage, smooth scroll
      document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
    } else {
      // Navigate to homepage first, then scroll
      navigate("/");
      setTimeout(() => {
        document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <nav className="fixed top-4 left-4 right-4 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-background/80 backdrop-blur-sm border border-border rounded-2xl">
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
            <a href="https://gckeys.cc/#products" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <Package className="w-4 h-4" />
              <span>Products</span>
            </a>
            <a href="https://gckeys.cc/terms" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <FileText className="w-4 h-4" />
              <span>Terms of Service</span>
            </a>
            <a href="https://discord.com/invite/aCwcJukUf6" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <HelpCircle className="w-4 h-4" />
              <span>Support</span>
            </a>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-primary" />
              <div className="text-center">
                <div className="font-bold text-foreground">4.98</div>
                <div className="text-[10px] text-muted-foreground tracking-wide">RATING</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4 text-primary" />
              <div className="text-center">
                <div className="font-bold text-foreground">8K+</div>
                <div className="text-[10px] text-muted-foreground tracking-wide">SALES</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              <div className="text-center">
                <div className="font-bold text-foreground">6K+</div>
                <div className="text-[10px] text-muted-foreground tracking-wide">CUSTOMERS</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;