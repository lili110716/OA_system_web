<template>
  <div class="header">
    <div class="left"></div>
    <div class="right">
      <UserDropdown />
    </div>
  </div>
</template>

<script setup lang="ts">
  import UserDropdown from './components/userDropdown/index.vue'
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.header {
  height: 60px;
  background-color: black;
  border-radius: 0.5rem;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.left {
  margin-left: 20px;
  height: 100%;
}
.right {
  margin-left: auto;
  height: 100%;
}
</style>
