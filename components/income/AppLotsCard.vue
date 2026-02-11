<template>
  <div
      class="bg-white cursor-pointer p-5 rounded-lg relative">
    <div class="mb-5 custom-galleria">
      <Galleria
          v-if="card.category === undefined"
          :pt="{
        previousitembutton: {class: ['z-[5]']},
        nextitembutton: {class: ['z-[5]']},
          }"
          :value="card.pictures"
          :circular="true"
          :numVisible="1"
          :numScroll="1"
          :showItemNavigators="true"
          :showThumbnails="false">

        <template #item="slotProps">

          <div
              :class="imgProperty"
              class="relative w-full h-full rounded-xl overflow-hidden" >

            <img
                :src="slotProps.item.gallery"
                :alt="slotProps.item.id"
                class="w-full h-full object-center object-cover absolute top-0 left-0 rounded-lg"
            />
          </div>
        </template>
      </Galleria>
      <div v-else>

        <div
            :class="imgProperty"
            class="relative w-full h-full rounded-xl overflow-hidden">
          <img
              :src="card.pictures.find(()=>true).name === 'default_image.jpg' ? '/storage/static/default_image.jpg' : card.pictures.find(()=>true).path"
              :alt="card.pictures.find(()=>true).name"
              class="w-full h-full object-cover object-center absolute top-0 left-0 rounded-lg"
          />
        </div>
      </div>
    </div>

    <div class="flex items-start justify-between gap-4 flex-wrap">
      <div class="flex flex-col gap-2.5">
<!--        <span-->
<!--            class="bg-place-bg py-0.5 px-3 block text-white rounded self-start text-sm font-bold uppercase">{{-->
<!--            card.abbreviation || card.category.abbreviation-->
<!--          }}</span>-->

        <!-- <p class="font-unbounded text-2xl text-back-black-sections">{{ card.name || card.category.current_name }}</p> -->
        <p class="font-unbounded text-2xl text-back-black-sections">{{ formatTitle(card.name || card.category.current_name) }}</p>

<!--          <p class="font-unbounded text-2xl text-back-black-sections">{{ card.name === 'Келлер' ? 'Келлер' : 'Гостиничный номер' }}</p>-->
          <!-- <p class="font-unbounded text-2xl text-back-black-sections">{{ activeTab }}</p> -->
        <p class="text-sm font-semibold text-nearest-text">
          <template v-if="route.name !== 'lots-id' && route.name !== 'lots-item-itemId'">
            <template v-if="+card.min_area === +card.max_area">
              {{ card.min_area }}
            </template>
            <template v-else-if="card.area">
              {{ card.area }}
            </template>
            <template v-else>
              {{ card.min_area || card.area }} - {{ card.max_area }}
            </template>
          </template>
          <template v-else>
            {{ card.area }}
          </template>
          m²
        </p>
      </div>
      <div>
        <p class="font-bold text-back-black-sections">
          <template v-if="route.name !== 'lots-id' && route.name !== 'lots-item-itemId'">
            <template v-if="card.requestCurrentFloor">
              {{ card.requestCurrentFloor }}
            </template>
            <template v-else-if="+card.min_floor === +card.max_floor">
              {{ card.min_floor }}
            </template>
            <template v-else>
              {{ card.min_floor || card.floor }} - {{ card.max_floor }}
            </template>
          </template>
          <template v-else>
            {{ card.floor }}
          </template>
          этаж
        </p>
        <p v-for="block in (card.blocks || card.block)" class="text-sm text-nearest-text font-medium">блок {{
            block.name
          }}</p>
      </div>
    </div>
    <div @click="push" class="rounded-lg absolute top-0 left-0 h-full w-full">

    </div>
  </div>
</template>

<script setup>

const route = useRoute();

const router = useRouter();


onBeforeMount(() => {
  //console.log(route.name)
})

const push = () => {

  const payload = toRaw(props.path);


  if (payload.query === undefined) {
    payload.query = {};
  }

  if (props.card?.requestCurrentFloor !== undefined) {
    payload.query.floor = props.card.requestCurrentFloor;
  }

  if (props.isFacadeLoad !== false) {
    payload.query.facade = props.isFacadeLoad;
  }


  router.push(payload);


}

const props = defineProps({
  card: {
    type: Object,
    required: true,
  },
  imgProperty: {
    type: String,
    required: true
  },
  path: {
    type: Object,
    required: true
  },
  isFacadeLoad: {
    type: [Number, Boolean],
    required: false,
    default: false,
  },
    activeTab: {
      type: String,
    }
})


function formatTitle(text) {
  if (!text) return '';
  text = text.toLowerCase();
  return text.charAt(0).toUpperCase() + text.slice(1);
}


</script>