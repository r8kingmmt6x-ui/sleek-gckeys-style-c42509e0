import { ArrowUp } from "lucide-react";

const ScrollToTop = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex justify-center pb-8">
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
