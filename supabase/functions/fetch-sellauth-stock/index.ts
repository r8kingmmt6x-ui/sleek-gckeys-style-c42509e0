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
  
  // Extract all button sections that contain variant information
  const buttonSections = html.split(/<button[^>]*type="button"[^>]*>/);
  
  for (let i = 1; i < buttonSections.length; i++) {
    const section = buttonSections[i];
    
    // Stop at the closing button tag
    const endIndex = section.indexOf('</button>');
    if (endIndex === -1) continue;
    
    const buttonContent = section.substring(0, endIndex);
    
    // Extract variant name - look for the first <p class="text-base">
    const nameMatch = buttonContent.match(/<p\s+class="text-base">([^<]+)<\/p>/);
    if (!nameMatch) continue;
    
    const name = nameMatch[1].trim();
    
    // Extract stock information - look for the stock span within this button
    let stock = 0;
    let inStock = false;
    
    // Check for "X In Stock" pattern
    const inStockMatch = buttonContent.match(/<span>(\d+)\s+In\s+Stock<\/span>/i);
    if (inStockMatch) {
      stock = parseInt(inStockMatch[1], 10);
      inStock = true;
    } else if (buttonContent.includes('Out of Stock')) {
      stock = 0;
      inStock = false;
    } else {
      // Skip if no stock information found
      continue;
    }
    
    variants.push({ name, stock, inStock });
  }
  
  console.log(`Parsed ${variants.length} variants:`, JSON.stringify(variants));
  return { variants };
}
