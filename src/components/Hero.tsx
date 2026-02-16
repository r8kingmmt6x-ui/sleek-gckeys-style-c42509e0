import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const scrollToProducts = () => {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="pt-32 pb-24 px-4 flex items-center justify-center min-h-[70vh]">
      <div className="max-w-3xl mx-auto text-center">
        <div className="flex items-center justify-center gap-4 mb-6">
          <img
            src="https://cdn.imgchest.com/files/331434c35d9f.webp"
            alt="GC Keys Logo"
            className="w-16 h-16 rounded-xl object-cover"
          />
          <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-foreground">
            GC Keys
          </h1>
        </div>
        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed">
          Your trusted source for game utilities, software, and digital keys.
          Quality products with instant delivery.
        </p>
        <Button
          onClick={scrollToProducts}
          variant="outline"
          size="lg"
          className="rounded-full px-8 py-6 text-base border-border bg-card hover:bg-secondary text-foreground gap-2"
        >
          Browse Products
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </section>
  );
};

export default Hero;
