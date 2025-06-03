<script lang="ts" setup>
  const supabase = useSupabaseClient();

  const pageStore = usePageStore();
  const mainButtonStore = useMainButtonStore();
  const backButtonStore = useBackButtonStore();
  const orderStore = useOrderStore();

  if (orderStore.cityId === null) {
    await navigateTo('/select-city')
  }

  async function fetchCity() {
    if(orderStore.cityId !== null)
    {

      const { data, error } = await supabase
      .from('cities')
      .select("*")
      .eq('id', orderStore.cityId)
      .single()

      return data;
    }
    else
    {
      return null
    }
  }

  const city = await fetchCity();

  pageStore.setTitle("Как проходит бордер-ран");

  mainButtonStore.setText("Продолжить");
  mainButtonStore.setUrl("/choose-date");
  
  backButtonStore.setIsVisible(true);
  backButtonStore.setUrl("/select-city");
</script>

<template lang="pug">
  div(v-html="city?.description").content
</template>