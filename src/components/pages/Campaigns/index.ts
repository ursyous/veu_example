import { Vue, Component } from 'nuxt-property-decorator'
import { mapGetters } from 'vuex'
import Confirms from '@/types/Classes/Confirms'

/**
 * Campaigns component class
 * @author Lowell Dave Agnir <lowell@simplexi.com.ph>
 * @since 2019.12.05
 */
@Component({
  mixins: [ Confirms ],
  props: [ 'campaignNo' ],
  filters: {
    /**
     * format Date for campaign list table
     * @param date string
     * @returns string
    */
    formatDate (date : string) : string {
      if (new Date(date).toDateString() === 'Invalid Date') {
        return date
      }
      let returnDate : string = ''
      const now : Date = new Date
      const dateValue : Date = new Date(date)

      if (now.toLocaleDateString() === dateValue.toLocaleDateString()) {
        returnDate = dateValue.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      } else if (now < dateValue) {
        returnDate = `Ongoing (~${dateValue.toLocaleDateString()})`
      } else {
        returnDate = dateValue.toLocaleDateString()
      }

      return returnDate
    }
  },
  computed: {
    ...mapGetters({
      campaignList: 'campaign/getCampaignList',
      // campaignSets: 'campaign/getCampaignSet',
      campaignMessages: 'campaign/getCampaignMessages',
      campaignModal: 'campaign/getCampaignModal'
    })
  }
})
export default class Campaigns extends Vue {
  /**
   * campaignList declaration to prevent type error
   */
  campaignList!: Array<any>

  /**
   * List of campaign sets
   */
  campaignSets: Array<{[key: string]: any}> = [
    {
      'time': 'AM 08:00 ~ AM 11:00',
      'active': null,
      'campaigns': []
    },
    {
      'time': 'AM 11:00 ~ PM 02:00',
      'active': true,
      'campaigns': []
    },
    {
      'time': 'PM 02:00 ~ PM 05:00',
      'active': true,
      'campaigns': []
    },
    {
      'time': 'PM 05:00 ~ PM 08:00',
      'active': true,
      'campaigns': []
    }
  ]

  /**
   * campaign table checkbox filters property
  */
  checkValues : { [key: string] : Array<string> } = {
    status: [],
    delivery: [],
    ends: []
  }

  /**
   * Sample plans
   */
  samplePlan: Array<{[key: string]: any}> = [
    {
      'id': 201,
      'name': {
        'type': 'Plan',
        'name': 'Members not purchased within 30 days'
      },
      'status': true,
      'delivery': '-',
      'audience': 567,
      'budget': {
        'amount': null,
        'currency': null,
        'type': null
      },
      'spent': {
        'amount': 50010,
        'budget': 20000
      },
      'ends': '-',
      'history': '-'
    },
    {
      'id': 202,
      'name': {
        'type': 'Plan',
        'name': 'Repeat & Top Buyers'
      },
      'status': false,
      'delivery': '-',
      'audience': 121,
      'budget': {
        'amount': null,
        'currency': null,
        'type': null
      },
      'spent': {
        'amount': 8400,
        'budget': 20000
      },
      'ends': '-',
      'history': '-'
    }
  ]

  /**
   * Index of the active set
   */
  activeTimeSegment: number = this.getActiveTimeSegment()

  /**
   *  gets the advanced filters
   * @returns object
   */
  get filters () : { [key : string] : any } {
    return {
      Status: { 'value': this.checkValues.status, 'column': 'Status' },
      Delivery: { 'value': this.checkValues.delivery, 'column': 'Delivery' },
      Ends: {
        'value': {
          type: this.checkValues.ends,
          from: this.selectedStart,
          to: this.selectedEnd
        },
        'column': 'Ends'
      }
    }
  }

  /**
   * Populates campaign state
   * @param param0
   */
  async fetch ({ store }: any) {
    await store.dispatch('campaign/GET_CAMPAIGNS')
  }

  /**
   * Created life cycle hook
   */
  created () {
    this.formatCampaignSet()
  }

  /**
   * Funtion that returns the index of active set based on current time
   */
  getActiveTimeSegment () {
    const today: Date = new Date()
    const hour: number = today.getHours()

    if (hour >= 11 && hour <= 13) {
      return 1
    } else if (hour >= 14 && hour <= 16) {
      return 2
    } else if (hour >= 17 && hour <= 19) {
      return 3
    }

    return 0
  }

  /**
   * Request body formatter for datatable
   * @param body
   */
  formatRequestBody (body: {[key: string]: any}): {[key: string]: any} {
    return {
      page: body.page - 1
    }
  }

  /**
   * Response body formatter for datatable
   * @param body
   */
  formatResponseBody (body: {[key: string]: any}): {[key: string]: any} {
    return {
      rows: this.formatRowData(body.content),
      total: body.totalElements
    }
  }

  /**
   * Transforms row data into the accepted format
   * @param rows
   */
  formatRowData (rows: Array<{[key: string]: any}>): Array<{[key: string]: any}> {
    const result: Array<{[key: string]: any}> = rows.map((element:{[key: string]: any}): {[key: string]: any} => {
      const formattedData = {
        id: element.campaignNo,
        name: {
          name: element.campaignName,
          type: 'Campaign'
        },
        status: element.isActive === 'T',
        delivery: 'Active',
        audience: 2000,
        budget: {
          amount: element.budgetAmount,
          currency: '₩',
          type: element.budgetType === 'D' ? 'Daily' : 'Lifetime'
        },
        spent: {
          amount: 100000,
          budget: element.budgetAmount
        },
        timeSegment: element.timeSegment,
        ends: element.endDay,
        history: element.campaignNo,
        children: element.campaignName === 'Campaign with plans' ? this.samplePlan : []
      }

      if (formattedData.children.length > 0) {
        formattedData.children.forEach((val, idx) => {
          formattedData.children[idx].spent.budget = formattedData.spent.budget
        })
      }

      return formattedData
    })

    return result
  }

  /**
   * Inserts campaign to the set it belongs
   */
  formatCampaignSet () {
    const campaignList:  Array<{[key: string]: any}> = this.formatRowData(this.campaignList)
    this.campaignSets.forEach((set: {[key: string]: any}, idx: number) => {
      const status: string = idx >= this.activeTimeSegment ? 'Delivering' : 'Completed'
      campaignList.forEach((campaign: {[key: string]: any}) => {
        if (campaign.timeSegment === set.time) {
          campaign.status = status
          this.campaignSets[idx].campaigns.push(campaign)
        }
      })
    })
  }

  /**
   * campaign table start calendar filters property
  */
  selectedStart : Date = new Date

  /**
   * campaign table end calendar filters property
  */
  selectedEnd : Date = new Date

  /**
   * delivery history modal toggle property
  */
  isShowModal : boolean = false

  /**
   * create modal toggle property
  */
  isShowCreate : boolean = false

  /**
   * create modal plan dropdown toggle property
  */
  isShowPlan : boolean = false

  /**
   * current page in delivery history modal property
  */
  currentModalPage : number = 1

  /**
   * closePlan
   * close create plan dropdown
   * @return void
  */
  closePlan () : void {
    this.isShowPlan = false
  }

  /**
   * TEMPORARY UX
   * TO DO: REFACTOR / IMPROVE
   *
   * @param event The function's event
   */
  toggleDelivery (event: Event) : void {
    const eventOrigin = (event.srcElement) ? event.srcElement : document.createElement('div')
    const campaignDeliveryStatus = (document.querySelector('#campaign' + (eventOrigin as HTMLBaseElement).getAttribute('campaignno'))) ? document.querySelector('#campaign' + (eventOrigin as HTMLBaseElement).getAttribute('campaignno')) : document.createElement('div')
    if ((eventOrigin as HTMLBaseElement).classList.contains('badge-solid-disable')) {
      (eventOrigin as HTMLBaseElement).innerHTML = `${this.$t('pages.campaigns.buttons.stop')}`;
      (eventOrigin as HTMLBaseElement).classList.remove('badge-solid-disable');
      (eventOrigin as HTMLBaseElement).classList.add('badge-solid-danger');
      (campaignDeliveryStatus as HTMLBaseElement).classList.add('badge-outline-primary');
      (campaignDeliveryStatus as HTMLBaseElement).classList.remove('badge-outline-danger');
      (campaignDeliveryStatus as HTMLBaseElement).innerHTML = `<font-awesome-icon fas icon="spinner" class="spin" />
      ${this.$t('pages.campaigns.buttons.delivering')}`
    } else {
      (eventOrigin as HTMLBaseElement).innerHTML = `${this.$t('pages.campaigns.buttons.resume')}`;
      (eventOrigin as HTMLBaseElement).classList.add('badge-solid-disable');
      (eventOrigin as HTMLBaseElement).classList.remove('badge-solid-danger');
      (campaignDeliveryStatus as HTMLBaseElement).classList.remove('badge-outline-primary');
      (campaignDeliveryStatus as HTMLBaseElement).classList.add('badge-outline-danger');
      (campaignDeliveryStatus as HTMLBaseElement).innerHTML = `${this.$t('pages.campaigns.buttons.stopped')}`
    }
  }
}
