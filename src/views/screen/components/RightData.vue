<template>
  <dv-border-box8 class="h-auto p-5 bg-blue-300 bg-opacity-20">
    <div class="text-white text-xl font-bold">过去七日分项用能</div>
    <div class="flex">
      <div class="flex-1">
        <v-chart :option="option1" autoresize :loading="false" class="h-72" />
      </div>
      <div class="flex-1">
        <v-chart :option="option2" autoresize :loading="false" class="h-72" />
      </div>
    </div>
  </dv-border-box8>
  <div class="flex space-x-5 text-white mt-5">
    <dv-border-box12 class="flex-1 rounded-lg p-3">
      <div class="text-sm font-medium mb-2">当月用电量峰会</div>
      <div class="flex items-baseline">
        <div class="font-semibold text-2xl leading-none">1278</div>
        <div class="text-xs pl-1">度</div>
      </div>
    </dv-border-box12>
    <dv-border-box12 class="flex-1 rounded-lg p-3">
      <div class="text-sm font-medium mb-2">当月用水量峰会</div>
      <div class="flex items-baseline">
        <div class="font-semibold text-2xl leading-none">1278</div>
        <div class="text-xs pl-1">吨</div>
      </div>
    </dv-border-box12>
  </div>

  <dv-border-box8 :reverse="true" class="h-auto p-5 bg-blue-300 bg-opacity-20 mt-5">
    <div class="text-white text-xl font-bold">一周用电趋势</div>
    <div class="flex">
      <v-chart :option="option3" autoresize :loading="false" class="h-72" />
    </div>
  </dv-border-box8>
</template>
<script setup>
import { reactive } from 'vue'
const option1 = reactive({
  series: [
    {
      type: 'pie',
      data: [
        { name: '收费系统', value: 93 },
        { name: '通信系统', value: 66 },
        { name: '监控系统', value: 52 },
        { name: '供配电系统', value: 34 },
        { name: '其他', value: 22 },
      ],
      radius: ['45%', '65%'],
      insideLabel: {
        show: true,
      },
      outsideLabel: {
        labelLineEndLength: 60,
        formatter: '{percent}%\n{name}',
        style: {
          fontSize: 24,
          fill: '#fff',
        },
      },
    },
  ],
  color: ['#00baff', '#3de7c9', '#fff', '#ffc530', '#469f4b'],
})

const option2 = reactive({
  dataset: {
    source: [
      ['score', 'amount', 'product'],
      [89.3, 58212, '收费系统'],
      [57.1, 78254, '通信系统'],
      [74.4, 41032, '监控系统'],
      [50.1, 12755, '供配电系统'],
      [89.7, 20145, '其他'],
    ],
  },
  grid: { containLabel: true },
  xAxis: { name: 'amount' },
  yAxis: { type: 'category' },
  visualMap: {
    orient: 'horizontal',
    left: 'center',
    min: 10,
    max: 100,
    text: ['High Score', 'Low Score'],
    // Map the score column to color
    dimension: 0,
    inRange: {
      color: ['#65B581', '#FFCE34', '#FD665F'],
    },
  },
  series: [
    {
      type: 'bar',
      encode: {
        // Map the "amount" column to X axis.
        x: 'amount',
        // Map the "product" column to Y axis
        y: 'product',
      },
    },
  ],
})

const option3 = reactive({
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 987, 867],
      type: 'line',
      areaStyle: {},
    },
  ],
})
</script>
