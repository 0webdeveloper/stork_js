<template>
  <button @click="$emit('search')" class="red-button px-4 py-2 group stroke-white font-medium">
    <AppImgSearch class="w-6 h-6 group-hover:stroke-red-button"/>
    <span class="leading-[14px]">Найти</span>
  </button>
</template>