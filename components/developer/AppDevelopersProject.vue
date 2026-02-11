<template>
  <section
      ref="devProjectBox"
      class="sx:py-16 md:py-24">
    <div class="container">
      <h2 class="title text-white sx:mb-5 md:mb-16 sx:text-left md:text-center">
        <img
            class="sx:hidden md:inline rounded-full max-w-[13.875rem]"
            :width="windowWidth/8"
            src="~/assets/image/developerTab/developersProject/developers-project.jpeg"
            alt="Infrastructure."> Проекты <br>
        Застройщика
      </h2>
      <p class="sx:block md:hidden text-description-text-color mb-10">Ведущий застройщик на рынке недвижимости в Липецке
        и
        области</p>
      <div class="grid sx:grid-cols-1 md:grid-cols-2 md:gap-16 sx:gap-10 mb-20">
        <div class="w-full md:h-auto md:col-start-1 md:row-start-1 dev-img overflow-hidden">
          <img class="md:mb-6 sx:mb-5 object-center object-cover rounded-lg sx:h-[25rem] md:h-max sx:w-full"
               src="~/assets/image/developerTab/developersProject/aist-tower.jpeg"
               alt="Aist tower."
          >
          <p class="text-white font-unbounded text-3xl">Аист тауэр</p>
        </div>
        <div class="w-full md:h-auto md:row-start-2 md:col-start-2 dev-img overflow-hidden">
          <img
              class="md:mb-6 sx:mb-5 object-center object-cover rounded-lg sx:h-[25rem] md:h-max sx:w-full"
              src="~/assets/image/developerTab/developersProject/inter.jpeg"
              alt="Inter."
          >
          <p class="text-white font-unbounded text-3xl">Интер</p>
        </div>
        <div class="w-full md:h-auto md:col-start-1 md:row-start-3 dev-img overflow-hidden">
          <img
              class="md:mb-6 sx:mb-5 object-center object-cover rounded-lg sx:h-[25rem] md:h-max sx:w-full"
              src="~/assets/image/developerTab/developersProject/parus.jpeg" alt="Parus."/>
          <p class="text-white font-unbounded text-3xl">Парус</p>
        </div>
        <div class="w-full md:h-auto md:col-start-2 md:row-start-4 dev-img overflow-hidden">
          <img
              class="md:mb-6 sx:mb-5 object-center object-cover rounded-lg sx:h-[25rem] md:h-max sx:w-full"
              src="~/assets/image/developerTab/developersProject/azbuka.jpeg" alt="Azbuka."/>
          <p class="text-white font-unbounded text-3xl">Азбука</p>
        </div>
      </div>
      <div class="w-full mt-4 h-[450px] md:[500px] rounded-md overflow-hidden">
        <LMap
            :options="{attributionControl: false}"
            ref="mapRef"
            :zoom="zoom"
            :center="coordinates[0].coordinate"
            class="z-[5]"
        >
          <LTileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              layer-type="base"
              name="OpenStreetMap"
              :attribution="'&amp;copy; Ained Digital '+ new Date().getFullYear() +'. Все права защищены.'"
          />
          <LMarker
              v-for="(item, index) in coordinates"
              :key="index"
              :lat-lng="item.coordinate"
          >
            <LIcon :options="iconOptions"/>
            <LPopup class="bg-black h-full w-full"
                    :options="{closeButton: false, visible:true, maxWidth:'250px'}">
              <div class="p-1">
                <h2 class="text-white font-unbounded text-xl uppercase">{{item.title}}</h2>
              </div>
            </LPopup>
          </LMarker>
          <l-control-attribution position="bottomright" prefix="">
          </l-control-attribution>
        </LMap>
      </div>
    </div>
  </section>
</template>

<script setup>
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {getItemSizes} from "../../composables/getItemSizes.js";
import Contacts4 from '~/assets/image/Contacts4.svg'
import {coordinates} from "../../developers project/devsProjects.js";


gsap.registerPlugin(ScrollTrigger)

const windowWidth = ref()

const devProjectBox = ref(null)

const zoom = ref(8);

const iconOptions = ref({
  iconUrl: Contacts4,
  iconSize: [32, 32],
});

onMounted(() => {

  const resizeObserver = getItemSizes(width => windowWidth.value = width)
  resizeObserver.observe(devProjectBox.value);

  const images = document.querySelectorAll(".dev-img");

  if (ScrollTrigger.isTouch !== 1) {
    images.forEach(img => {
      gsap.from(img, {
        y: 50,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: img,
          start: "top 80%", // Измените это значение в зависимости от вашего макета
          scrub: 0.5
        },
      });
    });
  }
})


</script>