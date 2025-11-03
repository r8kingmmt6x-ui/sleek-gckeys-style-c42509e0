import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface Review {
  author: string;
  rating: number;
  comment: string;
  date: string;
  product: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get('SELLAUTH_API_KEY');
    const shopId = Deno.env.get('SELLAUTH_SHOP_ID');

    if (!apiKey || !shopId) {
      throw new Error('SELLAUTH_API_KEY or SELLAUTH_SHOP_ID not configured');
    }

    console.log(`Fetching reviews from SellAuth API for shop ${shopId}`);
    
    const reviews: Review[] = [];
    
    // Fetch all pages (1-21)
    for (let page = 1; page <= 21; page++) {
      try {
        console.log(`Fetching page ${page}...`);
        
        const response = await fetch(`https://api.sellauth.com/v1/shops/${shopId}/feedbacks?page=${page}`, {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Accept': 'application/json',
          }
        });

        if (!response.ok) {
          console.error(`SellAuth API error on page ${page}: ${response.status} ${response.statusText}`);
          continue; // Skip this page and continue with next
        }

        const data = await response.json();
        
        // Parse the SellAuth API response - handle both array and paginated response
        const feedbacks = Array.isArray(data) ? data : (data.data || []);
        
        if (!feedbacks || feedbacks.length === 0) {
          console.log(`No more reviews found at page ${page}, stopping`);
          break; // No more reviews, stop fetching
        }
        
        console.log(`Found ${feedbacks.length} feedbacks on page ${page}`);
        
        feedbacks.forEach((feedback: any) => {
          try {
            // Skip automatic feedbacks
            if (feedback.is_automatic === 1 || feedback.message === 'Automatic feedback after 7 days.') {
              return;
            }
            
            const review: Review = {
              author: feedback.author || feedback.customer?.name || 'Customer',
              rating: feedback.rating || feedback.stars || 5,
              comment: feedback.message || feedback.comment || feedback.review || '',
              date: feedback.created_at ? new Date(feedback.created_at).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: '2-digit' 
              }) : new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: '2-digit' 
              }),
              product: feedback.listing?.title || feedback.listing?.name || feedback.product?.name || 'Product',
            };

            // Add review if it has a comment
            if (review.comment && review.comment.trim()) {
              reviews.push(review);
            }
          } catch (err) {
            console.error('Error parsing review:', err);
          }
        });
        
      } catch (pageError) {
        console.error(`Error fetching page ${page}:`, pageError);
        continue; // Continue with next page
      }
    }

    console.log(`Successfully parsed ${reviews.length} reviews`);

    return new Response(
      JSON.stringify({ reviews }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error',
        reviews: []
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 // Return 200 with empty array instead of error
      }
    );
  }
});
