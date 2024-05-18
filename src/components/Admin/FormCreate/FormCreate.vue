<template>
  <form @submit.prevent="CreateProduct">
    <label for="title">Название</label>
    <create-update-input v-model="formData.title" id="title" type="text" required></create-update-input>

    <label for="description">Описание</label>
    <create-update-input v-model="formData.description" id="description" required></create-update-input>

    <label for="price">Цена</label>
    <create-update-input v-model="formData.price" id="price" type="text" required></create-update-input>
    <button type="submit">Сохранить</button>
    <h1>{{message}}</h1>
  </form>
</template>

<script setup>
import { onMounted, ref  } from "vue";
import axios from 'axios';
import CreateUpdateInput from "@/components/Admin/CreateUpdate/CreateUpdateInput.vue";
const emits = defineEmits(['productAdded']);
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
};
const CreateProduct = async () => {
  try {
    const response = await axios.post('/insert-product', formData.value);
    console.log('Item created successfully:', response.data);
    const newProduct = formData.value;
    emits('productAdded', newProduct);
    // console.log(emits('productAdded', newProduct));
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
