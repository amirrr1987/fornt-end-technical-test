export const useConfiguration = () => {
  const url = `https://api.themoviedb.org/3/configuration?api_key=55ee9c566996339d9859d1ec68533e20`;
  const fetch = async () => {
    try {
      const { data, error } = await useFetch(url);
      if (error.value) {
        throw error;
      }
      return { data };
    } catch (error) {
      console.log("🚀 ~ fetch ~ error:", error);
    }
  };
  return { fetch };
};
