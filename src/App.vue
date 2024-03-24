<!--
 * @Author: 苟培烜 3541037829@qq.com
 * @Date: 2023-12-13 14:11:45
 * @LastEditors: 苟培烜 3541037829@qq.com
 * @LastEditTime: 2023-12-21 22:37:46
 * @FilePath: \ai-inv-web\src\views\layout.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="appcontainer">
    <!-- {{ outputted }} -->
    <div class="diaContainer" v-if="outputted">
      <img src="/assets/msg.png" class="msg"></img>
      <img src="/assets/closeIcon.png" class="close" @click="outputted=false"></img>
      <div class="text1">您的数据已经运算完成！</div>
      <div class="text2" @click="handleGoToOutput">点击查看结果</div>
      <div class="line1" @click="handleGoToOutput"></div>
      <div class="line2" @click="handleGoToOutput"></div>
    </div>
    <div class="top">
      <div class="topleft">
        <img src="/assets/logo.png" alt="" srcset="" />
        <span class="toptext"> 医尔摩斯.</span>
      </div>
      <div class="topRight">
        <div
          class="back"
          :style="{
            left: leftValue + 'rem',
            width: leftValue == 30.5 ? 8 + 'rem' : 5 + 'rem',
          }"
        ></div>
        <div class="item" @click="view = 'home'">主页</div>
        <div class="item" @click="view = 'des'">介绍</div>
        <div class="item" @click="view = 'use'">使用</div>
        <div class="item" @click="view = 'output'">结果</div>
        <div class="item" @click="view = 'download'">下载</div>
        <div class="item" @click="view = 'connect'">联系我们</div>
      </div>
    </div>
    <KeepAlive>
      <component @updateTh="handleUpdateTh" :th="th" :myVw="maxWidth/100" :myVh="maxHeight/100" :is="view?o[view]:o['home']" @outputted="handleOutputted" @downLoadOutPut="handleDownLoadOutPut" :outputData="outputData" :outputDataHeader="outputDataHeader"/>
    </KeepAlive>
  </div>
  <!-- {{ outputted }} -->
 
</template>
<script setup>
import { computed ,ref,onMounted, nextTick} from "vue";
import { useRouter, useRoute } from "vue-router";
import home from "./pages/home.vue";
import des from "./pages/des.vue";
import use from "./pages/use.vue";
import output from "./pages/output.vue";
import connect from "./pages/connect.vue";
import download from "./pages/download.vue";
import Papa from "papaparse";
const o = {
  home,
  des,
  use,
  output,
  connect,
  download
}
const outputFile = ref([])
const outputDataHeader = ref([])
const handleOutputted = (file)=>{
  console.log("outputted");
  console.log(file);
  outputFile.value = file
  outputted.value = true
  outputDataHeader.value = []


  const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const json = Papa.parse(text, {
        header: true, // 第一行作为字段名
        complete: function (results) {
          // 这里的results.data就是解析后的JSON数据
          outputData.value = results.data;
          Object.getOwnPropertyNames(outputData.value[0]).forEach((key) => {
            outputDataHeader.value.push(key);
          });
        },
      });
    };
    reader.readAsText(file);
}
const handleDownLoadOutPut = ()=>{
  console.log("处理结果下载");
  // 创建一个临时 URL 对象
  if(!outputFile.value){
    alert("没有数据")
    return
  }
  
  const url = URL.createObjectURL(outputFile.value);

  // 创建一个隐藏的 a 标签，设置 href 为临时 URL，并模拟点击下载
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = outputFile.value.name;
  document.body.appendChild(a);
  a.click();

  // 释放 URL 对象
  URL.revokeObjectURL(url);
}
const outputData = ref()
const outputted = ref(false)
const router = useRouter();
const route = useRoute();
const view = ref("home")

console.log(router, route);
const leftValue = computed(() => {
  if (view.value == 'home') {
    return 0.5;
  }
  if (view.value ==  'des') {
    return 6.5;
  }
  if (view.value == 'use') {
    return 12.5;
  }
  if (view.value == 'output') {
    return 18.5;
  }
  if (view.value == 'download') {
    return 24.5;
  }
  if (view.value == 'connect') {
    return 30.5;
  }
});
const handleGoToOutput = ()=>{
  view.value = 'output'
  outputted.value = false
}
// 阈值
const th = ref(0);
const handleUpdateTh = (e)=>{
  console.log("handleUpdateTh",e);
  th.value = e
}
// 适配屏幕
const maxWidth = window.screen.width;
const maxHeight = window.screen.height;


const devicePixelRatio = ref(2);
const initDevicePixelRatio = ref(0);
onMounted(() => {
  console.log("mounted");
  window.addEventListener('mousewheel', function (event) {
      if (event.ctrlKey === true || event.metaKey) {
        event.preventDefault()
      }
    }, { passive: false })

    //firefox
    window.addEventListener('DOMMouseScroll', function (event) {
      if (event.ctrlKey === true || event.metaKey) {
        event.preventDefault()
      }
    }, { passive: false });

    window.addEventListener('keydown', function (event) {
        if ((event.ctrlKey === true || event.metaKey) && (event.key === '-' || event.key === '+' || event.key === 'Subtract' || event.key === 'Add')) {
            event.preventDefault();
        }
    });
});
</script>
<style lang="less" scoped>
.diaContainer {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #f0f0f0;
  z-index: 99999;
  /* Rectangle 463 */
  width: 572px;
  height: 288px;
  background: linear-gradient(255.87deg, #ffffff 20.67%, #c8eaef 190.21%);
  border-radius: 42px;
  border: 1px solid #ccc;
  .msg{
    position: absolute;
    width: 15rem;
    left: 0;
    top: 1.5rem;
  }
  .close{
    position: absolute;
    width: 1.2rem;
    right: 1.5rem;
    top: 1.5rem;
    cursor: pointer;
  }
  .text1{
    position: absolute;
    right: 1rem;
    top: 7rem;
    font-size: 1.5rem;
    font-weight: 500;
    width: 22rem;/* 模型运行中...... */


    font-family: 'Alibaba PuHuiTi';
    font-style: normal;
    font-weight: 400;
    font-size: 28px;
    line-height: 41px;

    color: #071D3B;


  }
  .text2{
    position: absolute;
    right: 0.5rem;
    top: 10rem;
    width: 10rem;
    color: #007186;
    /* 请耐心等候 */


    font-family: 'Alibaba PuHuiTi';
    font-style: normal;
    font-weight: 400;
    font-size: 23px;
    line-height: 32px;
    /* identical to box height */

    color: #007186;
    cursor: pointer;


  }
  .line1{position: absolute;
    right: 1rem;
    top: 12rem;
    width: 9rem;
    height: 2px;
    cursor: pointer;
    background-color: #007186;

  }
.line2{    
    width: 9rem;
    position: absolute;
    right: 1rem;
    top: 12.3rem;
    height: 2px;
    cursor: pointer;
    background-color: #007186;}
}
.appcontainer {
  width: 100vw;
  color: black;

  .top {
    // background: pink;
    height: 3.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0 2rem;

    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    .topleft {
      display: flex;
      align-items: end;
      // background-color: aquamarine;
      img {
        height: 2.5rem;
        width: 2.5rem;
        border-radius: 50%;
        margin-right: 0.8rem;
      }
      .toptext {
        font-size: 1.1rem;
        line-height: 2.5rem;
        font-weight: 600;
        width: 5rem;
      }
    }
    .topRight {
      // background-color: aqua;
      display: flex;
      position: relative;
      // background-color: aquamarine;
      .back {
        background-color: #bad1d4;
        border-radius: 1rem;
        height: 1.7rem;
        z-index: -1;
        position: absolute;
        transition: all 0.3s;
      }
      .item {
        margin: 0 0.5rem;
        box-sizing: border-box;
        padding: 0.2rem 1.2rem;
        box-sizing: border-box;
        width: 5rem;
        cursor: pointer;
        transition: background 0.3s;
        // background-color: rgba(212, 54, 54, 0.341);
      }
      .item:last-child {
        width: 8rem;
      }
    }
  }
}
</style>
