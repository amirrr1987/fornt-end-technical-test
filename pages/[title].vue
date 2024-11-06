<template>
  <TheSection class="the-single">
    <TheContainer class="flex gap-4">
      <div>
        <img class="rounded shadow" :src="posterImg" alt="dfg" >
      </div>
      <div>
        <div class="flex gap-4">
          <div>Adult</div>
          <div>{{ movieData?.adult }}</div>
        </div>

        <div class="flex gap-4">
          <div>Belongs To Collection</div>
          <div>{{ movieData?.belongs_to_collection }}</div>
        </div>
        <div class="flex gap-4">
          <div>Budget</div>
          <div>
            {{ movieData?.budget }}
          </div>
        </div>
        <div class="flex gap-4">
          <div>Genres</div>
          <div class="space-x-4">
            <UBadge v-for="genre in movieData?.genres" :key="genre.id">
              {{ genre.name }}
            </UBadge>
          </div>
        </div>
        <div class="flex gap-4">
          <div>Homepage</div>
          <div>{{ movieData?.homepage }}</div>
        </div>
        <div class="flex gap-4">
          <div>Id</div>
          <div>{{ movieData?.id }}</div>
        </div>
        <div class="flex gap-4">
          <div>Imdb Id</div>
          <div>{{ movieData?.imdb_id }}</div>
        </div>
        <div class="flex gap-4">
          <div>Origin Country</div>
          <div class="space-x-4">
            <UBadge v-for="country in movieData?.origin_country" :key="country">
              {{ country }}
            </UBadge>
          </div>
        </div>
        <div class="flex gap-4">
          <div>Original Language</div>
          <div>{{ movieData?.original_language }}</div>
        </div>
        <div class="flex gap-4">
          <div>Original Title</div>
          <div>{{ movieData?.original_title }}</div>
        </div>
        <div class="flex gap-4">
          <div>Overview</div>
          <div>{{ movieData?.overview }}</div>
        </div>
        <div class="flex gap-4">
          <div>Popularity</div>
          <div>{{ movieData?.popularity }}</div>
        </div>
        <div class="flex gap-4">
          <div>Poster Path</div>
          <div>{{ movieData?.poster_path }}</div>
        </div>
        <div class="flex gap-4">
          <div>Production Companies</div>
          <div class="flex">
            <UCard
              v-for="(company, index) in movieData?.production_companies"
              :key="index"
            >
              <template #header>
                <img :src="getLogoImg(company.logo_path)" alt="" />
              </template>
              {{ company.name }}
            </UCard>
          </div>
        </div>
        <div class="flex gap-4">
          <div>Production Countries</div>
          <div class="space-x-4">
            <span
              v-for="(country, index) in movieData?.production_countries"
              :key="index"
            >
              {{ country.name }}
            </span>
          </div>
        </div>
        <div class="flex gap-4">
          <div>Release Date</div>
          <div>{{ movieData?.release_date }}</div>
        </div>
        <div class="flex gap-4">
          <div>Revenue</div>
          <div>{{ movieData?.revenue }}</div>
        </div>
        <div class="flex gap-4">
          <div>Runtime</div>
          <div>{{ movieData?.runtime }}</div>
        </div>
        <div class="flex gap-4">
          <div>Spoken Languages</div>
          <div class="space-x-4">
            <UBadge
              v-for="(language, index) in movieData?.spoken_languages"
              :key="index"
            >
              {{ language.english_name }}
            </UBadge>
          </div>
        </div>
        <div class="flex gap-4">
          <div>Status</div>
          <div>{{ movieData?.status }}</div>
        </div>
        <div class="flex gap-4">
          <div>Tagline</div>
          <div>{{ movieData?.tagline }}</div>
        </div>
        <div class="flex gap-4">
          <div>Title</div>
          <div>{{ movieData?.title }}</div>
        </div>
        <div class="flex gap-4">
          <div>Video</div>
          <div>{{ movieData?.video }}</div>
        </div>
        <div class="flex gap-4">
          <div>Vote Average</div>
          <div>{{ movieData?.vote_average }}</div>
        </div>
        <div class="flex gap-4">
          <div>Vote Count</div>
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
const backdropImg = computed(() => {
  return `url(${baseUrl.value}${backdropSizes.value[3]}${movieData.value?.backdrop_path})`;
});
const posterImg = computed(() => {
  return `${baseUrl.value}${posterSizes.value[6] ?? ""}${movieData.value?.poster_path}`;
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
