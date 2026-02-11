<template>
  <section class="md:pt-44 sx:pt-32 sx:pb-16 md:pb-24 bg-back-black-sections font-medium">
    <div class="container">
      <div class="sx:mb-10 md:mb-8">
        <div class="mb-8">
          <Breadcrumb
              :pt="{
          root: {class: ['p-0 bg-transparent border-none text-nearest-text font-medium']}
            }"
              :home="home"
              :model="items">
            <template #item="{ item, props }">
              <NuxtLink
                  class="transition-all"
                  :class="{'hover:text-white' : item.route}"
                  :exact-active-class="'bg-transparent'"
                  :active-class="'bg-transparent'"
                  :to="item.route">
                {{ item.label }}
              </NuxtLink>
            </template>
          </Breadcrumb>
        </div>
        <h1 class="title text-white mb-2.5">{{ getNews.title }}</h1>
        <span class="text-description-text-color">{{ getNews.date }}</span>
      </div>
      <div class="flex flex-col sx:gap-5 md:gap-12">
        <div class="w-full col-span-4">
          <img
              :src="getNews.img[0]"
              :alt="getNews.title"
              class="w-full max-h-[42rem] object-center object-cover rounded"
          >
        </div>
        <div
            v-for="first in getNews.firstPart"
            :key="first.id"
            class="flex md:flex-row sx:flex-col justify-between sx:gap-10 md:gap-40">
          <h4 class="text-white font-unbounded sx:text-2xl md:text-3xl">{{
              first.title
            }}</h4>
          <p class="text-description-text-color sx:text-base md:text-lg font-medium">{{ first.text }}</p>
        </div>
        <div class="flex sx:flex-col md:flex-row items-start gap-7">
          <img
              v-if="getNews.img[1]"
              class="rounded w-full max-h-[33rem] object-center object-cover"
              :src="getNews.img[1]"
              :alt="getNews.title">
          <img
              v-if="getNews.img[2]"
              class="rounded w-full max-h-[27rem] object-center object-cover"
              :src="getNews.img[2]"
              :alt="getNews.title">
        </div>
        <div
            v-for="second in getNews.secondPart"
            :key="second.id"
            class="flex md:flex-row sx:flex-col justify-between sx:gap-10 md:gap-40">
          <h4 class="text-white font-unbounded sx:text-2xl md:text-3xl">{{ second.title }}</h4>
          <p class="text-description-text-color text-lg font-medium">{{ second.text }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>

import {useNewsStore} from "../../stores/useNewsStore.js";

const route = useRoute()

const home = ref({
  label: 'Новости',
  route: '/events'
});


const getNews = useNewsStore().getNews(route.params.id)

const items = ref([
  {label: getNews.title}
])


</script>

<style scoped>

</style>