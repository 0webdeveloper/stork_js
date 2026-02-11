<template>
  <section
      ref="incomeBox"
      class="sx:pt-32 sx:pb-16 md:pt-44 md:pb-24 relative overflow-hidden">
    <div class="absolute top-0 left-0 w-full h-full bg-gradient-income-intro z-[2]"></div>
    <template v-for="(info, i) in incomeCards"
              :key="info.id">
      <div
          ref="incomeBg"
          v-if="currentIndex === i"
          class="absolute top-0 left-0 w-full h-full bg-no-repeat bg-center bg-cover z-[1]"
          :style="{backgroundImage: `url('${info.img}')`}">
      </div>
      <div
          class="container relative z-[3]"
          v-if="currentIndex === i">
        <h1 class="title text-white sx:mb-10 md:mb-16 text-left">100% пассивный доход <br
            class="sx:hidden md:block">
          <img class="rounded-full h-auto md:inline sx:hidden mr-7 max-h-[7.43rem]"
               :width="windowWidth/16"
               src="~/assets/image/incomeTab/intro/income-intro-second.jpg"
               alt="">
          в отельном бизнесе</h1>
        <div
            ref="incomeCard"
            class="grid sx:grid-cols-1 ss:grid-cols-2 2xl:grid-cols-4 gap-7 md:mb-24 sx:mb-6">
          <div
              v-for="(card, i) in info.card"
              :key="card.id"
              class="flex flex-col md:gap-4 sx:gap-2.5 text-white">
            <div class="">
              <b class="dynamic-cardtext-font uppercase font-unbounded">{{ card.title }}</b>
              <span class="dynamic-answertext-font font-bold block" v-if="i === 0"></span>
              <span class="dynamic-answertext-font font-bold block" v-if="i === 1"></span>
              <span class="dynamic-answertext-font font-bold block" v-if="i === 2"></span>
              <span class="dynamic-answertext-font font-bold block" v-if="i === 3"></span>
            </div>
            <p class="text-description-text-color dynamic-answertext-font">{{ card.description }}</p>
          </div>
        </div>
      </div>
    </template>
    <div
        ref="incomeGrid"
        class="md:grid sx:flex grid-cols-3 md:gap-7 sx:gap-4 sx:overflow-x-auto container relative z-[3] snap-x snap-mandatory">
      <div
          class="rounded relative bg-no-repeat bg-cover bg-center md:w-full sx:w-[44%] h-full overflow-hidden cursor-pointer sx:pt-[50%] md:pt-[56.25%] shrink-0 snap-center"
          :class="{'sx:border sx:border-white' : currentIndex === i}"
          v-for="(card, i) in incomeCards"
          :key="card.id"
          @click="currentIndex = i"
          :style="{backgroundImage: `url(${(card.img)})`}">
        <div
            class="absolute top-0 left-0 w-full h-full bg-gradient-income-intro hover:bg-gradient-radial transition-all text-white"
            :class="{'bg-gradient-radial sx:outline sx:outline-[1px] sx:outline-white' : currentIndex === i}">
              <span class="absolute bottom-0 left-0 dynamic-answertext-font font-bold p-4">{{
                  card.title
                }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import incomeFirst from '~/assets/image/incomeTab/intro/income-intro.jpg'
import incomeSecond from '~/assets/image/incomeTab/intro/income-card-second.jpg'
import incomeThird from '~/assets/image/incomeTab/intro/income-card-third.jpg'
import incomeFourth from '~/assets/image/incomeTab/intro/income-card-fourth.jpg'
import {getItemSizes} from "~/composables/getItemSizes.js";
import {gsap} from "gsap";

const currentIndex = ref()
const incomeCards = ref([
  {
    id: 1, title: 'Отельный номер с доходностью', img: incomeFirst, card: [
      {
        id: 2,
        title: `242 лота`,
        description: 'Номера в отеле с посуточной арендой и апартаменты для среднесрочного проживания'
      },
      {id: 3, title: 'до 15% годовых', description: 'Гарантированный пассивный доход'},
      {id: 4, title: '100%', description: 'Строительство по 214-ФЗ, эскроу-счета'},
      {id: 5, title: 'Номер «под ключ»', description: 'Номер с дизайнерской отделкой и техникой'},
    ]
  },
  {
    id: 5, title: 'Собственные апартаменты', img: incomeSecond, card: [
      {
        id: 6,
        title: `80 лотов`,
        description: 'Апартаменты для собственного проживания и самостоятельной сдачи в аренду'
      },
      {
        id: 7,
        title: 'Инфраструктура «город в городе»',
        description: 'Торговая галерея, рестораны, бассейн, фитнес и SPA, конференц-залы и коворкинг'
      },
      {
        id: 8,
        title: 'Площади апартаментов 24.1m² - 130.2m²',
        description: 'Свобода жить без бытовых забот – оставьте заботу о вашем комфорте управляющей компании'
      },
      {
        id: 9,
        title: 'Апартаменты «под ключ»',
        description: 'Апартаменты с дизайнерской отделкой и техникой'
      },
    ]
  },
  {
    id: 10, title: 'Коммерческие и офисные помещения', img: incomeThird, card: [
      {id: 11, title: `90 лотов`, description: 'Уникальные офисы с отделкой с видом на город'},
      {
        id: 12,
        title: '2000 Р/м² ',
        description: 'Прогнозируемая стоимость для сдачи арендаторам'
      },
      {
        id: 13,
        title: 'МЕНЕЕ 5 ЛЕТ',
        description: 'Планируемая окупаемость помещения'
      },
      {
        id: 14,
        title: '18 – 85 м² ',
        description: 'широкий выбор помещений для приобретения'
      },
    ]
  },
  // {
  //   id: 15, title: 'Коммерческая недвижимость', img: incomeFourth, card: [
  //     {id: 16, title: `585`, description: 'от келлеров до элитных апартаментов'},
  //     {id: 17, title: 'до 15%', description: 'доходность с вложения'},
  //     {id: 18, title: '100%', description: 'от келлеров до элитных апартаментов'},
  //     {id: 19, title: '0%', description: 'без лишних усилий и участия получайте  доход с недвижимости'},
  //   ]
  // },
])

const incomeCard = ref(null)

const incomeBg = ref(null)

const incomeBox = ref(null)

const windowWidth = ref()

onMounted(() => {
  currentIndex.value = 0

  const resizeObserver = getItemSizes(width => windowWidth.value = width)
  resizeObserver.observe(incomeBox.value);
})

onUpdated(() => {
  gsap.fromTo(incomeCard.value,
      {
        y: 50,
        opacity: 0,
        duration: 0.3
      }, {
        opacity: 1,
        y: 0,
      });

  gsap.fromTo(incomeBg.value,
      {
        y: 50,
        scale: 0.9,
        duration: 0.3
      },
      {
        scale: 1,
        y: 0,
      });
})

</script>
