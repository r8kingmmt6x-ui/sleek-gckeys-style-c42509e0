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
    
    const response = await fetch(`https://api.sellauth.com/v1/shops/${shopId}/feedbacks`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/json',
      }
    });

    if (!response.ok) {
      console.error(`SellAuth API error: ${response.status} ${response.statusText}`);
      const errorText = await response.text();
      console.error(`Error response: ${errorText}`);
      throw new Error(`Failed to fetch reviews: ${response.status}`);
    }

    const data = await response.json();
    console.log(`Successfully fetched data from SellAuth API`);
    
    const reviews: Review[] = [];
    
    // Parse the SellAuth API response
    if (data && Array.isArray(data)) {
      data.forEach((feedback: any) => {
        try {
          // Skip automatic feedbacks
          if (feedback.is_automatic === 1 || feedback.message === 'Automatic feedback after 7 days.') {
            return;
          }

          const review: Review = {
            author: 'Customer',
            rating: feedback.rating || 5,
            comment: feedback.message || '',
            date: feedback.created_at ? new Date(feedback.created_at).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'short', 
              day: '2-digit' 
            }) : '',
            product: feedback.listing?.title || feedback.listing?.name || '',
          };

          if (review.comment) {
            reviews.push(review);
          }
        } catch (err) {
          console.error('Error parsing review:', err);
        }
      });
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
