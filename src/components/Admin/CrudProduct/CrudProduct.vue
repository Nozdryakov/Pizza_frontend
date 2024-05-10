<template>
  <div class="card text-center m-3">
    <button @click="fetchData">Выполнить запрос</button>
    <h3 v-if="success">Запрос выполнен успешно{{success}}</h3>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const result = ref({});
const success = ref(false);

const fetchData = async () => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: "hello-t",
      description: "hello-d",
      price: 21,
      category_id: 1
    })
  };

  try {
    const response = await fetch('/insert-product', requestOptions);
    const data = await response.json();
    result.value = data;
    success.value = true;
    console.log(result.value);
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
  }
};
</script>
