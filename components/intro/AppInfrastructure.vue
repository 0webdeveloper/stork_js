<template>
  <section class="md:py-24 sx:py-16"
           ref="infraBox">
    <div
        ref="infraTitle"
        class="flex justify-between gap-10  sx:flex-col xl:flex-row md:mb-16 sx:mb-8">
      <h2 class="title text-white shrink-0">Инфраструктура <br>
        комплекса
        <img
            class="rounded-full lg:inline sx:hidden max-w-[15rem]"
            src="~/assets/image/introTab/infrastructure/infrastructure.jpeg"
            alt="Infrastructure.">
      </h2>
      <p class="text-white sx:w-full xl:max-w-[37.5rem] dynamic-text-font font-medium font-unbounded">В комплексе Stork
        Hotel
        предусмотрено создание развитой инфраструктуры по принципу «город в городе». Общая
        площадь инфраструктуры составит 7 000 кв. метров, в нее включены: торговая галерея, рестораны и кафе, бассейн,
        фитнес клуб и SPA, зона лобби, современные конференц-залы и коворкинг.</p>
    </div>
    <div class="grid md:grid-cols-3 sx:grid-cols-1 md:gap-16 sx:gap-6">
      <template
          v-for="card in cardInformation"
          :key="card.id"
      >
        <div
            @click="currentCard(card)"
            :class="card.position"
            class="relative box info-gradient max-[1390px]:cursor-pointer">
          <img class="w-full rounded object-center object-cover sx:h-52 sm:h-96 md:h-full"
               :src="card.img"
               :alt="card.title"
          >
          <div class="infra-text z-10">
            <p class="font-unbounded uppercase dynamic-desc-font mb-4">{{ card.title }}</p>
            <p class="max-[1390px]:hidden" v-html="formatDescription(card.description)"></p>
          </div>
          <div class="absolute right-0 bottom-0 p-4 min-[1390px]:hidden z-10">
            <img src="../../assets/image/introTab/infrastructure/modal_icon.svg" alt="">
          </div>
        </div>
      </template>
    </div>

    <GlobalModal
        :pt="{
      content: {class: ['p-0']}
        }"
        :breakpoints="{}"
        position="center"
        v-model="visible"
    >
      <button
          class="absolute right-0  top-0 p-5 z-10"
          @click="visible=false">
        <AppImgClose class=" w-6 h-6 stroke-white"/>
      </button>
      <div
          class="w-[95vw] h-[90svh] bg-center bg-cover relative info-gradient"
          :style="{backgroundImage: `url(${(card.img)})`}">
        <div class="infra-text z-10">
          <p class="font-unbounded uppercase dynamic-desc-font mb-4">{{ card.title }}</p>
          <p class="" v-html="formatDescription(card.description)"></p>
        </div>
      </div>
    </GlobalModal>
  </section>
</template>

<script setup>
import gsap from 'gsap'

import {ScrollTrigger} from "gsap/ScrollTrigger";

import lobby from '../../assets/image/introTab/infrastructure/infrastructure-lobby.jpeg'
import conference from '../../assets/image/introTab/infrastructure/infrastructur-conference.jpeg'
import developer from '../../assets/image/introTab/infrastructure/infrastructure-developer.jpeg'
import fitness from '../../assets/image/introTab/infrastructure/infrastructure-fitness.jpeg'
import gallery from '../../assets/image/introTab/infrastructure/infrastructure-gallery.jpeg'
import parking from '../../assets/image/introTab/infrastructure/infrastructure-parking.jpeg'
import pool from '../../assets/image/introTab/infrastructure/infrastructure-pool.jpeg'
import restaurant from '../../assets/image/introTab/infrastructure/infrastructure-restaurant.jpeg'
import security from '../../assets/image/introTab/infrastructure/infrastructure-security.jpeg'

const visible = ref(false)

const card = ref({})
const currentCard = (currentCard) => {
  card.value = currentCard
  if (window.innerWidth <= 1390) visible.value = true
}

const cardInformation = ref([
  {
    id: 1,
    img: lobby,
    title: 'Лобби',
    description: 'Зона лобби – будущая визитная карточка отеля.\n Представьте себе широкие и светлые пространства, где архитектурное искусство современного дизайна сочетается с теплотой и уютом, создавая идеальное место для отдыха, встреч и релаксации. От высоких потолков до комфортабельных зон отдыха - каждый элемент лобби был тщательно продуман для того, чтобы гости чувствовали себя как дома, находясь вдалеке от него.',
    position: 'md:col-start-1  md:col-span-2 md:row-start-1'
  },
  {
    id: 2,
    img: restaurant,
    title: 'Рестораны',
    description: 'Чтобы отправиться в гастрономическое путешествие, не обязательно выезжать за пределы города. Повара в наших ресторанах подарят вам лучшие гастрономические впечатления.',
    position: 'md:col-start-2 md:row-start-2 md:h-3/4'
  },
  {
    id: 3,
    img: fitness,
    title: 'Фитнес-зона и SPA',
    description: 'Зарядиться энергией перед началом нового дня поможет современный хорошо оборудованный фитнес-центр, а скинуть напряжение после окончания трудового дня – бассейн с зонами релаксации и SPA.',
    position: 'md:col-start-3 md:row-start-2'
  },
  {
    id: 4,
    img: pool,
    title: 'Бассейн',
    description: 'Бассейн расположен внутри отеля, что позволяет вам наслаждаться плаванием в любое время года, независимо от погодных условий. Размер бассейна – 25 метров, это позволяет не только свободно плавать, но и заниматься водными видами спорта. Вода в бассейне проходит через систему очистки и фильтрации, что обеспечивает ее чистоту и безопасность для здоровья. Температура воды поддерживается на комфортном уровне, чтобы вы могли наслаждаться плаванием в любое время дня.',
    position: 'md:col-start-1 md:col-span-2 md:row-start-3'
  },
  {
    id: 5,
    img: gallery,
    title: 'Торговая галерея',
    description: 'Отправляйтесь на шопинг не покидая отель. На первом этаже нашего комплекса будет расположена торговая галерея, в которой можно приобрести как сувениры или букет живых цветов, так и профессиональную косметику от ведущих брендов или дизайнерскую одежду. ',
    position: 'md:col-start-1 md:row-start-4 md:h-3/4'
  },
  {
    id: 6,
    img: conference,
    title: 'Конференц-залы, офисы и коворкинг',
    description: 'Работа в удовольствие: провести деловую встречу или погрузиться в работу над новым проектом, а может продолжить неформальное общение зоне лобби – обстановка в комплексе располагает к проведению успешных переговоров.',
    position: 'md:col-start-3 md:row-start-4'
  },
  {
    id: 7,
    img: parking,
    title: 'Паркинг',
    description: 'В нашем апарт-отеле предусмотрен подземный охраняемый паркинг, в котором ваш автомобиль будет находиться в безопасности. Удобная конфигурация помещения позволит избежать случайных повреждений машины — проезды, радиусы поворотов и парковочные места подземного паркинга будут иметь увеличенные размеры для обеспечения комфортного проезда и парковки автомобиля.',
    position: 'md:col-start-2 md:col-span-2 md:row-start-5'
  },
  {
    id: 8,
    img: developer,
    title: 'Управляющая компания',
    description: 'Наша профессиональная команда позаботится о каждом номере, обеспечивая высокий стандарт обслуживания, что гарантирует стабильный и высокий уровень занятости номеров. Никаких хлопот! От рекламы и бронирования до уборки и обслуживания — мы всё берём на себя. Ваша инвестиция будет работать на вас, принося стабильный доход.',
    position: 'md:col-start-1 md:row-start-6 md:h-3/4'
  },
  {
    id: 9,
    img: security,
    title: 'Сервис 24/7',
    description: 'Владельцам апартаментов, а также их гостям доступен круглосуточный сервис. Управляющая компания обеспечивает безопасность всего здания, оказывает техническую поддержку систем энергообеспечения, следит за чистотой и порядком во всём комплексе.',
    position: 'md:col-start-2 md:row-start-6'
  },
])

const formatDescription = (description) => {
  return description.replace(/\n/g, '<br>');
};

gsap.registerPlugin(ScrollTrigger)

const infraBox = ref(null)

const windowWidth = ref()


onMounted(() => {
  const allBoxes = document.querySelectorAll('.box')

  if (ScrollTrigger.isTouch !== 1 && allBoxes.length) {
    allBoxes.forEach(box => {
      gsap.from(box, {
        y: 200,
        scrollTrigger: {
          trigger: box,
          scrub: 3,
        },
      });
    })
  }
})

</script>
