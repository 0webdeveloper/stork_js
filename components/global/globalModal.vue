<template>
  <Dialog
      :pt="pt"
      :breakpoints="breakpoints"
      v-model:visible="visible"
      :dismissableMask="true"
      :draggable="false"
      :modal="true"
      :close-on-escape="true"
      :showHeader="false"
      :position="position"
      contentClass="rounded-2xl custom-modal"
      :baseZIndex="baseZIndex"
      :autoZIndex="autoZIndex"
  >
    <slot/>
  </Dialog>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
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
    type: String,
    default: 'center'
  },
  breakpoints: {
    type: Object,
    required: true
  },
  pt: {
    type: Object,
    required: false
  }
})

const visible = ref(props.modelValue)

watch(() => props.modelValue, () => {
  visible.value = props.modelValue;
})

watch(() => visible.value, () => {
  emit('update:modelValue', visible.value)
})

const emit = defineEmits(['update:modelValue'])

</script>

<style scoped>

</style>
