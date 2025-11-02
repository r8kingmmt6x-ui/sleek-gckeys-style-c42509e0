import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";

const Reviews = () => {
  return (
    <>
      <Helmet>
        <title>Customer Reviews | GC Keys</title>
        <meta name="description" content="Read genuine customer reviews and feedback for GC Keys products and services." />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="pt-20 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4">Customer Reviews</h1>
              <p className="text-muted-foreground">See what our customers have to say</p>
            </div>

            <div className="w-full rounded-lg overflow-hidden border border-border" style={{ height: 'calc(100vh - 250px)' }}>
              <iframe 
                src="https://gckeys.mysellauth.com/feedback"
                className="w-full h-full"
                title="Customer Reviews"
                loading="lazy"
              />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Reviews;
