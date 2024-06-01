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
    {{errorVal.error}}
    <label for="title">Назва</label>
    <create-update-input
      v-model="formData.title"
      id="title"
      type="text"
      required
      maxlength="60"
    ></create-update-input>

    <label for="description">Опис</label>
    <textarea
      v-model="formData.description"
      id="description"
      class="text-area text-area-fixed"
      required
      maxlength="500"
    ></textarea>

    <label for="price">Ціна</label>
    <create-update-input
      v-model="formData.price"
      id="price"
      type="text"
      required
      @input="validatePrice"
    ></create-update-input>

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
import { onMounted, ref } from "vue";
import axios from 'axios';
import CreateUpdateInput from "@/components/Admin/CreateUpdate/CreateUpdateInput.vue";
import CreatePlusIcon from "@/components/Admin/FormCreate/icons/CreatePlusIcon.vue";
import ModalWindow from "@/components/Admin/ModalWindow/ModalWindow.vue";
import { useAdmin } from "@/stores/AdminStore.js";

const emits = defineEmits(['productAdded']);
const formData = ref({
  image: null,
  title: '',
  description: '',
  price: '',
  category_id: null
});
const message = ref(false);
const token = localStorage.getItem('accessToken');
const errorVal = ref(false);
const adminStore = useAdmin();
const clearForm = () => {
  formData.value.title = '';
  formData.value.description = '';
  formData.value.price = '';
  formData.value.image = null;
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

const validatePrice = () => {
  const price = formData.value.price;
  const regex = /^[0-9]*[.,]?[0-9]{0,2}$/;
  if (!regex.test(price) || parseFloat(price) > 9999.99) {
    formData.value.price = price.slice(0, -1);
  }
};

const createProduct = async () => {
  try {
    const form = new FormData();
    form.append('title', formData.value.title);
    form.append('description', formData.value.description);
    form.append('price', formData.value.price);
    form.append('category_id', formData.value.category_id);
    if (formData.value.image) {
      form.append('imageFile', formData.value.image);
    }

    const response = await axios.post('/insert-product', form, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.data.error === false && response.data) {
      emits('productAdded', response.data);
      clearForm();
      message.value = true;
      adminStore.counter++;
    } else {
      console.error('Product creation failed:', response.data);
      errorVal.value = response.data;
      clearForm();
      if(errorVal.value.error === true){
        errorVal.value.error = true;
        console.log(errorVal.value.error);
      }
      else {
        errorVal.value.error = true;
      }
      console.log(errorVal.value.error);

    }
  } catch (error) {
    console.error('Error creating item:', error);
    errorVal.value.error = true;
  }
};

const props = defineProps(['categoryId']);
onMounted(() => {
  formData.value.category_id = props.categoryId;
});
</script>

<style lang="scss" src="./FormCreate.scss" scoped></style>
