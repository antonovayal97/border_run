<script setup lang="ts">
const pageStore = usePageStore();
const orderStore = useOrderStore();

const isLoading = ref(true);
const error = ref("")
const tt = ref(true)

const router = useRouter()

router.beforeEach(() => {
  isLoading.value = true
})

router.afterEach(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 500);
})



import { useMiniApp } from 'vue-tg'

const miniApp = useMiniApp()



  try {
    isLoading.value = true

    if (!miniApp.initData) {
      throw new Error('Telegram WebApp data not available')
    }

    const { data, error: fetchError } = await useFetch('/api/validate_user', {
      method: 'POST',
      body: { initData: miniApp.initData.toString() } // Сериализация initData
    })

    if (fetchError.value) {
      throw new Error(fetchError.value?.data?.statusMessage || 'Unknown fetch error')
    }

    orderStore.setCustomerChatId(data.value?.user.id || null);
  } catch (err: any) {
    error.value = err.message || 'Unexpected error'
    console.error('Validation error:', err)
  } finally {

    setTimeout(() => {
          isLoading.value = false
    }, 500);
  }

</script>
<template>
  <header class="container max-w-screen-xl mx-auto py-4 px-4">
    <h2 class="header-title font-semibold text-2xl">{{ pageStore.title }}</h2>
  </header>
  <ul>
      <li><NuxtLink to="/">Index</NuxtLink></li>
      <li><NuxtLink to="/description-of-service">/description-of-service</NuxtLink></li>
      <li><NuxtLink to="/select-city">/select-city</NuxtLink></li>
      <li><NuxtLink to="/finish">/finish</NuxtLink></li>
  </ul>
  <main class="px-4 pb-20 max-w-screen-xl mx-auto">
     <div v-if="isLoading" class="loading-overlay"></div>
      <slot v-if="!isLoading"/>
  </main>
</template>
<style>
.loading-overlay
{
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 999;
  background-color: var(--color-white);
}
.loading-overlay::after {
  position: absolute;
  content: "";
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  border: 0.5rem solid var(--color-green-400);
  border-left-color: transparent;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}


</style>
