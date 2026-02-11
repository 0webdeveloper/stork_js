<template>
  <div>
    <div
        v-if="!useStorkCategories().getIsTabletsLoaded"
        class="flex flex-col gap-3">
      <Skeleton v-for="item in 3" height="28px"/>
    </div>
    <div
        class="flex flex-col gap-3"
        v-else>
    <span
        :class="{'border border-[#F5F5F5]': status.name === 'Свободна'}"
        class="py-1 px-2.5 w-max rounded text-white text-sm"
        :style="{backgroundColor: status.color + 90}"
        v-for="status in useStorkCategories().getStatuses"
        :key="status.id">
{{ status.name }}
    </span>
    </div>
  </div>
</template>

<script setup>
import {useStorkCategories} from "../../stores/useStorkCategories.js";

</script>