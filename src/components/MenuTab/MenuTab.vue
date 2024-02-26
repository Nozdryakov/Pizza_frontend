<template>
  <main-container>
    <div class="tabs__wrapper">
      <h1>Меню</h1>
      <ul class="tabs-list">
        <li
          v-for="(category, index) in data.list"
          :key="index"
          :class="{ active: category.show }"
          @click="showCategory(category.id)"
        >
          {{ category.id }}
        </li>
      </ul>
      <div class="tabs-content">
        <div v-for="(category, index) in visibleTabs" :key="index">
          <h2>{{ category.id }}</h2>
          <ul>
            <li v-for="(product, i) in category.list" :key="i" class="product">
<!--              {{ product.name }}-->
              <img src="@/assets/images/swiper-card-1.png" class="tab-img">

            </li>
          </ul>
        </div>
      </div>
    </div>
  </main-container>
</template>

<script setup>
import { ref, computed } from 'vue';
import MainContainer from "@/components/Container/MainContainer.vue";

const data = ref({
  list: [
    {
      id: "Пицца",
      show: true,
      list: [
        { name: 'Product 1' },
        { name: 'Product 2' },
        { name: 'Product 3' },
        { name: 'Product 4' }
      ]
    },
    {
      id: "Закуски",
      show: false,
      list: [
        { name: 'Закуски 1' },
        { name: 'Закуски 2' },
        { name: 'Закуски 3' },
        { name: 'Закуски 4' }
      ]
    },
    {
      id: "Десерты",
      show: false,
      list: [
        { name: 'Закуски 1' },
        { name: 'Закуски 2' },
        { name: 'Закуски 3' },
        { name: 'Закуски 4' }
      ]
    },
    {
      id: "Напитки",
      show: false,
      list: [
        { name: 'Закуски 1' },
        { name: 'Закуски 2' },
        { name: 'Закуски 3' },
        { name: 'Закуски 4' }
      ]
    },
    {
      id: "Комбо",
      show: false,
      list: [
        { name: 'Закуски 1' },
        { name: 'Закуски 2' },
        { name: 'Закуски 3' },
        { name: 'Закуски 4' }
      ]
    }
  ]
});

const visibleTabs = computed(() => {
  return data.value.list.filter(item => item.show);
});

const showCategory = (itemId) => {
  data.value.list.forEach(item => {
    item.show = item.id === itemId;
    console.log(itemId);
  });
};
</script>

<style scoped lang="scss" src="./MenuTab.scss">

</style>
