import { Context } from 'vm'
import { Component, mixins } from 'nuxt-property-decorator'
import { mapGetters } from 'vuex'
import Confirms from '@/types/Classes/Confirms'

/**
 * Template Page
 * @author Lowell Dave Agnir <lowell@simplexi.com.ph>
 * @since 2019.11.18
 */
@Component({
  computed: {
    ...mapGetters({
      dropdownValues: 'template/getDropdownValues',
      colorHexValues: 'template/getColorValues',
      footerInformation: 'template/getFooterInformation',
      footerLinksValues: 'template/getFooterLinks'
    })
  }
})
export default class Template extends mixins(Confirms) {
  /**
   * computed colorHexValues
   */
  colorHexValues!: { [key: string]: any }

  /**
   * computed footerLinksValues
   */
  footerLinksValues!: { [key: string]: any }

  /**
   * current content property
   */
  content: string = ''

  /**
   * footer links
   */
  footerLinks: { [key: string]: Array<string> | { [key: string]: string } } = {
    snsActive: [],
    snsLink: {}
  }

  /**
   * dropdown data value object property
   */
  dropdownValues!: { [key: string]: any }

  /**
   * hex color property
   */
  colorHex: { [key: string]: any } = {}

  /**
   * validate
   * checks if the current route for template exists
   * @param Context Context
   * @return boolean
   */
  validate (Context: Context): boolean {
    const templatePages: Array<string> = [ 'message', 'footer', 'variables' ]
    const templateParam: string =
      Context.params.template === undefined
        ? 'message'
        : Context.params.template

    return templatePages.includes(templateParam)
  }

  /**
   * Life Cycle Hook: Created
   * sets content to default if param is undefined
   * @return boolean
   */
  created (): void {
    this.content =
      this.$route.params.template !== undefined
        ? this.$route.params.template
        : 'message'
  }

  /**
   * Life Cycle Hook: Mounted
   * get data from the store and sets it to the properties
   * @return void
   */
  mounted (): void {
    this.colorHex = { ...this.colorHexValues }
    this.footerLinks.snsActive = [ ...this.footerLinksValues.snsActive ]
    this.footerLinks.snsLink = { ...this.footerLinksValues.snsLink }
  }
}
