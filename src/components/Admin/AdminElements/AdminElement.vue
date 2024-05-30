<template>
  <main-container>
    <h1 class="title-admin">Адмін панель</h1>
    <crud-stock></crud-stock>
    <crud-product></crud-product>
  </main-container>
</template>

<script setup>

import MainContainer from "@/components/Container/MainContainer.vue";
import CrudProduct from "@/components/Admin/CrudProduct/CrudProduct.vue";
import CrudStock from "@/components/Admin/CrudStock/CrudStock.vue";
</script>

<style lang="scss" src="./AdminElement.scss" scoped></style>
