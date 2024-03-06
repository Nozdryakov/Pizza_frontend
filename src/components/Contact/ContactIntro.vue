<template>
  <div class="intro">
    <main-container>
      <div class="intro__inner">
        <div class="intro__item">
          <div class="head-title">О нас</div>
          <div class="title">
            <p class="title__text">Vikki</p>
            <p class="title__text">Pizza</p>
          </div>
          <div class="subtitle">
            <p class="subtitle__text">Viki Pizza — пиццерия г. Минска, которая открылась совсем недавно и уже радует своих покупателей изысканными вкусами и быстрой доставкой, Для нас Viki Pizza — каждое утро просыпаться и с интересом продолжать работу.</p>
            <p class="subtitle__text">Для нас Viki Pizza —  это то дело, которое вдохновляет нас, заставляет каждое утро просыпаться и с интересом продолжать работу.</p>
            <p class="subtitle__text">Наша миссия - расширять границы возможного!</p>
          </div>
          <div class="block__button">
            <card-button>Меню</card-button>
            <card-button>Главная</card-button>
          </div>
        </div>
        <div class="intro__item">
          <div class="item__element">
            <div class="title-block">Лучшие ингридиенты</div>
            <div class="subtitle-block">
              <p>Наши пиццы состоят из лучших</p>
              <p>отборных ингредиентов</p>
            </div>
          </div>
          <div class="item__element">
            <div class="title-block">Лучшие мастера</div>
            <div class="subtitle-block">
              <p>Готовятся лучшими</p>
              <p>мастерами своего дела</p>
            </div>
          </div>
          <div class="item__element">
            <div class="title-block">Быстрая доставка</div>
            <div class="subtitle-block">
              <p>Доставим пиццу быстро</p>
              <p>за 45 минут</p>
            </div>
          </div>
        </div>
      </div>
    </main-container>

  </div>
</template>

<script setup>

import MainContainer from "@/components/Container/MainContainer.vue";
import CardButton from "@/components/Buttons/CardButton/CardButton.vue";
</script>

<style lang="scss" src="./ContactIntro.scss" scoped>

</style>
