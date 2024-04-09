<template>
  <div class="usePageContainer">
    <div class="main">
      <div class="top">
        <div class="left">
          <div class="leftCircle"></div>
          <div class="leftText">
            守护医疗保险安全，维护医保部门的经济健康与公平
          </div>
        </div>
        
      </div>
      <div class="center">
        <div class="ctop">
          <div class="text" >
            请在空白处输入或粘贴你的数据（<spna style="color: #c43c40"
              >也可以在右下角直接上传相关文件</spna
            >）
          </div>
          <div class="example" @click="inputExample">
            点击输入样例{{ maxPage }}
          </div>
        </div>
        <div class="ccenter">
          <vue-office-excel
            v-if="extensionName === 'xlsx'"
            :src="excelSrc"
            style="height: 17rem"
          />
          <el-table
            v-if="extensionName === 'csv'"
            :data="
              csvData.slice(
                (currentPage - 1) * pageSize,
                currentPage * pageSize
              )
            "
            height="100%"
            scroll-x="true"
          >
            <el-table-column
                v-for="key in csvDataHeader"
                :key="key"
                :label="key"
                :prop="key"
                :render-header="renderHeader"
                header-align="center"
                show-overflow-tooltip
              >
              </el-table-column>
            </el-table>
        </div>
        <div class="cbottom">
          <div class="left">
            <div class="rightText">调整阈值</div>
            <el-slider size="large" v-model="yuzhi" :step="0.01" show-stops :max="1" show-input :marks="marks"/>
          </div>
          <div class="right">
            <el-pagination
            v-if="extensionName === 'csv'"
            @current-change="handleCurrentPageChange"
            layout="prev, pager, next"
            :total="csvTotal"
          >
          </el-pagination>

          <el-upload
            ref="uploadRef"
            :file-list="fileList"
            :on-change="handleChange"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            :auto-upload="false"
            :show-file-list="false"
            :multiple="false"
            accept=".xlsx,.csv"
          >
            <template #trigger>
              <div class="upload">上传文件</div>
            </template>
          </el-upload>

          <div
            class="tip"
            :style="{
              opacity: excelSrc || csvData ? csvData.length : 0 ? 1 : 0,
            }"
          >
            文件已读取
          </div>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="submit" @click="submitUpload">提交</div>
        <div class="reset" @click="reset">清除</div>
      </div>
    </div>
    <div class="diaContainer" v-if="submitted">
      <img src="/assets/msg.png" class="msg"></img>
      <img src="/assets/closeIcon.png" class="close" @click="submitted=false"></img>
      <div class="text1">模型运行中......</div>
      <div class="text2">请耐心等待</div>
    </div>
  </div>
</template>
<script setup>
import { ref ,defineEmits} from "vue";
import VueOfficeExcel from "@vue-office/excel";
import axios from "axios";
import Papa from "papaparse";

//引入相关样式
import "@vue-office/excel/lib/index.css";
const emit = defineEmits();

const fileList = ref([]);
const excelSrc = ref("");
const extensionName = ref("");
const csvData = ref([]);
const csvDataHeader = ref([]);
const currentPage = ref(1);
const pageSize = ref(10);
const csvTotal = ref(0);
const submitted = ref(false);
const yuzhi = ref(0.5);
const marks = {
  0: "0",
  0.1: "0.1",
  0.2: "0.2",
  0.3: "0.3",
  0.4: "0.4",
  0.5: "0.5",
  0.6: "0.6",
  0.7: "0.7",
  0.8: "0.8",
  0.9: "0.9",
  1: "1",
};
const submitUpload = () => {
  console.log("submitUpload");
  console.log(fileList.value[0]);
  if(csvData.value.length === 0 && excelSrc.value === "" ){
    alert("请上传文件");
    return;
  }
  else {
    
    const formData = new FormData();
    formData.append(`${yuzhi.value*100}.${extensionName.value}`, fileList.value[0].raw);

    axios.post('/api/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        responseType: 'blob'  // 设置响应类型为二进制数据
    }).then(response => {
      console.log("response",response)
      if(response.data.size == 0){
        alert("请输入完整的特征列")
      }else{
        const blob = new Blob([response.data], { type: 'application/octet-stream' });
        const file = new File([blob], 'output.csv', { type: 'application/octet-stream' });

        emit('outputted', file);
      }
      // 现在您可以在前端处理这个 File 对象，例如上传到服务器或者展示给用户
      submitted.value = false
    }).catch(error => {
        console.error('Error uploading file:', error);
    });

  }
  emit('updateTh',yuzhi.value)
  submitted.value = true;
};
const handleCurrentPageChange = (val) => {
  currentPage.value = val;
  console.log(currentPage.value);
};
const renderHeader = ({ column, $index }) => {
  // 新建一个 span
  const span = document.createElement("span");
  // 设置表头名称
  span.innerText = column.label;
  // 临时插入 document
  document.body.appendChild(span);
  // 重点：获取 span 最小宽度，设置当前列，注意这里加了 20，字段较多时还是有挤压，且渲染后的 div 内左右 padding 都是 10，所以 +20 。（可能还有边距/边框等值，需要根据实际情况加上）
  column.minWidth = span.getBoundingClientRect().width + 20;
  // 移除 document 中临时的 span
  document.body.removeChild(span);
  return column.label;
};
const handleChange = (file) => {
  fileList.value = [file];
  extensionName.value = fileList.value[0].name.split(".").pop();
  if (extensionName.value !== "xlsx" && extensionName.value !== "csv") {
    fileList.value = [];
    excelSrc.value = "";
    alert("请上传xlsx或csv文件");
    return;
  } else if (extensionName.value === "csv") {
    csvData.value = [];
    csvDataHeader.value = [];
    currentPage.value = 1;
    csvTotal.value = 0;
    // 创建一个FileReader实例
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const json = Papa.parse(text, {
        header: true, // 第一行作为字段名
        complete: function (results) {
          // 这里的results.data就是解析后的JSON数据
          console.log(results.data);
          csvData.value = results.data;
          Object.getOwnPropertyNames(csvData.value[0]).forEach((key) => {
            csvDataHeader.value.push(key);
          });
          console.log(
            csvData.value.length,
            csvDataHeader.value.length,
            csvData.value.length / pageSize.value
          );
          csvTotal.value = csvData.value.length;
        },
      });
    };
    reader.readAsText(file.raw);
  } else if (extensionName.value === "xlsx") {
    const reader = new FileReader();
    reader.onload = (e) => {
      excelSrc.value = e.target.result;
    };
    reader.readAsDataURL(file.raw);
  }
};
const inputExample = () => {
  extensionName.value = "csv";
  csvData.value = [];
  csvDataHeader.value = [];
  currentPage.value = 1;
  csvTotal.value = 0;
  const csvFilePath = "testData/example.csv"; // 请替换成您的CSV文件路径
  const xhr = new XMLHttpRequest();
  fetch('testData/example.csv')
  .then(response => response.text())
  .then(data => {
    // 2. 将 CSV 数据转换为 Blob 对象
    const blob = new Blob([data], { type: 'text/csv' });

    // 3. 创建一个新的 File 对象
    const file = new File([blob], 'example.csv', { type: 'text/csv' });

    // 现在您可以使用这个 File 对象进行需要的操作，比如上传、下载等
    fileList.value = [{ raw: file }];
  })
  .catch(error => {
    console.error('Error loading CSV file:', error);
  });
  xhr.open("GET", csvFilePath);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const Data = xhr.responseText;
      Papa.parse(Data, {
        header: true,
        complete: function (results) {
          // 这里的results.data就是解析后的JSON数据
          console.log(results.data);
          csvData.value = results.data;
          Object.getOwnPropertyNames(csvData.value[0]).forEach((key) => {
            csvDataHeader.value.push(key);
          });
          console.log(
            csvData.value.length,
            csvDataHeader.value.length,
            csvData.value.length / pageSize.value
          );
          csvTotal.value = csvData.value.length;
        },
      });
    } else if (xhr.status !== 200) {
      alert("无法获取CSV文件");
    }
  };
  xhr.send();
};
const reset = () => {
  fileList.value = [];
  excelSrc.value = "";
  extensionName.value = "";
  csvData.value = [];
  csvDataHeader.value = [];
  currentPage.value = 1;
  csvTotal.value = 0;
};
</script>
<style lang="less" scoped>
:deep(.el-slider__runway.show-input) {
  height: 1.5rem;
  background: #d9d9d9;
  border-radius: 0.75rem;
  width: 20rem;
  box-sizing: border-box;
  padding: 0.5rem;
  // display: flex;
  // align-items: center;
}
:deep(.el-slider__bar){
  background: #071d3b;
  height: 1.5rem;
  border-radius: .75rem 0 0 .75rem;
  transform: translateY(-0.5rem);
}
:deep(.el-slider__button-wrapper){
  transform: translate(-50%,0.5rem);
  .el-slider__button {
    width: 1.5rem;
    height: 1.5rem;
    background: #ffffff;
    border-radius: 50%;
    border: 0;
    box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.2);
  
  }
}
.diaContainer {
  position: fixed;
  top: 50%;
  z-index: 99999;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #f0f0f0;
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
    width: 1.2rem;
    right: 7rem;
    top: 7rem;
    font-size: 1.5rem;
    font-weight: 500;
    width: 15rem;/* 模型运行中...... */


    font-family: 'Alibaba PuHuiTi';
    font-style: normal;
    font-weight: 400;
    font-size: 30px;
    line-height: 41px;

    color: #071D3B;


  }
  .text2{
    position: absolute;
    width: 1.2rem;
    right: 6rem;
    top: 10rem;
    width: 8rem;
    color: #007186;
    /* 请耐心等候 */


    font-family: 'Alibaba PuHuiTi';
    font-style: normal;
    font-weight: 400;
    font-size: 23px;
    line-height: 32px;
    /* identical to box height */

    color: #007186;


  }
}
.content {
  /* Rectangle 463 */
  width: 572px;
  height: 288px;
  left: 159px;
  top: 33px;

  border-radius: 42px;
}
.usePageContainer {
  width: 100vw;
  //   height: 100vh;
  .main {
    width: 100vw;
    height: calc(100vh - 3.5rem);
    background: linear-gradient(
      0deg,
      #dde7e9 0%,
      #ffffff 30%; #ffffff 70%;#dde7e9 100%;
    );
    box-sizing: border-box;
    padding: 1rem 5rem;
    box-sizing: border-box;
    .top {
      width: 100%;
      height: 10%;
      //   background: #dde7e9;
      display: flex;
      justify-content: space-between;
      align-items: end;
      box-sizing: border-box;
      padding-bottom: 0.5rem;
      .left {
        display: flex;
        align-items: center;
        transform: translateX(-16px);
        .leftCircle {
          width: 16px;
          height: 16px;
          background: #007186;
          border-radius: 50%;



background: #007186;
border-radius: 21px;

        }
        .leftText {
          font-size: 0.9rem;
          color: #007186;
          margin-left: 0.2rem;
          font-weight: 600;
          // width: 22rem;

          /* 守护医疗保险安全，维护医保部门的经济健康与公平 */



font-family: 'Alibaba PuHuiTi';
font-style: normal;
font-weight: 400;
font-size: 20px;
line-height: 27px;

color: #007186;


        }
      }
      .right {
       
      }
    }
    .center {
      width: 100%;
      height: 80%;
      background: #ffffff;
      border-radius: 0 0 2rem 2rem;
      box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.2);
      display: flex;
      flex-direction: column;
      color: white;
      overflow: hidden;
      .ctop {
        height: 2.5rem;
        width: 100%;
        background: #071d3b;
        display: flex;
        align-items: center;
        padding-left: 1rem;
        box-sizing: border-box;
        font-size: 0.9rem;
        .example {
          border-bottom: 1px solid white;
          text-decoration: underline;
          cursor: pointer;
        }
      }
      .ccenter {
        height: calc(100% - 5.5rem);
        width: 100%;
        background: #ffffff;
        color: black;
      }
      .cbottom {
        height: 3rem;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        padding-right: 1rem;
        padding-top: .2rem;
        // background-color: #071D3B;
        .left{
          display: flex;
        align-items: center;
        padding-left: 1rem;
        padding-bottom: 0.5rem;
        .rightText {
          width: 5rem;
          margin-right: 1rem;
          color: rgb(0, 0, 0) ;
        }
        }
        .right{
          display: flex;
          align-items: center;
          .upload {
          width: 5rem;
          height: 2rem;
          padding: 0 1rem;
          font-size: 0.9rem;
          font-weight: 500;
          box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.2);
          background: #bad1d4;
          color: rgb(0, 0, 0);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .tip {
          width: 5rem;
          color: rgba(0, 0, 0, 0.629);
          font-size: 0.8rem;
        }}
      }
    }
    .bottom {
      width: 100%;
      height: 10%;
      //   background: #dde7e9;
      display: flex;
      justify-content: end;
      margin: 1rem 0;
      cursor: pointer;
      .submit {
        box-sizing: border-box;
        padding: 0.2rem 2rem;
        height: 2rem;
        background: #007186;
        color: white;
        font-size: 0.9rem;
        display: flex;
        align-items: center;
      }
      .reset {
        box-sizing: border-box;
        padding: 0.2rem 2rem;
        height: 2rem;
        background: #ffffff;
        color: #007186;
        font-size: 0.9rem;
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
