<template>
  <nav class="fixed bottom-0 left-0 right-0 bg-black w-full pt-2.5 pb-5 z-10 md:hidden">
    <ul class="text-description-text-color flex justify-between text-[10px] font-medium ">
      <template v-for="item in bottomMenu">
        <li v-if="item.icon"
            class="max-[320px]:px-2  px-4"
            :class="{'max-[374px]:hidden '  : item.name === 'Вопросы'}"
        >
          <NuxtLink
              :exact-active-class="'active_link'"
              :active-class="'active_link'"
              :to="item.link"
              class="flex flex-col items-center gap-1"
          >
            <div class="p-2">
              <Component
                  class="w-6 h-6"
                  :class="item.style.icon"
                  :is="item.icon"/>
            </div>
            <span>{{ item.name }}</span>
          </NuxtLink>
        </li>
      </template>
    </ul>
  </nav>
</template>

<script setup>
import {useNavigation} from "../../stores/useNavigation.js";
import AppImgRuble from "../svg/mobile/bottomMenu/AppImgRuble.vue";
import AppImgJudge from "../svg/mobile/bottomMenu/AppImgJudge.vue";

const bottomMenu = useNavigation().nav
</script>

<style scoped>

.active_link div {
  @apply bg-red-button rounded-lg
  }


li:nth-child(2) .active_link svg, li:nth-child(3) .active_link svg {
  @apply fill-white
  }

li:nth-child(2) svg, li:nth-child(3) svg {
  @apply fill-description-text-color
  }

li:not(:nth-child(2), :nth-child(3)) .active_link svg {
  @apply stroke-white
  }

.active_link span {
  @apply text-white
  }

</style>