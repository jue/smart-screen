<template>
  <div class="w-screen h-screen" id="map"></div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'
const props = defineProps({
  // 地图样式，需要实现暗色系，默认值就给成暗色系
  mapStyle: { type: String, default: 'amap://styles/darkblue' },
  // 地图配置
  apiConfig: {
    type: Object,
    default: () => ({
      version: '2.0',
      key: '069445c520672f275b3926268ef953a5',
      plugins: ['AMap.DistrictSearch'],
    }),
  },
  // 区域名
  areaName: { type: String, default: '珠海' },
  // 显示下级行政区级数,行政区级别包括：国家、省/直辖市、市、区/县4个级别
  subdistrict: { type: Number, default: 0 },
  // 是否返回行政区边界坐标点 all / base
  extensions: { type: String, default: 'all' },
  // 搜索范围[对应文档https://lbs.amap.com/api/javascript-api/reference/search#m_AMap.DistrictSearch]
  level: { type: String, default: 'city' },
})

const mapInstance = ref(null)

// 初始化地图
const initMapInstance = (AMap) => {
  // 生成地图的参数，具体可详见高德api文档
  const option = {
    mapStyle: props.mapStyle,
  }
  mapInstance.value = new AMap.Map('map', option)
}

const loadAMap = () => {
  window._AMapSecurityConfig = {
    securityJsCode: '568469f928741cdf911c8101d49ad1d6',
  }

  AMapLoader.load({
    key: props.apiConfig.key,
    version: props.apiConfig.version,
    plugins: props.apiConfig.plugins,
  }).then((AMap) => {
    initMapInstance(AMap)
  })
}

onMounted(() => {
  loadAMap()
})
</script>
