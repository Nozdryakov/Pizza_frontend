<template>
  <div class="card">
    <main-container>
      <head-title>Корзина</head-title>
      <ul class="card-list">
        <li v-for="(product, index) in products" :key="index">
          <div class="name-product">
            <img  src="@/assets/images/image-default.png" class="card-img" />
            <p class="title">{{ product.name }}</p>
          </div>
          <div class="sum-product">
            <minus-icon class="change-icon" @click="minusProduct(product)"></minus-icon>
            <span>{{ product.count }}</span>
            <plus-icon class="change-icon" @click="plusProduct(product)"></plus-icon>
          </div>
          <div class="info-product">
            <h3>{{ (parseFloat(product.price) * product.count).toFixed(2) }} грн.</h3>
            <delete-icon class="crutch"></delete-icon>
          </div>
          <delete-icon class="delete-icon" @click="DeleteProduct(product.name)"></delete-icon>
        </li>
      </ul>
      <div class="price-block">
        <h4>Итого: </h4>
        <h2>{{ (parseFloat(totalCost).toFixed(2)) }}</h2>
      </div>

<!--      <card-icon class="card-icon"></card-icon>-->
    </main-container>
  </div>
</template>

<script setup>
import { useCard } from "@/stores/CardStore.js";
import { ref, watch, watchEffect } from "vue";
import { useCookies } from "vue3-cookies";
import CardIcon from "@/components/Card/CardProduct/icons/CardIcon.vue";
import MainContainer from "@/components/Container/MainContainer.vue";
import PlusIcon from "@/components/Card/CardProduct/icons/PlusIcon.vue";
import MinusIcon from "@/components/Card/CardProduct/icons/MinusIcon.vue";
import DeleteIcon from "@/components/Card/CardProduct/icons/DeleteIcon.vue";
import HeadTitle from "@/components/HeadTitle/HeadTitle.vue";

const { cookies } = useCookies();

const cardStore = useCard();
const totalCost = ref(cookies.get('totalCost') || 0);

const products = ref([]);

watchEffect(() => {
  const raw = cookies.get("cookie");
  const jsonArray = raw ? JSON.parse(raw) : [];
  products.value = jsonArray.map(item => ({
    name: item.name,
    price: parseFloat(item.price).toFixed(2),
    count: item.count || 1,
  }));

  cookies.set("cookie", JSON.stringify(products.value));

  if (cardStore) {
    cardStore.products = products.value;
    cardStore.volume = jsonArray.length;
  }
});

// Конфиг для настройик жизни куки
const config = {
  current_default_config: {
    expireTimes: "4h",
    path: "; path=/",
    secure: false,
  }
};

const expireTimes = config.current_default_config.expireTimes;
const DeleteProduct = (productName) => {
  const index = products.value.findIndex(item => item.name === productName);
  if (index !== -1) {
    products.value.splice(index, 1);
    cardStore.volume--;
    cookies.set('cookie', JSON.stringify(products.value), expireTimes);
    calculateTotalCost();
  }
};

const minusProduct = (product) => {
  if (product.count > 1) {
    product.count--;
    updateCookie();
  }
};

const plusProduct = (product) => {
  product.count++;
  updateCookie();
};


const updateCookie = () => {
  cookies.set('cookie', JSON.stringify(products.value));
};

function calculateTotalCost() {
  const totalCostValue = products.value.reduce((total, product) => total + (product.price * product.count), 0);
  totalCost.value = totalCostValue;
  cookies.set('totalCost', totalCostValue.toString());
}
watch(totalCost, (newValue) => {
  cardStore.total = newValue;
});
watch(products, calculateTotalCost, { deep: true });
</script>


<style lang="scss" src="./CardProduct.scss" scoped>

</style>
