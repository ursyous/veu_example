import { RootState } from 'store'
import { ActionTree, MutationTree, GetterTree } from 'vuex'
import HeaderTemplate from '~/static/templates/header.json'

interface LocaleState {
  locale: string,
  defaultLocale: string,
  availableLocales: Array<localeDetail>
}

export interface localeDetail {
  code: string,
  text: string | object
}

export const state = (): LocaleState => ({
  locale: 'ko',
  defaultLocale: 'ko',
  availableLocales: HeaderTemplate.locales
})

export const getters: GetterTree<LocaleState, RootState> = {
  getLocale (state): string {
    return state.locale
  },
  getDefaultLocale (state): string {
    return state.defaultLocale
  },
  getLocalesCodes (state): Array<string> {
    const codes: Array<string> = []

    state.availableLocales.map((value): void => {
      codes.push(value.code)
    })
    return codes
  }
}

export const mutations: MutationTree<LocaleState> = {
  setLocale (state, locale): void {
    state.locale = locale
  }
}

export const actions: ActionTree<LocaleState, RootState> = {

}
