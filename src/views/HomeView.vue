<template>
  <header-component></header-component>
  <intro-main></intro-main>
  <stock-swiper></stock-swiper>
</template>

<script>
import HeaderComponent from '@/components/Header/HeaderComponent.vue';
import IntroMain from "@/components/Intro/IntroMain.vue";
import StockSwiper from "@/components/StocksSwiper/StockSwiper.vue";

export default {
  components: { StockSwiper, IntroMain, HeaderComponent}
};
</script>

<style lang="scss" scoped></style>
