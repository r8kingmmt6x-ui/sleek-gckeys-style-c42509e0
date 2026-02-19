import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import WhyChooseUs from "@/components/WhyChooseUs";
import Footer from "@/components/Footer";
import StarryBackground from "@/components/StarryBackground";
import yabujinImage from "@/assets/yabujin-new.png";
import kiciahookImage from "@/assets/kiciahook.png";
import archonImage from "@/assets/archon.png";

const products = [
  {
    title: "Volcano Executor",
    description: "",
    price: "$5.97",
    image: "https://user-generated-content.komerza.com/05d3e42e-a1fc-4760-b2d2-38fd2ad9af15.png",
    slug: "volcano-executor"
  },
  {
    title: "Cryptic Windows",
    description: "",
    price: "$4.97",
    image: "https://user-generated-content.komerza.com/078b73b6-89df-4999-9b9e-c7e7196c2444.png",
    slug: "cryptic-windows"
  },
  {
    title: "Rift NOW",
    description: "",
    price: "$2.49",
    image: "https://user-generated-content.komerza.com/113fe0d0-9daf-4fee-a015-e13b039553d3.png",
    slug: "rift-now",
    customUrl: "/product?slug=rift-now"
  },
  {
    title: "Seliware",
    description: "",
    price: "$3.95",
    image: "https://user-generated-content.komerza.com/abc5281a-46f4-4de0-8f45-3ae585c603a4.png",
    slug: "0efbc78f-045f-4f48-9113-78fcba6ac5ed",
    customUrl: "/product?slug=0efbc78f-045f-4f48-9113-78fcba6ac5ed"
  },
  {
    title: "RbxCli",
    description: "",
    price: "$3.99",
    image: "https://user-generated-content.komerza.com/8308c098-6d69-412c-9697-e7040b155a98.png",
    slug: "85fe7352-e372-42d7-a394-1f68f718abb4",
    customUrl: "/product?slug=85fe7352-e372-42d7-a394-1f68f718abb4"
  },
  {
    title: "kiciahook",
    description: "",
    price: "$9.97",
    image: kiciahookImage,
    slug: "kiciahook",
    customUrl: "/product?slug=kiciahook"
  },
  {
    title: "Yabujin",
    description: "",
    price: "$6.99",
    image: yabujinImage,
    slug: "yabujin",
    customUrl: "https://gckeys.cc/product?slug=yabujin"
  },
  {
    title: "Archon",
    description: "",
    price: "$3.97",
    image: archonImage,
    slug: "archon",
    customUrl: "/product?slug=archon"
  }
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background relative">
      <StarryBackground />
      <Navbar />
      <Hero searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      
      <section className="pb-20 px-4 scroll-mt-20" id="products">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
            <ProductCard 
              key={index} 
              {...product} 
              showStartingAt={!["kiciahook", "yabujin"].includes(product.title.toLowerCase())}
              customUrl={product.customUrl || (product.title === "Volcano Executor" ? `/product?slug=${product.slug}` : undefined)}
            />
            ))}
          </div>
        </div>
      </section>
      
      <WhyChooseUs />
      
      <Footer />
    </div>
  );
};

export default Index;
