import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { Context } from '@nuxt/types'

Vue.use(VueI18n)

export default (
  { app, store, params, redirect, route }: Context,
  inject: Function
) => {
  const defaultLocale: string = store.getters['locale/getDefaultLocale']
  const urlRang = params.lang || defaultLocale
  const cookieLocale: string = app.$cookies.get('locale')
  const loginLocale: string = store.getters['auth/getLoginLocale']

  const locale = urlRang || cookieLocale || loginLocale || defaultLocale

  app.$cookies.set('locale', locale)
  store.commit('locale/setLocale', locale)

  app.i18n = new VueI18n({
    locale,
    fallbackLocale: defaultLocale,
    messages: getLocaleData()
  })

  inject('path', path)

  if (
    params.lang &&
    store.getters['locale/getLocalesCodes'].includes(params.lang)
  ) {
    const redirectUrl = route.fullPath.replace(`/${params.lang}`, '') || '/'
    redirect(redirectUrl)
  }

  function getLocaleData () {
    const result: VueI18n.LocaleMessages = {}
    for (const locale of store.state.locale.availableLocales) {
      result[locale.code] = require(`@/assets/locales/${locale.code}.json`)
    }

    return result
  }

  function path (link: string) {
    const $reg = new RegExp(
      `^/?(${store.getters['locale/getLocalesCodes'].join('|')})`
    )
    link = link.replace($reg, '').replace(/^\/?/, '')

    const i18n: any = app.i18n

    if (i18n.locale === i18n.fallbackLocale) {
      return `/${link}`
    }

    return `/${store.getters['locale/getLocale']}/${link}`
  }
}
