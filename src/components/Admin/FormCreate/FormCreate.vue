<template>
  <form @submit.prevent="createProduct">
    <label for="image">Изображение</label>
    <div v-if="imageUrl" class="image-preview">
      <img :src="imageUrl" alt="Uploaded Image" class="uploaded-image" />
    </div>
    <div v-else class="addImageBlock" @click="triggerFileInput">
      <create-plus-icon></create-plus-icon>
      <input type="file" ref="fileInput" @change="handleFileUpload" style="display: none;" />
    </div>

    <label for="title">Название</label>
    <create-update-input v-model="formData.title" id="title" type="text" required></create-update-input>

    <label for="description">Описание</label>
    <textarea v-model="formData.description" id="description" class="text-area text-area-fixed" required></textarea>

    <label for="price">Цена</label>
    <create-update-input v-model="formData.price" id="price" type="text" required></create-update-input>

    <div class="price-block">
      <button type="submit" class="btn-save">Сохранить</button>
    </div>
  </form>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from 'axios';
import CreateUpdateInput from "@/components/Admin/CreateUpdate/CreateUpdateInput.vue";
import CreatePlusIcon from "@/components/Admin/FormCreate/icons/CreatePlusIcon.vue";

const emits = defineEmits(['productAdded']);
const formData = ref({
  image: null,
  title: '',
  description: '',
  price: '',
  category_id: null
});
const message = ref(false);
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
        'Content-Type': 'multipart/form-data'
      }
    });

    if (response.data.error === false && response.data) {
      emits('productAdded', response.data);
      clearForm();
      message.value = true;
    } else {
      console.error('Product creation failed:', response.data);
    }
  } catch (error) {
    console.error('Error creating item:', error);
  }
};

const props = defineProps(['categoryId']);
onMounted(() => {
  formData.value.category_id = props.categoryId;
});
</script>

<style lang="scss" src="./FormCreate.scss" scoped></style>
