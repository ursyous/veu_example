import { RootState } from 'store'
import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { sampleCampaignSet } from '@/static/tempData/sampleCampaignData.json'

interface CampaignState {
  campaignList : Array<{ [key: string]: any }>,
  campaignSet : Array<{ [key: string]: any }>,
  campaignMessages : { [key: string]: string | { [key: string]: number | string } },
  campaignModal : { [key: string]: any }
}

export const state = (): CampaignState => ({
  campaignList: [],
  campaignSet: sampleCampaignSet,
  campaignMessages: {
    email: {
      actual: 3000,
      expected: 12000,
      possible: 24000
    },
    sms: {
      actual: 500,
      expected: 1000,
      possible: 100
    },
    push: {
      actual: 0,
      expected: 0,
      possible: 'No Limit'
    },
    friendTalk: {
      actual: 200,
      expected: 800,
      possible: 50
    }
  },
  campaignModal: {
    campaignId: 1,
    campaignName: 'Hello customers! It\'s a promotion!',
    campaignActive: true,
    campaignStatus: 'Finished',
    campaignDelivery: [
      {
        id: 1,
        via: 'SMS',
        date: '2019-10-02 02:03PM',
        status: 'Completed',
        sent: 2220,
        received: 2178
      },
      {
        id: 2,
        via: 'Push',
        date: '2019-10-02 02:03PM',
        status: 'Completed',
        sent: 445,
        received: 402
      },
      {
        id: 3,
        via: 'Email',
        date: '2019-10-02 02:03PM',
        status: 'Completed',
        sent: 2220,
        received: 2178
      },
      {
        id: 4,
        via: 'SMS',
        date: '2019-10-02 02:03PM',
        status: 'Ongoing',
        sent: 2220,
        received: 2178
      }
    ],
    campaignPlan: [ 'Test Plan', 'Shopping Cart Plan' ],
    campaignBudget: {
      amount: 16411,
      type: 'Repeat',
      start: '2019-09-05',
      end: '2019-09-31',
      timezone: ' AM 08:00 ~ AM 11:00 (GMT +09:00) KST'
    },
    campaignOptimize: {
      channel: 'High response rates',
      plan: 'Few Audience Plan',
      target: 'Automatic'
    }
  }
})

export const getters : GetterTree<CampaignState, RootState> = {
  getCampaignList (state) : Array<{ [key: string]: any }> {
    return state.campaignList
  },
  getCampaignSet (state) : Array<{ [key: string]: any }> {
    return state.campaignSet
  },
  getCampaignMessages (state) : { [key: string]: string | { [key: string]: number | string } } {
    return state.campaignMessages
  },
  getCampaignModal (state): { [key: string]: any } {
    return state.campaignModal
  }
}

export const actions: ActionTree<CampaignState, RootState> = {
  async GET_CAMPAIGNS ({ commit }) {
    const campaigns = await (this as any).$axios.get('https://bi-bts-api-qa.cafe24.com/campaigns').then((response: any) => {
      return response.data
    })

    commit('saveCampaign', campaigns.content)
  }
}

export const mutations: MutationTree<CampaignState> = {
  saveCampaign (state: CampaignState, payload: any) {
    state.campaignList = payload
  } 
}
