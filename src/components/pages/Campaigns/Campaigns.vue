<template>
  <div class="campaign-page">
    <div class="my-2">
      <div class="campaign-header-container justify-between">
        <span class="font-bold text-2xl self-center">{{ $t('pages.campaigns.title') }}</span>
        <Button class="btn-solid-primary">
          {{ $t('pages.campaigns.buttons.refresh') }} &nbsp;
          <font-awesome-icon fas icon="sync" />
        </Button>
      </div>
      <div class="campaign-content-container">
        <div class="campaign-content w-full">
          <div class="content-row">
            <div class="content-title">
              <small>{{ $t('pages.campaigns.sections.campaignSummary.scheduledMessage.title') }}:
                <b>{{ new Date().toDateString() }}</b>
              </small>
            </div>
            <div class="content-body-flex">
              <div class="content-item">
                <p>• {{ $t('pages.campaigns.sections.campaignSummary.scheduledMessage.email') }} : {{ $t('pages.campaigns.commons.done') }} {{ campaignMessages.email.actual | numberFormat }}건 / {{ $t('pages.campaigns.commons.expected') }} {{ campaignMessages.email.expected |numberFormat }}건</p>
              </div>
              <div class="content-item">
                <p>• {{ $t('pages.campaigns.sections.campaignSummary.scheduledMessage.sms') }} : {{ $t('pages.campaigns.commons.done') }} {{ campaignMessages.sms.actual | numberFormat }} / {{ $t('pages.campaigns.commons.expected') }} {{ campaignMessages.sms.expected | numberFormat }}</p>
              </div>
              <div class="content-item">
                <p>• {{ $t('pages.campaigns.sections.campaignSummary.scheduledMessage.push') }} : {{ $t('pages.campaigns.commons.done') }} {{ campaignMessages.push.actual | numberFormat }} / {{ $t('pages.campaigns.commons.expected') }} {{ campaignMessages.push.expected | numberFormat }}</p>
              </div>
              <div class="content-item">
                <p>• {{ $t('pages.campaigns.sections.campaignSummary.scheduledMessage.friendTalk') }} : {{ $t('pages.campaigns.commons.done') }} {{ campaignMessages.friendTalk.actual | numberFormat }} / {{ $t('pages.campaigns.commons.expected') }} {{ campaignMessages.friendTalk.expected | numberFormat }}</p>
              </div>
            </div>
          </div>
          <div class="content-row">
            <div class="content-title">
              <small>{{ $t('pages.campaigns.sections.campaignSummary.possibleMessage') }}</small>
            </div>
            <div class="content-body-flex">
              <div class="content-item">
                <div class="inline-item">
                  <p>• {{ $t('pages.campaigns.sections.campaignSummary.scheduledMessage.email') }} : {{ campaignMessages.email.possible | numberFormat }}</p>
                  <span class="end-label">{{ $t('pages.campaigns.sections.campaignSummary.charging') }}</span>
                </div>
              </div>
              <div class="content-item">
                <div class="inline-item">
                  <p>• {{ $t('pages.campaigns.sections.campaignSummary.scheduledMessage.sms') }} : {{ campaignMessages.sms.possible | numberFormat }}</p>
                  <span class="end-label">{{ $t('pages.campaigns.sections.campaignSummary.charging') }}</span>
                </div>
              </div>
              <div class="content-item">
                <div class="inline-item">
                  <p>• {{ $t('pages.campaigns.sections.campaignSummary.scheduledMessage.push') }} : {{ campaignMessages.push.possible }}</p>
                </div>
              </div>
              <div class="content-item">
                <div class="inline-item">
                  <p>• {{ $t('pages.campaigns.sections.campaignSummary.scheduledMessage.friendTalk') }} : {{ campaignMessages.friendTalk.possible | numberFormat }}</p>
                  <span class="end-label">{{ $t('pages.campaigns.sections.campaignSummary.charging') }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="content-row">
            <div class="content-title">
              <small>{{ $t('pages.campaigns.sections.campaignSummary.timeline') }}</small>
            </div>
            <div class="content-body-scroll">
              <div v-for="(campaignSet, idx) in campaignSets" :key="`campaignSet${idx}`" :class="[ campaignSet.active === true ? 'active' : campaignSet.active === false ? 'disabled' : '' , 'content-item', 'w-1/4' ]">
                <div class="item-header">
                  <span>{{ campaignSet.time }}</span>
                </div>
                <div class="item-body">
                  <ul v-if="campaignSet.campaigns.length > 0">
                    <li v-for="campaign in campaignSet.campaigns" :key="`campaignItem${campaign.id}`">
                      <div class="campaign-info">
                        <font-awesome-icon fas icon="folder-open" class="mx-2 my-1" size="2x" />
                        <div class="flex-col">
                          <span @click="isShowModal = true" class="campaign-title">
                            {{ campaign.name.name }}
                          </span>
                          <p v-for="plan in campaign.children" :key="`plan${plan.id}`" class="sub-tree">
                            {{ plan.name.name }}
                            <font-awesome-icon :icon="plan.status === true ? 'check-circle' : 'circle'" fas />
                          </p>
                        </div>
                      </div>
                      <div class="campaign-status">
                        <div class="badge-container">
                          <span :id="`campaign${campaign.id}`" v-if="campaign.status === 'Completed'" class="badge badge-outline-success">{{ $t('pages.campaigns.buttons.completed') }}</span>
                          <span :id="`campaign${campaign.id}`" v-else-if="campaign.status === 'Stopped'" class="badge badge-outline-danger">{{ $t('pages.campaigns.buttons.stopped') }}</span>
                          <span :id="`campaign${campaign.id}`" v-else-if="campaign.status === 'Delivering'" class="badge badge-outline-primary">
                            <font-awesome-icon fas icon="spinner" class="spin" />
                            {{ $t('pages.campaigns.buttons.delivering') }}
                          </span>
                          <span :id="`campaign${campaign.id}`" v-else-if="campaign.status === 'Confirm'" class="badge badge-outline-warning">
                            {{ $t('pages.campaigns.buttons.confirmRequired') }}
                          </span>
                        </div>
                        <div class="option-container">
                          <span v-if="campaign.status === 'Stopped'" :campaignNo="campaign.id" @click="toggleDelivery" class="badge badge-solid-disable">{{ $t('pages.campaigns.buttons.resume') }}</span>
                          <span v-else-if="campaign.status === 'Delivering'" :campaignNo="campaign.id" @click="toggleDelivery" class="badge badge-solid-danger">{{ $t('pages.campaigns.buttons.stop') }}</span>
                          <span v-else-if="campaign.status === 'Confirm'" :campaignNo="campaign.id" @click="toggleDelivery" class="badge badge-solid-success">{{ $t('pages.campaigns.buttons.confirm') }}</span>
                        </div>
                      </div>
                    </li>
                  </ul>
                  <ul v-else>
                    <li class="empty">
                      <span>
                        <font-awesome-icon fas icon="folder-open" size="2x" />&nbsp;
                        {{ $t('pages.campaigns.sections.campaignSummary.noCampaign') }}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="campaign-content-container">
        <div class="campaign-content lg:w-full xl:w-1/6">
          <div class="content-row">
            <Button @click="isShowCreate = true" class="btn-solid-primary w-full">
              <font-awesome-icon fas icon="plus" />&nbsp;
              {{ $t('pages.campaigns.buttons.create') }}
            </Button>
          </div>
          <div class="content-row-block">
            <div class="content-row">
              <div class="content-title">
                <span>{{ $t('pages.campaigns.sections.campaignList.status') }}</span>
              </div>
              <div class="content-body-block">
                <div class="content-item">
                  <Checkbox v-model="checkValues.status" :option-value="true" label="On" />
                </div>
                <div class="content-item">
                  <Checkbox v-model="checkValues.status" :option-value="false" label="Off" />
                </div>
              </div>
            </div>

            <div class="content-row">
              <div class="content-title">
                <span>{{ $t('pages.campaigns.sections.campaignList.delivery') }}</span>
              </div>
              <div class="content-body-block">
                <div class="content-item">
                  <Checkbox v-model="checkValues.delivery" label="Active" option-value="Active" />
                </div>
                <div class="content-item">
                  <Checkbox v-model="checkValues.delivery" label="Inactive" option-value="Inactive" />
                </div>
                <div class="content-item">
                  <Checkbox v-model="checkValues.delivery" label="Completed" option-value="Completed" />
                </div>
                <div class="content-item">
                  <Checkbox v-model="checkValues.delivery" label="Failed" option-value="Failed" />
                </div>
              </div>
            </div>

            <div class="content-row">
              <div class="content-title">
                <span>{{ $t('pages.campaigns.sections.campaignList.ends') }}</span>
              </div>
              <div class="content-body-block">
                <div class="content-item">
                  <Checkbox v-model="checkValues.ends" label="Ongoing" option-value="Ongoing" />
                </div>
                <div class="content-item">
                  <Checkbox v-model="checkValues.ends" label="(Select Period)" option-value="Select" />
                </div>
                <div class="content-item">
                  <client-only>
                    <v-date-picker v-model="selectedStart" popover-direction="top" class="flex items-center w-full border border-gray-500 rounded-lg h-10 ">
                      <span class="p-2 w-10 bg-blue-600 hover:bg-blue-600 text-white rounded-l-lg focus:outline-none border-none text-center cursor-pointer">
                        <font-awesome-icon icon="calendar" size="xs" />
                      </span>
                      <input
                        ref="inputDate1"
                        :placeholder="$t('pages.DeliveryHistory.date.placeholders.start')"
                        :value="selectedStart.toDateString()"
                        class="px-2"
                        readonly
                      >
                    </v-date-picker>
                  </client-only>
                  <span>~</span>
                  <client-only>
                    <v-date-picker v-model="selectedEnd" popover-direction="top" class="flex items-center w-full border border-gray-500 rounded-lg h-10">
                      <span class="p-2 w-10 bg-blue-600 hover:bg-blue-600 text-white rounded-l-lg focus:outline-none border-none text-center cursor-pointer">
                        <font-awesome-icon icon="calendar" size="xs" />
                      </span>
                      <input
                        ref="inputDate1"
                        :placeholder="$t('pages.DeliveryHistory.date.placeholders.end')"
                        :value="selectedEnd.toDateString()"
                        class="px-2"
                        readonly
                      >
                    </v-date-picker>
                  </client-only>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="campaign-content lg:ml-0 xl:ml-2 lg:w-full xl:w-5/6 dataTable">
          <DataTable
            :advanced-filter="filters"
            :server-side-processing="true"
            :allow-search="true"
            :auto-complete="true"
            :pagination="true"
            :column-definition="[
              { src: 'name', label: $t('pages.campaigns.sections.campaignList.name'), width: '500px' },
              { src: 'status', label: $t('pages.campaigns.sections.campaignList.status') },
              { src: 'delivery', label: $t('pages.campaigns.sections.campaignList.delivery') },
              { src: 'audience', label: $t('pages.campaigns.sections.campaignList.audience') },
              { src: 'budget', label: $t('pages.campaigns.sections.campaignList.budget') },
              { src: 'spent', label: $t('pages.campaigns.sections.campaignList.amountSpent') },
              { src: 'ends', label: $t('pages.campaigns.sections.campaignList.ends') },
              { src: 'history', label: $t('pages.campaigns.sections.campaignList.deliveryHistory') }
            ]"
            :row-key="'id'"
            :search-column="[ 'name.name' ]"
            :auto-search-column="'name.name'"
            :page-sizes="[5]"
            :select-row-count="false"
            :request-body-formatter="formatRequestBody"
            :response-body-formatter="formatResponseBody"
            :empty-message="$t('pages.campaigns.sections.campaignList.emptyList')"
            :loading-message="$t('pages.campaigns.sections.campaignList.loadingList')"
            api-link="https://bi-bts-api-qa.cafe24.com/campaigns"
          >
            <template slot="name" slot-scope="scope">
              <div v-if="scope.data !== undefined">
                <div v-if="scope.data.type === 'Campaign'" class="column-item-container">
                  <span class="badge badge-solid-disable">{{ $t('pages.campaigns.buttons.campaign') }}</span>
                  <font-awesome-icon fas icon="folder-open" size="2x" class="mx-2" />
                  <span @click="isShowModal = !isShowModal" class="item-link font-medium mx-2">{{ scope.data.name }}</span>
                </div>
                <div v-else-if="scope.data.type === 'Plan'" class="column-item-container pl-5">
                  <span>ㄴ</span>
                  <span class="badge badge-outline-disable mx-2">{{ $t('pages.campaigns.buttons.plan') }}</span>
                  <nuxt-link to="/plans" class="item-link">
                    {{ scope.data.name }}
                  </nuxt-link>
                </div>
              </div>
            </template>

            <template slot="status" slot-scope="scope">
              <div v-if="scope.data !== undefined" class="column-item-container column-center">
                <ToggleSwitch :value="scope.data">
                  {{ scope.data }}
                </ToggleSwitch>
              </div>
            </template>

            <template slot="delivery" slot-scope="scope">
              <div v-if="scope.data !== undefined" class="column-item-container column-center">
                <span :class="[{ 'text-green-600': scope.data === 'Active', 'text-gray-600': scope.data !== 'Active' }, 'break-normal', 'font-medium']">{{ scope.data }}</span>
              </div>
            </template>

            <template slot="audience" slot-scope="scope">
              <div v-if="scope.data !== undefined" class="column-item-container column-center">
                <span class="break-normal font-medium">{{ scope.data | numberFormat }}</span>
              </div>
            </template>

            <template slot="budget" slot-scope="scope">
              <div v-if="scope.data !== undefined" class="column-item-container column-center">
                <span v-if="scope.data.amount !== null" class="break-normal font-medium">{{ scope.data.currency }} {{ scope.data.amount | numberFormat }} {{ scope.data.type }}</span>
                <span v-else class="break-normal font-medium">-</span>
              </div>
            </template>

            <template slot="spent" slot-scope="scope" class="block">
              <div v-if="scope.data !== undefined" class="block w-full">
                <span class="break-normal font-medium">₩{{ scope.data.amount | numberFormat }}</span>
                <ProgressBar :hasText="false" :target="scope.data.budget" :current="scope.data.amount" :progressBarClass="['bg-primary']" />
              </div>
            </template>

            <template slot="ends" slot-scope="scope">
              <div v-if="scope.data !== undefined" class="column-item-container column-center">
                <span class="break-normal font-medium">{{ scope.data | formatDate }}</span>
              </div>
            </template>

            <template slot="history" slot-scope="scope">
              <div v-if="scope.data !== undefined" class="column-item-container column-center">
                <nuxt-link v-if="scope.data !== '-'" :to="`/deliveryHistory/${scope.data}`" class="badge badge-solid-disable">
                  {{ $t('pages.campaigns.buttons.view') }}
                </nuxt-link>
                <span v-else class="break-normal font-medium">{{ scope.data }}</span>
              </div>
            </template>
          </DataTable>
        </div>

        <Modal v-show="isShowModal">
          <template slot="modal-header">
            <div class="flex justify-between">
              <div class="flex">
                <div class="max-w-lg">
                  <span class="break-normal text-lg leading-tight">{{ campaignModal.campaignName }}</span>
                </div>
                <ToggleSwitch :value="campaignModal.campaignActive" class="m-2" />
              </div>
              <div>
                <font-awesome-icon @click="isShowModal = false" class="cursor-pointer" icon="times" size="lg" />
              </div>
            </div>
          </template>
          <template slot="modal-content">
            <div class="modal-content">
              <div class="left-panel">
                <ul class="px-4 py-2">
                  <li @click="currentModalPage = 1">
                    {{ $t('pages.campaigns.sections.deliveryHistoryModal.recentDelivery.title') }}
                  </li>
                  <li @click="currentModalPage = 2">
                    {{ $t('pages.campaigns.sections.deliveryHistoryModal.includedPlans.title') }}
                  </li>
                  <li @click="currentModalPage = 3">
                    {{ $t('pages.campaigns.sections.deliveryHistoryModal.budgetSchedule.title') }}
                  </li>
                  <li @click="currentModalPage = 4">
                    {{ $t('pages.campaigns.sections.deliveryHistoryModal.optimization.title') }}
                  </li>
                </ul>
              </div>
              <div v-show="currentModalPage === 1" class="right-panel">
                <div class="flex items-center justify-between my-2">
                  <h1>{{ $t('pages.campaigns.sections.deliveryHistoryModal.recentDelivery.title') }}</h1>
                  <nuxt-link to="/deliveryHistory" class="hover:underline cursor-pointer text-sm">
                    {{ $t('pages.campaigns.buttons.viewMore') }}
                  </nuxt-link>
                </div>
                <DataTable
                  :sortable="true"
                  :tableData="campaignModal.campaignDelivery"
                  :column-definition="[
                    { src: 'via', label: $t('pages.campaigns.sections.deliveryHistoryModal.recentDelivery.deliveryHistoryTable.via'), width: 50 },
                    { src: 'date', label: $t('pages.campaigns.sections.deliveryHistoryModal.recentDelivery.deliveryHistoryTable.dateTime'), width: 200 },
                    { src: 'status', label: $t('pages.campaigns.sections.deliveryHistoryModal.recentDelivery.deliveryHistoryTable.status'), width: 150 },
                    { src: 'sent', label: $t('pages.campaigns.sections.deliveryHistoryModal.recentDelivery.deliveryHistoryTable.sent') },
                    { src: 'received', label: $t('pages.campaigns.sections.deliveryHistoryModal.recentDelivery.deliveryHistoryTable.received') }
                  ]"
                  :sortColumns="[ 'Date/Time', 'Via', 'Cost Per Click' ]"
                  :table-height="500"
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
              <div v-show="currentModalPage === 2" class="right-panel">
                <h1>{{ $t('pages.campaigns.sections.deliveryHistoryModal.includedPlans.title') }}</h1>
                <hr>
                <ul class="p-10">
                  <li v-for="(plan, key) in campaignModal.campaignPlan" :key="`plan${key}`" class="my-5">
                    {{ plan }}
                  </li>
                </ul>
              </div>
              <div v-show="currentModalPage === 3" class="right-panel">
                <h1>{{ $t('pages.campaigns.sections.deliveryHistoryModal.budgetSchedule.title') }}</h1>
                <hr>
                <ul class="list-container">
                  <li>
                    <span class="item-header">{{ $t('pages.campaigns.sections.deliveryHistoryModal.budgetSchedule.dailyBudget') }}</span>
                    <span class="item-content">{{ campaignModal.campaignBudget.amount | numberFormat }} KRW</span>
                  </li>
                  <li>
                    <span class="item-header">{{ $t('pages.campaigns.sections.deliveryHistoryModal.budgetSchedule.deliveryType') }}</span>
                    <span class="item-content">{{ campaignModal.campaignBudget.type }}</span>
                  </li>
                  <li>
                    <span class="item-header">{{ $t('pages.campaigns.sections.deliveryHistoryModal.budgetSchedule.startDay') }}</span>
                    <span class="item-content">{{ campaignModal.campaignBudget.start }}</span>
                  </li>
                  <li>
                    <span class="item-header">{{ $t('pages.campaigns.sections.deliveryHistoryModal.budgetSchedule.endDay') }}</span>
                    <span class="item-content">{{ campaignModal.campaignBudget.end }}</span>
                  </li>
                  <li>
                    <span class="item-header">{{ $t('pages.campaigns.sections.deliveryHistoryModal.budgetSchedule.timeSegment') }}</span>
                    <span class="item-content">{{ campaignModal.campaignBudget.timezone }}</span>
                  </li>
                </ul>
              </div>
              <div v-show="currentModalPage === 4" class="right-panel">
                <h1>{{ $t('pages.campaigns.sections.deliveryHistoryModal.optimization.title') }}</h1>
                <hr>
                <p>{{ $t('pages.campaigns.sections.deliveryHistoryModal.optimization.subtitle') }}</p>
                <ul class="list-container">
                  <li>
                    <span class="item-header">{{ $t('pages.campaigns.sections.deliveryHistoryModal.optimization.channel') }}</span>
                    <span class="item-content">{{ campaignModal.campaignOptimize.channel }}</span>
                  </li>
                  <li>
                    <span class="item-header">{{ $t('pages.campaigns.sections.deliveryHistoryModal.optimization.plan') }}</span>
                    <span class="item-content">{{ campaignModal.campaignOptimize.plan }}</span>
                  </li>
                  <li>
                    <span class="item-header">{{ $t('pages.campaigns.sections.deliveryHistoryModal.optimization.target') }}</span>
                    <span class="item-content">{{ campaignModal.campaignOptimize.target }}</span>
                  </li>
                  <li>
                    <span class="w-full inline-flex"> {{ $t('pages.campaigns.sections.deliveryHistoryModal.optimization.note1') }}</span>
                  </li>
                  <li>
                    <span class="w-full inline-flex"> {{ $t('pages.campaigns.sections.deliveryHistoryModal.optimization.note2') }}</span>
                  </li>
                  <li>
                    <span class="w-full inline-flex"> {{ $t('pages.campaigns.sections.deliveryHistoryModal.optimization.note3') }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </template>
          <template slot="modal-footer">
            <div class="flex justify-between my-5 w-full items-center">
              <span @click="confirmCancel('Delete?', 'Do you really want to delete this? You cannot revert the changes afterwards.')" class="hover:underline cursor-pointer text-gray-700 text-sm">{{ $t('pages.campaigns.buttons.deleteCampaign') }}</span>
              <div>
                <Button @click="isShowModal = false" class="bg-gray-300 border-none hover:bg-gray-500">
                  {{ $t('pages.campaigns.buttons.close') }}
                </Button>
                <Button
                  @click="$router.push('/campaignManager')"
                  v-if="campaignModal.campaignStatus !== 'Ongoing'"
                  class="bg-blue-500 text-white font-bold border-none hover:bg-blue-300"
                >
                  {{ $t('pages.campaigns.buttons.editCampaign') }}
                </Button>
              </div>
            </div>
          </template>
        </Modal>
        <Modal v-show="isShowCreate">
          <template slot="modal-header">
            <div class="flex justify-between items-center">
              <span class="text-lg">{{ $t('pages.campaigns.sections.campaignModal.title') }}</span>
              <font-awesome-icon @click="isShowCreate = false" class="cursor-pointer" icon="times" size="lg" />
            </div>
          </template>
          <template slot="modal-content">
            <div class="flex justify-center py-12 px-0">
              <div class="block">
                <nuxt-link to="/campaignmanager" tag="a">
                  <Button class="btn btn-solid-warning py-4 m-2 w-full">
                    <font-awesome-icon fas icon="plus" />&nbsp;
                    {{ $t('pages.campaigns.sections.campaignModal.createCampaign') }}
                  </Button>
                </nuxt-link>
                <Button v-closable="{ handler: 'closePlan' }" @click="isShowPlan = true" class="btn btn-solid-primary py-4 m-2 w-full relative">
                  <font-awesome-icon fas icon="plus" />&nbsp;
                  {{ $t('pages.campaigns.sections.campaignModal.createPlan') }}
                  <font-awesome-icon fas icon="chevron-down" />
                  <div v-show="isShowPlan" class="dropdown">
                    <ul>
                      <nuxt-link to="plan" tag="a">
                        <li>Add New Plan</li>
                      </nuxt-link>
                      <li>Welcome Promotion</li>
                      <li>Birthday Members</li>
                      <li>New Products Selling</li>
                    </ul>
                  </div>
                </Button>
              </div>
            </div>
          </template>
        </Modal>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Campaigns from './index'
export default Campaigns
</script>

<style lang="postcss" scoped>
@import './Campaigns.sss'
</style>
