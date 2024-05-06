<template>
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
          Самовывоз
        </button>
      </div>
      <div class="wrapper" v-if="activeTab === 'delivery'">
        <div class="inner">
          <div class="inner-el-column">
            <p class="title">Имя</p>
            <div class="block-inputs">
              <input-contact class="in-name"></input-contact>
            </div>
          </div>
          <div class="inner-el-column">
            <p class="title">Телефон</p>
            <div class="block-inputs">
              <input-contact class="in-code" placeholder="+38(095)"></input-contact>
              <input-contact class="in-phone"></input-contact>
            </div>
          </div>
          <div class="inner-el-flex">
            <div class="block-inputs-column-one">
              <p class="title">Улица</p>
              <input-contact class="in-st"></input-contact>
            </div>
            <div class="block-inputs-column">
              <p class="title">Дом</p>
              <input-contact class="in-st"></input-contact>
            </div>
            <div class="block-inputs-column">
              <p class="title">Квартира</p>
              <input-contact class="in-st"></input-contact>
            </div>
            <div class="block-inputs-column">
              <p class="title">Подъезд</p>
              <input-contact class="in-st"></input-contact>
            </div>
            <div class="block-inputs-column">
              <p class="title">Этаж</p>
              <input-contact class="in-st"></input-contact>
            </div>
          </div>
        </div>
        <div class="change_wrapper_btn">
          <h1 class="title_change">Способ оплаты</h1>
          <div class="block-btn">
            <button
              class="btn-order-ch"
              @click="toggleActive('cash')"
              :class="{ active: activeButton === 'cash' }"
            >
              Наличный расчет
            </button>
            <button
              class="btn-order-ch"
              @click="toggleActive('card')"
              :class="{ active: activeButton === 'card' }"
            >
              Банковская карта
            </button>
          </div>
          <div class="price-block">
            <h4>Итого:</h4>
            <h2>{{ parseFloat(cardStore.total).toFixed(2) }} грн.</h2>
          </div>

          <create-order>Оформить заказ</create-order>
          <center-block>
            <router-link to="/" class="subtitle-back">
              Вернуться к редактированию заказа
            </router-link>
          </center-block>
        </div>
      </div>
      <div v-else-if="activeTab === 'pickup'" class="wrapper">
        <div class="inner">
          <div class="inner-el-column">
            <p class="title">Имя</p>
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
              <p class="title">Улица</p>
              <input-contact class="in-st"></input-contact>
            </div>
            <div class="block-inputs-column">
              <p class="title">Дом</p>
              <input-contact class="in-st"></input-contact>
            </div>
            <div class="block-inputs-column">
              <p class="title">Квартира</p>
              <input-contact class="in-st"></input-contact>
            </div>
            <div class="block-inputs-column">
              <p class="title">Подъезд</p>
              <input-contact class="in-st"></input-contact>
            </div>
            <div class="block-inputs-column">
              <p class="title">Этаж</p>
              <input-contact class="in-st"></input-contact>
            </div>
          </div>
        </div>
        <div class="time-order">
          <h1 class="title_change">Через сколько планируете забрать заказ?</h1>
          <div class="block-btn-width">
            <button
              class="btn-order-time"
              @click="minActive('min-25')"
              :class="{ active: activeMin === 'min-25' }"
            >
              25 мин
            </button>
            <button
              class="btn-order-time"
              @click="minActive('min-30')"
              :class="{ active: activeMin === 'min-30' }"
            >
              30 мин
            </button>
            <button
              class="btn-order-time"
              @click="minActive('min-40')"
              :class="{ active: activeMin === 'min-40' }"
            >
              40 мин
            </button>
            <button
              class="btn-order-time"
              @click="minActive('min-50')"
              :class="{ active: activeMin === 'min-50' }"
            >
              50 мин
            </button>
            <button
              class="btn-order-time"
              @click="minActive('min-60')"
              :class="{ active: activeMin === 'min-60' }"
            >
              60 мин
            </button>
          </div>
        </div>
        <div class="change_wrapper_btn">
          <h1 class="title_change">Способ оплаты</h1>
          <div class="block-btn">
            <button
              class="btn-order-ch"
              @click="toggleActive('cash')"
              :class="{ active: activeButton === 'cash' }"
            >
              Наличный расчет
            </button>
            <button
              class="btn-order-ch"
              @click="toggleActive('card')"
              :class="{ active: activeButton === 'card' }"
            >
              Банковская карта
            </button>
          </div>
          <div class="price-block">
            <h4>Итого:</h4>
            <h2>{{ parseFloat(cardStore.total).toFixed(2) }} грн.</h2>
          </div>

          <create-order>Оформить заказ</create-order>
          <center-block>
            <router-link to="/" class="subtitle-back">
              Вернуться к редактированию заказа
            </router-link>
          </center-block>
        </div>
      </div>
    </main-container>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import MainContainer from '@/components/Container/MainContainer.vue'
import InputContact from '@/components/Inputs/InputContact/InputContact.vue'
import { useCard } from '@/stores/CardStore.js'
import { useCookies } from 'vue3-cookies'
import CreateOrder from '@/components/Buttons/CreateOrder/CreateOrder.vue'
import CenterBlock from '@/components/Center/CenterBlock.vue'

const { cookies } = useCookies()
const cardStore = useCard()
const totalCost = ref(cookies.get('totalCost') || 0)
const activeTab = ref('delivery')
const activeButton = ref('cash')
const activeMin = ref('min-40')

const toggleActive = (buttonType) => {
  activeButton.value = buttonType
}
const minActive = (buttonType) => {
  activeMin.value = buttonType
}

onMounted(() => {
  const raw = cookies.get('cookie')
  if (!raw || cardStore.volume === undefined) {
    cardStore.setVolume(0)
  }

  cardStore.total = totalCost.value
})
watch(totalCost, (newValue) => {
  cardStore.total = newValue
})
</script>

<style lang="scss" src="./OrderContact.scss" scoped></style>
