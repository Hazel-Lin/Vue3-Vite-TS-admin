import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import type { RouteLocationNormalized } from 'vue-router'
import { userPermissions } from '../store/modules/permission'
import router from '@/router'
import { getToken } from '@/utils/auth'
import { getRoutes } from '@/utils/getRoutes'

NProgress.configure({ showSpinner: false })
const hasToken = getToken()

router.beforeEach(async (to: RouteLocationNormalized, _: RouteLocationNormalized, next: any) => {
  NProgress.start()

  if (to.path !== '/login') {
    if (hasToken) {
      const hasRoutes = userPermissions().routes && userPermissions().routes.length > 0

      if (hasRoutes) {
        next()
      }
      else {
        await getRoutes()
        next()
      }
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
