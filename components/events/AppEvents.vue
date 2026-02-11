<template>
  <section class="bg-back-black-sections">

    <!--    mobile-->

    <div
        style="background-position-y: 4.375rem"
        class="info-gradient bg-[url('~/assets/image/eventsTab/event-background.jpeg')] h-[100svh] bg-cover bg-center bg-no-repeat md:hidden sx:block z-0">
      <div class="container flex flex-col justify-end h-full pb-28 relative z-[1]">
        <h1 class="title text-white mb-5">События</h1>
        <p class="text-description-text-color">Следите за последними новостями, мнениями экспертов и статьями</p>
      </div>
    </div>

    <!--    desktop-->

    <div class="container flex flex-col gap-16 md:pt-44 sx:pt-16 md:pb-24 sx:pb-16">
      <div class="sx:hidden md:block">
        <h1 class="title text-white mb-6">События</h1>
        <p class="text-description-text-color">Следите за последними новостями, мнениями экспертов и статьями</p>
      </div>
      <div class="custom-tabview-extra">
        <TabView :pt="{
      navContainer: {class: ['mb-16']},
      navContent: {class: ['rounded-full bg-black']},
      nav: {class: ['border-none bg-black py-1 px-0 gap-1 text-lg font-bold']},
          }">
          <TabPanel
              v-for="event in eventsInfo"
              :key="event.id"
              :pt="{
        header: {class: ['w-full px-1']},
        headerAction: {class: ['tab-header-style']}
      }">
            <template #header>
              <button
                  class="py-2.5 w-full whitespace-nowrap">
                {{ event.title }}
              </button>
            </template>
            <component :is="event.component"/>
          </TabPanel>
        </TabView>
      </div>
    </div>
  </section>
</template>

<script setup>
import AppNews from "./AppNews.vue";
import AppExpertColumn from "./AppExpertColumn.vue";
import AppVideo from "./AppVideo.vue";
import AppArticles from "./AppArticles.vue";

const eventsInfo = ref([
  {id: 1, title: 'Новости', component: shallowRef(AppNews)},
  {id: 2, title: 'Колонка эксперта', component: shallowRef(AppExpertColumn)},
  {id: 3, title: 'Видео', component: shallowRef(AppVideo)},
  {id: 4, title: 'Статьи', component: shallowRef(AppArticles)},
])

</script>

<style scoped>

</style>