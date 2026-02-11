<template>
  <div class="md:block sx:hidden">
    <div v-if="!useStorkCategories().getIsTabletsLoaded" class="flex flex-col gap-1 justify-content-center">
      <Skeleton v-for="item in 3" height="40px"/>
    </div>
    <div v-else class="flex flex-col gap-1 justify-content-center">
      <button
          @click="getChessCategory(button.id)"
          :class="{'bg-back-black-sections': activeButton === button.id}"
          class="text-left px-3 py-2 font-semibold text-description-text-color hover:bg-back-black-sections rounded-lg group transition-all"
          v-for="button in useStorkCategories().getBlocks"
          :key="button.id"
      >
      <span
          :class="{'text-white': activeButton === button.id}"
          class="group-hover'text-white">Блок {{ button.name }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import {useStorkCategories} from "../../stores/useStorkCategories.js";

const {$eventBus} = useNuxtApp();

const activeButton = ref()

const getChessCategory = (id) => {
  activeButton.value = id
  $eventBus.$emit('get_chess_category', id)
}

watch(() => useStorkCategories().getBlocks, () => {
  activeButton.value = useStorkCategories().getFirstBlock.id
  $eventBus.$emit('node_select', activeButton.value)
})

</script>