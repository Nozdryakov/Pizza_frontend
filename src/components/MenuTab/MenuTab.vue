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
                <button v-if="product.addedToCart" class="btn-buy">
                  <span>Добавлено</span>
                </button>
                <button v-else class="btn-buy" @click="addToCart(product)">
                  <span>Выбрать</span>
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
        price: parseFloat(product.price),
        addedToCart: false
      }))
    }));
    if (data.value.list.length > 0) {
      data.value.list[0].show = true;
    }
    const existingProducts = cookies.get('cookie') ? JSON.parse(cookies.get('cookie')) : [];
    data.value.list.forEach(category => {
      category.list.forEach(product => {
        const existingProduct = existingProducts.find(item => item.name === product.name);
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

const addToCart = (product) => {
  const existingProducts = cookies.get('cookie') ? JSON.parse(cookies.get('cookie')) : [];
  const existingProductIndex = existingProducts.findIndex(item => item.name === product.name);

  if (existingProductIndex !== -1) {
    existingProducts[existingProductIndex].count = (existingProducts[existingProductIndex].count || 1) + 1;
    existingProducts[existingProductIndex].addedToCart = true;
  } else {
    existingProducts.push({
      name: product.name,
      price: product.price,
      count: 1,
      addedToCart: true
    });
  }
  product.addedToCart = true;
  cookies.set('cookie', JSON.stringify(existingProducts), expireTimes);
  cardStore.products = existingProducts;
  cardStore.volume = existingProducts.length;
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
