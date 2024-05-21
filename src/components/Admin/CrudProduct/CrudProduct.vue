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
              <crud-delete-icon class="crud-icon" @click="deleteProduct(product.id)"></crud-delete-icon>
            </div>
            <div v-if="!(editingProductId === product.id && isEditing)" class="info-product">
              <img :src="`http://localhost:8000/images/products/${product.image}`" alt="" class="tab-img" />
              <div class="title">{{ product.name }}</div>
              <div class="subtitle">{{ product.description }}</div>
              <div class="buy__block">
                <p class="price">{{ product.price }} ₴</p>
              </div>
            </div>
            <div v-else>
              <div v-if="product.image" class="image-preview" @click="getFile">
                <img :src="`http://localhost:8000/images/products/${product.image}`" alt="" class="tab-img" />
                <input type="file" id="fileUpload" style="display: none;" @change="handleFileChange($event)" />
              </div>
              <div v-else class="addImageBlock" @click="getFile">
                <create-plus-icon></create-plus-icon>
                <input type="file" id="fileUpload" style="display: none;" @change="handleFileChange($event)" />
              </div>
              <label for="title">Название</label>
              <create-update-input v-model="product.name" id="title" type="text" required></create-update-input>

              <label for="description">Описание</label>
              <textarea v-model="product.description" id="description" class="text-area text-area-fixed" required></textarea>

              <label for="price">Цена</label>
              <create-update-input v-model="product.price" id="price" type="text" required></create-update-input>
              <button @click="updateProduct(product)" class="btn-save">Сохранить</button>

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
import CreatePlusIcon from "@/components/Admin/FormCreate/icons/CreatePlusIcon.vue";
import CreateUpdateInput from "@/components/Admin/CreateUpdate/CreateUpdateInput.vue";

const data = ref({
  list: []
});
const imageName = ref(null);
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
const handleProductAdded = async (newProduct) => {
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

  } catch (error) {
    console.error('Error deleting product:', error);
  }
};
const editingProductId = ref(null)
const isEditing = ref(false);
const startEditing = (id) => {
  if (isEditing.value) {
    isEditing.value = false;
  } else {
    editingProductId.value = id;
    isEditing.value = true;
  }
};


const updateProduct = async (product) => {
  try {
    const formData = new FormData();
    formData.append('product_id', product.id);
    formData.append('title', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price);
    if (imageName.value) {
      formData.append('imageFile', imageName.value);
    }

    const response = await axios.post('/update-product', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    if (response.data.error === false) {
      isEditing.value = false;

    }
    console.log("succsess");
    await loadData();
  } catch (error) {
    console.error('Ошибка:', error);
  }
};

const getFile = function () {
  let fileUpload = document.getElementById('fileUpload');
  if (fileUpload != null) {
    fileUpload.click();
  }
};

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    imageName.value = file;
  }
};

</script>

<style lang="scss" src="./CrudProduct.scss" scoped>

</style>
