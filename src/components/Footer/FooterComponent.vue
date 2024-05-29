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
          <nav class="nav" :class="{ active: isNavActive }">
            <router-link :to="{ name: 'home', hash: '#actions' }" class="nav__link">Акції</router-link>
            <router-link :to="{ name: 'home', hash: '#menu' }" class="nav__link">Меню</router-link>
            <router-link :to="{ name: 'home', hash: '#delivery' }" class="nav__link">Доставка</router-link>
            <router-link :to="{ name: 'home', hash: '#contacts' }" class="nav__link">Контакти</router-link>
            <router-link :to="{ path: '/contacts', }" class="nav__link">Про нас</router-link>
          </nav>
          <div class="phone">
            +3803047076
            <p class="label">(номер телефону)</p>
          </div>
        </div>
        <div class="social">
          <div class="el">
            <div class="text none"></div>
            <div class="text"></div>
            <div class="text store__spacing">Ми є у:</div>
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

</script>

<style lang="scss" src="./FooterComponent.scss" scoped></style>
