<template>
  <div class="payment-info">
    <main-container>
      <head-title id="delivery">Доставка и оплата</head-title>
      <div class="payment-info__inner">
        <div class="payment-info__item">
          <div class="title">60 минут или пицца бесплатно</div>
          <div class="subtitle">
            Если мы не успеем доставить любые продукт в течение 60 минут, курьер подарит вам
            сертификат на большую пиццу.
          </div>
          <div class="bottom-block">
            <div class="bt-title">Принимаем к оплате</div>
            <div class="bt-item">
              <div class="el"><visa-icon></visa-icon></div>
              <div class="el ml-position"><master-card-icon></master-card-icon></div>
            </div>
          </div>
        </div>
        <div class="payment-info__item">
          <div class="title">Минимальная сумма доставки 15,90</div>
          <div class="subtitle">
            Минимальная сумма доставки 15,90 . Заказы на меньшую сумму оформляются на условиях
            самовывоза.
          </div>
          <div class="bottom-block">
            <div class="bt-title">Способ оплаты</div>
            <div class="bt-item">
              <p class="el">Наличный расчет</p>
              <p class="el ml-position">Банковская карта</p>
            </div>
          </div>
        </div>
        <div class="payment-info__item third-el">
          <div class="title">Зона доставки ограничена</div>
          <div class="subtitle">Зона доставки указана на карте</div>
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
