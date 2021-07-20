import { Component, Vue } from 'nuxt-property-decorator'
import Content from './Content.vue'
import UAS from '@/static/templates/Settings/Account/UAS.json'
import UASData from '@/static/templates/Settings/Account/Data/UAS.json'
import DN from '@/static/templates/Settings/Notifications/DN.json'
import DNData from '@/static/templates/Settings/Notifications/Data/DN.json'
import UAL from '@/static/templates/Settings/SubUser/UAL.json'
import UALData from '@/static/templates/Settings/SubUser/Data/UAL.json'
import ASU from '@/static/templates/Settings/SubUser/ASU.json'
import ASUData from '@/static/templates/Settings/SubUser/Data/ASU.json'
import DSI from '@/static/templates/Settings/Campaign/sender.json'
import DSIData from '@/static/templates/Settings/Campaign/Data/sender.json'
import CDS from '@/static/templates/Settings/Campaign/default.json'
import CDSData from '@/static/templates/Settings/Campaign/Data/default.json'
import Timezone from '@/static/templates/Settings/Campaign/timezone.json'
import TimezoneData from '@/static/templates/Settings/Campaign/Data/timezone.json'
import VersionInfo from '@/static/templates/Settings/Service-Info/version.json'
import VersionInfoData from '@/static/templates/Settings/Service-Info/Data/version.json'
import MallInfo from '@/static/templates/Settings/Service-Info/mall.json'
import MallInfoData from '@/static/templates/Settings/Service-Info/Data/mall.json'
import SideBar from '~/static/settingsPage.json'

/**
 * Settings Page
 * @author Carl Jeremy Omandam <carl@simplexi.com.ph>
 * @author John Alene Pacheco <john12@simplexi.com.ph>
 * @since 2019.09.19
 */
@Component({
  components: { Content }
})
export default class Settings extends Vue {
  /**
   * Sidebar template
   */
  sideBar: Object = SideBar

  /**
   * Sidebar data source
   */
  sideBarData: Object = SideBar.data

  /**
   * List of setting pages
   */
  readonly SECTIONS: any = {
    account: {
      template: UAS,
      data: UASData.data
    },
    notifications: {
      template: DN,
      data: DNData.data
    },
    actions: {
      template: UAL,
      data: UALData.data
    },
    managers: {
      template: ASU,
      data: ASUData.data
    },
    sender: {
      template: DSI,
      data: DSIData.data
    },
    campaign: {
      template: CDS,
      data: CDSData.data
    },
    timezone: {
      template: Timezone,
      data: TimezoneData.data
    },
    service: {
      template: VersionInfo,
      data: VersionInfoData.data
    },
    mall: {
      template: MallInfo,
      data: MallInfoData.data
    }
  }

  /**
   * Content template
   *
   * @returns object
   */
  get content (): object {
    return (this.$route.params.section !== undefined) ? this.SECTIONS[this.$route.params.section].template : this.SECTIONS.account.template
  }

  /**
   * Content data source
   *
   * @returns object
   */
  get contentData (): object {
    return (this.$route.params.section !== undefined) ? this.SECTIONS[this.$route.params.section].data : this.SECTIONS.account.data
  }

  /**
   * Validates if section exist
   *
   * @returns boolean
   */
  validate ({ params }: any): boolean {
    const sections: string[] = [
      'account',
      'notifications',
      'managers',
      'actions',
      'sender',
      'campaign',
      'timezone',
      'service',
      'mall'
    ]

    return sections.includes(params.section) || params.section === undefined
  }
}
