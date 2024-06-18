<template>
  <div v-if="isVisible" class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <logo-in-modal class="logo__modal"></logo-in-modal>
      <crud-delete-icon class="close-button" @click="closeModal"></crud-delete-icon>
      <div class="modal__msgs">
        Авторизація
      </div>
      <form @submit.prevent="login">
        <div class="block-input">
          <title-error class="title-error">{{emailError}}</title-error>
          <input placeholder="Введіть свій email" v-model="email" @input="validateEmail">
          <title-error class="title-error">{{passwordError}}</title-error>
          <input placeholder="Пароль" type="password" v-model="password" @input="validatePassword">
        </div>
        <auth-button type="submit" class="auth-user-btn">Увійти</auth-button>
      </form>
    </div>
  </div>
  <modal-window :is-visible="accsessVal" @update:isVisible="accsessVal = $event">
    <h2 class="title__modal">Авторизація пройшла успішно!</h2>
    <p class="subtitle__modal">Тепер ви можете користуватися усіма можливостями сайту</p>
  </modal-window>
</template>


<script setup>
import CrudDeleteIcon from "@/components/Admin/CrudProduct/icons/CrudDeleteIcon.vue";
import LogoInModal from "@/components/Admin/ModalWindow/icons/LogoInModal.vue";
import AuthButton from "@/components/Auth/AuthButton/AuthButton.vue";
import axios from "axios";
import { ref } from "vue";
import ModalWindow from "@/components/Admin/ModalWindow/ModalWindow.vue";
import TitleError from "@/components/TitleError/TitleError.vue";

const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(['update:isVisible']);
const email = ref('');
const emailError = ref('');
const password = ref('');
const passwordError = ref('');
const accsessVal = ref(false);

const closeModal = () => {
  emit('update:isVisible', false);
};

const validateEmail = () => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email.value === '') {
    emailError.value = "Поле обов'язкове";
    return false;
  } else if (!re.test(email.value)) {
    emailError.value = "Некоректний email";
    return false;
  } else {
    emailError.value = '';
    return true;
  }
};

const validatePassword = () => {
  const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  if (password.value === '') {
    passwordError.value = "Поле обов'язкове";
    return false;
  } else if (!re.test(password.value)) {
    passwordError.value = "Пароль повинен містити мінімум 6 символів, включаючи букви і цифри";
    return false;
  } else {
    passwordError.value = '';
    return true;
  }
};

const login = async () => {
  if (!validateEmail() || !validatePassword()) {
    return;
  }

  console.log('Отправка данных:', email.value, password.value);
  try {
    const response = await axios.post('/login-user', {
      email: email.value,
      password: password.value,
    });
    const data = response.data;
    if (data.token) {
      localStorage.setItem('accessTokenUser', data.token);
      localStorage.setItem('userID', data.user_id);
      accsessVal.value = true;
      closeModal(); // Закрываем модальное окно авторизации
      console.log(data.token);
    } else {
      console.error('Невірний email або пароль');
    }
  } catch (error) {
    console.error('Ошибка:', error);
  }
};
</script>


<style lang="scss" src="./ModalLoginUser.scss" scoped>

</style>
