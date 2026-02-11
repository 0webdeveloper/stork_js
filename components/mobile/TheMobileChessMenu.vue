<template>
  <GlobalModal
      :pt="{
    root: {class: ['m-0 max-h-[100dvh] block']},
    content: {class: ['bg-back-black-sections py-8 px-5 rounded-none h-[100dvh]']}
  }"
      :breakpoints="{'768px': '100vw'}"
      :position="position"
      v-model="visible">
    <div class="flex gap-6 justify-between items-start mb-10 text-white text-lg font-semibold">
      <h3>Обозначения шахматки</h3>
      <button @click="$emit('closeChessMenu')">
        <AppImgClose
            class="w-5 h-5 stroke-description-text-color"/>
      </button>
    </div>
    <div class="md:hidden sx:flex flex-col justify-start gap-8 shrink-0 overflow-y-auto">
      <AppChessLeftSide/>
    </div>
  </GlobalModal>
</template>

<script setup>

const props = defineProps({
  modelValue: {
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
  },
  activeButton: {}
})

const visible = ref(props.modelValue)

watch(() => props.modelValue, () => {
  visible.value = props.modelValue;
})

watch(() => visible.value, () => {
  emit('update:modelValue', visible.value)
})

const emit = defineEmits(['update:modelValue', 'closeChessMenu'])
</script>