import { Home, Package, Star, HelpCircle } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center font-bold text-sm">
              GC
            </div>
            <span className="text-xl font-bold">GC Keys</span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <a href="#home" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
              <Home className="w-4 h-4" />
              <span>Home</span>
            </a>
            <a href="#products" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
              <Package className="w-4 h-4" />
              <span>Products</span>
            </a>
            <a href="#reviews" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
              <Star className="w-4 h-4" />
              <span>Reviews</span>
            </a>
            <a href="#support" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
              <HelpCircle className="w-4 h-4" />
              <span>Support</span>
            </a>
          </div>

          <div className="flex items-center gap-8">
            <div className="text-right">
              <div className="text-2xl font-bold">700+</div>
              <div className="text-xs text-muted-foreground">SALES</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">600+</div>
              <div className="text-xs text-muted-foreground">BUYERS</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">4.99</div>
              <div className="text-xs text-muted-foreground">RATING</div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
