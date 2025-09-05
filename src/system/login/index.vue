<template>
  <div class="body">
    <div class="shell">
      <div class="top">
        <span class="off" :style="offStyle">SIGN IN</span>
        <div class="button" @click="handleToggle">
          <div class="ball" :style="ballStyle"></div>
        </div>
        <span class="on" :style="onStyle">SIGN UP</span>
      </div>

      <div class="bottom" :style="bottomStyle">
        <div class="signIn">
          <h2>Sign in</h2>
          <input type="text" placeholder="Username" v-model="username" />
          <input type="text" placeholder="Password" v-model="password" />
          <Button @click="handleClick">GO</Button>
        </div>
        <div class="signUp">
          <h2>Sign up</h2>
          <input type="text" placeholder="Username" />
          <input type="text" placeholder="Password" />
          <input type="text" placeholder="Confirm password" />
          <button>GO</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useUserInfo } from '@/stores/user'
// 开关状态：0为关闭，1为开启
const index = ref(0)
const username = ref('')
const password = ref('')
const user = useUserInfo()
// 处理开关点击事件
const handleToggle = () => {
  index.value = index.value === 0 ? 1 : 0
}

const handleClick = () => {
  console.log('点击了登录按钮')
  if (index.value === 0) {
    // 登录逻辑
    console.log('执行登录逻辑')
    user.Login({ username: username.value, password: password.value })
  } else {
    // 注册逻辑
    console.log('执行注册逻辑')
  }
}

// 计算球体的样式
const ballStyle = computed(() => ({
  left: index.value === 1 ? '61%' : '0',
  transition: 'left 0.3s ease', // 添加过渡动画
}))

// 计算底部旋转样式
const bottomStyle = computed(() => ({
  transform: index.value === 1 ? 'rotateY(180deg)' : 'rotateY(0deg)',
  transition: 'transform 0.3s ease', // 添加过渡动画
}))

// 计算ON文字样式
const onStyle = computed(() => ({
  opacity: index.value === 1 ? 1 : 0.5,
  transition: 'opacity 0.3s ease',
}))

// 计算OFF文字样式
const offStyle = computed(() => ({
  opacity: index.value === 0 ? 1 : 0.5,
  transition: 'opacity 0.3s ease',
}))
// 每当点击按钮的时候，index的值就会发生变化，如果index为0的话，那么点击的时候index变为1，反之变为0
// 当index的值为0时，按钮里的球划到右边，并且将右边字的透明度变为1，下面的登录卡旋转180度，为注册
// 当index的值为1时，按钮里的球划到左边，并且将右边字的透明度变为0.5，下面的登录卡旋转回0度，为登录
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  outline: none;
  border: none;
}

.body {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(31, 32, 41);
}

.shell {
  width: 300px;
  height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  perspective: 1000px;
  /* 给最外层加上一个透视，否则接下去的翻转会没有3d的效果 */
}

.top {
  width: 300px;
  display: flex;
  cursor: pointer;
  justify-content: space-evenly;
}

.off,
.on {
  color: #fff;
  transition: 0.5s;
  font: 300 20px '';
}
.on {
  opacity: 0.5;
}
.button {
  width: 60px;
  height: 25px;
  background-color: rgb(255, 235, 167);
  border-radius: 20px;
  position: relative;
}

.ball {
  position: absolute;
  width: 25px;
  height: 25px;
  background-color: rgb(46, 45, 56);
  border-radius: 50%;
  transition: 0.5s;
  box-shadow: 0 0 10px #000;
  left: 0;
  transform: translate(-1px);
}

.bottom {
  width: 300px;
  height: 250px;
  background-image: url(./static/background.png);
  transform-style: preserve-3d;
  /* 使元素呈现出3D效果 */
  position: relative;
  transition: 0.7s;
  border-radius: 5px;
}

.bottom > div {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
}

.bottom > div h2 {
  color: white;
}
.bottom > div input {
  width: 200px;
  height: 25px;
  padding: 0 10px;
  background-color: rgb(31, 32, 41);
  color: #fff;
}

.bottom > div button {
  width: 80px;
  height: 30px;
  color: #333;
  font-size: 15px;
  background-color: rgb(255, 235, 167);
  border-radius: 4px;
  transition: 0.3s;
  margin-bottom: 10px;
  cursor: pointer;
  box-shadow: 0 0 10px rgb(255, 235, 167);
}
.bottom > div button:hover {
}
.signIn {
  transform: translateZ(70px);
  /* 在这里我们将卡片里面内容和卡片有一个距离，这样子会更有立体感 */
}

.signUp {
  position: absolute;
  top: 0;
  transform: translateZ(-70px) rotateY(180deg);
  /* 我们给反面加上距离的时候，前往不要忘记给反面的内容也翻转一下，否则就会出现这种卡片转过来了，里面的内容也反了 */
}
</style>
