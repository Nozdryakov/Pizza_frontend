<template>
  <auth-account-section>
    <auth-content-section>
      <auth-title>Введите ваш логин и пароль</auth-title>
      <auth-form>
        <auth-input placeholder="Логин"></auth-input>
        <auth-input placeholder="Пароль" type="password"></auth-input>
        <auth-button>Войти</auth-button>
        <span>или</span>

        <router-link to="/register">
          <auth-reg-log-btn>Зарегистрироваться</auth-reg-log-btn>
        </router-link>
      </auth-form>
    </auth-content-section>
  </auth-account-section>
</template>

<script setup>
import AuthForm from '@/components/Auth/AuthForm/AuthForm.vue';
import AuthInput from '@/components/Auth/AuthInput/AuthInput.vue';
import AuthTitle from '@/components/Auth/AuthTitle/AuthTitle.vue';
import AuthButton from '@/components/Auth/AuthButton/AuthButton.vue';
import AuthAccountSection from '@/components/Auth/AuthAccountSection/AuthAccountSection.vue';
import AuthContentSection from '@/components/Auth/AuthContentSection/AuthContentSection.vue';
import AuthRegLogBtn from '@/components/Auth/AuthRegLogBtn/AuthRegLogBtn.vue';
</script>

<style lang="scss" scoped>
span {
  margin-top: 10px;
  color: #1b1f2c;
  font-family: 'Raleway-600', sans-serif;
}
</style>
