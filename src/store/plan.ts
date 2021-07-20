import { RootState } from 'store'
import { ActionTree, MutationTree, GetterTree } from 'vuex'

interface State {
  target: Array<TargetRecommendationsOptions>,
  filter: Array<FilterOptions>,
  recommendations: Array<TargetRecommendationsOptions>
}

interface TargetRecommendationsOptions {
  filterNo: string,
  label: string,
  variables: Array<VariablesState>
}

interface FilterOptions {
  label: string,
  filterNo: string,
  variables: Array<VariablesState>,
  detailNo: number,
  stringValue: string,
  stringLabel: string,
  numberValue: number,
  minNumberValue: number,
  maxNumberValue: number,
  isIncludeLeft: string,
  isIncludeRight: string
}

interface VariablesState {
  filterVariableNo : number,
  filterVariableName : string,
  variableDataType : string,
  editorType : string,
  isRequired : string,
  isMultipleValue : string,
  minValue: string,
  maxValue: string,
  defaultValue : string,
  incrementalValue : number,
  filterVariableDetails : Array<VariableDetailsState>
}

interface VariableDetailsState {
  detailNo: number,
  stringValue: string,
  stringlabel: string
}

export const state = (): State => ({
  target: [],
  filter: [],
  recommendations: []
})

export const getters: GetterTree<State, RootState> = {
  getPlanTargetOption (state): Array<any> {
    return state.target
  },
  getPlanFilterOption (state): Array<any> {
    return state.filter
  },
  getPlanRecommendationsOption (state): Array<any> {
    return state.recommendations
  }
}

export const mutations: MutationTree<State> = {
  addFilterOptions (state, data: any) {
    const index = state.filter.findIndex(options => options.filterNo === data.itemNo)
    if ( index >= 0) {
      state.filter[index] = JSON.parse(JSON.stringify(data.data))
    } else {
      state.filter.push(JSON.parse(JSON.stringify(data.data)))
    }
  },
  removeFilterOptions (state, itemNo: string) {
    state.filter.splice(state.filter.findIndex(options => options.filterNo === itemNo), 1)
  },
  addTargetOptions (state, request: TargetRecommendationsOptions) {
    state.target = JSON.parse(JSON.stringify([ request ]))
  },
  removeTargetOptions (state, itemNo: string) {
    state.target.splice(state.target.findIndex(options => options.filterNo === itemNo), 1)
  },
  addRecommendationsOptions (state, request: TargetRecommendationsOptions) {
    state.recommendations = JSON.parse(JSON.stringify([ request ]))
  },
  removeRecommendationsOptions (state, itemNo: string) {
    state.recommendations.splice(state.recommendations.findIndex(options => options.filterNo === itemNo), 1)
  }
}

export const actions: ActionTree<State, RootState> = {
  addFilterOptions ({ commit, state },  data: any ) {
    commit('addFilterOptions', data)
  },
  removeFilterOptions ({ commit }, itemNo: string ) {
    commit('removeFilterOptions', itemNo)
  },
  addTargetOptions ({ commit, state }, request: TargetRecommendationsOptions) {
    commit('addTargetOptions', request)
  },
  removeTargetOptions ({ commit }, itemNo: string ) {
    commit('removeTargetOptions', itemNo)
  },
  addRecommendationsOptions ({ commit, state },  data: any ) {
    commit('addRecommendationsOptions', data)
  },
  removeRecommendationsOptions ({ commit }, itemNo: string ) {
    commit('removeRecommendationsOptions', itemNo)
  }
}
