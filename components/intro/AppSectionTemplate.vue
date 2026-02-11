<template>

  <div class="rounded-2xl overflow-hidden">
    <div class="custom-galleria relative">
      <button
          @click="$emit('closeSectionTemplate')"
          class="absolute top-0 right-0 z-10 p-4">
        <AppImgClose class="w-6 h-6 stroke-white"/>
      </button>

      <!--    desktop-->

      <div class="max-md:hidden relative min-h-[25rem]">
        <Galleria
            :value="blockData.img"
            autoPlay
            v-if="blockData.block !== undefined"
            :circular="true"
            :numVisible="1"
            :numScroll="1"
            :transitionInterval="3000"
            :showItemNavigators="true"
            :showThumbnails="false">
          <template #item="slotProps">
            <div class="w-full h-full relative">
              <div class="absolute top-0 left-0 right-0 bottom-0 bg-gradient-radial w-full h-full"></div>

              <!--            Главная каритинка галереи-->

              <img v-if="slotProps.item.type === 'photo'" :src="slotProps.item.path"
                   :alt="slotProps.item.path"
                   class="w-full h-[70dvh] object-center object-cover bg-back-black-sections"/>
              <div v-else class="w-full h-[70dvh] object-center object-cover bg-back-black-sections">
                <video class="w-full h-full object-cover" autoplay loop controlslist="nofullscreen" muted controls
                       playsinline>
                  <source class="" :src="slotProps.item.path" type="video/mp4">
                </video>
              </div>


              <!--            Верхний левый блок-->

              <div class="absolute top-0 left-0 p-6">
                <Skeleton
                    width="164px"
                    height="32px"
                    class="rounded-full"
                    v-if="!useStorkCategories().getIsFloorsCollectionLoaded"/>
                <p
                    v-else
                    class="text-sm py-1.5 px-4 bg-white rounded-full max-w-max mb-4">Блок
                  {{ blockData.block }}
                  ({{ blockData.totalFloor }}
                  этажей)
                </p>
                <h3 class="font-unbounded text-white text-2xl uppercase max-w-[43.75rem]">
                  Высоколиквидные инвестиции.
                  Пространство для комфортного проживания</h3>
              </div>
            </div>

            <!--          Нижняя панель апартаментов-->

            <Panel
                :pt="{
              header: {class: ['flex-row-reverse gap-7 justify-center bg-back-white-sections border-none md:p-6 rounded-t-2xl']},
              content: {class: ['bg-back-white-sections p-6']}
              }"
                class="absolute bottom-0 left-0 right-0 w-full z-[10]"
                toggleable>

              <!--            Хедер панели-->

              <template #header>
                <div class="custom-tabview-section w-full overflow-hidden">

                  <!--                ТабВью для апартаментов-->

                  <TabView
                      :scrollable="true"
                      :pt="{
                 panelContainer: {class: ['p-0']},
                 navContent: {class: ['rounded-full w-full bg-white overflow-x-scroll']},
                 nav: {class: ['border-none bg-white px-0 py-1 gap-1 text-lg font-bold']},
                 }">
                    <TabPanel
                        v-if="!useStorkCategories().getIsFloorsCollectionLoaded"
                        :pt="{
                      header: {class: ['w-full px-1']},
                      headerAction: {class: ['tab-header-section-style']}
                        }"
                        v-for="item in 4"
                    >
                      <template #header>
                        <Skeleton width="100%" height="3rem"/>
                      </template>

                    </TabPanel>
                    <template v-else>
                      <TabPanel
                          v-for="(floor, i) in useStorkCategories().getFacadeFloorsCollection"
                          :pt="{
                                     header: {class: ['w-full px-1']},
                                     headerAction: {class: ['tab-header-section-style']}
                                     }">
                        <template #header>
                          <button :disabled="floor.count === 0"
                              @click="getApartments(floor.idx, currentBlockId)"
                              class="py-2.5 disabled:bg-gray-200 disabled:opacity-20 px-5 w-full"
                          >{{ floor.idx }}
                          </button>
                        </template>
                        <client-only>
                          <Teleport
                              v-if="currentTab === floor.idx"
                              to="#test">
                            <div v-if="isApartmentsLoaded"
                                 class="flex flex-nowrap gap-7 overflow-x-auto w-full">
                              <AppLotsCard
                                  class="max-w-[20rem] w-full shrink-0"
                                  :path="{name: 'lots-id', params: {id : item.id}}"
                                  img-property="pt-[60%]"
                                  :is-facade-load="currentBlockId"
                                  v-for="item in facadeCategories"
                                  :card="item"/>
                            </div>
                          </Teleport>
                        </client-only>
                      </TabPanel>
                    </template>
                  </TabView>
                </div>
              </template>

              <!--            Телепорт контента табвью в панель-->

              <template #default>
                <div v-show="isApartmentsLoaded" id="test"></div>
                <div
                    v-if="!isApartmentsLoaded"
                    class="flex flex-nowrap gap-7 overflow-x-auto w-full">
                  <Skeleton
                      class="shrink-0"
                      width="18.75rem"
                      height="20.25rem"
                      v-for="item in 6"/>
                </div>
              </template>
            </Panel>
          </template>
        </Galleria>
        <div v-else class="absolute top-0 left-0 h-full w-full flex place-content-center place-items-center">
          <div class="loadership_ZXYRT">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>

      <!--  mobile-->

      <div class="relative sx:block h-[90svh] md:hidden">
        <Galleria
            :value="blockData.img"
            autoPlay
            v-if="blockData.block !== undefined"
            :circular="true"
            :numVisible="1"
            :numScroll="1"
            :showItemNavigators="true"
            :showThumbnails="false">
          <template #item="slotProps">
            <div class="w-full h-[90svh]">
              <div class="absolute top-0 left-0 bg-gradient-radial w-full h-full"></div>

              <!--            Главная каритинка галереи-->

              <img v-if="slotProps.item.type === 'photo'" :src="slotProps.item.path"
                   :alt="slotProps.item.path"
                   class="w-full h-full object-center object-cover bg-back-black-sections"/>
              <div v-else class="w-full h-full object-center object-cover bg-back-black-sections">
                <video class="h-full w-full object-cover" autoplay loop controlslist="nofullscreen" muted controls
                       webkit-playsinline playsinline>
                  <source :src="slotProps.item.path" type="video/mp4">
                </video>
              </div>

              <!--            Верхний левый блок-->

              <div class="absolute top-0 left-0 p-6">
                <Skeleton
                    width="164px"
                    height="32px"
                    class="rounded-full"
                    v-if="!useStorkCategories().getIsFloorsCollectionLoaded"/>
                <p
                    v-else
                    class="text-sm py-1.5 px-4 bg-white rounded-full max-w-max mb-4">Блок
                  {{ blockData.block }}
                  ({{ blockData.totalFloor }}
                  этажей)</p>
                <h3 class="font-unbounded text-white dynamic-section-template-font uppercase">
                  Высоколиквидные инвестиции.
                  Пространство для комфортного проживания</h3>
              </div>

              <!--          Нижняя панель апартаментов-->

              <Panel
                  :pt="{
                           header: {class: ['flex-row-reverse gap-4 justify-between bg-back-white-sections border-none rounded-t-2xl']},
                           content: {class: ['bg-back-white-sections']}
                        }"
                  class="absolute bottom-0 left-0 right-0 w-full z-10"
                  toggleable>
                <template #header>
                  <Dropdown
                      @change="changeFloor"
                      v-model="selectedFloors"
                      :options="useStorkCategories().getFacadeFloorsCollection"
                      optionLabel="idx"
                      class="w-full rounded-lg hover:border-description-text-color focus:border-description-text-color">
                    <template #value="slotProps">
                      <Skeleton v-if="!useStorkCategories().getIsFloorsCollectionLoaded"/>
                      <span v-else-if="slotProps.value">{{ slotProps.value.idx + ' этаж' }}</span>
                      <span v-else>{{ firstFloor }} этаж</span>
                    </template>
                  </Dropdown>
                </template>
                <template #default>
                  <div
                      v-if="!isApartmentsLoaded"
                      class="flex flex-nowrap gap-7 overflow-x-auto w-full">
                    <Skeleton
                        class="shrink-0"
                        width="18.75rem"
                        height="20.25rem"
                        v-for="item in 6"/>
                  </div>

                  <div
                      v-else
                      class="flex flex-nowrap gap-5 overflow-x-auto w-full">
                    <AppLotsCard
                        class="w-[18.75rem] shrink-0"
                        :path="{name: 'lots-id', params: {id : item.id}}"
                        img-property="pt-[60%]"
                        v-for="item in facadeCategories"
                        :card="item"/>
                  </div>
                </template>
              </Panel>
            </div>
          </template>
        </Galleria>
        <div v-else class="absolute top-0 left-0 h-[90svh] w-full flex place-content-center place-items-center">
          <div class="loadership_ZXYRT">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import room from '~/assets/image/incomeTab/lotCategories/room.jpg'
import {useStorkCategories} from "../../stores/useStorkCategories.js";

const selectedFloors = ref()

const windowWidth = ref()

const currentTab = ref()

const facadeCategories = ref([])

const isApartmentsLoaded = ref(false)

const blockData = ref({})

const firstFloor = ref()

const {$eventBus} = useNuxtApp()

const changeFloor = (e) => {
  getApartments(e.value.idx, props.currentBlockId)
}

const props = defineProps({
  currentBlockId: {
    type: Number,
    required: true,
    default: 1
  }
})

const getApartments = (idx, blockId) => {
  isApartmentsLoaded.value = false
  currentTab.value = idx
  customFetch('/facade/categories', {
    method: 'GET',
    query: {
      block_id: blockId,
      floor: idx
    },
    onResponse({request, response, options}) {
      if (response.status === 200) {
        facadeCategories.value = response._data
        isApartmentsLoaded.value = true
        getBlockData()
      }
    }
  })
}

const getBlockData = () => {
  blockData.value = {
    totalFloor: useStorkCategories().getFacadeFloors?.total_floors,
    block: useStorkCategories().getFacadeFloors?.block?.title,
    img: useStorkCategories().getFacadeFloors?.block.pictures,
    description: useStorkCategories().getFacadeFloors?.block.description,
  }
}

onMounted(() => {

  windowWidth.value = window.innerWidth
  window.addEventListener('resize', () => {
    windowWidth.value = window.innerWidth
  })

  $eventBus.$on('get_apartments', (arg) => {
    firstFloor.value = arg.idx
    getApartments(arg.idx, arg.block_id)
  })
})

onBeforeUnmount(() => {
  $eventBus.$off('get_apartments');
})

</script>

<style>

</style>