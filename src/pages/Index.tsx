import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";

const products = [
  {
    title: "Volcano Executor",
    description: "Volcano is Electron rebranded. It's a FREE key system executor that is extremely high quality for the price. The stability is amongst the best out of all current FREE executors on the market.",
    price: "$6.99 - $26.99",
    stock: 67,
    image: "https://cdn.imgchest.com/files/edf608619724.webp",
    slug: "volcano-executor"
  },
  {
    title: "Rift NOW",
    description: "With Rift NOW, you get on-demand access – no key system, no delays, just instant execution when you need it. Enjoy a clean experience with banner ads removed.",
    price: "$2.49 - $5.99",
    stock: 0,
    image: "https://cdn.imgchest.com/files/63f08822f5c5.webp",
    slug: "rift-now"
  },
  {
    title: "Exploitingis.FUN",
    description: "Exploitingis.FUN exclusively supports Forsaken, Basketball Legends, 99 Nights in the Forest, Ink Game, Grow a Garden, Build a Plane, Doors and Protect The House From Monsters.",
    price: "$7.99 - $14.99",
    stock: 15,
    image: "https://cdn.imgchest.com/files/9d6fa32a3840.webp",
    slug: "exploitingis-fun"
  },
  {
    title: "Seliware",
    description: "Count on Seliware for unrivaled dependability. Our advanced executor offers rock-solid stability, guaranteeing smooth, consistent performance and complete confidence every time.",
    price: "$3.95 - $9.95",
    stock: 0,
    image: "https://cdn.imgchest.com/files/41845bf96598.webp",
    slug: "seliware"
  },
  {
    title: "pretty.rich",
    description: "Premium execution service with advanced features and unmatched stability. Experience the ultimate in performance and reliability with our cutting-edge technology.",
    price: "$8.99 - $19.99",
    stock: 8,
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
    icon: "PR",
    slug: "pretty-rich"
  },
  {
    title: "SoliX Executor",
    description: "Advanced execution platform designed for professionals. Features include lightning-fast processing, enhanced security, and seamless integration across all platforms.",
    price: "$5.99 - $12.99",
    stock: 12,
    image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&auto=format&fit=crop&q=80",
    icon: "SX",
    slug: "solix-executor"
  }
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      
      <section className="pb-20 px-4" id="products">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <ProductCard key={index} {...product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
