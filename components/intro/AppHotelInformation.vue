<template>
  <section
      :class="{'md:pt-52 sx:pt-16' : route.path === '/'}"
      class="relative"
      ref="hotelSection">
    <div
        :class="{'container md:flex justify-start md:mb-52 sx:mb-16' : route.path === '/'}">
      <img
          v-if="route.path === '/'"
          class="sx:block md:hidden rounded-lg mb-8 w-full"
          src="~/assets/image/introTab/realEstate/realEstate.jpg"
          alt="Real estate.">
      <div
          class="flex items-start justify-start gap-2"
          v-if="route.path === '/'">
        <!--        <h2-->
        <!--            class="second-title text-white text-highlight">Stork Hotel Уникальный<br>-->
        <!--          отельный комплекс 4* с бассейном, SPA и-->
        <!--          общественно-<br class="md:hidden">деловыми пространствами-->
        <!--        </h2>-->
        <h2
            class="second-title text-white text-highlight">Теперь у вас есть уникальная возможность стать не просто
          гостем, но и владельцем части этого удивительного мира. Приобретите номер в нашем отеле и получайте
          гарантированный пассивный доход от его аренды.
        </h2>
        <img
            class="lg:inline-block sx:hidden rounded-full max-w-[20rem]"
            :width="windowWidth/8"
            src="~/assets/image/introTab/information/information-building.jpg"
            alt="Information building.">
      </div>
    </div>
    <div class="info-gradient">
      <img src="~/assets/image/introTab/information/information-town.png"
           class="w-full h-auto z-[1] sx:hidden md:block"
           alt="Town.">
      <img src="../../assets/image/mobile/mobile-hotel-layout.jpg"
           class="w-full sx:h-[43.75rem] sm:h-auto z-[1] sx:block md:hidden object-center object-cover"
           alt="">
      <button
          v-for="(button, i) in buttons"
          :key="button.id"
          @click="getFacadeBlock(button.id, i)"
          :style="{top: button.positionY, left: button.positionX}"
          class="sx:hidden md:block plusButton">
        <AppImgAddCircle class="w-16 h-16"/>
      </button>
      <button
          v-for="(button, i) in buttons"
          :key="button.id"
          @click="getFacadeBlock(button.id, i)"
          :style="{top: button.mobilePositionY, left: button.mobilePositionX}"
          class="md:hidden sx:block plusButton">
        <AppImgAddCircle class="w-12 h-12"/>
      </button>
    </div>

    <!--    Section Template-->

    <GlobalModal
        position="center"
        :breakpoints="{}"
        @hide="hideDialog"
        class="md:w-4/5 sx:w-full"
        v-model="visible"
        :pt="{
          content: {class: ['p-0']}
        }">
      <AppSectionTemplate
          :currentBlockId="currentBlockId"
          @closeSectionTemplate="visible = false"
      />
    </GlobalModal>
  </section>
</template>

<script setup>
import gsap from 'gsap'
import AppImgAddCircle from "../svg/AppImgAddCircle.vue";
import {getItemSizes} from "~/composables/getItemSizes.js";
import {lineAnimation, characterMatch, runSplit, splitHeadings} from "../../composables/splitHelper.js";
import {useStorkCategories} from "../../stores/useStorkCategories.js";

const isMobile = ref()

const windowWidth = ref()

const route = useRoute()

const currentBlockId = ref()

// get elements

const hotelSection = ref(null)

const plusButtons = ref()

// modal visibility

const visible = ref(false)

// buttons Array

const buttons = ref([
  {
    id: 1,
    positionX: '30%',
    positionY: '35%',
    mobilePositionX: '40%',
    mobilePositionY: '18%',
    component: shallowRef(AppImgAddCircle)
  },
  // {
  //   id: 2,
  //   positionX: '20%',
  //   positionY: '80%',
  //   mobilePositionX: '32%',
  //   mobilePositionY: '58%',
  //   component: shallowRef(AppImgAddCircle)
  // },
  {
    id: 2,
    positionX: '75%',
    positionY: '65%',
    mobilePositionX: '65%',
    mobilePositionY: '65%',
    component: shallowRef(AppImgAddCircle)
  },
])

const firstItem = ref()

const {$eventBus} = useNuxtApp()

const getFacadeBlock = (id, i) => {
  currentBlockId.value = id

  scaleToButton(i)

  useStorkCategories().setFacadeFloorsCollection([])
  useStorkCategories().setIsFloorsCollectionLoaded(false)
  customFetch('/facade', {
    method: 'GET',
    query: {block_id: id},
    onResponse({request, response, options}) {
      if (response.status === 200) {
        useStorkCategories().setFacadeFloors(response._data.data)
        useStorkCategories().setFacadeFloorsCollection(response._data.data.floors_collection)
        useStorkCategories().setIsFloorsCollectionLoaded(true)
        firstItem.value = response._data.data.floors_collection.find(() => true)
        $eventBus.$emit('get_apartments', {
          idx: toRaw(firstItem.value.idx),
          block_id: id
        })
      }
    }
  })
}

const scaleToButton = (i) => {

  setTimeout(() => {
    visible.value = true
  }, 100)
  buttonAnimation(i)
}

const buttonAnimation = (i) => {
  gsap.to(hotelSection.value, {
    scale: isMobile.value ? 1.0 : 1.5,
    y: !isMobile.value ? (i === 0 ? 200 : -200) : (i === 0 ? 0 : 0),
    x: !isMobile.value ? (i === 0 ? 0 : i === 1 ? 200 : i === 2 ? -200 : 0)
        : isMobile.value ? (i === 0 ? 0 : i === 1 ? 0 : i === 2 ? 0 : 0) : 0,
    duration: 0.3,
    ease: "sine.in",
    onComplete: () => {
      plusButtons.value.forEach((plusButton) => {
        plusButton.style.opacity = '0'
      })
    }
  });
}

const hideDialog = () => {
  gsap.to(hotelSection.value, {
    x: 0,
    y: 0,
    scale: 1,
    duration: 0.3,
    ease: "sine.out",
  });
  plusButtons.value.forEach((plusButton) => {
    plusButton.style.opacity = '1'
  })
}

// hooks

onMounted(() => {

  const resizeObserver = getItemSizes(width => {
    windowWidth.value = width
    isMobile.value = windowWidth.value <= '768'
  })
  resizeObserver.observe(hotelSection.value);

  // Заливка шрифтов
  lineAnimation()
  characterMatch()
  runSplit()
  splitHeadings()

  // Получение кнопок плюсиков
  plusButtons.value = document.querySelectorAll('.plusButton')
})
</script>
