<template>
  <auth-account-section>
    <auth-content-section>
      <auth-title>Введите ваш логин и пароль</auth-title>
      <auth-form @submit.prevent="login">
        <auth-input v-model="username" placeholder="Логин"></auth-input>
        <auth-input v-model="password" placeholder="Пароль" type="password"></auth-input>
        <auth-button type="submit">Войти</auth-button>
        <span>или</span>

        <router-link to="/register">
          <auth-reg-log-btn>Зарегистрироваться</auth-reg-log-btn>
        </router-link>
      </auth-form>
    </auth-content-section>
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

const username = ref('');
const password = ref('');

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
      alert('Успешная авторизация');
      await router.push('/admin');
    } else {
      alert("Ошибка:");
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
</style>
