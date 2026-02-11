<template>
  <div class="flex items-center gap-3">
    <div class="flex relative">
      <span class="py-1 px-3 block border rounded-md bg-white">1</span>
      <AppImgVectorIcon
          class="w-2.5 h-2.5 stroke-[#4F46E5] absolute animate-vector sx:hidden md:block"></AppImgVectorIcon>
      <AppImgTapOnButton class="w-6 h-6 absolute top-1/2 left-1/2 sx:block md:hidden"/>
      <AppImgTapRing class="w-4 h-6 absolute top-1/2 left-[62%] animate-blink sx:block md:hidden"/>
    </div>
    <p class="max-w-[11rem] sx:hidden md:block text-white text-sm font-medium">Наведите и кликните на ячейку</p>
    <p class="max-w-[11rem] sx:block md:hidden text-sm font-medium text-white">Нажмите на ячейку</p>
  </div>
</template>