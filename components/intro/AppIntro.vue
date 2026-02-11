<template>
  <section
      ref="mainSection"
      class="relative w-full min-h-[100vh] overflow-hidden">

    <!--    video-->
    <video src="https://cdn.ained.ru/stork/intro2.mp4"
           playsinline
           autoplay
           muted
           loop
           class="video"></video>

    <!--    gradient-->

    <div class="absolute top-0 left-0 w-full h-full bg-gradient-radial"></div>

    <!--    title-->

    <div class="flex-default w-full absolute top-3/4 -translate-y-[100%] md:-translate-y-3/4">
      <div
          class="flex flex-col justify-center gap-6 items-start container introText"
          ref="">
        <span class="inline-block border px-4 py-1.5 rounded-full text-white font-medium text-sm">открытие || квартал 2026</span>
        <h1 class="text-white title">Станьте совладельцем
          <img class="rounded-full lg:inline sx:hidden max-w-[13.875rem]"
               :width="windowWidth/8"
               src="~/assets/image/introTab/intro/intro-first.webp"
               alt="Intro."><br>
          премиального <br>
          <img class="rounded-full lg:inline sx:hidden max-w-[13.875rem]"
               :width="windowWidth/8"
               src="~/assets/image/introTab/intro/intro-second.webp"
               alt="Intro">
          отельного комплекса
        </h1>
          <button
              @click="openPresentationModal"
              class="border border-white text-white font-semibold px-8 py-3 rounded-full whitespace-nowrap transition duration-300 mt-6 hover:bg-white hover:text-black">
              <span ref="buttonName">Получить презентацию</span>
          </button>
          <button
             @click="openLearnMoreModal"
             class="md:hidden sx:block red-button py-2 w-full">Узнать больше
          </button>
      </div>
    </div>

    <!--    learn more modal-->

    <AppModalLearnMore
        :current-card="{}"
        position="center"
        :presentation="isPresentationMode"
        :dispatchTitle="dispatchTitle"
        v-model="visible"/>

<!--      <AppModalGetPresentation-->
<!--          :current-card="{}"-->
<!--          :presentation="true"-->
<!--          position="center"-->
<!--          v-model="show"/>-->

  </section>
</template>

<script setup>
import {gsap} from "gsap";
import {getItemSizes} from "~/composables/getItemSizes.js";

const windowWidth = ref()

const mainSection = ref(null)

const visible = ref(false)

const isPresentationMode = ref(false);

const dispatchTitle = ref(null);

const openPresentationModal = () => {
    visible.value = true;
    isPresentationMode.value = true;
    dispatchTitle.value = "Получить презентацию";
}

const openLearnMoreModal = () => {
    visible.value = true;
    isPresentationMode.value = false;
    dispatchTitle.value = null;
}

onMounted(() => {
  const resizeObserver = getItemSizes(width => windowWidth.value = width)
  resizeObserver.observe(mainSection.value);

  const introText = document.querySelector('.introText')

  gsap.from(introText, {
    opacity: 0,
    y: 80,
    duration: 1,
    delay: 0.4,
    ease: "Cubic.easeOut",
  });
})
</script>
