import { Card } from "@/components/ui/card";

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
    <a href={href} className="group">
      <Card className="relative z-10 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/40 transition-all duration-300 overflow-hidden rounded-xl">
        <div className="relative h-48 overflow-hidden bg-secondary/30">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="p-5">
          <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
          <div className="text-base font-bold text-foreground">
            {showStartingAt && <span className="text-sm font-normal text-muted-foreground">Starting at </span>}
            {price}
          </div>
        </div>
      </Card>
    </a>
  );
};

export default ProductCard;
