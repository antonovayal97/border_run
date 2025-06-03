<script setup lang="ts">
import { MainButton } from 'vue-tg'

const mainButtonStore = useMainButtonStore();
</script>
<template>
    <ClientOnly >
        <MainButton 
            :visible="mainButtonStore.isVisible"
            :text="mainButtonStore.text" 
            :color="mainButtonStore.color" 
            :progress="mainButtonStore.isProgress"
            @click="async () => {
                try {
                    mainButtonStore.setIsProgress(true)
                    
                    await navigateTo(mainButtonStore.url, {
                    replace: true,
                    })
                    
                } catch (error) {
                    console.error('Navigation error:', error)
                } finally {
                    mainButtonStore.setIsProgress(false)
                }
            }"
        />
    </ClientOnly>
</template>

