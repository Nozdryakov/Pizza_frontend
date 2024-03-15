<template>
  <div class="card">
    <h2>Названия продуктов:</h2>
    <ul>
      <li v-for="(product, index) in products" :key="index">
        {{ product.name }} <span>х{{ product.count }}</span>
        <button @click="minusProduct(product)">Уменьшить</button>
        <button @click="plusProduct(product)">Увеличить</button>
        <button @click="DeleteProduct(product.name)">Удалить</button>
        <h3>{{product.price * product.count}}</h3>
      </li>
    </ul>
    <h2>Общая стоимость: {{ totalCost }}</h2>
  </div>
</template>

<script setup>
import { useCard } from "@/stores/CardStore.js";
import { ref, watch, watchEffect } from "vue";
import { useCookies } from "vue3-cookies";

const { cookies } = useCookies();

const cardStore = useCard();
const totalCost = ref(cookies.get('totalCost') || 0);

const products = ref([]);

watchEffect(() => {
  const raw = cookies.get("cookie");
  const jsonArray = raw ? JSON.parse(raw) : [];
  products.value = jsonArray.map(item => ({
    name: item.name,
    price: item.price,
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
    console.log("product delete");
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
