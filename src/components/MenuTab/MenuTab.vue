<template>
  <main-container>
    <div id="menu" class="tabs__wrapper">
      <head-title>Меню</head-title>
      <ul class="tabs-list">
        <li
          v-for="(category, index) in data.list"
          :key="index"
          :class="{ active: category.show }"
          @click="showCategory(category.id)"
        >
          {{ category.id }}
        </li>
      </ul>
      <div class="tabs-content">
        <div v-for="(category, index) in visibleTabs" :key="index">
          <h2>{{ category.id }}</h2>
          <ul class="product">
            <li v-for="(product, i) in category.list" :key="i" class="product__item">
              <img src="@/assets/images/image-default.png" class="tab-img" />
              <div class="title">{{ product.name }}</div>
              <div class="subtitle">{{ product.description }}</div>
              <div class="buy__block">
                <p class="price">{{ product.price }} ₴</p>
                <button class="btn-buy" @click="addToCart(product)">Выбрать</button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </main-container>
</template>

<script setup>
import MainContainer from '@/components/Container/MainContainer.vue';
import HeadTitle from '@/components/HeadTitle/HeadTitle.vue';
import { useCard } from "@/stores/CardStore.js";
import { useCookies } from "vue3-cookies";
import { computed, ref } from "vue";
import { onMounted } from 'vue';
import axios from 'axios';

// const data = ref(null);
const data = ref({
  list: []
});

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/applications/index');
    data.value = response.data;

    data.value.list = data.value.products.map(category => ({
      id: category.title,
      show: false,
      list: category.products.map(product => ({
        name: product.title,
        description: product.description,
        price: parseFloat(product.price)
      }))
    }))
    if (data.value.list.length > 0) {
      data.value.list[0].show = true;
    }
  } catch (error) {
    console.error('Произошла ошибка при выполнении запроса:', error);
  }
});

const visibleTabs = computed(() => {
  return data.value.list.filter((item) => item.show);
});

const showCategory = (itemId) => {
  data.value.list.forEach((item) => {
    item.show = item.id === itemId;
  });
};

// Конфиг для настройик жизни куки
const config = {
  current_default_config: {
    expireTimes: "4h",
    path: "; path=/",
    secure: false,
  }
};

const expireTimes = config.current_default_config.expireTimes;
const cardStore = useCard();
const { cookies } = useCookies();
const products = [];

const addToCart = (product) => {
  // Создаем новый продукт для добавления в корзину
  const newProduct = {
    name: product.name,
    price: product.price,
    volume: products.length + 1
  };

  // Получаем текущий массив товаров из куки, если он есть
  const existingProducts = cookies.get('cookie') ? JSON.parse(cookies.get('cookie')) : [];

  // Добавляем новый продукт к существующему массиву товаров
  const updatedProducts = [...existingProducts, newProduct];

  // Сохраняем обновленный массив продуктов в куки
  cookies.set('cookie', JSON.stringify(updatedProducts), expireTimes);

  // Обновляем данные в хранилище состояния
  cardStore.products = updatedProducts;
  cardStore.volume = updatedProducts.length;
};

const isCookieExpired = () => {
  const cookieValue = cookies.get('cookie');
  if (!cookieValue) {
    return true;
  }

  const currentTime = new Date().getTime();
  const cookieExpirationTime = cookies.expireTimes;

  if (cookieExpirationTime <= currentTime) {
    console.log(cookies.remove('cookie'));

    return true;
  }
  return false;
};

function checkCookieStatus() {
  if (isCookieExpired()) {
    cardStore.setVolume(0);
  }
}
setInterval(checkCookieStatus, 600000);

</script>

<style scoped lang="scss" src="./MenuTab.scss"></style>
