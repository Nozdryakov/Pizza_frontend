<template>
  {{order}}
  <div class="order-contact" v-show="cardStore.volume > 0">
    <main-container>
      <div class="tabs">
        <button
          class="btn-order"
          @click="activeTab = 'delivery'"
          :class="{ active: activeTab === 'delivery' }"
        >
          Доставка
        </button>
        <button
          class="btn-order"
          @click="activeTab = 'pickup'"
          :class="{ active: activeTab === 'pickup' }"
        >
          Самовивіз
        </button>
      </div>
      <div class="wrapper" v-if="activeTab === 'delivery'">
        <div class="inner">
          <div class="inner-el-column">
            <p class="title">Ім'я</p>
            <div class="block-inputs">
              <input-contact class="in-name"></input-contact>
            </div>
          </div>
          <div class="inner-el-column">
            <p class="title">Телефон</p>
            <div class="block-inputs">
              <input-contact class="in-code" placeholder="+38 (095)"></input-contact>
              <input-contact class="in-phone"></input-contact>
            </div>
          </div>
          <div class="inner-el-flex">
            <div class="block-inputs-column-one">
              <p class="title">Вулиця</p>
              <input-contact class="in-st"></input-contact>
            </div>
            <div class="block-inputs-column">
              <p class="title">Дім</p>
              <input-contact class="in-st"></input-contact>
            </div>
            <div class="block-inputs-column">
              <p class="title">Квартира</p>
              <input-contact class="in-st"></input-contact>
            </div>
            <div class="block-inputs-column">
              <p class="title">Під'їзд</p>
              <input-contact class="in-st"></input-contact>
            </div>
            <div class="block-inputs-column">
              <p class="title">Поверх</p>
              <input-contact class="in-st"></input-contact>
            </div>
          </div>
        </div>
        <div class="change_wrapper_btn">
          <h1 class="title_change">Спосіб оплати</h1>
          <div class="block-btn">
            <button
              class="btn-order-ch"
              @click="toggleActive('cash')"
              :class="{ active: activeButton === 'cash' }"
            >
              Готівкою
            </button>
            <button
              class="btn-order-ch"
              @click="toggleActive('card')"
              :class="{ active: activeButton === 'card' }"
            >
              Банківська картка
            </button>
          </div>
          <div class="price-block">
            <h4>Итого:</h4>
            <h2>{{ parseFloat(cardStore.total).toFixed(2) }} грн.</h2>
          </div>

          <create-order @click="sendOrder">Оформити замовлення</create-order>
          <center-block>
            <router-link :to="{ name: 'home', hash: '#menu' }" class="subtitle-back">Повернутися до редагування замовлення</router-link>
          </center-block>
        </div>
      </div>
      <div v-else-if="activeTab === 'pickup'" class="wrapper">
        <div class="inner">
          <div class="inner-el-column">
            <p class="title">Ім'я</p>
            <div class="block-inputs">
              <input-contact class="in-name"></input-contact>
            </div>
          </div>
          <div class="inner-el-column">
            <p class="title">Телефон</p>
            <div class="block-inputs">
              <input-contact class="in-code" placeholder="+38 (095)"></input-contact>
              <input-contact class="in-phone"></input-contact>
            </div>
          </div>
          <div class="inner-el-flex">
            <div class="block-inputs-column-one">
              <p class="title">Вулиця</p>
              <input-contact class="in-st"></input-contact>
            </div>
            <div class="block-inputs-column">
              <p class="title">Дім</p>
              <input-contact class="in-st"></input-contact>
            </div>
            <div class="block-inputs-column">
              <p class="title">Квартира</p>
              <input-contact class="in-st"></input-contact>
            </div>
            <div class="block-inputs-column">
              <p class="title">Під'їзд</p>
              <input-contact class="in-st"></input-contact>
            </div>
            <div class="block-inputs-column">
              <p class="title">Поверх</p>
              <input-contact class="in-st"></input-contact>
            </div>
          </div>
        </div>
        <div class="time-order">
          <h1 class="title_change">Через скільки плануєте забрати замовлення?</h1>
          <div class="block-btn-width">
            <button
              class="btn-order-time"
              @click="minActive('min-25')"
              :class="{ active: activeMin === 'min-25' }"
            >
              25 хв
            </button>
            <button
              class="btn-order-time"
              @click="minActive('min-30')"
              :class="{ active: activeMin === 'min-30' }"
            >
              30 хв
            </button>
            <button
              class="btn-order-time"
              @click="minActive('min-40')"
              :class="{ active: activeMin === 'min-40' }"
            >
              40 хв
            </button>
            <button
              class="btn-order-time"
              @click="minActive('min-50')"
              :class="{ active: activeMin === 'min-50' }"
            >
              50 хв
            </button>
            <button
              class="btn-order-time"
              @click="minActive('min-60')"
              :class="{ active: activeMin === 'min-60' }"
            >
              60 хв
            </button>
          </div>
        </div>
        <div class="change_wrapper_btn">
          <h1 class="title_change">Спосіб оплати</h1>
          <div class="block-btn">
            <button
              class="btn-order-ch"
              @click="toggleActive('cash')"
              :class="{ active: activeButton === 'cash' }"
            >
              Готівкою
            </button>
            <button
              class="btn-order-ch"
              @click="toggleActive('card')"
              :class="{ active: activeButton === 'card' }"
            >
              Банківська картка
            </button>
          </div>
          <div class="price-block">
            <h4>Разом:</h4>
            <h2>{{ parseFloat(cardStore.total).toFixed(2) }} грн.</h2>
          </div>

          <create-order>Оформити замовлення</create-order>
          <center-block>
            <router-link :to="{ name: 'home', hash: '#menu' }" class="subtitle-back">Вернуться к редактированию заказа</router-link>
          </center-block>
        </div>
      </div>
    </main-container>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import MainContainer from '@/components/Container/MainContainer.vue';
import InputContact from '@/components/Inputs/InputContact/InputContact.vue';
import { useCard } from '@/stores/CardStore.js';
import { useCookies } from 'vue3-cookies';
import CreateOrder from '@/components/Buttons/CreateOrder/CreateOrder.vue';
import CenterBlock from '@/components/Center/CenterBlock.vue';
import axios from "axios";
import router from "@/router/index.js";

const { cookies } = useCookies();
const cardStore = useCard();
const totalCost = ref(cookies.get('totalCost') || 0);
const activeTab = ref('delivery');
const activeButton = ref('cash');
const activeMin = ref('min-40');

const toggleActive = (buttonType) => {
  activeButton.value = buttonType;
};
const minActive = (buttonType) => {
  activeMin.value = buttonType;
};
const order = ref();
onMounted(() => {
  order.value = cookies.get('cookie');
  const raw = cookies.get('cookie');
  if (!raw || cardStore.volume === undefined) {
    cardStore.setVolume(0);
  }

  cardStore.total = totalCost.value;
});
watch(totalCost, (newValue) => {
  cardStore.total = newValue;
});

const sendOrder = async () => {
  console.log('Отправка данных:', order.value);
  try {
    const response = await axios.post('/send-order', {
      data: order.value
    });
    const data = response.data;
    console.log(data.error);
  } catch (error) {
    console.error('Ошибка:', error);
  }
};
</script>

<style lang="scss" src="./OrderContact.scss" scoped></style>
