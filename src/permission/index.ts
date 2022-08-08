import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import type { RouteLocationNormalized } from 'vue-router'
import { userStore } from '../store/modules/user'
import { userPermissions } from '../store/modules/permission'
import router from '@/router'
import { getToken } from '@/utils/auth'

NProgress.configure({ showSpinner: false })
const hasToken = getToken()

router.beforeEach(async (to: RouteLocationNormalized, _: RouteLocationNormalized, next: any) => {
  NProgress.start()
  if (to.path === '/home') {
    console.log('hasToken', hasToken)

    if (hasToken) {
      const roles = await userStore().getRole(hasToken)
      const accessRoutes = userPermissions().generateRoutes(roles)

      accessRoutes.forEach((item: any) => {
        router.addRoute(item)
      })

      next()
    }

    else { next({ path: '/login' }) }
  }
  else {
    next()
  }
})

router.afterEach((to: RouteLocationNormalized) => {
  console.log(to)
  NProgress.done()
})
