<template>
  <!-- <link rel="stylesheet" href="./font/iconfont.css"> -->
  <div>
    <nav class="menu" :class="{ open: !system.isCollapsed }">
      <div class="actionsBar">
        <div>
          <button id="menuBtn" type="button"  @click="handleMenuClick">
            <i class="iconfont icon-hanbaocaidan"></i>
          </button>
          <h3 class="menuText" :class="{ open2: !system.isCollapsed }">饭在锅里</h3>
        </div>
      </div>
      <ul class="optionsBar">
        <li class="menuItem">
          <a href="#" class="menuOption">
            <i class="iconfont icon-shouye"></i>
            <h5 class="menuText" :class="{ open2: !system.isCollapsed }">主页</h5>
          </a>
        </li>
        <li class="menuBreak">
          <hr />
        </li>
        <li class="menuItem">
          <button class="menuOption" type="button">
            <i class="iconfont icon-tupian"></i>
            <h5 class="menuText" :class="{ open2: !system.isCollapsed }">Photo album</h5>
          </button>
        </li>

        <li class="menuItem">
          <button class="menuOption" type="button">
            <i class="iconfont icon-tupian"></i>
            <h5 class="menuText" :class="{ open2: !system.isCollapsed }">Photo album</h5>
          </button>
        </li>
      </ul>
      <div class="about" id="about"></div>
      <div class="menuUser">
        <a href="#">
          <div>
            <img src="./static/goat.jpg" alt="" />
          </div>
          <h5 class="Username menuText" :class="{ open2: !system.isCollapsed }">山羊</h5>
          <p class="menuText" :class="{ open2: !system.isCollapsed }">
            <span class="iconfont icon-youjiantou"></span>
          </p>
        </a>
      </div>
      <div class="themeBar">
        <div>
          <button type="button">
            <i class="iconfont icon-tuichu"></i>
          </button>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import './font/iconfont.css'
import { onMounted } from 'vue'
import { useSystem } from '@/stores/system'
const system = useSystem()
// 收集菜单文本元素的引用

// 菜单点击处理函数
const handleMenuClick = () => {
  system.toggleSidebar()
}

// 组件挂载后可以访问到DOM元素
onMounted(() => {
  // 可选：可以在这里做一些初始化操作
  console.log('菜单组件已挂载')
})
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.iconfont {
  font-size: 20px;
}

.menu {
  position: absolute;
  width: 60px;
  height: calc(100% - 20px);
  background-color: #111727;
  z-index: 2;
  top: 0;
  bottom: 0;
  left: 10px;
  margin: auto;
  border-radius: 0.8rem;
  transition: 0.3s ease 0.15s;
  font-family: sans-serif;
}

.menu a {
  text-decoration: none;
}

.menu .actionsBar {
  width: 100%;
  height: 10%;
  padding: 0.5rem;
  overflow: hidden;
}

.menu .actionsBar div {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-radius: 0.5rem;
  transition: 0.3s ease;
}

.menu .actionsBar div button {
  background-color: transparent;
  outline: none;
  border: none;
  border-radius: 0.5rem;
  color: #fff;
  width: 45px;
  height: 45px;
  transition: 0.3s ease;
  font-size: 1rem;
}

.menu .actionsBar div button:hover {
  background-color: #364152;
}

.menu .actionsBar div h3 {
  width: calc(100% - 45px);
  text-align: center;
}

.menu .optionsBar {
  overflow: hidden;
  display: flex;
  width: 100%;
  height: 60%;
  padding: 0 0.5rem;
  align-items: center;
  flex-direction: column;
}

.menu .optionsBar .menuItem {
  width: 100%;
  height: 45px;
  margin: 0.3rem;
}

.menu .optionsBar .menuItem .menuOption {
  font-size: 1rem;
  outline: none;
  border: none;
  background-color: transparent;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-radius: 0.5rem;
  transition: 0.3s ease;
}

.menu .optionsBar .menuItem .menuOption:hover {
  background-color: #364152;
}

.menu .optionsBar .menuItem .menuOption i {
  width: 45px;
  text-align: center;
  color: #fff;
}

.menu .optionsBar .menuItem .menuOption h5 {
  width: calc(100% - 45px);
}

.menuText {
  color: rgba(255, 255, 255, 0.8);
  transform: translateX(-260px);
  opacity: 0;
  transition: transform 0.3s ease 0.1s;
}

.menu .about {
  width: 100%;
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 1rem;
  flex-direction: column;
  font-family: sans-serif;
  opacity: 0;
  white-space: nowrap;
  transition: 0.3s ease 0.15s;
}

.menu.open {
  width: 240px;
}

.menuText.open2 {
  opacity: 1;
  transform: translateX(0);
}

.menu .menuBreak {
  width: 100%;
  height: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu .menuBreak hr {
  width: 70%;
  height: 3px;
  background-color: #fff;
  border: none;
  border-radius: 5px;
}

.menu .themeBar {
  overflow: hidden;
  width: 100%;
  height: 10%;
  padding: 0.5rem;
}

.menu .themeBar div {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-radius: 0.5rem;
  transition: 0.3s ease;
}

.menu .themeBar div button {
  background-color: transparent;
  outline: none;
  border: none;
  border-radius: 0.5rem;
  color: #fff;
  width: 100%;
  height: 45px;
  transition: 0.3s ease;
  font-size: 1rem;
}

.menu .themeBar div button:hover {
  background-color: #364152;
}

.menu .menuUser {
  width: 100%;
  height: 10%;
}

.menu .menuUser a {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-decoration: none;
  padding: 0.5rem;
  position: relative;
}

.menu .menuUser a div {
  width: 45px;
  height: 45px;
  position: relative;
  border-radius: 0.5rem;
}

.menu .menuUser a div img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.5rem;
}

.menu .menuUser a .Username {
  width: calc(70% - 45px);
}

.menu .menuUser a p {
  width: calc(30% - 45px);
}

.menu .menuUser a:hover p {
  animation: animArrow 0.3s ease 2;
}

@keyframes animArrow {
  0% {
    transform: translateX(0);
  }

  50% {
    transform: translateX(5px);
  }

  100% {
    transform: translateX(0);
  }
}

.menu .menuUser .userInfo {
  position: absolute;
  width: 20rem;
  height: 18rem;
  opacity: 0;
  pointer-events: none;
  top: 34%;
  left: 1.5rem;
  transition: 0.3s ease;
  transform: scale(0);
  transform-origin: bottom left;
}

.menu .menuUser:hover .userInfo {
  pointer-events: all;
  opacity: 1;
  transform: scale(1);
}
</style>
