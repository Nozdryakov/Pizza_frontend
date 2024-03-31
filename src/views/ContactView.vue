<template>
  <div class="page">
    <header-component></header-component>
    <contact-intro></contact-intro>
  </div>
</template>

<script>
import HeaderComponent from '@/components/Header/HeaderComponent.vue'
import ContactIntro from '@/components/Contact/ContactIntro.vue'

export default {
  components: { ContactIntro, HeaderComponent }
}
</script>

<style lang="scss" scoped></style>
