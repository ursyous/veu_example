import { RootState } from 'store'
import { ActionTree, MutationTree, GetterTree } from 'vuex'
// import AuthApi from '@/api/auth'

interface LoginData {
  nickname: string,
  thumbnailUrl: string,
  locale: string,
  mallID: string,
  userName: string,
}

interface AuthState {
  isLogin: boolean,
  loginData: LoginData | undefined,
  isLocallyConnected: boolean
}

const apiBaseUrl: String = 'https://bi-bts-api-qa.cafe24.com'

export const state = (): AuthState => ({
  isLogin: false,
  loginData: undefined,
  isLocallyConnected: false
})

export const getters: GetterTree<AuthState, RootState> = {
  getLoginLocale (state): string {
    return state.isLogin && state.loginData ? state.loginData.locale : ''
  },

  getUsername (state): string {
    return  state.isLogin && state.loginData ? state.loginData.userName : ''
  },

  getMallID (state): string {
    return  state.isLogin && state.loginData ? state.loginData.mallID : ''
  },

  getConnectionState (state): boolean {
    return state.isLocallyConnected
  }
}

export const mutations: MutationTree<AuthState> = {
  setLoginData (state, loginData): void {
    state.isLogin = true
    state.loginData = loginData
  },
  setLogout (state): void {
    state.isLogin = false
    state.loginData = undefined
  }
}

export const actions: ActionTree<AuthState, RootState> = {
  setAuthData (): void {
    // const response = await AuthApi.getLoginData()
  },

  async setStateData ({ commit, getters }, payload): Promise<{[key: string]: void}> {
    // Temporary
    const isActive: Object = {
      true: 'T',
      false: 'F'
    }
    payload.alarmTypeBeforeDelivery = (payload.alarmTypeBeforeDelivery.option) ? payload.alarmTypeBeforeDelivery.option : 'N'
    payload.budgetAmount = parseInt(payload.budgetAmount, 10)
    payload.insUser = (getters.getUsername === '') ? 'string' : getters.getUsername
    payload.mallId = (getters.getMallID === '') ? 'string' : getters.getMallID
    payload.isActive = isActive[`${payload.isActive}`]
    payload.endDay = (payload.deliveryType === 'O') ? payload.startDay : payload.endDay
    const apiMethod = (payload.campaignNo) ? 'PUT' : 'POST'
    const apiUrl = (payload.campaignNo) ? apiBaseUrl + '/campaign/' + payload.campaignNo  : apiBaseUrl + '/campaigns'
    const result = await (this as any).$axios({
      method: apiMethod,
      url: apiUrl,
      data: payload
    }).then(
      (res: { [key: string]: any }) => {
        return res
      }
    )

    return result
  },

  async getCampaign ({ commit }, payload): Promise<{[key: string]: void}> {
    const result = await (this as any).$axios({
      method: 'GET',
      url: `${apiBaseUrl}/campaign/${payload}`
    }).then(
      (res: { [key: string]: any }) => {
        return res.data
      }
    )

    return result
  },

  async deleteCampaign ({ commit }, payload): Promise<{[key: string]: void}> {
    const result = await (this as any).$axios({
      method: 'DELETE',
      url: `${apiBaseUrl}/campaign/${payload}`
    }).then(
      (res: { [key: string]: any }) => {
        return res.data
      }
    )

    return result
  }
}
