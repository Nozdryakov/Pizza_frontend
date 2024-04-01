<template>
  <header-component></header-component>
  <card-product></card-product>
  <order-contact></order-contact>
</template>

<script>
import HeaderComponent from '@/components/Header/HeaderComponent.vue'
import CardProduct from '@/components/Card/CardProduct/CardProduct.vue'
import OrderContact from "@/components/Card/OrderContact/OrderContact.vue";

export default {
  components: { OrderContact, CardProduct, HeaderComponent }
}
</script>

<style lang="scss" scoped></style>
