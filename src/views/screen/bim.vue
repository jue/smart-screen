<template>
  <dv-full-screen-container class="w-screen h-screen">
    <Bimface class="w-full h-full absolute top-0 left-0 z-10"></Bimface>

    <dv-border-box1
      ref="borderRef"
      class="z-20 w-96 h-28 mt-10 ml-10"
      :color="['#235fa7', '#273d66']"
    >
      <div class="flex flex-col h-full justify-center items-center">
        <div class="text-white text-4xl font-semibold">园区能耗监测大屏</div>
        <div class="text-white">Energy Consumption Monitoring screen</div>
      </div>
    </dv-border-box1>

    <!-- 页面左侧信息 -->
    <div class="z-20 w-52 absolute left-10 mt-20">
      <div class="text-white text-5xl font-semibold pl-8">1703度</div>
      <div class="flex items-center mt-3">
        <svg class="icon text-5xl" aria-hidden="true">
          <use xlink:href="#icon-a-iconyongdianliang"></use>
        </svg>
        <div class="flex flex-col opacity-80">
          <div class="text-white text-xl">当日用电量</div>
          <div class="text-white">Power Consumption</div>
        </div>
      </div>

      <div class="text-white text-5xl font-semibold pl-8 mt-20">143吨</div>
      <div class="flex items-center mt-3">
        <svg class="icon text-5xl" aria-hidden="true">
          <use xlink:href="#icon-a-iconyongshuiliang"></use>
        </svg>
        <div class="flex flex-col opacity-80">
          <div class="text-white text-xl">当日用水量</div>
          <div class="text-white">Water Consumption</div>
        </div>
      </div>
    </div>

    <!-- 页面右侧信息 -->
    <div class="z-20 w-[620px] absolute right-0 top-0 h-full py-10 pr-10 bg-gradient-to-r from-transparent to-gray-900">
      <RightData></RightData>
    </div>
  </dv-full-screen-container>
</template>
<script setup>
import { reactive } from 'vue'
import Bimface from '@/components/Bimface/index.vue'
import RightData from './components/RightData.vue'


const data01 = reactive({
  lineWidth: 24,
  showOriginValue: true,
  data: [
    {
      name: '照明用电',
      value: 13.64,
    },
    {
      name: '空调用电',
      value: 27.27,
    },
    {
      name: '其它用电',
      value: 62,
    },
  ],
})

const data02 = reactive({
  option: {
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
          show: false,
        },
        outsideLabel: {
          labelLineEndLength: 10,
          formatter: '{percent}%\n{name}',
          style: {
            fontSize: 14,
            fill: '#fff',
          },
        },
      },
    ],
    color: ['#00baff', '#3de7c9', '#fff', '#ffc530', '#469f4b'],
  },
})
</script>
