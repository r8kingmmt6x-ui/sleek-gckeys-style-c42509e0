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
    slug: "exploiting-is-fun"
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
    description: "Create beautiful pages that represent you, and you only. Cheaper than the competition, yet more powerful and feature packed.",
    price: "$1.99",
    stock: 8,
    image: "https://cdn.imgchest.com/files/be8b3e5a8545.webp",
    slug: "pretty-rich"
  },
  {
    title: "Solix Hub",
    description: "Skip the hassle of reactivating every 12 hours. We’re now offering long-term access keys, no interruptions, no constant renewals. (discord.gg/solixhub)",
    price: "$4.99 - $14.99",
    stock: 12,
    image: "https://cdn.imgchest.com/files/5a2b4cb4f053.webp",
    slug: "solix-hub"
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
