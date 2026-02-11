<template>
  <div class="overflow-auto pb-2 w-full ">
    <Skeleton
        height="20px"
        class="mb-2.5"
        v-if="!useStorkCategories().isChessLoaded"/>
    <div
        v-else
        class="flex justify-center p-2.5 mb-2.5 relative text-description-text-color font-bold">
      <p class="absolute left-0 top-1/2 -translate-y-1/2">Этаж:</p>
      <template v-for="block in useStorkCategories().getBlocks">
        <h4
            v-if="block.id === currentBlockId"
            class="pl-12">Блок {{ block.name }}</h4>
      </template>
    </div>
    <div class="flex flex-col gap-2.5">
      <template v-if="!useStorkCategories().isChessLoaded">
        <div
            class="flex items-center relative"
            v-for="item in 10">
          <Skeleton
              height="30px"
              width="50px"
              class="absolute shrink-0">
          </Skeleton>
          <div class="flex gap-2.5 pl-20">
            <Skeleton
                class="shrink-0"
                height="64px"
                width="116px"
                v-for="item in 11"/>
          </div>
        </div>
      </template>
      <template v-else>
        <div
            v-for="object in useStorkCategories().getChess"
            class="flex items-center relative">
                  <span
                      class="absolute text-white font-bold"
                      :class="{
                    'left-2' : object.floor < 0 || object.floor >= 10,
                    'left-4' : object.floor >= 0 && object.floor < 10
                  }">
                    {{ object.floor }}
                  </span>
          <div class="flex gap-2.5 pl-20">
            <div class="relative" v-for="lot in object.lots">
              <AppChessItem
                  @toggle="toggle"
                  @hide="hide"
                  :lot="lot"
              />
              <div class="absolute cursor-not-allowed h-full w-full top-0 left-0 rounded-lg"
                   v-if="lot.status.slug !== 'свободно'">
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
    <AppChessTooltip
        :current-lot="currentLot"/>
  </div>
</template>

<script setup>
import {useStorkCategories} from "../../stores/useStorkCategories.js";

const route = useRoute()

const {$eventBus} = useNuxtApp();

const currentBlockId = ref()

const tooltip = ref()

const currentLot = ref()

const toggle = (lot, event) => {
  if (window.innerWidth > 768) {
    currentLot.value = lot
    tooltip.value.toggle(event)
  }
}

const hide = () => {
  tooltip?.value.hide()
}

$eventBus.$on('node_select', (id) => {
  currentBlockId.value = id
})

$eventBus.$on('obj_tooltip', (objTooltip) => {
  tooltip.value = objTooltip
})

onBeforeUnmount(() => {
  $eventBus.$off('node_select')
  $eventBus.$off('obj_tooltip')
  $eventBus.$off('is_chess_loaded')
})

</script>