<template>
  <div v-if="isVisible" class="modal-overlay" @click="closeModal">

    <div class="modal-content" @click.stop>
      <logo-in-modal class="logo__modal"></logo-in-modal>
      <crud-delete-icon class="close-button" @click="closeModal"></crud-delete-icon>
      <div class="modal__msgs">
        Зареєструйтеся
      </div>
      <div class="block-input">
        <input placeholder="Введіть свій email">
        <input placeholder="Пароль">
        <input placeholder="Повторіть пароль">
      </div>
      <auth-button type="submit" class="auth-user-btn">Зареєструватися</auth-button>
    </div>
  </div>
</template>

<script setup>
import CrudDeleteIcon from "@/components/Admin/CrudProduct/icons/CrudDeleteIcon.vue";
import LogoInModal from "@/components/Admin/ModalWindow/icons/LogoInModal.vue";
import AuthButton from "@/components/Auth/AuthButton/AuthButton.vue";

const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(['update:isVisible']);

const closeModal = () => {
  emit('update:isVisible', false);
};
</script>

<style lang="scss" src="./ModalRegisterUser.scss" scoped>

</style>
