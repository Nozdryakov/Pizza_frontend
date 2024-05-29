<template>
  <main-container>
    <h1>Часто замовляють</h1>
  </main-container>
  <div class="wrapper-slider">
    <main-container>
      <swiper
        :slidesPerView="slidesPerView"
        :spaceBetween="30"
        :navigation="{
          nextEl: '.swiper-button-next-often-buy',
          prevEl: '.swiper-button-prev-often-buy'
        }"
        :modules="modules"
      >
        <swiper-slide><img class="swiper-img" src="@/assets/images/often-1.png" /></swiper-slide>
        <swiper-slide><img class="swiper-img" src="@/assets/images/often-2.png" /></swiper-slide>
        <swiper-slide><img class="swiper-img" src="@/assets/images/often-3.png" /></swiper-slide>
        <swiper-slide><img class="swiper-img" src="@/assets/images/often-4.png" /></swiper-slide>
        <swiper-slide><img class="swiper-img" src="@/assets/images/often-5.png" /></swiper-slide>
        <swiper-slide><img class="swiper-img" src="@/assets/images/often-6.png" /></swiper-slide>
      </swiper>
      <arrow-prev-icon class="swiper-button-prev-often-buy"></arrow-prev-icon>
      <arrow-next-icon class="swiper-button-next-often-buy"></arrow-next-icon>
    </main-container>
  </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import ArrowPrevIcon from '@/components/Swiper/icons/ArrowPrevIcon.vue';
import ArrowNextIcon from '@/components/Swiper/icons/ArrowNextIcon.vue';
import MainContainer from '@/components/Container/MainContainer.vue';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const screenWidth = ref(window.innerWidth);
const slidesPerView = ref(getSlidesPerView());

function getSlidesPerView() {
  if (screenWidth.value <= 500) {
    return 1;
  } else if (screenWidth.value <= 900) {
    return 2;
  } else {
    return 3;
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});

function handleResize() {
  screenWidth.value = window.innerWidth;
}

const modules = [Navigation];
watch(screenWidth, () => {
  slidesPerView.value = getSlidesPerView();
});
</script>

<style lang="scss" scoped src="./OftenBuySwiper.scss"></style>
