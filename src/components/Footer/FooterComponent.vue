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
            <a class="nav__link" href="#">Акции</a>
            <a class="nav__link" href="#">Меню</a>
            <a class="nav__link" href="#">Доставка</a>
            <a class="nav__link" href="#">Контакты</a>
            <a class="nav__link" href="#">О нас</a>
          </nav>
          <div class="phone">+3803047076<p class="label">(номер телефона)</p></div>
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

import MainContainer from "@/components/Container/MainContainer.vue";
import VikiLogoIcon from "@/assets/icons/VikiLogoIcon.vue";
import TwitterIcon from "@/components/Footer/icons/TwitterIcon.vue";
import VkIcon from "@/components/Footer/icons/VkIcon.vue";
import FacebookIcon from "@/components/Footer/icons/FacebookIcon.vue";
import AppStoteIcon from "@/components/Footer/icons/AppStoteIcon.vue";
import PlayMarketIcon from "@/components/Footer/icons/PlayMarketIcon.vue";
</script>

<style lang="scss" src="./FooterComponent.scss" scoped>

</style>
