import { RootState } from 'store'
import { GetterTree } from 'vuex'

interface DashboardState {
  startModule : Array<object>,
  sentMessage : Number,
  conversionRevenue : Number,
  clickRate : Array<Array<String | Number>>,
  clickRateOption : Object,
  conversionRate: Array<Array<String | Number>>,
  conversionRateOption : Object,
  recentCampaign: Array<Object>,
  recentPlan: Array<Object>,
  recentNews: Array<Object>,
  recentActivity: Array<Object>
}

export const state = (): DashboardState => ({
  startModule: [
    { title: 'Create Campaign', active: true },
    { title: 'Create Plan', active: false },
    { title: 'Edit Template', active: true },
    { title: 'Active Campaign', active: false } 
  ],
  sentMessage: 123456,
  conversionRevenue: 123456789,
  clickRate: [
    [ 'Year', 'Sales', 'Expenses', 'Profit' ],
    [ '2014', 1000, 400, 200 ],
    [ '2015', 1170, 460, 250 ],
    [ '2016', 660, 1120, 300 ],
    [ '2017', 1030, 540, 350 ]
  ],
  clickRateOption: {
    chart: {
      title: 'Company Performance',
      subtitle: 'Sales, Expenses, and Profit: 2014-2017'
    }
  },
  conversionRate: [
    [ 'Year', 'Sales', 'Expenses', 'Profit' ],
    [ '2014', 1000, 400, 200 ],
    [ '2015', 1170, 460, 250 ],
    [ '2016', 660, 1120, 300 ],
    [ '2017', 1030, 540, 350 ]
  ],
  conversionRateOption: {
    chart: {
      title: 'Company Performance',
      subtitle: 'Sales, Expenses, and Profit: 2014-2017'
    }
  },
  recentCampaign: [
    { title: 'Title 1', active: true },
    { title: 'Title 2', active: true },
    { title: 'Title 3', active: false },
    { title: 'Title 4', active: false },
    { title: 'Title 5', active: false }
  ],
  recentPlan: [
    { title: 'Title 1' },
    { title: 'Title 2' },
    { title: 'Title 3' },
    { title: 'Title 4' },
    { title: 'Title 5' }
  ],
  recentNews: [
    { 
      title: 'content Title1', 
      content: { 
        header: 'content Header1', 
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' 
      } 
    },
    { 
      title: 'content Title2', 
      content: { 
        header: 'content Header2', 
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' 
      } 
    },
    { 
      title: 'content Title3', 
      content: { 
        header: 'content Header3', 
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' 
      } 
    }
  ],
  recentActivity: [
    { title: 'Create New Campaign', date: '2019-11-25 11:00:00', action: 'Admin' },
    { title: 'Campaign Delivered', date: '2019-11-21 11:00:00', action: 'Automation' },
    { title: 'Campaign Delivered', date: '2019-11-21 11:00:00', action: 'Automation' },
    { title: 'Create New Campaign', date: '2019-11-19 11:00:00', action: 'Admin' },
    { title: 'Campaign Delivered', date: '2019-11-18 11:00:00', action: 'Automation' }
  ]
})

export const getters: GetterTree<DashboardState, RootState> = {
  getDashboard (state, getters) : object {
    const dashboardData = {
      startModule: getters.getStartModule,
      sentMessage: getters.getSentMessage,
      conversionRevenue: getters.getConversionRevenue,
      clickRate: getters.getClickRate,
      clickRateOption: getters.getClickRateOption,
      conversionRate: getters.getConversionRate,
      conversionRateOption: getters.getConversionRateOption,
      recentCampaign: getters.getRecentCampaign,
      recentPlan: getters.getRecentPlan,
      recentNews: getters.getRecentNews,
      recentActivity: getters.getRecentActivity
    }
    return dashboardData
  },
  getStartModule (state) : object {
    return state.startModule
  },
  getSentMessage (state) : object {
    return state.sentMessage
  },
  getConversionRevenue (state) : object {
    return state.conversionRevenue
  },
  getClickRate (state) : Array<object> {
    return state.clickRate
  },
  getClickRateOption (state) : Object {
    return state.clickRateOption
  },
  getConversionRate (state) : Array<object> {
    return state.conversionRate
  },
  getConversionRateOption (state) : Object {
    return state.conversionRateOption
  },
  getRecentCampaign (state) : Array<object> {
    return state.recentCampaign
  },
  getRecentPlan (state) : Array<object> {
    return state.recentPlan
  },
  getRecentNews (state) : Array<object> {
    return state.recentNews
  },
  getRecentActivity (state) : Array<object> {
    return state.recentActivity
  }
}
