import { VNodeData } from 'vue'

export interface ComponentDetails {
  component: string
  data?: string
  vmodel?: string
  events?: object
  properties: VNodeData
  subcomponents: ComponentDetails[]
}
