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
  
  console.log('Starting HTML parsing...');
  console.log('HTML length:', html.length);
  
  // Look for variant buttons with a more flexible approach
  // Split by text-base paragraphs which contain variant names
  const sections = html.split(/<p[^>]*class="text-base"[^>]*>/);
  console.log(`Found ${sections.length - 1} potential variant sections`);
  
  for (let i = 1; i < sections.length; i++) {
    const section = sections[i];
    
    // Extract name (up to the closing </p>)
    const nameEndIndex = section.indexOf('</p>');
    if (nameEndIndex === -1) continue;
    
    const name = section.substring(0, nameEndIndex).trim();
    console.log(`\nFound variant: ${name}`);
    
    // Look ahead in this section for stock info
    const stockInMatch = section.match(/(\d+)\s+In\s+Stock/i);
    const outOfStockMatch = section.match(/Out\s+of\s+Stock/i);
    
    if (stockInMatch) {
      const stock = parseInt(stockInMatch[1], 10);
      console.log(`Stock: ${stock}`);
      variants.push({ name, stock, inStock: true });
    } else if (outOfStockMatch) {
      console.log('Out of stock');
      variants.push({ name, stock: 0, inStock: false });
    }
  }
  
  console.log(`\nParsed ${variants.length} variants:`, JSON.stringify(variants));
  return { variants };
}
