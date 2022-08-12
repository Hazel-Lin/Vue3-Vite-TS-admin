import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import App from './App.vue'
import router from './router'
import store from './store'
import './permission'
import { start } from './permission/start'
import 'element-plus/dist/index.css'
// import 'element-plus/lib/theme-chalk/index.css'
import 'uno.css'

const app = createApp(App)
// 避免pinia报错
app.use(store)

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
