import { ApiMethod } from 'plugins/api'

export interface LoginRepository {
  getLoginData (): Promise<ResponseLoginData>
}

interface ResponseLoginData {
  mallId: string
  loginId: string
}

export default function (api: ApiMethod) {
  const loginRepository: LoginRepository = {
    async getLoginData (): Promise<ResponseLoginData> {
      const response = await api({
        url: '/user/login',
        method: 'get'
      })
  
      return response.data
    }
  }

  return loginRepository
}
