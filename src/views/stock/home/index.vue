<!-- 作者: 余亚勇 -->
<!-- 创建时间: 2024-09-21 11:38:48 -->
<!-- 模块主要作用:  -->

<template>
  <el-alert
    title="国内大盘最新的数据"
    type="success"
    effect="dark"
    :closable="false"
  />
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="code" label="大盘编码" />
    <el-table-column prop="name" label="指数名称" />
    <el-table-column prop="openPoint" label="开盘点" />
    <el-table-column prop="curPoint" label="当前点" />
    <el-table-column prop="preClosePoint" label="前收盘点" />
    <el-table-column prop="tradeAmt" label="交易量" />
    <el-table-column prop="tradeVol" label="交易金额" />
    <el-table-column prop="upDown" label="涨跌值" />
    <el-table-column prop="rose" label="涨幅" />
    <el-table-column prop="amplitude" label="振幅" />
    <el-table-column prop="curTime" label="当前时间" />
  </el-table>

  <el-divider />
</template>

<script setup lang="ts">
import { getInnerMarketInfo } from '@/api/stock/index'
import { onMounted, ref } from 'vue'

const tableData = ref([{}])

onMounted(() => {
  getInnerMarketInfo().then((res) => {
    if (res.code === 1) {
      tableData.value = res.data
      console.log('===res', tableData.value)
    }
  })
})
</script>

<style scoped></style>
