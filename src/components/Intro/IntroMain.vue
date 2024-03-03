<template>
  <div class="intro">
    <main-container>
      <div class="intro__inner">
        <img class="fon-blur blur-two" src="@/assets/images/pizza-fon-1-intro.png" />
        <img class="fon-blur blur-third" src="@/assets/images/pizza-fon-2-intro.png" />
        <img class="fon-blur blur-third part-one" src="@/assets/images/pizza-fon-2-intro.png" />
        <div class="item__intro first-el">
          <span class="price">19.90 р</span>
          <div class="title">Pizza Delicious</div>
          <div class="subtitle">
            <p>Куриные кусочки, сладкий перец,</p>
            <p>моцарелла, соус сладкий чили, соус альфре</p>
          </div>
          <div class="btns-block">
            <card-button class="btn red">Купить</card-button>
            <div class="btn-blur">
              <card-button class="btn btn-menu">Меню</card-button>
              <img class="fon-blur blur-one" src="@/assets/images/menu-fon-intro.png" />
            </div>
          </div>
        </div>
        <div class="item__intro second-el">
          <img src="@/assets/images/pizza-fon.png" />
        </div>
        <div class="item__intro third-el">
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
import MainContainer from '@/components/Container/MainContainer.vue'
import CardButton from '@/components/Buttons/CardButton/CardButton.vue'
</script>

<style lang="scss" scoped src="./IntroMain.scss"></style>
