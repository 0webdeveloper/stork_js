<template>
  <section
      :class="{'container' : route.path === '/income'}"
      class="md:py-24 sx:py-16">
    <h2 class="title text-back-black-sections mb-16 sx:hidden md:block">Подбор недвижимости</h2>
    <div class="md:bg-white sx:bg-transparent md:p-16 sx:p-0 rounded-2xl flex sx:flex-col md:flex-row md:gap-12">
      <div class="flex flex-col gap-6 sx:mb-12 md:mb-0">
        <div class="rounded overflow-hidden md:mb-6 sx:mb-0 basis-1/3">
          <img src="~/assets/image/introTab/newFuture/new-second.jpg"
               class="sx:hidden md:block object-cover object-center w-full h-64"
               alt="Real estate building.">
        </div>
        <h4 class="uppercase font-unbounded text-2xl">Заполните форму
          и получите:</h4>
        <div class="flex flex-col gap-4  text-nearest-text text-lg font-medium">
          <div class="flex items-center justify-start gap-2">
            <AppImgHome class="shrink-0"/>
            <p>Подбор 3-х вариантов недвижимости</p>
          </div>
          <div class="flex items-center justify-start gap-2">
            <AppImgCube class="shrink-0"/>
            <p>Презентацию планировок</p>
          </div>
          <div class="flex items-center justify-start gap-2">
            <AppImgUser class="shrink-0"/>
            <p>Профессиональную консультацию менеджера</p>
          </div>
        </div>
      </div>
      <span class="block w-px bg-description-text-color"></span>
      <div class="flex flex-col w-full">
        <h5 class="font-unbounded dynamic-desc-font mb-6 uppercase">Для какой цели выбираете недвижимость?</h5>
        <div v-if="reasonComp">
          <div class="grid grid-cols-1 2xl:grid-cols-3 gap-2">
            <label
                v-for="(reason, index) in reasonComp"
                :key="index"
                class="block rounded-2xl overflow-hidden relative shadow-sm hover:shadow-2xl transition duration-300 ease-in-out"
            >
              <input type="radio" name="reason" class="reason-radio">
              <div
                  :style="{backgroundImage: `url(${(reason.image)})`}"
                  class="relative rounded-2xl bg-no-repeat bg-cover bg-center p-4 h-[200px] cursor-pointer flex flex-col justify-end"
                  @click="sendInfo(reason.id, reason.name)"
              >
                <span class="text-white font-unbounded uppercase text-xs">{{ reason.name }}</span>
              </div>
            </label>
          </div>
          <div class="flex justify-end">
            <button class="red-button w-fit px-8 py-2.5 cursor-pointer mt-6" @click="openModal()" :disabled="enableBtn">
              Далее
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <AppModalLearnMore
      position="center"
      v-model="visible"
      :dispatchId="dispatchId"
      :dispatchTitle="dispatchTitle"
  />

</template>

<script setup>

const route = useRoute()


const reasons = ref(null);
const reasonComp = computed(() => reasons.value);
const enableBtn = ref(true);
let dispatchId = ref(null);
let dispatchTitle = ref(null);
const activeReason = ref(null);
const visible = ref(false);


customFetch('/reasons', {
  method: 'GET',
  onResponse({request, response, options}) {
    if (response.status === 200) {
      reasons.value = response._data;
    }
  }
})


// клик по модалке
const sendInfo = (id, name) => {
  dispatchId.value = id;
  dispatchTitle.value = name;
  enableBtn.value = false;
  activeReason.value = id;
}

const openModal = () => {
  visible.value = !visible.value;
}
</script>

<style scoped>
.red-button:disabled {
  opacity: .5;
  }

input[type="radio"] {
  display: none;
  }

.reason-radio:checked ~ div {
  border: 2px solid red;
  }
</style>