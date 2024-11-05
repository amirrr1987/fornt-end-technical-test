<template>
  <TheSection>
    <TheContainer>
      <UForm class="flex flex-wrap gap-4 mb-12">
        <UFormGroup label="Width Genres">
          <USelectMenu v-model="withGenresValue" :options="genres?.genres" option-attribute="name" valueAttribute="id"
            class="block !w-44" multiple />
        </UFormGroup>

        <UFormGroup label="Without Genres">
          <USelectMenu v-model="withoutGenresValue" :options="genres?.genres" option-attribute="name"
            valueAttribute="id" class="block !w-44" multiple />
        </UFormGroup>

        <UFormGroup label="Type">
          <URadioGroup v-model="type" :options="typeOptions" :ui="{
            fieldset: 'flex flex-row ',
          }" :uiRadio="{
            base: 'hidden',
          }">
            <template #label="label">
              <UButton class="w-14" :class="getColor(label.option.value)" :label="label.option.label"
                :icon="label.option.icon" @click="() => (type = label.option.value)" />
            </template>
          </URadioGroup>
        </UFormGroup>
      </UForm>

      <div class="mb-12 flex gap-x-12">
        <UFormGroup label="Width genres"  v-if="withGenresValue.length > 0">
          <UButton v-for="genre in getGenres(withGenresValue)"
            @click="useRemove(withGenresValue, (g) => g === genre.id)" icon="i-heroicons-x-mark">
            {{ genre.name }}
          </UButton>
        </UFormGroup>

        <UFormGroup label="Width genres" v-if="withoutGenresValue.length> 0">
          <UButton v-for="genre in getGenres(withoutGenresValue)"
            @click="useRemove(withoutGenresValue, (g) => g === genre.id)" icon="i-heroicons-x-mark">
            {{ genre.name }}
          </UButton>
        </UFormGroup>
      </div>

      <div>
        <template v-if="result.status.value === 'error'"> error </template>
        <template v-if="result.status.value === 'pending'">
          <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            <USkeleton class="h-24 sm:h-26 lg:h-28 w-full" v-for="item in 5" />
          </div>
        </template>
        <template v-if="result.status.value === 'success'">
          <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            <template v-if="type === 'movie'">
              <MovieCard v-for="item in result.data.value?.results" :movie="item as MovieItem"
                :genres="getGenres(item.genre_ids)" />
            </template>
            <template v-if="type === 'tv'">
              <TvCard v-for="item in result.data.value?.results" :tv="item as TvItem"
                :genres="getGenres(item.genre_ids)" />
            </template>
          </div>
        </template>
      </div>

      <div class="flex justify-center md:justify-start">
        <UPagination class="my-6" v-model="page" :total="500" show-first show-last 

:to="(page: number) => ({
      query: { page },
      // Hash is specified here to prevent the page from scrolling to the top
      hash: '#links'
    })"

/>





      </div>
    </TheContainer>
  </TheSection>
</template>
<script setup lang="ts">
import type { Discover, MovieItem, TvItem } from "~/types/discoverModel";
import type { Genre } from "~/types/genreModel";
import { typeOptions } from "~/constants";
const type = useRouteQuery<string>("type", "movie", {
  transform: String,
});
const { data: genres } = await useFetch<Genre>(`/api/v3/genre/${type.value}`);

const withGenresValue = ref<number[]>([]);
const withGenresComputed = computed(() => {
  let temp = "";
  withGenresValue.value.forEach((item) => {
    temp += `${item},`;
  });
  return temp;
});
watch(withGenresComputed, () => (with_genres.value = withGenresComputed.value));
const with_genres = useRouteQuery<string>("with_genres", "");

const withoutGenresValue = ref<number[]>([]);
const withoutGenresComputed = computed(() => {
  let temp = "";
  withoutGenresValue.value.forEach((item) => {
    temp += `${item},`;
  });
  return temp;
});
watch(
  withoutGenresComputed,
  () => (without_genres.value = withoutGenresComputed.value)
);
const without_genres = useRouteQuery<string>("without_genres", "");

const page = useRouteQuery("page", "1", {
  transform: Number,
});
const api_key = ref("55ee9c566996339d9859d1ec68533e20");
const setQuery = () => {
  return {
    page,
    with_genres,
    without_genres,
    type,
    api_key,
  };
};
const computedApi = computed(() => {
  return `https://api.themoviedb.org/3/discover/${type.value}`;
});
const result = await useFetch<Discover>(computedApi, {
  query: setQuery(),
  watch: [type],
});

const getGenres = (ids: number[]) => {
  const list: any[] = [];
  ids.forEach((id: number) => {
    const foundGenre = genres.value?.genres.find((genre) => genre.id === id);
    if (foundGenre) {
      list.push(foundGenre);
    }
  });
  return list;
};

const getColor = (value: string) => {
  return type.value == value ? "!bg-primary-500" : "!bg-primary-200";
};
</script>
<style>
.loader {
  width: 80px;
  height: 40px;
  border-radius: 0 0 100px 100px;
  border: 5px solid #538a2d;
  border-top: 0;
  box-sizing: border-box;
  background:
    radial-gradient(farthest-side at top,
      #0000 calc(100% - 5px),
      #e7ef9d calc(100% - 4px)),
    radial-gradient(2px 3px, #5c4037 89%, #0000) 0 0/17px 12px,
    #ff1643;
  --c: radial-gradient(farthest-side, #000 94%, #0000);
  -webkit-mask:
    linear-gradient(#0000 0 0),
    var(--c) 12px -8px,
    var(--c) 29px -8px,
    var(--c) 45px -6px,
    var(--c) 22px -2px,
    var(--c) 34px 6px,
    var(--c) 21px 6px,
    linear-gradient(#000 0 0);
  mask:
    linear-gradient(#000 0 0),
    var(--c) 12px -8px,
    var(--c) 29px -8px,
    var(--c) 45px -6px,
    var(--c) 22px -2px,
    var(--c) 34px 6px,
    var(--c) 21px 6px,
    linear-gradient(#0000 0 0);
  -webkit-mask-composite: destination-out;
  mask-composite: exclude, add, add, add, add, add, add;
  animation: l8 3s infinite;
}

@keyframes l8 {
  0% {
    -webkit-mask-size:
      auto,
      0 0,
      0 0,
      0 0,
      0 0,
      0 0,
      0 0;
  }

  15% {
    -webkit-mask-size:
      auto,
      20px 20px,
      0 0,
      0 0,
      0 0,
      0 0,
      0 0;
  }

  30% {
    -webkit-mask-size:
      auto,
      20px 20px,
      20px 20px,
      0 0,
      0 0,
      0 0,
      0 0;
  }

  45% {
    -webkit-mask-size:
      auto,
      20px 20px,
      20px 20px,
      20px 20px,
      0 0,
      0 0,
      0 0;
  }

  60% {
    -webkit-mask-size:
      auto,
      20px 20px,
      20px 20px,
      20px 20px,
      20px 20px,
      0 0,
      0 0;
  }

  75% {
    -webkit-mask-size:
      auto,
      20px 20px,
      20px 20px,
      20px 20px,
      20px 20px,
      20px 20px,
      0 0;
  }

  90%,
  100% {
    -webkit-mask-size:
      auto,
      20px 20px,
      20px 20px,
      20px 20px,
      20px 20px,
      20px 20px,
      20px 20px;
  }
}
</style>
