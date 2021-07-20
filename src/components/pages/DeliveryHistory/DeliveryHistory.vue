<template>
  <div class="flex col-row">
    <div class="filter-container">
      <div class="page-title">
        <span class="text-page-title">
          {{ $t(`${localePrefix.pageContent}.title`) }}
        </span>
      </div>
      <div class="filter-content">
        <div class="flex row-col">
          <div class="filter-item">
            <span class="text-content-item">
              {{ $t(`${localePrefix.pageContent}.via.title`) }}
            </span>
            <div class="m-2">
              <Checkbox v-model="selectedVia" :label="$t(`${localePrefix.pageContent}.via.email`)" option-value="Email" />
            </div>
            <div class="m-2">
              <Checkbox v-model="selectedVia" :label="$t(`${localePrefix.pageContent}.via.sms`)" option-value="SMS" />
            </div>
            <div class="m-2">
              <Checkbox v-model="selectedVia" :label="$t(`${localePrefix.pageContent}.via.push`)" option-value="Push" />
            </div>
            <div class="m-2">
              <Checkbox v-model="selectedVia" :label="$t(`${localePrefix.pageContent}.via.kakaotalk`)" option-value="KakaoTalk" />
            </div>
            <hr class="line-separator">
          </div>

          <div class="filter-item">
            <span class="text-content-item">
              {{ $t(`${localePrefix.pageContent}.status.title`) }}
            </span>
            <div class="m-2">
              <Checkbox v-model="selectedStatus" :label="$t(`${localePrefix.pageContent}.status.completed`)" option-value="Completed" />
            </div>
            <div class="m-2">
              <Checkbox v-model="selectedStatus" :label="$t(`${localePrefix.pageContent}.status.failure`)" option-value="Failure" />
            </div>
            <hr class="line-separator">
          </div>

          <div class="filter-item">
            <span class="text-content-item">
              {{ $t(`${localePrefix.pageContent}.date.title`) }}
            </span>
            <div class="my-1">
              <client-only>
                <v-date-picker v-model="selectedDate1" :popover="{ placement: 'bottom', visibility: 'click' }" class="datepicker">
                  <span class="picker-span bg-primary">
                    <font-awesome-icon icon="calendar" size="xs" />
                  </span>
                  <input
                    ref="inputDate1"
                    :placeholder="$t(`${localePrefix.pageContent}.date.placeholders.start`)"
                    v-model="formattedDates[0]"
                    class="picker-input"
                    readonly
                  >
                </v-date-picker>
              </client-only>
              <span>~</span>
              <client-only>
                <v-date-picker v-model="selectedDate2" :popover="{ placement: 'bottom', visibility: 'click' }" class="datepicker">
                  <span class="picker-span bg-primary">
                    <font-awesome-icon icon="calendar" size="xs" />
                  </span>
                  <input
                    ref="inputDate1"
                    :placeholder="$t(`${localePrefix.pageContent}.date.placeholders.end`)"
                    v-model="formattedDates[1]"
                    class="picker-input"
                    readonly
                  >
                </v-date-picker>
              </client-only>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="table-container">
      <DataTable
        :advancedFilter="filters"
        :advancedFilterFunction="advancedFilterFunctions"
        :allowSearch="true"
        :auto-complete="true"
        :pagination="true"
        :tableData="deliveryHistories"
        :columnDefinition="[
          { src: 'via', label: $t(`${localePrefix}.via`)},
          { src: 'date', label: $t(`${localePrefix}.datetime`)},
          { src: 'campaign', label: $t(`${localePrefix}.campaignname`)},
          { src: 'status', label: $t(`${localePrefix}.status`)},
          { src: 'sent', label: $t(`${localePrefix}.sent`)},
          { src: 'received', label: $t(`${localePrefix}.received`)},
          { src: 'spent', label: $t(`${localePrefix}.amountspent`)},
          { src: 'clickRate', label: $t(`${localePrefix}.clickrate`)},
          { src: 'clickCost', label: $t(`${localePrefix}.costperclick`)},
          { src: 'conversionRate', label: $t(`${localePrefix}.conversionrate`)},
          { src: 'conversionCost', label: $t(`${localePrefix}.costperconversion`)},
          { src: 'detail', label: $t(`${localePrefix}.detail`)}
        ]"
        :search-column="[ 'campaign' ]"
        :auto-search-column="'campaign'"
        :selectRowCount="false"
        empty-message="There is no shipment history"
        loading-message="Loading, please wait for a while..."
      >
        <template slot="via" slot-scope="scope">
          <font-awesome-icon v-if="scope.data === 'SMS'" :value="scope.data" icon="sms" size="lg" />
          <font-awesome-icon v-if="scope.data === 'Push'" :value="scope.data" icon="mobile" size="lg" />
          <font-awesome-icon v-if="scope.data === 'Email'" :value="scope.data" icon="envelope" size="lg" />
        </template>

        <template slot="campaign" slot-scope="scope">
          <span @click="modalShow = true" href="" class="font-bold text-link">
            {{ scope.data }}
          </span>
        </template>

        <template slot="status" slot-scope="scope">
          <span :class="scope.data === 'Completed' ? 'text-success' : 'text-danger'">
            {{ scope.data }}
          </span>
        </template>

        <template slot="detail">
          <span class="font-bold text-link">
            view
          </span>
        </template>
      </DataTable>
    </div>
    <DeliveryModal v-show="modalShow" @close="modalShow = !modalShow" :delivery-id="1" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import DeliveryModal from './DeliveryModal.vue'
import { ParamGetHistories, DeliveryHistoryItem } from '~/api/delivery'

/**
 * Delivery History Page
 * @author Angelito Diwata <angelito@simplexi.com.ph>
 * @author Lowell Dave Agnir <lowell@simplexi.com.ph>
 * @since 2019.11.22
 */
@Component({
  components: { DeliveryModal }
})
export default class DeliveryHistory extends Vue {
    /**
     * this holds the 1st calendar's selected date
    */
    selectedDate1 : Date | null = null

    /**
     * this holds the 2nd calendar's selected date
     */
    selectedDate2 : Date | null = null

    /**
     * this holds the table data to be displayed by the data table
     */
    deliveryHistories : Array<DeliveryHistoryItem> = []

    /**
     * determines if the modal must be shown or not
     */
    modalShow: boolean = false

    /**
     * this holds the locale prefix for the columns
     */
    localePrefix : { [key: string]: string } = {
      tableColumn: 'pages.DeliveryHistory.tablecolumns',
      pageContent: 'pages.DeliveryHistory'
    }

    /**
     * the filter functions to be used in data table's filtering feature
     */
    advancedFilterFunctions : { [key : string] : Function } = {
      via: this.columnFilter,
      status: this.columnFilter,
      date: this.dateFilter
    }

    /**
     * Array of filters in medium category
     */
    selectedVia : Array<string> = []

    /**
     * Array of filters in status category
     */
    selectedStatus : Array<string> = []

    /**
     * reactively gets the value of selectedDates when changed
     */
    get formattedDates () : Array<string | null> {
      const date1: string | null = (!this.selectedDate1) ? null : this.selectedDate1.toDateString()
      const date2: string | null = (!this.selectedDate2) ? null : this.selectedDate2.toDateString()

      return [ date1, date2 ]
    }

    async getHistories () {
      const param: ParamGetHistories = {
        searchStartDate: '2019-12-01',
        searchEndDate: '2019-12-31'
      }

      const res = await this.$apiRepository.delivery.getHistories(param)

      this.deliveryHistories = res.content
    }

    /**
     *  gets the advanced filters
     */
    get filters () : { [key : string] : any } {
      return {
        via: { 'value': this.selectedVia, 'column': 'via' },
        status: { 'value': this.selectedStatus, 'column': 'status' },
        date: {
          'from': this.selectedDate1,
          'to': this.selectedDate2
        }
      }
    }

    /**
     *  serves as filter function for the columns
     */
    columnFilter  (rows: Array<{[key: string]: any}>, value: {[key: string]: any}) : {[key: string]: any} {
      return (value.value.length === 0) ? rows : rows.filter(row => value.value.includes(row[value.column]))
    }

    /**
     *  serves as filter function for the date
     */
    dateFilter (rows: Array<{[key: string]: any}>, value: { from: string, to: string}) : Array<{[key: string] : any}> {
      return (value.from === null || value.to === null) ? rows : rows.filter(row => {
        const baseDate : number = new Date(row.date).setHours(0, 0, 0, 0)
        const dataDate1 : number = new Date(value.from).setHours(0, 0, 0, 0)
        const dataDate2 : number = new Date(value.to).setHours(0, 0, 0, 0)

        return baseDate >= dataDate1 && baseDate <= dataDate2
      })
    }

    mounted () {
      this.getHistories()
    }
}
</script>

<style lang="postcss" scoped>
@import './DeliveryHistory.sss';
</style>
