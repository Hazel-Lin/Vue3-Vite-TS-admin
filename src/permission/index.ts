import type { Router } from 'vue-router'
import router from '../router'

// 路由守卫
const hasToken = localStorage.getItem("token");
const hasPermissions = (to:any) =>{
  return to.meta.permissions
}
router.beforeEach((to, from,next) => {
  // 判断是否有token 有token就可以访问
  console.log(to,123)
  console.log(hasToken,'hasToken')

  if(hasToken){ 
    // 场景？？？
    if(to.path === "/login"){
      next({path: "/home/index"});
    }else{
      if(hasPermissions(to)){
        next();
      }else{
        next({path: "/404"});
      }
    }
  }else{
    // 没有token就跳转到登录页面
    next("/login");
  }
})