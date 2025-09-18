import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSystem = defineStore('systemInfo', () => {
  // 侧边栏状态：是否收起
  const isCollapsed = ref(true)
  // 计算属性：侧边栏宽度
  const toggleSidebar = () => {
    isCollapsed.value = !isCollapsed.value
    console.log('Sidebar is now', isCollapsed.value ? 'collapsed' : 'expanded')
  }
  interface MenuItem {
    id: number
    title: string
    isOpen: boolean
    children: { id: number; title: string; name: string }[]
  }
  const menus = ref<MenuItem[]>([
    {
      id: 1,
      title: 'Dashboard',
      isOpen: false,
      children: [
        { id: 11, title: 'Home', name: 'home' },
        { id: 12, title: 'Analytics', name: 'analytics' },
      ],
    },
    {
      id: 2,
      title: 'Settings',
      isOpen: false,
      children: [
        { id: 21, title: 'Apply', name: 'Apply' },
        { id: 22, title: 'Myinfo', name: 'MyInfo' },
      ],
    },
  ])
  return { isCollapsed, toggleSidebar, menus }
})
