<!-- 作者: 余亚勇 -->
<!-- 创建时间: 2024-09-15 18:50:29 -->
<!-- 模块主要作用:  -->

<template>
  <div>hello Vue</div>
  <button @click="handle">按钮</button>
  <div>{{ money }}</div>
  <div>pageIndex = {{ pageIndex }}</div>
  <div v-bind="{ a: 1, b: 2 }">attr</div>
  <el-button :="atrrs">点击</el-button>
  <div>{{ $attrs.type }}</div>
</template>

<script setup lang="ts">
import { useAttrs } from 'vue'
defineProps(['money', 'pageIndex'])
const $emit = defineEmits(['xxx'])

const handle = () => {
  $emit('xxx', 111, 222222, 3)
}

const atrrs = useAttrs()

console.log('==atrrs==', atrrs)
</script>

<style scoped></style>
