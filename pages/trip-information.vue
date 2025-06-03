<script setup lang="ts">
  const supabase = useSupabaseClient();

  const pageStore = usePageStore();
  const mainButtonStore = useMainButtonStore();
  const backButtonStore = useBackButtonStore();
  const orderStore = useOrderStore();

  pageStore.setTitle("Информация для поездки");

  mainButtonStore.setText("Продолжить");
  mainButtonStore.setUrl("/finish");
  mainButtonStore.setIsVisible(false);

  backButtonStore.setIsVisible(true);
  backButtonStore.setUrl("/choose-date");

  const city = ref(null);
  const address = ref("");
  const count = ref(1);
  const isWhatsapp = ref(false);
  const phone = ref("");
  const isFilled = ref({
    address: false,
    phone: false
  });

  const inputs_text = ref({
    section: [
      {
        name: "Адрес и кол-во",
        items: {
          place: {
            label: "Адрес отеля, кондо или виллы на английском языке",
            placeholder: "Введите адрес"
          },
          count: {
            label: "Выберите количество людей",
            placeholder: null
          },
        }
      },
      {
        name: "Способ связи (для водителя)",
        items: {
          phone: {
            label: "Whatsapp или таиский номер телефона",
            placeholder: "например, +7 ..."
          },
          checkbox: {
            label: "Связаться со мной по Whatsapp",
            placeholder: null
          }
        }
      }]
  })

  async function fetchCity() {
    const { data, error } = await supabase
      .from('cities')
      .select("*")
      .eq('id', orderStore.cityId)
      .single()

      return data;
    }

  if (orderStore.cityId === null) {
    await navigateTo('/select-city');
  }
  else
  {
    city.value = await fetchCity();
    address.value = (city.value?.place?.length > 0) ? city.value.place : "";

    if(city.value.place !== null)
    {
      orderStore.setAddress(address.value);
      isFilled.value.address = true;
      inputs_text.value.section[0].items.place.label = "Место встречи";
    }
  }

  watch(isFilled,(newValue) => {
      mainButtonStore.setIsVisible(newValue.address && newValue.phone);
    },
    { deep: true }
  );

  watch(count, (value) => {
    orderStore.setCount(value);
  });

  watch(isWhatsapp, (value) => {
    orderStore.setIsWhatsapp(value);
  });

  watch(phone, (value) => {
    orderStore.setPhone(value);
  });

  watch(address, (newValue) => {
    address.value = newValue.replace(/[^a-zA-Z0-9\s\-_.,!?@#$%^&*()]/g, '');
    orderStore.setAddress(address.value);
    isFilled.value.address = address.value.length > 4;
  });

  const onMaska = (event: CustomEvent<MaskaDetail>) => {
    isFilled.value.phone = !!event.detail.completed;
  }

  const maskOptions = {
    mask: (value: string) => {
      if (value.startsWith('+7')) {
        return '+7 (###) ###-##-##';  // Россия
      } else if (value.startsWith('+66')) {
        return '+66 (###) ###-####'; // Таиланд
      } else if (value.startsWith('8')) {
        return '8 (###) ###-##-##';  // Россия (альтернативный формат)
      } else {
        return '+## (###) ###-####'; // Общий международный формат
      }
    }
  };

  const blockNonEnglishInput = (event) => {
    if (event.inputType === 'insertFromPaste') {
      return;
    }

    const char = event.data;

    if (char && !/^[a-zA-Z0-9\s\-_.,!?@#$%^&*()]+$/.test(char)) {
      event.preventDefault();
    }
  };
</script>

<template lang="pug">
  .address
    .mb-4
      fieldset(class="p-4 border rounded-xl")
        legend {{inputs_text.section[0].name}}
        .mb-2
          .mb-2
            span {{inputs_text.section[0].items.place.label}}
          <UInput v-model="address" class="w-full" :disabled="(city?.place?.length > 0)" @beforeinput="blockNonEnglishInput" variant="soft" size="xl" :placeholder="inputs_text.section[0].items.place.placeholder" />
        .w-full.max-w-xs
          .mb-2
            span {{inputs_text.section[0].items.count.label}}
          <UInputNumber v-model="count" color="primary" variant="soft" :min="1" :max="5" />
    div
      fieldset(class="p-4 border rounded-xl")
        legend {{inputs_text.section[1].name}}
        .mb-2
          span {{inputs_text.section[1].items.phone.label}}
        .mb-2
          <UInput v-maska="maskOptions" class="w-full" @maska="onMaska" v-model="phone" size="xl" variant="soft" :placeholder="inputs_text.section[1].items.phone.placeholder" />
        .mb-2
          <UCheckbox variant="list" color="primary" v-model="isWhatsapp" :label="inputs_text.section[1].items.checkbox.label" />
</template>