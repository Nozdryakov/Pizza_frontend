<template>
  <div v-if="messageAuth === ''">
    <title-admin>Продукція</title-admin>
    <subtitle-admin>Додавайте нові варіанти, видаляйте або змінюйте вже наявні</subtitle-admin>
    <div class="tabs-content">
      <div v-for="(category, index) in data.list" :key="index">
        <h2 class="title">{{ category.title }}</h2>
        <ul class="product">
          <form-create :categoryId="category.id" @productAdded="handleProductAdded"></form-create>
          <li v-for="(product, i) in category.list" :key="i" class="product__item">
            <div class="change__block">
              <crud-update-icon class="crud-icon" @click="startEditing(product.id, product.image)"></crud-update-icon>
              <crud-delete-icon class="crud-icon" @click="deleteProduct(product.id)"></crud-delete-icon>
            </div>
            <div v-if="!(editingProductId === product.id && isEditing)" class="info-product">
              <div v-if="product.image === null || product.image === '' || product.image === 'null'" class="addImageBlock" @click="startEditing(product.id, product.image)">
              </div>
              <div v-else  class="img-block" @click="startEditing(product.id, product.image)">
                <img :src="`images/${product.image}`" alt="" class="tab-img"/>
              </div>
              <div class="title">{{ product.name }}</div>
              <div class="subtitle">{{ product.description }}</div>
              <div class="buy__block">
                <p class="price">{{ product.price }} ₴</p>
              </div>
              <div class="block-visible">
                <div class="visible__item">
                  <label class="radio-button">
                    <input class="input" type="radio" :name="'visible-' + product.id" :id="'yes-' + product.id" v-model="product.visible" :value="1" @change="updateVisibility(product.id, 1)" :checked="product.visible == 1">
                    <span class="radio"></span>
                  </label>
                  <p class="visible-title">Показати</p>
                </div>
                <div class="visible__item">
                  <label class="radio-button">
                    <input class="input" type="radio" :name="'visible-' + product.id" :id="'no-' + product.id" v-model="product.visible" :value="0" @change="updateVisibility(product.id, 0)" :checked="product.visible == 0">
                    <span class="radio"></span>
                  </label>
                  <p class="visible-title">Сховати</p>
                </div>
              </div>
            </div>
            <div v-else>
              <div v-if="product.image" class="image-preview" @click="getFile">
                <div class="img-block" @click="startEditing(product.id, product.image)">
                  <img :src="`images/${product.image}`" alt="" class="tab-img" />
                </div>
                <div class="download-overlay">
                  <input type="file" id="fileUpload" style="display: none;" @change="handleFileChange($event)" />
                  <div class="block-download">Завантажити</div>
                </div>
              </div>
              <div v-else class="addImageBlock" @click="getFile">
                <create-plus-icon></create-plus-icon>
                <input type="file" id="fileUpload" style="display: none;" @change="handleFileChange($event)" />
              </div>
              <div v-if="imageUrl" class="image-preview" @click="getFile">
                <label for="image">Зображення</label>
                <img :src="imageUrl" alt="Uploaded Image" class="uploaded-image" />
                <input type="file" id="fileUpload" style="display: none;" @change="handleFileChange($event)" />
              </div>
              <div class="input-block">
                <label for="title">Назва</label>
                <title-error>{{nameError}}</title-error>
                <create-update-input v-model="product.name" id="title" type="text" required :error="nameError" @input="() => validateName(product.name)"></create-update-input>
              </div>

              <div class="input-block">
                <label for="description">Опис</label>
                <title-error>{{descriptionError}}</title-error>
                <textarea v-model="product.description" id="description" class="text-area text-area-fixed" required @input="() => validateDescription(product.description)"></textarea>
              </div>

              <div class="input-block">
                <label for="price">Ціна</label>
                <title-error>{{priceError}}</title-error>
                <create-update-input v-model="product.price" id="price" type="text" required @input="() => validatePrice(product.price)"></create-update-input>
                <button @click="updateProduct(product)" class="btn-save">Зберегти</button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div v-else>
    {{messageAuth}}<br>
    <router-link to="/login">Авторизуватися</router-link>
  </div>
  <modal-window :isVisible="errorVal" @update:isVisible="errorVal = $event">
    <h2>Помилка!</h2>
    <p>Сталася помилка під час створення продукту. Будь ласка, спробуйте знову.</p>
  </modal-window>
</template>



<script setup>
import { onMounted, ref, watch } from "vue";
import axios from "axios";
import SubtitleAdmin from "@/components/Admin/SubtitleAdmin/SubtitleAdmin.vue";
import TitleAdmin from "@/components/Admin/TitleAdmin/TitleAdmin.vue";
import FormCreate from "@/components/Admin/FormCreate/FormCreate.vue";
import CrudDeleteIcon from "@/components/Admin/CrudProduct/icons/CrudDeleteIcon.vue";
import CrudUpdateIcon from "@/components/Admin/CrudProduct/icons/CrudUpdateIcon.vue";
import CreatePlusIcon from "@/components/Admin/FormCreate/icons/CreatePlusIcon.vue";
import CreateUpdateInput from "@/components/Admin/CreateUpdate/CreateUpdateInput.vue";
import router from "@/router/index.js";
import { useAdmin } from "@/stores/AdminStore.js";
import ModalWindow from "@/components/Admin/ModalWindow/ModalWindow.vue";
import TitleError from "@/components/TitleError/TitleError.vue";

const data = ref({
  list: []
});
const messageAuth = ref('');
const token = localStorage.getItem('accessToken');
const imageName = ref(null);
const adminStore = useAdmin();
const imageDefault = ref(null);
const errorVal = ref(false);
const nameError = ref('');
const descriptionError = ref('');
const priceError = ref('');

const validatePrice = (price) => {
  const regex = /^[0-9]*[.,]?[0-9]{0,2}$/;
  if (price === ''){
    priceError.value = "*Поле обов'язкове";
    return false;
  }
  else if (!regex.test(price) || parseFloat(price) > 9999.99) {
    if (!regex.test(price)) {
      priceError.value = 'Неправильний формат ціни';
    } else {
      priceError.value = 'Ціна не повинна перевищувати 9999.99';
    }
    return false;
  } else {
    priceError.value = '';
    return true;
  }
};

const validateName = (name) => {
  const nameRegex = /^[a-zA-Z0-9\sА-Яа-яҐґЄєІіЇї]{1,30}$/;
  if (name === '') {
    nameError.value = "*Поле обов'язкове";
    return false;
  } else if (!nameRegex.test(name)) {
    nameError.value = 'Назва має містити від 1 до 30 символів (тільки букви, цифри та пробіли)';
    return false;
  } else {
    nameError.value = '';
    return true;
  }
};

const validateDescription = (description) => {
  console.log(description);
  const descriptionRegex = /^[a-zA-Z0-9\sА-Яа-яҐґЄєІіЇї]{1,100}$/;
  if (description === '') {
    descriptionError.value = "*Поле обов'язкове";
  } else if (!descriptionRegex.test(description)) {
    descriptionError.value = 'Опис має містити від 1 до 100 символів (тільки букви, цифри та пробіли)';
  } else {
    descriptionError.value = '';
  }
};
const loadData = async () => {
  try {
    if (!token){
      router.push('/login');
    }
    const response = await axios.get('/get-products-admin', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
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
        visible: product.visible,
        description: product.description,
        price: parseFloat(product.price).toFixed(2),
      }))
    }));
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        console.error('Ошибка 401: Не авторизован');

        messageAuth.value = "З метою безпеки вам потрібно увійти в акаунт наново.";
      } else {
        messageAuth.value = "Зверніться до адміністратора сайту";
        console.error('Произошла ошибка при выполнении запроса:', error.response.status, error.response.data);
      }
    } else {
      console.error('Произошла ошибка при выполнении запроса:', error.message);
    }
  }
};

onMounted(loadData);

watch(() => adminStore.counter, async (newValue, oldValue) => {
  if (newValue !== oldValue) {
    await loadData();
  }
});

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
      data: { product_id: productId },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*'
      },
      mode: 'cors'
    });
    adminStore.counter++;
    await loadData();
  } catch (error) {
    console.error('Error deleting product:', error);
  }
};

const editingProductId = ref(null);
const isEditing = ref(false);

const startEditing = (id, image) => {
  if (isEditing.value) {
    isEditing.value = false;
    console.log(imageDefault.value);
  } else {
    editingProductId.value = id;
    imageDefault.value = image;
    console.log(imageDefault.value);
    isEditing.value = true;
  }
};

const updateProduct = async (product) => {
  if (nameError.value || descriptionError.value || priceError.value !== '') {
    errorVal.value = true;
    return;
  }
  try {
    const formData = new FormData();
    formData.append('product_id', product.id);
    formData.append('title', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price);

    if (imageName.value) {
      formData.append('imageFile', imageName.value);
      formData.append('image', "");
    }
    else {
      formData.append('image', imageDefault.value);
    }

    const response = await axios.post('/update-product', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.data.error === true) {
      isEditing.value = false;
      errorVal.value = true;
      imageUrl.value = '';
    }
    else {
      adminStore.counter++;
      isEditing.value = false;
      imageUrl.value = '';
      await loadData();
    }

  } catch (error) {
    console.error('Ошибка:', error);
    imageUrl.value = '';
  }
};

const getFile = function () {
  let fileUpload = document.getElementById('fileUpload');
  if (fileUpload != null) {
    fileUpload.click();
  }
};

const imageUrl = ref(null);

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    imageName.value = file;
    imageUrl.value = URL.createObjectURL(file);
  }
};

const updateVisibility = async (productId, visible) => {
  try {
    await axios.post('/update-visible', {
      product_id: productId,
      visible: visible
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*'
      }
    });
    await loadData();
  } catch (error) {
    console.error('Error updating visibility:', error);
  }
};


</script>


<style lang="scss" src="./CrudProduct.scss" scoped>

</style>
