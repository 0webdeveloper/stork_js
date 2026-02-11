<template>
  <section
      ref="realEstateBox"
      class="md:py-24 sx:py-16 container">
    <div class="grid 2xl:grid-cols-[1fr_,auto] sx:grid-cols-1 md:gap-40 sx:gap-10 items-start">
      <h2 class="title text-white md:whitespace-nowrap lg:sticky lg:top-0">Грамотные <br> <img
          class="lg:inline sx:hidden rounded-full max-w-[12.75rem]"
          :width="windowWidth/8"
          src="~/assets/image/incomeTab/investRealEstate/income-invest-real-estate.jpg"
          alt="Income invest in real estate.">
        инвестиции <br class="md:block sx:hidden"> в недвижимость</h2>
      <div class="md:grid sx:flex grid-cols-1 md:gap-20 sx:gap-5 overflow-x-auto snap-mandatory snap-x">
        <div
            v-for="benefit in investBenefits"
            :key="benefit.id"
            class="sx:bg-black md:bg-transparent sx:p-6 md:p-0 sx:rounded-lg md:rounded-none shrink-0 snap-center md:w-full sx:w-[80%] justify-self-end"
        >
          <div class="p-2 bg-back-black-sections rounded-lg mb-5 w-max sx:block md:hidden">
            <Component :is="benefit.icon" class="w-6 h-6 stroke-white fill-none"/>
          </div>
          <p
              class="text-white font-unbounded dynamic-cardtext-font uppercase mb-2.5">{{ benefit.title }}</p>
          <p
              v-html="formatDescription(benefit.description)"
              class="text-description-text-color dynamic-carddesc-font md:font-medium sx:font-normal"></p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>

import AppImgMoney from "../svg/mobile/investRealEstate/AppImgMoney.vue";
import AppImgOk from "../svg/mobile/investRealEstate/AppImgOk.vue";
import AppImgChartSquare from "../svg/mobile/investRealEstate/AppImgChartSquare.vue";
import AppImgUsers from "../svg/mobile/investRealEstate/AppImgEstateUsers.vue";
import AppImgShieldOk from "../svg/mobile/investRealEstate/AppImgShieldOk.vue";
import {getItemSizes} from "~/composables/getItemSizes.js";

const windowWidth = ref()

const formatDescription = (description) => {
  return description.replace(/\n/g, '<br>');
};

const investBenefits = ref([
  {
    id: 1,
    title: 'Пассивный доход',
    description: '100% пассивный доход от недвижимости',
    icon: shallowRef(AppImgMoney)
  },
  {
    id: 2,
    title: 'Удобство',
    description: 'Всеми вопросами занимается управляющая компания',
    icon: shallowRef(AppImgOk)
  },
  {
    id: 3,
    title: 'Прозрачность',
    description: 'Прозрачная финансовая схема доходов и расходов',
    icon: shallowRef(AppImgChartSquare)
  },
  {
    id: 4,
    title: 'Мастерство',
    description: 'Профессиональная команда - строительство, управление',
    icon: shallowRef(AppImgUsers)
  },
  {
    id: 5,
    title: 'Стабильность рынка',
    description: 'Надежные инвестиции в недвижимость,\n защищенные от колебаний рынка',
    icon: shallowRef(AppImgShieldOk)
  }
])

const realEstateBox = ref()

onMounted(() => {
  const resizeObserver = getItemSizes(width => windowWidth.value = width)
  resizeObserver.observe(realEstateBox.value);
})
</script>