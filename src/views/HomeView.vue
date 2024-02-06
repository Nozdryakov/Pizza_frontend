<template>
  <header-component></header-component>
  <intro-main></intro-main>
</template>

<script>
import HeaderComponent from '@/components/Header/HeaderComponent.vue';
import IntroMain from "@/components/Intro/IntroMain.vue";

export default {
  components: { IntroMain, HeaderComponent}
};
</script>

<style lang="scss" scoped></style>
