<!-- 作者: 余亚勇 -->
<!-- 创建时间: 2024-09-21 20:21:59 -->
<!-- 模块主要作用:  -->

<template>
  <el-alert title="涨幅版" type="success" effect="dark" :closable="false" />
  <el-table :data="tableData.rows || []" style="width: 100%">
    <el-table-column type="index" width="50" />
    <el-table-column prop="code" label="代码" />
    <el-table-column prop="name" label="名称" />
    <el-table-column prop="upDown" label="涨幅%" />
    <el-table-column prop="tradePrice" label="现价" />
    <el-table-column prop="increase" label="涨跌" />
    <el-table-column prop="tradeVol" label="成交金额" />
    <el-table-column prop="amplitude" label="振幅" />
    <el-table-column prop="preClosePrice" label="前收盘价" />
    <el-table-column prop="tradeAmt" label="成交量" />
    <el-table-column prop="curDate" label="当前时间" />
  </el-table>

  <el-divider />
  <el-pagination
    background
    layout="prev, pager, next, ->, jumper, total"
    :current-page="currentPage"
    :page-size="pageSize"
    :total="totalRows"
    @current-change="handleChange"
  />
  <el-divider />
</template>

<script setup lang="ts">
import { getSectorAll } from '@/api/stock/index'
import { onMounted, ref } from 'vue'

const currentPage = ref(1) // 当前页码
const pageSize = ref(10)
const totalRows = ref(100)
const tableData = ref({
  rows: [],
})

onMounted(() => {
  getSectorAll(currentPage.value, pageSize.value).then((res) => {
    if (+res.code === 1) {
      tableData.value.rows = res.data[0].rows
      totalRows.value = res.data[0].totalRows
    }
  })
})

const handleChange = (p: any) => {
  currentPage.value = p
  getSectorAll(currentPage.value, pageSize.value).then((res) => {
    if (+res.code === 1) {
      tableData.value.rows = res.data[0].rows
      totalRows.value = res.data[0].totalRows
    }
  })
}
</script>

<style scoped></style>
