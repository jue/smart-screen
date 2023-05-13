<template>
  <div class="w-screen h-screen" id="map"></div>
</template>
<script setup>
// 参考开发文档 https://juejin.cn/post/7211744771948740668
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
  areaName: { type: String, default: '西安市' },
  // 显示下级行政区级数,行政区级别包括：国家、省/直辖市、市、区/县4个级别
  subdistrict: { type: Number, default: 0 },
  // 是否返回行政区边界坐标点 all / base
  extensions: { type: String, default: 'all' },
  // 搜索范围[对应文档https://lbs.amap.com/api/javascript-api/reference/search#m_AMap.DistrictSearch]
  level: { type: String, default: 'city' },
  polylineConfig: {
    type: Object,
    default: () => ({
      // 是否显示边界线
      show: true,
      // 是否显示边界以外的区域
      showOuter: false,
      // 边界线条颜色
      strokeColor: '#99ffff',
      // 边界线条粗细
      strokeWeight: 4,
    }),
  },
  // 地图是否支持双击鼠标放大
  doubleClickZoom: { type: Boolean, default: true },
  // 中心点坐标
  center: { type: Array, default: () => [113.554772,22.367768] },
  // 初始地图缩放等级
  zoom: { type: Number, default: 20 },
  // 地图显示的缩放级别范围
  zooms: { type: Array, default: () => [3, 18] },
})

const mapInstance = ref(null)

// 新增一个渲染边界的方法
const renderPolyLine = (bounds = []) => {
  const { polylineConfig } = props

  if (polylineConfig.show) {
    for (let i = 0; i < bounds.length; i++) {
      new AMap.Polyline({
        path: bounds[i],
        strokeColor: polylineConfig.strokeColor,
        strokeWeight: polylineConfig.strokeWeight,
        map: mapInstance.value,
      })
    }
  }
}

// 初始化地图
const initMapInstance = (AMap) => {
  // 生成地图的参数，具体可详见高德api文档
  const options = {
    mapStyle: props.mapStyle,
    doubleClickZoom:props.doubleClickZoom,
    center:props.center,
    zoom:props.zoom,
    zooms:props.zooms,
    // pitch: 60,
    viewMode: '3D',
    terrain: true,
  }

  // 初始化district对象
  const district = new AMap.DistrictSearch({
    extensions: 'all',
    subdistrict: 0,
  })

  // 搜索区域
  district.search('珠海市', function (status, result) {
    const bounds = result.districtList[0]['boundaries']

    // 获取区域各坐标
    const mask = []
    for (let i = 0; i < bounds.length; i += 1) {
      mask.push([bounds[i]])
    }

    // 不显示区域外位置
    if (!props.polylineConfig.showOuter) {
      options.mask = mask
    }

    mapInstance.value = new AMap.Map('map', options)
    // 渲染边界
    renderPolyLine(bounds)
  })
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
<style lang="scss" scoped>
.amap-container {
  background-image: unset;
}
</style>
