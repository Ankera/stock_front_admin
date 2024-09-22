<!-- 作者: 余亚勇 -->
<!-- 创建时间: 2024-09-22 13:38:00 -->
<!-- 模块主要作用:  -->

<template>
  <el-alert
    title="统计股票最新交易日内每分钟涨跌停"
    type="success"
    effect="dark"
    :closable="false"
  />
  <div class="echarts" ref="echartsRef"></div>

  <el-divider />
</template>

<script setup lang="ts">
import { quotStockUpdownCount } from '@/api/stock/index'
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const echartsRef = ref()
const echartsData = ref()
const udChart = ref()

const initEcharts = () => {
  udChart.value = echarts.init(echartsRef.value)
  udChart.value.setOption({
    title: {
      text: '涨停跌停数',
      textStyle: {
        color: '#ffffff',
      },
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisLine: {
        show: true,
        lineStyle: {
          color: '#979797',
        },
      },
    },
    grid: {
      left: '10%',
      right: '10%',
      top: '20%',
      bottom: '10%',
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: true,
        lineStyle: {
          color: ['#979797'],
          width: 1,
          type: 'dashed',
        },
      },
      axisLine: {
        show: false,
      },
    },
    tooltip: {
      show: true,
    },
    legend: {
      data: ['涨停', '跌停'],
      right: '60px',
      top: '0px',
      inactiveColor: '#ffffff',
      textStyle: {
        color: '#ffffff',
      },
    },
    series: [
      {
        name: '涨停',
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        smooth: true,
        lineStyle: {
          color: '#FE1919',
        },
      },
      {
        name: '跌停',
        data: [82, 93, 91, 94, 190, 130, 320],
        type: 'line',
        smooth: true,
        lineStyle: {
          color: '#249900',
        },
      },
    ],
    textStyle: {
      color: '#ffffff',
    },
  })
}
onMounted(() => {
  quotStockUpdownCount().then((res) => {
    if (+res.code === 1) {
      echartsData.value = res.data
      const data = res.data
      let upList: any[] = []
      let downList: any[] = []
      let xAxis: any[] = []
      //对比涨跌数组长度来取x轴的下标 保证数据显示完整
      if (data.upList.length > data.downList.length) {
        data.upList.forEach((item: any, index: any) => {
          upList.push(item.count)
          xAxis.push(item.time)
          if (data.downList[index]) {
            downList.push(data.downList[index].count)
          }
        })
      } else {
        data.downList.forEach((item: any, index: any) => {
          downList.push(item.count)
          xAxis.push(item.time)
          if (data.upList[index]) {
            upList.push(data.upList[index].count)
          }
        })
      }
      udChart.value.setOption({
        xAxis: {
          data: xAxis,
        },
        series: [
          {
            name: '涨停',
            data: upList,
          },
          {
            name: '跌停',
            data: downList,
          },
        ],
      })
    }
  })
  initEcharts()
})
</script>

<style scoped>
.echarts {
  width: 100%;
  height: 400px;
  background-color: #000000;
}
</style>
