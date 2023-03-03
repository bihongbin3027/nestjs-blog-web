import { useAxios } from '@vueuse/integrations/useAxios'
import type { UseAxiosOptions } from '@vueuse/integrations/useAxios'
import axios from 'axios'
import type { RawAxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'

const instance = axios.create({
  baseURL: '/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

instance.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    const { data } = error.response
    if (data.code === -1) {
      ElMessage.error(data.message)
    }
    return Promise.reject(error)
  }
)

export function $useAxios<T = any>(
  url: string,
  config: RawAxiosRequestConfig<any>,
  options?: UseAxiosOptions<T>
) {
  return useAxios<T>(url, config, instance, options)
}
