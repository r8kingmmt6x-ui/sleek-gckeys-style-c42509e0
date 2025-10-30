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

    console.log(`Fetching stock for product: ${productSlug}`);
    
    // Fetch the SellAuth product page
    const response = await fetch(`https://gckeys.mysellauth.com/product/${productSlug}`);
    const html = await response.text();

    // Parse stock counts from HTML
    const stockData = parseStockFromHTML(html);

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

function parseStockFromHTML(html: string): { variants: Array<{ name: string; stock: number; inStock: boolean }> } {
  const variants: Array<{ name: string; stock: number; inStock: boolean }> = [];
  
  // Match variant buttons with stock information
  const variantRegex = /<button[^>]*type="button"[^>]*>([\s\S]*?)<\/button>/g;
  const matches = [...html.matchAll(variantRegex)];
  
  for (const match of matches) {
    const buttonHtml = match[1];
    
    // Extract variant name
    const nameMatch = buttonHtml.match(/<p class="text-base">([^<]+)<\/p>/);
    const name = nameMatch ? nameMatch[1].trim() : '';
    
    if (!name) continue;
    
    // Extract stock information
    const stockMatch = buttonHtml.match(/<span>(\d+) In Stock<\/span>|<span>Out of Stock<\/span>/);
    
    if (stockMatch) {
      if (stockMatch[0].includes('Out of Stock')) {
        variants.push({ name, stock: 0, inStock: false });
      } else if (stockMatch[1]) {
        const stock = parseInt(stockMatch[1], 10);
        variants.push({ name, stock, inStock: true });
      }
    }
  }
  
  return { variants };
}
