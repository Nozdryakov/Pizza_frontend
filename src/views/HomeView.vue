<template>
  <header-component></header-component>
  <intro-main></intro-main>
  <background>
    <stock-swiper></stock-swiper>
    <often-buy-swiper></often-buy-swiper>
  </background>
  <menu-tab></menu-tab>

</template>

<script>
import HeaderComponent from '@/components/Header/HeaderComponent.vue';
import IntroMain from "@/components/Intro/IntroMain.vue";
import StockSwiper from "@/components/Swiper/Stocks/StockSwiper.vue";
import OftenBuySwiper from "@/components/Swiper/OftenBuy/OftenBuySwiper.vue";
import Background from "@/components/Swiper/BackgroundSwiper/Background.vue";
import MenuTab from "@/components/MenuTab/MenuTab.vue";

export default {
  components: { MenuTab, Background, OftenBuySwiper, StockSwiper, IntroMain, HeaderComponent}
};
</script>

<style lang="scss" scoped></style>
