<template>
  <section class="bg-back-black-sections w-full min-h-[100dvh] sx:pt-32 md:pt-44 sx:pb-16 md:pb-24">
    <div class="container">
      <div class="mb-12">
        <h1 class="title text-white mb-16">Контакты</h1>
      </div>
      <div class="custom-tabview-extra sx:mb-5 md:mb-12 pb-4">
        <TabView
            @tab-change="tabChange"
            :pt="{
      navContainer: {class: ['md:mb-16 sx:mb-10']},
      navContent: {class: ['rounded-full bg-black']},
      nav: {class: ['border-none bg-black py-1  px-0 gap-1 text-lg font-bold']},
      panelContainer: {class: ['p-0']}
          }">
          <TabPanel
              :pt="{
        header: {class: ['w-full px-1']},
        headerAction: {class: ['tab-header-style']}
      }">
            <template #header>
              <button class="px-4 py-2 whitespace-nowrap">
                Расположение объекта
              </button>
            </template>
            <div>
              <div class="mt-4 grid md:grid-cols-3 mb-12 gap-7">
                <div
                    v-for="contact in contactsInfo"
                    :key="contact.id"
                    class="flex flex-col gap-2">
                  <p class="text-description-text-color font-medium text-lg">{{ contact.title }}</p>
                  <a
                      class="text-white font-unbounded lg:text-2xl xl:text-3xl"
                      :href="contact.href">{{ contact.text }}</a>
                </div>
                <div class="flex flex-col gap-2">
                  <p class="text-description-text-color font-medium text-lg">Социальные сети</p>
                  <div class="flex gap-2">
                  <a href="https://vk.com/stork_hotels" target="_blank" ><AppVkLogo class="w-8 h-8 fill-[#4F46E5] opacity-80 hover:opacity-100 transition-opacity"/></a>
                  <a href="https://t.me/stork_hotels" target="_blank" ><AppTelegramLogo class="w-8 h-8 fill-[#2AABEE] opacity-80 hover:opacity-100 transition-opacity"/></a>
                  </div>
                </div>
              </div>
              <!---->
            </div>
          </TabPanel>
          <TabPanel
              :pt="{
        header: {class: ['w-full px-1']},
        headerAction: {class: ['tab-header-style']}
      }">
            <template #header>
              <button class="px-4 py-2 whitespace-nowrap">
                Отдел продаж
              </button>
            </template>
            <div class="mt-4 grid md:grid-cols-3 gap-7 mb-12">
              <div
                  v-for="contact in saleContactsInfo"
                  :key="contact.id"
                  class="flex flex-col gap-2">
                <p class="text-description-text-color font-medium text-lg">{{ contact.title }}</p>
                <a
                    class="text-white font-unbounded lg:text-2xl xl:text-3xl"
                    :href="contact.href">{{ contact.text }}
                </a>
              </div>
              <div class="flex flex-col gap-2">
                <p class="text-description-text-color font-medium text-lg">Социальные сети</p>
                <div class="flex gap-2">
                  <a href="https://vk.com/stork_hotels" target="_blank" ><AppVkLogo class="w-8 h-8 fill-[#4F46E5] opacity-80 hover:opacity-100 transition-opacity"/></a>
                  <a href="https://t.me/stork_hotels" target="_blank" ><AppTelegramLogo class="w-8 h-8 fill-[#2AABEE] opacity-80 hover:opacity-100 transition-opacity"/></a>
                </div>
              </div>
            </div>
          </TabPanel>
        </TabView>
        <button
            @click.prevent="handleClick"
            class="whitespace-nowrap transparent-button px-8 mb-10 block max-w-max">
          Скачать PDF проекта
        </button>
        <div class="w-full mt-4 h-[450px] md:[500px] rounded-md overflow-hidden">
          <LMap
              :options="{attributionControl: false}"
              ref="mapRef"
              :zoom="zoom"
              :center="changeCoordinates"
              class="z-[5]"
          >
            <LTileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                layer-type="base"
                name="OpenStreetMap"
                :attribution="'&amp;copy; Ained Digital '+ new Date().getFullYear() +'. Все права защищены.'"
            />
            <LMarker
                ref="popupRef"
                :lat-lng="changeCoordinates">
              <LIcon :options="iconOptions"/>
              <LPopup @ready="popupInstall" class="bg-black h-full w-full"
                      :options="{closeButton: false, visible:true, maxWidth:'250px'}">
                <div class="p-1">
                  <h2 class="text-white font-unbounded text-xl uppercase">STORK</h2>
                </div>
              </LPopup>
            </LMarker>
            <!---->
            <LPolygon :lat-lngs="polygonLatLngs" :options="polygonOptions">
              <LTooltip :content="tooltipContent1" :options="{permanent: false}"/>
            </LPolygon>
            <LPolygon :lat-lngs="polygonLatLngs2" :options="polygonOptions2">
              <LTooltip :content="tooltipContent2" :options="{permanent: false}"/>
            </LPolygon>
            <LPolygon :lat-lngs="polygonLatLngs3" :options="polygonOptions3">
              <LTooltip :content="tooltipContent3" :options="{permanent: false}"/>
            </LPolygon>
            <LPolygon :lat-lngs="polygonLatLngs4" :options="polygonOptions4">
              <LTooltip :content="tooltipContent4" :options="{permanent: false}"/>
            </LPolygon>
            <!---->
            <l-control-attribution position="bottomright" prefix="">
            </l-control-attribution>
          </LMap>
        </div>
      </div>
    </div>
    <AppModalLearnMore
        @success="success"
        v-model="visible"/>
  </section>
</template>

<script setup>
import Contacts4 from '~/assets/image/Contacts4.svg'
import AppVkLogo from "../svg/AppVkLogo.vue";
import AppTelegramLogo from "../svg/mobile/AppTelegramLogo.vue";

const activeIndex = ref(0)

const visible = ref(false)

const successValue = ref(false)

const success = (params) => {
  successValue.value = params
}

const handleClick = () => {
  visible.value = true
}

watch(() => successValue.value, () => {
  if (successValue.value) {
    window.open(useRuntimeConfig().public.baseHostUrl + '/storage/files/stork_investor.pdf', '_blank');
  }
})

const tabChange = (e) => {
  activeIndex.value = e.index
}

const changeCoordinates = computed(() => {
  return activeIndex.value === 0 ? [52.597845, 39.600828] : [52.61713913890672, 39.571818835582064]
})

const zoom = ref(15);
const iconOptions = ref({
  iconUrl: Contacts4,
  iconSize: [32, 32],
});

const polygonLatLngs = [
  [52.5850539937766, 39.58183752120879],
  [52.58236977501127, 39.57905293722851],
  [52.58148326583969, 39.57786381195455],
  [52.58114940026856, 39.5760900231277],
  [52.58278267719059, 39.574128754650616],
  [52.58363957543687, 39.56738096380811],
  [52.58466276089402, 39.565341517504834],
  [52.58635413401435, 39.56227695840334],
  [52.58809818927463, 39.55924810693226],
  [52.5941694579882, 39.563211996532566],
  [52.59561459126541, 39.565126536998825],
  [52.598180840288904, 39.567994799559905],
  [52.59914716080281, 39.56952400087047],
  [52.59516488276911, 39.59453972472462],
  [52.59634449945607, 39.59465601273247],
  [52.5963653542631, 39.594707511669434],
  [52.59321407608694, 39.5944808899924],

];
const polygonLatLngs2 = [
  [52.598409316480364, 39.615117909398016],
  [52.599798146330734, 39.61420033680436],
  [52.60121400266971, 39.6140192750139],
  [52.601951739245926, 39.61238398863662],
  [52.60287174261491, 39.610979800623916],
  [52.60379957634887, 39.60553920273048],
  [52.60475870207666, 39.60174548656176],
  [52.60742198059179, 39.60188013977867],
  [52.60780734107203, 39.6031801666588],
  [52.60780734107203, 39.6031801666588],
  [52.60780734107203, 39.6031801666588],
  [52.607969104125736, 39.60476615018017],
  [52.607772907557624, 39.60351729239881],
  [52.61098201874281, 39.60916125752226],
  [52.61159075167297, 39.61141851815907],
  [52.61129125152768, 39.61189122794428],
  [52.61168054524927, 39.61314811510724],
  [52.61450744046934, 39.61682163963616],
  [52.61545355049452, 39.6187914605074],
  [52.615463973151854, 39.62049090840117],
  [52.6142028183735, 39.62107455865442],
  [52.61268104607242, 39.621950030105275],
  [52.61198268074322, 39.62311732799242],
  [52.61146150538865, 39.62212169148223],
  [52.60959564700216, 39.62146937772594],
  [52.60872328129029, 39.622563813685076],
  [52.60908123395597, 39.62603287405227],
  [52.60619656183293, 39.62881377563374],
  [52.60534244273503, 39.62976062275664],
  [52.603017600782636, 39.62517726451586],
  [52.601537143060135, 39.62629306346606],
  [52.600213030073405, 39.626516223779966],
  [52.59868034453456, 39.62146937772594],
  [52.59749169534728, 39.61825931050078],
  [52.59672009821585, 39.618963121884356],
  [52.59641845194982, 39.617392615705434],
];

const polygonLatLngs3 = [
  [52.598211, 39.596515],
  [52.599014, 39.596397],
  [52.599798, 39.596944],
  [52.600471, 39.598274],
  [52.600576, 39.602115],
  [52.600047, 39.602823],
  [52.599433, 39.602974],
  [52.598590, 39.602233],
  [52.598270, 39.600002],
  [52.598688, 39.596354],
];

const polygonLatLngs4 = [
  [52.60172882748033, 39.5739355779228],
  [52.60289072687556, 39.57440630133571],
  [52.60714464715404, 39.57931873111875],
  [52.60703614859274, 39.58609076136493],
  [52.60738441234136, 39.5928628127126],
  [52.59962666928777, 39.59590075240108],
  [52.59566959964696, 39.596027970912836],
]

const polygonOptions = {
  color: 'none',
  fillColor: '#8C96FA',
  fillOpacity: .8,
};
const polygonOptions2 = {
  color: 'none',
  fillColor: '#34D399',
  fillOpacity: .8
};
const polygonOptions3 = {
  color: 'none',
  fillColor: '#FCD34D',
  fillOpacity: .8
};
const polygonOptions4 = {
  color: 'none',
  fillColor: '#F87171',
  fillOpacity: .8
};

const contactsInfo = ref([
  {id: 1, title: 'Телефон', text: '+7 (4742) 51-63-93', href: 'tel:+74742516393'},
  {id: 2, title: 'E-mail', text: 'sale@stork-hotels.ru', href: 'mailto:sale@stork-hotels.ru'},
  {id: 3, title: 'Адрес', text: 'улица М.И. Неделина, 6', href: null},
])

const saleContactsInfo = ref([
  {id: 1, title: 'Телефон', text: '+7 (4742) 51-63-93', href: 'tel:+74742516393'},
  {id: 2, title: 'E-mail', text: 'sale@stork-hotels.ru', href: 'mailto:sale@stork-hotels.ru'},
  {id: 3, title: 'Адрес', text: 'г. Липецк, ул. Космонавтов, д. 24/1', href: null},
])


const tooltipContent1 = 'Жилой массив(многоэтажное строительство)';
const tooltipContent2 = 'Рекреационная зона: парки, Зоопарк';
const tooltipContent3 = 'Частный сектор и исторические здания';
const tooltipContent4 = 'Исторический и культурный центр';


const popupRef = ref()

const popupInstall = event => {
  popupRef.value.leafletObject.openPopup()
}

onMounted(() => {

})
</script>

<style>
.leaflet-popup-content-wrapper {
  background: #000000;
  color: #ffffff;
  box-shadow: 0 3px 14px rgba(0, 0, 0, 0.4);
  }

.leaflet-popup-tip {
  background: #000000;
  }
</style>

