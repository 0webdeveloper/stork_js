<template>
  <div v-if="route.query.success">
    <Title>Контакты</Title>
    <section class="bg-back-black-sections sx:pt-32 md:pt-44 md:pb-24 sx:pb-16 grow">
      <div class="container">
        <div class="flex justify-between place-content-center">
          <div class="w-2/5 flex flex-col place-content-center max-md:w-full max-md:place-items-center  max-md:text-center">
          <h1 class="title text-white md:mb-4 sx:mb-2">Спасибо!</h1>
          <p class="sx:text-base md:text-lg text-description-text-color sx:font-normal md:font-medium sx:w-full md:max-w-3xl">Ваша заявка отправлена.</p>
          <p class="sx:text-base md:text-lg text-description-text-color sx:font-normal md:font-medium sx:w-full md:max-w-3xl">В ближайшее время с Вами свяжется наш менеджер</p>
          <a class="red-button font-semibold px-8 py-2.5 whitespace-nowrap max-w-[200px] mt-14" href="/"><span>На главную</span></a>
          </div>
          <div class="w-3/5 max-md:hidden">
            <div class="h-[546px] w-full bg-[url('~/assets/image/introTab/newFuture/new-third.jpg')] bg-cover rounded-md"></div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const route = useRoute();
if(!route.query.success)
{
  navigateTo('/', { redirectCode: 301 })
}
if(route.query.pdf){
  window.open(useRuntimeConfig().public.baseHostUrl + '/storage/files/stork_investor.pdf', '_blank');
}
</script>

<style scoped>

</style>