<template>
  <input
    :type="type"
    :id="id"
    :value="modelValue"
    @input="updateModelValue"
    :required="required"
    autocomplete="off"
  />
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  id: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'text'
  },
  required: {
    type: Boolean,
    default: false
  }
});
const emits = defineEmits(['update:modelValue']);
const updateModelValue = (event) => {
  emits('update:modelValue', event.target.value);
};
</script>
<style lang="scss" src="./CreateUpdateInput.scss" scoped></style>
