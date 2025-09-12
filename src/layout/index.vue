<template>
  <div class="app-layout">
    <!-- 侧边栏：根据路由元信息动态显示 -->
    <Sidebar v-if="route.meta.layout !== false" class="sidebar" :style="{ width: siderWidth }" />

    <!-- 主内容区 -->
    <main class="main-content">
      <!-- 顶部导航栏（可选） -->
      <Header />
      <!-- 路由视图 -->
      <router-view
        class="page-content"
        :style="{
          backgroundColor: system.isCollapsed ? '#bfa' : '#baf',
        }"
      />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useSystem } from '@/stores/system'
import Sidebar from './components/sider/index.vue' // 侧边栏组件
import { computed } from 'vue'
import Header from './components/header/index.vue' // 顶部导航组件

// 获取当前路由信息
const route = useRoute()
const system = useSystem()
const siderWidth = computed(() => (system.isCollapsed ? '80px' : '260px'))
</script>

<style scoped>
.app-layout {
  display: flex;
  min-height: 100vh;
  background-color: #babbbc;
}

.sidebar {
  border-right: 1px solid #e5e7eb;
  transition: width 0.3s ease 0.15s;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  transition: margin-left 0.3s ease 0.15s;
  margin: 10px;
  height: calc(100vh - 20px);
}
.page-content {
  padding: 10px;
  margin-top: 10px;
  border-radius: 0.5rem;
  flex: 1;
}
</style>
