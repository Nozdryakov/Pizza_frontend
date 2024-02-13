<template>
  <div class="wrapper-slider">
    <main-container>
      <h1>Акции</h1>
      <swiper
        :slidesPerView="3"
        :spaceBetween="40"
        :navigation="{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }"
        :modules="modules">
        <swiper-slide><img class="swiper-img" src="@/assets/images/swiper-card-1.png"></swiper-slide>
        <swiper-slide><img class="swiper-img" src="@/assets/images/swiper-card-2.png"></swiper-slide>
        <swiper-slide><img class="swiper-img" src="@/assets/images/swiper-card-3.png"></swiper-slide>
        <swiper-slide><img class="swiper-img" src="@/assets/images/swiper-card-4.png"></swiper-slide>
        <swiper-slide><img class="swiper-img" src="@/assets/images/swiper-card-5.png"></swiper-slide>
        <swiper-slide><img class="swiper-img" src="@/assets/images/swiper-card-6.png"></swiper-slide>
<!--        <swiper-slide>Slide 2</swiper-slide><swiper-slide>Slide 3</swiper-slide>-->
<!--        <swiper-slide>Slide 4</swiper-slide><swiper-slide>Slide 5</swiper-slide>-->
<!--        <swiper-slide>Slide 6</swiper-slide><swiper-slide>Slide 7</swiper-slide>-->
<!--        <swiper-slide>Slide 8</swiper-slide><swiper-slide>Slide 9</swiper-slide>-->
      </swiper>
    </main-container>
    <arrow-prev-icon class="swiper-button-prev"></arrow-prev-icon>
    <arrow-next-icon class="swiper-button-next"></arrow-next-icon>
  </div>
</template>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';

import 'swiper/css/navigation';

import './StockSwiper.scss';

// import required modules
import { Navigation } from 'swiper/modules';
import MainContainer from "@/components/Container/MainContainer.vue";
import ArrowPrevIcon from "@/components/StocksSwiper/icons/ArrowPrevIcon.vue";
import ArrowNextIcon from "@/components/StocksSwiper/icons/ArrowNextIcon.vue";

export default {
  components: {
    ArrowNextIcon,
    ArrowPrevIcon,
    MainContainer,
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [Navigation],
    };
  },
};
</script>
