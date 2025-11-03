import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import { Star, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSellAuthReviews } from "@/hooks/useSellAuthReviews";
import { useState } from "react";

const Reviews = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, error } = useSellAuthReviews(currentPage);
  const reviews = data?.reviews || [];
  const totalPages = 21; // As per user request

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
              <>
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                  {reviews.slice(0, 16).map((review, index) => (
                    <Card key={index} className="p-4 bg-card/50 border-border/50">
                      <div className="flex items-center justify-between mb-2">
                        {renderStars(review.rating)}
                        {review.date && (
                          <p className="text-xs text-muted-foreground">{review.date}</p>
                        )}
                      </div>
                      <p className="text-sm mb-3 line-clamp-3">{review.comment}</p>
                      {review.product && (
                        <p className="text-xs text-muted-foreground">{review.product}</p>
                      )}
                    </Card>
                  ))}
                </div>

                {/* Pagination Controls */}
                <div className="flex items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1 || isLoading}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  
                  <div className="flex gap-1">
                    {[...Array(Math.min(5, totalPages))].map((_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      
                      return (
                        <Button
                          key={pageNum}
                          variant={currentPage === pageNum ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(pageNum)}
                          disabled={isLoading}
                          className="w-10"
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages || isLoading}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default Reviews;
