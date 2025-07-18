<template>
  <main-container>
    <div id="menu" class="tabs__wrapper">
      <head-title>Каталог</head-title>
      <ul class="tabs-list">
        <li
          v-for="(category, index) in data.list"
          :key="index"
          :class="{ active: category.show }"
          @click="showCategory(category.id)"
        >
          {{ category.title }}
        </li>
      </ul>
      <div class="tabs-content">
        <div v-for="(category, index) in visibleTabs" :key="index">
          <h2>{{ category.title }}</h2>
          <ul class="product">
            <li v-for="(product, i) in filteredProducts(category.list)" :key="i" class="product__item">
              <img :src="`http://localhost:8000/images/products/${product.image}`" alt="" class="tab-img" />
              <div class="title">{{ product.name }}</div>
              <div class="subtitle">{{ product.description }}</div>
              <div class="buy__block">
                <p class="price">{{ product.price }} ₴</p>
                <card-button v-if="product.addedToCart" class="added-btn">
                  <span>У кошику</span>
                </card-button>
                <button v-else class="btn-buy" @click="addToCart(product)">
                  <span>Купити</span>
                </button>
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
import { useCard } from '@/stores/CardStore.js';
import { useCookies } from 'vue3-cookies';
import { computed, ref } from 'vue';
import { onMounted } from 'vue';
import axios from 'axios';
import CardButton from '@/components/Buttons/CardButton/CardButton.vue';

// const data = ref(null);
const data = ref({
  list: []
});

onMounted(async () => {
  try {
    const response = await axios.get('/product', {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      mode: 'cors'
    });
    data.value = response.data;

    data.value.list = data.value.products.map((category) => ({
      id: category.category_id,
      title: category.title,
      show: false,
      list: category.products.map((product) => ({
        product_id: product.product_id,
        image: product.image,
        name: product.title,
        description: product.description,
        price: parseFloat(product.price).toFixed(2),
        visible: product.visible,
        addedToCart: false
      }))
    }));
    if (data.value.list.length > 0) {
      data.value.list[0].show = true;
    }
    const existingProducts = cookies.get('cookie') ? JSON.parse(cookies.get('cookie')) : [];
    data.value.list.forEach((category) => {
      category.list.forEach((product) => {
        const existingProduct = existingProducts.find((item) => item.name === product.name);
        if (existingProduct) {
          product.addedToCart = true;
        }
      });
    });
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

const filteredProducts = (products) => {
  return products.filter(product => product.visible == 1);
};

// Конфиг для настройки жизни куки
const config = {
  current_default_config: {
    expireTimes: '4h',
    path: '; path=/',
    secure: false
  }
};

const expireTimes = config.current_default_config.expireTimes;
const cardStore = useCard();
const { cookies } = useCookies();

const addToCart = (product) => {
  const existingProducts = cookies.get('cookie') ? JSON.parse(cookies.get('cookie')) : [];
  const existingProductIndex = existingProducts.findIndex((item) => item.name === product.name);

  if (existingProductIndex !== -1) {
    existingProducts[existingProductIndex].count =
      (existingProducts[existingProductIndex].count || 1) + 1;
    existingProducts[existingProductIndex].addedToCart = true;
  } else {
    existingProducts.push({
      product_id: product.product_id,
      name: product.name,
      price: product.price,
      count: 1,
      image: product.image,
      addedToCart: true
    });
  }
  product.addedToCart = true;
  cookies.set('cookie', JSON.stringify(existingProducts), expireTimes);
  cardStore.products = existingProducts;
  cardStore.volume = existingProducts.length;

  const totalCost = existingProducts.reduce((total, item) => {
    return total + item.price * item.count;
  }, 0);
  cardStore.total = totalCost;
  cookies.set('totalCost', totalCost.toString());
};

const isCookieExpired = () => {
  const cookieValue = cookies.get('cookie');
  if (!cookieValue) {
    return true;
  }

  const currentTime = new Date().getTime();
  const cookieExpirationTime = cookies.expireTimes;

  if (cookieExpirationTime <= currentTime) {
    cookies.remove('cookie');

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
