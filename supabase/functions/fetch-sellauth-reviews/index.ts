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

    // Get page number from request body, default to 1
    const body = await req.json().catch(() => ({}));
    const page = parseInt(body.page || '1');
    
    console.log(`Fetching reviews from SellAuth API for shop ${shopId}, page ${page}`);
    
    const response = await fetch(`https://api.sellauth.com/v1/shops/${shopId}/feedbacks?page=${page}`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/json',
      }
    });

    if (!response.ok) {
      console.error(`SellAuth API error: ${response.status} ${response.statusText}`);
      throw new Error(`Failed to fetch reviews: ${response.status}`);
    }

    const data = await response.json();
    console.log(`Successfully fetched data from SellAuth API for page ${page}`);
    
    const reviews: Review[] = [];
    
    // Parse the SellAuth API response - handle both array and paginated response
    const feedbacks = Array.isArray(data) ? data : (data.data || []);
    console.log(`Found ${feedbacks.length} feedbacks on page ${page}`);
    
    if (feedbacks && Array.isArray(feedbacks)) {
      feedbacks.forEach((feedback: any) => {
        try {
          const review: Review = {
            author: feedback.author || feedback.customer?.name || 'Customer',
            rating: feedback.rating || feedback.stars || 5,
            comment: feedback.message || feedback.comment || feedback.review || 'Automatic feedback after 7 days.',
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

          reviews.push(review);
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
