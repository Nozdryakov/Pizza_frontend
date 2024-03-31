<template>
  <head-title id="actions">Акции</head-title>
  <main-container> </main-container>
  <div class="wrapper-slider">
    <main-container>
      <swiper
        :slidesPerView="slidesPerView"
        :spaceBetween="30"
        :navigation="{
          nextEl: '.swiper-button-next-stock',
          prevEl: '.swiper-button-prev-stock'
        }"
        :modules="modules"
      >
        <swiper-slide><img class="swiper-img" src="@/assets/images/pizza-no.jpg" /></swiper-slide>
        <swiper-slide
          ><img class="swiper-img" src="@/assets/images/swiper-card-1.png"
        /></swiper-slide>
        <swiper-slide
          ><img class="swiper-img" src="@/assets/images/swiper-card-2.png"
        /></swiper-slide>
        <swiper-slide
          ><img class="swiper-img" src="@/assets/images/swiper-card-3.png"
        /></swiper-slide>
        <swiper-slide
          ><img class="swiper-img" src="@/assets/images/swiper-card-4.png"
        /></swiper-slide>
        <swiper-slide
          ><img class="swiper-img" src="@/assets/images/swiper-card-5.png"
        /></swiper-slide>
        <swiper-slide
          ><img class="swiper-img" src="@/assets/images/swiper-card-6.png"
        /></swiper-slide>
      </swiper>
      <arrow-prev-icon class="swiper-button-prev-stock"></arrow-prev-icon>
      <arrow-next-icon class="swiper-button-next-stock"></arrow-next-icon>
    </main-container>
  </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import ArrowPrevIcon from '@/components/Swiper/icons/ArrowPrevIcon.vue'
import ArrowNextIcon from '@/components/Swiper/icons/ArrowNextIcon.vue'
import MainContainer from '@/components/Container/MainContainer.vue'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import HeadTitle from '@/components/HeadTitle/HeadTitle.vue'

const screenWidth = ref(window.innerWidth)
const slidesPerView = ref(getSlidesPerView())

const modules = [Navigation]

function getSlidesPerView() {
  if (screenWidth.value <= 500) {
    return 1
  } else if (screenWidth.value <= 900) {
    return 2
  } else {
    return 3
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})

function handleResize() {
  screenWidth.value = window.innerWidth
}

watch(screenWidth, () => {
  slidesPerView.value = getSlidesPerView()
})
</script>

<style lang="scss" scoped src="./StockSwiper.scss"></style>
