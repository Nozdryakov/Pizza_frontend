<template>
  <div class="page">
    <header-component></header-component>
    <intro-main></intro-main>
    <background>
      <stock-swiper></stock-swiper>
      <often-buy-swiper></often-buy-swiper>
    </background>
    <menu-tab></menu-tab>
    <shipping-payment></shipping-payment>
    <map-info></map-info>
    <footer-component></footer-component>
  </div>
</template>

<script setup>
import HeaderComponent from '@/components/Header/HeaderComponent.vue'
import IntroMain from '@/components/Intro/IntroMain.vue'
import StockSwiper from '@/components/Swiper/Stocks/StockSwiper.vue'
import OftenBuySwiper from '@/components/Swiper/OftenBuy/OftenBuySwiper.vue'
import Background from '@/components/Swiper/BackgroundSwiper/Background.vue'
import MenuTab from '@/components/MenuTab/MenuTab.vue'
import ShippingPayment from '@/components/ShippingPayment/ShippingPayment.vue'
import MapInfo from '@/components/MapInfo/MapInfo.vue'
import FooterComponent from '@/components/Footer/FooterComponent.vue'
</script>
<style lang="scss" scoped></style>
