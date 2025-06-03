<script setup lang="ts">

    const pageStore = usePageStore();
    const mainButtonStore = useMainButtonStore();
    const backButtonStore = useBackButtonStore();

    pageStore.setTitle("");

    mainButtonStore.setText("Начать оформление");
    mainButtonStore.setUrl("/description-of-service");
    
    backButtonStore.setIsVisible(false);
</script>

<template lang="pug">
    .text-center.mb-10
        h1.mb-6.mb-10.text-4xl.font-bold Бордер ран в Таиланде
        p.text-m.italic Легко. Быстро. Надёжно.<br>Получите новый штамп без стресса — мы всё организуем за вас.<br>Выберите дату, оставьте заявку и внесите предоплату.
</template>