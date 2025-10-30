import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface StockVariant {
  name: string;
  stock: number;
  inStock: boolean;
}

interface StockData {
  variants: StockVariant[];
}

export const useSellAuthStock = (productSlug: string) => {
  return useQuery({
    queryKey: ['sellauth-stock', productSlug],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('fetch-sellauth-stock', {
        body: { productSlug }
      });

      if (error) throw error;
      return data as StockData;
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    refetchInterval: 5 * 60 * 1000, // Auto-refresh every 5 minutes
  });
};
