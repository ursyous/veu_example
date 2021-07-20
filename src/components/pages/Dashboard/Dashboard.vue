<template>
  <div>
    <div class="text-page-title">
      {{ $t('pages.dashboard.title') }}
    </div>
    <div class="col-row w-full">
      <div class="dashboard-item">
        <div class="item-row">
          <div class="item">
            <div class="item-header">
              <span class="text-item-title">{{ $t('pages.dashboard.sections.gettingStarted.title') }}</span>
            </div>
            <div class="item-content-inline">
              <div class="w-1/5 inline-item">
                <ProgressBar :target="dashboardData.startModule.length" :current="dashboardData.startModule.filter(module => module.active === true).length" />
              </div>
              <div class="w-1/5 inline-item">
                <Button :class="{ 'btn-solid-primary': startModule.createCampaign }" @click="!startModule.createCampaign ? redirect('/campaignmanager') : false">
                  <font-awesome-icon far icon="plus-square" size="3x" />
                  <div class="mt-1">
                    {{ $t('pages.dashboard.sections.gettingStarted.buttons.createCampaign') }}
                  </div>
                </Button>
              </div>
              <div class="w-1/5 inline-item">
                <Button :class="{ 'btn-solid-primary': startModule.createPlan }" @click="!startModule.createPlan ? redirect('/plan') : false">
                  <font-awesome-icon fas icon="tasks" size="3x" />
                  <div class="mt-1">
                    {{ $t('pages.dashboard.sections.gettingStarted.buttons.createPlan') }}
                  </div>
                </Button>
              </div>
              <div class="w-1/5 inline-item">
                <Button :class="{ 'btn-solid-primary': startModule.editTemplate }" @click="!startModule.editTemplate ? redirect('/template') : false">
                  <font-awesome-icon fas icon="edit" size="3x" />
                  <div class="mt-1">
                    {{ $t('pages.dashboard.sections.gettingStarted.buttons.editTemplate') }}
                  </div>
                </Button>
              </div>
              <div class="w-1/5 inline-item">
                <Button :class="{ 'btn-solid-primary': startModule.activeCampaign }" @click="!startModule.activeCampaign ? redirect('/campaigns') : false">
                  <font-awesome-icon far icon="check-square" size="3x" />
                  <div class="mt-1">
                    {{ $t('pages.dashboard.sections.gettingStarted.buttons.activeCampaign') }}
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div class="item-row col-row">
          <div class="item">
            <div class="item-header-content">
              <span class="text-item-title">{{ $t('pages.dashboard.sections.sentMessages.title') }}</span>
              <small>Last 7 days</small>
            </div>
            <div class="item-content-inline">
              <client-only>
                <span class="text-3xl font-bold">{{ dashboardData.sentMessage | numberFormat }}</span>
              </client-only>
            </div>
          </div>
          <div class="item">
            <div class="item-header-content">
              <span class="text-item-title">{{ $t('pages.dashboard.sections.conversionRevenue.title') }}</span>
              <small>Last 7 days</small>
            </div>
            <div class="item-content-inline">
              <span class="text-3xl font-bold">
                <client-only>
                  <span>{{ dashboardData.conversionRevenue | numberFormat }}</span>
                </client-only>
                <span class="text-sm font-medium">KRW</span>
              </span>
            </div>
          </div>
          <div class="item">
            <div class="item-header">
              <span class="text-item-title">{{ $t('pages.dashboard.sections.news.title') }}</span>
            </div>
            <div class="item-content">
              <Modal v-show="isShowModal" v-if="dashboardData.recentNews.length > 0">
                <template v-slot:modal-header>
                  <div class="modal-header">
                    <span>{{ dashboardData.recentNews[activeNews].content.header }}</span>
                  </div>
                </template>
                <template v-slot:modal-content>
                  <div class="modal-content">
                    <p>{{ dashboardData.recentNews[activeNews].content.body }}</p>
                  </div>
                </template>
                <template v-slot:modal-footer>
                  <div class="modal-footer">
                    <div class="flex justify-between w-full">
                      <span class="text-link items-center flex">{{ $t('pages.dashboard.sections.news.modal.button.listView') }}</span>
                      <button @click="isShowModal = !isShowModal">
                        {{ $t('pages.dashboard.sections.news.modal.button.close') }}
                      </button>
                    </div>
                  </div>
                </template>
              </Modal>
              <client-only>
                <carousel v-if="dashboardData.recentNews.length > 0" v-bind="carouselOption">
                  <slide v-for="(news, key) in dashboardData.recentNews" :key="`news${key}`">
                    <div class="slide-content">
                      <span @click="[ isShowModal = !isShowModal, setNewsModal(key) ]" class="text-link">{{ news.title }}</span>
                    </div>
                  </slide>
                </carousel>
                <span v-else class="font-medium text-gray-600">No recent news.</span>
              </client-only>
            </div>
          </div>
        </div>
        <div class="item-row col-row">
          <div class="item-row-left">
            <div class="item-row">
              <div class="item">
                <div class="item-header">
                  <span class="text-item-title">{{ $t('pages.dashboard.sections.clickRate.title') }}</span>
                </div>
                <div class="item-content">
                  <GChart :data="dashboardData.clickRate" :options="dashboardData.clickRateOption" type="LineChart" />
                </div>
              </div>
              <div class="item">
                <div class="item-header">
                  <span class="text-item-title">{{ $t('pages.dashboard.sections.conversionRate.title') }}</span>
                </div>
                <div class="item-content">
                  <GChart :data="dashboardData.conversionRate" :options="dashboardData.conversionRateOption" type="LineChart" />
                </div>
              </div>
            </div>
            <div class="item-row">
              <div class="item">
                <div class="item-header-content lined">
                  <nuxt-link to="/campaigns">
                    <span class="text-item-title">{{ $t('pages.dashboard.sections.campaigns.title') }}</span>
                  </nuxt-link>
                  <nuxt-link to="/campaignManager">
                    <Button name="create_new" value="create_new" class="btn-outline-primary">
                      {{ $t('pages.dashboard.sections.campaigns.buttons.create') }}
                    </Button>
                  </nuxt-link>
                </div>
                <div v-if="dashboardData.recentCampaign.length > 0" class="item-content-list">
                  <ul class="list-inline">
                    <li v-for="(campaign, key) in dashboardData.recentCampaign" :key="`campaign${key}`">
                      {{ campaign.title }}
                      <span v-if="campaign.active === true" class="bg-success">Active</span>
                    </li>
                  </ul>
                </div>
                <div v-else class="no-content">
                  <span>
                    {{ $t('pages.dashboard.sections.campaigns.empty.statement') }}
                    <strong class="text-primary">
                      <nuxt-link to="/campaigns">
                        {{ $t('pages.dashboard.sections.campaigns.empty.suggestion') }}
                      </nuxt-link>
                    </strong>
                  </span>
                </div>
              </div>
              <div class="item">
                <div class="item-header-content lined">
                  <nuxt-link to="/campaigns">
                    <span class="text-item-title">{{ $t('pages.dashboard.sections.plans.title') }}</span>
                  </nuxt-link>
                  <nuxt-link to="/plan">
                    <Button name="create_new" value="create_new" class="btn-outline-primary">
                      {{ $t('pages.dashboard.sections.plans.buttons.create') }}
                    </Button>
                  </nuxt-link>
                </div>
                <div v-if="dashboardData.recentPlan.length > 0" class="item-content-list">
                  <ul class="list-inline">
                    <li v-for="(plan, key) in dashboardData.recentPlan" :key="`plan${key}`">
                      {{ plan.title }}
                    </li>
                  </ul>
                </div>
                <div v-else class="no-content">
                  <span>
                    {{ $t('pages.dashboard.sections.plans.empty.statement') }}
                    <strong class="text-primary">
                      <nuxt-link to="/">{{ $t('pages.dashboard.sections.plans.empty.suggestion') }}</nuxt-link>
                    </strong>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="item-row-right">
            <div class="item-row h-full">
              <Modal v-show="isShowSupportModal">
                <template v-slot:modal-header>
                  <div class="modal-header">
                    <span>{{ $t('pages.dashboard.sections.support.type.inquiry.title') }}</span>
                  </div>
                </template>
                <template v-slot:modal-content>
                  <div class="modal-content flex">
                    <div class="w-2/5">
                      <div class="border-b py-4">
                        <font-awesome-icon fas icon="question" size="5x" class="border p-4" style="min-width:1em; min-height:1em;" />
                        <p>{{ $t('pages.dashboard.sections.support.type.inquiry.question') }}</p>
                        <small>{{ $t('pages.dashboard.sections.support.type.inquiry.suggestion') }}</small>
                      </div>
                      <div>
                        <label>{{ $t('pages.dashboard.sections.support.type.inquiry.FAQs.title') }}</label>
                        <ul class="mt-2">
                          <li>
                            <span>
                              <font-awesome-icon fas icon="question-circle" class="text-gray-500" />
                              <small>{{ $t('pages.dashboard.sections.support.type.inquiry.FAQs.FAQ1') }}</small>
                            </span>
                          </li>
                          <li>
                            <span>
                              <font-awesome-icon fas icon="question-circle" class="text-gray-500" />
                              <small>{{ $t('pages.dashboard.sections.support.type.inquiry.FAQs.FAQ2') }}</small>
                            </span>
                          </li>
                          <li>
                            <span>
                              <font-awesome-icon fas icon="question-circle" class="text-gray-500" />
                              <small>{{ $t('pages.dashboard.sections.support.type.inquiry.FAQs.FAQ3') }}</small>
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div class="w-3/5 ml-4">
                      <div class="mb-2">
                        <small class="w-full">{{ $t('pages.dashboard.sections.support.type.inquiry.input.name.title') }} <b class="text-red-600">*</b></small>
                        <input type="text" class="border p-2 w-full" placeholder="Please input your name.">
                      </div>
                      <div class="mb-2">
                        <small class="w-full">{{ $t('pages.dashboard.sections.support.type.inquiry.input.email.title') }} <b class="text-red-600">*</b></small>
                        <input type="text" class="border p-2 w-full" placeholder="sample.email@domain.com">
                      </div>
                      <div class="mb-2">
                        <small class="w-full">{{ $t('pages.dashboard.sections.support.type.inquiry.input.shopAddress.title') }} <b class="text-red-600">*</b></small>
                        <input type="text" class="border p-2 w-full" placeholder="https://www.shoppingmall.com">
                      </div>
                      <div class="mb-2">
                        <small class="w-full">{{ $t('pages.dashboard.sections.support.type.inquiry.input.details.title') }} <b class="text-red-600">*</b></small>
                        <textarea class="border height p-2 w-full h-32" placeholder="Please input the details." />
                      </div>
                    </div>
                  </div>
                </template>
                <template v-slot:modal-footer>
                  <div class="modal-footer justify-end">
                    <Button @click="isShowSupportModal = !isShowSupportModal" class="btn mx-2">
                      Close
                    </Button>
                    <Button @click="sendInquiry" class="btn-solid-primary">
                      Send
                    </Button>
                  </div>
                </template>
              </Modal>
              <div class="item">
                <div class="item-header">
                  <span class="text-item-title">{{ $t('pages.dashboard.sections.support.title') }}</span>
                </div>
                <div class="item-content-list">
                  <ul class="list-block">
                    <li>
                      <div class="list-item-header">
                        <font-awesome-icon fas icon="film" />
                        <span>{{ $t('pages.dashboard.sections.support.type.video.title') }}</span>
                      </div>
                      <div class="list-item-content">
                        <div class="h-24 w-full bg-gray-500 flex">
                          <span class="text-white m-auto font-medium">Banner</span>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div class="list-item-header">
                        <font-awesome-icon far icon="comments" />
                        <span>{{ $t('pages.dashboard.sections.support.type.guide.title') }}</span>
                      </div>
                      <div class="list-item-content">
                        <nuxt-link to="/">
                          BTS 서비스 이용에 도움이 되는 가이드 문서를 확인 해 보세요.
                        </nuxt-link>
                      </div>
                    </li>
                    <li>
                      <div class="list-item-header">
                        <font-awesome-icon far icon="user" />
                        <span>{{ $t('pages.dashboard.sections.support.type.inquiry.title') }}</span>
                      </div>
                      <div class="list-item-content">
                        <span @click="isShowSupportModal = !isShowSupportModal" class="cursor-pointer hover:underline">
                          앱 개발팀에게 연락할 수 있습니다.
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="dashboard-campaigns">
        <div class="campaign-button">
          <Button @click="redirect('/campaignmanager')" name="create_campaign" value="create_campaign" class="btn-solid-primary w-10/12">
            <font-awesome-icon fas icon="plus" />&nbsp;
            {{ $t('pages.dashboard.sections.recentActivity.activities.createCampaign') }}
          </Button>
        </div>
        <div class="campaign-recent">
          <span class="text-item-title">{{ $t('pages.dashboard.sections.recentActivity.title') }}</span>
          <div class="recent-container">
            <div v-for="(activity, key) in dashboardData.recentActivity" :key="`activity${key}`" class="recent-item">
              <div class="recent-item-info">
                <span>{{ activity.title }}</span>
                <small>
                  <client-only>
                    <timeago :datetime="activity.date" :autoUpdate="60" />
                  </client-only>
                </small>
              </div>
              <div class="recent-item-user">
                <small>{{ activity.action }}</small>
                <font-awesome-icon :icon="activity.action === 'Admin' ? 'user' : 'sync-alt'" fas />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
/**
 * Dashboard component class
 * @author Lowell Dave Agnir <lowell@simplexi.com.ph>
 * @since 2019.11.20
 */
@Component
export default class Dashboard extends Vue {
  /**
   * isShowSupportModal
   * support modal display property
  */
  isShowSupportModal : boolean = false
  /**
   * isShowModal
   * modal display property
  */
  isShowModal : boolean = false
  /**
   * activeNews
   * activeNews modal property
  */
  activeNews : number = 0

  /**
   * carouselOption
   * carousel options property
  */
  carouselOption : object = {
    'per-page': 1,
    'mouse-drag': true,
    centerMode: true,
    paginationActiveColor: '#00000060',
    paginationSize: 7,
    paginationPadding: 5,
    autoplay: true,
    autoplayTimeout: 6000,
    loop: true
  }

  /**
   * dashboardData
   * Dashboard Data from store property
   * @return object
  */
  get dashboardData () : object {
    return this.$store.getters['dashboard/getDashboard']
  }

  /**
   * startModule
   * get module is completed property
   * @return object
  */
  get startModule () : object {
    const data : any = this.dashboardData
    const returnData : object = {
      createCampaign: data.startModule.filter(( module : any ) => module.title === 'Create Campaign' && module.active === true).length > 0,
      createPlan: data.startModule.filter(( module : any ) => module.title === 'Create Plan' && module.active === true).length > 0,
      editTemplate: data.startModule.filter(( module : any ) => module.title === 'Edit Template' && module.active === true).length > 0,
      activeCampaign: data.startModule.filter(( module : any ) => module.title === 'Active Campaign' && module.active === true).length > 0
    }
    return returnData
  }

  /**
   * setNewsModal
   * @param newsKey string
   * @return void
  */
  setNewsModal (newsKey : number) : void {
    this.activeNews = newsKey
  }

  /**
   * redirect route
   * @param routePath string
   * @return void
  */
  redirect (routePath : string) : void {
    this.$router.push(routePath)
  }

  /**
   * sendInquiry
   * alert if inquiry is sent
   * @return void
  */
  sendInquiry () : void {
    // Send Inquiry codes
  }
}
</script>

<style lang="postcss" scoped>
  @import './Dashboard.sss'
</style>
