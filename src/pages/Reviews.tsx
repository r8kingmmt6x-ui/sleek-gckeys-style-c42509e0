import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import { useSellAuthReviews } from "@/hooks/useSellAuthReviews";
import { Loader2 } from "lucide-react";

const Reviews = () => {
  const { data, isLoading, error } = useSellAuthReviews();

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
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Customer Reviews</h1>
              <p className="text-muted-foreground">See what our customers have to say</p>
            </div>

            {isLoading && (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            )}

            {error && (
              <div className="text-center py-20">
                <p className="text-destructive">Failed to load reviews. Please try again later.</p>
              </div>
            )}

            {data?.html && (
              <div 
                className="prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: data.html }}
              />
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default Reviews;
