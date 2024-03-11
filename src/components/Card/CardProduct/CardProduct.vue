<template>
  <div class="card">
    <h2>Названия продуктов:</h2>
    <ul>
      <li v-for="(productName, index) in uniqueProductNames" :key="index">
        {{ productName }} <span>х{{ productCounts[productName] }}</span>
        <button @click="DeleteProduct(productName)">Удалить</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useCard } from "@/stores/CardStore.js";
import { computed, ref, watchEffect } from "vue";
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

const cardStore = useCard();


const products = ref([]);
const productCounts = computed(() => {
  const counts = {};
  for (const product of products.value) {
    if (counts[product.name]) {
      counts[product.name]++;
    } else {
      counts[product.name] = 1;
    }
  }
  return counts;
});
const uniqueProductNames = computed(() => {
  return Object.keys(productCounts.value);
});
watchEffect(() => {
  const raw = cookies.get("cookie");
  const jsonArray = raw ? JSON.parse(raw) : [];
  products.value = jsonArray.map(item => ({
    name: item.name.name,
    description: item.name.description,
    price: item.name.price,
    volume: item.volume
  }));
  cardStore.products = products.value;
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
  }
};

</script>

<style lang="scss" src="./CardProduct.scss" scoped>

</style>
