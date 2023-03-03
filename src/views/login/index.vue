<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { $useAxios } from '~/http'
import { useUserStore } from '~/store/modules/user'
import type { UserTypes } from '~/store/modules/user'

const userStore = useUserStore()
const router = useRouter()
const formRuleRef = ref<FormInstance>()
const formValue = reactive({
  username: '',
  password: ''
})
const formRules = reactive<FormRules>({
  username: [{ required: true, message: '请输入账号' }],
  password: [{ required: true, message: '请输入密码' }]
})

const { data, isLoading, isFinished, execute } = $useAxios<UserTypes>(
  '/api/auth/login',
  {
    method: 'post',
    data: formValue
  },
  {
    immediate: false
  }
)

watch(isFinished, val => {
  if (val) {
    if (data.value) {
      userStore.token = data.value.token
      ElMessage({
        message: '登录成功',
        type: 'success'
      })
      router.push('/')
    }
  }
})

async function login(formEl: FormInstance | undefined) {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      execute()
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>

<template>
  <div class="absolute w-100% h-100% bg-slate-200">
    <div
      class="w-300 h-280 fixed left-1/2 top-1/2 -ml-150 -mt-140 border border-solid border-slate-200 rounded-5 shadow-md bg-white"
    >
      <div
        class="text-center pt-10 pb-10 border-b border-b-solid border-b-slate-200 shadow-sm"
      >
        登录
      </div>
      <div class="p-10">
        <el-form
          label-position="top"
          label-width="100px"
          ref="formRuleRef"
          :model="formValue"
          :rules="formRules"
        >
          <el-form-item label="账号" prop="username">
            <el-input v-model="formValue.username" placeholder="请输入账号" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="formValue.password"
              @keyup.enter="login(formRuleRef)"
              type="password"
              placeholder="请输入密码"
            />
          </el-form-item>
        </el-form>
        <div class="text-center mt-20">
          <el-button
            type="primary"
            :loading="isLoading"
            @click="login(formRuleRef)"
          >
            登录
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>
