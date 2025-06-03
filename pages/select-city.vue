<script lang="ts" setup>
  const supabase = useSupabaseClient();

  const loading = ref(true);

  const pageStore = usePageStore();
  const mainButtonStore = useMainButtonStore();
  const backButtonStore = useBackButtonStore();
  const orderStore = useOrderStore();

  pageStore.setTitle("Выберите город");

  mainButtonStore.setText("Выбрать");
  mainButtonStore.setUrl("/description-of-city");
  
  backButtonStore.setIsVisible(true);
  backButtonStore.setUrl("/description-of-service");

  if (orderStore.cityId === null) mainButtonStore.setIsVisible(false);

  async function fetchCities() {
    const { data, error } = await supabase
    .from('cities')
    .select("*")
    .eq('active', 'true');

    loading.value = false;
    return data;
  }


  const cities = ref(await fetchCities());
  console.log("data cities: ", cities.value)

  const chooseCity = (city) => {
    if(city.id === orderStore.cityId)
    {
      return
    }
    orderStore.setCity(city.id);
    mainButtonStore.setIsVisible(true);
    console.log("Selected city:", city);
    console.log("Current cityId in store:", orderStore.id);
  }
</script>

<template lang="pug">
  div(v-if="!loading").city-list.flex.flex-col.gap-4
    div(v-for="city in cities",:key="city.id",@click="() => {chooseCity(city)}",:class="{ 'active': (city.id === orderStore.cityId)}", class="city--card flex items-center p-2 rounded-2xl bg-base-200 cursor-pointer")
      //-.w-28.h-16.rounded-lg.overflow-hidden
        img(:src="strapi_url + city.img.formats.medium.url",:alt="city.name").w-full.h-full.object-cover
      .font-semibold.text-lg.ml-5 {{ city.name }}
      .font-semibold.text-xs.ml-auto.mr-4 от {{ city.price }} бат
  div(v-if="loading")
    div(v-for="item in [1,2,3,4,5]").flex.items-center.p-2
      //-<USkeleton class="w-28 h-16 rounded-lg" />
      <USkeleton class="flex-1 h-6 ml-5 rounded-lg" />
</template>

<style scoped>
.city--card
{
  position: relative;
}
.city--card.active::after
{
  position: absolute;
  content: "";
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: calc(100% + 10px);
  height: calc(100% + 10px);
  border: 2px solid var(--color-green-400);
  border-radius: 1.25rem;
}
</style>