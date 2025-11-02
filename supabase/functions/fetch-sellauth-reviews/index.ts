import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts";

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
    console.log('Fetching reviews from SellAuth');
    
    const response = await fetch('https://gckeys.mysellauth.com/feedback', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      }
    });

    if (!response.ok) {
      console.error(`SellAuth API error: ${response.status}`);
      throw new Error(`Failed to fetch reviews: ${response.status}`);
    }

    const html = await response.text();
    console.log('Successfully fetched HTML, parsing reviews...');
    
    // Parse HTML using DOMParser
    const doc = new DOMParser().parseFromString(html, 'text/html');
    if (!doc) {
      throw new Error('Failed to parse HTML');
    }

    const reviews: Review[] = [];
    
    // Try multiple selectors to find review elements
    const possibleSelectors = [
      '.feedback-item',
      '[data-feedback]',
      '.review-item',
      '.review',
      '[class*="feedback"]',
      '[class*="review"]'
    ];

    let reviewElements = null;
    for (const selector of possibleSelectors) {
      const elements = doc.querySelectorAll(selector);
      if (elements && elements.length > 0) {
        reviewElements = elements;
        console.log(`Found ${elements.length} reviews using selector: ${selector}`);
        break;
      }
    }

    if (reviewElements && reviewElements.length > 0) {
      reviewElements.forEach((el: any) => {
        try {
          const author = el.querySelector('.feedback-author, .review-author, [class*="author"]')?.textContent?.trim() || 'Anonymous';
          const ratingEl = el.querySelector('.feedback-rating, .review-rating, [class*="rating"]');
          const rating = ratingEl ? parseInt(ratingEl.getAttribute('data-rating') || '5') : 5;
          const comment = el.querySelector('.feedback-comment, .review-comment, .comment, [class*="comment"]')?.textContent?.trim() || '';
          const date = el.querySelector('.feedback-date, .review-date, .date, [class*="date"]')?.textContent?.trim() || '';
          const product = el.querySelector('.feedback-product, .review-product, .product, [class*="product"]')?.textContent?.trim() || '';
          
          if (comment) {
            reviews.push({ author, rating, comment, date, product });
          }
        } catch (err) {
          console.error('Error parsing review element:', err);
        }
      });
    } else {
      console.log('No review elements found with any selector, returning empty array');
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
