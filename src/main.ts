import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import App from './App.vue'
import router from './router'
import store from './store'
// import 'element-plus/dist/index.css'
import 'element-plus/lib/theme-chalk/index.css'
import 'uno.css'

const app = createApp(App)

app.use(router)
app.use(ElementPlus)
app.use(store)
app.mount('#app')
