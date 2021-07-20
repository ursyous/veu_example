import { Component, Prop, Vue } from 'nuxt-property-decorator'

/**
 * Info component
 * @author Carl Jeremy Omandam <carl@simplexi.com.ph>
 * @since 2019.10.03
 */
@Component
export default class Info extends Vue {
  /**
   * Title property
   */
  @Prop({ type: String, default: null }) title?: string

  /**
   * Info content
   */
  @Prop({ type: Object, default: null }) info?: object
}
