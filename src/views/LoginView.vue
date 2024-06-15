<template>
  <auth-account-section>
    <auth-content-section>
      <auth-title>Введіть ваш логін і пароль</auth-title>
      <auth-form @submit.prevent="login">
        <auth-input v-model="username" placeholder="Логін"></auth-input>
        <auth-input v-model="password" placeholder="Пароль" type="password"></auth-input>
        <auth-button type="submit">Увійти</auth-button>
      </auth-form>
    </auth-content-section>
    <modal-window :isVisible="errorVal" @update:isVisible="errorVal = $event">
      <h2 class="title__modal">Помилка!</h2>
      <p class="subtitle__modal">Сталася помилка під час авторизації. Будь ласка, спробуйте знову.</p>
    </modal-window>
    <modal-window :isVisible="accsessVal" @update:isVisible="accsessVal = $event">
      <h2 class="title__modal">Авторизація пройшла успішно!</h2>
    </modal-window>
  </auth-account-section>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import AuthForm from '@/components/Auth/AuthForm/AuthForm.vue';
import AuthInput from '@/components/Auth/AuthInput/AuthInput.vue';
import AuthTitle from '@/components/Auth/AuthTitle/AuthTitle.vue';
import AuthButton from '@/components/Auth/AuthButton/AuthButton.vue';
import AuthAccountSection from '@/components/Auth/AuthAccountSection/AuthAccountSection.vue';
import AuthContentSection from '@/components/Auth/AuthContentSection/AuthContentSection.vue';
import AuthRegLogBtn from '@/components/Auth/AuthRegLogBtn/AuthRegLogBtn.vue';
import router from "@/router/index.js";
import ModalWindow from "@/components/Admin/ModalWindow/ModalWindow.vue";

const username = ref('');
const password = ref('');
const errorVal = ref(false);
const accsessVal = ref(false);
const login = async () => {
  console.log('Отправка данных:', username.value, password.value);
  try {
    const response = await axios.post('/login-admin', {
      username: username.value,
      password: password.value,
    });
    const data = response.data;
    if (data.token) {
      localStorage.setItem('accessToken', data.token);
      accsessVal.value = true;
      setTimeout(async () => {
        await router.push('/admin');
      }, 1000);
    } else {
      errorVal.value = true;
    }
  } catch (error) {
    console.error('Ошибка:', error);
  }
};
</script>

<style lang="scss" scoped>
span {
  margin-top: 10px;
  color: #1b1f2c;
  font-family: 'Raleway-600', sans-serif;
}
.title__modal{
  margin: 15px 0;
}
.subtitle__modal{
  margin: 15px 0;
}

</style>
