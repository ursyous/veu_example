import { Component } from 'nuxt-property-decorator'
import Header from '../../Settings/Header.vue'
import region from './Region/Region.vue'
import info from './Info/Info.vue'
import TemplateBuilder from '~/types/Classes/TemplateBuilder'
import Template from '~/static/test.json'

/**
 * Settings content component
 * Builds the settings page based on the data in a JSON template
 * @author Carl Jeremy Omandam <carl@simplexi.com.ph>
 * @since 2019.010.07
 */
@Component({
  components: { region, info, Header }
})
export default class Content extends TemplateBuilder {
  /**
   * Before create hook
   */
  created (): void {
    this.template = Template
    this.dataSource = Template.data
  }
}
