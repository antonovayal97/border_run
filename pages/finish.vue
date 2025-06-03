<script setup lang="ts">
  const pageStore = usePageStore();
  const mainButtonStore = useMainButtonStore();
  const backButtonStore = useBackButtonStore();
  const orderStore = useOrderStore();

  const finish_fail = ref(false);
  const finish_success = ref(false);

  pageStore.setTitle("");

  mainButtonStore.setIsVisible(false);

  backButtonStore.setIsVisible(false);

  if (orderStore.cityId === null) {
    await navigateTo('/')
  }

  async function sendOrder() {
  const url = 'https://n8n-antonovayal97.amvera.io/webhook/5adb16be-8bb7-42f8-9be6-a47f56d2de76';
  
  // Ваши данные для отправки (если нужны)
  const postData = {
    // пример данных
    city_id: orderStore.cityId,
    choosen_date: `${String(orderStore.choosenDate.getDate()).padStart(2, '0')}.${String(orderStore.choosenDate.getMonth() + 1).padStart(2, '0')}.${orderStore.choosenDate.getFullYear()}`,
    phone: orderStore.phone,
    address: orderStore.address,
    count: orderStore.count,
    is_whatsapp: orderStore.isWhatsapp,
    customer_chat_id: orderStore.customerChatId,
  };


  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth': 'api_key',
      },
      body: JSON.stringify(postData)        // если не нужно тело запроса - удалите эту строку
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    console.log('Успешный ответ:', responseData);
    return responseData;
    
  } catch (error) {
    console.error('Ошибка при отправке запроса:', error);
    throw error;
  }
}

// Вызов функции
sendOrder().then(data => {
  console.log('Заказ отправлен:', data);
  finish_success.value = true;
}).catch(error => {
  console.error('Ошибка:', error);
  finish_fail.value = true;
});

</script>

<template lang="pug">
  .finish 
    div(v-if="finish_success", class="bg-green-50 border border-green-200 rounded-2xl p-6")
      .finish__head.mb-2
        span.block.text-lg.font-semibold.text-green-800 Заявка на бронирование принята
      .finish__text
        span.text-sm.text-green-900 Для подтверждения произведите предоплату, бот отправит вам всю информацию
    div(v-if="finish_fail", class="bg-red-50 border border-red-200 rounded-2xl p-6")
      .finish__head.mb-2
        span.block.text-lg.font-semibold.text-red-800 Произошла ошибка
      .finish__text
        span.text-sm.text-red-900 Свяжитесь с менеджером для выяснения проблемы
</template>