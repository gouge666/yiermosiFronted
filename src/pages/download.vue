<template>
  <div class="downloadContainer">
    <div class="main" :style="{ width: 100 * myVw + 'px' }">
      <div class="top">
        <div class="left">
          <div class="leftCircle"></div>
          <div class="leftText">下载列表</div>
        </div>
      </div>
      <div class="divider"></div>
      <div class="options">
        <div class="item" @click="handleDownloadModel">
          <div class="left">模型文件下载</div>
          <div class="line"></div>
          <div class="text">
            <div class="t">文件.zip</div>
            <div class="underLine"></div>
            <div class="underLine"></div>
          </div>
        </div>
        <div class="item" @click="handleDownloadTrainData">
          <div class="left">训练数据下载</div>
          <div class="line"></div>
          <div class="text">
            <div class="t">文件.zip</div>
            <div class="underLine"></div>
            <div class="underLine"></div>
          </div>
        </div>
        <div class="item" @click="handleDownloadTestData">
          <div class="left">测试数据下载</div>
          <div class="line"></div>
          <div class="text">
            <div class="t">文件.zip</div>
            <div class="underLine"></div>
            <div class="underLine"></div>
          </div>
        </div>
        <div class="item" @click="handleDownloadExample">
          <div class="left">样例数据下载</div>
          <div class="line"></div>
          <div class="text">
            <div class="t">文件.zip</div>
            <div class="underLine"></div>
            <div class="underLine"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, defineProps } from "vue";
import axios from "axios";
const { myVw, myVh } = defineProps(["myVw", "myVh"]);

// 下载模型文件
const handleDownloadModel = () => {
  axios({
    url: "testData/model.zip",
    method: "GET",
    responseType: "blob",
  })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "model.zip");
      document.body.appendChild(link);
      link.click();
    })
    .catch((error) => {
      console.error("Error downloading file:", error);
    });
};
const handleDownloadTrainData = () => {
  axios({
    url: "testData/trainData.zip",
    method: "GET",
    responseType: "blob",
  })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "trainData.zip");
      document.body.appendChild(link);
      link.click();
    })
    .catch((error) => {
      console.error("Error downloading file:", error);
    });
};
const handleDownloadTestData = () => {
  axios({
    url: "testData/testData.zip",
    method: "GET",
    responseType: "blob",
  })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "testData.zip");
      document.body.appendChild(link);
      link.click();
    })
    .catch((error) => {
      console.error("Error downloading file:", error);
    });
};
// 下载样例文件
const handleDownloadExample = () => {
  axios({
    url: "testData/example.zip",
    method: "GET",
    responseType: "blob",
  })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "example.zip");
      document.body.appendChild(link);
      link.click();
    })
    .catch((error) => {
      console.error("Error downloading file:", error);
    });
};
</script>
<style lang="less" scoped>
.downloadContainer {
  height: calc(100vh - 3.5rem);
  display: flex;
  flex-direction: column;
  .main {
    flex-grow: 1;
    background: linear-gradient(
      180deg,
      rgba(179, 202, 205, 0.52) 0%,
      rgba(255, 255, 255, 0) 53.1%,
      #dce6e8 100%
    );
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
    .divider {
      width: calc(100% - 4rem);
      height: 5px;
      background: #bad0d4;
      border-radius: 10px;
      margin: 0 2rem;
    }
    .options {
      display: flex;
      flex-direction: column;
      align-items: start;
      padding: 2rem 3rem;
      .item {
        // background-color: #007186;
        display: flex;
        align-items: center;
        margin: 1rem 0;
        font-family: "Alibaba PuHuiTi";
        font-style: normal;
        font-weight: 400;
        font-size: 25px;
        line-height: 34px;

        color: #071d3b;

        .left {
          /* 模型文件下载————文件.zip */
        }
        .line {
          width: 80px;
          height: 2px;
          background-color: #000000;
          margin: 0 2px;
        }
        .text {
          cursor: pointer;
          .t {
            color: #007186;
          }
          .underLine {
            width: 100%;
            height: 1px;
            background-color: #007186;
            margin-top: 0.05rem;
          }
        }
      }
    }
  }
}
</style>
