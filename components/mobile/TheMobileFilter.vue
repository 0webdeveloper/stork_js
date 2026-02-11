<template>
  <GlobalModal
      :pt="{
    root: {class: ['m-0 max-h-[100dvh] block w-full']},
    content: {class: ['bg-back-black-sections py-8 px-5 rounded-none h-[100dvh]']}
  }"
      :breakpoints="{'768px': '100vw'}"
      :position="position"
      v-model="visible">
    <div class="flex gap-6 justify-between items-start mb-10 text-white text-lg font-semibold">
      <h3>Фильтр</h3>
      <button @click="$emit('closeMobileMenu')">
        <AppImgClose
            class="w-5 h-5 stroke-description-text-color"/>
      </button>
    </div>
    <div class="lg:hidden sx:flex flex-col justify-start gap-8 shrink-0 overflow-y-auto">
      <AppFilter
          v-model:floor="selectedFloor"
          v-model:square-from="selectedSquareFrom"
          v-model:square-to="selectedSquareTo"
          v-model:apartment="selectedApartment"
          v-model:finishing="selectedFinishing"
          v-model:blocks-options="blocksOptions"
          :apartment-type="apartmentType"
          :finishing-type="finishingType"
      />
    </div>
    <div class="flex-default gap-2">
      <button
          @click="$emit('clearFilter')"
          class="py-4 w-full transparent-button">Сбросить
      </button>
      <button
          @click="$emit('sendFilter')"
          class="red-button py-4 w-full">Показать
      </button>
    </div>
  </GlobalModal>
</template>

<script setup>

const props = defineProps({
  apartment: {},
  apartmentType: {},
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
    required:true,
    default:0,
  },
  visible: {
    type: Boolean || undefined
  },

  autoZIndex: {
    type: Boolean,
    default: false,
  },

  baseZIndex: {
    type: Number,
    default: 1000,
  },
  position: {
    type: String
  }
})

const blocksOptions = ref(props.blocksOptions);

const selectedApartment = ref(props.apartment)
const selectedFinishing = ref(props.finishing)
const selectedFloor = ref(props.floor)
const selectedSquareFrom = ref(props.squareFrom)
const selectedSquareTo = ref(props.squareTo)
const selectedBlock = ref(props.selectedBlock)

const visible = ref(props.visible)

watch(() => [
  props.visible,
  props.apartment,
  props.finishing,
  props.floor,
  props.squareFrom,
  props.squareTo,
  props.blocksOptions,
  props.selectedBlock,
], () => {
  selectedApartment.value = props.apartment
  selectedFinishing.value = props.finishing
  selectedFloor.value = props.floor
  selectedSquareFrom.value = props.squareFrom
  selectedSquareTo.value = props.squareTo
  blocksOptions.value = props.blocksOptions;
  selectedBlock.value = props.selectedBlock;
  visible.value = props.visible
})

watch(() => [
  selectedApartment.value,
  selectedFinishing.value,
  selectedFloor.value,
  selectedSquareFrom.value,
  selectedSquareTo.value,
  selectedBlock.value,
  visible.value
], () => {
  emit('update:apartment', selectedApartment.value)
  emit('update:finishing', selectedFinishing.value)
  emit('update:floor', selectedFloor.value)
  emit('update:squareFrom', selectedSquareFrom.value)
  emit('update:squareTo', selectedSquareTo.value)
  emit('update:selectedBlock',selectedBlock.value)
  emit('update:visible', visible.value)
})

const emit = defineEmits([
  'update:visible',
  'update:apartment',
  'update:finishing',
  'update:floor',
  'update:squareFrom',
  'update:squareTo',
  'update:selectedBlock',
  'closeMobileMenu',
  'clearFilter',
  'sendFilter'
])
</script>