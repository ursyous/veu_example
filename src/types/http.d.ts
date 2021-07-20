import { AxiosRequestConfig, Method } from 'axios'

export interface httpRequest {
  url: string,
  method: Method,
  data?: Object,
  dupplicate?: Boolean
}

export interface httpPlugin {
  (request: httpRequest, axiosConfig?: AxiosRequestConfig): void;
}
