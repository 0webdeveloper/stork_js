<template>
  <OverlayPanel
      :pt="{
    root: {class: ['p-0 rounded-lg bg-back-black-sections']}
      }"
      ref="objTooltip">
    <div class="p-0 min-w-[170px]">
      <div class="flex flex-col gap-1 mb-1">
        <div
            :style="{backgroundColor: currentLot?.sub_category?.abbreviation
            || currentLot?.category?.abbreviation
            ? currentLot?.category?.color
            : null}"
            class="house-type justify-self-start">
          {{ currentLot?.sub_category?.abbreviation || currentLot?.category?.abbreviation }}
        </div>
        <p
            class="text-white font-unbounded uppercase text-xl"
        >{{ currentLot?.category?.name }}</p>
      </div>
      <div class="flex flex-col gap-2.5 font-semibold text-white">
        <p>{{ currentLot.area.toFixed(2) }} м<sup>2</sup></p>
        <p>{{ currentLot.floor }} этаж</p>
        <template v-for="block in currentLot.blocks">
          <p>блок {{ block.name }}</p>
        </template>
      </div>
    </div>
  </OverlayPanel>
</template>

<script setup>
const props = defineProps({
  currentLot: {
    required: true
  }
})

const {$eventBus} = useNuxtApp();

const objTooltip = ref()

onMounted(() => {
  $eventBus.$emit('obj_tooltip', objTooltip.value)
})

</script>

<style scoped>

</style>