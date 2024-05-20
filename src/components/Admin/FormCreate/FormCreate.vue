<template>
  <form @submit.prevent="CreateProduct">
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
    <create-update-input v-model="formData.description" id="description" required></create-update-input>

    <label for="price">Цена</label>
    <create-update-input v-model="formData.price" id="price" type="text" required></create-update-input>
    <button type="submit">Сохранить</button>
  </form>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from 'axios';
import CreateUpdateInput from "@/components/Admin/CreateUpdate/CreateUpdateInput.vue";
import CreatePlusIcon from "@/components/Admin/FormCreate/icons/CreatePlusIcon.vue";
const emits = defineEmits(['productAdded']);
const formData = ref({
  image: '',
  title: '',
  description: '',
  price: '',
  category_id: null
});
const message = ref(false);
const clearForm = () => {
  formData.value.title = '';
  formData.value.description = '';
  formData.value.price = null;
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
    formData.value.image = file.name;
    imageUrl.value = URL.createObjectURL(file);
  }
};
const CreateProduct = async () => {
  try {
    await axios.post('/insert-product', formData.value);
    const newProduct = formData.value;
    emits('productAdded', newProduct);
    clearForm();
    message.value = true;
  } catch (error) {
    console.error('Error creating item:', error);
  }
};
const props = defineProps(['categoryId']);
onMounted(async () => {
  const value  = props.categoryId;
  formData.value.category_id = value;
});

</script>
<style lang="scss" src="./FormCreate.scss" scoped></style>
