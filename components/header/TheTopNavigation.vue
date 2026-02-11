<template>
  <header>
    <nav class="lg:flex sx:hidden bg-black/50 fixed w-full z-10 py-[1.2rem]">
      <div class="container flex-between gap-4">
        <div class="flex items-center gap-4">
          <div>
            <NuxtLink
                :active-class="'disabled'"
                :exact-active-class="'disabled'"
                to="/">
              <AppImgLogo class="w-32 h-10 sx:fill-black lg:fill-white"/>
            </NuxtLink>
          </div>
          <!--                    <div class="w-12">-->
          <!--                      <img-->
          <!--                          src="../../assets/image/urban.svg"-->
          <!--                          alt="Urban awards"-->
          <!--                          class="hover:scale-150 transition-all"-->
          <!--                      >-->
          <!--                    </div>-->
        </div>
        <ul class="flex text-white font-semibold flex-wrap">
          <li
              v-for="nav in useNav"
              :key="nav.id"
              class="group"
          >
            <NuxtLink
                :to="{path: nav.link, query: nav.query}"
                class="group-hover:text-white/70 px-5 py-3.5 transition-all inline-block">
              {{ nav.name }}
            </NuxtLink>
          </li>
        </ul>
        <button
            @click="openModal()"
            class="red-button font-semibold px-8 py-2.5 whitespace-nowrap">
          <span ref="buttonName">Узнать больше</span>
        </button>
      </div>
    </nav>

    <!--    mobile navigation-->
    <TheMobileNav
        @openMobileMenu="mobileVisible = true"
    />

    <!--    mobline menu-->
    <TheMobileMenu
        @closeMobileModal="mobileVisible = false"
        position="left"
        v-model="mobileVisible"
    />

    <!--    learn more modal-->

    <AppModalLearnMore
        :current-card="{}"
        position="center"
        :dispatchTitle="dispatchTitle"
        v-model="visible"/>

  </header>
</template>

<script setup>
import {useNavigation} from "../../stores/useNavigation.js";

const useNav = useNavigation().nav

const visible = ref(false);
const buttonName = ref(null);
const dispatchTitle = ref(null);

const openModal = () => {
  visible.value = !visible.value;
  dispatchTitle.value = buttonName.value.textContent;
}

const mobileVisible = ref(false)

</script>


