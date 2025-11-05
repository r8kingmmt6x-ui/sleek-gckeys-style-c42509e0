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
    
    // Fetch products to calculate total sales
    const productsResponse = await fetch(`https://api.sellauth.com/v1/shops/${shopId}/products`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/json',
      }
    });

    if (!productsResponse.ok) {
      console.error(`SellAuth API error: ${productsResponse.status} ${productsResponse.statusText}`);
      throw new Error(`Failed to fetch products: ${productsResponse.status}`);
    }

    const productsData = await productsResponse.json();
    console.log('Successfully fetched products from SellAuth API');
    
    // Calculate total sales from all products
    const products = productsData.data || [];
    const totalSales = products.reduce((sum: number, product: any) => sum + (product.products_sold || 0), 0);
    
    // Fetch shop info for rating
    const shopResponse = await fetch(`https://api.sellauth.com/v1/shops/${shopId}`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/json',
      }
    });

    let rating = 0;
    if (shopResponse.ok) {
      const shopData = await shopResponse.json();
      rating = parseFloat(shopData.average_rating || shopData.rating || 0);
    }
    
    // Fetch customers count - get first page to check total
    const customersResponse = await fetch(`https://api.sellauth.com/v1/shops/${shopId}/customers?perPage=1`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/json',
      }
    });

    let buyersCount = 0;
    if (customersResponse.ok) {
      const customersData = await customersResponse.json();
      console.log('Customers response:', JSON.stringify(customersData));
      // SellAuth uses pagination with total, last_page, per_page
      buyersCount = customersData.total || 0;
    }

    const stats: ShopStats = {
      sales: totalSales,
      buyers: buyersCount,
      rating: rating,
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
