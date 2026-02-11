<template>
  <NuxtLink
      exact-active-class="'disabled'"
      :active-class="'disabled'"
      :to="{name: 'events-id', params: {id: news.id}}"
      class="flex sx:flex-row-reverse md:flex-col lg:flex-row sx:justify-between md:justify-start sx:gap-5 md:gap-8 cursor-pointer md:[&:not(:last-child)]:pb-8 sx:[&:not(:last-child)]:pb-5 [&:not(:last-child)]:border-b-[0.5px] [&:not(:last-child)]:border-b-[#616161]">
    <div class="shrink-0">
      <img
          class="object-cover object-center sx:max-h-[3.75rem] md:max-h-72 sx:rounded-lg md:rounded-none"
          :src="news.img.find(()=> true)" :alt="news.title">
    </div>
    <div class="text-description-text-color md:basis-1/3 flex flex-col">
      <div class="sx:mb-0 md:mb-4 flex md:flex-col sx:flex-col-reverse gap-2">
        <span class="inline-block text-sm font-medium ">{{ news.date }}</span>
        <h2 class="dynamic-cardtext-font text-white font-unbounded uppercase">{{ news.title }}</h2>
      </div>
      <p class="sx:hidden md:block">{{ news.description }}</p>
    </div>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  news: {
    type: Object,
    required: true
  },
})
</script>

<style scoped>

</style>