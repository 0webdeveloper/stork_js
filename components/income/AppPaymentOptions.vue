<template>
  <section class="md:py-24 sx:py-16 container">
    <h2 class="title md:mb-16 sx:mb-10 sx:text-white md:text-back-black-sections">Варианты отделки</h2>
    <div class="grid sx:grid-cols-1 md:grid-cols-2 md:gap-7 sx:gap-5">
      <div
          @click="moveToPayment(i)"
          v-for="(option, i) in paymentOptions"
          :key="option.id"
          :style="{backgroundImage: `url(${option.img})`}"
          class="relative bg-no-repeat bg-cover bg-center sx:p-[17.6%] md:p-[25%] flex cursor-pointer transition-all hover:scale-105 hover:shadow-black rounded">
          <span class="absolute bottom-0 left-0 dynamic-desc-font font-unbounded text-white self-end p-4">{{
              option.description
            }}</span>
      </div>
    </div>
  </section>
</template>

<script setup>
import {usePaymentStore} from "../../stores/usePaymentStore.js";

const paymentStore = usePaymentStore()

const paymentOptions = paymentStore.getPaymentOptions

const router = useRouter()

const moveToPayment = (i) => {
  router.push({
    name: 'payment',
    query: {
      state: i,
    }
  })
}

</script>

<style scoped>

</style>