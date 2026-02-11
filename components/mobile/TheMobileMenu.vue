<template>
  <GlobalModal
      :pt="{
    root: {class: ['m-0 max-h-[100dvh] block w-full']},
    content: {class: ['bg-back-black-sections py-8 px-5 rounded-none h-[100dvh]']}
  }"
      :breakpoints="{'768px': '100vw'}"
      :position="position"
      v-model="visible">
    <div class="flex gap-6 justify-between items-start mb-10">
      <div class="flex items-start flex-col gap-2.5 text-white">
        <NuxtLink
            @click="$emit('closeMobileModal')"
            :to="{path: item.link, query: item.query}"
            class="py-1 px-2 font-semibold"

            v-for="item in nav"
        >{{ item.name }}
        </NuxtLink>
      </div>
      <button @click="$emit('closeMobileModal')">
        <AppImgClose
            class="w-6 h-6 stroke-description-text-color"/>
      </button>
    </div>
    <button class="red-button sx:w-full ss:max-w-max px-4 py-2.5 mb-10" ref="buttonName" @click="openModal()">
      Связаться с менеджером
    </button>
    <div class="flex gap-2 mb-10">
      <a href="https://vk.com/stork_hotels" target="_blank" ><AppVkLogo class="w-8 h-8 fill-[#4F46E5] opacity-80 hover:opacity-100 transition-opacity"/></a>
      <a href="https://t.me/stork_hotels" target="_blank" ><AppTelegramLogo class="w-8 h-8 fill-[#2AABEE] opacity-80 hover:opacity-100 transition-opacity"/></a>
    </div>
    <a
        href="https://uawards.ru/awards/21?nomineeId=5537#nominees"
        target="_blank"
       class="mb-10 block">
      <img
          src="../../assets/image/urban.svg"
          alt="Urban awards"
          class="hover:scale-110 transition-all w-28"
      >
    </a>
    <TheMobileFooter/>
  </GlobalModal>

  <AppModalLearnMore
      v-model="show"
      :dispatchTitle=dispatchTitle
  />
</template>

<script setup>

import {useNavigation} from "~/stores/useNavigation.js";
import AppTelegramLogo from "../svg/mobile/AppTelegramLogo.vue";
import AppVkLogo from "../svg/AppVkLogo.vue";

const {nav} = useNavigation()

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
  }
})

const visible = ref(props.modelValue)
const show = ref(null);
const dispatchTitle = ref(null);
const buttonName = ref(null);

const openModal = () => {
  show.value = !show.value;
  dispatchTitle.value = buttonName.value.textContent;
}

watch(() => props.modelValue, () => {
  visible.value = props.modelValue;
})

watch(() => visible.value, () => {
  emit('update:modelValue', visible.value)
})

const emit = defineEmits(['update:modelValue', 'closeMobileModal'])
</script>
