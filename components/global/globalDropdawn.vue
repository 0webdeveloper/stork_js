<template>
  <div>
    <div class="w-[15.2rem] h-auto bg-white rounded shadow-md border absolute z-10 dropDawn"
         id="drop-box"
    >
      <div class="fixed top-0 left-0 bottom-0 right-0 -z-10" @click.stop="$emit('closeDrop')"></div>
      <slot/>
    </div>
  </div>
</template>

<script setup>

defineProps({
  dropDawnPosition: {
    type: [String, Object],
    required: false,
  }
})

</script>