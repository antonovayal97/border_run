<script setup lang="ts">
  import { CalendarDate } from '@internationalized/date'

  const pageStore = usePageStore();
  const mainButtonStore = useMainButtonStore();
  const backButtonStore = useBackButtonStore();
  const orderStore = useOrderStore();

  pageStore.setTitle("Выберите дату поездки");

  mainButtonStore.setText("Выбрать");
  mainButtonStore.setUrl("/trip-information");
  
  backButtonStore.setIsVisible(true);
  backButtonStore.setUrl("/description-of-city");

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  // Инициализируем choosenDate либо из стора, либо датой послезавтра
  const choosenDate = ref(
    orderStore.choosenDate 
      ? new CalendarDate(
          orderStore.choosenDate.getFullYear(),
          orderStore.choosenDate.getMonth() + 1,
          orderStore.choosenDate.getDate()
        )
      : new CalendarDate(today.getFullYear(), today.getMonth() + 1, today.getDate() + 2)
  )

  const curDate = new Date(choosenDate.value.year, choosenDate.value.month - 1, choosenDate.value.day);
  orderStore.setChoosenDate(curDate);

  // Отслеживаем изменения choosenDate и сохраняем в стор
  watch(choosenDate, (newDate) => {
    const jsDate = new Date(newDate.year, newDate.month - 1, newDate.day);
    orderStore.setChoosenDate(jsDate);
  })

  const isDateDisabled = (date: CalendarDate) => {
    const jsDate = new Date(date.year, date.month - 1, date.day);
    return jsDate <= tomorrow;
  }

</script>

<template>
  <UCalendar 
    v-model="choosenDate" 
    :is-date-disabled="isDateDisabled"
    locale="ru"
    weekdayFormat="short"
    :first-day-of-week="1"
  />
</template>