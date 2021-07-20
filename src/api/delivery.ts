import { ApiMethod } from 'plugins/api'

enum DeliveryHistoryStatus {
  COMPLETED, FAILURE
}

enum DeliveryChannel {
  EMAIL, PUSH, KAKAOTALK, SMS
}

export interface DeliveryRepository {
  getHistories (param: ParamGetHistories): Promise<ResponseDeliveryHistories>
}

export interface ParamGetHistories {
  campaignName?: string
  page?: number
  searchStartDate?: string
  searchEndDate?: string
  status?: Array<DeliveryHistoryStatus>
  via?: Array<DeliveryChannel>
}

export interface DeliveryHistoryItem {
  campaignNo: number
  campaignName: string
  amountSpent: number
  received: number
  send: number
  sendDate: Date
  status: string
  via: string
}

export interface ResponseDeliveryHistories {
  content: Array<DeliveryHistoryItem>
  empty: boolean
  first: boolean
  last: boolean
  number: number
  numberofElements: number
  pageable: PaginagtionData
  size: number
}

interface PaginagtionData {
  offset: number
  pageNumber: number
  pageSize: number
  paged: boolean
  sort: {
    empty: boolean
    sorted: boolean
    unsorted: boolean
  }
  unpaged: boolean
}

export default function (api: ApiMethod) {
  const deliveryRepository: DeliveryRepository = {
    async getHistories (param): Promise<ResponseDeliveryHistories> {
      const response = await api({
        url: '/delivery/histories',
        method: 'get',
        data: {
          ...param
        }
      })
  
      return response.data
    }
  }

  return deliveryRepository
}
