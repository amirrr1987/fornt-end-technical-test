<script setup lang="ts">
import type { MovieItem, } from "~/types/discoverModel";
import type { GenreElement } from "~/types/genreModel";

interface Props {
    movie?: MovieItem;
    genres: GenreElement[];
}

const props = withDefaults(defineProps<Props>(), {
    genres: () => [] as GenreElement[],
    movie: () => ({}) as MovieItem,
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
</script>
<template>
    <NuxtLink :to="{
        name: 'title',
        params: {
            title: props.movie.title.replace(/ /g, '-'),
        },
        query: {
            id: props.movie.id,
            type: 'movie',
        },
    }">
        <UCard :ui="cardUi">
            <template #header>
                <img :src="`http://image.tmdb.org/t/p/original/${props.movie.poster_path}`" alt="">
                <!-- <NuxtImg :src="`http://image.tmdb.org/t/p/original/${props.movie.backdrop_path}`" /> -->
            </template>
            <h3 class="font-bold">
                {{ props.movie.title }}
            </h3>
            <USkeleton />
            <template #footer>
                <div class="space-y-4" v-if="props.movie.genre_ids">
                    <div>
                        {{ props.movie.release_date }}
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
