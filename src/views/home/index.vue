<!-- 作者: 余亚勇 -->
<!-- 创建时间: 2023-09-03 00:03:44 -->
<!-- 模块主要作用:  -->

<template>
  <div>我是一级路由----展示数据部分 {{ userStore.username }}</div>
  <h1>{{ str }}</h1>

  <Child
    @xxx="handle1"
    :money="10000"
    type="priarmy"
    size="default"
    v-model:pageIndex="pageIndex"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Child from './child.vue'
import useUserStore from '@/store/modules/user'

const userStore = useUserStore()

const str: string = 'hello'
const pageIndex = ref(1111)

const handle1 = (a: any, b: any, c: any) => {
  console.log('children', a, b, c)
  pageIndex.value = pageIndex.value + 1
}
</script>

<style scoped></style>
