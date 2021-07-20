import { ActionContext } from 'vuex'
import { Context } from '@nuxt/types'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RootState {}

export const state: RootState = (): void => {}
export const mutations = (): void => {}

export const actions = {
  async nuxtServerInit ({ commit, dispatch }: ActionContext<RootState, RootState>, { app, req }: Context): Promise<void> {
    commit('app/setAgent', req.headers['user-agent'])

    await dispatch('auth/setAuthData')

    // await app.$apiRepository.csrf.getToken()

    // commit('locale/setDefaultLocale')
  }
}
