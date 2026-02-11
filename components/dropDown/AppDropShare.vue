<template>
  <global-dropdawn @closeDrop="$emit('closeDrop')">
    <div>
      <template
          v-for="item in dropData"
          :key="item.name">
        <button
            @click="item.action"
            class="flex gap-2 items-center p-3 text-sm group/drop stroke-#637381 text-#637381 w-full hover:bg-#F9F9F9">
          <component :is="item.icon" class="w-5 h-5 group-hover/drop:stroke-red-button"/>
          <p class="group-hover/drop:text-black">{{ item.name }}</p>
        </button>
      </template>
    </div>
    <div class="flex justify-center gap-3 px-4 py-2">
      <template
          v-for="item in dropSocials"
          :key="item">
        <a
            @click="showShare = false"
            :href="item.link" target="_blank">
          <component :is="item.icon" class="w-8 h-8"/>
        </a>
      </template>
    </div>
  </global-dropdawn>
</template>

<script setup>
import AppImgPrinter from "../svg/dropDown/AppImgPrinter.vue";
import AppImgDocument from "../svg/dropDown/AppImgDocument.vue";
import AppImgCopy from "../svg/dropDown/AppImgCopy.vue";
import AppImgGmail from "../svg/dropDown/AppImgGmail.vue";
import AppImgTelegramm from "../svg/dropDown/AppImgTelegramm.vue";
import AppImgWhatsApp from "../svg/dropDown/AppImgWhatsApp.vue";
import AppImgVk from "../svg/dropDown/AppImgVk.vue";
import html2pdf from 'html2pdf.js'

const {$notify} = useNuxtApp();

const props = defineProps({
  printElement: {},
  modelValue: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['closeDrop', 'update:modelValue'])

const showShare = ref(props.modelValue)


watch(() => props.modelValue, () => {
  showShare.value = props.modelValue
})

watch(() => showShare.value, () => {
  emit('update:modelValue', showShare.value)
})

const dropData = ref([
  // {
  //   icon: shallowRef(AppImgPrinter),
  //   name: 'Печать помещения',
  //   action: () => {
  //     const element = document.getElementById('element-to-print')
  //     let opt = {
  //       pagebreak: {mode: 'avoid-all', before: '#page2el'},
  //       filename: today + '.pdf',
  //       margin: [0.1, 0.3],
  //       image: {type: ['jpeg', 'png', 'webp'], quality: 0.95},
  //       html2canvas: {scale: 2},
  //       jsPDF: {unit: 'in', format: 'a4', orientation: 'portrait', precision: 16},
  //     };
  //     html2pdf()
  //         .set(opt)
  //         .from(element)
  //         .toPdf()
  //         .get('pdf')
  //         .then((pdf) => {
  //           pdf.autoPrint()
  //         })
  //         .save()
  //     showShare.value = false
  //   }
  // },
  // {
  //   icon: shallowRef(AppImgDocument),
  //   name: 'Скачать помещение в PDF',
  //   action: () => {
  //     const element = document.getElementById('element-to-print')
  //     let opt = {
  //       pagebreak: {mode: 'avoid-all', before: '#page2el'},
  //       filename: today + '.pdf',
  //       margin: [0.1, 0.3],
  //       image: {type: 'jpeg', quality: 1},
  //       html2canvas: {scale: 2},
  //       jsPDF: {unit: 'in', format: 'a4', orientation: 'portrait', precision: 16},
  //     };
  //     html2pdf()
  //         .set(opt)
  //         .from(element)
  //         .toPdf()
  //         .save()
  //     showShare.value = false
  //   }
  // },
  {
    icon: shallowRef(AppImgCopy), name: 'Копировать ссылку',
    action: () => {
      return copyUrl()
    }
  },
])

const route = useRoute();

const textToCopy = window.location.href;
const copyUrl = () => {
  const inputElement = document.createElement('input');
  inputElement.value = textToCopy;
  document.body.appendChild(inputElement);
  inputElement.select();
  document.execCommand('copy');
  document.body.removeChild(inputElement);
  $notify.success('Ссылка скопирована');
  showShare.value = false;
}

const dropSocials = ref([
  {icon: shallowRef(AppImgGmail), link: `mailto:?subject=Поделиться ссылкой&body=${textToCopy}`},
  {
    icon: shallowRef(AppImgTelegramm),
    link: `https://t.me/share/url?url=${textToCopy}&text=Поделиться ссылкой`
  },
  {icon: shallowRef(AppImgWhatsApp), link: `https://web.whatsapp.com/send?text=${textToCopy}`},
  {icon: shallowRef(AppImgVk), link: `https://vk.com/share.php?url=${textToCopy}&text=Поделиться ссылкой`},
])

</script>