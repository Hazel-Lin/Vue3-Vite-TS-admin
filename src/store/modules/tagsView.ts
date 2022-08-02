import { defineStore } from 'pinia'

export const useTagsViewStore = defineStore({
  id: 'TagsView',
  state: () => ({
    visitedViews: [],
    cachedViews: [],
  }),
  getters: {

  },
  actions: {
    // 添加标签
    addView(view: any) {
      this.addVisitedView(view)
      this.addCachedView(view)
    },
    addVisitedView(view: any) {
      if (this.visitedViews.some((v: any) => v.path === view.path))
        return
      const { customTitle } = view.params || {}

      let title = customTitle || view.meta.title

      if (title.length > 18)
        title = title.padEnd(18, '...')
        ;

      (this.visitedViews as any).push(
        Object.assign({}, view, {
          title,
        }),
      )
    },

    addCachedView(view: any) {
      if ((this.cachedViews as any).includes(view.name))
        return
      if (!view.meta.noCache)
        (this.cachedViews as any).push(view.name)
    },

    // 删除标签
    delView(view: any) {
      return new Promise((resolve) => {
        this.delVisitedView(view)
        this.delCachedView(view)
        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews],
        })
      })
    },
    delVisitedView(view: any) {
      return new Promise((resolve) => {
        for (const [i, v] of this.visitedViews.entries()) {
          if ((v as any).path === view.path) {
            this.visitedViews.splice(i, 1)
            break
          }
        }
        resolve([...this.visitedViews])
      })
    },
    delCachedView(view: any) {
      return new Promise((resolve) => {
        const index = (this.cachedViews as any).indexOf(view.name)
        index > -1 && this.cachedViews.splice(index, 1)
        resolve([...this.cachedViews])
      })
    },

    // 关闭其他
    delOthersViews(view: any) {
      return new Promise((resolve) => {
        this.delOthersVisitedViews(view)
        this.delOthersCachedViews(view)
        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews],
        })
      })
    },
    delOthersVisitedViews(view: any) {
      return new Promise((resolve) => {
        this.visitedViews = this.visitedViews.filter((v: any) => {
          return v.meta.affix || v.path === view.path
        })
        resolve([...this.visitedViews])
      })
    },
    delOthersCachedViews(view: any) {
      return new Promise((resolve) => {
        const index = (this.cachedViews as any).indexOf(view.name)
        if (index > -1)
          this.cachedViews = this.cachedViews.slice(index, index + 1)

        else
          this.cachedViews = []

        resolve([...this.cachedViews])
      })
    },

    // 关闭左侧
    delLeftViews(view: any) {
      return new Promise((resolve) => {
        this.delLeftVisitedViews(view)
        this.delLeftCachedViews(view)
        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews],
        })
      })
    },
    delLeftVisitedViews(view: any) {
      return new Promise((resolve) => {
        let currentIndex = 0
        this.visitedViews.forEach((page: any, index) => {
          if (page.fullPath === view.fullPath)
            currentIndex = index
        })
        const affixViews = this.visitedViews.filter((v: any) => {
          return v.meta.affix
        })
        if (currentIndex > 0)
          this.visitedViews.splice(affixViews.length, currentIndex - affixViews.length)

        resolve([...this.visitedViews])
      })
    },
    delLeftCachedViews(view: any) {
      return new Promise((resolve) => {
        const affixViews = this.visitedViews.filter((v: any) => {
          return v.meta.affix
        })
        const currentIndex = (this.cachedViews as any).indexOf(view.name)
        if (currentIndex > 0) {
          this.cachedViews.splice(affixViews.length, currentIndex - affixViews.length)
        }
        else {
          // if index = -1, there is no cached tags
          this.cachedViews = []
        }
        resolve([...this.cachedViews])
      })
    },

    // 关闭右侧
    delRightViews(view: any) {
      return new Promise((resolve) => {
        this.delRightVisitedViews(view)
        this.delRightCachedViews(view)
        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews],
        })
      })
    },
    delRightVisitedViews(view: any) {
      return new Promise((resolve) => {
        const affixViews = this.visitedViews.filter((v: any) => {
          return v.meta.affix
        })
        let currentIndex = 0
        this.visitedViews.forEach((page: any, index) => {
          if (page.fullPath === view.fullPath)
            currentIndex = index
        })
        if (currentIndex < affixViews.length)
          this.visitedViews.splice(affixViews.length)

        else
          this.visitedViews.splice(currentIndex + 1)

        resolve([...this.visitedViews])
      })
    },
    delRightCachedViews(view: any) {
      return new Promise((resolve) => {
        const affixViews = this.visitedViews.filter((v: any) => {
          return v.meta.affix
        })
        const currentIndex = (this.cachedViews as any).indexOf(view.name)
        if (currentIndex < affixViews.length)
          this.cachedViews.splice(affixViews.length)

        else
          this.cachedViews.splice(currentIndex + 1)

        resolve([...this.cachedViews])
      })
    },

    // 关闭所有
    delAllViews() {
      return new Promise((resolve) => {
        this.delAllVisitedViews()
        this.delAllCachedViews()
        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews],
        })
      })
    },
    delAllVisitedViews() {
      return new Promise((resolve) => {
        const affixTags = this.visitedViews.filter((tag: any) => tag.meta.affix)
        this.visitedViews = affixTags
        resolve([...this.visitedViews])
      })
    },
    delAllCachedViews() {
      return new Promise((resolve) => {
        this.cachedViews = []

        resolve([...this.cachedViews])
      })
    },

    updateVisitedView(view: any) {
      for (let v of this.visitedViews) {
        if ((v as any).path === view.path) {
          v = Object.assign(v, view)
          break
        }
      }
    },
  },
})
