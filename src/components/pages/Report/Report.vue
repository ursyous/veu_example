<template>
  <div>
    <div class="head-container">
      <span class="text-page-title">
        {{ $t('pages.Reports.title') }}
      </span>
      <div class="head-dates">
        <div class="my-1">
          <p class="text-right text-sm">
            Last Update: {{ lastUpdate }}
          </p>
        </div>
        <client-only>
          <div class="date-picker-container">
            <input :value="dateChanged" class="date-picker-input" readonly>
            <div class="date-picker">
              <div class="date-picker-calendar">
                <client-only>
                  <v-date-picker
                    :input-debounce="500"
                    v-model="date"
                    :mode="'range'"
                    is-inline
                    class="bg-white p-2 w-full h-full rounded shadow"
                  />
                </client-only>
              </div>
              <ul class="date-picker-presets">
                <li v-for="(preset, key) in datePreset" :key="key" @click="jumpToDateFunction(preset.parameters.type, preset.parameters.direction, preset.parameters.jump)">
                  {{ preset.label }}
                </li>
              </ul>
            </div>
          </div>
        </client-only>
      </div>
    </div>
    <div class="overview-container">
      <div class="overview-title">
        <span class="text-section-title">
          {{ $t('pages.Reports.overviews.title') }}
        </span>
      </div>
      <div class="overview-content">
        <div :key="index" v-for="(content, index) in overviews" class="overview-item">
          <span class="item-title">
            {{ $t(`pages.Reports.overviews.${content.title}`) }}
          </span>
          <div class="item-value-container">
            <span v-if="content.title !== 'tsr'" class="item-value">{{ content.value | numberFormat }}</span>
            <span v-else class="item-value">{{ `${content.value} KRW` }}</span>
            <span :class="[content.direction === 'up' ? 'positive' : 'negative', 'item-status']">
              <font-awesome-icon :icon="`caret-${content.direction}`" fas />
              {{ content.percent }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="performance-container">
      <div class="performance-title">
        <span class="text-section-title">
          {{ $t('pages.Reports.performance.title') }}
        </span>
      </div>
      <div class="performance-content">
        <div class="summary-container">
          <div class="summary-item">
            <span class="item-value">12,000</span>
            <span class="item-title">{{ $t('pages.Reports.performance.sentMessages') }}</span>
          </div>
          <div class="summary-item">
            <span class="item-value">200,000KRW</span>
            <span class="item-title">{{ $t('pages.Reports.performance.amountSpent') }}</span>
          </div>
          <div class="summary-item">
            <span class="item-value">1,000</span>
            <span class="item-title">{{ $t('pages.Reports.performance.sellingProducts') }}</span>
          </div>
          <div class="summary-item">
            <span class="item-value">{{ 1100000 | numberFormat }}</span>
            <span class="item-title">{{ $t('pages.Reports.performance.conversionRevenue') }}</span>
          </div>
          <div class="summary-item">
            <span class="item-value">5.5%</span>
            <span class="item-title">{{ $t('pages.Reports.performance.roi') }}</span>
          </div>
        </div>

        <div class="stats-container">
          <div class="stats-chart">
            <GChart
              :data="chartData"
              :options="setChartOption()"
              type="LineChart"
            />
          </div>
          <div class="stats-desc">
            <div v-for="(content, index) in averages" :key="index" class="stats-item">
              <span class="item-title">{{ $t(`pages.Reports.performance.${content.title}`) }}</span>
              <div class="item-values-container">
                <span class="item-value">{{ content.value }}</span>
                <span v-if="content.direction" :class="[content.direction === 'up' ? 'negative' : 'positive', 'item-status']">
                  <font-awesome-icon :icon="content.direction === 'up' ? 'caret-up' : 'caret-down'" fas />
                  {{ content.percent }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="report-table-container">
      <div class="report-table-title">
        <span class="text-section-title">
          {{ $t('pages.Reports.topCampaigns') }}
        </span>
      </div>
      <div class="table-container">
        <DataTable
          :pagination="true"
          :tableData="sampleTableData"
          :sortable="true"
          :columnDefinition="[
            { src: 'via', label: $t(`${localePrefix}.via`), width: '80'},
            { src: 'campaign', label: $t(`${localePrefix}.campaignname`), width: '300'},
            { src: 'received', label: $t(`${localePrefix}.received`)},
            { src: 'spent', label: $t(`${localePrefix}.amountspent`)},            
            { src: 'clickRate', label: $t(`${localePrefix}.clickrate`)},
            { src: 'clickCost', label: $t(`${localePrefix}.costperclick`)},
            { src: 'conversionRate', label: $t(`${localePrefix}.conversionrate`)},
            { src: 'conversionCost', label: $t(`${localePrefix}.costperconversion`)},
            { src: 'clickRate', label: $t(`${localePrefix}.conversiondays`)}
          ]"
          empty-message="There is no shipment history"
          loading-message="Loading, please wait for a while..."
        >
          <template slot="via" slot-scope="scope">
            <font-awesome-icon v-if="scope.data === 'SMS'" :value="scope.data" icon="sms" size="lg" />
            <font-awesome-icon v-if="scope.data === 'Push'" :value="scope.data" icon="mobile" size="lg" />
            <font-awesome-icon v-if="scope.data === 'Email'" :value="scope.data" icon="envelope" size="lg" />
          </template>

          <template slot="campaign" slot-scope="scope">
            <p @click="modalShow = true" href="" class="font-bold text-link">
              {{ scope.data }}
            </p>
          </template>
        </DataTable>
        <DeliveryHistoryModal v-show="modalShow" @close="modalShow = false" :delivery-id="1" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { mapGetters } from 'vuex'
import DeliveryHistoryModal from '@/components/pages/DeliveryHistory/DeliveryModal.vue'

/**
 * Report page
 * @author Angelito Diwata <angelito@simplexi.com.ph>
 * @author Lowell Dave Agnir <lowell@simplexi.com.ph>
 * @since 2019.11.28
 */
@Component({
  components: { DeliveryHistoryModal },
  computed: {
    ...mapGetters({
      overviews: 'reports/getOverviews',
      averages: 'reports/getAverages',
      chartData: 'reports/getChartData',
      sampleTableData: 'reports/getTableData'
    })
  }
})

export default class Report extends Vue {
  /**
   * this holds the datePresets labels and parameters
   */
  readonly datePreset : Array< { [key: string]: any } > = [
    { label: 'All', parameters: { type: null, direction: null, jump: null } },
    { label: 'today', parameters: { type: 'day', direction: 'last', jump: 0 } },
    { label: 'tomorrow', parameters: { type: 'day', direction: 'tomorrow', jump: 1 } },
    { label: 'last 7 days', parameters: { type: 'day', direction: 'last', jump: 7 } },
    { label: 'last 14 days', parameters: { type: 'day', direction: 'last', jump: 14 } },
    { label: 'last 30 days', parameters: { type: 'day', direction: 'last', jump: 30 } },
    { label: 'this week', parameters: { type: 'day', direction: 'this-week', jump: 7 } },
    { label: 'last week', parameters: { type: 'day', direction: 'last-week', jump: 7 } },
    { label: 'this month', parameters: { type: 'month', direction: 'this' } },
    { label: 'last month', parameters: { type: 'month', direction: 'last' } }
  ]

  /**
   * this holds the last update date
   */
  lastUpdate: string = new Date().toLocaleDateString()

  /**
   * this holds the current page that the modal will display
   */
  currentModalPage: number = 1

  /**
   * determines if the modal must be shown or not
   */
  modalShow: boolean = false

  /**
   * this holds the locale prefix for the columns
   */
  localePrefix: string = 'pages.DeliveryHistory.tablecolumns'

  /**
   * this holds thechart options of the GChart
   */
  chartOptions: { [key: string]: any } = {
    title: '',
    titlePosition: 'out',
    subtitle: 'Open, Click',
    backgroundColor: 'white',
    titleTextStyle: {
      color: '#35363a',
      fontSize: 15,
      bold: false,
      italic: false
    }
  }

  /**
   * this holds the date data to be modeled into the datepicker
   */
  date: { [key: string]: any } = {
    start: null,
    end: null
  }

  /**
   * serves as the model to the main date input
   * @returns string
   */
  get dateChanged (): string {
    const todayDate: Date = new Date()
    const customStartDate: string = (this.date.start !== null ? this.date.start : todayDate).toLocaleDateString()
    const customEndDate: string = (this.date.end !== null ? this.date.end : todayDate).toLocaleDateString()
    
    return this.date.start === null || this.date.end === null ? 'No Filter' : `${customStartDate} - ${customEndDate}`
  }
  
  /**
   * sets the chart options
   * @returns object
   */
  setChartOption () : { [key: string]: any } {
    this.chartOptions.title = this.$t('pages.Reports.performance.openClickRateGraph')
    return this.chartOptions
  }

  /**
   * Function that manages the allocation of date jumping
   */
  jumpToDateFunction (prefix: string | null = null, direction: string, delta: number = 0): void {
    if (prefix !== null) {
      this[`${prefix}Jump`]({ prefix, direction, delta })
    } else {
      this.date.start = null
      this.date.end = null
    }
  }

  /**
   * Function thats in charge of jumping through days
   */
  dayJump (paramObject: {[key: string]: any}): void {
    const currentDate: Date = (paramObject.direction.includes('-week') === true) ? this.getWeekStart(new Date()) : new Date()
    const endDate: Date = (paramObject.direction.includes('-week') === true) ? this.getWeekStart(new Date()) : new Date()
    if (paramObject.direction === 'last' || paramObject.direction ===  'last-week') {
      this.date.start = new Date(currentDate.setDate(currentDate.getDate() - paramObject.delta))
      this.date.end = endDate
    } else {
      this.date.start = endDate
      this.date.end = new Date(currentDate.setDate(currentDate.getDate() + paramObject.delta))
    }
  }
  
  /**
   * Function that's in charge of jumping through months
   */
  monthJump (paramObject: {[key: string]: any}): void {
    if (paramObject.direction === 'this') {
      const currentDate: { [key: string]: any } = this.spanMonth(new Date())
      this.date.start = currentDate.from
      this.date.end = currentDate.to
    } else {
      const currentDate: { [key: string]: any } = this.spanMonth(new Date(new Date().setMonth(new Date().getMonth() - 1)))
      this.date.start = currentDate.from
      this.date.end = currentDate.to
    }
  }

  /**
   * Function that's in charge of getting the first day of
   * the current week
   * @returns Date
   */
  getWeekStart (date: Date): Date {
    const newDate = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1)

    return new Date(date.setDate(newDate))
  }

  /**
   * Function that's in charge of getting the first day of the month
   * @returns object
   */
  spanMonth (date: Date): { [key: string]: any } {
    const startDay: Date = new Date(date.getFullYear(), date.getMonth(), 1)
    const endDay: Date = new Date(date.getFullYear(), date.getMonth() + 1, 0)

    return {
      from: startDay,
      to: endDay
    }
  }
}
</script>
<style lang="postcss" scoped>
@import './Report.sss';
</style>
