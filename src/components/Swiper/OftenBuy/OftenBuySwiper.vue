<template>
  <main-container>
    <h1>Часто замовляють</h1>
  </main-container>
  <div class="wrapper-slider">
    <main-container>
      <swiper
        :slidesPerView="slidesPerView"
        :spaceBetween="30"
        class="mySwiper"
        :navigation="{
          nextEl: '.swiper-button-next-often-buy',
          prevEl: '.swiper-button-prev-often-buy'
        }"
        :modules="modules"
      >
        <swiper-slide v-for="popular in data.list" :key="popular.product_id" class="swiper-slide">
          <div class="swiper-slide-container">
            <img class="swiper-img" :src="`pop-img/${popular.popular_image}`" />
          </div>
          <card-button v-if="popular.addedToCart" class="added-btn">
            <span>У кошику</span>
          </card-button>
          <button v-else class="btn-buy" @click="addToCart(popular)">
            <span>Купити</span>
          </button>
        </swiper-slide>
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
import CardButton from "@/components/Buttons/CardButton/CardButton.vue";
import axios from "axios";
import { useCookies } from "vue3-cookies";
import { useCard } from "@/stores/CardStore.js";

const screenWidth = ref(window.innerWidth);
const slidesPerView = ref(getSlidesPerView());
const data = ref({
  list: []
});
function getSlidesPerView() {
  if (screenWidth.value <= 500) {
    return 1;
  } else if (screenWidth.value <= 900) {
    return 2;
  } else {
    return 3;
  }
}
const fetchPopulars = async () => {
  try {
    const response = await axios.get('/get-populars', {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      mode: 'cors'
    });

    if (response.data.populars) {
      data.value.list = response.data.populars.map(popular => ({
        product_id: popular.product_id,
        name: popular.title,
        price: parseFloat(popular.price).toFixed(2),
        num_of_orders: popular.num_of_orders,
        popular_image: popular.popular_image,
        product_image: popular.product_image,
        addedToCart: false
      }));

      const existingProducts = cookies.get('cookie') ? JSON.parse(cookies.get('cookie')) : [];
      console.log(existingProducts);
      data.value.list.forEach((product) => {
        const existingProduct = existingProducts.find((item) => item.name === product.name);
        if (existingProduct) {
          product.addedToCart = true;
        }
      });
    } else {
      console.error('Error: No populars found');
    }
  } catch (error) {
    console.error('Failed to fetch populars:', error);
  }
};
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

const addToCart = (popular) => {
  const existingProducts = cookies.get('cookie') ? JSON.parse(cookies.get('cookie')) : [];
  const existingProductIndex = existingProducts.findIndex((item) => item.name === popular.name);

  if (existingProductIndex !== -1) {
    existingProducts[existingProductIndex].count =
      (existingProducts[existingProductIndex].count || 1) + 1;
    existingProducts[existingProductIndex].addedToCart = true;
  } else {
    existingProducts.push({
      name: popular.name,
      price: popular.price,
      count: 1,
      image: popular.product_image,
      addedToCart: true
    });
  }
  popular.addedToCart = true;
  cookies.set('cookie', JSON.stringify(existingProducts), expireTimes);
  cardStore.products = existingProducts;
  cardStore.volume = existingProducts.length;

  const totalCost = existingProducts.reduce((total, item) => {
    return total + item.price * item.count;
  }, 0);
  cardStore.total = totalCost;
  cookies.set('totalCost', totalCost.toString());
};

onMounted(() => {
  fetchPopulars();
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
