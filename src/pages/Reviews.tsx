import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import { Star, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";

interface Review {
  author: string;
  rating: number;
  comment: string;
  date: string;
  product: string;
}

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch('https://gckeys.mysellauth.com/feedback');
      const html = await response.text();
      
      // Parse the HTML to extract reviews
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const reviewElements = doc.querySelectorAll('.feedback-item');
      
      const parsedReviews: Review[] = [];
      reviewElements.forEach((el) => {
        const author = el.querySelector('.feedback-author')?.textContent?.trim() || 'Anonymous';
        const ratingEl = el.querySelector('.feedback-rating');
        const rating = ratingEl ? parseInt(ratingEl.getAttribute('data-rating') || '5') : 5;
        const comment = el.querySelector('.feedback-comment')?.textContent?.trim() || '';
        const date = el.querySelector('.feedback-date')?.textContent?.trim() || '';
        const product = el.querySelector('.feedback-product')?.textContent?.trim() || '';
        
        if (comment) {
          parsedReviews.push({ author, rating, comment, date, product });
        }
      });
      
      setReviews(parsedReviews);
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setError('Failed to load reviews. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
    
    // Auto-refresh every 2 minutes
    const interval = setInterval(fetchReviews, 2 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

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
                <p className="text-destructive">{error}</p>
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
