<template>
  <nav class="sx:flex lg:hidden h-[4.375rem] fixed w-full top-0 z-10 bg-white">
    <div class="container flex-between gap-1">
      <button
          @click="$emit('openMobileMenu')"
          class="p-2">
        <AppMobileBurgerMenu class="w-6 h-6 stroke-back-black-sections"/>
      </button>
      <NuxtLink
          to="/"
          :exact-active-class="'disabled'"
          :active-class="'disabled'">
        <AppImgLogo class="w-32 h-10"/>
      </NuxtLink>
      <div class="flex-default gap-1">
        <button
            @click="router.push('/contacts')"
            class=p-2>
          <AppImgMobileLocation class="w-6 h-6 stroke-back-black-sections"/>
        </button>
        <a
            href='tel:+74742516393'
            class="p-2">
          <AppImgMobilePhone class="w-6 h-6 stroke-back-black-sections"/>
        </a>
      </div>
    </div>
  </nav>
</template>
<script setup>
const router = useRouter()

</script>

<style scoped>

</style>
