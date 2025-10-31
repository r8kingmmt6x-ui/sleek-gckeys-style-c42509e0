import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { productSlug } = await req.json();
    
    if (!productSlug) {
      return new Response(
        JSON.stringify({ error: 'Product slug is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const apiKey = Deno.env.get('SELLAUTH_API_KEY');
    const shopId = Deno.env.get('SELLAUTH_SHOP_ID');

    if (!apiKey || !shopId) {
      console.error('SellAuth credentials not configured');
      return new Response(
        JSON.stringify({ error: 'SellAuth API credentials not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Fetching stock for product: ${productSlug}`);
    
    // Fetch products from SellAuth API with path filter
    const url = new URL(`https://api.sellauth.com/v1/shops/${shopId}/products`);
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('SellAuth API error:', response.status, errorText);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch from SellAuth API' }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    console.log('SellAuth API response:', JSON.stringify(data));

    // Parse stock from API response
    const stockData = parseStockFromAPI(data, productSlug);

    console.log(`Stock data parsed:`, stockData);

    return new Response(
      JSON.stringify(stockData),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error fetching stock:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

function parseStockFromAPI(data: any, productSlug: string): { variants: Array<{ name: string; stock: number; inStock: boolean }> } {
  const variants: Array<{ name: string; stock: number; inStock: boolean }> = [];
  
  try {
    // The API response should have a data array with products
    const products = data.data || [];
    console.log(`Found ${products.length} products in API response`);
    
    // Find the product matching the slug
    const product = products.find((p: any) => p.path === productSlug);
    
    if (!product) {
      console.log(`Product with slug "${productSlug}" not found`);
      return { variants };
    }
    
    console.log(`Found product: ${product.name}`);
    
    // Get variants from the product
    const productVariants = product.variants || [];
    console.log(`Product has ${productVariants.length} variants`);
    
    for (const variant of productVariants) {
      const name = variant.name || '';
      const stock = variant.stock ?? 0;
      const inStock = stock > 0 || stock === -1; // -1 often means unlimited stock
      
      console.log(`Variant: ${name}, Stock: ${stock}, In Stock: ${inStock}`);
      variants.push({ name, stock: stock === -1 ? 999 : stock, inStock });
    }
    
  } catch (error) {
    console.error('Error parsing API response:', error);
  }
  
  console.log(`Parsed ${variants.length} variants:`, JSON.stringify(variants));
  return { variants };
}
