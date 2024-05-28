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
        <swiper-slide v-for="stock in stocks" :key="stock.stock_id" class="swiper-slide">
          <div class="swiper-slide-container">
            <img class="swiper-img" :src="`st-img/${stock.image}`" />
          </div>
          <button class="btn-buy">
            <span>Выбрать</span>
          </button>
        </swiper-slide>
      </swiper>
      <arrow-prev-icon class="swiper-button-prev-stock"></arrow-prev-icon>
      <arrow-next-icon class="swiper-button-next-stock"></arrow-next-icon>
    </main-container>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import axios from 'axios';
import ArrowPrevIcon from '@/components/Swiper/icons/ArrowPrevIcon.vue';
import ArrowNextIcon from '@/components/Swiper/icons/ArrowNextIcon.vue';
import MainContainer from '@/components/Container/MainContainer.vue';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import HeadTitle from '@/components/HeadTitle/HeadTitle.vue';

const screenWidth = ref(window.innerWidth);
const slidesPerView = ref(getSlidesPerView());

const modules = [Navigation];
const stocks = ref([]);

function getSlidesPerView() {
  if (screenWidth.value <= 500) {
    return 1;
  } else if (screenWidth.value <= 900) {
    return 2;
  } else {
    return 3;
  }
}

const fetchStocks = async () => {
  try {
    const response = await axios.get('/get-stocks', {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      mode: 'cors'
    });

    if (response.data.stocks) {
      stocks.value = response.data.stocks.map(stock => ({
        stock_id: stock.stocks.stock_id,
        image: stock.stocks.image,
        discount: stock.stocks.discount,
        productId: stock.stocks.product_id
      }));
    } else {
      console.error('Response data does not contain "stocks" property');
    }
  } catch (error) {
    console.error('Failed to fetch stocks:', error);
  }
};


onMounted(() => {
  fetchStocks();
  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});

function handleResize() {
  screenWidth.value = window.innerWidth;
}

watch(screenWidth, () => {
  slidesPerView.value = getSlidesPerView();
});
</script>

<style lang="scss" scoped src="./StockSwiper.scss"></style>
