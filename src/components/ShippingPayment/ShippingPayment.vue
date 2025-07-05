<template>
  <div class="payment-info">
    <main-container>
      <head-title id="delivery">Доставка та оплата</head-title>
      <div class="payment-info__inner">
        <div class="payment-info__item">
          <div class="title">60 хвилин</div>
          <div class="subtitle">
            Lorem short short Lorem short short Lorem short short Lorem short short Lorem short short
          </div>
          <div class="bottom-block">
            <div class="bt-title">Приймаємо до оплати</div>
            <div class="bt-item">
              <div class="el"><visa-icon></visa-icon></div>
              <div class="el ml-position"><master-card-icon></master-card-icon></div>
            </div>
          </div>
        </div>
        <div class="payment-info__item">
          <div class="title">Мінімальна сума доставки 250 грн</div>
          <div class="subtitle">
            Мінімальна сума доставки 250грн. Замовлення на меншу суму оформляються на умовах
            самовивозу.
          </div>
          <div class="bottom-block">
            <div class="bt-title">Спосіб оплати</div>
            <div class="bt-item">
              <p class="el">Готівковий розрахунок</p>
              <p class="el ml-position">Банківська картка</p>
            </div>
          </div>
        </div>
        <div class="payment-info__item third-el">
          <div class="title">Зона доставки обмежена</div>
          <div class="subtitle">Зона доставки вказана на карті</div>
          <div class="fon">
            <card-button class="btn">Карта Доставки</card-button>
            <div class="card-header-fon"></div>
          </div>
        </div>
      </div>
    </main-container>
  </div>
</template>

<script setup>
import MainContainer from '@/components/Container/MainContainer.vue';
import HeadTitle from '@/components/HeadTitle/HeadTitle.vue';
import CardButton from '@/components/Buttons/CardButton/CardButton.vue';
import VisaIcon from '@/components/ShippingPayment/icons/VisaIcon.vue';
import MasterCardIcon from '@/components/ShippingPayment/icons/MasterCardIcon.vue';
</script>

<style lang="scss" scoped src="./ShippingPayment.scss"></style>
