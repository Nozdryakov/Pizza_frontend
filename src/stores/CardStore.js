import { defineStore } from 'pinia';
export const useCard = defineStore('Card', {
  state: () => ({
    volume: 0,
    total: 0,
    products: []
  }),
  actions: {
    setVolume(volume) {
      this.volume = volume;
    }
  }
});
