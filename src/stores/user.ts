import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router'

export const useUserInfo = defineStore('userInfo', () => {
  const userInfo = ref({})
  const loginStatus = computed(() => Object.keys(userInfo.value).length > 0)
  const Login = (info: { username: string; password: string }) => {
    console.log('login', info)
    if (info.username === 'admin' && info.password === 'admin') {
      const tempInfo = {
        name: 'admin',
        age: 18,
        token: 'xxxxxx',
      }
      userInfo.value = tempInfo
      router.push({ name: 'home' })
    } else {
      alert('用户名或密码错误')
    }
    // 模拟登录成功，设置用户信息
  }
  const Logout = () => {
    userInfo.value = {}
  }
  return { userInfo, loginStatus, Login, Logout }
})
