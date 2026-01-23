import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Logo */}
          <a 
            href="https://gckeys.cc" 
            target="_blank" 
            rel="noopener noreferrer"
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
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <a href="https://gckeys.cc/#products" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              Products
            </a>
            <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <a 
              href="https://discord.gg/gckeys" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Support
            </a>
          </div>
          
          {/* Copyright */}
          <div className="text-sm text-muted-foreground text-center md:text-right">
            © {new Date().getFullYear()} GC Keys. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
