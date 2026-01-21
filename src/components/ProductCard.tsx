import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface ProductCardProps {
  title: string;
  description: string;
  price: string;
  stock: number;
  image: string;
  slug: string;
  isLoadingStock?: boolean;
  showStartingAt?: boolean;
  customUrl?: string;
}

const ProductCard = ({ title, description, price, stock, image, slug, isLoadingStock = false, showStartingAt = false, customUrl }: ProductCardProps) => {
  const href = customUrl || `/products/${slug}`;
  
  return (
    <Card className="bg-card border-border hover:border-primary/50 transition-all duration-300 overflow-hidden group">
      <a href={href}>
        <div className="relative h-48 overflow-hidden bg-secondary/50">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-xl">{title}</CardTitle>
            <Badge variant={stock > 0 ? "success" : "destructive"} className="text-xs">
              {isLoadingStock ? "In Stock" : `${stock} In Stock`}
            </Badge>
          </div>
          <div className="text-xl font-bold text-primary">
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
