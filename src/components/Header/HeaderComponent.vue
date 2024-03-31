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
          <a class="nav__link" href="#actions" @click="scrollToSection">Акции</a>
          <a class="nav__link" href="#menu" @click="scrollToSection">Меню</a>
          <a class="nav__link" href="#delivery" @click="scrollToSection">Доставка</a>
          <a class="nav__link" href="#contacts" @click="scrollToSection">Контакты</a>
          <a class="nav__link" href="#about" @click="scrollToSection">О нас</a>
        </nav>
        <div class="card-header-fon"></div>
        <router-link to="/card" class="card-link">
          <transition name="slide-up">
            <card-button v-if="cardStore.volume === 0" class="card-button">Корзина</card-button>
            <card-button v-else class="card-button volume"
              >Корзина {{ cardStore.volume }} | {{ parseFloat(cardStore.total).toFixed(2) }} грн.
            </card-button>
          </transition>
        </router-link>
      </div>
    </main-container>
  </div>
</template>

<script setup>
import { onMounted, ref, watch, watchEffect } from 'vue'
import MainContainer from '@/components/Container/MainContainer.vue'
import VikiLogoIcon from '@/assets/icons/VikiLogoIcon.vue'
import CardButton from '@/components/Buttons/CardButton/CardButton.vue'
import { useCard } from '@/stores/CardStore.js'
import { useCookies } from 'vue3-cookies'
const { cookies } = useCookies()
const cardStore = useCard()
const totalCost = ref(cookies.get('totalCost') || 0)
onMounted(() => {
  const raw = cookies.get('cookie')
  if (!raw || cardStore.volume === undefined) {
    cardStore.setVolume(0)
  }

  cardStore.total = totalCost.value
})
watch(totalCost, (newValue) => {
  cardStore.total = newValue
})
watchEffect(() => {
  const raw = cookies.get('cookie')
  let jsonArray = []

  if (raw) {
    jsonArray = JSON.parse(raw)
  }
  cardStore.volume = jsonArray.length
})
const isNavActive = ref(false)

const toggleNav = () => {
  isNavActive.value = !isNavActive.value
}
const scrollToSection = (event) => {
  event.preventDefault()

  const targetId = event.target.getAttribute('href')
  const targetElement = document.querySelector(targetId)
  if (targetElement) {
    const offsetTop = targetElement.offsetTop - 65
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    })
  }
  isNavActive.value = false
}
document.addEventListener('click', (event) => {
  const navToggle = document.getElementById('nav_toggle')
  const navMenu = document.querySelector('.nav')

  if (navToggle.contains(event.target) || navMenu.contains(event.target)) {
    return
  }
  isNavActive.value = false
})
</script>

<style lang="scss" src="./HeaderComponent.scss" scoped></style>
