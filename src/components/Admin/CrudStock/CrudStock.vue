<template>
  <div>
    <title-admin>Акції</title-admin>
    <subtitle-admin>Додавайте нові варіанти акцій, видаляйте або змінюйте вже наявні</subtitle-admin>
    <div class="tabs-content">
      <ul class="product">
        <form-create-stock></form-create-stock>
        <div v-for="stock in data.list" :key="stock.stock_id" class="product__item">
          <div class="change__block">
            <crud-update-icon class="crud-icon" @click="startEditing(stock.product_id, stock.discount)"></crud-update-icon>
            <crud-delete-icon class="crud-icon" @click="deleteProduct(product.id)"></crud-delete-icon>
          </div>
          <img class="swiper-img" :src="`st-img/${stock.image_stock}`" />
          {{stock.name}}
          {{stock.discount}}
          {{stock.price}}
          <div v-if="editingProductId === stock.product_id">
<!--            <input type="number" v-model="stock.newDiscount" min="0" max="100" placeholder="Введите скидку от 0 до 100">-->
            <div class="input-block">
              <label for="newDiscount">Процент знижки</label>
              <create-update-input v-model="stock.newDiscount" id="newDiscount" type="text" required></create-update-input>
            </div>
            <button @click="updateProduct(stock.product_id, stock.newDiscount)">Обновить</button>
            <button @click="cancelEditing">Отмена</button>
          </div>
          <button v-else @click="startEditing(stock.product_id, stock.discount)">Изменить</button>
        </div>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import axios from "axios";
import SubtitleAdmin from "@/components/Admin/SubtitleAdmin/SubtitleAdmin.vue";
import TitleAdmin from "@/components/Admin/TitleAdmin/TitleAdmin.vue";
import FormCreateStock from "@/components/Admin/FormCreateStock/FormCreateStock.vue";
import { useAdmin } from "@/stores/AdminStore.js";
import CrudUpdateIcon from "@/components/Admin/CrudProduct/icons/CrudUpdateIcon.vue";
import CrudDeleteIcon from "@/components/Admin/CrudProduct/icons/CrudDeleteIcon.vue";
import CreateUpdateInput from "@/components/Admin/CreateUpdate/CreateUpdateInput.vue";

const data = ref({
  list: []
});
const token = localStorage.getItem('accessToken');
const editingProductId = ref(null);
const adminStore = useAdmin();
const fetchStocks = async () => {
  try {
    const response = await axios.get('/get-stocks-admin', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*'
      },
      mode: 'cors'
    });

    if (response.data.stocks) {
      data.value.list = response.data.stocks.map(stock => ({
        name: stock.title,
        visible: stock.visible,
        stock_id: stock.stocks.stock_id,
        image_stock: stock.stocks.image,
        image: stock.image,
        price: parseFloat(stock.price).toFixed(2),
        discount: stock.stocks.discount,
        product_id: stock.stocks.product_id,
        newDiscount: ''
      }));
    } else {
      console.error('error');
    }
  } catch (error) {
    console.error('Failed to fetch stocks:', error);
  }
};

onMounted(() => {
  fetchStocks();
});

watch(() => adminStore.counter, async (newValue, oldValue) => {
  if (newValue !== oldValue) {
    await fetchStocks();
  }
});
const startEditing = (product_id, currentDiscount) => {
  editingProductId.value = product_id;
  const stock = data.value.list.find(stock => stock.product_id === product_id);
  if (stock) {
    stock.newDiscount = currentDiscount;
  }
};

const cancelEditing = () => {
  editingProductId.value = null;
};

const updateProduct = async (product_id, newDiscount) => {
  try {
    await axios.post('/update-price', {
      product_id,
      discount: newDiscount
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    editingProductId.value = null;
    adminStore.counter++;
  } catch (error) {
    console.error('Failed to update product:', error);
  }
};

</script>

<style lang="scss" src="./CrudStock.scss" scoped>
</style>
