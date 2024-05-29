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
        <router-link to="/" class="logo-link">
          <div class="logo-container">
            <viki-logo-icon></viki-logo-icon>
            <div class="title red">Viki</div>
            <div class="title black">Pizza</div>
          </div>
        </router-link>
        <nav class="nav" :class="{ active: isNavActive }">
          <router-link :to="{ name: 'home', hash: '#actions' }" class="nav__link">Акції</router-link>
          <router-link :to="{ name: 'home', hash: '#menu' }" class="nav__link">Меню</router-link>
          <router-link :to="{ name: 'home', hash: '#delivery' }" class="nav__link">Доставка</router-link>
          <router-link :to="{ name: 'home', hash: '#contacts' }" class="nav__link">Контакти</router-link>
          <router-link :to="{ path: '/contacts', }" class="nav__link">Про нас</router-link>
        </nav>
        <router-link to="/card" href="/card" class="card-link">
          <transition name="slide-up">
            <card-button v-if="cardStore.volume === 0" class="card-button">Кошик</card-button>
            <card-button v-else class="card-button volume"><card-icon class="icon-cart"></card-icon> {{ cardStore.volume }} |
              {{ parseFloat(cardStore.total).toFixed(2) }} грн.
            </card-button>
          </transition>
        </router-link>
      </div>
    </main-container>
  </div>
</template>

<script setup>
import { onMounted, ref, watch, watchEffect } from 'vue';
import MainContainer from '@/components/Container/MainContainer.vue';
import VikiLogoIcon from '@/assets/icons/VikiLogoIcon.vue';
import CardButton from '@/components/Buttons/CardButton/CardButton.vue';
import { useCard } from '@/stores/CardStore.js';
import { useCookies } from 'vue3-cookies';
import CardIcon from '@/components/Card/CardProduct/icons/CardIcon.vue';
const { cookies } = useCookies();
const cardStore = useCard();
const totalCost = ref(cookies.get('totalCost') || 0);
onMounted(() => {
  const raw = cookies.get('cookie');
  if (!raw || cardStore.volume === undefined) {
    cardStore.setVolume(0);
  }

  cardStore.total = totalCost.value;
});
watch(totalCost, (newValue) => {
  cardStore.total = newValue;
});
watchEffect(() => {
  const raw = cookies.get('cookie');
  let jsonArray = [];

  if (raw) {
    jsonArray = JSON.parse(raw);
  }
  cardStore.volume = jsonArray.length;
});
const isNavActive = ref(false);

const toggleNav = () => {
  isNavActive.value = !isNavActive.value;
};

document.addEventListener('click', (event) => {
  const navToggle = document.getElementById('nav_toggle');
  const navMenu = document.querySelector('.nav');

  if (navToggle.contains(event.target) || navMenu.contains(event.target)) {
    return;
  }
  isNavActive.value = false;
});
</script>

<style lang="scss" src="./HeaderComponent.scss" scoped></style>
