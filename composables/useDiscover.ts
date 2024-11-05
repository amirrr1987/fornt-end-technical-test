import type { Discover } from "~/types/discoverModel";

export const useDiscover = async (type: string, query: Record<string, any>) => {
  const url = `https://api.themoviedb.org/3/discover/${params.type}?api_key=55ee9c566996339d9859d1ec68533e20&${useQueryString(query)}`;
  const params = getRouterParams(event);

  const params = new URLSearchParams(query).toString();
  const { data, pending, error } = await useFetch<Discover>(
    `/api/discover/${type}?${params}`
  );

  return { data, pending, error };
};
