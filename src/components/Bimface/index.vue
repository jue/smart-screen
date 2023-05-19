<template>
  <div id="domId"></div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
const viewer = ref(null)
const app = ref(null)
const viewToken = 'b16cfc97c6394006b2bd071b00e6dad9'
let layerId = '2154800498944640'

const layerMng = ref(null)

let uiMng, mainToolbar, toolbar, extLayer

const initBimface = () => {
  let BimfaceLoaderConfig = new BimfaceSDKLoaderConfig()
  BimfaceLoaderConfig.viewToken = viewToken
  BimfaceSDKLoader.load(BimfaceLoaderConfig, successCallback, failureCallback)
}

onMounted(() => {
  initBimface()
})

const successCallback = (viewMetaData) => {
  // 构造app
  let dom4Show = document.getElementById('domId')
  let webAppConfig = new Glodon.Bimface.Application.WebApplicationGISConfig()
  webAppConfig.domElement = dom4Show
  app.value = new Glodon.Bimface.Application.WebApplicationGIS(webAppConfig)

  // 获取viewer并加载场景
  viewer.value = app.value.getViewer()
  viewer.value.addScene(viewToken)

  // 场景加载的监听事件，场景加载后获取主工具条、管理器等对象
  viewer.value.addEventListener(
    Glodon.Bimface.Viewer.ViewerGISEvent.SceneAdded,
    function () {
      // 获取图层管理器
      layerMng.value = viewer.value.getLayerManager()
      // 获取UI管理器
      uiMng = app.value.getUIManager()
      // 获取主工具条
      mainToolbar = uiMng.getToolbar('MainToolbar')
      // 初始化天空盒效果
      initSkyBox()
      // 调整地图样式
      setMapStyle()

      //电子围墙
      addWallEffect()

      //发光效果
      // addGlowEffect()

      //环形扫描
      addRingScan()
    }
  )

  // 图层加载完毕的监听事件，图层加载后对模型进行着色
  viewer.value.addEventListener(
    Glodon.Bimface.Viewer.ViewerGISEvent.LayerAdded,
    function (data) {
      if (data.layerId == layerId) {
        // 构件着色
        overrideColor()
      }
    }
  )
}

const failureCallback = () => {
  console.log('加载失败！')
}

// 初始化天空盒效果
const initSkyBox = () => {
  // 构造天空盒管理器配置项，并指定Viewer、Option参数
  let skyBoxManagerConfig =
    new Glodon.Bimface.Plugins.SkyBox.SkyBoxManagerConfig()
  skyBoxManagerConfig.viewer = viewer.value
  skyBoxManagerConfig.style =
    Glodon.Bimface.Plugins.SkyBox.SkyBoxStyle.DarkNight
  // 构造天空盒管理器，构造完成后，场景背景即发生变化
  let skyBoxManager = new Glodon.Bimface.Plugins.SkyBox.SkyBoxManager(
    skyBoxManagerConfig
  )
}

// 调整地图样式
const setMapStyle = () => {
  // 基于图层ID获取地图图层
  let baseMap = layerMng.value.getLayer('1')
  baseMap.setStyle({
    template: Glodon.Bimface.Common.ImageStyle.DarkBlue,
    brightness: 0.5,
    saturation: -0.4,
  })
}

// 构件着色
const overrideColor = () => {
  layerMng.value
    .getLayer(layerId)
    .getComponentManager()
    .overrideColor(
      { all: true },
      new Glodon.Web.Graphics.Color(200, 200, 200, 0.35)
    )
  layerMng.value
    .getLayer(layerId)
    .getComponentManager()
    .overrideColor(
      { ids: ['10003', '10004', '10005', '10008', '10011'] },
      new Glodon.Web.Graphics.Color(131, 206, 208, 0.45)
    )
  viewer.value.render()
}

// 添加水面效果的按钮
const addWaterButton = () => {
  // 构造按钮对象
  let btn_water = new Glodon.Bimface.Tiles.UI.Button({
    id: 'btn_water',
  })

  // 设置按钮的显示文字、tooltips
  btn_water.setText('水面效果')
  btn_water.setTooltip('水面效果')

  // 设置按钮的点击事件
  btn_water.onClick(function () {
    // 添加水域效果
    addWater()
    if (isWaterAdded) {
      btn_water.setText('移除水面')
      btn_water.setTooltip('移除水面')
    } else {
      btn_water.setText('水面效果')
      btn_water.setTooltip('水面效果')
    }
  })
  return btn_water
}

let isWaterAdded = false
const waterEffect = ref(null)
const addWater = () => {
  // 定义水面效果的构件
  let waterIds = [
    {
      layerId: layerId,
      objectIds: ['10063'],
    },
  ]

  // 构造水面效果配置项
  let waterEffectConfig =
    new Glodon.Bimface.Plugins.Animation.WaterEffectConfig()
  waterEffectConfig.ids = waterIds
  waterEffectConfig.viewer = viewer
  // 设置水面的流动效果
  waterEffectConfig.flow = true

  // 构造水面效果对象
  waterEffect.value = new Glodon.Bimface.Plugins.Animation.WaterEffect(
    waterEffectConfig
  )
  waterEffect.value.setColor(new Glodon.Web.Graphics.Color(18, 30, 41, 1))
  waterEffect.value.setScale(2)
  waterEffect.value.setXDirection(0.2)
  waterEffect.value.setYDirection(2)
}

let wallEffect
const addWallEffect = () => {
  // 构造电子围墙效果配置项
  let wallEffectConfig = new Glodon.Bimface.Plugins.Animation.WallEffectConfig()
  // 配置Viewer对象、方向、持续时间、路径、高度
  wallEffectConfig.viewer = viewer.value
  wallEffectConfig.direction = {
    type: 'Tangent', // 运动方式为沿着路径的切线方向
    reverse: false, // 运动方向默认为逆时针
  }
  wallEffectConfig.duration = 2500
  wallEffectConfig.height = 80
  wallEffectConfig.stretch = true
  wallEffectConfig.material = initMat()
  wallEffectConfig.path = [
    { x: -814.1, y: -1219.5, z: 0 },
    { x: -323.6, y: -972.7, z: 0 },
    { x: 326.5, y: -1655.6, z: 0 },
    { x: 749, y: -2172.3, z: 0 },
    { x: 505, y: -2292.8, z: 0 },
    { x: 365, y: -2325.2, z: 0 },
    { x: -101.9, y: -2202.1, z: 0 },
    { x: -517.7, y: -2235.5, z: 0 },
    { x: -723.7, y: -1729, z: 0 },
    { x: -814.1, y: -1219.5, z: 0 },
  ]

  // 电子围墙颜色
  wallEffectConfig.color = new Glodon.Web.Graphics.Color(252, 29, 29, 0.8) //Color(50, 211, 166, 0.8);
  // 构造电子围墙扫描效果对象
  wallEffect = new Glodon.Bimface.Plugins.Animation.WallEffect(wallEffectConfig)
}

const addGlowEffect = () => {
  viewer.value.enableGlowEffect(true)
  console.log(layerMng.value)
  layerMng.value
    .getLayer(layerId)
    .getComponentManager()
    .setGlowEffectById(
      [
        '10026',
        '10039',
        '10040',
        '10041',
        '10042',
        '10046',
        '10047',
        '10048',
        '10049',
      ],
      {
        type: 'body',
        color: new Glodon.Web.Graphics.Color(50, 211, 166, 1),
        intensity: 0.6,
        spread: 3,
      }
    )
  layerMng.value
    .getLayer(layerId)
    .getComponentManager()
    .setGlowEffectById(['10023', '10035', '10045', '10051', '10056'], {
      type: 'body',
      color: new Glodon.Web.Graphics.Color(255, 229, 89, 1),
      intensity: 0.6,
      spread: 3,
    })
  layerMng.value
    .getLayer(layerId)
    .getComponentManager()
    .setGlowEffectById(['10053', '10054', '10055'], {
      type: 'outline',
      color: new Glodon.Web.Graphics.Color(255, 255, 160, 1),
      intensity: 0.3,
      spread: 3,
    })
}

let ringScanEffect
const addRingScan = () => {
  // 构造环状扫描效果配置项
  let ringScanEffectConfig =
    new Glodon.Bimface.Plugins.Animation.RingScanEffectConfig()
  // 配置Viewer对象、颜色、持续时间、位置、半径、衰减力度等参数
  ringScanEffectConfig.viewer = viewer.value
  ringScanEffectConfig.color = new Glodon.Web.Graphics.Color(252, 29, 29, 1)
  ringScanEffectConfig.duration = 2000
  ringScanEffectConfig.originPosition = { x: 423, y: -221, z: 5 }
  ringScanEffectConfig.radius = 250
  ringScanEffectConfig.progressive = 5
  // 构造环状扫描效果对象
  ringScanEffect = new Glodon.Bimface.Plugins.Animation.RingScanEffect(
    ringScanEffectConfig
  )
}

// 初始化材质
function initMat() {
  let materialConfig = new Glodon.Bimface.Plugins.Material.MaterialConfig()
  materialConfig.viewer = viewer.value
  materialConfig.src =
    'https://static.bimface.com/attach/3e8cedfed7a04c8e9cb115ce192e209f_big.png'
  return new Glodon.Bimface.Plugins.Material.Material(materialConfig)
}
</script>
<style lang="scss" scoped>
#domId {
  :deep(.bfui-align-top) {
    display: none;
  }
}
</style>
