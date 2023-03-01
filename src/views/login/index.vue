<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

const formRuleRef = ref<FormInstance>()
const formValue = reactive({
  username: '',
  password: ''
})
const formRules = reactive<FormRules>({
  username: [{ required: true, message: '请输入账号' }],
  password: [{ required: true, message: '请输入密码' }]
})

async function login(formEl: FormInstance | undefined) {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit')
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
              type="password"
              placeholder="请输入密码"
            />
          </el-form-item>
        </el-form>
        <div class="text-center mt-20">
          <el-button type="primary" @click="login(formRuleRef)">
            登录
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>
