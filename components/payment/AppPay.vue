<template>
  <section class="bg-back-black-sections sx:pt-32 md:pt-44 md:pb-24 sx:pb-16 grow">
    <div class="container">
      <h1 class="title text-white md:mb-16 sx:mb-10">Варианты покупки</h1>
      <div class="custom-tabview-extra sx:mb-5 md:mb-12">
        <TabView
            @tabChange="tabChange"
            :activeIndex="usePaymentStore().getActiveIndex"
            :pt="{
      navContainer: {class: ['md:mb-16 sx:mb-10']},
      navContent: {class: ['rounded-full bg-black']},
      nav: {class: ['border-none bg-black py-1 px-0 gap-1 text-lg font-bold']},
      panelcontainer: {class: ['p-0']}
          }"
        >
          <TabPanel
              v-for="event in eventsInfo"
              :key="event.id"
              :pt="{
        header: {class: ['w-full px-1']},
        headerAction: {class: ['tab-header-style']}
      }">
            <template #header>
              <button class="px-4 py-2 whitespace-nowrap">
                {{ event.title }}
              </button>
            </template>
            <component :is="event.component"/>
          </TabPanel>
        </TabView>
      </div>
      <button class="red-button py-2.5 px-8 mb-16" @click="openDialog()">Оставить заявку</button>
      <template v-if="currentTabIndex === 1">
        <h4 class="dynamic-cardtext-font text-white font-unbounded mb-6">Банки партнеры</h4>
        <div class="grid md:grid-cols-5 sm:grid-cols-4 ss:grid-cols-3  sx:grid-cols-2 gap-4">
          <img src="../../assets/image/banks/sber.png" alt="sber">
          <img src="../../assets/image/banks/vtb.png" alt="vtb">
          <img src="../../assets/image/banks/RF.png" alt="RF">
          <img src="../../assets/image/banks/rosbank.png" alt="rosbank">
          <img src="../../assets/image/banks/otkritie.png" alt="otkritie">
          <img src="../../assets/image/banks/rosselxozbank.png" alt="rosselxozbank">
          <img src="../../assets/image/banks/alfaBank.png" alt="alfaBank">
          <img src="../../assets/image/banks/uralsib.png" alt="uralsib">
          <img src="../../assets/image/banks/promsvyazbank.png" alt="promsvyazbank">
          <img src="../../assets/image/banks/gazprombank.png" alt="gazprombank">
        </div>
      </template>
    </div>
    <div>
    </div>
  </section>

  <AppModalLearnMore
      v-model="visible"
      :dispatchId=dispatchId
      :dispatchTitle=dispatchTitle
  />

</template>

<script setup>
import {usePaymentStore} from "../../stores/usePaymentStore.js";
import AppFullPayment from "./AppFullPayment.vue";
import AppMortgage from "./AppMortgage.vue";
import AppInstallmentPlan from "./AppInstallmentPlan.vue";

const currentTabIndex = ref()

const eventsInfo = ref([
  {id: 1, title: '100% оплата', component: shallowRef(AppFullPayment)},
  //{id: 2, title: 'Ипотека', component: shallowRef(AppMortgage)},
  {id: 3, title: 'Рассрочка', component: shallowRef(AppInstallmentPlan)},
])

const route = useRoute();
const dispatchTitle = ref(eventsInfo.value[0].title);
const dispatchId = ref(eventsInfo.value[0].id);

onMounted(() => {
  hookMetaPage();
})

const hookMetaPage = () => {
  if (route.query.state !== undefined || route.query.state !== null) {
    usePaymentStore().setActiveIndex(route.query.state);
  }
}

const tabChange = ev => {
  currentTabIndex.value = ev.index
  dispatchTitle.value = eventsInfo.value[ev.index].title;
  dispatchId.value = eventsInfo.value[ev.index].id;
  history.replaceState({}, null, window.location.origin + window.location.pathname + '?state=' + ev.index)
}

const visible = ref(false);

const openDialog = () => {
  visible.value = !visible.value;
}

</script>

<style scoped>

</style>