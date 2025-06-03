<script setup lang="ts">
const { BackButton } = await import("vue-tg");

const backButtonStore = useBackButtonStore();
</script>

<template>
  <ClientOnly>
    <BackButton 
      :visible="backButtonStore.isVisible"
      @click="async () => {
        await navigateTo(backButtonStore.url);
      }" 
    />
  </ClientOnly>
</template>

