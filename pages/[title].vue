<template>
  <TheSection class="the-single">
    <TheContainer class="md:flex gap-4">
      <div>
        <img class="rounded shadow" :src="posterImg" alt="dfg" />
      </div>
      <div class="space-y-12">
        <div class="flex flex-col lg:flex-row gap-2">
          <div class="text-gray-400">Title</div>
          <div>{{ movieData?.title }}</div>
        </div>

        <div class="flex flex-col lg:flex-row gap-2">
          <div class="text-gray-400">Overview</div>
          <div>{{ movieData?.overview }}</div>
        </div>
        <div class="flex flex-col lg:flex-row gap-2">
          <div class="text-gray-400">Adult</div>
          <div>{{ movieData?.adult }}</div>
        </div>

        <div class="flex flex-col lg:flex-row gap-2">
          <div class="text-gray-400">Belongs To Collection</div>
          <div>{{ movieData?.belongs_to_collection }}</div>

          <div class="flex flex-wrap gap-4">
            <UCard style="">
              <template #header>
                <img
                class="w-20"
                  :src="
                    getPosterImg(
                      movieData?.belongs_to_collection.poster_path ?? ''
                    )
                  "
                  :title="movieData?.belongs_to_collection.name"
                  :alt="movieData?.belongs_to_collection.name"
                />
              </template>
              {{ movieData?.belongs_to_collection.name }}
          
            </UCard>
          </div>
        </div>
        <div class="flex flex-col lg:flex-row gap-2">
          <div class="text-gray-400">Budget</div>
          <div>
            {{ movieData?.budget }}
          </div>
        </div>
        <div class="flex flex-col lg:flex-row gap-2">
          <div class="text-gray-400">Genres</div>
          <div class="space-x-4">
            <UBadge v-for="genre in movieData?.genres" :key="genre.id">
              {{ genre.name }}
            </UBadge>
          </div>
        </div>
        <div class="flex flex-col lg:flex-row gap-2">
          <div class="text-gray-400">Homepage</div>
          <div>{{ movieData?.homepage }}</div>
        </div>
        <div class="flex flex-col lg:flex-row gap-2">
          <div>Id</div>
          <div>{{ movieData?.id }}</div>
        </div>
        <div class="flex flex-col lg:flex-row gap-2">
          <div class="text-gray-400">Imdb Id</div>
          <div>{{ movieData?.imdb_id }}</div>
        </div>
        <div class="flex flex-col lg:flex-row gap-2">
          <div>Origin Country</div>
          <div class="space-x-4">
            <UBadge v-for="country in movieData?.origin_country" :key="country">
              {{ country }}
            </UBadge>
          </div>
        </div>
        <div class="flex flex-col lg:flex-row gap-2">
          <div class="text-gray-400">Original Language</div>
          <div>{{ movieData?.original_language }}</div>
        </div>
        <div class="flex flex-col lg:flex-row gap-2">
          <div>Original Title</div>
          <div>{{ movieData?.original_title }}</div>
        </div>

        <div class="flex flex-col lg:flex-row gap-2">
          <div class="text-gray-400">Popularity</div>
          <div>{{ movieData?.popularity }}</div>
        </div>
        <div class="flex flex-col lg:flex-row gap-2">
          <div>Poster Path</div>
          <div>{{ movieData?.poster_path }}</div>
        </div>
        <div class="flex flex-col lg:flex-row gap-2">
          <div class="text-gray-400">Production Companies</div>
          <div class="flex flex-wrap gap-4">
            <UCard
              v-for="(company, index) in movieData?.production_companies"
              :key="index"
            >
              <template #header>
                <img
                  :src="getLogoImg(company.logo_path ?? '')"
                  :alt="company.name"
                  :title="company.name"
                />
              </template>
              {{ company.name }}
            </UCard>
          </div>
        </div>
        <div class="flex flex-col lg:flex-row gap-2">
          <div class="text-gray-400">Production Countries</div>
          <div class="space-x-4">
            <span
              v-for="(country, index) in movieData?.production_countries"
              :key="index"
            >
              {{ country.name }}
            </span>
          </div>
        </div>
        <div class="flex flex-col lg:flex-row gap-2">
          <div class="text-gray-400">Release Date</div>
          <div>{{ movieData?.release_date }}</div>
        </div>
        <div class="flex flex-col lg:flex-row gap-2">
          <div class="text-gray-400">Revenue</div>
          <div>{{ movieData?.revenue }}</div>
        </div>
        <div class="flex flex-col lg:flex-row gap-2">
          <div class="text-gray-400">Runtime</div>
          <div>{{ movieData?.runtime }}</div>
        </div>
        <div class="flex flex-col lg:flex-row gap-2">
          <div class="text-gray-400">Spoken Languages</div>
          <div class="space-x-4">
            <UBadge
              v-for="(language, index) in movieData?.spoken_languages"
              :key="index"
            >
              {{ language.english_name }}
            </UBadge>
          </div>
        </div>
        <div class="flex flex-col lg:flex-row gap-2">
          <div class="text-gray-400">Status</div>
          <div>{{ movieData?.status }}</div>
        </div>
        <div class="flex flex-col lg:flex-row gap-2">
          <div class="text-gray-400">Tagline</div>
          <div>{{ movieData?.tagline }}</div>
        </div>

        <div class="flex gap-4">
          <div class="text-gray-400">Video</div>
          <div>{{ movieData?.video }}</div>
        </div>
        <div class="flex flex-col lg:flex-row gap-2">
          <div class="text-gray-400">Vote Average</div>
          <div>{{ movieData?.vote_average }}</div>
        </div>
        <div class="flex flex-col lg:flex-row gap-2">
          <div class="text-gray-400">Vote Count</div>
          <div>{{ movieData?.vote_count }}</div>
        </div>
      </div>
    </TheContainer>
  </TheSection>
</template>

<script setup lang="ts">
import type { Movie } from "~/types/movieModel";
const route = useRoute();

const { data: movieData } = await useFetch<Movie>(
  `/api/v3/find/movie/${route.query.id}`
);
const configuration = await useFetch("/api/v3/configuration");
console.log();

const images = computed(() => configuration.data.value?.images);
const baseUrl = computed(() => images.value?.base_url);
const backdropSizes = computed(() => images.value?.backdrop_sizes);
const posterSizes = computed(() => images.value?.poster_sizes);
const logoSizes = computed(() => images.value?.logo_sizes);
console.log(logoSizes.value);

const getLogoImg = (img: string) => {
  return `${baseUrl.value}${logoSizes.value[3]}${img}`;
};
const getBackdropImg = (img: string) => {
  return `${baseUrl.value}${backdropSizes.value[3]}${img}`;
};
const getPosterImg = (img: string) => {
  return `${baseUrl.value}${posterSizes.value[6] ?? ""}${img}`;
};

const backdropImg = computed(() => {
  return `url(${getBackdropImg(movieData.value?.backdrop_path ?? "")})`;
});
const posterImg = computed(() => {
  return `${getPosterImg(movieData.value?.poster_path ?? "")}`;
});
</script>
<style>
.the-single {
  background-image: v-bind(backdropImg);
  background-size: cover;
  min-height: 100vh;
  background-blend-mode: darken;
  background-color: rgb(0 0 0 / 70%);
}
</style>
