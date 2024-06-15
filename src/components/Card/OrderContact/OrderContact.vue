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
            <title-error class="te-error">{{nameError}}</title-error>
            <div class="block-inputs">
              <input-contact class="in-name" v-model="name" @input="() => validateName(name)"></input-contact>
            </div>
          </div>
          <div class="inner-el-column">
            <p class="title">Телефон</p>
            <title-error class="te-error">{{phoneNumberError}}</title-error>
            <div class="block-inputs">
              <select v-model="selectedOperator" class="select-order">
                <option v-for="(operator, index) in operators" :key="index" :value="operator.code">
                  {{ operator.label }}
                </option>
              </select>
              <input-contact class="in-phone" v-model="phoneNumber" @input="() => validatePhoneNumber(phoneNumber)" maxlength="7"></input-contact>
            </div>
          </div>
          <div class="inner-el-column">
            <p class="title">Район</p>
            <title-error class="te-error">{{selectedAreaError}}</title-error>
            <select v-model="selectedArea" class="select-order sel_area">
              <option v-for="(area, index) in areas" :key="index" :value="area.area_id">
                {{ area.title }}
              </option>
            </select>
          </div>
          <div class="inner-el-flex">
            <div class="block-inputs-column-one">
              <p class="title">Вулиця <title-error class="st-error">{{streetError}}</title-error></p>
              <input-contact v-model="streetVal" @input="() => validateStreet(streetVal)" class="in-st"></input-contact>
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
            <h4>Разом:</h4>
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
            <title-error class="te-error">{{nameError}}</title-error>
            <div class="block-inputs">
              <input-contact class="in-name" v-model="name" @input="() => validateName(name)"></input-contact>
            </div>
          </div>
          <div class="inner-el-column">
            <p class="title">Телефон</p>
            <title-error class="te-error">{{phoneNumberError}}</title-error>
            <div class="block-inputs">
              <select v-model="selectedOperator" class="select-order">
                <option v-for="(operator, index) in operators" :key="index" :value="operator.code">
                  {{ operator.label }}
                </option>
              </select>
              <input-contact class="in-phone" v-model="phoneNumber" @input="() => validatePhoneNumber(phoneNumber)" maxlength="7"></input-contact>
            </div>
          </div>
          <div class="inner-el-column">
            <p class="title">Район</p>
            <title-error class="te-error">{{selectedAreaError}}</title-error>
            <select v-model="selectedArea" class="select-order sel_area">
              <option v-for="(area, index) in areas" :key="index" :value="area.area_id">
                {{ area.title }}
              </option>
            </select>
          </div>
          <div class="inner-el-flex">
            <div class="block-inputs-column-one">
              <p class="title">Вулиця <title-error class="st-error">{{streetError}}</title-error></p>
              <input-contact v-model="streetVal" @input="() => validateStreet(streetVal)" class="in-st"></input-contact>
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
            <router-link :to="{ name: 'home', hash: '#menu' }" class="subtitle-back">Повернутися до редагування замовлення</router-link>
          </center-block>
        </div>
      </div>
    </main-container>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import MainContainer from '@/components/Container/MainContainer.vue';
import InputContact from '@/components/Inputs/InputContact/InputContact.vue';
import { useCard } from '@/stores/CardStore.js';
import { useCookies } from 'vue3-cookies';
import CreateOrder from '@/components/Buttons/CreateOrder/CreateOrder.vue';
import CenterBlock from '@/components/Center/CenterBlock.vue';
import axios from "axios";
import router from "@/router/index.js";
import TitleError from "@/components/TitleError/TitleError.vue";

const { cookies } = useCookies();
const cardStore = useCard();
const totalCost = ref(cookies.get('totalCost') || 0);
const activeTab = ref('delivery');
const activeButton = ref('cash');
const activeMin = ref('min-40');
const selectedOperator = ref('+38 (050)');
const nameError = ref('');
const phoneNumberError = ref('');
const name = ref('');
const streetVal = ref('');
const streetError = ref('');
const areas = ref([]);
const selectedArea = ref('');
const selectedAreaError = ref('Будь ласка, оберіть район');

const operators = [
  { code: '+38 (050)', label: '+38 (050)' },
  { code: '+38 (066)', label: '+38 (066)' },
  { code: '+38 (067)', label: '+38 (067)' },
  { code: '+38 (068)', label: '+38 (068)' },
  { code: '+38 (091)', label: '+38 (091)' },
  { code: '+38 (092)', label: '+38 (092)' },
  { code: '+38 (093)', label: '+38 (093)' },
  { code: '+38 (094)', label: '+38 (094)' },
  { code: '+38 (095)', label: '+38 (095)' },
  { code: '+38 (096)', label: '+38 (096)' },
  { code: '+38 (097)', label: '+38 (097)' },
  { code: '+38 (098)', label: '+38 (098)' },
  { code: '+38 (099)', label: '+38 (099)' }
];
const phoneNumber = ref('');
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
watch(selectedArea, (newValue) => {
  if (newValue !== '') {
    selectedAreaError.value = '';
  } else {
    selectedAreaError.value = 'Будь ласка, оберіть район';
  }
});
const validatePhoneNumber = (phoneNumber) => {
  const regex = /^[0-9]{7}$/;
  if (phoneNumber === '') {
    phoneNumberError.value = "*Поле обов'язкове";
  }
  else if (!regex.test(phoneNumber)) {
    phoneNumberError.value = 'Неправильний формат номеру або неповний номер, повинно бути 7 цифр';
    return false;

  } else {
    phoneNumberError.value = '';
    return true;
  }
};
const validateName = (name) => {
  const nameRegex = /^[a-zA-Z0-9\sА-Яа-яҐґЄєІіЇї]{1,30}$/;
  if (name === '') {
    nameError.value = "*Поле обов'язкове";
    return false;
  } else if (!nameRegex.test(name)) {
    nameError.value = 'Назва має містити від 1 до 30 символів (тільки букви, цифри та пробіли)';
    return false;
  } else {
    nameError.value = '';
    return true;
  }
};
const sendOrder = async () => {

  // try {
  //   const response = await axios.post('/send-order', {
  //     data: order.value
  //   });
  //   const data = response.data;
  //   console.log(data.error);
  // } catch (error) {
  //   console.error('Ошибка:', error);
  // }
};
const validateStreet = (street) => {
  const nameRegex = /^[a-zA-Z0-9\sА-Яа-яҐґЄєІіЇї]{1,30}$/;
  if (street === '') {
    streetError.value = "Поле обов'язкове";
  } else if (!nameRegex.test(street)) {
    streetError.value = 'Назва має містити від 1 до 30 символів (тільки букви, цифри та пробіли)';
    streetVal.value = street.slice(0, 30);
  } else {
    streetError.value = '';
  }
};

onMounted(async () => {
  try {
    const response = await axios.get('/get-areas');
    areas.value = response.data.areas;
  } catch (error) {
    console.error('Error fetching areas:', error);
  }
});

</script>

<style lang="scss" src="./OrderContact.scss" scoped></style>
