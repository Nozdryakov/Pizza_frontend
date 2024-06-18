<template>

  <div class="block-order">
    <div class="order-item">
      <h1 class="title-ac-user">Виберіть адресу доставки:</h1>
      <div v-for="user in users" :key="user.user_id" class="user">
        <div v-for="address in user.addresses" :key="address.address_id"
             class="address" :class="{ active: isSelectedAddress(address) }"
             @click="selectAddress(address)"
        >
          <p class="name-order">{{address.nameUser}}</p>
          <div class="subtitle-order-block">
            <p class="subtitle-order">{{ address.phoneNumber }}</p>
            <p class="subtitle-order">р.{{ address.area.title }} вул.{{ address.streetVal }} дім.{{address.dom}} кв. {{address.kvartira}} </p>

            <p>Спосіб оплати: {{ address.paymentMethod }}</p>
          </div>
          <div v-for="order in address.orders" :key="order.order_id" class="order">
            <p>{{ order.product.title }} x {{ order.count }}</p>
          </div>
        </div>
      </div>
    </div>
    <create-order @click="sendOrder">Оформити замовлення</create-order>
    <center-block>
      <router-link :to="{ name: 'home', hash: '#menu' }" class="subtitle-back">Повернутися до редагування замовлення</router-link>
    </center-block>
  </div>

  <div class="tabs">
    <button
      class="btn-order"
      @click="activeTab = 'Доставка'"
      :class="{ active: activeTab === 'Доставка'}"
    >
      Доставка
    </button>
    <button
      class="btn-order"
      @click="activeTab = 'Самовивіз'"
      :class="{ active: activeTab === 'Самовивіз' }"
    >
      Самовивіз
    </button>
  </div>

  <div class="wrapper" v-if="activeTab === 'Доставка'">
    <h1 class="title-ac-user">Додати нову адресу:</h1>
    <div class="inner">
      <div class="inner-el-column">
        <p class="title">Ім'я</p>
        <title-error class="te-error">{{nameError}}</title-error>
        <div class="block-inputs">
          <input-contact class="in-name" v-model="nameUser" @input="() => validateName(nameUser)"></input-contact>
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
          <input-contact v-model="dom" class="in-st"></input-contact>
        </div>
        <div class="block-inputs-column">
          <p class="title">Квартира</p>
          <input-contact v-model="kvartira" class="in-st"></input-contact>
        </div>
        <div class="block-inputs-column">
          <p class="title">Під'їзд</p>
          <input-contact v-model="podezd" class="in-st"></input-contact>
        </div>
        <div class="block-inputs-column">
          <p class="title">Поверх</p>
          <input-contact v-model="poverh" class="in-st"></input-contact>
        </div>
      </div>
    </div>
    <div class="change_wrapper_btn">
      <h1 class="title_change">Спосіб оплати</h1>
      <div class="block-btn">
        <button
          class="btn-order-ch"
          @click="toggleActive('Готівкою')"
          :class="{ active: activeButton === 'Готівкою' }"
        >
          Готівкою
        </button>
        <button
          class="btn-order-ch"
          @click="toggleActive('Банківська картка')"
          :class="{ active: activeButton === 'Банківська картка' }"
        >
          Банківська картка
        </button>
      </div>
      <create-order class="addAddressBtn" @click="sendAddessUser">Додати адресу</create-order>

    </div>
  </div>
  <div v-else-if="activeTab === 'Самовивіз'" class="wrapper">
    <h1 class="title-ac-user">Додати нову адресу:</h1>
    <div class="inner">
      <div class="inner-el-column">
        <p class="title">Ім'я</p>
        <title-error class="te-error">{{nameError}}</title-error>
        <div class="block-inputs">
          <input-contact class="in-name" v-model="nameUser" @input="() => validateName(nameUser)"></input-contact>
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
          <input-contact v-model="dom" class="in-st"></input-contact>
        </div>
        <div class="block-inputs-column">
          <p class="title">Квартира</p>
          <input-contact v-model="kvartira" class="in-st"></input-contact>
        </div>
        <div class="block-inputs-column">
          <p class="title">Під'їзд</p>
          <input-contact v-model="podezd" class="in-st"></input-contact>
        </div>
        <div class="block-inputs-column">
          <p class="title">Поверх</p>
          <input-contact v-model="poverh" class="in-st"></input-contact>
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
          @click="toggleActive('Готівкою')"
          :class="{ active: activeButton === 'Готівкою' }"
        >
          Готівкою
        </button>
        <button
          class="btn-order-ch"
          @click="toggleActive('Банківська картка')"
          :class="{ active: activeButton === 'Банківська картка' }"
        >
          Банківська картка
        </button>
      </div>
      <create-order class="addAddressBtn" @click="sendAddessUser">Додати адресу</create-order>
    </div>
  </div>

  <modal-window :isVisible="accsessVal" @update:isVisible="accsessVal = $event">
    <h2 class="title__modal">Замовлення прийнято, очікуйте дзвінок</h2>
  </modal-window>
  <modal-window :isVisible="accsessAddress" @update:isVisible="accsessAddress = $event">
    <h2 class="title__modal">Адресу успішно додано</h2>
  </modal-window>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted, watch } from "vue";
import InputContact from "@/components/Inputs/InputContact/InputContact.vue";
import TitleError from "@/components/TitleError/TitleError.vue";
import CreateOrder from "@/components/Buttons/CreateOrder/CreateOrder.vue";
import CenterBlock from "@/components/Center/CenterBlock.vue";
import { useCookies } from "vue3-cookies";
import { useCard } from "@/stores/CardStore.js";
import ModalWindow from "@/components/Admin/ModalWindow/ModalWindow.vue";
const { cookies } = useCookies();
const cardStore = useCard();
const totalCost = ref(cookies.get('totalCost') || 0);
const activeTab = ref('Доставка');
const activeButton = ref('Готівкою');
const activeMin = ref('min-40');
const selectedOperator = ref('+38 (050)');
const phoneNumberError = ref('');
const streetVal = ref('');
const streetError = ref('');
const areas = ref([]);
const selectedArea = ref('');
const selectedAreaError = ref('Будь ласка, оберіть район');
const errorVal = ref(false);
const nameError = ref('');
const accsessVal = ref(false);
const accsessAddress = ref(false);
const openLogin = ref(false);
const openRegister = ref(false);
const dom = ref('');
const kvartira = ref('');
const podezd = ref('');
const poverh = ref('');
const nameUser = ref('');
const operators = [
  { code: '+38(050)', label: '+38(050)' },
  { code: '+38(066)', label: '+38(066)' },
  { code: '+38(067)', label: '+38(067)' },
  { code: '+38(068)', label: '+38(068)' },
  { code: '+38(091)', label: '+38(091)' },
  { code: '+38(092)', label: '+38(092)' },
  { code: '+38(093)', label: '+38(093)' },
  { code: '+38(094)', label: '+38(094)' },
  { code: '+38(095)', label: '+38(095)' },
  { code: '+38(096)', label: '+38(096)' },
  { code: '+38(097)', label: '+38(097)' },
  { code: '+38(098)', label: '+38(098)' },
  { code: '+38(099)', label: '+38(099)' }
];
const phoneNumber = ref('');
const userID = Number(localStorage.getItem('userID'));
const users = ref([]);
const toggleActive = (buttonType) => {
  activeButton.value = buttonType;
};
async function loadData() {
  try {
    users.value = await fetchUserData(userID);
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
}

async function fetchUserData(userId) {
  try {
    const response = await axios.post(`get-address-user`, {
      user_id: userId
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}

onMounted(loadData);
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
watch(selectedArea, (newValue) => {
  if (newValue !== '') {
    selectedAreaError.value = '';
  } else {
    selectedAreaError.value = 'Будь ласка, оберіть район';
  }
});
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
const validateName = (nameUser) => {
  const nameRegex = /^[a-zA-Z0-9\sА-Яа-яҐґЄєІіЇї]{1,30}$/;
  if (nameUser === '') {
    nameError.value = "*Поле обов'язкове";
    return false;
  } else if (!nameRegex.test(nameUser)) {
    nameError.value = 'Назва має містити від 1 до 30 символів (тільки букви, цифри та пробіли)';
    return false;
  } else {
    nameError.value = '';
    return true;
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

const sendAddessUser = async () => {
  if (nameError.value || phoneNumberError.value || selectedAreaError.value || streetError.value !== '') {
    errorVal.value = true;
    console.log(errorVal.value);
    return;
  }
  console.log(1);

  const combineNumber = (selectedOperator.value + phoneNumber.value);
  let fullNum = combineNumber.trim();
  const orderData = {
    area_id: selectedArea.value,
    nameUser: nameUser.value,
    phoneNumber: fullNum,
    dom: dom.value,
    kvartira: kvartira.value,
    podezd: podezd.value,
    poverh: poverh.value,
    type_delivery: activeTab.value,
    streetVal: streetVal.value,
    paymentMethod: activeButton.value,
    user_id: userID,
  };

  console.log(orderData);

  try {
    const response = await axios.post('/send-address-user', {
      data: orderData
    });
    const data = response.data;
    console.log(data.error);

    nameUser.value = '';
    selectedArea.value = '';
    streetVal.value = '';
    phoneNumber.value = '';
    dom.value = '';
    kvartira.value = '';
    podezd.value = '';
    poverh.value = '';
    selectedOperator.value = '';
    accsessAddress.value = true;
    await loadData();

  } catch (error) {
    console.error('Ошибка:', error);
  }
};
const selectedAddress = ref(null);

const selectAddress = (address) => {
  selectedAddress.value = address;
};

const isSelectedAddress = (address) => {
  return selectedAddress.value === address;
};
const sendOrder = async () => {
  if (!selectedAddress.value) {
    console.error("No address selected");
    return;
  }

  // Получаем данные из куки
  const raw = cookies.get('cookie');
  const totalCost = ref(cookies.get('totalCost') || 0);

  // Парсим куки если есть данные
  const jsonArray = raw ? JSON.parse(raw) : [];
  const combineNumber = (selectedAddress.value.phoneNumber);
  let fullNum = combineNumber.trim();

  // Формируем данные заказа
  const orders = jsonArray.map((item) => ({
    product_id: item.product_id,
    name: item.name,
    image: item.image,
    price: parseFloat(item.price).toFixed(2),
    count: item.count || 1,
    nameUser: nameUser.value,
    phoneNumber: fullNum,
    area_id: selectedAddress.value.area_id,
    streetVal: selectedAddress.value.streetVal,
    kvartira: selectedAddress.value.kvartira,
    dom: selectedAddress.value.dom,
    podezd: selectedAddress.value.podezd,
    type_delivery: selectedAddress.value.type_delivery,
    poverh: selectedAddress.value.poverh,
    totalCost: totalCost.value,
    paymentMethod: selectedAddress.value.paymentMethod,
    address_id: ''
  }));

  console.log(orders);

  try {
    const response = await axios.post('/send-order', {
      data: orders
    });
    const data = response.data;
    console.log(data.error);

    // Сброс формы после успешной отправки
    phoneNumber.value = '';
    dom.value = '';
    kvartira.value = '';
    podezd.value = '';
    poverh.value = '';
    accsessVal.value = true;

  } catch (error) {
    console.error('Ошибка:', error);
  }
};
</script>

<style lang="scss" src="./OrderUser.scss" scoped>

</style>
