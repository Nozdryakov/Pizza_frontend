<template>
  <head-title id="actions">Акції</head-title>
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
            <img class="swiper-img" :src="`st-img/${stock.image_stock}`" />

          </div>
          <button class="btn-buy" @click="addToCart(stock)">
            <span>Купити</span>
          </button>
          {{stock.visible}}
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
import { useCard } from "@/stores/CardStore.js";
import { useCookies } from "vue3-cookies";

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
        name: stock.title,
        visible: stock.visible,
        stock_id: stock.stocks.stock_id,
        image_stock: stock.stocks.image,
        image: stock.image,
        price: parseFloat(stock.price).toFixed(2),
        discount: stock.stocks.discount,
        productId: stock.stocks.product_id,
        addedToCart: false
      }));
    } else {
      console.error('error');
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
const config = {
  current_default_config: {
    expireTimes: '4h',
    path: '; path=/',
    secure: false
  }
};

const expireTimes = config.current_default_config.expireTimes;
const cardStore = useCard();
const { cookies } = useCookies();
const addToCart = (stock) => {
  const existingProducts = cookies.get('cookie') ? JSON.parse(cookies.get('cookie')) : [];
  const existingProductIndex = existingProducts.findIndex((item) => item.name === stock.name);

  if (existingProductIndex !== -1) {
    existingProducts[existingProductIndex].count =
      (existingProducts[existingProductIndex].count || 1) + 1;
    existingProducts[existingProductIndex].addedToCart = true;
  } else {
    existingProducts.push({
      name: stock.name,
      price: stock.price,
      count: 1,
      image: stock.image,
      addedToCart: true
    });
  }
  stock.addedToCart = true;
  cookies.set('cookie', JSON.stringify(existingProducts), expireTimes);
  cardStore.products = existingProducts;
  cardStore.volume = existingProducts.length;

  const totalCost = existingProducts.reduce((total, item) => {
    return total + item.price * item.count;
  }, 0);
  cardStore.total = totalCost;
  cookies.set('totalCost', totalCost.toString());
};
</script>

<style lang="scss" scoped src="./StockSwiper.scss"></style>
