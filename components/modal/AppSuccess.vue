<template>

<global-modal
    :breakpoints="{'575px': '95vw'}"
    :pt="{
    content: {class: ['bg-back-black-sections md:p-8 sx:p-5']}
      }"
      v-model="model">
    <div class="text-center flex flex-col align-center">
      <AppImgLogo class="w-32 h-10 sx:fill-black lg:fill-white mx-auto mb-6" />
      <button @click="model = false" class="absolute top-2 right-2">
        <AppImgClose class="w-6 h-6 stroke-description-text-color"/>
      </button>
      <h3 class="text-white font-unbounded sx:text-xl md:text-3xl uppercase">Форма успешно отправлена!</h3>
        <template v-if="props.download">
            <a :href="props.download" class="border border-white text-white font-semibold px-8 py-3 rounded-full whitespace-nowrap transition duration-300 mt-6 hover:bg-white hover:text-black">Скачать презентацию</a>
        </template>

    </div>

  </global-modal>

</template>


<script setup>

const model = defineModel();

const props = defineProps({
    download: {
        type: String,
        required: false
    }
})

// const props = defineProps({
//   modelValue: {
//     type: Boolean || undefined
//   }
// })
//
// const visible = ref(props.modelValue)
//
// watch(() => props.modelValue, () => {
//   visible.value = props.modelValue;
// })
//
// watch(() => visible.value, () => {
//   emit('update:modelValue', visible.value)
// })
//
// const emit = defineEmits(['update:modelValue'])

</script>