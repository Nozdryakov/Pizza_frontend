<template>
  <div v-if="messageAuth === ''">
    <title-admin>Акції</title-admin>
    <subtitle-admin>Додавайте нові варіанти акцій, видаляйте або змінюйте вже наявні</subtitle-admin>
    <div class="tabs-content">
      <ul class="product">
        <form-create-stock></form-create-stock>
        <div v-for="stock in data.list" :key="stock.stock_id" class="product__item">
          <div class="change__block">
            <crud-update-icon class="crud-icon" @click="startEditing(stock.product_id)"></crud-update-icon>
            <crud-delete-icon class="crud-icon" @click="deleteProduct(stock.stock_id)"></crud-delete-icon>
          </div>
          <div v-if="!(editingProductId === stock.stock_id && isEditing)" class="info-product">
            <img class="swiper-img" :src="`st-img/${stock.image_stock}`" />
            <div class="title">{{ stock.name }}</div>
            <div class="buy__block">
              <p class="price">{{ stock.discount }} %</p>
              <label>Процент знижки</label>
            </div>
            <div class="buy__block">
              <p class="price">{{ stock.price }} ₴</p>
              <label for="newDiscount">Ціна</label>
            </div>
          </div>
          <div v-else>
            <div v-if="stock.image" class="image-preview" @click="getFile">
              <div class="img-block" @click="startEditing(stock.stock_id)">
                <img :src="`st-img/${stock.image_stock}`" alt="" class="tab-img" />
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
              <label for="newDiscount">Введіть новий процент знижки</label>
              <create-update-input v-model="stock.newDiscount" id="newDiscount" type="text" required></create-update-input>
            </div>
            <div class="edit-btns">
              <button type="button" @click="updateProduct(stock.product_id, stock.newDiscount, stock.stock_id)" class="btn-save">Оновити</button>
              <button @click="cancelEditing" class="btn-save btn-color-blue">Відміна</button>
            </div>
          </div>
          <div v-if="!isEditing" class="input-block">
            <button @click="startEditing(stock.product_id)" class="btn-save">Змінити</button>
          </div>
        </div>
      </ul>
    </div>
  </div>
  <div v-else>
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
import CreatePlusIcon from "@/components/Admin/FormCreate/icons/CreatePlusIcon.vue";

const data = ref({
  list: []
});
const token = localStorage.getItem('accessToken');
const editingProductId = ref(null);
const adminStore = useAdmin();
const messageAuth = ref('');
const isEditing = ref(false);
const imageName = ref(null);
const errorVal = ref(false);
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
      console.log(data.value);
    } else {
      console.error('error');
    }
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


onMounted(() => {
  fetchStocks();
});

watch(() => adminStore.counter, async (newValue, oldValue) => {
  if (newValue !== oldValue) {
    await fetchStocks();
  }
});

const startEditing = (stock_id) => {
  if (isEditing.value) {
    isEditing.value = false;
  } else {
    editingProductId.value = stock_id;
    isEditing.value = true;
  }
};

const cancelEditing = () => {
  editingProductId.value = null;
  isEditing.value = false;
};

const updateProduct = async (product_id, newDiscount, stock_id) => {
  try {
    const formData = new FormData();
    formData.append('product_id', product_id);
    formData.append('stock_id', stock_id);
    formData.append('discount', newDiscount);
    if (imageName.value) {
      formData.append('imageFile', imageName.value);
    }

    const response = await axios.post('/update-stock', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    });

    editingProductId.value = null;
    if (response.data.error === false) {
      isEditing.value = false;
    }
    adminStore.counter++;
  } catch (error) {
    console.error('Failed to update product:', error);
  }
};

const deleteProduct = async (stock_id) => {
  try {
    await axios.delete('/delete-stock', {
      data: { stock_id: stock_id },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*'
      },
      mode: 'cors'
    });
    await fetchStocks();

  } catch (error) {
    console.error('Error deleting product:', error);
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

</script>

<style lang="scss" src="./CrudStock.scss" scoped>
</style>