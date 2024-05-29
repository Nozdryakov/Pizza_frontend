<template>
  <div class="map-info">
    <main-container>
      <head-title id="contacts">Контакти</head-title>
      <div class="map-info__inner">
        <div class="block-map">
          <a
            href="https://www.google.com/maps/place/%D0%9A%D0%B8%D0%B5%D0%B2,+02000/@50.4015698,30.2030566,10z/data=!3m1!4b1!4m15!1m8!3m7!1s0x40d1d9c154700e8f:0x1068488f64010!2z0KPQutGA0LDQuNC90LA!3b1!8m2!3d48.379433!4d31.1655799!16zL20vMDd0MjE!3m5!1s0x40d4cf4ee15a4505:0x764931d2170146fe!8m2!3d50.4503596!4d30.5245025!16zL20vMDJzbjM0?entry=ttu"
          >
            <img class="map-img" src="@/assets/images/map.jpg" />
          </a>
        </div>
        <div class="info">
          <div class="info__item">
            <div class="el">
              <location-icon class="icon"></location-icon>
              <p class="text left">м. Київ вул, Тиха 92А</p>
            </div>
            <div class="el">
              <contact-icon class="icon"></contact-icon>
              <p class="text left">info@VikiPizza.2021</p>
            </div>
          </div>
          <div class="info__item">
            <div class="el">
              <p class="text">Режим роботи:</p>
            </div>
            <div class="el column">
              <p class="m-text">пн.-пт.: 18:00-21:00;</p>
              <p class="m-text">сб-нд.: вихідний</p>
            </div>
          </div>
          <div class="info__item">
            <div class="el">
              <p class="text">З будь-яких питань:</p>
            </div>
            <div class="el column">
              <p class="m-text">+3803047076</p>
              <p class="m-text">+3803047076</p>
            </div>
          </div>
        </div>
      </div>
    </main-container>
  </div>
</template>

<script setup>
import MainContainer from '@/components/Container/MainContainer.vue';
import HeadTitle from '@/components/HeadTitle/HeadTitle.vue';
import LocationIcon from '@/components/MapInfo/icons/LocationIcon.vue';
import ContactIcon from '@/components/MapInfo/icons/ContactIcon.vue';
</script>

<style lang="scss" src="./MapInfo.scss" scoped></style>
