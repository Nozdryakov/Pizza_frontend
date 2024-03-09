import { defineStore } from 'pinia';
export const useCard = defineStore('Card', {
  state: () => ({
    volume: 0,
    products: [],
  }),
});
