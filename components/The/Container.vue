<template>
  <UContainer :ui="ui">
    <slot />
  </UContainer>
</template>
<script setup lang="ts">
const ui = {
  base: "the-container",
};
</script>
<style>
.the-container {
  @apply !container;
}
</style>
