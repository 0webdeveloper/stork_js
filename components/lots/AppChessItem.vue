<template>
  <NuxtLink
      :to="{name: 'lots-item-itemId', params: {itemId : lot.id}}"
      @mouseenter="$emit('toggle', lot, $event)"
      @mouseleave="$emit('hide')"
      class="p-2.5 w-28 h-16 bg-white rounded-lg grid grid-cols-2 gap-0.5"
      :style="{backgroundColor: setStatusColor}"
  >
    <div
        :style="{backgroundColor: lot?.sub_category?.abbreviation || lot?.category?.abbreviation ? lot?.category?.color : null}"
        class="house-type justify-self-start">{{ lot?.sub_category?.abbreviation || lot?.category?.abbreviation }}
    </div>
    <span
        class="text-sm text-white justify-self-end">{{ lot?.number_object }}</span>
    <p
        class="text-white col-span-2 text-left"
        :class="{'text-xs' : lot?.category?.name.length >= 10}"
    >{{ lot?.category?.name }}</p>
  </NuxtLink>
</template>

<script setup>


const {isMobile} = useDevice();

const props = defineProps({
  lot: {
    type: Object,
    required: true
  }
})

const setStatusColor = computed(() => {
  if (props.lot.status.name === 'свободно') {
    return props.lot.status.color + 50
  }
  if (props.lot.status.name === 'бронь') {
    return props.lot.status.color + 50
  }
  if (props.lot.status.name === 'продан') {
    return props.lot.status.color + 50
  }
})

</script>

