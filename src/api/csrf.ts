import { ApiMethod } from 'plugins/api'

export interface CsrfApiRepository {
  getToken (): Promise<ResponseCsrfData>
}

interface ResponseCsrfData {
  token: string
  parameterName: string
  headerName: string
}

export default function (api: ApiMethod) {
  const csrfRepository: CsrfApiRepository = {
    async getToken() {
      const response = await api({
        url: '/csrf',
        method: 'get'
      })

      return response.data
    }
  }

  return csrfRepository
}
