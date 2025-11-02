import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import { Star, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useSellAuthReviews } from "@/hooks/useSellAuthReviews";

const Reviews = () => {
  const { data, isLoading, error } = useSellAuthReviews();
  const reviews = data?.reviews || [];

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'
            }`}
          />
        ))}
      </div>
    );
  };

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

            {!isLoading && !error && reviews.length === 0 && (
              <div className="text-center py-20">
                <p className="text-muted-foreground">No reviews yet. Be the first to leave one!</p>
              </div>
            )}

            {!isLoading && !error && reviews.length > 0 && (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {reviews.map((review, index) => (
                  <Card key={index} className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold">{review.author}</h3>
                        {review.product && (
                          <p className="text-sm text-muted-foreground">{review.product}</p>
                        )}
                      </div>
                      {renderStars(review.rating)}
                    </div>
                    <p className="text-sm mb-4">{review.comment}</p>
                    {review.date && (
                      <p className="text-xs text-muted-foreground">{review.date}</p>
                    )}
                  </Card>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default Reviews;
