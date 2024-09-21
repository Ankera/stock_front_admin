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
  <el-table :data="marketInfoTable" style="width: 100%">
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

  <el-alert
    title="国内板块指数业务分析"
    type="warning"
    effect="dark"
    :closable="false"
  />
  <el-table :data="stockAllTable" style="width: 100%">
    <el-table-column prop="code" label="板块编码" />
    <el-table-column prop="name" label="指数名称" />
    <el-table-column prop="avgPrice" label="平均价" />
    <el-table-column prop="companyNum" label="公司数量" />
    <el-table-column prop="upDownRate" label="涨跌率" />
    <el-table-column prop="tradeAmt" label="交易量" />
    <el-table-column prop="tradeVol" label="交易金额" />
    <el-table-column prop="curDate" label="当前时间" />
  </el-table>
</template>

<script setup lang="ts">
import { getInnerMarketInfo, getSectorAll } from '@/api/stock/index'
import { onMounted, ref } from 'vue'

const marketInfoTable = ref([])
const stockAllTable = ref([])

onMounted(() => {
  getInnerMarketInfo().then((res) => {
    if (res.code === 1) {
      marketInfoTable.value = res.data
    }
  })

  getSectorAll().then((res) => {
    if (res.code === 1) {
      stockAllTable.value = res.data
    }
  })
})
</script>

<style scoped></style>
