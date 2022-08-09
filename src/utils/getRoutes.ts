import { userStore } from '../store/modules/user'
import { userPermissions } from '../store/modules/permission'
import router from '@/router'
import { getToken } from '@/utils/auth'

export const getRoutes = async () => {
  const hasToken = getToken()

  const roles = await userStore().getRoleList(hasToken!)
  const accessRoutes = userPermissions().generateRoutes(roles)

  accessRoutes.forEach((item: any) => {
    router.addRoute(item)
  })
}

