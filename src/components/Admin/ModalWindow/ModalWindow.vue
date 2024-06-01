<template>
  <div v-if="isVisible" class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <crud-delete-icon class="close-button" @click="closeModal"></crud-delete-icon>
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import CrudDeleteIcon from "@/components/Admin/CrudProduct/icons/CrudDeleteIcon.vue";

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
