import { Component, Vue } from 'nuxt-property-decorator'
import Content from './components/Content.vue'

/**
 * Sample Page
 * @author Carl Jeremy Omandam <carl@simplexi.com.ph
 * @since 2019.10.09
 */
@Component({
  components: { Content }
})
export default class Sample extends Vue {
  /**
   * Applies transition if the user is comming from a subpage
   * @param to
   * @param from
   */
  transition (_to: any, from: any): any {
    if (from !== undefined) {
      const path: string[] = from.path.split('/')
      const parentPage: string = path[path.length - 2]
      if (parentPage === 'settings') {
        return {
          enterActiveClass: 'animate-content animated faster'
        }
      }
    }

    return ''
  }
}
