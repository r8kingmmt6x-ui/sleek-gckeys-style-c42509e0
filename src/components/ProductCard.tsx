import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface ProductCardProps {
  title: string;
  description: string;
  price: string;
  image: string;
  slug: string;
  showStartingAt?: boolean;
  customUrl?: string;
}

const ProductCard = ({ title, price, image, slug, showStartingAt = false, customUrl }: ProductCardProps) => {
  const href = customUrl || `/products/${slug}`;
  
  return (
    <Card className="relative z-10 bg-card border-border hover:border-primary/50 transition-all duration-300 overflow-hidden group">
      <a href={href}>
        <div className="relative h-48 overflow-hidden bg-secondary/50">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        <CardHeader>
          <CardTitle className="text-xl">{title}</CardTitle>
          <div className="text-xl font-bold text-foreground">
            {showStartingAt && <span className="text-sm font-normal text-muted-foreground">Starting At </span>}
            {price}
          </div>
        </CardHeader>
        
        <CardFooter>
          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" size="lg">
            View Details
          </Button>
        </CardFooter>
      </a>
    </Card>
  );
};

export default ProductCard;