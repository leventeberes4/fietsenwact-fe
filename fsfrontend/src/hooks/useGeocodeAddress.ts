import { useQuery } from "@tanstack/react-query";

export function useGeocodeAddress(address: string) {
  return useQuery({
    queryKey: ["geocode", address],
    queryFn: async () => {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          address
        )}`
      );
      const data = await res.json();
      return data[0];
    },
    enabled: !!address,
    refetchOnMount: false,
  });
}
