<template>
  <footer
      :class="route.path === '/'
      ? 'bg-back-white-sections text-back-black-sections fill-black'
      : 'sx:bg-back-black-sections sx:text-white sx:fill-white md:bg-back-white-sections md:text-back-black-sections md:fill-black'">
    <div v-if="!isContactsPage" class="container md:py-24 sx:py-16 mx-auto">
      <h2 class="text-2xl title sx:block md:hidden mb-8">Контакты</h2>
      <div class="flex justify-between items-start md:flex-row flex-col gap-8">
        <div class="flex-default gap-4 text-sm sx:order-4 md:order-1">
          <a target="_blank" href="https://ained-digital.ru/">
            <AppImgFooterLogo class="sx:w-24 sx:h-6 md:w-32 md:h-9"/>
          </a>
          <p class="dynamic-footertext-font">Создание сайта — <br>Ained Digital</p>
        </div>
        <div class="font-semibold flex flex-col sx:order-1 gap-2">
          <div class="flex gap-2">
            <a href="https://vk.com/stork_hotels" target="_blank" ><AppVkLogo class="w-8 h-8 fill-[#4F46E5] opacity-80 hover:opacity-100 transition-opacity"/></a>
            <a href="https://t.me/stork_hotels" target="_blank" ><AppTelegramLogo class="w-8 h-8 fill-[#2AABEE] opacity-80 hover:opacity-100 transition-opacity"/></a>
          </div>
          <div>
            <a href="tel:+74742516393">+7 (4742) 51-63-93</a>
            <p>улица М.И. Неделина, 6</p>
          </div>
        </div>
        <div class="flex flex-col  font-semibold sx:order-2">
          <p>©Stork Hotel, {{ new Date().getFullYear() }}</p>
          <a target="_blank" :href="useRuntimeConfig().public.baseHostUrl + '/storage/files/legal/policy.pdf'">Политика
            конфиденциальности</a>
          <a target="_blank" :href="useRuntimeConfig().public.baseHostUrl + '/storage/files/legal/personal.pdf'">Согласие
            пользователя</a>
          <NuxtLink
              active-class="'no-active'"
              exact-active-class="'no-active'"
              to="/documents">Проектные декларации</NuxtLink>
        </div>
        <div class="sx:flex flex-col  text-nearest-text text-sm md:hidden sx:order-3">
          <p>ООО «РСС» ИНН: 4826152621, ОГРН: 1224800000754</p>
          <p>Юридический адрес:398016, г. Липецк, ул. Космонавтов, д. 26/1, этаж 2, помещ./каб. 1/8</p>
          <p>Центральный офис:г. Липецк, ул. Космонавтов, д. 26/1</p>
        </div>
      </div>
    </div>
    <div v-else class="container md:py-24 sx:py-16 mx-auto">
      <h2 v-if="!isMobile" class="text-2xl title sx:block md:hidden mb-8">Контакты</h2>
      <div class="flex justify-between items-start md:flex-row flex-col gap-8">
        <div class="flex-default gap-4 text-sm sx:order-4 md:order-1">
          <a target="_blank" href="https://ained-digital.ru/">
            <AppImgFooterLogo class="sx:w-24 sx:h-6 md:w-32 md:h-9"/>
          </a>
          <p class="dynamic-footertext-font">Создание сайта — <br>Ained Digital</p>
        </div>
        <div v-if="!isMobile" class="font-semibold flex flex-col sx:order-1 gap-2">
          <div class="flex gap-2">
            <a href="https://vk.com/stork_hotels" target="_blank"><AppVkLogo class="w-8 h-8 fill-[#4F46E5] opacity-80 hover:opacity-100 transition-opacity"/></a>
            <a href="https://t.me/stork_hotels" target="_blank"><AppTelegramLogo class="w-8 h-8 fill-[#2AABEE] opacity-80 hover:opacity-100 transition-opacity"/></a>
          </div>
          <div>
            <a href="tel:+74742516393">+7 (4742) 51-63-93</a>
            <p>улица М.И. Неделина, 6</p>
          </div>
        </div>
        <div v-if="!isMobile" class="flex flex-col font-semibold sx:order-2">
          <p>©Stork Hotel, {{ new Date().getFullYear() }}</p>
          <a target="_blank" :href="useRuntimeConfig().public.baseHostUrl + '/storage/files/legal/policy.pdf'">Политика
            конфиденциальности</a>
          <a target="_blank" :href="useRuntimeConfig().public.baseHostUrl + '/storage/files/legal/personal.pdf'">Согласие
            пользователя</a>
          <NuxtLink
              active-class="'no-active'"
              exact-active-class="'no-active'"
              to="/documents">Проектные декларации</NuxtLink>
        </div>
        <div class="sx:flex flex-col text-nearest-text text-sm md:hidden sx:order-3">
          <p>ООО «РСС» ИНН: 4826152621, ОГРН: 1224800000754</p>
          <p>Юридический адрес:398016, г. Липецк, ул. Космонавтов, д. 26/1, этаж 2, помещ./каб. 1/8</p>
          <p>Центральный офис:г. Липецк, ул. Космонавтов, д. 26/1</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>

import AppTelegramLogo from "../svg/mobile/AppTelegramLogo.vue";

const route = useRoute();
const isContactsPage = computed(() => route.path.includes('contacts'));
const isMobile = ref(window.innerWidth <= 700);

const updateWidth = () => {
  isMobile.value = window.innerWidth <= 700
}

onMounted(() => {
  window.addEventListener('resize', updateWidth)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateWidth)
})

</script>