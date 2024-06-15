<template>
  <input
    :type="type"
    :id="id"
    :value="modelValue"
    @input="updateModelValue"
    :required="required"
    autocomplete="off"
    class="input"
  />
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  id: {
    type: String,
    required: false
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

<style lang="scss" scoped src="./InputContact.scss"></style>
