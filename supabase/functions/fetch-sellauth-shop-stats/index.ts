import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ShopStats {
  sales: number;
  buyers: number;
  rating: number;
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

    console.log(`Fetching shop stats from SellAuth API for shop ${shopId}`);
    
    const response = await fetch(`https://api.sellauth.com/v1/shops/${shopId}`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/json',
      }
    });

    if (!response.ok) {
      console.error(`SellAuth API error: ${response.status} ${response.statusText}`);
      throw new Error(`Failed to fetch shop stats: ${response.status}`);
    }

    const data = await response.json();
    console.log('Successfully fetched shop stats from SellAuth API');
    
    const stats: ShopStats = {
      sales: data.total_sales || data.orders_count || 0,
      buyers: data.customers_count || data.unique_customers || 0,
      rating: data.average_rating || data.rating || 0,
    };

    console.log(`Parsed stats:`, stats);

    return new Response(
      JSON.stringify(stats),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
  } catch (error) {
    console.error('Error fetching shop stats:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error',
        sales: 0,
        buyers: 0,
        rating: 0
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );
  }
});
