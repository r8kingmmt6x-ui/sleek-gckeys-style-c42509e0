import { ArrowUp, Home, Package, FileText, HelpCircle } from "lucide-react";
import storeBanner from "@/assets/store-banner.png";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Logo */}
          <a 
            href="https://gckeys.cc" 
            className="flex items-center justify-center md:justify-start gap-2 hover:opacity-80 transition-opacity"
          >
            <img 
              src="https://cdn.imgchest.com/files/331434c35d9f.webp" 
              alt="GC Keys Logo" 
              className="w-8 h-8 rounded-md object-cover"
            />
            <span className="text-2xl font-bold text-foreground">GC Keys</span>
          </a>
          
          {/* Navigation */}
          <div className="flex items-center justify-center gap-8 text-sm">
            <a href="https://gckeys.cc" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <Home className="w-4 h-4" />
              Home
            </a>
            <a href="https://gckeys.cc/#products" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <Package className="w-4 h-4" />
              Products
            </a>
            <a href="https://gckeys.cc/terms" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <FileText className="w-4 h-4" />
              Terms of Service
            </a>
            <a 
              href="https://discord.com/invite/aCwcJukUf6" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <HelpCircle className="w-4 h-4" />
              Support
            </a>
          </div>
          
          {/* Copyright and Scroll to Top */}
          <div className="flex items-center justify-center md:justify-end gap-4">
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} GC Keys. All rights reserved.
            </div>
            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full bg-secondary border border-border flex items-center justify-center hover:bg-secondary/80 transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4 text-foreground" />
            </button>
          </div>
        </div>
        
        {/* Store Banner */}
        <div className="flex justify-center mt-8">
          <a href="https://gckeys.cc" className="hover:opacity-80 transition-opacity">
            <img 
              src={storeBanner} 
              alt="GC Keys Store Banner" 
              className="h-12 w-auto rounded"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
