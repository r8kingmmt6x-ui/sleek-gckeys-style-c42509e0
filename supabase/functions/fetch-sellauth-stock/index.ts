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
  
  // Match each button element containing variant info
  const buttonRegex = /<button[^>]*type="button"[^>]*>([\s\S]*?)<\/button>/g;
  let match;
  let buttonCount = 0;
  
  while ((match = buttonRegex.exec(html)) !== null) {
    buttonCount++;
    const buttonContent = match[1];
    console.log(`\nProcessing button #${buttonCount}`);
    console.log('Button content preview:', buttonContent.substring(0, 200));
    
    // Extract variant name from <p class="text-base">
    const nameMatch = buttonContent.match(/<p[^>]*class="text-base"[^>]*>([^<]+)<\/p>/);
    if (!nameMatch) {
      console.log('No name match found');
      continue;
    }
    
    const name = nameMatch[1].trim();
    console.log('Found variant name:', name);
    
    // Look for stock info in nested span within text-xs paragraph
    let stock = 0;
    let inStock = false;
    
    // Match the stock span content
    const stockSpanMatch = buttonContent.match(/<span>(\d+)\s+In\s+Stock<\/span>/i);
    const outOfStockMatch = buttonContent.match(/<span>Out\s+of\s+Stock<\/span>/i);
    
    if (stockSpanMatch) {
      stock = parseInt(stockSpanMatch[1], 10);
      inStock = true;
      console.log('Found in stock:', stock);
      variants.push({ name, stock, inStock });
    } else if (outOfStockMatch) {
      stock = 0;
      inStock = false;
      console.log('Found out of stock');
      variants.push({ name, stock, inStock });
    } else {
      console.log('No stock match found in button');
    }
  }
  
  console.log(`\nTotal buttons processed: ${buttonCount}`);
  console.log(`Parsed ${variants.length} variants:`, JSON.stringify(variants));
  return { variants };
}
