<template>
  <div class="header">
    <main-container>
      <div class="header__inner">
        <div class="container-toggle">
          <button
            class="nav-toggle"
            @click.stop="toggleNav"
            :class="{ active: isNavActive }"
            id="nav_toggle"
            type="button"
          >
            <span class="nav-toggle__item">Menu</span>
          </button>
        </div>
        <div class="logo-container">
          <viki-logo-icon></viki-logo-icon>
          <div class="title red">Viki</div>
          <div class="title black">Pizza</div>
        </div>
        <nav class="nav" :class="{ active: isNavActive }">
          <a class="nav__link" href="#">Акции</a>
          <a class="nav__link" href="#">Меню</a>
          <a class="nav__link" href="#">Доставка</a>
          <a class="nav__link" href="#">Контакты</a>
          <a class="nav__link" href="#">О нас</a>
        </nav>
        <div class="card-header-fon"></div>
        <card-button>Корзина</card-button>
      </div>
    </main-container>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import MainContainer from '@/components/Container/MainContainer.vue'
import VikiLogoIcon from '@/assets/icons/VikiLogoIcon.vue'
import CardButton from '@/components/Buttons/CardButton/CardButton.vue'

const isNavActive = ref(false)

const toggleNav = () => {
  isNavActive.value = !isNavActive.value
}
</script>

<style lang="scss" src="./HeaderComponent.scss" scoped></style>
