<script setup lang="ts">
import type { TvItem } from "~/types/discoverModel";
import type { GenreElement } from "~/types/genreModel";

interface Props {
    tv?: TvItem;
    genres: GenreElement[];
}

const props = withDefaults(defineProps<Props>(), {
    genres: () => [] as GenreElement[],
    type: "tv",
    tv: () => ({}) as TvItem,
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
    <NuxtLink to="/">
        <UCard :ui="cardUi">
            <template #header>
                <img :src="`http://image.tmdb.org/t/p/original/${props.tv.poster_path}`" alt="">
                <!-- <NuxtImg :src="`http://ge.tmdb.org/t/p/original/${props.movie.backdrop_path}`" /> -->
            </template>
            <h3 class="font-bold">
                {{ props.tv.name }}
            </h3>
            <USkeleton />
            <template #footer>
                <div class="space-y-4" v-if="props.tv.genre_ids">
                    <div>
                        {{ props.tv.first_air_date }}
                    </div>
                    <div class="flex gap-2 flex-wrap">
                        <UBadge v-for="item in props.genres" color="rose" variant="subtle">
                            {{ item.name }}
                        </UBadge>
                    </div>
                </div>
                <USkeleton v-else class="h-4" />
            </template>
        </UCard>
    </NuxtLink>
</template>

<style scoped></style>
