<script lang="ts" setup>
import { ref, defineProps } from 'vue'
import {
  HomeFilled,
  Discount,
  User,
  Filter,
  Document
} from '@element-plus/icons-vue'

const props = defineProps({
  height: {
    type: String,
    required: true
  }
})

const isCollapse = ref(false)

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(keyPath)
}
</script>

<template>
  <el-menu
    default-active="1"
    :collapse="isCollapse"
    @open="handleOpen"
    :style="{ height: props.height }"
  >
    <el-menu-item index="1">
      <el-icon><HomeFilled /></el-icon>
      <template #title>首页</template>
    </el-menu-item>
    <el-menu-item index="2">
      <el-icon><User /></el-icon>
      <template #title>用户管理</template>
    </el-menu-item>
    <el-menu-item index="3">
      <el-icon><Discount /></el-icon>
      <template #title>标签管理</template>
    </el-menu-item>
    <el-menu-item index="4">
      <el-icon><Filter /></el-icon>
      <template #title>分类管理</template>
    </el-menu-item>
    <el-menu-item index="5">
      <el-icon><Document /></el-icon>
      <template #title>文章管理</template>
    </el-menu-item>
  </el-menu>
</template>
