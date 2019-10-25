//登录
export function loginAdmin(hw){
  const hasKey = this.$te('hw.' + hw)
  const translatedTitle = this.$t('hw.' + hw) // $t :this method from vue-i18n, inject in @/lang/index.js

  if (hasKey) {
    return translatedTitle
  }
  return hw
}
//首页
export function fpthome(hw){
    const hasKey = this.$te('hw.' + hw)
    const translatedTitle = this.$t('hw.' + hw) // $t :this method from vue-i18n, inject in @/lang/index.js

    if (hasKey) {
      return translatedTitle
    }
    return hw
}
//产品
export function fptproduct(hw){
  const hasKey = this.$te('hw.' + hw)
  const translatedTitle = this.$t('hw.' + hw) // $t :this method from vue-i18n, inject in @/lang/index.js

  if (hasKey) {
    return translatedTitle
  }
  return hw
}
//系统
export function systemes(sys){
  const hasKey = this.$te('hw.' + sys)
  const translatedTitle = this.$t('hw.' + sys) // $t :this method from vue-i18n, inject in @/lang/index.js

  if (hasKey) {
    return translatedTitle
  }
  return sys
}

//财务主页
export function financeEarnings(hw){
  const hasKey = this.$te('hw.' + hw)
  const translatedTitle = this.$t('hw.' + hw) // $t :this method from vue-i18n, inject in @/lang/index.js

  if (hasKey) {
    return translatedTitle
  }
  return hw
}

//现金钱包
export function financeCash(hw){
  const hasKey = this.$te('hw.' + hw)
  const translatedTitle = this.$t('hw.' + hw) // $t :this method from vue-i18n, inject in @/lang/index.js

  if (hasKey) {
    return translatedTitle
  }
  return hw
}

// translate router.meta.title, be used in breadcrumb sidebar tagsview
export function generateTitle(title) {
    const hasKey = this.$te('route.' + title)
    const translatedTitle = this.$t('route.' + title) // $t :this method from vue-i18n, inject in @/lang/index.js
    if (hasKey) {
      return translatedTitle
    }
    return title
  }
  export function generateSkinColor(color) {
    const hasKey = this.$te('skin.' + color)
    const translatedTitle = this.$t('skin.' + color) // $t :this method from vue-i18n, inject in @/lang/index.js

    if (hasKey) {
      return translatedTitle
    }
    return color
  }
