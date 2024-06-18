<template>
  <main-container>
    <div class="chart-container">
      <Bar :data="barData" :options="options" />
    </div>
  </main-container>
  <main-container>
    <div class="chart-container">
      <Pie :data="pieData" :options="options" />
    </div>
  </main-container>
</template>

<script lang="ts">
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement
} from 'chart.js'
import { Bar, Pie } from "vue-chartjs";
import * as barConfig from '../chartConfig.js';
import * as pieConfig from '../pieConfig.js';
import MainContainer from "@/components/Container/MainContainer.vue";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement)

export default {
  name: 'App',
  components: {
    MainContainer,
    Bar,
    Pie
  },
  data() {
    return {
      barData: barConfig.data,
      pieData: pieConfig.dataPie,
      options: barConfig.options // Предполагается, что оба графика используют одинаковые опции
    }
  }
}
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 500px; /* Укажите нужную высоту */
}
</style>
