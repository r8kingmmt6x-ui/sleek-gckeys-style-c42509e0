import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-6xl font-bold mb-4 tracking-tight">GC Keys</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Your trusted source for utilities.
        </p>
        
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search for products..."
            className="pl-12 h-14 bg-input border-border text-lg rounded-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
