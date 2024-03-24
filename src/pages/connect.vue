<template>
  <div class="connectPageContainer">
    <div
      class="main"
      :style="{ width: 100 * myVw + 'px', height: 55 * myVh + 'px' }"
    >
      <div class="backImg"></div>
      <div
        class="frontLayer"
        :style="{ width: 100 * myVw + 'px' }"
        style="height: 100%"
      >
        <div class="top">
          <div class="left">
            <div class="leftCircle"></div>
            <div class="leftText">团队成员信息一览</div>
          </div>
        </div>
        <div
          class="cards"
          :style="{
            width: 100 * myVw + 'px',
            height: 38.5 * myVh + 'px',
            transform: `translateY(${4 * myVh}px)`,
            padding: `0 ${2 * myVw}px`,
          }"
        >
          <div
            class="card"
            :style="{
              width: 17 * myVw + 'px',
              height: 38.5 * myVh + 'px',
              margin: `0 ${myVw}px`,
            }"
          >
            <div
              class="pic"
              :style="{ width: 17 * myVw + 'px', height: 30.8 * myVh + 'px' }"
            >
              <img
                :style="{ width: 17 * myVw + 'px', height: 30.8 * myVh + 'px' }"
                src="/assets/0.png"
                alt=""
                srcset=""
              />
            </div>
            <div
              class="name"
              :style="{
                width: 10.2 * myVw + 'px',
                height: 5.5 * myVh + 'px',
                transform: `translate(${3.6 * myVw}px, 40%)`,
              }"
            >
              WW
            </div>
            <div
              class="des"
              :style="{
                width: 10.2 * myVw + 'px',
                transform: `translate(${3.6 * myVw}px,${15 * myVh}px)`,
              }"
            >
              <div class="item">用户界面设计</div>
              <div class="item">交互布局设计</div>
              <div class="item">用户体验设计</div>
            </div>
          </div>
          <div
            class="card"
            :style="{
              width: 17 * myVw + 'px',
              height: 38.5 * myVh + 'px',
              margin: `0 ${myVw}px`,
            }"
          >
            <div
              class="pic"
              :style="{ width: 17 * myVw + 'px', height: 30.8 * myVh + 'px' }"
            >
              <img
                :style="{ width: 17 * myVw + 'px', height: 30.8 * myVh + 'px' }"
                src="/assets/1.png"
                alt=""
                srcset=""
              />
            </div>

            <div
              class="name"
              :style="{
                width: 10.2 * myVw + 'px',
                height: 5.5 * myVh + 'px',
                transform: `translate(${3.6 * myVw}px, 40%)`,
              }"
            >
              WW
            </div>
            <div
              class="des"
              :style="{
                width: 10.2 * myVw + 'px',
                transform: `translate(${3.6 * myVw}px,${15 * myVh}px)`,
              }"
            >
              <div class="item">用户界面设计</div>
              <div class="item">交互布局设计</div>
              <div class="item">用户体验设计</div>
            </div>
          </div>
          <div
            class="card bigCard"
            :style="{
              width: 19 * myVw + 'px',
              height: 44 * myVh + 'px',
              margin: `0 ${myVw}px`,
              transform: `translateY(${-5.5 * myVh}px)`,
            }"
          >
            <div
              class="pic"
              :style="{ width: 17 * myVw + 'px', height: 35.2 * myVh + 'px' }"
            >
              <img
                :style="{ width: 17 * myVw + 'px', height: 30.8 * myVh + 'px' }"
                src="/assets/2.png"
                alt=""
                srcset=""
              />
            </div>

            <div
              class="name"
              :style="{
                width: 10.2 * myVw + 'px',
                height: 5.5 * myVh + 'px',
                transform: `translate(${3.6 * myVw}px, 40%)`,
              }"
            >
              WW
            </div>
            <div
              class="des"
              :style="{
                width: 10.2 * myVw + 'px',
                transform: `translate(${3.6 * myVw}px,${15 * myVh}px)`,
              }"
            >
              <div class="item">用户界面设计</div>
              <div class="item">交互布局设计</div>
              <div class="item">用户体验设计</div>
            </div>
          </div>
          <div
            class="card"
            :style="{
              width: 17 * myVw + 'px',
              height: 38.5 * myVh + 'px',
              margin: `0 ${myVw}px`,
            }"
          >
            <div
              class="pic"
              :style="{ width: 17 * myVw + 'px', height: 30.8 * myVh + 'px' }"
            >
              <img
                :style="{ width: 17 * myVw + 'px', height: 30.8 * myVh + 'px' }"
                src="/assets/3.png"
                alt=""
                srcset=""
              />
            </div>

            <div
              class="name"
              :style="{
                width: 10.2 * myVw + 'px',
                height: 5.5 * myVh + 'px',
                transform: `translate(${3.6 * myVw}px, 40%)`,
              }"
            >
              WW
            </div>
            <div
              class="des"
              :style="{
                width: 10.2 * myVw + 'px',
                transform: `translate(${3.6 * myVw}px,${15 * myVh}px)`,
              }"
            >
              <div class="item">用户界面设计</div>
              <div class="item">交互布局设计</div>
              <div class="item">用户体验设计</div>
            </div>
          </div>
          <div
            class="card"
            :style="{
              width: 17 * myVw + 'px',
              height: 38.5 * myVh + 'px',
              margin: `0 ${myVw}px`,
            }"
          >
            <div
              class="pic"
              :style="{ width: 17 * myVw + 'px', height: 30.8 * myVh + 'px' }"
            >
              <img
                :style="{ width: 17 * myVw + 'px', height: 30.8 * myVh + 'px' }"
                src="/assets/4.png"
                alt=""
                srcset=""
              />
            </div>

            <div
              class="name"
              :style="{
                width: 10.2 * myVw + 'px',
                height: 5.5 * myVh + 'px',
                transform: `translate(${3.6 * myVw}px, 40%)`,
              }"
            >
              WW
            </div>
            <div
              class="des"
              :style="{
                width: 10.2 * myVw + 'px',
                transform: `translate(${3.6 * myVw}px,${15 * myVh}px)`,
              }"
            >
              <div class="item">用户界面设计</div>
              <div class="item">交互布局设计</div>
              <div class="item">用户体验设计</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, defineProps } from "vue";

const { myVw, myVh } = defineProps(["myVw", "myVh"]);
</script>
<style lang="less" scoped>
.connectPageContainer {
  height: calc(100vh - 3.5rem);
  .main {
    background: linear-gradient(
      180deg,
      rgba(179, 202, 205, 0.52) 0%,
      rgba(255, 255, 255, 0) 53.1%,
      #dce6e8 100%
    );
    position: relative;
    .backImg {
      width: 100%;
      height: 100%;
      background-image: url("/assets/connectBack.png");
      background-size: 70% 70%;
      background-repeat: no-repeat;
      background-position: center;
      position: absolute;
    }
    .frontLayer {
      // background-color: blueviolet;
      overflow: hidden;
      .top {
        height: 15%;
        width: 100%;
        display: flex;
        align-items: center;
        // background-color: #56b0c0;
        .left {
          display: flex;
          align-items: center;
          padding-left: 2rem;
          .leftCircle {
            width: 16px;
            height: 16px;
            background: #007186;
            border-radius: 50%;

            background: #007186;
            border-radius: 21px;
            margin-right: 0.5rem;
          }
          .leftText {
            font-size: 0.9rem;
            color: #007186;
            margin-left: 0.2rem;
            font-weight: 600;
            // width: 22rem;

            /* 守护医疗保险安全，维护医保部门的经济健康与公平 */

            font-family: "Alibaba PuHuiTi";
            font-style: normal;
            font-weight: 400;
            font-size: 20px;
            line-height: 27px;

            color: #007186;
          }
        }
      }
      .cards {
        z-index: 1;
        position: absolute;
        display: flex;
        box-sizing: border-box;
        .card {
          background-color: rgba(255, 255, 255, 1);

          border-radius: 1rem;
          box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
          position: relative;

          .pic {
            border-radius: 1rem 1rem 0 0;
            overflow: hidden;
            display: flex;
            align-items: center;
            img {
              object-fit: cover;
            }
          }
          .name {
            position: absolute;
            bottom: 0;
            left: 0;
            border-radius: 1rem;
            background-color: #bad0d4;
            display: flex;

            align-items: center;
            justify-content: center;
          }
          .des {
            position: absolute;
            bottom: 0;
            left: 0;
            border-radius: 1rem;
            // background-color: rgba(255, 0, 0, 0.241);
            transform: translate(34%, 150%);
            width: 60%;
            // height: 15%;
            height: auto;

            align-items: center;
            justify-content: center;
            .item {
              width: 100%;
              /* 用户界面设计 交互布局设计 用户体验设计 */

              font-family: "Alibaba PuHuiTi";
              font-style: normal;
              font-weight: 400;
              font-size: 16px;
              line-height: 25px;

              color: #bad1d4;
            }
          }
        }
        .bigCard {
        }
      }
    }
  }
}
</style>
