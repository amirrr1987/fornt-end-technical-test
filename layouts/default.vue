<script setup lang="ts"></script>

<template>
  <nav class="shadow py-2 bg-gray-900">
    <TheContainer>
      <NuxtLink to="/" class="text-primary">The Movie</NuxtLink>
    </TheContainer>
  </nav>
  <main>
    <slot />
  </main>
</template>

<style scoped></style>
