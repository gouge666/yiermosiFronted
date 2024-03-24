<template>
  <div class="outputPageContainer">
    {{ props }}
    <div class="top">
      <div class="left">
        <div class="leftCircle"></div>
        <div class="leftText">运行报告</div>
      </div>
    </div>
    <div class="find">
      <div>
        <el-input
          v-model="findStr"
          class="findClass"
          style="width: 240px"
          placeholder="查找结果"
          :prefix-icon="Search"
        >
          <template #append>
            <el-button :icon="Search" @click="handleSearch" />
          </template>
        </el-input>
      </div>
      <div class="search"></div>
    </div>

    <div class="result">
      <!-- <el-table
        ref="tableRef"
        row-key="date"
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          prop="date"
          label="Date"
          sortable
          column-key="date"
          :filters="[
            { text: '2016-05-01', value: '2016-05-01' },
            { text: '2016-05-02', value: '2016-05-02' },
            { text: '2016-05-03', value: '2016-05-03' },
            { text: '2016-05-04', value: '2016-05-04' },
          ]"
          :filter-method="filterHandler"
        />
        <el-table-column prop="name" label="Name" />
        <el-table-column
          prop="address"
          label="Address"
          :formatter="formatter"
        /><el-table-column
          prop="tag"
          label="Tag"
          :filters="[
            { text: '无风险', value: '无风险' },
            { text: '低风险', value: '低风险' },
            { text: '高风险', value: '高风险' },
          ]"
          :filter-method="filterTag"
          filter-placement="bottom-end"
        >
          <template #default="scope">
            <el-tag
              :type="
                getRank(scope.row.y_pred) == '无风险'
                  ? 'success'
                  : getRank(scope.row.y_pred) == '低风险'
                  ? 'warning'
                  : 'danger'
              "
              disable-transitions
              >{{ getRank(scope.row.y_pred) }}</el-tag
            >
          </template>
        </el-table-column>
      </el-table> -->
      <el-table
        :data="
          outputData
            ? !searching
              ? outputData.slice(
                  (currentPage - 1) * pageSize,
                  currentPage * pageSize
                )
              : outputData.filter((item) => {
                  return item.ID == findStr;
                })
            : []
        "
        style="width: 100%"
        height="100%"
      >
        <el-table-column
          v-for="item in outputDataHeader"
          :key="item"
          :label="item"
          :prop="item"
          header-align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          v-if="outputDataHeader.length"
          prop="tag"
          label="Tag"
          width="300"
          :filters="[
            { text: '无风险', value: '无风险' },
            { text: '低风险', value: '低风险' },
            { text: '高风险', value: '高风险' },
          ]"
          :filter-method="(value, row) => filterTag(value, row, th)"
          filter-placement="bottom-end"
        >
          <template #default="scope">
            <el-tag
              :type="
                getRank(scope.row.y_pred, th) == '无风险'
                  ? 'success'
                  : getRank(scope.row.y_pred, th) == '低风险'
                  ? 'warning'
                  : 'danger'
              "
              disable-transitions
              >{{ getRank(scope.row.y_pred, th) }}</el-tag
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="downLoad">
      <el-pagination
        @current-change="handleCurrentPageChange"
        layout="prev, pager, next"
        :total="outputData ? outputData.length : 0"
      >
      </el-pagination>
      <div style="width: 50px"></div>
      <div class="btn" @click="handleDownLoad">下载报告</div>
    </div>
  </div>
</template>
<script setup>
const tableRef = ref();

const resetDateFilter = () => {
  tableRef.value.clearFilter(["date"]);
};
// TODO: improvement typing when refactor table
const clearFilter = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  tableRef.value.clearFilter();
};
const formatter = (row, column) => {
  return row.address;
};
const filterTag = (value, row, th) => {
  return getRank(row.y_pred, th) === value;
};
const filterHandler = (value, row, column) => {
  const property = column["property"];
  return row[property] === value;
};
const getRank = (y_pred, th) => {
  y_pred = parseFloat(y_pred);
  console.log(y_pred, th);
  if (0 <= y_pred && y_pred < th) {
    return "无风险";
  } else if (y_pred < th * 0.1 + 0.9) {
    return "低风险";
  } else {
    return "高风险";
  }
};
const tableData = [
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
    y_pred: 0.2,
    tag: "Home",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
    y_pred: 0.4,
    tag: "Office",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
    y_pred: 0.6,

    tag: "Home",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
    y_pred: 1,

    tag: "Office",
  },
];
import { Search } from "@element-plus/icons-vue";
import { ref, defineProps, defineEmits, watch } from "vue";
const searching = ref(false);
const handleSearch = () => {
  console.log("search");
  console.log(outputData[0], findStr.value);
  searching.value = true;
};

const findStr = ref("");
watch(findStr, (newVal, oldVal) => {
  if (newVal == "") {
    searching.value = false;
  }
});
const currentPage = ref(1);
const pageSize = ref(10);
const handleCurrentPageChange = (val) => {
  currentPage.value = val;
  console.log(currentPage.value);
};
const { outputData, outputDataHeader, th } = defineProps([
  "outputData",
  "outputDataHeader",
  "th",
]);
// console.log(props);
const emit = defineEmits();
const handleDownLoad = () => {
  emit("downLoadOutPut");
};
const renderHeader = ({ column, $index }) => {
  // 新建一个 span
  const span = document.createElement("span");
  // 设置表头名称
  span.innerText = column.label;
  span.style.backgroundColor = "#071d3b";
  span.style.textAlign = "left"; // 设置文字靠左对齐
  // 临时插入 document
  document.body.appendChild(span);
  // 重点：获取 span 最小宽度，设置当前列，注意这里加了 20，字段较多时还是有挤压，且渲染后的 div 内左右 padding 都是 10，所以 +20 。（可能还有边距/边框等值，需要根据实际情况加上）
  column.minWidth = span.getBoundingClientRect().width + 20;
  // 移除 document 中临时的 span
  document.body.removeChild(span);
  return column.label;
};
</script>
<style lang="less" scoped>
:deep(.el-table) {
  --el-table-header-bg-color: #071d3b;
  th {
    background-color: #071d3b;
    color: white;
  }
  .cell {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
  }
}
:deep(.el-tag__content) {
  font-weight: 600;
}
.outputPageContainer {
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding: 1rem 2rem;
  background: linear-gradient(
    0deg,
    #dde7e9 0%,
    #ffffff 30%; #ffffff 70%;#dde7e9 100%;
  );
  height: calc(100vh - 3.5rem);
  .top {
    width: 100%;
    height: 3rem;
    // background: #dde7e9;
    display: flex;
    justify-content: flex-start;
    align-items: center;
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

        font-family: "Alibaba PuHuiTi";
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 27px;

        color: #007186;
      }
    }
  }
  .find {
    width: 100%;
    height: 2rem;
    // background: #ffffff;
    .findClass {
    }
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    .search {
      width: 100%;
      height: 2rem;
      // background: #dde7e9;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      box-sizing: border-box;
      padding-right: 2rem;
    }
  }

  .result {
    width: 100%;
    height: 20rem;
    flex-grow: 1;
    background: #ffffff;
  }
  .downLoad {
    width: 100%;
    height: 10vh;
    background: #dde7e9;
    display: flex;
    justify-content: flex-end;
    box-sizing: border-box;
    padding-right: 2rem;
    align-items: center;
    .btn {
      width: 10rem;
      height: 3rem;
      background: #007186;
      color: #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 0.5rem;
      cursor: pointer;
    }
  }
}
</style>
