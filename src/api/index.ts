import { default as Delivery, DeliveryRepository } from './delivery'
import { default as Plans, PlanRepository } from './plans'
import { default as Csrf, CsrfApiRepository } from './csrf'

export default {
  Plans,
  Delivery,
  Csrf
}

declare module 'vue/types/vue' {
  interface Vue {
    $apiRepository: ApiRepository
  }
}

interface ApiRepository {
  plans: PlanRepository
  delivery: DeliveryRepository
  csrf: CsrfApiRepository
}
