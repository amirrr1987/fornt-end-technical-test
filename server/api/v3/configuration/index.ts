import type { Configuration } from "~/types/configurationModel";

export default defineEventHandler(async () => {
  const url = `https://api.themoviedb.org/3/configuration?api_key=55ee9c566996339d9859d1ec68533e20`;
  return await $fetch<Configuration>(url);
});
