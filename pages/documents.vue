<template>
  <section class="bg-back-black-sections sx:pt-16 md:pt-24">
    <Title>Проектная декларация</Title>
    <div class="container">
      <div
          class="sx:py-16 md:py-24">
        <h2
            class="title md:mb-16 sx:mb-10 text-white">
          Проектные декларации
        </h2>
        <div class="flex flex-col text-white">
          <div
              v-for="document in documents.getDocuments"
              id="documents"
              class="flex justify-between gap-10 p-5 pl-0 border-b border-[#e5e7eb]">
            <h2 class="accordion-header">{{ document.name }}</h2>
            <button @click="handleClick(document.href)">
              <AppImgUploadIcon class="w-8 h-8 stroke-white hover:stroke-red-button transition-colors"/>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<script setup>
import {useDocumentsStore} from "../stores/usedocumentsStore.js";
import AppImgUploadIcon from "../components/svg/AppImgUploadIcon.vue";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger)

const documents = useDocumentsStore();
const windowWidth = ref();

const handleClick = (ref) => {
  window.open(useRuntimeConfig().public.baseHostUrl + ref, '_blank');
}


onMounted(() => {
  const documents = document.querySelectorAll('#documents');

  windowWidth.value = window.innerWidth

  window.addEventListener('resize', () => {
    windowWidth.value = window.innerWidth
  })

  documents.forEach((document) => {
    gsap.from(document, {
      y: 10,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.inOut',
      delay: 0.3,
      scrollTrigger: {
        trigger: document,
        start: 'top 90%',
      },
    });
  });
})

</script>