<script lang="ts" setup>
  const supabase = useSupabaseClient()

  const pageStore = usePageStore();
  const mainButtonStore = useMainButtonStore();
  const backButtonStore = useBackButtonStore();

  pageStore.setTitle("Описание услуги");

  mainButtonStore.setText("Продолжить");
  mainButtonStore.setUrl("/select-city");
  
  backButtonStore.setIsVisible(true);
  backButtonStore.setUrl("/");


  const { data, error } = await supabase
  .from('options')
  .select("*")
  .eq('name', 'description_of_service')
  .single()

console.log("data: ", data);
</script>

<template lang="pug">
  div(v-html="data.content").content
</template>