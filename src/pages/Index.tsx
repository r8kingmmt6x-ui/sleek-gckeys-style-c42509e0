import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";

const products = [
  {
    title: "Volcano Executor",
    description: "Volcano is Electron rebranded. It's a FREE key system executor that is extremely high quality for the price. The stability is amongst the best out of all current FREE executors on the market.",
    price: "$6.99 - $26.99",
    stock: 0,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80",
    icon: "🌋"
  },
  {
    title: "Rift NOW",
    description: "With Rift NOW, you get on-demand access – no key system, no delays, just instant execution when you need it. Enjoy a clean experience with banner ads removed.",
    price: "$1.99 - $6.99",
    stock: 0,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80",
    icon: "R"
  },
  {
    title: "Exploitingis.FUN",
    description: "Exploitingis.FUN exclusively supports Forsaken, Basketball Legends, 99 Nights in the Forest, Ink Game, Grow a Garden, Build a Plane, Doors and Protect The House From Monsters.",
    price: "$7.99 - $14.99",
    stock: 15,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80",
    icon: "○"
  },
  {
    title: "Seliware",
    description: "Count on Seliware for unrivaled dependability. Our advanced executor offers rock-solid stability, guaranteeing smooth, consistent performance and complete confidence every time.",
    price: "$3.95 - $9.95",
    stock: 0,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80",
    icon: "S"
  },
  {
    title: "pretty.rich",
    description: "Premium execution service with advanced features and unmatched stability. Experience the ultimate in performance and reliability with our cutting-edge technology.",
    price: "$8.99 - $19.99",
    stock: 8,
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
    icon: "PR"
  },
  {
    title: "SoliX Executor",
    description: "Advanced execution platform designed for professionals. Features include lightning-fast processing, enhanced security, and seamless integration across all platforms.",
    price: "$5.99 - $12.99",
    stock: 12,
    image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&auto=format&fit=crop&q=80",
    icon: "SX"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      
      <section className="pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <ProductCard key={index} {...product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
