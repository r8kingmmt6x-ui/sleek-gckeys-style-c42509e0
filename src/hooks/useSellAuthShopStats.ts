import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface ShopStats {
  sales: number;
  buyers: number;
  rating: number;
}

export const useSellAuthShopStats = () => {
  return useQuery({
    queryKey: ['sellauth-shop-stats'],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke<ShopStats>('fetch-sellauth-shop-stats');

      if (error) throw error;
      return data;
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    refetchInterval: 5 * 60 * 1000, // Auto-refresh every 5 minutes
  });
};
