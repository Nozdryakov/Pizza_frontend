<template>
  <main-container>
    <div class="header-admin">
      <h1 class="title-admin">Адмін панель</h1>
      <router-link to="/orders" class="subtitle-admin">Замовлення</router-link>
<!--      <router-link class="subtitle-admin">Статистика</router-link>-->
      <div class="logout" @click="logout">Вийти з адмін-панелі</div>
    </div>
    <crud-stock></crud-stock>
    <crud-product></crud-product>
  </main-container>
</template>

<script setup>

import MainContainer from "@/components/Container/MainContainer.vue";
import CrudProduct from "@/components/Admin/CrudProduct/CrudProduct.vue";
import CrudStock from "@/components/Admin/CrudStock/CrudStock.vue";
import router from "@/router/index.js";
const logout = () => {
  localStorage.setItem('accessToken', '');
  router.push('/login');
};
</script>

<style lang="scss" src="./AdminElement.scss" scoped></style>
