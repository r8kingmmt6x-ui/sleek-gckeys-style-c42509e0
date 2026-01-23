import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";

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
    slug: "seliware",
    customUrl: "/product?slug=seliware"
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
    title: "Solix Hub",
    description: "",
    price: "$1.99",
    image: "https://user-generated-content.komerza.com/db3e3171-0950-4b39-bb98-cb71dd9c2308.png",
    slug: "bfe43bcc-a68e-4a17-ab3f-5d060c411a0d",
    customUrl: "/product?slug=bfe43bcc-a68e-4a17-ab3f-5d060c411a0d"
  },
  {
    title: "kiciahook",
    description: "",
    price: "$9.99",
    image: "https://user-generated-content.komerza.com/b5ddb332-f16b-4851-80bf-3f085012a9ec.png",
    slug: "kiciahook",
    customUrl: "/product?slug=kiciahook"
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
            <ProductCard 
              key={index} 
              {...product} 
              showStartingAt={product.title.toLowerCase() !== "kiciahook"}
              customUrl={product.customUrl || (product.title === "Volcano Executor" ? `/product?slug=${product.slug}` : undefined)}
            />
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
