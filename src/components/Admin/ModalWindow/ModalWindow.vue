<template>
  <div v-if="isVisible" class="modal-overlay" @click="closeModal">

    <div class="modal-content" @click.stop>
      <logo-in-modal class="logo__modal"></logo-in-modal>
      <crud-delete-icon class="close-button" @click="closeModal"></crud-delete-icon>
      <div class="modal__msgs">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import CrudDeleteIcon from "@/components/Admin/CrudProduct/icons/CrudDeleteIcon.vue";
import LogoInModal from "@/components/Admin/ModalWindow/icons/LogoInModal.vue";

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

<style scoped lang="scss" src="./ModalWindow.scss"></style>
