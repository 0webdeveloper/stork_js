<template>
  <div class="flex flex-col newsWrapper">
    <h2 class="title text-white">Новости</h2>
    <div
        class="flex flex-col gap-8 ">
      <!--      <AppNewsCard-->
      <!--          v-for="(news, i) in displayedNews"-->
      <!--          :key="news.id"-->
      <!--          :news="news"-->
      <!--          :index="i"-->
      <!--          class="news-card"-->
      <!--      />-->
    </div>
    <!--    <button-->
    <!--        @click="loadMoreNews"-->
    <!--        v-if="showAllNews"-->
    <!--        class="transparent-button self-center md:px-24 sx:w-full md:w-auto">Смотреть еще-->
    <!--    </button>-->
    <!--    <button-->
    <!--        @click="collapseAll"-->
    <!--        v-else-->
    <!--        class="transparent-button self-center md:px-24 sx:w-full md:w-auto">-->
    <!--      Свернуть все новости-->
    <!--    </button>-->
  </div>
</template>

<script setup>

import {useNewsStore} from "../../stores/useNewsStore.js";
import {gsap} from "gsap";

const newsInfo = useNewsStore().getNewsInfo

const displayedNews = ref([]);
const showAllNews = ref(true);
const showMore = ref(2);

displayedNews.value = newsInfo.slice(0, showMore.value);

const loadMoreNews = () => {
  const nextIndex = displayedNews.value.length + showMore.value;
  if (nextIndex <= newsInfo.length) {
    displayedNews.value = newsInfo.slice(0, nextIndex);
  } else {
    displayedNews.value = newsInfo.slice(0);
  }
  if (displayedNews.value.length === newsInfo.length) {
    showAllNews.value = false
  }
};

const collapseAll = () => {
  displayedNews.value.length = 2
  showAllNews.value = true
  window.scrollTo(0, 0)
}

onMounted(() => {
  const newsCards = document.querySelectorAll('.news-card');

  newsCards.forEach((card, index) => {
    gsap.from(card, {
      stagger: 0.1,
      y: 10,
      opacity: 0,
      duration: 0.2,
      delay: 0.2 + (index * 0.1),
      scrollTrigger: {
        trigger: card,
        start: 'top 80%',
      },
    });
  });
})

onUpdated(() => {
  const newsCards = document.querySelectorAll('.news-card');

  newsCards.forEach((card, index) => {
    gsap.from(card, {
      y: 10,
      opacity: 0,
      duration: 0.2,
      delay: 0.2,
    });
  })
})


// gap-16

</script>
