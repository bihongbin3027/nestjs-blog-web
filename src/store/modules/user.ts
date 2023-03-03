import { ref } from 'vue'
import { defineStore } from 'pinia'

export interface UserTypes {
  token: string
}

export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref<UserTypes['token']>('')

    function resetUser() {
      token.value = ''
    }

    return {
      token,
      resetUser
    }
  },
  { persist: true }
)
