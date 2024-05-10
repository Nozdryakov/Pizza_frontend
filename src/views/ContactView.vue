<template>
  <div class="page">
    <header-component></header-component>
    <contact-intro></contact-intro>
  </div>
</template>

<script setup>
import HeaderComponent from '@/components/Header/HeaderComponent.vue';
import ContactIntro from '@/components/Contact/ContactIntro.vue';
import { onMounted } from "vue";

onMounted(() => {
  document.title = 'О нас';
});
</script>

<style lang="scss" scoped></style>
