import { ApiMethod } from 'plugins/api'

export interface PlanRepository {
  getOptions (mallId: string): Promise<ResponsePlanOptions>
  createPlan (data: RequestCreatePlan): Promise<ResponsePlanCreate>
}

export interface ResponsePlanCreate {
  planNo: number
  planName: string
}

export interface ResponsePlanOptions {
  campaigns : Array<CampaignItem>,
  channels : Array<ChannelItem>,
  customers : Array<CustomerItem>,
  products : Array<ProductsState>,
  filters : Array<FiltersItem>,
}

export interface RequestCreatePlan {
  campaignNo: number
  channelNo: Array<number>
  customers: Array<number>
  filters: Array<RequestFilterItem>
  isActive: string
  mallId: string
  planName: string
  products: Array<number>
}

export interface RequestFilterItem {
  filterVariableNo: number
  detailNo?: number
  stringValue?: string
  numberValue?: number
  minNumberValue?: number
  maxNumberValue?: number
  isIncludeLeft?: string
  isIncludeRight?: string
}

interface CampaignItem {
  campaignNo : number,
  campaignName : string
}

interface ChannelItem {
  channelNo: number
  channelName: string
  channelNameI18n: string
}

interface CustomerItem {
  segmentNo: number
  segmentName: string
  segmentNameI18n: string
}

interface ProductsState {
  segmentNo : number,
  segmentName : string
}

interface FiltersItem {
  filterNo : number,
  filterName : string,
  filterVariables : Array<FilterVariable>
}

interface FilterVariable {
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
  filterVariableDetails : Array<FilterVariableDetails>
}

interface FilterVariableDetails {
  detailNo: number,
  stringValue: string,
  stringlabel: string
}

export default function (api: ApiMethod) {
  const planRepository: PlanRepository = {
    async getOptions (mallId) {
      const response = await api({
        url: '/plans/options',
        method: 'get',
        data: {
          mallId
        }
      })

      return response.data
    },
    async createPlan (data) {
      const response = await api({
        url: '/plans',
        method: 'post',
        data
      })

      return response.data
    }
  }

  return planRepository
}
