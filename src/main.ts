import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './permission'
import { start } from './permission/start'
import 'element-plus/dist/index.css'
// import 'element-plus/lib/theme-chalk/index.css'
import 'uno.css'
import svgIcon from '@/icons/index.vue'

const app = createApp(App)
// 避免pinia报错
app.use(store)
app.component('SvgIcon', svgIcon)
for (const [key, component] of Object.entries(ElementPlusIconsVue))
  app.component(key, component)

start().then(() => {
}).catch(() => {
}).finally(() => {
  app.use(ElementPlus)
  app.use(router)
  app.mount('#app')
})
// start().then(() => {
//   app.use(ElementPlus)
//   app.use(router)
//   app.mount('#app')
// })
