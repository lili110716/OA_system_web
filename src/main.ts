import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// 导入多个组件
import { Button, Input, Card, Modal } from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
const app = createApp(App)

app.use(createPinia().use(piniaPluginPersistedstate))
app.use(router)

const components = [Button, Input, Card, Modal]
components.forEach(component => {
  app.use(component)
})

app.mount('#app')
