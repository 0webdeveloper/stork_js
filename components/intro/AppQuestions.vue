<template>
  <div
      class="sx:py-16 md:py-24"
      :class="{'text-white' : isCurrentPage}">
    <h2
        :class="isCurrentPage ? 'text-left' : 'md:text-left sx:text-center'"
        class="title md:mb-16 sx:mb-10">Ответы <br class="sx:hidden md:block">
      на часто
      задаваемые <br
          class="sx:hidden md:block"> <img
          :width="windowWidth/8"
          src="../../assets/image/introTab/questions/questions.png"
          class="sx:hidden md:inline max-w-[13.875rem]" alt="Questions.">вопросы
    </h2>
    <div
        :class="route.path === '/' ? 'mb-16' : 'mb-0'"
        class="card ">
      <Accordion
          :multiple="true"
          class="accordions">
        <template #collapseicon>
          <AppImgAccordionArrow
              class="md:w-16 sx:w-8 md:h-16 sx:h-8 shrink-0 -rotate-90"
              :class="{
                'stroke-back-black-sections' : route.path === '/',
                'stroke-white' : isCurrentPage,
              }"
          />
        </template>
        <template #expandicon>
          <AppImgAccordionArrow
              class="md:w-16 sx:w-8 md:h-16 sx:h-8 shrink-0"
              :class="{
                'stroke-back-black-sections' : route.path === '/',
                'stroke-white' : isCurrentPage,
              }"
          />
        </template>
        <template v-for="(answer, i) in displayedNews">
          <AccordionTab
              :pt="{
        headeraction: {class: ['flex-row-reverse gap-4 justify-between']},
        content: {class: ['px-0']}
          }"
          >
            <template #header>
              <h2
                  v-html="answer?.question"
                  class="accordion-header"
                  :class="{
                'text-back-black-section' : route.path === '/',
                'text-white': isCurrentPage,
                }"
              ></h2>
            </template>
            <div :class="{
              'text-description-text-color' : isCurrentPage
            }">
              <p v-html="answer?.description" class="mb-6 dynamic-answertext-font"></p>
              <div v-if="answer?.minuses.length">
                <p v-html="minus?.text" v-for="minus in answer?.minuses"
                   class="list-inside mb-6 dynamic-answertext-font">
                </p>
              </div>
              <div v-if="answer?.pluses.length">
                <p v-html="plus?.text" v-for="plus in answer?.pluses"></p>
              </div>
            </div>
          </AccordionTab>
        </template>
      </Accordion>
    </div>
    <div class="flex justify-center">
      <NuxtLink to="/questions"
                v-if="route.path === '/'"
                class="red-button sx:w-full md:w-max md:px-24 py-2.5 flex whitespace-nowrap">Больше ответов
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import {useAnswers} from "../../stores/useAnswers.js";
import {gsap} from "gsap";

const {answers} = useAnswers()

const route = useRoute()

const windowWidth = ref()

const displayedNews = ref([])

const isCurrentPage = route.path === '/questions'

// get elements

onMounted(() => {
  const accordions = document.querySelectorAll('.accordions');

  windowWidth.value = window.innerWidth

  window.addEventListener('resize', () => {
    windowWidth.value = window.innerWidth
  })

  accordions.forEach((accordion, index) => {
    gsap.from(accordion, {
      y: 10,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.inOut',
      delay: 0.3,
      scrollTrigger: {
        trigger: accordion,
        start: 'top 90%',
      },
    });
  });
})

const sliceNewsArray = () => {
  if (route.path === '/') {
    displayedNews.value = answers.slice(0, 3)
  } else {
    displayedNews.value = answers
  }
}

onBeforeMount(() => {
  sliceNewsArray()
})

</script>