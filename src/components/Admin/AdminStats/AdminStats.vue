<template>
  <main-container>
    <div class="header-admin">
      <h1 class="title-admin">Адмін панель</h1>
      <h2 class="subtitle-admin">Статистика</h2>
      <div class="logout" @click="logout">Вийти з адмін-панелі</div>
    </div>
    <img src="@/assets/images/stats.jpg" class="stats-img">
    <br>
    <img src="@/assets/images/stats2.jpg" class="stats-img">
  </main-container>
</template>

<script setup>

import MainContainer from "@/components/Container/MainContainer.vue";
import router from "@/router/index.js";
const logout = () => {
  localStorage.setItem('accessToken', '');
  router.push('/login');
};
</script>

<style lang="scss" src="./AdminStats.scss" scoped></style>
