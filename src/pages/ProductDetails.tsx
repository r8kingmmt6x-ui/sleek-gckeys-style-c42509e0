import { useParams, Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Footer from "@/components/Footer";
import visaIcon from "@/assets/pay-visa.svg";
import mastercardIcon from "@/assets/pay-mastercard.svg";
import applePayIcon from "@/assets/pay-applepay.svg";
import googlePayIcon from "@/assets/pay-googlepay.svg";
import paypalIcon from "@/assets/pay-paypal.svg";
import bitcoinIcon from "@/assets/pay-bitcoin.svg";
import cashAppIcon from "@/assets/pay-cashapp.svg";
import robuxIcon from "@/assets/pay-robux.png";

// Helper function to parse text and make URLs clickable
const parseTextWithLinks = (text: string) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);
  
  return parts.map((part, index) => {
    if (urlRegex.test(part)) {
      // Reset regex lastIndex
      urlRegex.lastIndex = 0;
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          {part}
        </a>
      );
    }
    return part;
  });
};


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
    slug: "0efbc78f-045f-4f48-9113-78fcba6ac5ed",
    category: "Executor",
    plans: [
      { name: "Weekly", price: "$3.95", purchaseUrl: "https://stealthpay.io/grand/seliware-weekly" },
      { name: "Monthly", price: "$9.95", purchaseUrl: "https://stealthpay.io/grand/seliware-monthly" },
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
    description: "Skip the hassle of reactivating every 12 hours. We're now offering long-term access keys, no interruptions, no constant renewals.",
    price: "$1.99 - $4.99",
    image: "https://user-generated-content.komerza.com/db3e3171-0950-4b39-bb98-cb71dd9c2308.png",
    slug: "bfe43bcc-a68e-4a17-ab3f-5d060c411a0d",
    category: "Script Hub",
    plans: [
      { name: "Weekly", price: "$1.99", purchaseUrl: "https://stealthpay.io/grand/solix-hub-weekly" },
      { name: "2 Months", price: "$4.99", purchaseUrl: "https://stealthpay.io/grand/solix-hub-2-months" }
    ],
    features: [
      "Instant Key Delivery",
      "No Checkpoints or Ads",
      "No More Frequent Reactivations"
    ],
    requirements: [
      "Windows 10/11",
      "Minimum requirements for Roblox"
    ],
    usage: [
      "Join the official Solix Hub discord server https://discord.gg/solixhub",
      "Redeem your purchased key in the #get-script channel",
      "Launch Roblox, execute your script, and enjoy!"
    ],
    info: [
      "Support available on Discord: https://discord.gg/aCwcJukUf6",
      "Troubleshooting: https://discord.gg/solixhub",
      "Check spam/junk if delivery email isn't visible",
      "Digital product — no refunds once key is redeemed",
      "Limited availability — secure your license while active"
    ]
  },
  {
    title: "RbxCli",
    description: "RbxCli is a Roblox external tool, originally thought of as a private, invite-only external focused on visuals, extensibility and in-game reverse engineering.",
    price: "$3.99 - $9.99",
    image: "https://user-generated-content.komerza.com/8308c098-6d69-412c-9697-e7040b155a98.png",
    slug: "85fe7352-e372-42d7-a394-1f68f718abb4",
    category: "External",
    plans: [
      { name: "Weekly", price: "$3.99", purchaseUrl: "https://stealthpay.io/grand/rbxcli-weekly" },
      { name: "Monthly", price: "$9.99", purchaseUrl: "https://stealthpay.io/grand/rbxcli-monthly" }
    ],
    features: [
      "Box Visuals",
      "Chameleon",
      "Dynamic FoV",
      "Hitbox Extension",
      "Instant Key Delivery"
    ],
    requirements: [
      "Windows 10/11",
      "Minimum requirements for Roblox"
    ],
    usage: [
      "Join the official RbxCli discord server at https://discord.gg/VEFd3asJNA",
      "Use /redeem in the server to redeem your purchased key",
      "Use /generateloader in the server to generate your personal loader package for RbxCli",
      "Launch Roblox, open RbxCli, and enjoy!"
    ],
    info: [
      "Support available on Discord: https://discord.gg/aCwcJukUf6",
      "Check spam/junk if delivery email isn't visible",
      "Digital product — no refunds once key is redeemed",
      "Limited availability — secure your license while active"
    ]
  },
  {
    title: "kiciahook",
    description: "With kiciahook, you get on-demand access — no key system, no delays, just instant execution when you need it. Enjoy a clean experience with kiciahook!",
    price: "$9.97",
    image: "https://user-generated-content.komerza.com/b5ddb332-f16b-4851-80bf-3f085012a9ec.png",
    slug: "kiciahook",
    category: "Script Hub",
    plans: [
      { name: "Lifetime", price: "$9.97", purchaseUrl: "https://stealthpay.io/grand/kiciahook" }
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
  },
  {
    title: "ChocoSploit",
    description: "ChocoSploit is the first executor to use kernel component for it's needs, because of that, it is rarely affected by Hyperion updates which prevent DLL injection which executors need.",
    price: "$4.99 - $24.99",
    image: "https://user-generated-content.komerza.com/cf111642-7f49-4cae-b845-888c9ffbb573.png",
    slug: "bb7abe6b-6767-41c5-9e3c-663c44fcc998",
    category: "Executor",
    plans: [
      { name: "Monthly", price: "$9.99", purchaseUrl: "https://stealthpay.io/grand/chocosploit-monthly" },
      { name: "Quarterly", price: "$24.99", purchaseUrl: "https://stealthpay.io/grand/chocosploit-quarterly" },
      { name: "Month of RakNet", price: "$4.99", purchaseUrl: "https://stealthpay.io/grand/chocosploit-month-of-raknet" }
    ],
    features: [
      "Instant Key Delivery",
      "Ultra-Fast Execution",
      "Rock-Solid Stability",
      "100% sUNC"
    ],
    requirements: [
      "Windows 10/11",
      "Minimum requirements for Roblox"
    ],
    usage: [
      "Use /redeem in the server to redeem your purchased key",
      "Launch Roblox, execute your scripts, and enjoy enhanced performance"
    ],
    info: [
      "Support available on Discord: https://discord.gg/aCwcJukUf6",
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
  const ref = searchParams.get('ref');
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
    let url = selectedPlan.purchaseUrl;
    if (ref) {
      url += `?r=${encodeURIComponent(ref)}`;
    }
    window.open(url, '_blank');
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
                      <div className="text-xl font-bold text-foreground">{plan.price}</div>
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

                {/* Accepted Payments */}
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-3">Accepted payments</p>
                  <div className="flex flex-wrap items-center gap-2">
                    {[
                      { name: "Visa", icon: visaIcon },
                      { name: "Mastercard", icon: mastercardIcon },
                      { name: "Apple Pay", icon: applePayIcon },
                      { name: "Google Pay", icon: googlePayIcon },
                      { name: "PayPal", icon: paypalIcon },
                      { name: "Bitcoin", icon: bitcoinIcon },
                      { name: "Cash App", icon: cashAppIcon },
                      { name: "Robux", icon: robuxIcon },
                    ].map((method) => (
                      <div
                        key={method.name}
                        className="h-8 min-w-[44px] rounded-md border border-border bg-secondary px-2.5 flex items-center justify-center"
                        title={method.name}
                      >
                        <img
                          src={method.icon}
                          alt={method.name}
                          className={
                            `${method.name === "Robux" ? "h-5" : "h-4"} w-auto opacity-80 brightness-0 invert`
                          }
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    ))}
                  </div>
                </div>
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
                        <span>{parseTextWithLinks(item)}</span>
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
                          <span>{parseTextWithLinks(item)}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetails;
