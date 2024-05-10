<template>
  <header-component></header-component>
  <card-product></card-product>
  <order-contact></order-contact>
  <footer-component></footer-component>
</template>

<script setup>
import HeaderComponent from '@/components/Header/HeaderComponent.vue';
import CardProduct from '@/components/Card/CardProduct/CardProduct.vue';
import OrderContact from '@/components/Card/OrderContact/OrderContact.vue';
import FooterComponent from '@/components/Footer/FooterComponent.vue';
import { onMounted } from "vue";

window.scrollTo({
  top: 0,
});
onMounted(() => {
  document.title = 'Корзина';
});
</script>

<style lang="scss"></style>
