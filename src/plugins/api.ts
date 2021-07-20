import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import md5 from 'md5'
import { httpRequest } from '~/types/http'
import Vue from 'vue'
import { Context } from '@nuxt/types'
import ApiItems from '@/api'

export interface ApiMethod {
  (request: httpRequest, axiosConfig?: AxiosRequestConfig): Promise<AxiosResponse>
}

export default ({ app, redirect, isClient }: Context, inject: Function) => {
  const vm = new Vue()
  const onProcess = {}

  const $axios = Axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? 'https://bi-bts-api-qa.cafe24.com/' : 'https://bi-bts-api-qa.cafe24.com/' 
  })

  $axios.interceptors.request.use(request => {
    const token = app.$cookies.get('XSRF-TOKEN')
    if ( token ) request.headers['X-XSRF-TOKEN'] = token

    return request
  })

  function setApiRequestKey (url: string, method: string, param: Object = {}) {
    return md5(`${method}/${url}/${JSON.stringify(param)}`)
  }

  const api: ApiMethod = (request, axiosConfig = {}) => {
    const method = request.method || 'get'
    const apiRequestKey = setApiRequestKey(request.url, method, request.data)
    const dupplicate = request.dupplicate || false

    if ( dupplicate !== true && onProcess[apiRequestKey] ) throw new Error('Duplicate called API')

    onProcess[apiRequestKey] = true

    const fetch: AxiosRequestConfig = {
      url: request.url,
      method,
      timeout: axiosConfig.timeout || 10000,
      headers: {
        'Content-Type': 'application/json',
        'Cache-directive': 'no-cache',
        'Pragma-directive': 'no-cache',
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache',
        'Expires': '-1'
      }
    }

    if ( request.data ) {
      if ( request.method === 'get' ) fetch.params = request.data
      else fetch.data = request.data
    }

    const i18n: any = app.i18n

    return new Promise((resolve, reject) => {
      $axios(Object.assign(fetch, axiosConfig)).then(response => {
        resolve(response)
      }).catch(e => {
        const status = e && e.response && e.response.status ? e.response.status : 500

        const response = e.response

        if (status === 500) {
          if (isClient) {
            vm.$alert(i18n.t('api.error.server') as string)
          }
        } else if (status === 401) {
          if (vm.$alert(i18n.t('api.error.server') as string)) {
            vm.$alert(i18n.t('api.error.auth') as string).then(() => {
              redirect(app.$path('login'))
            })
          } else {
            redirect(app.$path('login'))
          }
          
        } else if ((status + '').match(/^4[0-9]{2}/)) {
          const message = i18n.te(response.data.message) ? response.data.message : 'api.error.badRequest'

          vm.$alert(i18n.t(message) as string)
        }

        reject(e.response)
      }).finally(() => {
        delete onProcess[apiRequestKey]
      })
    })
  }

  const apiRepository = {}

  for (let key in ApiItems) {
    apiRepository[key.toLowerCase()] = ApiItems[key](api)
  }

  inject('apiRepository', apiRepository)
}
