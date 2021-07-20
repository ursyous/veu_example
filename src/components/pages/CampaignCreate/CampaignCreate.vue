<template>
  <div class="body-wrapper">
    <div class="campaign-create-head">
      <div class="campaign-create-head-first">
        <div class="flex items-center">
          <h1 class="page-title">
            {{ $t('pages.campaignManager.title') }}
          </h1>
          <Button v-if="userPrefData.campaignNo" class="duplicate-btn btn-solid-tertiary">
            {{ $t('pages.campaignManager.duplicateBtn') }}
            <font-awesome-icon icon="copy" size="lg" />
          </Button>
        </div>
        <div>
          <Button @click="saveChanges" class="save-btn btn-solid-primary">
            {{ $t('pages.campaignManager.saveBtn') }}
          </Button>
          <Button
            @click="goBack"
            class="btn-solid back-btn"
          >
            {{ $t('pages.campaignManager.backBtn') }}
          </Button>
        </div>
      </div>
      <div
        class="campaign-create-head-second"
      >
        <p class="p-2">
          {{ $t('pages.campaignManager.subTitle') }}
        </p>
      </div>
      <div class="campaign-create-head-third">
        <div class="flex justify-between w-3/4">
          <h1 class="pr-12 font-bold">
            {{ $t('pages.campaignManager.head.title') }}
          </h1>
          <div class="default-container flex flex-col w-3/4 border-left">
            <div class="default-container-first flex justify-start w-full items-center">
              <h3 :class="[{'asterisk-warning-title': validations.campaignNameTrimModule}]">
                {{ $t('pages.campaignManager.head.campaignName') }}
                <strong class="asterisk-warning">
                  *
                </strong>
              </h3>
              <input :placeholder="$t('pages.campaignManager.head.campaignNamePlaceHolder')" v-model="userPrefData.campaignName" class="input-style" type="text">
            </div>
            <div class="default-container-second">
              <h3 class="mr-32">
                {{ $t('pages.campaignManager.head.status') }}
              </h3>
              <ToggleSwitch v-model="userPrefData.isActive" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr>
    <div v-if="userPrefData.campaignNo && (userPrefData.campaignName === 'Campaign with plans')" class="body-and-foot-layout">
      <h1 class="font-bold">
        {{ $t('pages.campaignManager.body1.title') }}
      </h1>
      <div class="included-plan-container">
        <a @click="$router.push('/plan')" target="_blank">
          <Button class="btn-solid-primary">
            {{ $t('pages.campaignManager.body1.createPlanBtn') }}
          </Button>
        </a>
        <DataTable
          :pagination="true"
          :tableData="includedPlansData"
          :column-definition="[
            {src: 'name', label: $t('pages.campaignManager.body1.tableHeaders.planName')},
            {src: 'status', label: $t('pages.campaignManager.body1.tableHeaders.status')},
            {src: 'audience', label: $t('pages.campaignManager.body1.tableHeaders.audience')},
            {src: 'amount', label: $t('pages.campaignManager.body1.tableHeaders.amountSpent')}
          ]"
          :column-width="table1ColumnConfig"
          loading-message="Loading, please wait for a while..."
        >
          <template slot="name" slot-scope="scope">
            <div class="included-row">
              <span class="included-row-plan">
                Plan
              </span>
              <div class="included-row-title-section">
                <p class="included-row-plan-title">
                  {{ scope.data }}
                </p>
                <font-awesome-icon :value="scope.data" icon="edit" size="lg" />
              </div>
            </div>
          </template>

          <template slot="status" slot-scope="scope">
            <div class="w-full h-full m-auto">
              <ToggleSwitch :value="(scope.data === 'on') ? true : false" />
            </div>
          </template>
        </datatable>
      </div>
    </div>
    <hr>
    <div class="body-and-foot-layout">
      <h1 class="font-bold">
        {{ $t('pages.campaignManager.body2.title') }}
      </h1>
      <div class="section-parent-container">
        <div class="w-auto flex">
          <h1 class="warning-header">
            <strong class="warning-child">
              {{ $t('pages.campaignManager.body2.warning1') }}
            </strong>  {{ $t('pages.campaignManager.body2.warning2') }}
          </h1>
        </div>
        <div class="section-container">
          <h1 :class="[{'asterisk-warning-title': validations.budgetValueModule},'section-title-style']">
            {{ $t('pages.campaignManager.body2.section1.title') }} <strong class="asterisk-warning">
              *
            </strong>
          </h1>
          <div class="flex lg:w-full xl:w-1/3 xl:justify-between lg:justify-start items-center">
            <v-select
              v-model="userPrefData.budgetType"
              :options="budgetOptions"
              :reduce="opt => opt.value"
              :clearable="true"
              :placeholder="$t('pages.campaignManager.body2.section1.selectPlaceHolder')"
              value="value"
              class="text-md w-1/2 mx-2"
            />
            <div class="numeric-input">
              <NumericInput :placeholder="$t('pages.campaignManager.body2.section1.numberPlaceHolder')" v-model="userPrefData.budgetAmount" class="numeric-input-inner" /> KRW
            </div>
          </div>
        </div>
        <div class="flex flex-col xl:w-2/3 lg:w-full">
          <div class="flex w-full justify-start items-center">
            <h1>
              {{ $t('pages.campaignManager.body2.section2.titleSpend1') }}
            </h1>  <span class="font-bold text-lg px-1 text-blue-600">
              {{ futureExpense | numberFormat }}
            </span>  <h1>
              {{ $t('pages.campaignManager.body2.section2.titleSpend2') }}
            </h1>
          </div>
          <h1> {{ $t('pages.campaignManager.body2.section2.numberOfMessages') }}</h1>
          <DataTable
            :tableData="messageExpenseData"
            :column-definition="[
              {src: 'channel', label: $t('pages.campaignManager.body2.section2.tableHeaders.channel')},
              {src: 'fee', label: $t('pages.campaignManager.body2.section2.tableHeaders.fee')},
              {src: 'number', label: $t('pages.campaignManager.body2.section2.tableHeaders.possibleSend')}
            ]"
            loading-message="Loading, please wait for a while..."
          >
            <template slot="number" slot-scope="scope">
              <span class="text-blue-600 font-bold">{{ scope.data }}</span>
            </template>
          </DataTable>
        </div>
        <div class="section-container">
          <h1 class="section-title-style">
            {{ $t('pages.campaignManager.body2.section3.title') }}
            <font-awesome-icon @click="isTooltip1Show = true" v-tooltip.bottom-end="{content:this.$refs.tooltip1, trigger: 'manual', show: isTooltip1Show}" class="text-blue-600" icon="question-circle" size="sm" />
          </h1>
          <div hidden>
            <div ref="tooltip1" class="flex flex-col p-5 border bg-white shadow rounded-sm w-64">
              <div class="flex justify-between  pb-2 items-center">
                <div class="flex w-full items-center">
                  <font-awesome-icon class="text-blue-600" icon="exclamation-circle" size="lg" />
                  <h1 class="px-5 font-bold">
                    {{ $t('pages.campaignManager.body2.section3.tooltip.title') }}
                  </h1>
                </div>
                <font-awesome-icon @click="isTooltip1Show = false" icon="times" size="sm" />
              </div>
              <hr>
              <div class="flex flex-col py-2">
                <h1 class="font-bold text-sm">
                  {{ $t('pages.campaignManager.body2.section3.tooltip.subtitle1') }}
                </h1>

                <p class="px-5 text-sm break-words">
                  {{ $t('pages.campaignManager.body2.section3.tooltip.content1') }}
                </p>
                <br>
                <h1 class="font-bold text-sm">
                  {{ $t('pages.campaignManager.body2.section3.tooltip.subtitle2') }}
                </h1>

                <p class="px-5 text-sm break-words">
                  {{ $t('pages.campaignManager.body2.section3.tooltip.content2') }}
                </p>
              </div>
            </div>
          </div>
          <div class="option-container">
            <Radio v-model="userPrefData.deliveryType" :label="$t('pages.campaignManager.body2.section3.option1')" :option-value="'R'" name="radioSelection" />
            <Radio v-model="userPrefData.deliveryType" :label="$t('pages.campaignManager.body2.section3.option2')" :option-value="'O'" name="radioSelection" />
          </div>
        </div>
        <div class="section-container">
          <div class="flex xl:w-auto lg:w-auto justify-start">
            <h1 :class="[{'asterisk-warning-title': validations.dateStartNullModule },'pr-5  section-title-style']">
              {{ $t('pages.campaignManager.body2.section4.startDay') }}<strong class="text-red-500 font-bold px-2">*</strong>
            </h1>
            <client-only>
              <v-date-picker v-model="userPrefData.startDay" :popover="{ placement: 'bottom', visibility: 'click' }" class="flex items-center w-auto mx-2 border border-gray-500 rounded-lg h-10">
                <span class="p-2 w-10 bg-blue-600 hover:bg-blue-600 text-white rounded-l-lg focus:outline-none border-none text-center cursor-pointer">
                  <font-awesome-icon icon="calendar" size="xs" />
                </span>
                <input
                  ref="inputDate1"
                  :placeholder="new Date().toLocaleDateString()"
                  v-model="formattedDates[0]"
                  class="calendarInputStyle outline-none"
                  readonly
                >
              </v-date-picker>
            </client-only>
          </div>

          <div v-if="userPrefData.deliveryType === 'R'" class="flex w-auto justify-start pl-5">
            <h1 :class="[{'asterisk-warning-title': validations.dateEndNullModule },'section-title-style-2 font-bold']">
              {{ $t('pages.campaignManager.body2.section4.endDay') }}
            </h1>
            <client-only>
              <v-date-picker v-model="userPrefData.endDay" :popover="{ placement: 'bottom', visibility: 'click' }" class="flex items-center w-auto mx-2  border border-gray-500 rounded-lg h-10">
                <span class="p-2 w-10 bg-blue-600 hover:bg-blue-600 text-white rounded-l-lg focus:outline-none border-none text-center cursor-pointer">
                  <font-awesome-icon icon="calendar" size="xs" />
                </span>
                <input
                  ref="inputDate1"
                  :placeholder="new Date().toLocaleDateString()"
                  v-model="formattedDates[1]"
                  class="calendarInputStyle outline-none"
                  readonly
                >
              </v-date-picker>
            </client-only>
          </div>
        </div>
        <div class="section-container">
          <h1 class="section-title-style">
            {{ $t('pages.campaignManager.body2.section5.title') }}  <strong class="asterisk-warning">
              *
            </strong>
            <font-awesome-icon @click="isTooltip2Show = true" v-tooltip.bottom-end="{content:this.$refs.tooltip2, trigger: 'manual', show: isTooltip2Show}" class="text-blue-600" icon="question-circle" size="sm" />
          </h1>
          <div hidden>
            <div ref="tooltip2" class="tooltip-outer-container">
              <div class="tooltip-inner-container">
                <div class="flex w-full items-center">
                  <font-awesome-icon class="text-blue-600" icon="exclamation-circle" size="lg" />
                  <h1 class="px-5 font-bold">
                    {{ $t('pages.campaignManager.body2.section5.tooltip.title') }}
                  </h1>
                </div>
                <font-awesome-icon @click="isTooltip2Show = false" icon="times" size="sm" />
              </div>
              <hr>
              <div class="tooltip-contents">
                <p class="tooltip-contents-text">
                  {{ $t('pages.campaignManager.body2.section5.tooltip.content1') }}<br>
                  {{ $t('pages.campaignManager.body2.section5.tooltip.content2') }}
                </p>
              </div>
            </div>
          </div>
          <div class="time-segment-container">
            <v-select v-model="userPrefData.timeSegment" :options="timeSegments" :placeholder="$t('pages.campaignManager.body2.section5.segmentPlaceHolder')" class="w-2/3 xl:mr-2 lg:mr-0" />
            (GMT +09:00) KST
          </div>
        </div>
        <div class="section-container">
          <h1 class="section-title-style">
            {{ $t('pages.campaignManager.body2.section6.title') }}
          </h1>
          <div class="option-container">
            <div class="w-auto pr-5">
              <Radio v-model="userPrefData.useAcceptBeforeDelivery" :label="$t('pages.campaignManager.body2.section6.option1')" option-value="T" name="radioSelection2" />
              <v-select v-show="userPrefData.useAcceptBeforeDelivery === 'T'" v-model="userPrefData.alarmTypeBeforeDelivery" :options="alarmTypeBeforeDeliveryOptions" class="w-full pt-5" />
            </div>
            <Radio v-model="userPrefData.useAcceptBeforeDelivery" :label="$t('pages.campaignManager.body2.section6.option2')" option-value="F" name="radioSelection2" />
          </div>
        </div>
        <div class="section-container">
          <h1 class="section-title-style">
            {{ $t('pages.campaignManager.body2.section7.title') }}
          </h1>
          <div class="option-container">
            <Radio v-model="userPrefData.useAlarmBeforeDelivery" :ellipsis="false" :label="$t('pages.campaignManager.body2.section7.option1')" option-value="F" name="radioSelection3" />
            <Radio
              v-model="userPrefData.useAlarmBeforeDelivery"
              :ellipsis="false"
              :label="$t('pages.campaignManager.body2.section7.option2')"
              option-value="T"
              class="pl-5"
              name="radioSelection3"
            />
          </div>
        </div>
      </div>
    </div>
    <hr>
    <div class="body-and-foot-layout">
      <h1 class="font-bold">
        {{ $t('pages.campaignManager.foot1.title') }}
      </h1>
      <div class="optimization-container">
        <Radio :ellipsis="false" v-model="userPrefData.optimizationType" :label="$t('pages.campaignManager.foot1.option1')" name="radioSelection4" option-value="A" />
        <Radio
          :ellipsis="false"
          v-model="userPrefData.optimizationType"
          :label="$t('pages.campaignManager.foot1.option2')"
          class="py-8"
          name="radioSelection4"
          option-value="S"
        />
        <Radio :ellipsis="false" v-model="userPrefData.optimizationType" :label="$t('pages.campaignManager.foot1.option3')" name="radioSelection4" option-value="M" />
        <transition name="fade">
          <div v-if="userPrefData.optimizationType === 'M'" class="manual-section">
            <div class="manual-section-containers">
              <h1 class="w-48 px-5">
                {{ $t('pages.campaignManager.foot1.manualMode.channelPriority') }}
              </h1>
              <v-select v-model="channelPriorityData" :options="$t('pages.campaignManager.foot1.manualMode.channelPriorityOptions')" class="w-1/2" />
            </div>
            <div class="manual-section-containers">
              <h1 class="w-48 px-5">
                {{ $t('pages.campaignManager.foot1.manualMode.planPriority') }}
              </h1>
              <v-select v-model="planPriorityData" :options="$t('pages.campaignManager.foot1.manualMode.planPriorityOptions')" class="w-1/2" />
            </div>
            <div class="manual-section-containers">
              <h1 class="w-48 px-5">
                {{ $t('pages.campaignManager.foot1.manualMode.targetPriority') }}
              </h1>
              <v-select v-model="targetPriorityData" :options="$t('pages.campaignManager.foot1.manualMode.targetPriorityOptions')" class="w-1/2" />
            </div>
            <div class="flex flex-col py-2">
              <div class="manual-section-containers">
                <h1 class="w-64 px-5">
                  {{ $t('pages.campaignManager.foot1.manualMode.manualOption1.title') }}
                </h1>
                <div class="option-container">
                  <Radio v-model="messagesInARow" :option-value="true" :label="$t('pages.campaignManager.foot1.manualMode.manualOption1.optionA')" name="radioSelection5" class="pr-5" />
                  <Radio v-model="messagesInARow" :option-value="false" :label="$t('pages.campaignManager.foot1.manualMode.manualOption1.optionB')" name="radioSelection5" />
                </div>
              </div>
              <div class="manual-section-containers">
                <h1 class="w-64 px-5">
                  {{ $t('pages.campaignManager.foot1.manualMode.manualOption2.title') }}
                </h1>
                <div class="option-container">
                  <Radio v-model="repeatedMessages" :option-value="true" :label="$t('pages.campaignManager.foot1.manualMode.manualOption1.optionA')" name="radioSelection6" class="pr-5" />
                  <Radio v-model="repeatedMessages" :option-value="false" :label="$t('pages.campaignManager.foot1.manualMode.manualOption2.optionB')" name="radioSelection6" />
                </div>
              </div>
              <div class="manual-section-containers">
                <h1 class="w-64 px-5">
                  {{ $t('pages.campaignManager.foot1.manualMode.manualOption3.title') }}
                </h1>
                <div class="option-container">
                  <Radio v-model="repeatedPlan" :option-value="true" :label="$t('pages.campaignManager.foot1.manualMode.manualOption1.optionA')" name="radioSelection7" class="pr-5" />
                  <Radio v-model="repeatedPlan" :option-value="false" :label="$t('pages.campaignManager.foot1.manualMode.manualOption3.optionB')" name="radioSelection7" />
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
    <hr>
    <div class="foot-container">
      <h1 v-if="userPrefData.campaignNo" @click="deleteCampaign" class="delete-btn">
        {{ $t('pages.campaignManager.foot2.deleteBtn') }}
      </h1>
      <Button @click="saveChanges" class="btn-solid-primary save-btn ml-auto mr-0">
        {{ $t('pages.campaignManager.saveBtn') }}
      </Button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import Confirms from '@/types/Classes/Confirms'

/**
 * Campaign create component page
 * @author Angelito Diwata <angelito@simplexi.com.ph>
 * @since 2019.12.12
 */
@Component({

})
export default class CampaignCreate extends mixins( Confirms ) {
    /**
     * Hoolds the value of included plans table
     */
    includedPlansData: Array<{[key: string]: any}> = [
      {
        name: 'Test Plan',
        status: 'on',
        audience: '5',
        amount: '₩3,400'
      },

      {
        name: 'Shopping cart abandonment strategies plan',
        status: 'off',
        audience: '2,007',
        amount: '₩3,400'
      }
    ]

    alarmTypeBeforeDeliveryMessages: any = this.$nuxt.$t('pages.campaignManager.body2.section6.option1Options')

    alarmTypeBeforeDeliveryValues: Array<any> = [ 'A', 'B', 'C', 'D', 'E' ]

    get alarmTypeBeforeDeliveryOptions (): {[key: string]: any} {
      const alarmDeliveryOptions: Array<any> = []
      this.alarmTypeBeforeDeliveryMessages.forEach((value: any, index: any) => {
        alarmDeliveryOptions.push({ label: value, option: this.alarmTypeBeforeDeliveryValues[index] })
      })
      return alarmDeliveryOptions
    }

    /**
     * Hoolds the value of message expense table
     */
    messageExpenseData: Array<{[key: string]: any}> = [
      {
        'channel': 'Email',
        'fee': '0.5 KRW',
        'number': '164,410'
      }
    ]

    /**
     * Holds the value of the future amount to be spent
     */
    futureExpense: number = 164410


    /**
     * Holds the time segement's option data
     */
    timeSegments: Array<string> = [
      'AM 08:00 ~ AM 11:00',
      'AM 11:00 ~ PM 02:00',
      'PM 02:00 ~ PM 05:00',
      'PM 05:00 ~ PM 08:00'
    ]

    /**
     * Determines the confguraion of the table's conlumns
     */
    table1ColumnConfig: {[key: string]: string} = {
      'name': '450',
      'status': '80'
    }

    /**
     * determines the visibility of the 1st tooltip
     */
    isTooltip1Show: boolean = false

    /**
     * determines the visibility of the 2nd tooltip
     */
    isTooltip2Show: boolean = false

    /**
     * Values we base on to display the included plans
     */
    hasIncludedPlans: boolean = true

    /**
     * Determines if repeated plan option is enabled
     */
    repeatedPlan: boolean = false

    /**
     * Determines if repeated messages option is enabled
     */
    repeatedMessages: boolean = false

    /**
     * Determines if messages in a row  option is enabled
     */
    messagesInARow: boolean = false

    /**
     * holds the data to be selected by the channel priority select
     */
    channelPriorityData: string = ''

    /**
     * holds the data to be selected by the plan priority select
     */
    planPriorityData: string = ''

    /**
     * holds the data to be selected by the target priority select
     */
    targetPriorityData: string = ''

    /**
     * Campaign name maximum length
     */
    maxCampaignNameLength: number = 20

    /**
     * user defined data and also a channel to API data
     */
    userPrefData : {[key: string]: any} = {
      'alarmTypeBeforeDelivery': '15 minutes ago',
      'budgetAmount': 0,
      'budgetType': 'D',
      'campaignName': '',
      'delTimestamp': '2019-12-16T07:05:44.183Z',
      'delUser': 'string',
      'deliveryType': 'O',
      'endDay': null,
      'insTimestamp': '2019-12-16T07:05:44.183Z',
      'insUser': 'string',
      'isActive': false,
      'mallId': 'string',
      'optimizationType': 'automatic',
      'serviceLevel': 0,
      'startDay': null,
      'timeSegment': 'AM 08:00 ~ AM 11:00',
      'updTimestamp': '2019-12-16T07:05:44.183Z',
      'updUser': 'string',
      'useAcceptBeforeDelivery': false,
      'useAlarmBeforeDelivery': true,
      'shopNo': 1
    }

    /**
     * acts as the reactor upon validation
     */
    get validationsReactor (): {[key: string]: any} {
      const base = this.userPrefData
      const length = (name: string) =>  base[name].length
      const isNull = (value: any) => typeof value === 'object' && !value

      return {
        campaignNameTrimModule: length('campaignName') === 0,
        campaignNameLengthModule: base.campaignName.trim.length >= this.maxCampaignNameLength,
        budgetValueModule: parseInt(base.budgetAmount) <= 0 || length('budgetAmount') === 0,
        dateStartNullModule: isNull(base.startDay) && base.startDay <= new Date(),
        dateEndNullModule: isNull(base.endtDay) && base.deliveryType === 'R' || base.endtDay <= new Date() && base.deliveryType === 'R'
      }
    }

    /**
     * reactively gets the value of selectedDates when changed
     * @returns Array of dates
     */
    get formattedDates () : Array<string | null> {
      const date1: string | null = (!this.userPrefData.startDay) ? null : new Date(this.userPrefData.startDay).toDateString()
      const date2: string | null = (!this.userPrefData.endDay) ? null : new Date(this.userPrefData.endDay).toDateString()

      return [ date1, date2 ]
    }

    /**
     * Acts as values of the budget selection
     */
    get budgetOptions () {
      return [ {
        'label': this.$t('pages.campaignManager.body2.section1.budgetOptions')[0],
        'value': 'D'
      },
      {
        'label': this.$t('pages.campaignManager.body2.section1.budgetOptions')[1],
        'value': 'L'
      } ]
    }

    /**
     * Validation values to check upon form submission
     */
    validations : {[key: string]: any} = {
      campaignNameTrimModule: false,
      campaignNameLengthModule: false,
      budgetValueModule: false,
      dateStartNullModule: false,
      dateEndNullModule: false
    }

    /**
     * Format of the alert for confirmation
     */
    alertFormat (title: string, type: string) : void {
      this.$alert(this.setMessageTitle(title), type)
    }

    /**
     * Callback alert for confirms function
     */
    validateSaveCallBack () : void {
      if (Object.values(this.validations).includes(true)) {
        this.alertFormat(this.$t('pages.campaignManager.confirms.errorTitle'), 'warning')
      } else {
        this.alertFormat(this.$t('pages.settings.alerts.success.saveEdit'), 'success')
      }
    }


    goBack () : void {
      // this.confirmCancel(this.$t('pages.campaignManager.confirms.title'), this.$t('pages.campaignManager.confirms.desc'))
      if (confirm(this.$t('pages.campaignManager.confirms.title')))
        this.$router.push('/campaigns')
    }

    /**
     * calls the store if validations doesn't contain true values
     */
    async saveChanges () :  Promise<any> {
      this.validations = this.validationsReactor
      console.log(this.userPrefData)
      if (await this.confirmSave(this.validateSaveCallBack) && !Object.values(this.validations).includes(true)) {
        const result = await this.$store.dispatch('auth/setStateData', this.userPrefData)
        console.log(result)
        if (this.userPrefData.campaignNo === undefined)
          this.$router.push('/campaigns')
        else
          window.location.reload()
      }
    }

    /**
     * Executes the delete campaign API call
     */
    async deleteCampaign () : Promise<any> {
      if (confirm(this.$t('pages.campaignManager.confirms.delete.title'))) {
        const response = await this.$store.dispatch('auth/deleteCampaign', this.userPrefData.campaignNo)
        if (!response)
          this.$router.push('/campaigns')
        else
          alert(this.$t('pages.campaignManager.confirms.delete.errorTitle'))
      }
    }

    /**
     * loads routed campaign info upon creation
     */
    async created (): Promise<void> {
      if (typeof this.$route.params.id !== 'undefined') {
        this.userPrefData = await this.$store.dispatch('auth/getCampaign', this.$route.params.id)
        this.userPrefData.isActive = this.userPrefData.isActive === 'T'
        this.userPrefData.startDay = new Date(this.userPrefData.startDay)
        this.userPrefData.endDay = new Date(this.userPrefData.endDay)
      }
    }
}
</script>

<style lang="postcss" scoped>
@import './CampaignCreate.sss'
</style>
