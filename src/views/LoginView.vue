<template>
  <div class="account__section">
    <div class="content__section">
      <login-title>Введите ваш логин и пароль</login-title>
      <login-form>
        <login-input placeholder="Логин"></login-input>
        <login-input
          placeholder="Пароль"
          type="password"
        ></login-input>
        <login-button>Войти</login-button>
        <span>или</span>
        <button>Зарегистрироваться</button>
      </login-form>
    </div>
  </div>
</template>

<script setup>
import LoginTitle from "@/components/Auth/LoginTitle.vue";
import LoginForm from "@/components/Auth/LoginForm.vue";
import LoginInput from "@/components/Auth/LoginInput.vue";
import LoginButton from "@/components/Auth/LoginButton.vue";

</script>

<style lang="scss" scoped>
.account__section {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100vh;
}
.content__section {
  position: relative;
  padding: 30px 60px;
  border-radius: 40px;
  box-shadow: 2px 2px 38px rgba(115, 115, 115, 0.4);
  display: flex;
  flex-direction: column;
  align-items: center;
}
span {
  margin-top: 10px;
  color: #1b1f2c;
}
button {
  margin-top: 10px;
  padding: 0;
  text-decoration: none;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: #1b1f2c;
}
button:hover {
  text-decoration: underline;
}
@media (max-width: 880px) {
  .content__section {
    width: 615px;
    height: 415px;
  }
}
@media (max-width: 640px) {
  .content__section {
    width: 550px;
    height: 380px;
  }
}
@media (max-width: 575px) {
  .content__section {
    width: 375px;
    height: 380px;
  }
}
</style>
