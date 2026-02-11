<template>
  <div class="bg-back-black-sections">
    <Title>{{ getItem?.category?.current_name }} №{{ getItem?.number_object }}</Title>
    <div class="container">
      <section
          id="element-to-print"
          class="w-full md:pt-44 sx:pt-32 md:pb-24 sx:pb:16">

        <!--        breadcrumbs-->

        <div
            class="mb-8"
            v-if="!isLotsLoaded">
          <Skeleton/>
        </div>
        <div
            v-else
            class="card flex justify-content-center mb-8 whitespace-nowrap">
          <!--          <span class="text-white">{{items}}</span>-->
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
                  :to="{
                    name:item?.name,
                    params:item?.params,
                    query:item?.query,
                  }">
                {{ item.label }}
              </NuxtLink>
            </template>
          </Breadcrumb>
        </div>
        <div v-if="!isLotsLoaded">
          <Skeleton height="60px" class="max-w-[500px] w-full sx:mb-8 md:mb-16"/>
          <div
              class="flex lg:flex-row sx:flex-col-reverse md:gap-x-16 lg:gap-x-36 sx:gap-y-7 2xl:gap-y-0 justify-start text-white">
            <div class="flex flex-col justify-between gap-10 w-full">
              <div class="grid  sx:grid-cols-1 ss:grid-cols-2 sx:gap-5 md:gap-7 w-full">
                <Skeleton v-for="item in 8" height="40px" width="100%"/>
              </div>
              <div class="flex gap-4">
                <Skeleton size="50px"/>
                <Skeleton height="50px" width="100%"/>
              </div>
            </div>
            <div class="sx:mb-8 md:mb-0 w-full h-full">
              <Skeleton class="w-full p-[35%]"/>
            </div>
          </div>
        </div>
        <div v-else>
          <h1 class="title text-white sx:mb-8 md:mb-16">{{ getItem?.category?.current_name }} №{{
              getItem?.number_object
            }}</h1>
          <div
              class="flex 2xl:flex-row sx:flex-col-reverse md:gap-x-16 sx:gap-y-7 2xl:gap-y-0  lg:gap-x-6 justify-between text-white">
            <div class="flex flex-col justify-between gap-10 shrink-0 basis-1/2">
              <div class="grid sx:grid-cols-1 ss:grid-cols-2 sx:gap-5 md:gap-7">
                <div>
                  <span class="mb-2 dynamic-answertext-font text-description-text-color">площадь</span>
                  <p class="dynamic-options-font font-unbounded uppercase">{{ getItem.area.toFixed(2) }} м<sup>2</sup>
                  </p>
                </div>
                <!--                <div>-->
                <!--                  <span class="mb-2 dynamic-answertext-font text-description-text-color">доходность</span>-->
                <!--                  <p class="dynamic-options-font font-unbounded uppercase">-->
                <!--                    {{ getItem.profitability ? getItem.profitability : 0 }}%</p>-->
                <!--                </div>-->
                <div>
                  <span class="mb-2 dynamic-answertext-font text-description-text-color">этаж</span>
                  <p class="dynamic-options-font font-unbounded uppercase">{{ getItem.floor }}</p>
                </div>
                <div>
                  <span class="mb-2 dynamic-answertext-font text-description-text-color">блок</span>
                  <template v-for="block in getItem.block">
                    <p class="dynamic-options-font font-unbounded uppercase">{{ block.name }}</p>
                  </template>
                </div>
                <div>
                  <span class="mb-2 dynamic-answertext-font text-description-text-color">отделка</span>
                  <p class="dynamic-options-font font-unbounded uppercase">{{ getItem?.category?.current_name === "Номер С Доходностью" ? "под ключ" : getItem.decoration.name}}</p>
                </div>
                <div>
                  <span class="mb-2 dynamic-answertext-font text-description-text-color">Категория помещения</span>
                  <p
                      class="dynamic-options-font font-unbounded uppercase">{{ getItem?.category?.parent_name }}</p>
                </div>
                <div>
                  <span class="mb-2 dynamic-answertext-font text-description-text-color">Статус</span>
                  <p class="dynamic-options-font font-unbounded uppercase">{{ getItem.status.name }}</p>
                </div>
              </div>
              <div class="flex gap-4" v-if="getItem.status.slug === 'свободно'">
                <div class="relative">
                  <button
                      @click="showShareDrop = !showShareDrop"
                      class="p-2 border rounded-md transition-all group hover:bg-red-button">
                    <AppImgShare class="w-8 h-8 stroke-white fill-transparent"/>
                  </button>

                  <!--                  share-->

                  <transition name="page">
                    <AppDropShare
                        v-model="showShareDrop"
                        @closeDrop="showShareDrop = false"
                        v-show="showShareDrop"
                        class="absolute md:-top-[8rem] left-0 sx:-top-[200%]"/>
                  </transition>

                  <!--                  =====-->

                </div>
                <button
                    @click="openModal()"
                    class="red-button sx:w-full md:max-w-[410px]  py-3 px-2">Инвестировать
                </button>
              </div>
            </div>
            <!--            <div class="custom-galleria sx:mb-8 md:mb-0">-->
            <!--              <Galleria-->
            <!--                  :value="getItem.pictures"-->
            <!--                  autoPlay-->
            <!--                  :circular="true"-->
            <!--                  :numVisible="1"-->
            <!--                  :numScroll="1"-->
            <!--                  :showItemNavigators="true"-->
            <!--                  :showThumbnails="false">-->
            <!--                <template #item="slotProps">-->
            <!--                  <img-->
            <!--                      :src="slotProps.item.path"-->
            <!--                      :alt="slotProps.item.path"-->
            <!--                      class="w-full max-h-[32rem] object-center object-cover bg-back-black-sections rounded-lg"/>-->
            <!--                </template>-->
            <!--              </Galleria>-->
            <!--            </div>-->
            <div>
              <template v-for="item in getItem.pictures">
                <img
                    :src="item.path"
                    class="w-full max-h-[32rem] object-center object-cover bg-back-black-sections rounded-lg"
                    alt="">
              </template>
            </div>
          </div>
        </div>
        <div>
        </div>
      </section>
      <!--      <section class="sx:hidden md:block py-24">-->
      <!--        <h2 class="title text-white">Вас может заинтересовать</h2>-->
      <!--      </section>-->
<!--      <section class="sx:py-16 md:py-24">-->
<!--        <div class="sx:pt-16 md:pt-24">-->
<!--          <h2 class="title text-white sx:mb-10 md:mb-16">-->
<!--            Типы отделок-->
<!--          </h2>-->
<!--          <div class="flex sx:flex-col lg:flex-row sx:gap-5 md:gap-7 items-start">-->
<!--            <div class="custom-galleria basis-2/3 shrink-0 w-full">-->
<!--              <Galleria-->
<!--                  :value="rooms"-->
<!--                  :circular="true"-->
<!--                  :numVisible="1"-->
<!--                  :numScroll="1"-->
<!--                  :showItemNavigators="true"-->
<!--                  :showThumbnails="false">-->
<!--                <template #item="slotProps">-->

<!--                  &lt;!&ndash;                Жесткая ширина, чтобы картинка не прыгала при переключении&ndash;&gt;-->

<!--                  <img :src="slotProps.item"-->
<!--                       :alt="slotProps.item"-->
<!--                       class="w-full 3xl:h-[50rem] lg:h-[32rem] md:h-[25rem]   sx:h-[12.875rem] ss:h-[20rem] rounded-lg object-center object-cover bg-back-black-sections"/>-->
<!--                </template>-->
<!--              </Galleria>-->
<!--            </div>-->
<!--            <p class="text-description-text-color text-lg font-medium">-->
<!--              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, autem doloremque error, et illo-->
<!--              iusto minus molestiae officiis quo reiciendis, tenetur vel? Assumenda blanditiis commodi consequuntur-->
<!--              deserunt dicta, dolor eaque, enim ex ipsam iste maxime nihil obcaecati pariatur quaerat quis suscipit,-->
<!--              tempore. Aspernatur est, impedit magni non rerum sunt unde voluptate voluptatibus? Autem consectetur-->
<!--              dolorum esse fuga ipsum molestiae molestias numquam quia quod quos, sed similique sint vero voluptatibus-->
<!--              voluptatum? Accusamus accusantium alias aperiam assumenda atque aut blanditiis consequuntur cum cumque-->
<!--              dolore doloremque explicabo hic impedit in ipsa nam neque officia, porro quae quasi quo repellendus-->
<!--              similique sit voluptatem, voluptates!</p>-->
<!--          </div>-->
<!--        </div>-->
<!--      </section>-->

      <div class="sx:py-16 md:py-14" v-if="associateLots.length > 0">
        <h2 class="title text-white sx:mb-10 md:mb-16">
          Вам могут подойти
        </h2>
        <div class="categories-net">
          <AppLotsCard
              v-for="lot in associateLots"
              class="lots-card"
              img-property="pt-[80%]"
              :card="lot"
              :path="{
              name:'lots-item-itemId',
              params:{
              itemId:lot.id,
              }
          }"/>
        </div>
      </div>
    </div>

    <AppModalLearnMore
        :current-card="getItem"
        :dispatchTitle=dispatchTitle
        :dispatchId=getItem.id
        v-model="visible"/>

  </div>
</template>

<script setup>
import {useStorkCategories} from "../../../stores/useStorkCategories.js";
import firstFinishImg from '../../../assets/image/finishing/firstFinishImg.jpg'
import secondFinishImg from '../../../assets/image/finishing/secondFinishImg.jpg'
import thirdFinishImg from '../../../assets/image/finishing/thirdFinishImg.jpg'
import fourthFinishImg from '../../../assets/image/finishing/fourthFinishImg.jpg'

const rooms = ref([firstFinishImg, secondFinishImg, thirdFinishImg, fourthFinishImg])

const route = useRoute()

const visible = ref(false)

const showShareDrop = ref(false)

const getItem = ref({})

const items = ref([]);

const isLotsLoaded = ref()

const breadCrumbs = ref()

const finishingType = ref()

const whiteBoxType = ref()

const fullFinishingType = ref()

const associateLots = ref([])

const home = ref({
  label: 'Категории лотов',
  name: 'lots'
});


const getLots = (id) => {
  isLotsLoaded.value = false
  customFetch('/lots/', {
    method: 'GET',
    query: {id: id},
    onResponse({request, response, options}) {
      if (response.status === 200) {
        isLotsLoaded.value = true
        getItem.value = response._data.data.find(() => true);

        setBreadcrumbs(response._data.data)
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
        whiteBoxType.value = finishingType.value[0].name
        fullFinishingType.value = finishingType.value[1].name
      }
    }
  })
}


const setBreadcrumbs = (data) => {
  data.forEach(item => {
    const firstCrumb = item.breadcrumbs[0];
    const secondCrumb = item.breadcrumbs[1];
    breadCrumbs.value = {
      first: firstCrumb,
      second: secondCrumb,
    };
    if (secondCrumb) {
      items.value.push(
          {label: breadCrumbs.value.first.name, name: 'lots', query: {categoryMatch: breadCrumbs.value.first.id}},
          {label: breadCrumbs.value.second.name, name: 'lots-id', params: {id: breadCrumbs.value.second.id}})
    } else {
      items.value.push(
          {label: breadCrumbs.value.first.name, name: 'lots', query: {categoryMatch: breadCrumbs.value.first.id}}
      );
    }

    items.value.push(
        {
          label: '№' + toRaw(getItem.value.number_object)
        }
    )

  });
};


const getAssociateLots = () => {
  customFetch('/lots/associate', {
    method: 'GET',
    query: {
      id: toRaw(route.params.itemId)
    },
    onResponse({request, response, options}) {
      if (response.status === 200) {
        associateLots.value = response._data.data;
      }
    }
  })
}


onBeforeMount(() => {
  useStorkCategories().setLots([])
  getAssociateLots();
  getLots(route.params.itemId)
  getDecorations()
})

const dispatchTitle = ref(null);
const openModal = () => {
  visible.value = !visible.value;
  dispatchTitle.value = `${getItem.value?.category?.current_name} ${getItem.value?.number_object}`;
}

</script>

<style scoped>

</style>
