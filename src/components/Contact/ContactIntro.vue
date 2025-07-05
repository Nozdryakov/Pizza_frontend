<template>
  <div class="intro">
    <main-container>
      <div class="intro__inner">
        <div class="intro__item">
          <div class="head-title">Про нас</div>
          <div class="title">
            <p class="title__text">Drop</p>
            <p>Drop</p>
          </div>
          <div class="subtitle">
            <p class="subtitle__text">
             Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque aspernatur quibusdam iusto officia, laborum ipsum ea illo molestiae! Numquam, sequi. Suscipit dignissimos porro ex, corporis doloribus ad soluta. Officia, vitae.
            </p>
            <p class="subtitle__text">
             Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo harum veniam placeat saepe nihil, eaque at amet nam. Itaque vitae, consequatur impedit illum esse delectus aliquid. Ut error vero et.
            </p>
            <p class="subtitle__text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam voluptas officia omnis labore totam recusandae quo </p>
          </div>
          <div class="block__button">
            <router-link :to="{ name: 'home', hash: '#menu' }">
              <card-button class="btn">Проду</card-button>
            </router-link>
            <router-link :to="{ path: '/' }">
              <card-button class="white">Головна</card-button>
            </router-link>

          </div>
        </div>
        <div class="intro__item">
          <div class="item__element">
            <div class="title-block">Lorem short short</div>
            <div class="subtitle-block">
              <p>Lorem short short</p>
              <p>Lorem short short</p>
            </div>
          </div>
          <div class="item__element">
            <div class="title-block">Lorem short short</div>
            <div class="subtitle-block">
              <p>Lorem short short</p>
              <p>Lorem short short</p>
            </div>
          </div>
          <div class="item__element">
            <div class="title-block">Lorem short short</div>
            <div class="subtitle-block">
              <p>Lorem short short</p>
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
