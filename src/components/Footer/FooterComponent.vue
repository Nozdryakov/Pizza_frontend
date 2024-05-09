<template>
  <div class="footer">
    <main-container>
      <div class="footer__inner">
        <div class="el">
          <div class="logo-container">
            <viki-logo-icon></viki-logo-icon>
            <div class="title red">Viki</div>
            <div class="title black">Pizza</div>
          </div>
          <nav class="nav">
            <a class="nav__link" href="#actions" @click="scrollToSection">Акции</a>
            <a class="nav__link" href="#menu" @click="scrollToSection">Меню</a>
            <a class="nav__link" href="#delivery" @click="scrollToSection">Доставка</a>
            <a class="nav__link" href="#contacts" @click="scrollToSection">Контакты</a>
            <a class="nav__link" href="#about" @click="scrollToSection">О нас</a>
          </nav>
          <div class="phone">
            +3803047076
            <p class="label">(номер телефона)</p>
          </div>
        </div>
        <div class="social">
          <div class="el">
            <div class="text none"></div>
            <div class="text"></div>
            <div class="text store__spacing">Доступно в</div>
          </div>
          <div class="el">
            <div class="text none"></div>
            <div class="text icons__spacing">
              <a class="link__social" href="#"><twitter-icon></twitter-icon></a>
              <a class="link__social" href="#"><vk-icon></vk-icon></a>
              <a class="link__social" href="#"><facebook-icon></facebook-icon></a>
            </div>
            <div class="text store__spacing">
              <a class="link__social" href="#"><app-stote-icon></app-stote-icon></a>
              <a class="link__social" href="#"><play-market-icon></play-market-icon></a>
            </div>
          </div>
        </div>
      </div>
    </main-container>
  </div>
</template>

<script setup>
import MainContainer from '@/components/Container/MainContainer.vue';
import VikiLogoIcon from '@/assets/icons/VikiLogoIcon.vue';
import TwitterIcon from '@/components/Footer/icons/TwitterIcon.vue';
import VkIcon from '@/components/Footer/icons/VkIcon.vue';
import FacebookIcon from '@/components/Footer/icons/FacebookIcon.vue';
import AppStoteIcon from '@/components/Footer/icons/AppStoteIcon.vue';
import PlayMarketIcon from '@/components/Footer/icons/PlayMarketIcon.vue';
const scrollToSection = (event) => {
  event.preventDefault();

  const targetId = event.target.getAttribute('href');
  const targetElement = document.querySelector(targetId);
  if (targetElement) {
    const offsetTop = targetElement.offsetTop - 65;
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });
  }
};
</script>

<style lang="scss" src="./FooterComponent.scss" scoped></style>
