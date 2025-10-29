import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface ProductCardProps {
  title: string;
  description: string;
  price: string;
  stock: number;
  image: string;
  icon: string;
}

const ProductCard = ({ title, description, price, stock, image, icon }: ProductCardProps) => {
  return (
    <Card className="bg-card border-border hover:border-primary/50 transition-all duration-300 overflow-hidden group">
      <div className="relative h-48 overflow-hidden bg-secondary/50">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4 w-10 h-10 rounded-lg bg-background/90 backdrop-blur-sm flex items-center justify-center text-xl font-bold">
          {icon}
        </div>
      </div>
      
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-xl">{title}</CardTitle>
          <Badge variant={stock > 0 ? "secondary" : "destructive"} className="text-xs">
            {stock} In Stock
          </Badge>
        </div>
        <div className="text-xl font-bold text-primary">{price}</div>
      </CardHeader>
      
      <CardContent>
        <CardDescription className="line-clamp-3 text-muted-foreground">
          {description}
        </CardDescription>
      </CardContent>
      
      <CardFooter>
        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" size="lg">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
