import { ArrowUp, Home, Globe, FileText, MessageCircle } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative z-10 bg-background border-t border-border">
      <div className="w-full px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
          {/* Logo */}
          <a 
            href="https://gckeys.cc" 
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <img 
              src="https://cdn.imgchest.com/files/331434c35d9f.webp" 
              alt="GC Keys Logo" 
              className="w-7 h-7 rounded-md object-cover"
            />
            <span className="text-lg font-semibold text-foreground">GC Keys</span>
          </a>
          
          {/* Navigation */}
          <div className="flex items-center gap-6 text-sm">
            <a 
              href="https://gckeys.cc" 
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </a>
            <a 
              href="https://gckeys.cc/#products" 
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span>Products</span>
            </a>
            <a 
              href="https://gckeys.cc/terms" 
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <FileText className="w-4 h-4" />
              <span>Terms</span>
            </a>
            <a 
              href="https://discord.com/invite/aCwcJukUf6" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Support</span>
            </a>
          </div>
          
          {/* Copyright and Scroll to Top */}
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} GC Keys. All rights reserved.
            </div>
            <button
              onClick={scrollToTop}
              className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4 text-foreground" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
