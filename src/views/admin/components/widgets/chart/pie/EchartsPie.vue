<template>
  <div ref="chartElement" class="e-chart-pie"></div>
</template>
<script lang="ts" setup>
import {onMounted, onUnmounted, ref, shallowRef} from 'vue';
import * as echarts from 'echarts';
import {color} from "@/views/admin/components/widgets/chart/echarts-config.ts"

type EChartsOption = echarts.EChartsOption;
const chartElement = ref<HTMLDivElement>();
const pieChart = shallowRef();
const option = ref<EChartsOption>({
  grid: {
    top: 10,
    right: 10
  },
  color: color,
  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '5%',
    left: 'center'
  },
  series: [
    {
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 14,
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        {value: 1048, name: 'Search Engine'},
        {value: 735, name: 'Direct'},
        {value: 580, name: 'Email'},
        {value: 484, name: 'Union Ads'},
        {value: 300, name: 'Video Ads'}
      ]
    }
  ]
});

const renderChart = () => {
  if (pieChart.value) {
    pieChart.value.clear();
    pieChart.value.setOption(option.value,true);
  }
}
const resizeChart = () => {
  if (pieChart.value) {
    pieChart.value.resize();
  }
}

onMounted(() => {
  if (chartElement.value) {
    pieChart.value = echarts.init(chartElement.value);
    renderChart();
  }
  window.addEventListener('resize', resizeChart);
});
onUnmounted(() => {
  window.removeEventListener('resize', resizeChart);
})
</script>
<style lang="scss" scoped>
.e-chart-pie {
  width: 100%;
  height: 100%;
}
</style>