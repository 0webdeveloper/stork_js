<template>
  <section
      ref="incomeIntroBox"
      class="bg-back-black-sections w-full md:pt-44 sx:pt-32 sx:pb-0 md:pb-24">
    <Title>{{ formCollectionCategory.title }}</Title>
    <div class="container">

      <!--      breadcrumbs-->

      <div
          class="mb-8"
          v-if="!isLotsLoaded">
        <Skeleton/>
      </div>
      <div
          v-else
          class="card flex justify-content-center mb-8 whitespace-nowrap">
        <Breadcrumb
            :pt="{
          root: {class: ['p-0 bg-transparent border-none text-nearest-text font-medium']}
            }"
            :home="home"
            :model="items">
          <template #item="{ item, props }">
            <NuxtLink
                class="transition-all"
                :class="{'hover:text-white' : item.name}"
                :exact-active-class="'bg-transparent'"
                :active-class="'bg-transparent'"
                :to="{name:item.name,query:item.query}">
              {{ item.label }}
            </NuxtLink>
          </template>
        </Breadcrumb>
      </div>

      <!--      desktop-->
      <p class="text-white">
      </p>
      <div class="sx:hidden lg:block">

        <AppFilter
            @clearFilter="resetFilter"
            @search="search"
            v-model:blocks-options="blocksOptions"
            v-model:apartment="selectedApartment"
            v-model:finishing="selectedFinishing"
            v-model:floor="selectedFloor"
            v-model:selected-block="selectedBlock"
            v-model:square-from="selectedSquareFrom"
            v-model:square-to="selectedSquareTo"
            v-model:apartment-type="apartmentType"
            :finishing-type="finishingType"
        />
      </div>

      <!--      mobile-->

      <div class="sx:flex lg:hidden justify-between items-center mb-8">
        <Dropdown
            @change="switchCategory"
            :pt="{root: {class: ['dynamic-carddesc-font']}}"
            v-model="selectedApartment"
            :options="apartmentType"
            optionLabel="name"
            placeholder="Выберите категорию"
            class="max-w-max rounded-full bg-black border-none py-2.5 px-4 custom-dropdown font-inter"/>
        <button
            @click="visible = true"
            class="p-1.5 bg-white rounded">
          <AppImgFilter class="w-6 h-6 stroke-red-button"/>
        </button>
      </div>
      <div class="md:hidden sx:flex gap-5 justify-between mb-8">
        <div>
          <span class="text-xs text-description-text-color">размер номеров</span>
          <Skeleton height="25px" v-if="!isLotsLoaded"/>
          <p v-else class="text-white text-xl uppercase font-unbounded">до <span>{{ maxArea }}</span> м<sup>2</sup></p>
        </div>
        <div class="text-right">
          <span class="text-xs text-description-text-color">количество номеров</span>
          <Skeleton height="25px" v-if="!isLotsLoaded"/>
          <p v-else class="text-white text-xl uppercase font-unbounded">{{ totalLots }}</p>
        </div>
      </div>

      <!--      ====================-->

      <div
          v-if="!isLotsLoaded"
          class="categories-net">
        <Skeleton v-for="item in 8" class="pt-[100%] lots-card"/>
      </div>
      <div
          v-else
          class="sx:flex md:grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 sx:gap-5 md:gap-7 sx:overflow-x-auto md:overflow-y-auto  md:pr-2 sx:pb-2 md:pb-0 md:mb-6 w-full sx:snap-x md:snap-none snap-mandatory">
        <AppLotsCard
            class="sx:w-[85%] sx:min-h-[24.125rem] md:w-full md:min-h-max shrink-0 snap-center"
            img-property="pt-[80%]"
            :path="{name: 'lots-item-itemId', params: {itemId : card.id}}"
            v-for="card in useStorkCategories().getLots"
            :card="card"
        />
        <p v-if="!useStorkCategories().getLots.length" class="font-unbounded text-white text-3xl">Нет результатов</p>
      </div>
      <Paginator
          @page="switchPage"
          :pt="{
            root: {class: ['bg-transparent']},
            previouspagebutton: {class: ['text-white hover:text-black']},
            nextpagebutton: {class: ['text-white hover:text-black']},
            firstpagebutton: {class: ['text-white hover:text-black']},
            lastpagebutton: {class: ['text-white hover:text-black']},
            current: {class: ['text-white']},
          }"
          :template="{
              '640px': 'PrevPageLink CurrentPageReport NextPageLink',
              '960px': 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
              '1300px': 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
              default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink'
          }"
          :rows="perPage"
          currentPageReportTemplate="{first} из {last}"
          :totalRecords="totalLots"
      >
      </Paginator>
    </div>

    <!--    mobile filter-->

    <TheMobileFilter
        @sendFilter="search"
        @clearFilter="resetFilter"
        @closeMobileMenu="visible = false"
        v-model:apartment="selectedApartment"
        v-model:finishing="selectedFinishing"
        v-model:visible="visible"
        v-model:floor="selectedFloor"
        v-model:selected-block="selectedBlock"
        v-model:blocks-options="blocksOptions"
        v-model:square-from="selectedSquareFrom"
        v-model:square-to="selectedSquareTo"
        :apartment-type="apartmentType"
        :finishing-type="finishingType"
        position="right"
    />
  </section>
</template>

<script setup>
import {useFilterStore} from "~/stores/useFilterStore.js";
import {useStorkCategories} from "../../stores/useStorkCategories.js";
import {customFetch} from "../composables/fetch.js";
import room from "assets/image/incomeTab/lotCategories/room.jpg";

const route = useRoute()

const router = useRouter()

const visible = ref(false)

const filterStore = useFilterStore();

const windowWidth = ref()

const incomeIntroBox = ref(null)

const isLotsLoaded = ref(false)

const maxArea = ref()

const totalLots = ref()

const perPage = ref()

const selectedFloor = ref()

const selectedApartment = ref()

const selectedFinishing = ref()

const selectedSquareFrom = ref()

const selectedSquareTo = ref()

const finishingType = ref()

const apartmentType = ref()

const selectedApart = ref()

const query = ref({})

const blocksOptions = ref([]);


const selectedBlock = ref(0);

const switchPage = (data) => {
  getLots(route.params.id, data.page)
}

const formCollectionCategory = reactive({
  title: '',
  maxArea: 0,
  totalLots: 0,
})


const switchCategory = (e) => {
  router.push({
    name: 'lots-id',
    params: {
      id: e.value.id
    }
  })
}

// breadcrumbs

const home = ref({
  label: 'Категории лотов',
  name: 'lots'
});
const items = ref([]);

const currentCategoryName = ref()


const getLots = async (id, currentPage) => {
  isLotsLoaded.value = false
  await customFetch('/lots/', {
    method: 'GET',
    query: {
      category_id: id,
      page: currentPage,
      ...query.value
    },
    onResponse({request, response, options}) {
      if (response.status === 200) {
        isLotsLoaded.value = true
        useStorkCategories().setLots(response._data.data);
        response._data.data.forEach(item => {
          currentCategoryName.value = item.breadcrumbs[0].name
        })
        // useStorkCategories().getLots.forEach(item => {
        //   maxArea.value = item.area.toFixed(2)
        //
        // })
        totalLots.value = response._data.meta.total
        perPage.value = response._data.meta.per_page
      }
    }
  })
}

const getDecorations = () => {
  customFetch('/decorations', {
    method: 'GET',
    onResponse({request, response, options}) {
      if (response.status === 200) {
        finishingType.value = response._data
      }
    }
  })
}

const getAssociate = async (id) => {
  await customFetch('/categories/associate', {
    method: 'GET',
    query: {id: id},
    onResponse({request, response, options}) {
      if (response.status === 200) {
        apartmentType.value = response._data.data
        apartmentType.value.forEach(item => {
          if (+item.id === +route.params.id) {
            selectedApartment.value = item
          }
        })
      }
    }
  })
}

const resetFilter = () => {
  query.value = {}
  filterStore.setFilter('', '', '', '', null);
  filterStore.setFilterCount(0);
  selectedSquareFrom.value = '';
  selectedSquareTo.value = '';
  selectedFloor.value = '';
  selectedFinishing.value = {}
  getLots(route.params.id)
  visible.value = false
}

const checkEmptyInputs = () => {
  if (selectedFloor.value) query.value['floor'] = selectedFloor.value;
  if (selectedSquareTo.value > 0 || selectedSquareFrom.value > 0) query.value['area'] = `${selectedSquareFrom.value}-${selectedSquareTo.value}`;
  if (selectedFinishing.value) query.value['decoration_id'] = `${selectedFinishing.value.id}`;
  if (!selectedSquareTo.value || undefined) selectedSquareTo.value = String(maxArea.value)
  if (!selectedSquareFrom.value) selectedSquareFrom.value = String(0)

  if (selectedBlock.value) {
    query.value.block_id = toRaw(selectedBlock.value);
  }
}

const search = () => {
  query.value = {}

  checkEmptyInputs()

  filterStore.setFilter(
      selectedSquareFrom.value ? String(selectedSquareFrom.value) : '',
      selectedSquareTo.value ? String(selectedSquareTo.value) : '',
      selectedFloor.value ? selectedFloor.value : '',
      selectedFinishing.value ? selectedFinishing.value : {},
      selectedBlock.value ? selectedBlock.value : null,
  )

  getLots(route.params.id, null)

  visible.value = false
}

const loadInfoAboutCategory = async () => {
  await customFetch('/categories/info', {
    method: 'GET',
    query: {
      category_id: toRaw(route.params.id)
    },
    onResponse({request, response, options}) {
      if (response.status === 200) {
        blocksOptions.value = response._data.data.blocks_collection;
        formCollectionCategory.title = response._data.data.name;
        formCollectionCategory.totalLots = response._data.data.count_items;
        formCollectionCategory.maxArea = response._data.data.max_area;

        maxArea.value = toRaw(formCollectionCategory.maxArea);
        filterStore.setMaxArea(toRaw(maxArea.value))


        items.value.push({
          name: 'lots',
          query: {
            categoryMatch: toRaw(response._data.data.id)
          },
          label: toRaw(response._data.data.name)
        })

        //console.log(selectedApartment.value);

        if (selectedApartment.value.parent_id !== null) {
          items.value.push({
            name: 'lots-id',
            label: selectedApartment.value.name,
            params: {
              id: selectedApartment.value.id
            }
          })
        }

      }
    }
  });
}

onMounted(async () => {
  getDecorations()
  const resizeObserver = getItemSizes(width => windowWidth.value = width)
  resizeObserver.observe(incomeIntroBox.value);
})

onBeforeMount(async () => {

  if (route.query.floor) {
    selectedFloor.value = +route.query.floor;
    query.value.floor = toRaw(selectedFloor.value)
  }

  if (route.query.facade) {
    selectedBlock.value = +route.query.facade;
    query.value.block_id = +route.query.facade;
  }

  useStorkCategories().setLots([])
  await getAssociate(route.params.id)
  await loadInfoAboutCategory();
  await getLots(route.params.id, 1)
})

</script>

<style scoped>

</style>