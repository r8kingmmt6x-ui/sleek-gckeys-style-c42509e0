import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface HeroProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const Hero = ({ searchTerm, onSearchChange }: HeroProps) => {
  return (
    <section className="pt-28 pb-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-3 tracking-tight flex items-center justify-center gap-3">
          <img 
            src="https://cdn.imgchest.com/files/331434c35d9f.webp" 
            alt="GC Keys Logo" 
            className="w-12 h-12 rounded-lg object-cover"
          />
          GC Keys
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Your trusted source for game utilities, software, and digital keys.
        </p>
        
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-11 h-12 bg-input border-border text-sm rounded-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
