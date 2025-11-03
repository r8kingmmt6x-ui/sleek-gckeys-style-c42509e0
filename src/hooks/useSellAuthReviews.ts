import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface Review {
  author: string;
  rating: number;
  comment: string;
  date: string;
  product: string;
}

interface ReviewsResponse {
  reviews: Review[];
  error?: string;
}

export const useSellAuthReviews = (page: number = 1) => {
  return useQuery({
    queryKey: ['sellauth-reviews', page],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke<ReviewsResponse>('fetch-sellauth-reviews', {
        body: { page }
      });

      if (error) throw error;
      return data;
    },
    staleTime: 2 * 60 * 1000, // Cache for 2 minutes
  });
};
