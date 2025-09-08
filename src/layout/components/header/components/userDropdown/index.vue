<template>
  <div style="height: 100%">
    <div class="shell">
      <div class="photo">
        <img src="./img/1.jpg" alt="" />
      </div>
      <div class="content">
        <div class="text">
          <h3>{{ userStore.userInfo?.name }}</h3>
          <h6>{{ userStore.userInfo?.department }}</h6>
        </div>
        <div class="btn" @click="btnClick"><span></span></div>
      </div>
      <div class="box">
        <i class="iconfont icon-youtube" @click="userStore.Logout"><LoginOutlined /></i>
        <i class="iconfont icon-youtube"><TranslationOutlined /></i>
        <i class="iconfont icon-wechat"></i>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LoginOutlined, TranslationOutlined } from '@ant-design/icons-vue'
import { useUserInfo } from '@/stores/user'
const userStore = useUserInfo()
const btnClick = () => {
  const btn = document.querySelector('.btn')
  const box = document.querySelector('.box')
  btn?.classList.toggle('active')
  box?.classList.toggle('open')
}
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}

.shell {
  width: 400px;
  background-color: #6866ee;
  height: 100%;
  border-radius: 5px;
  background-color: #fafafa;
  animation: show-shell 0.5s forwards ease-in-out;
  display: flex;
  background-color: rgba(255, 255, 255, 0); /* 最后一个值0.5表示50%透明 */
  position: relative;
}

@keyframes show-shell {
  0% {
    width: 0;
  }
}

.photo,
.content {
  box-sizing: border-box;
}

.photo {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  border: 5px solid #fafafa;
  background-color: #fafafa;
  margin: auto;
  box-shadow: 0 0 0.5rem #babbbc;
  animation: rotate-photo 0.5s forwards ease-in-out;
}

@keyframes rotate-photo {
  100% {
    transform: rotate(-360deg);
  }
}

.photo img {
  width: 100%;
  height: 100%;
}

.content {
  overflow: hidden;
  background-image: linear-gradient(to top, #6866ee 0%, #fbc8d4 100%);
  display: flex;
  width: 300px;
  border-radius: 0.5rem;
}

.content .text {
  padding: 10px;
}
.content .text h3,
.content .text h6 {
  font-weight: normal;
  margin: 3px 0;
  letter-spacing: 0.5px;
  white-space: nowrap;
}

.content .btn {
  background-color: rgb(106, 106, 245);
  width: 50px;
  height: 50px;
  margin: auto;
  margin-right: 20px;
  border-radius: 50%;
  z-index: 1;
  cursor: pointer;
  transition-duration: 0.3s;
  animation: pop-btn 0.3s both ease-in-out 0.5s;
}

@keyframes pop-btn {
  0% {
    transform: scale(0);
  }

  80% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
  }
}

.content .btn:hover {
  box-shadow: 0 0 0 5px rgba(170, 187, 204, 0.5);
}

.content .btn span {
  width: 60%;
  height: 2px;
  position: absolute;
  background-color: white;
  top: 50%;
  left: 20%;
  transform: translateY(-50%);
  animation: to-hamburger 0.3s forwards ease-in-out;
}

.content .btn span::before,
.content .btn span::after {
  content: '';
  width: 100%;
  height: 2px;
  position: absolute;
  background-color: white;
  transition-duration: 0.3s;
  transform: rotate(0deg);
  right: 0;
}

.content .btn span::before {
  margin-top: -7px;
}

.content .btn span::after {
  margin-top: 7px;
}

.content .btn.active span {
  animation: to-arrow 0.3s forwards ease-in-out;
}

.content .btn.active span::before,
.content .btn.active span::after {
  width: 60%;
  right: -1px;
}

.content .btn.active span::before {
  transform: rotate(45deg);
}

.content .btn.active span::after {
  transform: rotate(-45deg);
}

@keyframes to-hamburger {
  from {
    transform: translateY(-50%) rotate(-180deg);
  }
}

@keyframes to-arrow {
  from {
    transform: translateY(-50%) rotate(0deg);
  }

  to {
    transform: translateY(-50%) rotate(180deg);
  }
}

.box {
  opacity: 0;
  border-radius: 50%;
  background-color: #bfa;
  position: absolute;
  top: -6%;
  right: 10px;
  transition-duration: 0.3s;
  box-shadow: 0 0 10px #fff;
  border: 5px #fff solid;
  overflow: hidden;
}

.box::after {
  content: '';
  display: block;
  width: 60px;
  height: 60px;
  background-image: url(./img/2.gif);
  background-size: cover;
  opacity: 0.7;
  border-radius: 50%;
}

.box i {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #ececec;
  font-size: 26px;
  text-align: center;
  line-height: 60px;
  position: absolute;
  box-shadow: 0 0 10px #fff;
  color: rgb(106, 106, 245);
  background-color: #fff;
  transition-duration: 0.3s;
}

.box i:hover {
  transition-delay: initial !important;
  box-shadow: 0 0 0 5px #babbbc;
  background-color: rgb(106, 106, 245);
  color: #fff;
}

.box.open {
  opacity: 1;
  overflow: visible;
}

.box.open i {
  opacity: 1;
}

.box.open i:nth-of-type(1) {
  transform: rotate(-180deg) translateX(90px) rotate(-90deg);
  transition-delay: 0.4s;
}

.box.open i:nth-of-type(2) {
  transform: rotate(-225deg) translateX(90px) rotate(-135deg);
  transition-delay: 0.3s;
}

.box.open i:nth-of-type(3) {
  transform: rotate(-270deg) translateX(90px) rotate(0deg);
  transition-delay: 0.2s;
}
</style>
