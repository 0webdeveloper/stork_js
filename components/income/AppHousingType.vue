<template>
  <div class="flex flex-col gap-3">
    <template v-if="!useStorkCategories().getIsTabletsLoaded">
      <div
          v-for="item in 8"
          class="flex gap-2.5">
        <Skeleton size="24px" class="shrink-0"/>
        <Skeleton height="24px"/>
      </div>
    </template>
    <template v-else>
      <div
          v-for="type in useStorkCategories().getTabletCategories"
          :key="type.id"
          class="flex items-center gap-2.5 sx:bg-black sx:rounded-lg sx:max-w-max sx:py-2.5 sx:px-4 md:bg-transparent md:rounded-none md:w-max md:p-0">
      <span
          class="house-type"
          :style="{backgroundColor: type.color}">{{ type.abbreviation }}</span>
        <p class="text-white text-sm">{{ type.name }}</p>
      </div>
    </template>

  </div>
</template>

<script setup>
import {useStorkCategories} from "../../stores/useStorkCategories.js";

</script>
