import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSellAuthStock } from "@/hooks/useSellAuthStock";

declare global {
  interface Window {
    sellAuthEmbed: {
      checkout: (
        element: null,
        options: {
          cart: Array<{
            productId: number;
            variantId: number;
            quantity: number;
          }>;
          shopId: number;
          modal: boolean;
        }
      ) => void;
    };
  }
}

const products = [
  {
    title: "Volcano Executor",
    description: "Volcano is Electron rebranded. Electron was an executor that was around for many years before Roblox introduced the Hyperion anti cheat/tamper. It eventually rebranded to Volcano which is a FREE key system executor that is extremely high quality for the price. The stability is amongst the best out of all current FREE executors on the market.",
    price: "$6.99 - $26.99",
    stock: 67,
    image: "https://cdn.imgchest.com/files/edf608619724.webp",
    slug: "volcano-executor",
    plans: [
      { name: "Monthly", duration: "30-Day Access", price: "$6.99", inStock: false, productId: 393930, variantId: 562297 },
      { name: "Quarterly", duration: "90-Day Access", price: "$14.99", inStock: false, productId: 393930, variantId: 639153 },
      { name: "Lifetime", duration: "Lifetime Access", price: "$26.99", inStock: false, productId: 393930, variantId: 639154 }
    ],
    features: [
      "Instant Key Delivery",
      "No Annoying Pop-ups",
      "No Checkpoints or Ads",
      "3x HWID Resets Per Day"
    ],
    requirements: [
      "Windows 10/11",
      "Minimum requirements for Roblox"
    ]
  },
  {
    title: "Rift NOW",
    description: "With Rift NOW, you get on-demand access — no key system, no delays, just instant execution when you need it. Enjoy a clean experience with banner ads removed. Rift exclusively supports Grow a Garden, Dead Rails, 99 Nights In The Forest, ink Game and Forsaken. (discord.gg/rukhKrpru6)",
    price: "$2.49 - $5.99",
    stock: 0,
    image: "https://cdn.imgchest.com/files/63f08822f5c5.webp",
    slug: "rift-now",
    plans: [
      { name: "7 Days", duration: "", price: "$2.49", inStock: false, productId: 393924, variantId: 564505 },
      { name: "14 Days", duration: "", price: "$3.99", inStock: false, productId: 393924, variantId: 564504 },
      { name: "30 Days", duration: "", price: "$5.99", inStock: false, productId: 393924, variantId: 562286 }
    ],
    features: [
      "Instant Key Delivery",
      "No Annoying Pop-ups",
      "No Checkpoints or Ads",
      "3x HWID Resets Per Day"
    ],
    requirements: [
      "Windows 10/11",
      "Minimum requirements for Roblox"
    ]
  },
  {
    title: "Exploitingis.FUN",
    description: "Exploitingis.FUN exclusively supports Forsaken, Basketball Legends, 99 Nights in the Forest, Ink Game, Grow a Garden, Build a Plane, Doors and Protect The House From Monsters.",
    price: "$7.99 - $14.99",
    stock: 15,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80",
    slug: "exploitingis-fun",
    plans: [
      { name: "7 Days", duration: "", price: "$2.49", inStock: false, productId: 393924, variantId: 564505 },
      { name: "14 Days", duration: "", price: "$3.99", inStock: false, productId: 393924, variantId: 564504 },
      { name: "30 Days", duration: "", price: "$5.99", inStock: false, productId: 393924, variantId: 562286 }
    ],
    features: [
      "Multiple Game Support",
      "Instant Key Delivery",
      "No Annoying Pop-ups",
      "Regular Updates"
    ],
    requirements: [
      "Windows 10/11",
      "Minimum requirements for Roblox"
    ]
  },
  {
    title: "Seliware",
    description: "Count on Seliware for unrivaled dependability. Our advanced executor offers rock-solid stability, guaranteeing smooth, consistent performance and complete confidence every time.",
    price: "$3.95 - $9.95",
    stock: 0,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80",
    slug: "seliware",
    plans: [
      { name: "7 Days", duration: "", price: "$2.49", inStock: false, productId: 393924, variantId: 564505 },
      { name: "14 Days", duration: "", price: "$3.99", inStock: false, productId: 393924, variantId: 564504 },
      { name: "30 Days", duration: "", price: "$5.99", inStock: false, productId: 393924, variantId: 562286 }
    ],
    features: [
      "Rock-Solid Stability",
      "Advanced Features",
      "Regular Updates",
      "Premium Support"
    ],
    requirements: [
      "Windows 10/11",
      "Compatible with Roblox"
    ]
  },
  {
    title: "pretty.rich",
    description: "Premium execution service with advanced features and unmatched stability. Experience the ultimate in performance and reliability with our cutting-edge technology.",
    price: "$8.99 - $19.99",
    stock: 8,
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
    slug: "pretty-rich",
    plans: [
      { name: "7 Days", duration: "", price: "$2.49", inStock: false, productId: 393924, variantId: 564505 },
      { name: "14 Days", duration: "", price: "$3.99", inStock: false, productId: 393924, variantId: 564504 },
      { name: "30 Days", duration: "", price: "$5.99", inStock: false, productId: 393924, variantId: 562286 }
    ],
    features: [
      "Premium Features",
      "Unmatched Stability",
      "Advanced Technology",
      "Priority Support"
    ],
    requirements: [
      "Windows 10/11",
      "Modern system required"
    ]
  },
  {
    title: "Solix Hub",
    description: "Advanced execution platform designed for professionals. Features include lightning-fast processing, enhanced security, and seamless integration across all platforms.",
    price: "$5.99 - $12.99",
    stock: 12,
    image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&auto=format&fit=crop&q=80",
    slug: "solix-hub",
    plans: [
      { name: "7 Days", duration: "", price: "$2.49", inStock: false, productId: 393924, variantId: 564505 },
      { name: "14 Days", duration: "", price: "$3.99", inStock: false, productId: 393924, variantId: 564504 },
      { name: "30 Days", duration: "", price: "$5.99", inStock: false, productId: 393924, variantId: 562286 }
    ],
    features: [
      "Lightning-Fast Processing",
      "Enhanced Security",
      "Professional Grade",
      "Seamless Integration"
    ],
    requirements: [
      "Windows 10/11",
      "Professional use recommended"
    ]
  }
];

const ProductDetails = () => {
  const { slug } = useParams();
  const product = products.find(p => p.slug === slug);
  const [selectedPlan, setSelectedPlan] = useState<{
    productId: number;
    variantId: number;
    name: string;
    price: string;
  } | null>(null);

  // Fetch live stock data from SellAuth
  const { data: stockData, isLoading: isLoadingStock } = useSellAuthStock(slug || '');

  // Load SellAuth script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sellauth.com/assets/js/sellauth-embed-2.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePlanSelect = (plan: any) => {
    if (plan.productId && plan.variantId) {
      setSelectedPlan({
        productId: plan.productId,
        variantId: plan.variantId,
        name: plan.name,
        price: plan.price
      });
    }
  };

  const handlePurchase = () => {
    if (selectedPlan && selectedPlan.productId && selectedPlan.variantId && window.sellAuthEmbed) {
      window.sellAuthEmbed.checkout(null, {
        cart: [{
          productId: selectedPlan.productId,
          variantId: selectedPlan.variantId,
          quantity: 1
        }],
        shopId: 165518,
        modal: true
      });
    }
  };

  // Check if product has SellAuth integration
  const hasSellAuthIntegration = product?.plans.some(plan => (plan as any).productId && (plan as any).variantId);

  // Get live stock for a variant
  const getVariantStock = (variantName: string): number | null => {
    if (!stockData?.variants) return null;
    const variant = stockData.variants.find(v => v.name === variantName);
    return variant ? variant.stock : null;
  };

  // Calculate total stock from live data
  const liveStock = stockData?.variants 
    ? stockData.variants.reduce((sum, v) => sum + v.stock, 0)
    : null;

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-28 px-4 text-center">
          <h1 className="text-2xl font-bold">Product not found</h1>
          <Link to="/" className="text-primary hover:underline mt-4 inline-block">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-20 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <Link to="/#products" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            <div>
              <div className="relative rounded-2xl overflow-hidden bg-secondary/50 aspect-video mb-6">
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
              <p className="text-muted-foreground text-lg leading-relaxed">{product.description}</p>
            </div>

            <div>
              <div className="bg-card border border-border rounded-2xl p-6 mb-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="text-3xl font-bold text-primary">{product.price}</div>
                  <div className="flex gap-2">
                    <Badge variant={(liveStock ?? product.stock) > 0 ? "secondary" : "destructive"}>
                      {isLoadingStock ? "Loading..." : (liveStock ?? product.stock) > 0 ? "In Stock" : "Out of Stock"}
                    </Badge>
                    <Badge variant="secondary">Executor</Badge>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-4">Choose Your Plan</h3>
                
                <div className="space-y-3 mb-6">
                  {product.plans.map((plan, index) => {
                    const liveVariantStock = getVariantStock(plan.name);
                    const stock = liveVariantStock ?? (plan.inStock ? 1 : 0);
                    
                    return (
                      <div 
                        key={index} 
                        onClick={() => handlePlanSelect(plan)}
                        className={`bg-secondary/50 border rounded-lg p-4 flex items-center justify-between cursor-pointer transition-all ${
                          selectedPlan?.variantId === (plan as any).variantId
                            ? 'border-primary ring-2 ring-primary'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold">{plan.name}</span>
                            {stock === 0 && <span className="text-xs text-destructive">• Out of stock</span>}
                            {liveVariantStock !== null && liveVariantStock > 0 && (
                              <span className="text-xs text-muted-foreground">• {liveVariantStock} available</span>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground">{plan.duration}</div>
                        </div>
                        <div className="text-xl font-bold text-primary">{plan.price}</div>
                      </div>
                    );
                  })}
                </div>

                <Button 
                  onClick={handlePurchase}
                  className="w-full h-12 text-base" 
                  size="lg" 
                  disabled={!hasSellAuthIntegration || !selectedPlan}
                >
                  {!hasSellAuthIntegration
                    ? "Coming Soon"
                    : selectedPlan
                    ? `Purchase ${selectedPlan.name} - ${selectedPlan.price}`
                    : "Select a plan"}
                </Button>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {product.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>{requirement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>What Our Customers Say</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-secondary/50 rounded-lg p-6">
                <p className="text-lg italic mb-4">
                  "100% works and gives key instantly instead of waiting for someone to give it its instant love it"
                </p>
                <p className="text-sm text-muted-foreground">— Customer</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
