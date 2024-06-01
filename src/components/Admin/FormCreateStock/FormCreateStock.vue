<template>
  <form @submit.prevent="createProduct">
    <label for="image">Зображення</label>
    <div v-if="imageUrl" class="image-preview">
      <img :src="imageUrl" alt="Uploaded Image" class="uploaded-image" />
    </div>
    <div v-else class="addImageBlock" @click="triggerFileInput">
      <create-plus-icon></create-plus-icon>
      <input type="file" ref="fileInput" @change="handleFileUpload" style="display: none;" />
    </div>


    <label for="product_id">Продукт</label>
    <select v-model="formData.product_id" id="product_id" class="text-area text-area-fixed" required>
      <option disabled value="">Виберіть продукт</option>
      <optgroup v-for="category in filteredProducts" :label="category.title" :key="category.id">
        <option v-for="product in category.list" :value="product.id" :key="product.id">
          {{ product.name }} (id:{{ product.id }})
        </option>
      </optgroup>
    </select>

    <div class="price-block">
      <button type="submit" class="btn-save">Зберегти</button>
    </div>
  </form>
  <modal-window :isVisible="errorVal" @update:isVisible="errorVal = $event">
    <h2>Помилка!</h2>
    <p>Сталася помилка під час створення продукту. Будь ласка, спробуйте знову.</p>
  </modal-window>
</template>


<script setup>
import { onMounted, ref, computed, watch } from "vue";
import axios from 'axios';
import CreatePlusIcon from "@/components/Admin/FormCreate/icons/CreatePlusIcon.vue";
import router from "@/router/index.js";
import { useAdmin } from "@/stores/AdminStore.js";
import ModalWindow from "@/components/Admin/ModalWindow/ModalWindow.vue";
const dataProduct = ref({ list: [] });
const formData = ref({
  image: null,
  discount: '',
  product_id: ''
});
const products = ref([]);
const stocks = ref([]);
const message = ref(false);
const token = localStorage.getItem('accessToken');
const adminStore = useAdmin();
const errorVal = ref(false);
const clearForm = () => {
  formData.value.discount = '';
  formData.value.image = null;
  formData.value.product_id = '';
  imageUrl.value = null;
};

const fileInput = ref(null);
const imageUrl = ref(null);
const triggerFileInput = () => {
  fileInput.value.click();
};

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    formData.value.image = file;
    imageUrl.value = URL.createObjectURL(file);
  }
};

const createProduct = async () => {
  try {
    const form = new FormData();
    form.append('discount', formData.value.discount);
    form.append('product_id', formData.value.product_id);
    if (formData.value.image) {
      form.append('imageFile', formData.value.image);
    }

    const response = await axios.post('/insert-stocks', form, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.data.error === false && response.data) {
      clearForm();
      message.value = true;
      adminStore.counter++;
      console.log("stock create");
    } else {
      if (response.data.error === true) {
        errorVal.value = true;
        clearForm();
        console.log(errorVal.value);
      } else {
        errorVal.value = true;
        clearForm();
      }
      console.log(errorVal.value);
      clearForm();
    }
  } catch (error) {
    console.error('Error creating item:', error);
    clearForm();
  }
};

const loadProducts = async () => {
  try {
    if (!token) {
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
    dataProduct.value = response.data;

    products.value = dataProduct.value.products.map((category) => ({
      id: category.category_id,
      title: category.title,
      list: category.products.map((product) => ({
        id: product.product_id,
        name: product.title,
      }))
    }));
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        localStorage.setItem('accessToken', '');
        console.error('Ошибка 401: Не авторизован');
      } else {
        console.error('Произошла ошибка при выполнении запроса:', error.response.status, error.response.data);
      }
    } else {
      console.error('Произошла ошибка при выполнении запроса:', error.message);
    }
  }
};

const loadStocks = async () => {
  try {
    const response = await axios.get('/get-stocks', {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      mode: 'cors'
    });

    if (response.data.stocks) {
      stocks.value = response.data.stocks.map(stock => stock.stocks.product_id);
    } else {
      console.error('Error fetching stocks');
    }
  } catch (error) {
    console.error('Failed to fetch stocks:', error);
  }
};

const filteredProducts = computed(() => {
  const stockProductIds = new Set(stocks.value);
  return products.value.map(category => ({
    ...category,
    list: category.list.filter(product => !stockProductIds.has(product.id))
  }));
});
watch(() => adminStore.counter, async (newValue, oldValue) => {
  if (newValue !== oldValue) {
    await loadStocks();
  }
});
onMounted(async () => {
  await Promise.all([loadProducts(), loadStocks(),]);
});

</script>



<style lang="scss" src="./FormCreateStock.scss" scoped></style>
