<script lang="ts" setup>
import { computed } from 'vue'
import { useWindowSize } from '@vueuse/core'

const { height } = useWindowSize({ listenOrientation: true })

const heightRs = computed(() => ({
  height: `${height.value}px`
}))
</script>

<template>
  <el-container :style="heightRs">
    <el-aside width="160px">
      <el-scrollbar>
        <BaseSide :height="heightRs.height" />
      </el-scrollbar>
    </el-aside>
    <el-container>
      <el-header class="border-b border-b-solid border-b-slate-200">
        <BaseHeader />
      </el-header>
      <el-main>
        <router-view v-slot="{ Component, route }">
          <transition name="router-fade" mode="out-in">
            <component :is="Component" :key="route.fullPath" />
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
