<template>
  <section
      ref="futureBox"
      class="md:py-24 sx:py-16 bg-back-white-sections">
    <div
        class="flex sx:flex-col md:flex-row md:items-center justify-between md:gap-10 sx:gap-4 md:mb-16 sx:mb-8 sx:items-start">
      <h2
          ref="futureTitle"
          class="title text-back-black-sections font-medium">Новое Будущее</h2>
      <p class="text-nearest-text sx:w-full md:max-w-[37.5rem] dynamic-text-font font-medium">Сегодня мы готовы написать
        новую
        историю
        проекта, используя
        современные технологии,
        адаптируя объект под новые
        тренды и актуальные запросы общества, города, региона</p>
    </div>
    <div
        class="sx:flex sx:shrink-0 md:grid md:grid-cols-3 sx:grid-cols-1 md:gap-16 sx:gap-5 sx:overflow-x-auto md:overflow-visible sx:snap-x md:snap-none snap-mandatory">
      <div
          class="sx:w-[90%] md:w-full h-full md:col-start-1 md:row-start-1 md:col-span-2 img shrink-0 snap-center"><img
          class="object-center object-cover sx:h-52 sm:h-96 md:h-full img rounded-lg w-full"
          src="~/assets/image/introTab/newFuture/new-first.jpg"
          alt="Building."
      ></div>
      <div class="w-full h-full md:col-start-1 md:row-start-2 md:row-span-2 img shrink-0 snap-center"><img
          class="object-center object-cover sx:h-52 sm:h-96 md:h-full img rounded-lg w-full"
          src="~/assets/image/introTab/newFuture/new-second.jpg"
          alt="Building."
      ></div>
      <div class="w-full h-full md:col-start-3 md:row-start-2 img shrink-0 snap-center"><img
          class="object-center object-cover sx:h-52 sm:h-96 md:h-full img rounded-lg w-full"
          src="~/assets/image/introTab/newFuture/new-third.jpg" alt="Building."></div>
      <div class="w-full h-full md:col-start-2 md:row-start-4 md:col-span-2 img shrink-0 snap-center"><img
          class="object-center object-cover sx:h-52 sm:h-96 md:h-full img rounded-lg w-full"
          src="~/assets/image/introTab/newFuture/new-fourth.jpg " alt="Building."></div>
      <div class="w-full h-1/2 md:col-start-1 md:row-start-5 img shrink-0 snap-center"><img
          class="object-center object-cover sx:h-52 sm:h-96 md:h-full img rounded-lg w-full"
          src="~/assets/image/introTab/newFuture/new-fifth.jpg" alt="Building."></div>
      <div class="w-full h-full md:col-start-2 md:row-start-5 img shrink-0 snap-center"><img
          class="object-center object-cover sx:h-52 sm:h-96 md:h-full img rounded-lg w-full"
          src="~/assets/image/introTab/newFuture/new-sixth.jpg" alt="Building."></div>
    </div>
  </section>
</template>

<script setup>
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

const futureTitle = ref(null)
const futureBox = ref(null)
const windowWidth = ref()

onMounted(() => {

  windowWidth.value = window.innerWidth

  const allImg = document.querySelectorAll('.img')

  if (ScrollTrigger.isTouch !== 1 && windowWidth.value > 768) {
    allImg.forEach((img, i) => {
      img.setAttribute('data-speed', i * 50 + 200);
      gsap.from(img, {
        y: 150,
        scrollTrigger: {
          trigger: img,
          scrub: 5,
        },
      });
    })
  }
})
</script>