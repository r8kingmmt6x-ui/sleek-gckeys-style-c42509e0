import { useParams, Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const products = [
  {
    title: "Volcano Executor",
    description: "Volcano is Electron rebranded. Electron was an executor that was around for many years before Roblox introduced the Hyperion anti cheat/tamper. It eventually rebranded to \"Volcano\" which is a PAID executor that is extremely high quality for the price. The stability is amongst the best out of all current PAID executors on the market.",
    price: "$5.97 - $19.97",
    image: "https://user-generated-content.komerza.com/05d3e42e-a1fc-4760-b2d2-38fd2ad9af15.png",
    slug: "volcano-executor",
    category: "Executor",
    plans: [
      { name: "Weekly", price: "$5.97", purchaseUrl: "https://stealthpay.io/grand/volcano-executor-weekly" },
      { name: "Monthly", price: "$19.97", purchaseUrl: "https://stealthpay.io/grand/volcano-executor-monthly-1" }
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
    ],
    usage: [
      "Download Volcano at https://volcano.wtf/",
      "Redeem your purchased key",
      "Launch Roblox, execute your scripts, and enjoy enhanced performance."
    ],
    info: [
      "Support available on Discord: https://discord.gg/aCwcJukUf6",
      "Video tutorial: https://youtu.be/eVhOIUYMD0E",
      "3x HWID Resets Per Day at https://key.volcano.wtf/reset_hwid",
      "Check spam/junk if delivery email isn't visible",
      "Digital product — no refunds once key is redeemed"
    ]
  },
  {
    title: "Cryptic Windows",
    description: "Cryptic Windows sets the standard for Windows executors. Built for reliability and precision, it delivers smooth, stable performance you can depend on—every single time.",
    price: "$4.97 - $39.97",
    image: "https://user-generated-content.komerza.com/078b73b6-89df-4999-9b9e-c7e7196c2444.png",
    slug: "cryptic-windows",
    category: "Executor",
    plans: [
      { name: "Weekly", duration: "7-Day Access", price: "$4.97", purchaseUrl: "https://stealthpay.io/grand/cryptic-windows-weekly" },
      { name: "Monthly", duration: "30-Day Access", price: "$17.97", purchaseUrl: "https://stealthpay.io/grand/cryptic-windows-monthly" },
      { name: "Quarterly", duration: "90-Day Access", price: "$39.97", purchaseUrl: "https://stealthpay.io/grand/cryptic-windows-quarterly" }
    ],
    features: [
      "Instant Key Delivery",
      "Ultra-Fast Execution",
      "Rock-Solid Stability",
      "100% sUNC",
    ],
    requirements: [
      "Windows 10/11",
      "Minimum requirements for Roblox"
    ],
    usage: [
      "Join the official Cryptic Discord server at https://discord.gg/Gqr89p9AmA",
      "In any chat channel, type /redeem and enter your key when prompted.",
      "After redeeming, type /getdownload in the chat to receive the download.",
      "Launch Roblox, execute your scripts, and enjoy enhanced performance!"
    ],
    info: [
      "Support available on Discord: https://discord.gg/ThaUkwf9ad",
      "Troubleshooting: https://discord.gg/ThaUkwf9ad",
      "Check spam/junk if delivery email isn't visible",
      "Digital product — no refunds once key is redeemed",
      "Limited availability — secure your license while active"
    ]
  },
  {
    title: "Rift NOW",
    description: "With Rift NOW, you get on-demand access — no key system, no delays, just instant execution when you need it. Enjoy a clean experience with banner ads removed. Rift exclusively supports Grow a Garden, Dead Rails, 99 Nights In The Forest, ink Game and Forsaken.",
    price: "$2.49 - $5.99",
    image: "https://user-generated-content.komerza.com/113fe0d0-9daf-4fee-a015-e13b039553d3.png",
    slug: "rift-now",
    category: "Script Hub",
    plans: [
      { name: "7 Days", duration: "", price: "$2.49", purchaseUrl: "https://stealthpay.io/grand/rift-now-7-days" },
      { name: "14 Days", duration: "", price: "$3.99", purchaseUrl: "https://stealthpay.io/grand/rift-now-14-days" },
      { name: "30 Days", duration: "", price: "$5.99", purchaseUrl: "https://stealthpay.io/grand/rift-now-30-days" }
    ],
    features: [
      "Instant Key Delivery",
      "Premium Support",
      "No Annoying Pop-ups",
      "No Checkpoints or Ads",
    ],
    requirements: [
      "Windows 10/11",
      "Minimum requirements for Roblox"
    ],
    usage: [
      "Join https://discord.gg/rukhKrpru6",
      "Redeem your key in the #💻・rift-hub channel.",
      "Launch Roblox, execute your script, and enjoy!"
    ],
    info: [
      "Support available on Discord: https://discord.gg/aCwcJukUf6",
      "Documentation: https://docs.rifton.top/",
      "Check spam/junk if delivery email isn't visible",
      "Digital product — no refunds once key is redeemed",
      "Limited availability — secure your license while active"
    ]
  },
  {
    title: "Exploitingis.FUN",
    description: "Exploitingis.FUN exclusively supports Forsaken, Basketball Legends, 99 Nights in the Forest, Ink Game, Grow a Garden, Build a Plane, Doors and Protect The House From Monsters (discord.gg/exploitingisfun)",
    price: "$7.99 - $14.99",
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
    description: "Count on Seliware for unrivaled dependability. Our advanced executor offers rock-solid stability, guaranteeing smooth, consistent performance and complete confidence every time.",
    price: "$3.95 - $9.95",
    image: "https://user-generated-content.komerza.com/abc5281a-46f4-4de0-8f45-3ae585c603a4.png",
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
    ],
    usage: [
      "Redeem your purchased key at https://seliware.com/",
      "Download the loader",
      "Register an account and redeem your purchased key",
      "Launch Roblox, execute your scripts, and enjoy enhanced performance"
    ],
    info: [
      "Support available on Discord: https://discord.gg/aCwcJukUf6",
      "Troubleshooting: https://discord.gg/MMRpnuSb2g",
      "Check spam/junk if delivery email isn't visible",
      "Digital product — no refunds once key is redeemed",
      "Limited availability — secure your license while active"
    ]
  },
  {
    title: "pretty.rich",
    description: "Create beautiful pages that represent you, and you only. Cheaper than the competition, yet more powerful and feature packed.",
    price: "$1.99",
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
    description: "Skip the hassle of reactivating every 12 hours. We're now offering long-term access keys, no interruptions, no constant renewals. (discord.gg/solixhub)",
    price: "$4.99 - $14.99",
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
  },
  {
    title: "kiciahook",
    description: "With kiciahook, you get on-demand access — no key system, no delays, just instant execution when you need it. Enjoy a clean experience with kiciahook!",
    price: "$9.99",
    image: "https://user-generated-content.komerza.com/b5ddb332-f16b-4851-80bf-3f085012a9ec.png",
    slug: "kiciahook",
    category: "Script Hub",
    plans: [
      { name: "Lifetime", price: "$9.99", purchaseUrl: "https://stealthpay.io/grand/kiciahook" }
    ],
    features: [
      "Instant Key Delivery",
      "Premium Support",
      "No Annoying Pop-ups",
      "No Checkpoints or Ads"
    ],
    requirements: [
      "Windows 10/11",
      "Minimum requirements for Roblox"
    ],
    usage: [
      "Execute the script.",
      "Enter your purchased key.",
      "Press confirm and enjoy!"
    ],
    info: [
      "Support available on Discord: https://discord.gg/aCwcJukUf6",
      "kiciahook showcase: https://youtu.be/77UvIazGt6Y",
      "Check spam/junk if delivery email isn't visible",
      "Digital product — no refunds once key is redeemed",
      "Limited availability — secure your license while active"
    ]
  }
];

const ProductDetails = () => {
  const { slug: paramSlug } = useParams();
  const [searchParams] = useSearchParams();
  const querySlug = searchParams.get('slug');
  const slug = paramSlug || querySlug;
  const product = products.find(p => p.slug === slug);
  const [selectedPlan, setSelectedPlan] = useState<{
    name: string;
    price: string;
    purchaseUrl?: string;
  } | null>(null);

  const handlePlanSelect = (plan: any) => {
    setSelectedPlan({
      name: plan.name,
      price: plan.price,
      purchaseUrl: plan.purchaseUrl
    });
  };

  const handlePurchase = () => {
    if (!selectedPlan?.purchaseUrl) return;
    window.open(selectedPlan.purchaseUrl, '_blank');
  };

  const hasPurchaseUrl = product?.plans.some(plan => (plan as any).purchaseUrl);


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
                  <Badge variant="secondary">{product.category}</Badge>
                </div>

                <h3 className="text-xl font-bold mb-4">Choose Your Plan</h3>
                
                <div className="space-y-3 mb-6">
                  {product.plans.map((plan, index) => (
                    <div 
                      key={index} 
                      onClick={() => handlePlanSelect(plan)}
                      className={`bg-secondary/50 border rounded-lg p-4 flex items-center justify-between cursor-pointer transition-all ${
                        selectedPlan?.name === plan.name
                          ? 'border-primary ring-2 ring-primary'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <span className="font-semibold">{plan.name}</span>
                      <div className="text-xl font-bold text-primary">{plan.price}</div>
                    </div>
                  ))}
                </div>

                <Button 
                  onClick={handlePurchase}
                  className="w-full h-12 text-base" 
                  size="lg" 
                  disabled={!hasPurchaseUrl || !selectedPlan}
                >
                  {selectedPlan
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

          {(product as any).usage && (
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>Usage</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {(product as any).usage.map((item: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {(product as any).info && (
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle>Info</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {(product as any).info.map((item: string, index: number) => (
                        <li key={index} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

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
