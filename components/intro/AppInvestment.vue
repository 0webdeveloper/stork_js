<template>
  <section
      class="md:py-24 sx:py-16"
      ref="investmentBox"
  >
    <div class="flex flex-col items-start gap-4 md:mb-16 sx:mb-8">
      <h2 class="title text-back-black-sections">регион
        <img class="md:inline sx:hidden rounded-full max-w-[15rem]"
             :width="windowWidth/6"
             src="~/assets/image/introTab/investment/investment.jpg"
             alt="Investment."><br>
        инвестиций</h2>
      <p class="text-nearest-text max-w-[37.5rem] dynamic-text-font font-medium">Липецкая область - регион с высокой инвестиционной привлекательностью.</p>
    </div>
    <div class="sx:flex md:grid md:grid-cols-3 sx:grid-cols-1 md:gap-7 sx:gap-5 overflow-x-auto snap-x snap-mandatory">
      <div
          class="sx:p-4 sx:bg-white sx:rounded-lg md:p-0 md:bg-transparent md:rounded-none sx:shrink-0 w-full first:w-[90%] snap-center"
          v-for="info in investInfo"
          :key="info.id">
        <h4 class="font-unbounded md:mb-4 sx:mb-2 dynamic-cardtext-font uppercase">{{ info.title }}</h4>
        <p class="dynamic-carddesc-font text-nearest-text font-medium">{{ info.description }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import {getItemSizes} from "~/composables/getItemSizes.js";


const windowWidth = ref()

const investInfo = ref([
  {
    id: 1,
    title: '1 МЕСТО',
    description: 'Липецкая область стала победителем номинации «Самый стабильный регион АПК» премии «Агроинвестор года»'
  },
  {
    id: 2,
    title: 'ТОП 2',
    description: 'Регион входит в ТОП 2 в РФ по прямым иностранным инвестициям'
  },
  {
    id: 3,
    title: 'ТОП 5',
    description: 'Регион входит в топ-5 по объему сельского хозяйства в ЦФО, где занимает 3 место.'
  },
  {
    id: 4,
    title: '9 МЕСТО',
    description: 'В национальном рейтинге состояния инвестиционного климата в субъектах РФ Липецкая область занимает 9 строчку'
  },
  {
    id: 5,
    title: 'ТОП 10',
    description: 'Область входит в десятку субъектов РФ с высоким уровнем инвестиционной привлекательности (группа А3)'
  },
  {
    id: 5,
    title: '15 МЕСТО',
    description: '15 строчка в Национальном рейтинге АСИ, демонстрирующего состояние инвестиционного климата в субъектах РФ.'
  }
])

const investmentBox = ref(null)

onMounted(() => {
  const resizeObserver = getItemSizes(width => windowWidth.value = width)
  resizeObserver.observe(investmentBox.value);
})

</script>

<style scoped>

</style>