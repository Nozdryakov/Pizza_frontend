<template>
  <main-container>
    <div class="header-admin">
      <router-link to="/kitchen" class="title-admin">Кур'єр</router-link>
      <div class="logout" @click="logout">Вийти з акаунта</div>
    </div>
    Незареєстровані:
    <div class="orders-list">
      <div v-for="order in orders" :key="order.phoneNumber" class="order-item">
        <p class="name-order">{{order.nameUser}}</p>
        <div class="subtitle-order-block">
          <p class="subtitle-order">{{ order.phoneNumber }}</p>
          <p class="subtitle-order">Загальна сума: {{ order.total_cost }} грн</p>
          <ul class="subtitle-order">
            <li v-for="product in order.products" :key="product.title" class="product-item">
              {{ product.title }} - {{ product.count }}
            </li>
          </ul>
        </div>
        <div class="status-btns">
          <button class="status" v-if="order.courier_accsess == 1">Прийнято</button>
          <button class="status red" v-else-if="order.courier_accsess == 0">Відхилено</button>
          <div class="block-btn" v-else>
            <button class="btn" @click="refuseOrder(order.phoneNumber)">Відхилити</button>
            <button class="btn" @click="acceptOrder(order.phoneNumber)">Прийняти</button>
          </div>
        </div>
      </div>
    </div>
    Зареєстровані:
    <div class="orders-list">
      <div v-for="order in ordersUsers" :key="order.phoneNumber" class="order-item">
        <p class="name-order">{{order.nameUser}}</p>
        <div class="subtitle-order-block">
          <p class="subtitle-order">{{ order.phoneNumber }}</p>
          <p class="subtitle-order">Загальна сума: {{ order.total_cost }} грн</p>
          <ul class="subtitle-order">
            <li v-for="product in order.products" :key="product.title" class="product-item">
              {{ product.title }} - {{ product.count }}
            </li>
          </ul>
        </div>
        <div class="status-btns">
          <button class="status" v-if="order.courier_accsess == 1">Прийнято</button>
          <button class="status red" v-else-if="order.courier_accsess == 0">Відхилено</button>
          <div class="block-btn" v-else>
            <button class="btn" @click="refuseOrder(order.phoneNumber)">Відхилити</button>
            <button class="btn" @click="acceptOrder(order.phoneNumber)">Прийняти</button>
          </div>
        </div>
      </div>
    </div>
  </main-container>
</template>

<script setup>
import MainContainer from "@/components/Container/MainContainer.vue";
import router from "@/router/index.js";
import axios from "axios";
import { ref, onMounted } from "vue";

const logout = () => {
  localStorage.setItem('accessToken', '');
  router.push('/login');
};

const orders = ref([]);
const ordersUsers = ref([]);


async function loadOrdersUsers() {
  try {
    const response = await axios.get('/get-order-user-courier');
    ordersUsers.value = response.data.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
  }
}

async function loadOrders() {
  try {
    const response = await axios.get('/get-order-guest-courier');
    orders.value = response.data.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
  }
}

const acceptOrder = async (phoneNumber) => {
  try {
    const response = await axios.post('/courier-access', { phoneNumber });
    if (!response.data.error && response.data.updated) {
      console.log('Order accepted successfully');
      await loadOrders();
      await loadOrdersUsers();
    } else {
      // Handle error, e.g., show an error message
      console.error(response.data.message);
    }
  } catch (error) {
    console.error('Error accepting order:', error);
  }
};
const refuseOrder = async (phoneNumber) => {
  try {
    const response = await axios.post('/courier-access-zero', { phoneNumber });
    if (!response.data.error && response.data.updated) {
      console.log('Order refuse successfully');
      await loadOrders();
      await loadOrdersUsers();
    } else {

      console.error(response.data.message);
    }
  } catch (error) {
    console.error('Error accepting order:', error);
  }
};

onMounted(() => {
  loadOrders();
  loadOrdersUsers();
});

</script>

<style lang="scss" scoped>
.block-btn{
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
}
.status-btns{
  margin-top: auto;
}
.status{
  border: none;
  font-size: 14px;
  padding: 6px 16px;
  width: 100%;
  background-color: #8AED8E;
  color: #121010;
  text-decoration: none;
  font-family: "Inter-500", serif;
  letter-spacing: 0.5px;
  cursor: pointer;
  border-radius: 23px;
  margin-top: 20px;
}
.red{
  background-color: #ff1313;
  color: white;
}
.btn{
  border: none;
  font-size: 14px;
  padding: 6px 16px;
  background-color: #ff1313;
  color: white;
  text-decoration: none;
  font-family: "Inter-500", serif;
  letter-spacing: 0.5px;
  cursor: pointer;
  border-radius: 23px;
  &:last-child{
    background-color: #8AED8E;
    color: #121010;
  }
}
.main-container {
  font-family: "Raleway", sans-serif;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.title-admin {
  font-size: 48px;
  text-align: center;
  margin-bottom: 30px;
  text-decoration: none;
  color: #121010;
}

.header-admin {
  display: flex;
  margin-top: 100px;
  margin-bottom: 115px;
  align-items: center;
  justify-content: space-between;
  font-family: "Raleway-700", serif;
}

.subtitle-admin {
  font-size: 20px;
  color: #2F70AF;
  text-decoration: none;
  transition: color 0.3s ease;
}

.subtitle-admin:hover {
  color: #1E4E8C;
}

.logout {
  font-size: 18px;
  color: #2F70AF;
  cursor: pointer;
  transition: color 0.3s ease;
}

.logout:hover {
  color: #1E4E8C;
}

.orders-list {
  width: 100%;
  border-radius: 10px;
  font-family: "Raleway-600", serif;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.orders-list:after {
  content: '';
  flex: auto;
  min-width: 250px;
}

.order-item {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  width: 25%;
  padding: 35px;
  position: relative;
  cursor: pointer;
  margin-bottom: 30px;
  margin-left: 10px;
}

.order-item h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

.total-price {
  font-size: 16px;
  margin-bottom: 8px;
}

.products-list {
  list-style-type: none;
  padding: 0;
}

.product-item {
  font-size: 14px;
  color: #666;
}
.name-order{
  color: #121010;
  font-size: 22px;
  font-family: "Raleway-700", serif;

}
.subtitle-order-block{
  margin-top: 25px;
  font-size: 16px;
  font-family: "Raleway-500", serif;
  color: #3D3D3D;
}
.subtitle-order{
  margin-top: 10px;
}
@media (max-width: 768px) {
  .title-admin {
    font-size: 36px;
  }
}
</style>
