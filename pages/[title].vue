<template>
  <TheSection class="the-single">
    <TheContainer class="flex gap-4">
      <div>
        <img class="rounded shadow" :src="posterImg" alt="dfg" />
      </div>
      <div>
        <div class="flex gap-4">
          <div>Adult</div>
          <div>{{ data?.adult }}</div>
        </div>

        <div class="flex gap-4">
          <div>Belongs To Collection</div>
          <div>{{ data?.belongs_to_collection }}</div>
        </div>
        <div class="flex gap-4">
          <div>Budget</div>
          <div>
            <UBadge v-for="item in data?.budget" :key="item">{{ item }}</UBadge>
          </div>
        </div>
        <div class="flex gap-4">
          <div>Genres</div>
          <div>{{ data?.genres }}</div>
        </div>
        <div class="flex gap-4">
          <div>Homepage</div>
          <div>{{ data?.homepage }}</div>
        </div>
        <div class="flex gap-4">
          <div>Id</div>
          <div>{{ data?.id }}</div>
        </div>
        <div class="flex gap-4">
          <div>Imdb Id</div>
          <div>{{ data?.imdb_id }}</div>
        </div>
        <div class="flex gap-4">
          <div>Origin Country</div>
          <div>{{ data?.origin_country }}</div>
        </div>
        <div class="flex gap-4">
          <div>Original Language</div>
          <div>{{ data?.original_language }}</div>
        </div>
        <div class="flex gap-4">
          <div>Original Title</div>
          <div>{{ data?.original_title }}</div>
        </div>
        <div class="flex gap-4">
          <div>Overview</div>
          <div>{{ data?.overview }}</div>
        </div>
        <div class="flex gap-4">
          <div>Popularity</div>
          <div>{{ data?.popularity }}</div>
        </div>
        <div class="flex gap-4">
          <div>Poster Path</div>
          <div>{{ data?.poster_path }}</div>
        </div>
        <div class="flex gap-4">
          <div>Production Companies</div>
          <div>{{ data?.production_companies }}</div>
        </div>
        <div class="flex gap-4">
          <div>Production Countries</div>
          <div>{{ data?.production_countries }}</div>
        </div>
        <div class="flex gap-4">
          <div>Release Date</div>
          <div>{{ data?.release_date }}</div>
        </div>
        <div class="flex gap-4">
          <div>Revenue</div>
          <div>{{ data?.revenue }}</div>
        </div>
        <div class="flex gap-4">
          <div>Runtime</div>
          <div>{{ data?.runtime }}</div>
        </div>
        <div class="flex gap-4">
          <div>Spoken Languages</div>
          <div>{{ data?.spoken_languages }}</div>
        </div>
        <div class="flex gap-4">
          <div>Status</div>
          <div>{{ data?.status }}</div>
        </div>
        <div class="flex gap-4">
          <div>Tagline</div>
          <div>{{ data?.tagline }}</div>
        </div>
        <div class="flex gap-4">
          <div>Title</div>
          <div>{{ data?.title }}</div>
        </div>
        <div class="flex gap-4">
          <div>Video</div>
          <div>{{ data?.video }}</div>
        </div>
        <div class="flex gap-4">
          <div>Vote Average</div>
          <div>{{ data?.vote_average }}</div>
        </div>
        <div class="flex gap-4">
          <div>Vote Count</div>
          <div>{{ data?.vote_count }}</div>
        </div>
      </div>
    </TheContainer>
  </TheSection>
</template>

<script setup lang="ts">
import type { Movie } from "~/types/movieModel";
const configuration = useConfiguration();

const result = await configuration.fetch();

console.log();

const backdropImg = computed(() => {
  const baseUrl = result?.data.value.images.base_url;

  const size = result?.data.value.images.backdrop_sizes[3];

  return `url(${baseUrl}${size}${data.value?.backdrop_path})`;
});
const posterImg = computed(() => {
  const baseUrl = result?.data.value.images.base_url;
  const size = result?.data.value.images.poster_sizes[6];

  return `${baseUrl}${size}${data.value?.poster_path}`;
});

console.log("🚀 ~ result:");
const route = useRoute();

const { data } = await useFetch<Movie>(`/api/v3/find/movie/${route.query.id}`);
</script>
<style>
.the-single {
  background-image: v-bind(backdropImg);
  background-size: cover;
  min-height: 100vh;
  background-blend-mode: darken;
  background-color: rgb(0 0 0 / 53%);
}
</style>
