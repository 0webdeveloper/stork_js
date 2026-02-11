<template>
  <section
      ref="nearestBox"
      style="transform: translate(0, 0) !important;"
      class="md:pb-24 sx:pb-16 max-h-max nearestBox relative">
    <h2 class="title text-white md:mb-16 sx:mb-8"
        ref="nearestTitle">РАСПОЛОЖЕНИЕ <img
        class="lg:inline rounded-full sx:hidden max-w-[10.375rem]"
        height="77"
        :width="windowWidth/11"
        src="~/assets/image/introTab/nearest/nearest-infrastructure.jpeg"
        alt="Nearest infrastructure.">
    </h2>
    <div class="md:block sx:hidden">
      <template
          v-for="(item, i) in nearestInfrastructure"
          :key="item.id">
        <div
            v-if="index === i"
            class="grid grid-cols-2 gap-7">
          <div
              class="w-full rounded-lg h-auto md:h-[20rem] 2xl:h-[30rem] 3xl:h-[46rem] overflow-hidden">
            <img
                ref="infraImg"
                :src="item.img"
                class="object-cover object-center md:h-[20rem] 2xl:h-[30rem] 4xl:h-[46rem] w-full rounded-lg"
                :alt="item.title">
          </div>
          <div class="uppercase font-unbounded text-white">
            <div class="flex flex-col gap-6 text-nearest-text 3xl:mb-28 md:mb-24 items-start text-2xl">
              <button
                  v-for="(button, ind) in nearestInfrastructure"
                  @mouseover="index = ind"
                  class="hover:text-white transition-all text-left dynamic-desc-font"
                  :class="{'text-white': index === ind}"
              >{{ button.title }}
              </button>
            </div>
            <div class="3xl:ml-60 sx:ml-0"
                 ref="infraDesc">
              <h3 class="mb-4 dynamic-desc-font">{{ item.time }}</h3>
              <p class="font-inter text-description-text-color text-lg normal-case">
                {{ item.description }}</p>
            </div>
          </div>
        </div>
      </template>
    </div>
    <div class="sx:flex md:hidden items-start gap-5 w-full overflow-x-auto snap-x snap-mandatory">
      <div
          class="flex info-gradient h-72 p-4 shrink-0 first:w-[90%] w-full snap-center"
          v-for="item in nearestInfrastructure"
          :key="item.id">
        <img
            class="absolute top-0 left-0 w-full h-full object-center object-cover rounded-lg"
            :src="item.img"
            :alt="item.title">
        <div class="relative z-[1] text-white self-end">
          <p class="mb-2.5 dynamic-desc-font font-unbounded">{{ item.time }}</p>
          <p class="dynamic-desc-font text-description-text-color">{{ item.title }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import church from "../../assets/image/introTab/nearest/nearest-church.jpg";
import garden from "../../assets/image/introTab/nearest/nearest-garden.jpg";
import rzd from "../../assets/image/introTab/nearest/nearest-rzd.jpg";
import busStation from "../../assets/image/introTab/nearest/nearest-autostation.jpg";
import airport from "../../assets/image/introTab/nearest/nearest-aeroport.jpg";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

onBeforeMount(() => {
  gsap.registerPlugin(ScrollTrigger)
})

const windowWidth = ref()

const nearestInfrastructure = ref([
  {
    id: 1,
    img: church,
    title: 'Исторический центр города',
    time: '6 минут',
    description: ''
  },
  {
    id: 2,
    img: garden,
    title: 'Парки, зоопарк, Зеленый остров',
    time: '4 минуты',
    description: ''
  },
  {
    id: 3,
    img: rzd,
    title: 'Ж/Д вокзал',
    time: '12 минут',
    description: ''
  },
  {
    id: 4,
    img: busStation,
    title: 'Автовокзал',
    time: '13 минут',
    description: ''
  },
  {
    id: 5,
    img: airport,
    title: 'Аэропорт',
    time: '30 минут',
    description: ''
  },
])

// counter

const index = ref()

// get elements

const nearestTitle = ref(null)
const infraDesc = ref(null)
const infraImg = ref(null)
const nearestBox = ref(null)

const endTrigger = document.querySelector('.end')


// hooks

onMounted(() => {

  index.value = 0

  // title animation
  windowWidth.value = window.innerWidth
  window.addEventListener('resize', () => {
    windowWidth.value = window.innerWidth
  })

  setUp();

  hookGsap();
})

// content animation

const setUp = () => {

  const endTrigger = document.querySelector('.end')

  if (ScrollTrigger.isTouch !== 1 && windowWidth.value > 768 && nearestBox.value !== null) {
    setTimeout(() => {
      ScrollTrigger.create({
        trigger: nearestBox.value,
        start: 'top +150',
        pin: true,
        scrub: 0.5,
        endTrigger: endTrigger,
        end: "bottom",
        pinSpacing: false,
      });
    }, 5000)
  }
}

const hookGsap = () => {

  if (infraDesc.value !== null && infraImg.value !== null) {
    if (ScrollTrigger.isTouch !== 1 && windowWidth.value > 768) {

      gsap.from(infraDesc.value,
          {
            y: 80,
            opacity: 0,
            duration: 0.5
          });

      gsap.from(infraImg.value,
          {
            scale: 1.2,
            opacity: 0,
            duration: 0.5,
            ease: "sine.in"
          });
    }
  }
}

onUpdated(() => {
  hookGsap();
})

</script>

<style>
</style>
