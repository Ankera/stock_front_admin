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
  <div class="echarts" ref="UDEchartsRef"></div>

  <el-divider />

  <el-alert title="成交量" type="warning" effect="dark" :closable="false" />
  <div class="echarts" ref="moneyEChartRef"></div>

  <el-divider />
  <el-alert title="个股涨跌" type="success" effect="dark" :closable="false" />
  <div class="echarts" ref="upDownRangeRef"></div>
</template>

<script setup lang="ts">
import {
  quotStockUpdownCount,
  getCompareStockTradeAmt,
  getIncreaseRange,
} from '@/api/stock/index'
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const UDEchartsRef = ref()
const UDEChartReturn = ref()

const moneyEChartRef = ref()
const moneyEChartReturn = ref()

const upDownRangeRef = ref()
const upDownRangeReturn = ref()

const initUDEcharts = () => {
  UDEChartReturn.value = echarts.init(UDEchartsRef.value)
  UDEChartReturn.value.setOption({
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

  quotStockUpdownCount().then((res) => {
    if (+res.code === 1) {
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
      UDEChartReturn.value.setOption({
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
}

const initMoneyEChart = () => {
  moneyEChartReturn.value = echarts.init(moneyEChartRef.value)
  // 绘制图表
  moneyEChartReturn.value.setOption({
    title: {
      text: '成交量',
      textStyle: {
        color: '#FFFFFF',
      },
    },
    grid: {
      left: '10%',
      right: '10%',
      top: '20%',
      bottom: '10%',
    },
    xAxis: {
      show: false,
      type: 'category',
      data: new Array(240),
      axisLine: {
        show: true,
        lineStyle: {
          color: '#979797',
        },
      },
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
      trigger: 'axis',
      formatter(params: any) {
        // debugger;
        return `<span>时间</span>: ${params[0].data.time}<br/>
            昨日: <span style="color: #FE1919">${params[0].value}</span><br/>
            今日: <span style="color: #249900">${params[1].value}</span><br/>`
      },
    },
    legend: {
      data: ['昨日', '今日'],
      right: '80px',
      inactiveColor: '#ffffff',
      textStyle: {
        color: '#ffffff',
      },
    },
    series: [
      {
        name: '昨日',
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        smooth: true,
        lineStyle: {
          color: '#FE1919',
        },
      },
      {
        name: '今日',
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

  getCompareStockTradeAmt().then((res) => {
    if (+res.code === 1) {
      const data = res.data
      const amtList: any[] = []
      let yesAmtList: any[] = []
      data.amtList.forEach((item: any, index: number) => {
        amtList.push({
          time: item.time,
          value: item.count,
        })
        let value
        if (data.yesAmtList[index] && data.yesAmtList[index].count) {
          value = data.yesAmtList[index].count
        } else {
          value = 0
        }
        yesAmtList.push({
          time: item.time,
          value: value,
        })
      })
      moneyEChartReturn.value.setOption({
        series: [
          {
            name: '今日',
            data: amtList,
          },
          {
            name: '昨日',
            data: yesAmtList,
          },
        ],
      })
    }
  })
}

const initUpDownRangeEChart = () => {
  upDownRangeReturn.value = echarts.init(upDownRangeRef.value)
  upDownRangeReturn.value.setOption({
    title: {
      text: '个股涨跌',
      textStyle: {
        color: '#FFFFFF',
      },
    },
    grid: {
      left: '10%',
      right: '10%',
      top: '20%',
      bottom: '15%',
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
      axisLabel: {
        interval: 0,
        rotate: 38,
      },
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
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'bar',
        smooth: true,
        itemStyle: {
          color: function (value: any) {
            if (value.data.status == 'up') {
              return '#FE1919'
            } else {
              return '#249900'
            }
          },
        },
        barMaxWidth: '10px',
      },
    ],
    textStyle: {
      color: '#ffffff',
    },
  })

  getIncreaseRange().then((res) => {
    if (+res.code === 1) {
      const data = res.data
      const xAxis: any = []
      const series: any = []
      data.infos.forEach((item: any) => {
        xAxis.push(item.title)
        series.push({
          value: item.count,
          status: item.status,
        })
      })
      upDownRangeReturn.value.setOption({
        title: {
          text: '个股涨跌-' + data.time,
          textStyle: {
            color: '#FFFFFF',
          },
        },
        xAxis: {
          data: xAxis,
        },
        series: [
          {
            data: series,
          },
        ],
      })
    }
  })
}

onMounted(() => {
  initUDEcharts()

  initMoneyEChart()

  initUpDownRangeEChart()
})
</script>

<style scoped>
.echarts {
  width: 100%;
  height: 400px;
  background-color: #000000;
}

.warning {
  margin-top: 24px;
}
</style>
