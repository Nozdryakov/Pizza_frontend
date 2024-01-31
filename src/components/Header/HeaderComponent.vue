<template>
  <div class="header">
    <main-container>
      <div class="header__inner">
        <div class="logo-container">
          <viki-logo-icon></viki-logo-icon>
          <div class="title red">Viki</div>
          <div class="title black">Pizza</div>
        </div>
        <nav class="nav" id="nav">
          <a class="nav__link" href="#" data-scroll="#about">Акции</a>
          <a class="nav__link" href="#" data-scroll="#services">Меню</a>
          <a class="nav__link" href="#" data-scroll="#blog">Доставка</a>
          <a class="nav__link" href="#" data-scroll="#works">Контакты</a>
          <a class="nav__link" href="#" data-scroll="#footer">О нас</a>
        </nav>
        <card-button></card-button>
      </div>
    </main-container>
  </div>
  <div class="intro"></div>
</template>

<script>
import MainContainer from "@/components/Container/MainContainer.vue";
import VikiLogoIcon from "@/assets/icons/VikiLogoIcon.vue";
import CardButton from "@/components/Buttons/CardButton/CardButton.vue";

export default {
  components: { CardButton, VikiLogoIcon, MainContainer },
  setup() {


    return {};
  }
};
</script>

<style lang="scss" src="./HeaderComponent.scss" scoped></style>
