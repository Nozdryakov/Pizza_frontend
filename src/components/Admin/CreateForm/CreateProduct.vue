<template>
  <title-admin>Меню</title-admin>
  <subtitle-admin>Добавляйте новые варинаты меню, удаляйте или меняйте уже имеющиеся</subtitle-admin>
  <form-create @submit.prevent="CreateProduct">
    <label for="title">Название</label>
    <create-update-input v-model="formData.title" id="title" type="text" required></create-update-input>

    <label for="description">Описание</label>
    <create-update-input v-model="formData.description" id="description" required></create-update-input>

    <label for="price">Цена</label>
    <create-update-input v-model="formData.price" id="price" type="text" required></create-update-input>

    <label for="category">Category ID:</label>
    <input v-model.number="formData.category_id" id="category" type="number" required>

    <button type="submit">Сохранить</button>
  </form-create>
  <h1 v-if="message">Запись сохранена успешно!</h1>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import FormCreate from "@/components/Admin/FormCreate/FormCreate.vue";
import CreateUpdateInput from "@/components/Admin/CreateUpdate/CreateUpdateInput.vue";
import TitleAdmin from "@/components/Admin/TitleAdmin/TitleAdmin.vue";
import SubtitleAdmin from "@/components/Admin/SubtitleAdmin/SubtitleAdmin.vue";

const formData = ref({
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
  formData.value.category_id = null;
};
const CreateProduct = async () => {
  try {
    const response = await axios.post('/insert-product', formData.value);
    console.log('Item created successfully:', response.data);
    clearForm();
    message.value = true;
  } catch (error) {
    console.error('Error creating item:', error);
    // Обработка ошибки, например, показ сообщения об ошибке пользователю
  }
};
</script>
