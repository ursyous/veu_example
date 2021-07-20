import { RootState } from 'store'
import { GetterTree } from 'vuex'
import sampleData from '~/static/tempData/DHSampleData.json'

interface stateInterface {
    tableData : Array<{[key: string]: any}>,
    overviews: Array<{[key: string]: any}>,
    averages: Array<{[key: string]: any}>,
    chartData: Array<{[key: string]: any}>
}

export const state = () : stateInterface => ({
  tableData: sampleData,
  overviews: [
    {
      'title': 'visitors',
      'value': 100000,
      'percent': '1.87%',
      'direction': 'up'
    },
    {
      'title': 'newMembers',
      'value': 900,
      'percent': '1.87%',
      'direction': 'down'
    },
    {
      'title': 'loginMembers',
      'value': 1500,
      'percent': '12.87%',
      'direction': 'up'
    },
    {
      'title': 'pageViews',
      'value': 7500,
      'percent': '2.87%',
      'direction': 'down'
    },
    {
      'title': 'tsr',
      'value': '1.9',
      'percent': '2.87%',
      'direction': 'up'
    }
  ],
  averages: [
    {
      'title': 'aveCostPerMessage',
      'value': '12 won',
      'percent': '',
      'direction': null
    },
    {
      'title': 'aveClickThrough',
      'value': '6.19%',
      'percent': '1.87%',
      'direction': 'up'
    },
    {
      'title': 'aveConversion',
      'value': '5.94%',
      'percent': '0.12%',
      'direction': 'down'
    }
  ],
  chartData: [
    [ 'Year', 'Open', 'Click' ],
    [ '08-19', 6.00, 4.00 ],
    [ '08-20', 5.10, 2.30 ],
    [ '08-21', 7.10, 4.50 ],
    [ '08-22', 5.10, 3.00 ],
    [ '08-23', 4.80, 2.60 ],
    [ '08-24', 5.90, 2.40 ],
    [ '08-25', 7.30, 2.60 ]
  ]
})

export const getters : GetterTree<stateInterface, RootState> = {
  getTableData (state) : Array<{[key: string]: any}> {
    return state.tableData
  },
  getOverviews (state) : Array<{[key: string]: any}> {
    return state.overviews
  },
  getAverages (state) : Array<{[key: string]: any}> {
    return state.averages
  },
  getChartData (state) : Array<{[key: string]: any}> {
    return state.chartData
  }
}
