import { RootState } from 'store'
import { ActionTree, MutationTree, GetterTree } from 'vuex'


interface AppState {
  webVersion: string,
  apiVersion: string,

  userAgent: string,
  isMobile: boolean
}

export const state = (): AppState => ({
  webVersion: '',
  apiVersion: '',

  userAgent: '',
  isMobile: false
})

export const getters: GetterTree<AppState, RootState> = {
}

export const mutations: MutationTree<AppState> = {
  setAgent (state, agent): void {
    state.userAgent = agent
    state.isMobile = !(
      !agent.match(/Android/i) &&
      !agent.match(/webOS/i) &&
      !agent.match(/iPhone/i) &&
      !agent.match(/iPod/i) &&
      !agent.match(/iPad/i) &&
      !agent.match(/Blackberry/i)
    )
  }
}

export const actions: ActionTree<AppState, RootState> = {

}
