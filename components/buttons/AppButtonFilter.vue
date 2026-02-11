<template>
  <button
      @click="$emit('openFilter')"
      class="btnTransparent group/filter px-3 py-2 stroke-#637381">
    <AppImgFilter class="w-6 h-6 group-hover/filter:stroke-#4F46E5"></AppImgFilter>
  </button>
</template>