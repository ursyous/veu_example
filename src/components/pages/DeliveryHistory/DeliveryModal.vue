<template>
  <Modal>
    <template v-slot:modal-header>
      <div class="modal-header">
        <div class="header-container">
          <span class="header-title">{{ deliveryHistory.title }}</span>
          <ToggleSwitch :value="deliveryHistory.status" class="m-2" />
        </div>
        <font-awesome-icon @click="closeModal" class="cursor-pointer" icon="times" size="lg" />
      </div>
    </template>
    <template v-slot:modal-content>
      <div class="modal-content">
        <div class="left-panel">
          <ul class="menu-list">
            <li @click="currentMenu = 1">
              {{ $t(`${localePrefix.modalLabel}.recentdelivery.menutitle`) }}
            </li>
            <li @click="currentMenu = 2">
              {{ $t(`${localePrefix.modalLabel}.plans.menutitle`) }}
            </li>
            <li @click="currentMenu = 3">
              {{ $t(`${localePrefix.modalLabel}.budgetschedule.menutitle`) }}
            </li>
            <li @click="currentMenu = 4">
              {{ $t(`${localePrefix.modalLabel}.optimization.menutitle`) }}
            </li>
          </ul>
        </div>
        <div class="right-panel">
          <div v-show="currentMenu === 1">
            <div class="page-title-container justify-between">
              <span class="page-title">{{ $t(`${localePrefix.modalLabel}.recentdelivery.title`) }}</span>
              <a href="/deliveryHistory" target="_blank" class="hover:underline cursor-pointer text-sm">
                {{ $t(`${localePrefix.modalLabel}.viewmore`) }}
              </a>
            </div>
            <DataTable
              :tableData="deliveryHistory.recentDelivery"
              :columnDefinition="[
                { src: 'via', label: $t(`${localePrefix.tableColumn}.via`)},
                { src: 'date', label: $t(`${localePrefix.tableColumn}.datetime`)},
                { src: 'status', label: $t(`${localePrefix.tableColumn}.status`)},
                { src: 'sent', label: $t(`${localePrefix.tableColumn}.sent`)},
                { src: 'received', label: $t(`${localePrefix.tableColumn}.received`)},
              ]"
              :table-height="500"
              :selectRowCount="false"
              loading-message="Loading, please wait for a while..."
            >
              <template slot="via" slot-scope="scope">
                <div class="flex w-full justify-center">
                  <font-awesome-icon v-if="scope.data === 'SMS'" icon="sms" size="lg" />
                  <font-awesome-icon v-else-if="scope.data === 'Push'" icon="mobile" size="lg" />
                  <font-awesome-icon v-else-if="scope.data === 'Email'" icon="envelope" size="lg" />
                  <font-awesome-icon v-else icon="share-square" size="lg" />
                </div>
              </template>

              <template slot="date" slot-scope="scope">
                <div class="w-full flex justify-center">
                  {{ scope.data }}
                </div>
              </template>

              <template slot="status" slot-scope="scope">
                <div class="w-full flex justify-center">
                  <p :class="[scope.data === 'Completed' ? 'text-green-500' : '', 'text-center']">
                    {{ scope.data }}
                  </p>
                </div>
              </template>

              <template slot="sent" slot-scope="scope">
                <div class="flex justify-end text-right w-full">
                  {{ scope.data | numberFormat }}
                </div>
              </template>

              <template slot="received" slot-scope="scope">
                <div class="flex justify-end text-right w-full">
                  {{ scope.data | numberFormat }}
                </div>
              </template>
            </DataTable>
          </div>
          <div v-show="currentMenu === 2">
            <div class="page-title-container">
              <span class="page-title">{{ $t(`${localePrefix.modalLabel}.plans.title`) }}</span>
            </div>
            <ul class="p-10">
              <li v-for="(plan, key) in deliveryHistory.plan" :key="`plan${key}`" class="my-5">
                {{ plan }}
              </li>
            </ul>
          </div>
          <div v-show="currentMenu === 3">
            <div class="page-title-container">
              <span class="page-title">{{ $t(`${localePrefix.modalLabel}.budgetschedule.title`) }}</span>
            </div>
            <ul class="list-container">
              <li>
                <span class="item-header">{{ $t(`${localePrefix.modalLabel}.budgetschedule.dailybudget`) }}</span>
                <span class="item-content">{{ deliveryHistory.budget.dailyBudget | numberFormat }} KRW</span>
              </li>
              <li>
                <span class="item-header">{{ $t(`${localePrefix.modalLabel}.budgetschedule.deliverytype`) }}</span>
                <span class="item-content">{{ deliveryHistory.budget.deliveryType }}</span>
              </li>
              <li>
                <span class="item-header">{{ $t(`${localePrefix.modalLabel}.budgetschedule.startday`) }}</span>
                <span class="item-content">{{ deliveryHistory.budget.startDay }}</span>
              </li>
              <li>
                <span class="item-header">{{ $t(`${localePrefix.modalLabel}.budgetschedule.endday`) }}</span>
                <span class="item-content">{{ deliveryHistory.budget.endDay }}</span>
              </li>
              <li>
                <span class="item-header">{{ $t(`${localePrefix.modalLabel}.budgetschedule.timesegment`) }}</span>
                <span class="item-content">{{ deliveryHistory.budget.timeSegment }}</span>
              </li>
            </ul>
          </div>
          <div v-show="currentMenu === 4">
            <div class="page-title-container">
              <span class="page-title">{{ $t(`${localePrefix.modalLabel}.optimization.title`) }}</span>
            </div>
            <p>{{ $t('pages.settings.sections.campaign.subSections.defaults.infos.optimization.options.manual') }}</p>
            <ul class="list-container">
              <li>
                <span class="item-header">{{ $t(`${localePrefix.modalLabel}.optimization.channelpriority`) }}</span>
                <span class="item-content">{{ deliveryHistory.optimization.channel }}</span>
              </li>
              <li>
                <span class="item-header">{{ $t(`${localePrefix.modalLabel}.optimization.planpriority`) }}</span>
                <span class="item-content">{{ deliveryHistory.optimization.plan }}</span>
              </li>
              <li>
                <span class="item-header">{{ $t(`${localePrefix.modalLabel}.optimization.targetpriority`) }}</span>
                <span class="item-content">{{ deliveryHistory.optimization.target }}</span>
              </li>
              <li>
                <span> {{ $t(`${localePrefix.modalLabel}.optimization.warn1`) }}</span>
              </li>
              <li>
                <span> {{ $t(`${localePrefix.modalLabel}.optimization.warn2`) }}</span>
              </li>
              <li>
                <span> {{ $t(`${localePrefix.modalLabel}.optimization.warn3`) }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </template>
    <template v-slot:modal-footer>
      <div :class="['modal-footer', { 'justify-between': deleteOption, 'justify-end': !deleteOption }]">
        <span
          v-if="deleteOption"
          @click="confirmCancel( $t(`${localePrefix.modalLabel}.deletebtn.title`), $t(`${localePrefix.modalLabel}.deletebtn.subtitle`))"
          class="text-link text-gray-700 text-sm"
        >
          {{ $t(`${localePrefix.modalLabel}.deletebtn.button`) }}
        </span>
        <div>
          <Button @click="closeModal" class="btn-solid-tertiary">
            {{ $t(`${localePrefix.modalLabel}.closebtn`) }}
          </Button>
          <Button
            v-if="!ongoingCampaign"
            @click="$router.push('/campaignManager')"
            class="btn-solid-primary"
          >
            {{ $t(`${localePrefix.modalLabel}.editbtn`) }}
          </Button>
        </div>
      </div>
    </template>
  </Modal>
</template>

<script lang="ts">
import { Component, Emit, Prop, mixins } from 'nuxt-property-decorator'
import Confirms from '@/types/Classes/Confirms'
import sampleData from '~/static/tempData/DHSampleData.json'

/**
 * Campaign Details Modal Page
 * @author Lowell Dave Agnir <lowell@simplexi.com.ph>
 * @author Angelito Diwata <angelito@simplexi.com.ph>
 * @since 2019.12.18
 */

@Component
export default class DeliveryModal extends mixins(Confirms) {
  /**
   * Campaign ID to get from the API
  */
  @Prop({ type: Number, default: null }) deliveryId !: number | null

  /**
   * allowing campaign deletion option for the campaign modal
  */
  @Prop({ type: Boolean, default: false }) deleteOption !: boolean

  /**
   * current modal page
  */
  currentMenu : number = 1

  /**
   * prefix for the locales
  */
  localePrefix : { [key: string]: string } = {
    tableColumn: 'pages.DeliveryHistory.tablecolumns',
    modalLabel: 'pages.DeliveryHistory.modal'
  }

  /**
   * toggle for editing campaign
  */
  ongoingCampaign: boolean = false

  /**
   * data container for the modal
  */
  deliveryHistory : { [key: string]: any } = {
    title: 'VIP MEMBERS CAMPAIGN',
    status: true,
    recentDelivery: sampleData,
    plan: [ 'Test Plan', 'Shopping cart abandonment strategies plan' ],
    budget: {
      dailyBudget: 16411,
      deliveryType: 'Repeat',
      startDay: '2019-09-05',
      endDay: '2019-09-31',
      timeSegment: 'AM 08:00 ~ AM 11:00 (GMT +09:00) KST'
    },
    optimization: {
      channel: 'High response rates',
      plan: 'Few audience plan',
      target: 'Automatic'
    }
  }

  /**
   * closeModal
   * 
   * @return boolean
  */
  @Emit('close')
  closeModal () : boolean {
    return false
  }
}
</script>

<style lang="postcss" scoped>
  @import './DeliveryModal.sss';
</style>
