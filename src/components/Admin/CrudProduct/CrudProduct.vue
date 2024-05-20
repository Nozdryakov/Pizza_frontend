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
            <div class="change__block">
              <crud-update-icon class="crud-icon" @click="startEditing(product.id)" ></crud-update-icon>
              <crud-delete-icon class="crud-icon" @click="deleteProduct(product.id, category.id)"></crud-delete-icon>
            </div>
            <img :src="`/src/assets/images/products/${product.image}`" alt="" class="tab-img" />
            <div class="title">{{ product.name }}</div>
            <div class="subtitle">{{ product.description }}</div>
            <div class="buy__block">
              <p class="price">{{ product.price }} ₴</p>
            </div>
            <div v-if="editingProductId === product.id && isEditing">
              <input v-model="product.name" type="text" />
              <input v-model="product.description" type="text" />
              <input v-model="product.price" type="number" />
              <button @click="updateProduct(product)">Сохранить</button>
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
import CrudDeleteIcon from "@/components/Admin/CrudProduct/icons/CrudDeleteIcon.vue";
import CrudUpdateIcon from "@/components/Admin/CrudProduct/icons/CrudUpdateIcon.vue";

const data = ref({
  list: []
});
const loadData = async () => {
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
};
onMounted(loadData);
const handleProductAdded = async (newProduct) =>  {
  const categoryId = newProduct.category_id;
  console.log(newProduct);

  const category = data.value.list.find(category => category.id === categoryId);

  if (category) {
    category.list.push({
      id: newProduct.id,
      image: newProduct.image,
      name: newProduct.title,
      description: newProduct.description,
      price: parseFloat(newProduct.price).toFixed(2),
    });
  }
  await loadData();
};
const deleteProduct = async (productId) => {
  try {
    await axios.delete('/delete-product', {
      data: { product_id: productId }, // Передача данных в теле запроса
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      mode: 'cors'
    });
    await loadData();
    // const category = data.value.list.find(category => category.id === categoryId);
    // if (category) {
    //   category.list = category.list.filter((product) => product.id !== productId);
    //   console.log(category.list);
    // }

  } catch (error) {
    console.error('Error deleting product:', error);
  }
};
const editingProductId = ref(null)
const isEditing = ref(false);
const startEditing = (id) => {
  console.log(isEditing.value);
  if (isEditing.value) {
    isEditing.value = false;
  } else {
    editingProductId.value = id;
    isEditing.value = true;
  }
};


const updateProduct = async (product) => {
  try {
    const data = {
      product_id: product.id,
      title: product.name,
      description: product.description,
      price: product.price
    };
    await axios.post('/update-product', data);
    console.log('Товар успешно обновлен');
    isEditing.value = false;
  } catch (error) {
    console.error('Ошибка:', error);
  }
};


</script>

<style lang="scss" src="./CrudProduct.scss" scoped>

</style>
