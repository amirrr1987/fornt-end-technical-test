import useAxios from "./axios";

const axios = useAxios();

export const getGenreApi = async ({ type }: { type: string }) => {
  return await axios.get({
    url: `genre/${type}/list`,
    query: [],
    data: {},
  });
};
