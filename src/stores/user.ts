import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router'

interface UserInfo {
  name: string
  ID: string
  phoneNumber: string
  department: string
  departmentID: string
  level: string
  token: string
}

export const useUserInfo = defineStore(
  'userInfo',
  () => {
    const userInfo = ref<UserInfo | null>(null)
    const loginStatus = computed(
      () => userInfo.value !== null && Object.keys(userInfo.value).length > 0,
    )
    const Login = (info: { username: string; password: string }) => {
      console.log('login', info)
      if (info.username === 'admin' && info.password === 'admin') {
        const tempInfo = {
          name: 'admin',
          ID: '001',
          phoneNumber: '1234567890',
          department: 'IT',
          departmentID: 'D001',
          level: 'admin',
          token: 'abcdefg12345',
        }
        AfterLogin(tempInfo)
      } else {
        alert('用户名或密码错误')
      }
      // 模拟登录成功，设置用户信息
    }
    const AfterLogin = (info: UserInfo) => {
      userInfo.value = info
      localStorage.setItem('token', JSON.stringify(info.token))
      console.log('存储后的token:', localStorage.getItem('token'))
      router.push({ name: 'home' })
    }
    const Logout = () => {
      localStorage.removeItem('token')
      userInfo.value = null
      router.push({ name: 'login' })
    }
    return { userInfo, loginStatus, Login, Logout }
  },
  // 关键：persist配置放在第三个参数（选项）中
  {
    persist: {
      key: 'userInfo', // 存储的key
      // storage: localStorage, // 存储方式
      // 修正paths：基于实际状态结构（userInfo是ref，里面包含token和name）
      // paths: ['token'], // 正确路径：userInfo下的token和name
    },
  },
)
