<template>
  <div>
    <title-admin>Меню</title-admin>
    <subtitle-admin>Добавляйте новые варианты меню, удаляйте или меняйте уже имеющиеся</subtitle-admin>
    <div class="tabs-content">
      <div v-for="(category, index) in data.list" :key="index">
        <h2 class="title">{{ category.title }}</h2>
        <ul class="product">
          <form-create :categoryId="category.id" @productAdded="handleProductAdded"></form-create>
          <li v-for="(product, i) in category.list" :key="i" class="product__item">
            <span>{{product.id}}</span>
            <img :src="`/src/assets/images/products/${product.image}`" alt="" class="tab-img" />
            <div class="title">{{ product.name }}</div>
            <div class="subtitle">{{ product.description }}</div>
            <div class="buy__block">
              <p class="price">{{ product.price }} ₴</p>
<!--              <button class="btn-buy">-->
                <button class="btn-delete" @click="deleteProduct(product.id)">delete</button>
<!--              </button>-->
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>


<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import SubtitleAdmin from "@/components/Admin/SubtitleAdmin/SubtitleAdmin.vue";
import TitleAdmin from "@/components/Admin/TitleAdmin/TitleAdmin.vue";
import FormCreate from "@/components/Admin/FormCreate/FormCreate.vue";

const data = ref({
  list: []
});
const dateDelete = ref({});

onMounted(async () => {
  try {
    // Запрос к API для получения данных о продуктах
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
      list: category.products.map((product) => ({
        id: product.product_id,
        image: product.image,
        name: product.title,
        description: product.description,
        price: parseFloat(product.price).toFixed(2),
      }))
    }));


  } catch (error) {
    console.error('Произошла ошибка при выполнении запроса:', error);
  }
});
const handleProductAdded = (newProduct) => {
  const categoryId = newProduct.category_id;
  const categoryIndex = data.value.list.findIndex(category => category.id === categoryId);
  console.log(categoryIndex);
  if (categoryIndex !== -1) {
    data.value.list[categoryIndex].list.push({
      image: newProduct.image,
      name: newProduct.title,
      description: newProduct.description,
      price: parseFloat(newProduct.price).toFixed(2),
    });
  }
};
const deleteProduct = async (productId) => {
  try {
    const response = await axios.delete('/delete-product', {
      data: { product_id: productId }, // Передача данных в теле запроса
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      mode: 'cors'
    });

    console.log(`Product with ID ${productId} has been deleted.`);
    console.log(response.data);

    // Удаление продукта из локального состояния
    data.value.list.forEach((category) => {
      category.list = category.list.filter((product) => product.id !== productId);
    });

  } catch (error) {
    console.error('Error deleting product:', error);
  }
};

</script>

<style lang="scss" src="./CrudProduct.scss" scoped>

</style>
