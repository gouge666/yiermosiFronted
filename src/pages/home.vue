<template>
  <div class="homePageContainer">
    <div
      class="backImg"
      :style="{
        width: 100 * myVw + 'px',
        height: 55 * myVh + 'px',
      }"
    >
      <div
        class="textArea"
        :style="{
          width: 60 * myVw + 'px',
          height: 23.5 + 'rem',
          bottom: -5 * myVh + 'px',
          marginLeft: 5 * myVw + 'px',
          // backgroundColor: 'rgba(0, 0, 0, 0.2)',
        }"
      >
        <div
          class="text1"
          :style="{
            height: 1.3 + 'rem',

            // backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }"
        >
          {{ maxWidth }}守护医疗保险安全，维护{{
            devicePixelRatio
          }}医保部门的经济健康与公平{{ maxHeight }}
        </div>
        <div
          class="text2"
          :style="{
            height: 3 + 'rem',

            // backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }"
        >
          守护医保安全的
        </div>
        <div
          class="text3"
          :style="{
            height: 3 + 'rem',

            // backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }"
        >
          医疗保险欺诈识别检测模型
        </div>
        <div
          class="text4"
          :style="{
            height: 3 + 'rem',

            // backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }"
        >
          一套准确高效地识别各类医保基金欺诈和违规行为的医保欺诈识别和监控模型，誓在提高医保基金使用的透明度，降低医疗保险诈骗导致的经济损失，优化医保只能监控的规则库。
        </div>
        <div
          class="shadowBox"
          :style="{
            width: 60 * myVw + 'px',
            height: 10 + 'rem',
            bottom: -1 * myVh + 'px',
            left: 0.5 * myVw + 'px',
          }"
        ></div>
        <div
          class="aboutBox"
          :style="{
            width: 60 * myVw + 'px',
            height: 10 + 'rem',
            bottom: -0.5 * myVh + 'px',
          }"
        >
          关于我们
        </div>
      </div>
    </div>
    <div
      class="bottomContainer"
      :style="{ width: 100 * myVw + 'px', marginTop: 9 * myVh + 'px' }"
    >
      <div class="quickNac">
        快速导航
        <div class="divider">|</div>
      </div>

      <div class="aboutUs">关于我们</div>
      <div class="startRun">开始运行</div>
    </div>
  </div>
</template>
<script setup>
import { defineProps, onMounted, ref } from "vue";
const { myVw, myVh } = defineProps(["myVw", "myVh"]);
</script>
<style lang="less" scoped>
.homePageContainer {
  width: 100%;
  height: calc(100vh - 3.8rem);
  position: relative;
  .backImg {
    background-image: url("/assets/homeBack.jpg");
    background-size: cover;
    background-position: center;
    position: relative;
    .textArea {
      //   background-color: rgba(0, 0, 0, 0.2);
      width: 60rem;
      margin-left: 4rem;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      //   margin-top: 10rem;
      position: absolute;
      .text1 {
        /* 守护医疗保险安全，维护医保部门的经济健康与公平 */

        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 27px;

        color: #007186;
      }
      .text2 {
        /* 守护医保安全的 医疗保险欺诈识别监测模型 */

        font-family: "Alibaba PuHuiTi";
        font-style: normal;
        font-weight: 700;
        font-size: 48px;
        line-height: 66px;
        margin: 0.5rem 0;
        color: #09216b;
      }
      .text3 {
        font-family: "Alibaba PuHuiTi";
        font-style: normal;
        font-weight: 700;
        font-size: 48px;
        line-height: 66px;
        margin: 0.5rem 0;

        color: #09216b;
      }
      .text4 {
        text-align: left;
        width: 43rem;
        margin-top: 1rem;

        /* 一套准确高效地识别各类医保基金欺诈和违规行为的医保欺诈识别和监控模型， 旨在提高医保基金使用的透明度降低医疗保险欺诈导致的经济损失，优化医保智能监控的规则库。 */

        font-family: "Alibaba PuHuiTi";
        font-style: normal;
        font-weight: 400;
        font-size: 17px;
        line-height: 23px;

        color: #09216b;
      }
    }

    .shadowBox {
      width: 48rem;
      height: 10rem;
      background-color: rgba(0, 0, 0, 0.5);
      opacity: 0.5;
      position: absolute;
      bottom: -12rem;
      left: 0.5rem;
      border-radius: 1rem;
    }
    .aboutBox {
      width: 48rem;
      height: 10rem;
      background-color: #071d3b;
      position: absolute;
      bottom: -11.7rem;
      left: 0rem;
      border-radius: 1rem;
      color: white;
      text-align: left;
      box-sizing: border-box;
      padding: 0.5rem 1rem;
    }
  }
  .bottomContainer {
    width: 100%;
    display: flex;
    justify-content: end;
    box-sizing: border-box;
    padding: 0 2rem;
    align-items: center;
    & > div {
      margin-right: 2rem;
      font-size: 1rem;
      cursor: pointer;
      box-sizing: border-box;
      padding: 0 1rem;
    }
    .quickNac {
      display: flex;
      align-items: center;
      margin-right: 0;
      color: #007186;
      .divider {
        margin-left: 1rem;
        font-weight: 600;
        font-size: 1.5rem;
      }
    }

    .aboutUs {
      margin-left: 0;
      background-color: #bad0d4;
      border-radius: 0.4rem;
      box-sizing: border-box;
      padding: 0.2rem 1rem;
    }
    .startRun {
      background-color: #bad0d4;
      border-radius: 0.4rem;
      box-sizing: border-box;
      padding: 0.2rem 1rem;
    }
  }
}
</style>
