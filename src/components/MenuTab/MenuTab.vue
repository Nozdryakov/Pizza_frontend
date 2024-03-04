<template>
  <main-container>
    <div id="menu" class="tabs__wrapper">
      <head-title>Меню</head-title>
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
          <ul class="product">
            <li v-for="(product, i) in category.list" :key="i" class="product__item">
              <img src="@/assets/images/image-default.png" class="tab-img" />
              <div class="title">{{ product.name }}</div>
              <div class="subtitle">{{ product.description }}</div>
              <div class="buy__block">
                <p class="price">{{ product.price }} ₴</p>
                <button class="btn-buy">Выбрать</button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </main-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import MainContainer from '@/components/Container/MainContainer.vue'
import HeadTitle from '@/components/HeadTitle/HeadTitle.vue'

const data = ref({
  list: [
    {
      id: 'Пицца',
      show: true,
      list: [
        {
          name: 'Домашняя',
          description:
            'Куриные кусочки, сладкий перец, моцарелла, красный лук, соус сладкий чили, соус альфре',
          price: 10
        },
        { name: 'Product 2', description: 'Описание продукта 2', price: 12 },
        { name: 'Product 3', description: 'Описание продукта 3', price: 8 },
        { name: 'Product 4', description: 'Описание продукта 4', price: 15 },
        { name: 'Product 4', description: 'Описание продукта 4', price: 15 }
      ]
    },
    {
      id: 'Закуски',
      show: false,
      list: [
        { name: 'Закуски 1', description: 'Описание закуски 1', price: 5 },
        { name: 'Закуски 2', description: 'Описание закуски 2', price: 7 },
        { name: 'Закуски 3', description: 'Описание закуски 3', price: 4 },
        { name: 'Закуски 4', description: 'Описание закуски 4', price: 6 }
      ]
    },
    {
      id: 'Десерты',
      show: false,
      list: [
        { name: 'Десерт 1', description: 'Описание десерта 1', price: 3 },
        { name: 'Десерт 2', description: 'Описание десерта 2', price: 4 },
        { name: 'Десерт 3', description: 'Описание десерта 3', price: 5 },
        { name: 'Десерт 4', description: 'Описание десерта 4', price: 6 }
      ]
    },
    {
      id: 'Напитки',
      show: false,
      list: [
        { name: 'Напиток 1', description: 'Описание напитка 1', price: 2 },
        { name: 'Напиток 2', description: 'Описание напитка 2', price: 3 },
        { name: 'Напиток 3', description: 'Описание напитка 3', price: 2 },
        { name: 'Напиток 4', description: 'Описание напитка 4', price: 4 }
      ]
    },
    {
      id: 'Комбо',
      show: false,
      list: [
        { name: 'Комбо 1', description: 'Описание комбо 1', price: 20 },
        { name: 'Комбо 2', description: 'Описание комбо 2', price: 25 },
        { name: 'Комбо 3', description: 'Описание комбо 3', price: 18 },
        { name: 'Комбо 4', description: 'Описание комбо 4', price: 30 }
      ]
    }
  ]
})

const visibleTabs = computed(() => {
  return data.value.list.filter((item) => item.show)
})

const showCategory = (itemId) => {
  data.value.list.forEach((item) => {
    item.show = item.id === itemId
  })
}
</script>

<style scoped lang="scss" src="./MenuTab.scss"></style>
