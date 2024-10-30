import{_ as M,r as d,o as z,a as p,c as h,d as f,e as u,b as a,w as s,f as t,F as L,g as E}from"./index-293a83cc.js";const A={id:"domId"},I={__name:"index",setup(_){const o=d(null),i=d(null),n=d(""),l=d(null);let x;const c=async()=>{try{const r=await(await fetch("https://bimface.com/api/console/share/preview/viewtoken?token=142803ff")).json();r.code==="success"&&(n.value=r.data,m())}catch(e){console.error("获取 viewToken 失败：",e)}},m=()=>{let e=new BimfaceSDKLoaderConfig;e.viewToken=n.value,BimfaceSDKLoader.load(e,v,b)};z(()=>{c()});const v=e=>{let r=document.getElementById("domId"),g=new Glodon.Bimface.Application.WebApplicationGISConfig;g.domElement=r,i.value=new Glodon.Bimface.Application.WebApplicationGIS(g),o.value=i.value.getViewer(),o.value.addScene(n.value),o.value.addEventListener(Glodon.Bimface.Viewer.ViewerGISEvent.SceneAdded,function(){l.value=o.value.getLayerManager(),x=i.value.getUIManager(),x.getToolbar("MainToolbar"),y(),w(),S(),C()}),o.value.addEventListener(Glodon.Bimface.Viewer.ViewerGISEvent.LayerAdded,function(k){k.layerId==layerId&&B()})},b=()=>{console.log("加载失败！")},y=()=>{let e=new Glodon.Bimface.Plugins.SkyBox.SkyBoxManagerConfig;e.viewer=o.value,e.style=Glodon.Bimface.Plugins.SkyBox.SkyBoxStyle.DarkNight,new Glodon.Bimface.Plugins.SkyBox.SkyBoxManager(e)},w=()=>{l.value.getLayer("1").setStyle({template:Glodon.Bimface.Common.ImageStyle.DarkBlue,brightness:.5,saturation:-.4})},B=()=>{l.value.getLayer(layerId).getComponentManager().overrideColor({all:!0},new Glodon.Web.Graphics.Color(200,200,200,.35)),l.value.getLayer(layerId).getComponentManager().overrideColor({ids:["10003","10004","10005","10008","10011"]},new Glodon.Web.Graphics.Color(131,206,208,.45)),o.value.render()};d(null);const S=()=>{let e=new Glodon.Bimface.Plugins.Animation.WallEffectConfig;e.viewer=o.value,e.direction={type:"Tangent",reverse:!1},e.duration=2500,e.height=80,e.stretch=!0,e.material=G(),e.path=[{x:-814.1,y:-1219.5,z:0},{x:-323.6,y:-972.7,z:0},{x:326.5,y:-1655.6,z:0},{x:749,y:-2172.3,z:0},{x:505,y:-2292.8,z:0},{x:365,y:-2325.2,z:0},{x:-101.9,y:-2202.1,z:0},{x:-517.7,y:-2235.5,z:0},{x:-723.7,y:-1729,z:0},{x:-814.1,y:-1219.5,z:0}],e.color=new Glodon.Web.Graphics.Color(252,29,29,.8),new Glodon.Bimface.Plugins.Animation.WallEffect(e)},C=()=>{let e=new Glodon.Bimface.Plugins.Animation.RingScanEffectConfig;e.viewer=o.value,e.color=new Glodon.Web.Graphics.Color(252,29,29,1),e.duration=2e3,e.originPosition={x:423,y:-221,z:5},e.radius=250,e.progressive=5,new Glodon.Bimface.Plugins.Animation.RingScanEffect(e)};function G(){let e=new Glodon.Bimface.Plugins.Material.MaterialConfig;return e.viewer=o.value,e.src="https://static.bimface.com/attach/3e8cedfed7a04c8e9cb115ce192e209f_big.png",new Glodon.Bimface.Plugins.Material.Material(e)}return(e,r)=>(p(),h("div",A))}},W=M(I,[["__scopeId","data-v-6e11b0d4"]]),P=t("div",{class:"text-white text-xl font-bold"},"过去七日分项用能",-1),T={class:"flex"},V={class:"flex-1"},D={class:"flex-1"},F={class:"flex space-x-5 text-white mt-5"},R=t("div",{class:"text-sm font-medium mb-2"},"当月用电量峰会",-1),$=t("div",{class:"flex items-baseline"},[t("div",{class:"font-semibold text-2xl leading-none"},"1278"),t("div",{class:"text-xs pl-1"},"度")],-1),N=t("div",{class:"text-sm font-medium mb-2"},"当月用水量峰会",-1),j=t("div",{class:"flex items-baseline"},[t("div",{class:"font-semibold text-2xl leading-none"},"1278"),t("div",{class:"text-xs pl-1"},"吨")],-1),K=t("div",{class:"text-white text-xl font-bold"},"一周用电趋势",-1),H={class:"flex"},O={__name:"RightData",setup(_){const o=f({series:[{type:"pie",data:[{name:"收费系统",value:93},{name:"通信系统",value:66},{name:"监控系统",value:52},{name:"供配电系统",value:34},{name:"其他",value:22}],radius:["45%","65%"],insideLabel:{show:!0},outsideLabel:{labelLineEndLength:60,formatter:`{percent}%
{name}`,style:{fontSize:24,fill:"#fff"}}}],color:["#00baff","#3de7c9","#fff","#ffc530","#469f4b"]}),i=f({dataset:{source:[["score","amount","product"],[89.3,58212,"收费系统"],[57.1,78254,"通信系统"],[74.4,41032,"监控系统"],[50.1,12755,"供配电系统"],[89.7,20145,"其他"]]},grid:{containLabel:!0},xAxis:{name:"amount"},yAxis:{type:"category"},visualMap:{orient:"horizontal",left:"center",min:10,max:100,text:["High Score","Low Score"],dimension:0,inRange:{color:["#65B581","#FFCE34","#FD665F"]}},series:[{type:"bar",encode:{x:"amount",y:"product"}}]}),n=f({xAxis:{type:"category",boundaryGap:!1,data:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]},yAxis:{type:"value"},series:[{data:[820,932,901,934,1290,987,867],type:"line",areaStyle:{}}]});return(l,x)=>{const c=u("v-chart"),m=u("dv-border-box8"),v=u("dv-border-box12");return p(),h(L,null,[a(m,{class:"h-auto p-5 bg-blue-300 bg-opacity-20"},{default:s(()=>[P,t("div",T,[t("div",V,[a(c,{option:o,autoresize:"",loading:!1,class:"h-72"},null,8,["option"])]),t("div",D,[a(c,{option:i,autoresize:"",loading:!1,class:"h-72"},null,8,["option"])])])]),_:1}),t("div",F,[a(v,{class:"flex-1 rounded-lg p-3"},{default:s(()=>[R,$]),_:1}),a(v,{class:"flex-1 rounded-lg p-3"},{default:s(()=>[N,j]),_:1})]),a(m,{reverse:!0,class:"h-auto p-5 bg-blue-300 bg-opacity-20 mt-5"},{default:s(()=>[K,t("div",H,[a(c,{option:n,autoresize:"",loading:!1,class:"h-72"},null,8,["option"])])]),_:1})],64)}}},U=t("div",{class:"flex flex-col h-full justify-center items-center"},[t("div",{class:"text-white text-4xl font-semibold"},"园区能耗监测大屏"),t("div",{class:"text-white"},"Energy Consumption Monitoring screen")],-1),q=t("div",{class:"z-20 w-52 absolute left-10 mt-20"},[t("div",{class:"text-white text-5xl font-semibold pl-8"},"1703度"),t("div",{class:"flex items-center mt-3"},[t("svg",{class:"icon text-5xl","aria-hidden":"true"},[t("use",{"xlink:href":"#icon-a-iconyongdianliang"})]),t("div",{class:"flex flex-col opacity-80"},[t("div",{class:"text-white text-xl"},"当日用电量"),t("div",{class:"text-white"},"Power Consumption")])]),t("div",{class:"text-white text-5xl font-semibold pl-8 mt-20"},"143吨"),t("div",{class:"flex items-center mt-3"},[t("svg",{class:"icon text-5xl","aria-hidden":"true"},[t("use",{"xlink:href":"#icon-a-iconyongshuiliang"})]),t("div",{class:"flex flex-col opacity-80"},[t("div",{class:"text-white text-xl"},"当日用水量"),t("div",{class:"text-white"},"Water Consumption")])])],-1),J={class:"z-20 w-[620px] absolute right-0 top-0 h-full py-10 pr-10 bg-gradient-to-r from-transparent to-gray-900"},X={__name:"bim",setup(_){return f({lineWidth:24,showOriginValue:!0,data:[{name:"照明用电",value:13.64},{name:"空调用电",value:27.27},{name:"其它用电",value:62}]}),f({option:{series:[{type:"pie",data:[{name:"收费系统",value:93},{name:"通信系统",value:66},{name:"监控系统",value:52},{name:"供配电系统",value:34},{name:"其他",value:22}],radius:["45%","65%"],insideLabel:{show:!1},outsideLabel:{labelLineEndLength:10,formatter:`{percent}%
{name}`,style:{fontSize:14,fill:"#fff"}}}],color:["#00baff","#3de7c9","#fff","#ffc530","#469f4b"]}}),(o,i)=>{const n=u("dv-border-box1"),l=u("dv-full-screen-container");return p(),E(l,{class:"w-screen h-screen"},{default:s(()=>[a(W,{class:"w-full h-full absolute top-0 left-0 z-10"}),a(n,{ref:"borderRef",class:"z-20 w-96 h-28 mt-10 ml-10",color:["#235fa7","#273d66"]},{default:s(()=>[U]),_:1},512),q,t("div",J,[a(O)])]),_:1})}}};export{X as default};