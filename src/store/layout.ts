import { RootState } from 'store'
import { ActionTree, MutationTree, GetterTree } from 'vuex'


interface State {
  clientWidth: number,
  clientHeight: number,
  scrollY: number
}


export const state = (): State => ({
  clientWidth: 0,
  clientHeight: 0,
  scrollY: 0
})

export const getters: GetterTree<State, RootState> = {

}

export const mutations: MutationTree<State> = {
  setClientWidth (state, width): void {
    state.clientWidth = width
  },
  setClientHeight (state, height): void {
    state.clientHeight = height
  },
  setScrollY (state, scrollPosition): void {
    state.scrollY = scrollPosition
  }
}

export const actions: ActionTree<State, RootState> = {

}
