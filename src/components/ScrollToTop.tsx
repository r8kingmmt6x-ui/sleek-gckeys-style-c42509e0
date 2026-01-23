import { ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isVisible) return null;

  return (
    <div className="flex justify-center pb-8 animate-fade-in">
      <button
        onClick={scrollToTop}
        className="w-12 h-12 rounded-full bg-secondary border border-border flex items-center justify-center hover:bg-secondary/80 transition-colors"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5 text-foreground" />
      </button>
    </div>
  );
};

export default ScrollToTop;
