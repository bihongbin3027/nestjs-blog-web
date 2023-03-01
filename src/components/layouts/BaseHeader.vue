<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { ElMessageBox } from 'element-plus'
import { toggleDark } from '~/composables'

const router = useRouter()

function logout() {
  ElMessageBox.confirm('确定注销并退出系统吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    // userStore
    //   .logout()
    //   .then(() => {
    //     tagsViewStore.delAllViews();
    //   })
    //   .then(() => {
    //     router.push(`/login?redirect=${route.fullPath}`);
    //   });
    router.push('/login')
  })
}
</script>

<template>
  <div class="flex justify-between items-center h-60">
    <h1>管理系统</h1>
    <el-space>
      <button
        class="border-none w-full bg-transparent cursor-pointer"
        @click="toggleDark()"
        style="height: var(--ep-menu-item-height)"
      >
        <i inline-flex i="dark:ep-moon ep-sunny" />
      </button>
      <el-dropdown>
        <el-avatar class="cursor-pointer">user</el-avatar>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout">注销</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-space>
  </div>
</template>
