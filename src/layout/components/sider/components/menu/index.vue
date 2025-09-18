<template>
  <li class="menuItem">
    <div href="#" class="menuOption" @click="$router.push({ name: 'home' })">
      <i class="iconfont icon-shouye"></i>
      <h5 class="menuText" :class="{ open2: !system.isCollapsed }">主页</h5>
    </div>
  </li>
  <li class="menuBreak">
    <hr />
  </li>
  <div class="menus">
    <!-- 循环渲染一级菜单（数量不确定） -->
    <div v-for="menu in system.menus" :key="menu.id" class="menu">
      <!-- 一级菜单标题（点击触发展开/折叠） -->
      <div class="menuLevel_1" @click="menu.isOpen = !menu.isOpen">
        <a-tooltip>
          <template #title>{{ menu.title }}</template>
          <i class="iconfont icon-shouye"></i>
        </a-tooltip>
        <h5 class="menuName" :class="{ open: !system.isCollapsed }">
          {{ menu.title }}
        </h5>
      </div>
      <!-- 二级菜单容器（根据 isOpen 状态显示/隐藏） -->
      <div class="menuLevel_2" :class="{ submenuOpen: menu.isOpen }">
        <!-- 循环渲染二级菜单 -->
        <div
          v-for="(subItem, subIndex) in menu.children"
          :key="subItem.id"
          class="subItem"
          :style="{ '--sub-index': subIndex }"
          @click="router.push({ name: subItem.name })"
        >
          <a-tooltip>
            <template #title>{{ subItem.title }}</template>
            <i class="iconfont icon-shouye" :class="{ open: !system.isCollapsed }"></i>
          </a-tooltip>
          <h5 class="menuName" :class="{ open: !system.isCollapsed }">
            {{ subItem.title }}
          </h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import '../../font/iconfont.css'
import { useSystem } from '@/stores/system'
import { useRouter } from 'vue-router'
const router = useRouter()
const system = useSystem()
</script>

<style scoped lang="scss">
// 配置参数（可自定义）
$delay-step: 0.3s; // 每个子菜单的延迟间隔
$animation-duration: 0.5s; // 单个子菜单的动画时长
$max-submenu-count: 10; // 最大子菜单数量（根据实际需求调整

$menu-height: 45px; // 菜单项高度
$menu-hover-bg-color: #364152; // 菜单悬停背景色
$item-radius: 0.5rem; // 菜单项圆角
$indentation: 2rem; // 子菜单缩进距离

h5 {
  margin-bottom: 0;
  margin-top: 0;
}

.menuItem .menuOption {
  font-size: 1rem;
  outline: none;
  border: none;
  background-color: transparent;
  width: 100%;
  height: 45px;
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: space-around;
  border-radius: 0.5rem;
  transition: 0.3s ease;
}
.menuItem .menuOption:hover {
  background-color: #364152;
}
.menuItem .menuOption i {
  width: 45px;
  text-align: center;
  color: #fff;
}

.menuItem .menuOption h5 {
  width: calc(100% - 45px);
}
.menus {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  /* 隐藏滚动条 - WebKit 浏览器 (Chrome, Safari) */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 和 Edge */
  .menu {
    width: 100%;
    color: #fff;
    .menuLevel_1 {
      display: flex;
      align-items: center;
      line-height: $menu-height;
      height: $menu-height;
      border-radius: $item-radius;
      font-size: 1rem;
      width: 100%;
      cursor: pointer;
      transition: 0.3s ease 0.1s;
      i {
        width: 45px;
        text-align: center;
        color: #fff;
      }
      .menuName {
        transform: translateX(-260px);
        opacity: 0;
        transition: transform 0.3s ease 0.1s;
        line-height: 45px;
        width: calc(100% - 45px);
      }
      .menuName.open {
        opacity: 1;
        transform: translateX(0);
      }
      &:hover {
        background-color: #364152;
      }
    }
    .menuLevel_2 {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease 0.1s;
      color: #fff;
      &.submenuOpen {
        max-height: $max-submenu-count * $menu-height; // 根据最大子菜单数量调整
      }
      .subItem {
        display: flex;
        align-items: center;
        height: $menu-height;
        border-radius: $item-radius;
        font-size: 1rem;
        width: 100%;
        cursor: pointer;
        transition:
          background-color 0.3s ease 0.1s,
          transform $animation-duration ease 0.1s,
          opacity $animation-duration ease 0.1s;
        transform: translateX(0px);
        opacity: 1;
        // transition-delay: calc(var(--sub-index) * #{$delay-step});
        i {
          width: 45px;
          text-align: center;
          color: #fff;
          transform: translateX(0px);
          transition: transform 0.3s ease 0.1s;
        }
        i.open {
          width: 45px;
          text-align: center;
          color: #fff;
          transform: translateX($indentation);
        }
        .menuName {
          transform: translateX(-260px);
          opacity: 0;
          transition: transform 0.4s ease 0.1s;
          transition: opacity 0.4s ease 0.1s;
          line-height: 45px;
          width: calc(100% - 45px);
        }
        .menuName.open {
          opacity: 1;
          transform: translateX($indentation);
        }
        &:hover {
          background-color: $menu-hover-bg-color;
        }
      }
      &.submenu-open .subItem {
        transform: translateX(0);
        opacity: 1;
      }
    }
  }
}
/* 隐藏滚动条 - WebKit 浏览器 (Chrome, Safari) */
.menus::-webkit-scrollbar {
  display: none;
}
.menuText {
  color: rgba(255, 255, 255, 0.8);
  transform: translateX(-260px);
  opacity: 0;
  transition: transform 0.3s ease 0.1s;
  line-height: 45px;
}
.menuText.open2 {
  opacity: 1;
  transform: translateX(0);
}
</style>
