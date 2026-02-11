<template>
  <section
      ref="lotCategoriesBox"
      class="md:py-24 sx:py-16">
    <h2
        class="title text-white md:mb-24 sx:mb-5 container">Категории<br
        class="sx:hidden md:block"><img
        src="~/assets/image/introTab/intro/intro-first.jpg"
        :width="windowWidth/8"
        class="lg:inline sx:hidden rounded-full max-w-[13.875rem]"
        alt="Building."> лотов</h2>
    <div class="container">
      <Dropdown
          :pt="{root: {class: ['dynamic-carddesc-font']}}"
          v-if="route.path === '/income'"
          v-model="goals"
          @change="changeGoal"
          :options="goalsList"
          optionLabel="name"
          optionValue="id"
          placeholder="Все цели"
          class="max-w-max rounded-full bg-black border-none py-2.5 px-4 custom-dropdown font-inter font-medium mb-5 w-full"/>
    </div>
    <div class="custom-tabview-extra">
      <TabView
          :pt="{
      navContainer: {class: ['md:mb-16 sx:mb-10', {'hidden' : route.path === '/income', 'container' : route.path === '/lots'}]},
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
            <button
                class="py-2.5 w-full ">Карточки
            </button>
          </template>
          <TabView
              :scrollable="true"
              :activeIndex="keyActive"
              @tab-change="handleTabChange"
              :pt="{
            nav: {class: ['md:mb-6 sx:mb-7 md:pb-3 md:overflow-x-auto']},
            nextbutton: {class: ['hidden']},
            previousbutton: {class: ['hidden']},
            panelContainer: {class: ['p-0']}
          }"
              class="custom-tabview font-inter container">
            <TabPanel v-for="category in useStorkCategories().getCategories">
              <template #header>
                <span
                    class="px-4 py-2 whitespace-nowrap"
                    @click="getCategory(category)">{{ category.name }}
                </span>
              </template>
            </TabPanel>
          </TabView>
          <div class="container">
            <div
                class="categories-net">
              <AppLotsCard
                  v-if='isSubCategLoaded'
                  class="lots-card"
                  img-property="pt-[80%]"
                  :path="{name: 'lots-id', params: {id : item.id ? item.id : null}}"
                  v-for="item in useStorkCategories().getSubcategories"
                  :card="item"
                  :active-tab="activeTab"
              />
            </div>
            <div v-if="!isCategoriesLoaded" class="flex gap-2 mb-6">
              <Skeleton v-for="item in 8" height="40px" class="w-full"/>
            </div>
            <div v-if='!isSubCategLoaded' class="categories-net">
              <Skeleton v-for="item in 8" class="pt-[100%] lots-card"/>
            </div>
          </div>
        </TabPanel>
        <TabPanel
            :pt="{
        header: {class: ['w-full px-1']},
        headerAction: {class: ['tab-header-style']}
      }">
          <template #header>
            <button class="py-2.5 w-full">Фасад</button>
          </template>
          <AppHotelInformation v-if="route.path.includes('lots')"/>
        </TabPanel>
        <TabPanel
            :pt="{
        header: {class: ['w-full px-1']},
        headerAction: {class: ['tab-header-style']}
      }">
          <template #header>
            <button class="py-2.5 w-full">Шахматка</button>
          </template>
          <div class="container">
            <div class="sx:flex md:hidden flex-col items-end gap-5 mb-5">
              <div class="flex-between gap-4 w-full custom-tree-select">
                <Dropdown
                    @change="changeBlock"
                    :pt="{root: {class: ['dynamic-carddesc-font']}}"
                    v-model="goals"
                    :options="useStorkCategories().getBlocks"
                    optionLabel="name"
                    placeholder="Выберите блок"
                    class="max-w-max rounded-full bg-black border-none py-2.5 px-4 custom-dropdown font-inter font-medium">
                  <template #value="slotProps">
                    <span v-if="slotProps.value">{{ 'Блок ' + slotProps.value.name }}</span>
                    <span v-else>{{ slotProps.placeholder }}</span>
                  </template>
                </Dropdown>
                <button
                    @click="visible = true"
                    class="p-2 bg-white rounded">
                  <AppImgInfo class="w-6 h-6 stroke-red-button"/>
                </button>
              </div>
              <div>
                <AppImgFieldSlider/>
              </div>
            </div>
            <div class="bg-black rounded-2xl md:p-6 sx:p-4 flex md:gap-16 h-[80dvh]">
              <div class="md:flex sx:hidden flex-col justify-start gap-8 shrink-0 overflow-y-auto">
                <AppChessLeftSide/>
              </div>
              <AppChess v-if="route.path.includes('lots')"/>
            </div>
          </div>
        </TabPanel>
      </TabView>
    </div>

    <template v-if="!formCollectionCategory.isDescriptionLoaded">
      <div class="sx:pt-16 md:pt-24 container">
        <Skeleton width="100%" height="50px" class="sx:mb-10 md:mb-16"></Skeleton>
        <div class="flex sx:flex-col 2xl:flex-row sx:gap-5 md:gap-7 items-start">
          <Skeleton class="basis-2/3 shrink-0 pt-[45%]"/>
          <div class="basis-1/3 w-full">
            <Skeleton height="50px" class="sx:mb-10 md:mb-16"/>
            <div class="flex flex-col gap-2 mb-10">
              <Skeleton width="100%" height="30px" v-for="item in 4"></Skeleton>
            </div>
            <div class="flex flex-col gap-2">
              <div
                  class="flex flex-col gap-5"
                  v-for="item in  5">
                <Skeleton height="25px" width="70%"/>
                <Skeleton height="25px" width="50%"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template
        v-else>
      <div class="container"
           v-if="formCollectionCategory.description">
        <div class="sx:pt-16 md:pt-24">
          <h2 class="title text-white sx:mb-10 md:mb-16">
            Категория <br><img
              :width="windowWidth/8"
              :src="room"
              class="inline rounded-full object-cover object-center max-w-[13rem] max-h-20 lg:inline sx:hidden"
              alt=""> {{ formCollectionCategory?.title }}
          </h2>
          <div class="flex sx:flex-col 2xl:flex-row sx:gap-5 md:gap-7 items-start">
            <div class="custom-galleria basis-2/3 shrink-0 w-full">
              <Galleria
                  :value="formCollectionCategory?.images"
                  autoPlay
                  :circular="true"
                  :numVisible="1"
                  :numScroll="1"
                  :showItemNavigators="true"
                  :showThumbnails="false">
                <template #item="slotProps">

                  <!--                Жесткая ширина, чтобы картинка не прыгала при переключении-->

                  <img :src="slotProps.item.path"
                       :alt="slotProps.item.path"
                       class="w-full 3xl:h-[50rem] lg:h-[32rem] md:h-[25rem] sx:h-[12.875rem] ss:h-[20rem] rounded-lg object-center object-cover bg-back-black-sections"/>
                </template>
              </Galleria>
            </div>
            <div class="text-description-text-color font-medium">
              <b class="dynamic-desc-font mb-4 block font-unbounded text-white font-light">{{
                  formCollectionCategory?.description?.title
                }}</b>
              <p class="dynamic-text-font mb-4">{{ formCollectionCategory?.description?.description }}</p>
              <p class="dynamic-text-font mb-10">Номера отеля отвечают всем стандартам сервиса гостиниц 4*</p>
              <div class="grid sx:grid-cols-1 sx:gap-4">
                <div
                    class="flex flex-col gap-2"
                    v-for="item in  formCollectionCategory?.description?.list">
                  <p class="dynamic-answertext-font text-description-text-color lowercase">{{
                      item.value
                    }}</p>
                  <p class="text-xl font-unbounded uppercase text-white">{{ item.name }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- mobile chess menu-->

    <TheMobileChessMenu
        v-model="visible"
        @closeChessMenu="visible = false"
        position="right"
    />
  </section>
</template>

<script setup>
import AppChessLeftSide from "../lots/AppChessLeftSide.vue";
import AppImgInfo from "../svg/mobile/AppImgInfo.vue";
import AppImgFieldSlider from "../svg/mobile/lots/AppImgFieldSlider.vue";
import {getItemSizes} from "~/composables/getItemSizes.js";
import {useStorkCategories} from "../../stores/useStorkCategories.js";
import {customFetch} from "../composables/fetch.js";
import room from "../../assets/image/incomeTab/lotCategories/room.jpg";

const {$eventBus} = useNuxtApp();

const router = useRouter();

const formCollectionCategory = reactive({
  description: '',
  images: [],
  isDescriptionLoaded: false
})

const isCategoriesLoaded = ref(false)

const isSubCategLoaded = ref(false)

const lotCategoriesBox = ref(null)

const route = useRoute()

const goals = ref(null);

const visible = ref(false)

const windowWidth = ref()

const currentNode = ref({})

const firstBlock = ref()

const keyActive = ref(0);

const activeTab = ref(null);

const changeBlock = (e) => {
  getChess(e.value.id)
}

const getCategory = (category) => {
  formCollectionCategory.isDescriptionLoaded = false
  customFetch('/categories', {
    method: 'GET',
    query: {id: category.id},
    onRequest() {
      isSubCategLoaded.value = false;
    },
    onResponse({request, response, options}) {
      if (response.status === 200) {
        isSubCategLoaded.value = true;
        useStorkCategories().setSubcategories(response._data);
      }
    }
  })
  loadInfoAboutCategory(category.id)
}

const loadInfoAboutCategory = async (id) => {
  await customFetch('/categories/info', {
    method: 'GET',
    query: {
      category_id: id
    },
    onResponse({request, response, options}) {
      if (response.status === 200) {
        formCollectionCategory.isDescriptionLoaded = true

        formCollectionCategory.description = response._data.data.description;
        formCollectionCategory.images = response._data.data.pictures;
        formCollectionCategory.title = response._data.data.name;
      }
    }
  });
}

const changeGoal = () => {
  getCategories();
}

const getCategories = () => {


  useStorkCategories().setCategories([])
  useStorkCategories().setSubcategories([])

  const q = {id: 0};

  if (goals.value !== null) {
    q.reason_id = toRaw(goals.value)
  }

  customFetch('/categories', {
    method: 'GET',
    query: q,
    onRequest() {
      isCategoriesLoaded.value = false
    },
    onResponse({request, response, options}) {
        if (response.status === 200) {
        useStorkCategories().setCategories(response._data);
        isCategoriesLoaded.value = true
        let mainindex = 0;

        let category = toRaw(useStorkCategories().getCategories.find((item, index) => {
          if (+item.id === +route.query.categoryMatch) {
            mainindex = index;
            return true;
          }

          return false;
        }))


        keyActive.value = mainindex;

        activeTab.value = useStorkCategories().getCategories[0]?.name || null;

        if (route.query.categoryMatch) {

          getCategory(category);
        } else {
          getCategory(toRaw(useStorkCategories().getCategories.find(() => true)));
        }
      }
    }
  })
}

const getTablets = () => {
  customFetch('/chess/tablet', {
    method: 'GET',
    onResponse({request, response, options}) {
      if (response.status === 200) {
        useStorkCategories().setBlocks(response._data.blocks);
        useStorkCategories().setStatuses(response._data.statuses);
        useStorkCategories().setTabletCategories(response._data.categories)
        useStorkCategories().setIsTabletsLoaded(true)
        firstBlock.value = useStorkCategories().getBlocks.find(() => true)
        getChess(firstBlock.value.id)
        goals.value = firstBlock.value
      }
    }
  })
}

$eventBus.$on('get_chess_category', (id) => {
  getChess(id)
})

const getChess = (id) => {
  useStorkCategories().setChess([])
  useStorkCategories().setIsChessLoaded(false)

  customFetch('/chess', {
    method: 'GET',
    query: {block_id: id},
    onResponse({request, response, options}) {
      if (response.status === 200) {
        useStorkCategories().setChess(response._data);
        useStorkCategories().setIsChessLoaded(true)
        $eventBus.$emit('node_select', id)
      }
    }
  })
}

onBeforeMount(() => {
  useStorkCategories().setSubcategories([]);
  useStorkCategories().setCategories([]);
  useStorkCategories().setChess([]);

  getCategories()
  getTablets()
})

onBeforeUnmount(() => {
  $eventBus.$off('get_chess_category')
})

const goalsList = ref([
  {id: 2, name: 'Пассивный доход'},
  {id: 1, name: 'Собственное проживание'},
  {id: 3, name: 'Ведение бизнеса'},
]);

onMounted(() => {
  const resizeObserver = getItemSizes(width => windowWidth.value = width)
  resizeObserver.observe(lotCategoriesBox.value);
})


// -----------------------


const handleTabChange = (tab) => {
    const categories = useStorkCategories().getCategories;
    activeTab.value = categories[tab.index].name;
}


</script>

<style>

</style>

