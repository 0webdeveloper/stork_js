<template>
  <section
      class="md:py-52 sx:py-16 bg-back-white-sections"
      ref="paymentBox"
  >
    <div class="md:flex items-start justify-center">
      <img
          class="sx:block md:hidden w-full sx:max-h-40 sm:max-h-60 object-center object-cover rounded-lg mb-8"
          src="~/assets/image/introTab/payment/payment-mobile.jpg"
          alt="Payment.">
      <h2
          class="second-title md:text-nearest-text sx:text-back-black-sections text-highlight">
        Номер в премиальном отеле – это исключительная возможность сохранить и приумножить свой капитал. Готовый
        ликвидный бизнес под ключ, который будет работать 24/7, 365 дней в году без вашего участия с постоянным ростом
        доходности.
      </h2>
      <img
          src="~/assets/image/introTab/payment/payment.webp"
          class="rounded-full sx:hidden md:block max-h-[341px]"
          :width="windowWidth/12"
          alt="Payment.">
    </div>
  </section>
</template>

<script setup>
import {getItemSizes} from "~/composables/getItemSizes.js";
import {characterMatch, lineAnimation, runSplit, splitHeadings} from "../../composables/splitHelper.js";

const windowWidth = ref()
const paymentBox = ref(null)

onMounted(() => {
  // Заливка шрифтов
  lineAnimation()
  characterMatch()
  runSplit()
  splitHeadings();

  const resizeObserver = getItemSizes(width => windowWidth.value = width)
  resizeObserver.observe(paymentBox.value);

  // Заливка шрифтов
  lineAnimation()
  characterMatch()
  runSplit()
  splitHeadings()
})

</script>
