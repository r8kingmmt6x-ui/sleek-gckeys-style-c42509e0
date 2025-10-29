import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const Hero = () => {
  return (
    <section className="pt-28 pb-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-3 tracking-tight">GC Keys</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Your trusted source for utilities.
        </p>
        
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search for products..."
            className="pl-11 h-12 bg-input border-border text-sm rounded-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
