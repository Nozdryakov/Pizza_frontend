<template>
  <div class="intro">
    <main-container>
      <div class="intro__inner">
        <img class="fon-blur blur-two" src="@/assets/images/pizza-fon-1-intro.png" />
        <img class="fon-blur blur-third" src="@/assets/images/pizza-fon-2-intro.png" />
        <img class="fon-blur blur-third part-one" src="@/assets/images/pizza-fon-2-intro.png" />
        <div class="item__intro first-el">
          <span class="price">19.90 грн.</span>
          <div class="title">Pizza Delicious</div>
          <div class="subtitle">
            <p>Курячі шматочки, солодкий перець,</p>
            <p>моцарела, соус солодкий чилі, соус альфре</p>
          </div>
          <div class="btns-block">
            <card-button class="btn red">Купити</card-button>
            <div class="btn-blur">
              <router-link :to="{ name: 'home', hash: '#menu' }" class="nav__link">
                <card-button class="btn btn-menu">Меню</card-button>
              </router-link>
              <img class="fon-blur blur-one" src="@/assets/images/menu-fon-intro.png" />
            </div>
          </div>
        </div>
        <div class="item__intro second-el">
          <img src="@/assets/images/pizza-fon.png" />
        </div>
        <div class="item__intro third-el">
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

<style lang="scss" scoped src="./IntroMain.scss"></style>
