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
    description: "Volcano is Electron rebranded. Electron was an executor that was around for many years before Roblox introduced the Hyperion anti cheat/tamper. It eventually rebranded to Volcano which is a FREE key system executor that is extremely high quality for the price. The stability is amongst the best out of all current FREE executors on the market. (volcano.wtf)(volcano.wtf/discord.html)",
    price: "$6.99 - $26.99",
    stock: 67,
    image: "https://cdn.imgchest.com/files/edf608619724.webp",
    slug: "volcano-executor",
    category: "Executor",
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
    category: "Script Hub",
    plans: [
      { name: "7 Days", duration: "", price: "$2.49", inStock: false, productId: 393924, variantId: 564505 },
      { name: "14 Days", duration: "", price: "$3.99", inStock: false, productId: 393924, variantId: 564504 },
      { name: "30 Days", duration: "", price: "$5.99", inStock: false, productId: 393924, variantId: 562286 }
    ],
    features: [
      "Instant Key Delivery",
      "Premium Support",
      "No Checkpoints or Ads",
      ],
    requirements: [
      "Windows 10/11",
      "Minimum requirements for Roblox"
    ]
  },
  {
    title: "Exploitingis.FUN",
    description: "Exploitingis.FUN exclusively supports Forsaken, Basketball Legends, 99 Nights in the Forest, Ink Game, Grow a Garden, Build a Plane, Doors and Protect The House From Monsters (discord.gg/exploitingisfun)",
    price: "$7.99 - $14.99",
    stock: 15,
    image: "https://cdn.imgchest.com/files/9d6fa32a3840.webp",
    slug: "exploiting-is-fun",
    category: "Script Hub",
    plans: [
      { name: "Monthly", duration: "30-Day Access", price: "$7.99", inStock: false, productId: 456407, variantId: 668978 },
      { name: "Quarterly", duration: "90-Day Access", price: "$14.99", inStock: false, productId: 456407, variantId: 737141 },
      ],
    features: [
      "Instant Key Delivery",
      "Premium Support",
      "No Checkpoints or Ads",
      ],
    requirements: [
      "Windows 10/11",
      "Minimum requirements for Roblox"
    ]
  },
  {
    title: "Seliware",
    description: "Count on Seliware for unrivaled dependability. Our advanced executor offers rock-solid stability, guaranteeing smooth, consistent performance and complete confidence every time. (seliware.com)(seliware.com/discord)",
    price: "$3.95 - $9.95",
    stock: 0,
    image: "https://cdn.imgchest.com/files/41845bf96598.webp",
    slug: "seliware",
    category: "Executor",
    plans: [
      { name: "Weekly", duration: "7-Day Access", price: "$3.95", inStock: false, productId: 395148, variantId: 565174 },
      { name: "Monthly", duration: "30-Day Access", price: "$9.95", inStock: false, productId: 395148, variantId: 565175 },
      ],
    features: [
      "Ultra-Fast Execution",
      "Rock-Solid Stability",
      "100% sUNC",
      ],
    requirements: [
      "Windows 10/11",
      "Minimum requirements for Roblox"
    ]
  },
  {
    title: "pretty.rich",
    description: "Create beautiful pages that represent you, and you only. Cheaper than the competition, yet more powerful and feature packed.",
    price: "$1.99",
    stock: 8,
    image: "https://cdn.imgchest.com/files/be8b3e5a8545.webp",
    slug: "pretty-rich",
    category: "Bio-link",
    plans: [
      { name: "pretty.rich invite", duration: "", price: "1.99", inStock: false, productId: 418813, variantId: 604896 },
      ],
    features: [
      "Music Integration",
      "Discord Integration",
      "Customize to your liking",
      "Analytics & Insights",
      "Access to 30+ domains"
    ],
    requirements: [
      "Windows 10/11",
      ]
  },
  {
    title: "Solix Hub",
    description: "Skip the hassle of reactivating every 12 hours. We’re now offering long-term access keys, no interruptions, no constant renewals. (discord.gg/solixhub)",
    price: "$4.99 - $14.99",
    stock: 12,
    image: "https://cdn.imgchest.com/files/5a2b4cb4f053.webp",
    slug: "solix-hub",
    category: "Script Hub",
    plans: [
      { name: "Weekly", duration: "7-Day Access", price: "$1.99", inStock: false, productId: 487342, variantId: 719645 },
      { name: "2 Months", duration: "60-Day Access", price: "$4.99", inStock: false, productId: 487342, variantId: 719644 },
      ],
    features: [
      "Instant Key Delivery",
      "No more frequent reactivations",
      "No Checkpoints or Ads",
      ],
    requirements: [
      "Windows 10/11",
      "Minimum requirements for Roblox"
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
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);

  // Fetch live stock data from SellAuth
  const { data: stockData, isLoading: isLoadingStock } = useSellAuthStock(slug || '');

  // Load SellAuth script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sellauth.com/assets/js/sellauth-embed-2.js";
    script.async = true;
    
    script.onload = () => {
      console.log('SellAuth script loaded successfully');
      setIsScriptLoaded(true);
    };
    
    script.onerror = () => {
      console.error('Failed to load SellAuth script');
    };
    
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
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
    if (!selectedPlan || !isScriptLoaded || isPurchasing) return;
    
    if (!window.sellAuthEmbed) {
      console.error('SellAuth embed not available');
      return;
    }

    setIsPurchasing(true);
    
    try {
      console.log('Initiating checkout:', {
        productId: selectedPlan.productId,
        variantId: selectedPlan.variantId,
        shopId: 165518
      });
      
      window.sellAuthEmbed.checkout(null, {
        cart: [{
          productId: selectedPlan.productId,
          variantId: selectedPlan.variantId,
          quantity: 1
        }],
        shopId: 165518,
        modal: true
      });
      
      // Reset purchasing state after a delay
      setTimeout(() => {
        setIsPurchasing(false);
      }, 2000);
    } catch (error) {
      console.error('Checkout error:', error);
      setIsPurchasing(false);
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
                    <Badge variant={(liveStock ?? product.stock) > 0 ? "success" : "destructive"}>
                      {isLoadingStock ? "In Stock" : `${liveStock ?? product.stock} In Stock`}
                    </Badge>
                    <Badge variant="secondary">{product.category}</Badge>
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
                            {isLoadingStock ? (
                              <span className="text-xs text-success">• In Stock</span>
                            ) : stock === 0 ? (
                              <span className="text-xs text-destructive">• Out of stock</span>
                            ) : liveVariantStock !== null && liveVariantStock > 0 ? (
                              <span className="text-xs text-success">• {liveVariantStock} available</span>
                            ) : null}
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
                  disabled={!hasSellAuthIntegration || !selectedPlan || !isScriptLoaded || isPurchasing}
                >
                  {!isScriptLoaded
                    ? "Loading..."
                    : isPurchasing
                    ? "Opening checkout..."
                    : !hasSellAuthIntegration
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
