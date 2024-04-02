<template>
  <div class="order-contact">
    <main-container>
      <div class="tabs">
        <button class="btn-order" @click="activeTab = 'delivery'" :class="{ 'active': activeTab === 'delivery' }">Доставка</button>
        <button class="btn-order" @click="activeTab = 'pickup'" :class="{ 'active': activeTab === 'pickup' }">Самовывоз</button>
      </div>
      <div v-if="activeTab === 'delivery'">
        <h2>Содержимое вкладки Доставка</h2>
        <!-- Здесь размещаете элементы для вкладки "Доставка" -->
      </div>
      <div v-else-if="activeTab === 'pickup'">
        <h2>Содержимое вкладки Самовывоз</h2>
        <!-- Здесь размещаете элементы для вкладки "Самовывоз" -->
      </div>
      <input-contact>

      </input-contact>
    </main-container>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import MainContainer from "@/components/Container/MainContainer.vue";
import InputContact from "@/components/Inputs/InputContact/InputContact.vue";

const activeTab = ref('delivery');
</script>

<style lang="scss" src="./OrderContact.scss" scoped></style>
