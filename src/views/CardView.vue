<template>
  <header-component></header-component>
  <card-product id="cart-div"></card-product>
  <order-contact></order-contact>
</template>


<script setup>
import { onMounted } from 'vue';
import HeaderComponent from "@/components/Header/HeaderComponent.vue";
import CardProduct from "@/components/Card/CardProduct/CardProduct.vue";
import OrderContact from "@/components/Card/OrderContact/OrderContact.vue";

onMounted(() => {
  const cartDiv = document.getElementById('cart-div');
  if (cartDiv) {
    cartDiv.scrollIntoView({ behavior: 'smooth' });
  }
});
</script>

<style lang="scss"></style>
