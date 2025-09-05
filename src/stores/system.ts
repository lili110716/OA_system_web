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
  return { isCollapsed, toggleSidebar }
})
