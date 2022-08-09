import { getRoutes } from '@/utils/getRoutes'

const getUrl = location.hash.split('#', 2)[1]
export const start = async () => {
  if (getUrl.includes('/login'))
    return Promise.reject()

  await getRoutes()

  return Promise.resolve()
}
