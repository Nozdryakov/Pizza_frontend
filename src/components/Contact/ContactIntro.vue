<template>
  <div class="intro">
    <main-container>
      <div class="intro__inner">
        <div class="intro__item">
          <div class="head-title">Про нас</div>
          <div class="title">
            <p class="title__text">Viki</p>
            <p>Pizza</p>
          </div>
          <div class="subtitle">
            <p class="subtitle__text">
              Viki Pizza - піцерія м. Києва, яка відкрилася зовсім недавно і вже радує своїх
              покупців вишуканими смаками та швидкою доставкою, Для нас Viki Pizza - щоранку прокидатися і з цікавістю
              прокидатися і з цікавістю продовжувати роботу.
            </p>
            <p class="subtitle__text">
              Для нас Viki Pizza - це та справа, яка надихає нас, змушує щоранку прокидатися і з цікавістю продовжувати роботу.
            </p>
            <p class="subtitle__text">Наша місія - розширювати межі можливого!</p>
          </div>
          <div class="block__button">
            <router-link :to="{ name: 'home', hash: '#menu' }">
              <card-button class="btn">Меню</card-button>
            </router-link>
            <router-link :to="{ path: '/' }">
              <card-button class="white">Головна</card-button>
            </router-link>

          </div>
        </div>
        <div class="intro__item">
          <div class="item__element">
            <div class="title-block">Найкращі інгредієнти</div>
            <div class="subtitle-block">
              <p>Наші піци складаються з найкращих</p>
              <p>відбірних інгредієнтів</p>
            </div>
          </div>
          <div class="item__element">
            <div class="title-block">Найкращі майстри</div>
            <div class="subtitle-block">
              <p>Готуються найкращими</p>
              <p>майстрами своєї справи</p>
            </div>
          </div>
          <div class="item__element">
            <div class="title-block">Швидка доставка</div>
            <div class="subtitle-block">
              <p>Доставимо піцу швидко</p>
              <p>за 45 хвилин</p>
            </div>
          </div>
        </div>
      </div>
    </main-container>
  </div>
</template>

<script setup>
import MainContainer from '@/components/Container/MainContainer.vue';
import CardButton from '@/components/Buttons/CardButton/CardButton.vue';
</script>

<style lang="scss" src="./ContactIntro.scss" scoped></style>
