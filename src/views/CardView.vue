<template>
  <header-component></header-component>
  <card-product></card-product>
</template>

<script>
import HeaderComponent from '@/components/Header/HeaderComponent.vue'
import CardProduct from '@/components/Card/CardProduct/CardProduct.vue'

export default {
  components: { CardProduct, HeaderComponent }
}
</script>

<style lang="scss" scoped></style>
