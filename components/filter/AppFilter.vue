<template>
  <div
      class="flex sx:flex-col lg:flex-row lg:items-end gap-4 custom-dropdown p-1 pb-2 overflow-x-auto w-full items-center mb-8">
    <div
        class="w-full flex flex-col gap-2">
      <label class="sx:text-xs lg:text-sm text-nearest-text font-medium">Тип помещения</label>
      <Dropdown
          @change="switchPage"
          :pt="{
              root: {class: ['py-2.5 px-3 bg-black border-none sx:rounded-full lg:rounded-lg']},
              input: {class: ['sx:text-xs lg:text-base font-medium']}
                }"
          v-model="selectedApartment"
          :options="apartmentType"
          optionLabel="name"
          placeholder="Тип помещения"
          class="lg:min-w-[14rem]">
      </Dropdown>
    </div>
    <!--    <div v-else class="flex flex-col w-full">-->
    <!--      <Skeleton height="0.4rem" class="mb-2 w-[6rem]"/>-->
    <!--      <Skeleton height="2.4rem" class="w-full lg:min-w-[14rem]"/>-->
    <!--    </div>-->
    <div
        class="w-full flex flex-col gap-2">
      <label class="sx:text-xs lg:text-sm text-nearest-text font-medium">Отделка</label>
      <Dropdown
          :pt="{
              root: {class: ['py-2.5 px-3 bg-black border-none sx:rounded-full lg:rounded-lg']},
              input: {class: ['sx:text-xs lg:text-base font-medium']}
                }"
          v-model="selectedFinishing"
          :options="finishingType"
          optionLabel="name"
          placeholder="Отделка"
          class="lg:min-w-[14rem]"/>
    </div>
    <!--    <div v-else class="flex flex-col w-full">-->
    <!--      <Skeleton height="0.4rem" class="mb-2 w-[6rem]"/>-->
    <!--      <Skeleton height="2.4rem" class="w-full lg:min-w-[14rem]"/>-->
    <!--    </div>-->
    <!--    <div-->
    <!--        v-if="true"-->
    <!--        class="w-full flex flex-col gap-2">-->
    <!--      <label class="text-sm text-nearest-text font-medium">Комнаты</label>-->
    <!--      <Dropdown-->
    <!--          :pt="{-->
    <!--          root: {class: ['py-2.5 px-3 bg-black border-none sx:rounded-full lg:rounded-lg']},-->
    <!--          input: {class: ['sx:text-xs lg:text-base font-medium']}-->
    <!--            }"-->
    <!--          v-model="selectedRoom"-->
    <!--          :options="roomNumber"-->
    <!--          optionLabel="name"-->
    <!--          showClear-->
    <!--          placeholder="Кол-во комнат"-->
    <!--          class="w-full min-w-[10rem]"/>-->
    <!--    </div>-->
    <!--    <div v-else class="flex flex-col">-->
    <!--      <Skeleton height="0.4rem" class="mb-2 w-[4rem]"/>-->
    <!--      <Skeleton height="2.4rem" class="w-full min-w-[10rem]"/>-->
    <!--    </div>-->
    <div
        class="w-full grid grid-cols-2 gap-2">
      <div class="flex flex-col gap-2 items-center">
        <label class="text-sm text-nearest-text font-medium self-start">Блок</label>
        <Dropdown
            :pt="{
              root: {class: ['py-2.5 px-3 bg-black border-none sx:rounded-full lg:rounded-lg']},
              input: {class: ['sx:text-xs lg:text-base font-medium']}
                }"
            v-model="selectedBlock"
            :options="blocksOptions"
            optionLabel="name"
            optionValue="id"
            placeholder="Блок"
            class="w-full">
        </Dropdown>
      </div>
      <div class="flex flex-col gap-2 items-center">
        <label class="text-sm text-nearest-text font-medium self-start">Этаж</label>
        <input
            inputmode="numeric"
            v-model="selectedFloor"
            class="input min-w-[4rem] textInput text-base"
            placeholder="1"
            type="text"
            name="floorFrom"
            id="floorFrom">
      </div>
      <!--      <div class="sx:flex justify-between gap-2 w-full mb-2.5 text-white lg:hidden">-->
      <!--        <p class="p-2 bg-description-text-color rounded-lg text-xs min-w-[7rem]"><span class="text-[10px]">от </span>-->
      <!--          <span class="font-bold">{{ selectedFloor }}</span></p>-->
      <!--        <p class="p-2 bg-description-text-color rounded-lg text-xs min-w-[7rem]"><span class="text-[10px]">до </span>-->
      <!--          <span class="font-bold">{{ selectedFloor }}</span></p>-->
      <!--      </div>-->
      <!--      <Slider-->
      <!--          range-->
      <!--          :step="1"-->
      <!--          :min="-1"-->
      <!--          :max="20"-->
      <!--          :pt="{-->
      <!--            root: {class: ['w-[calc(100%-24px)] lg:hidden sx:block mb-2']},-->
      <!--            range: {class: ['bg-white']},-->
      <!--            starthandler: {class: ['border-white']},-->
      <!--            endhandler: {class: ['border-white']}-->
      <!--          }"-->
      <!--      />-->
    </div>
    <!--    <div v-else class="flex flex-col">-->
    <!--      <Skeleton height="0.4rem" class="mb-2 w-[2rem]"/>-->
    <!--      <Skeleton height="2.4rem" class="w-full min-w-[4rem]"/>-->
    <!--    </div>-->
    <div
        class="w-full flex flex-col gap-2 items-center">
      <label for="squareFrom" class="text-sm text-nearest-text font-medium self-start">Площадь (м2)</label>
      <!--      <div class="sx:flex justify-between gap-2 w-full mb-2.5 text-white lg:hidden">-->
      <!--        <p class="p-2 bg-description-text-color rounded-lg text-xs min-w-[7rem]"><span class="text-[10px]">от </span>-->
      <!--          <span class="font-bold"></span></p>-->
      <!--        <p class="p-2 bg-description-text-color rounded-lg text-xs min-w-[7rem]"><span class="text-[10px]">до </span>-->
      <!--          <span class="font-bold"></span></p>-->
      <!--      </div>-->
      <div class="w-full flex gap-2">
        <input
            inputmode="numeric"
            ref="textInput"
            v-model="selectedSquareFrom"
            class="input min-w-[6rem] textInput"
            @input="selectedSquareFrom = $event.target.value.replace(/\D/g, '').replace(/^0+/, '')"
            :placeholder="`от`"
            type="text"
            name="squareFrom"
            id="squareFrom">
        <input
            inputmode="numeric"
            v-model="selectedSquareTo"
            class="input min-w-[6rem] textInput"
            @input="selectedSquareTo =  $event.target.value.replace(/\D/g, '').replace(/^0+/, '')"
            :placeholder="`до`"
            type="text"
            name="squareTo">
      </div>
      <!--      <Slider-->
      <!--          range-->
      <!--          :step="1"-->
      <!--          :pt="{-->
      <!--      root: {class: ['w-[calc(100%-24px)] lg:hidden sx:block mb-2']},-->
      <!--      range: {class: ['bg-white']},-->
      <!--      starthandler: {class: ['border-white']},-->
      <!--      endhandler: {class: ['border-white']}-->
      <!--    }"-->
      <!--      />-->
    </div>
    <!--    <div v-else class="w-full flex gap-2">-->
    <!--      <div class="flex flex-col w-full">-->
    <!--        <Skeleton height="0.4rem" class="mb-2 w-[3rem]"/>-->
    <!--        <Skeleton height="2.4rem" class="w-full lg:min-w-[12rem]"/>-->
    <!--      </div>-->
    <!--      <div class="flex flex-col w-full">-->
    <!--        <Skeleton height="0.4rem" class="mb-2 w-[3rem]"/>-->
    <!--        <Skeleton height="2.4rem" class="w-full lg:min-w-[12rem]"/>-->
    <!--      </div>-->
    <!--    </div>-->
    <!--    <div-->
    <!--        v-if="true"-->
    <!--        class="w-full flex flex-col gap-2 items-center">-->
    <!--      <label for="priceFrom"-->
    <!--             class="text-sm text-nearest-text font-medium self-start">Стоимость</label>-->
    <!--      <div class="sx:flex justify-between gap-2 w-full mb-2.5 text-white lg:hidden">-->
    <!--        <p class="p-2 bg-description-text-color rounded-lg text-xs min-w-[7rem]"><span class="text-[10px]">от </span>-->
    <!--          <span class="font-bold"></span></p>-->
    <!--        <p class="p-2 bg-description-text-color rounded-lg text-xs min-w-[7rem]"><span class="text-[10px]">до </span>-->
    <!--          <span class="font-bold"></span></p>-->
    <!--      </div>-->
    <!--      <div class="w-full lg:flex sx:hidden max-sm:flex-col gap-2">-->
    <!--        <input-->
    <!--            v-model.number="selectedPriceFrom"-->
    <!--            class="lg:min-w-[10rem] input w-full"-->
    <!--            @input="selectedPriceFrom = $event.target.value.replace(/\D/g, '').replace(/^0+/, '').replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')"-->
    <!--            :placeholder="`от`"-->
    <!--            type="text"-->
    <!--            name="priceFrom"-->
    <!--            id="priceFrom">-->
    <!--        <input-->
    <!--            v-model.number="selectedPriceTo"-->
    <!--            class="lg:min-w-[10rem] input w-full"-->
    <!--            @input="-->
    <!--              selectedPriceTo = $event.target.value.replace(/\D/g, '').replace(/^0+/, '').replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')"-->
    <!--            :placeholder="`до`"-->
    <!--            type="text"-->
    <!--            name="priceTo">-->
    <!--      </div>-->
    <!--      <Slider-->
    <!--          range-->
    <!--          :step="1"-->
    <!--          :pt="{-->
    <!--      root: {class: ['w-[calc(100%-24px)] lg:hidden sx:block mb-2']},-->
    <!--      range: {class: ['bg-white']},-->
    <!--      starthandler: {class: ['border-white']},-->
    <!--      endhandler: {class: ['border-white']}-->
    <!--    }"-->
    <!--      />-->
    <!--    </div>-->
    <!--    <div v-else class="w-full flex gap-2">-->
    <!--      <div class="flex flex-col w-full">-->
    <!--        <Skeleton height="0.4rem" class="mb-2 w-[3rem]"/>-->
    <!--        <Skeleton height="2.4rem" class="w-full lg:min-w-[12rem]"/>-->
    <!--      </div>-->
    <!--      <div class="flex flex-col w-full">-->
    <!--        <Skeleton height="0.4rem" class="mb-2 w-[3rem]"/>-->
    <!--        <Skeleton height="2.4rem" class="w-full lg:min-w-[12rem]"/>-->
    <!--      </div>-->
    <!--    </div>-->
    <div
        class="sx:hidden lg:flex gap-2 self-end">
      <button
          @click="$emit('clearFilter')"
          class="px-4 py-2 w-full transparent-button leading-[14px]">Сбросить
      </button>
      <AppButtonSearch
          @click="$emit('search')"
          class="flex"/>
    </div>
    <!--    <div v-else class="lg:flex sx:hidden flex-col self-end">-->
    <!--      <Skeleton height="2.4rem" class="w-full min-w-[4rem]"/>-->
    <!--    </div>-->
  </div>
</template>

<script setup>

useHead({
  meta: {
    content: 'user-scalable=0'
  }
})

const props = defineProps({
  apartment: {},
  apartmentType: {
    type: Array,
    default: []
  },
  finishing: {},
  finishingType: {},
  floor: {},
  squareFrom: {},
  squareTo: {},
  blocksOptions:{
    type:Array,
    required:false,
    default:[],
  },
  selectedBlock:{
    type:[
        Number,
        null
    ],
    default:0
  }
})

const route = useRouter()

const textInput = ref(null);

const selectedApartment = ref(props.apartment)
const selectedFinishing = ref(props.finishing)
const selectedFloor = ref(props.floor)
const selectedSquareFrom = ref(props.squareFrom)
const selectedSquareTo = ref(props.squareTo)
const blocksOptions = ref(props.blocksOptions)
const selectedBlock = ref(props.selectedBlock);
const switchPage = (e) => {
  route.push({
    name: 'lots-id',
    params: {
      id: e.value.id
    }
  })
}

watch(() => [
  props.apartment,
  props.finishing,
  props.floor,
  props.squareFrom,
  props.squareTo,
  props.blocksOptions,
  props.selectedBlock
], () => {
  selectedApartment.value = props.apartment
  selectedFinishing.value = props.finishing
  selectedFloor.value = props.floor
  selectedSquareFrom.value = props.squareFrom
  selectedSquareTo.value = props.squareTo;
  blocksOptions.value = props.blocksOptions
  selectedBlock.value = props.selectedBlock
})

watch(() => [
  selectedApartment.value,
  selectedFinishing.value,
  selectedFloor.value,
  selectedSquareFrom.value,
  selectedSquareTo.value,
  selectedBlock.value,

], () => {
  emit('update:apartment', selectedApartment.value)
  emit('update:finishing', selectedFinishing.value)
  emit('update:floor', selectedFloor.value)
  emit('update:squareFrom', selectedSquareFrom.value)
  emit('update:squareTo', selectedSquareTo.value)
  emit('update:selectedBlock',selectedBlock.value);

})

const emit = defineEmits([
  'clearFilter',
  'search',
  'update:selectedBlock',
  'update:apartment',
  'update:finishing',
  'update:floor',
  'update:squareFrom',
  'update:squareTo',
])

</script>