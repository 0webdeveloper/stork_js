<template>
  <section
      class="bg-[url('~/assets/image/developerTab/intro/developer-intro.jpg')] bg-no-repeat bg-center bg-cover w-full h-[100svh] relative sx:pt-32 md:pt-44 md:pb-24 sx:pb-16 flex flex-col overflow-hidden">
    <div
        class="absolute top-0 left-0 w-full h-full sx:bg-gradient-radial md:bg-gradient-income-intro bg-opacity-0"></div>
    <div class="container flex flex-col items-start h-full gap-16 z-[2] relative text-white justify-end">
      <div class="sx:pb-12 md:pb-0">
        <span class="py-1.5 px-4 rounded-full border md:mb-8 sx:mb-2.5 inline-block sx:text-xs md:text-sm">надежный застройщик</span>
        <h1 class="title mb-4">Ремстройсервис</h1>
        <p class="md:text-lg sx:text-base text-description-text-color">Группа компаний Ремстройсервис - ведущий
          застройщик на рынке недвижимости Липецкой области.
          <br class="md:block sx:hidden"> и
          сдано в
          эксплуатацию более 300
          000 кв. м жилья</p>
      </div>
      <client-only>
        <Teleport
            :disabled="windowWidth > 768"
            to=".mobile-dev">
          <div
              class="grid sx:grid-cols-1 md:grid-cols-4 md:gap-7 sx:gap-y-10 w-full text-white sx:text-center md:text-left">
            <div
                v-for="item in developerInfo"
                :key="item.id"
                class="flex flex-col gap-2"
            >
              <h2 class="sx:text-[32px] sx:font-bold md:text-3xl font-unbounded">{{ item.title }}</h2>
              <p v-html="formatDescription(item.description)"
                 class="md:text-lg sx:text-2xl md:text-description-text-color sx:font-unbounded md:font-inter sx:text-white"></p>
            </div>
          </div>
        </Teleport>
      </client-only>
    </div>
  </section>
</template>

<script setup>
const formatDescription = (description) => {
  return description.replace(/\n/g, '<br>');
};

const developerInfo = ref([
  {id: 1, title: '1 место', description: 'по объёму текущего строительства \n Липецкой области – 90 500 кв.м.'},
  {id: 2, title: 'Победитель ', description: 'федеральной премии Urban Awards 2023'},
  {id: 3, title: 'Надёжный', description: 'застройщик России 2017-2024'},
  {id: 4, title: 'Более 1 млн кв.м.', description: 'введено в эксплуатацию'},
])

const windowWidth = ref()

onMounted(() => {
  windowWidth.value = window.innerWidth

  window.addEventListener('resize', () => {
    windowWidth.value = window.innerWidth
  })
})

</script>

<style scoped>

</style>