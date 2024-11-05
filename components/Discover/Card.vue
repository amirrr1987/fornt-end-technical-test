<script setup lang="ts">
import type { MovieItem, TvItem } from "~/types/discoverModel";
import type { GenreElement } from "~/types/genreModel";

interface Props {
  item?: MovieItem | TvItem;
  genres: GenreElement[];
  type: "movie" | "tv";
}

const props = withDefaults(defineProps<Props>(), {
  genres: () => [] as GenreElement[],
  type: "movie",
  item: () => {},
});

const computedItem = computed<MovieItem | TvItem>(() => {
  if (props.type === "movie") {
    return props.item as MovieItem;
  } else {
    return props.item as TvItem;
  }
});
const cardUi = {
  base: "overflow-hidden",
  background: "bg-white dark:bg-gray-900",
  rounded: "rounded-lg",
  shadow: "shadow",
  body: {
    base: "",
    background: "",
    padding: "px-4 py-5 sm:p-6",
  },
  header: {
    base: "",
    background: "",
    padding: "px-0 py-0 sm:px-0",
  },
  footer: {
    base: "",
    background: "",
    padding: "px-4 py-4 sm:px-6",
  },
};
// const to = computed(() => {
//   return {
//     name: "title",
//     // params: {
//     //   title:
//     //     props.type === "movie"
//     //       ? computedItem.value.title.replace(/ /g, "-")
//     //       : computedItem.value.name.replace(/ /g, "-"),
//     // },
//     query: {
//       id: computedItem.value.id,
//       type: props.type,
//     },
//   };
// });
</script>

<template>
  <NuxtLink v-if="props.type == 'movie'">
    <UCard :ui="cardUi">
      {{ computedItem.title }}

      <!-- <template #header>
        <NuxtImg
          v-if="computedItem.backdrop_path"
          class="w-full"
          :src="`http://image.tmdb.org/t/p/original/${props.item.backdrop_path}`"
        />
        <USkeleton v-else class="w-full" />
      </template>
      <h3 class="font-bold" v-if="props.item.title || props.item.name">
        {{ props.item.title || props.item.name }}
      </h3>
      <h3 class="font-bold">
        {{ props.type === "movie" ? props.item.title : props.item.name }}
      </h3>
      <USkeleton />

      <template #footer>
        <div class="flex gap-2" v-if="props.item.genre_ids">
          <UBadge v-for="item in props.genres" color="rose" variant="subtle">
            {{ item.name }}
          </UBadge>
        </div>
        <USkeleton v-else class="h-4" />
      </template> -->
    </UCard>
  </NuxtLink>

  <NuxtLink v-if="props.type == 'tv'">
    <UCard :ui="cardUi">
      {{ computedItem.name }}

      <!-- <template #header>
        <NuxtImg
          v-if="computedItem.backdrop_path"
          class="w-full"
          :src="`http://image.tmdb.org/t/p/original/${props.item.backdrop_path}`"
        />
        <USkeleton v-else class="w-full" />
      </template>
      <h3 class="font-bold" v-if="props.item.title || props.item.name">
        {{ props.item.title || props.item.name }}
      </h3>
      <h3 class="font-bold">
        {{ props.type === "movie" ? props.item.title : props.item.name }}
      </h3>
      <USkeleton />

      <template #footer>
        <div class="flex gap-2" v-if="props.item.genre_ids">
          <UBadge v-for="item in props.genres" color="rose" variant="subtle">
            {{ item.name }}
          </UBadge>
        </div>
        <USkeleton v-else class="h-4" />
      </template> -->
    </UCard>
  </NuxtLink>
</template>

<style scoped></style>
