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
              Viki Pizza – це нова піцерія в місті Києві, яка відкрилася зовсім недавно і вже завоювала любов своїх клієнтів завдяки вишуканим смакам та швидкій доставці. Наша місія – приносити радість і задоволення від кожного шматочка піци, використовуючи тільки найсвіжіші інгредієнти і дотримуючись найвищих стандартів якості. Щоранку ми прокидаємося з натхненням і цікавістю, щоб продовжувати свою роботу і радувати наших клієнтів.
            </p>
            <p class="subtitle__text">
              Ми постійно вдосконалюємо наші рецепти, експериментуємо з новими смаками і прагнемо перевершити очікування кожного нашого відвідувача.
              Запрошуємо вас відвідати Viki Pizza і насолодитися нашими вишуканими смаками.
            </p>
            <p class="subtitle__text">Ми впевнені, що ви будете задоволені якістю нашої піци та рівнем обслуговування. Ваші задоволені посмішки – найкраща винагорода для нас!</p>
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
