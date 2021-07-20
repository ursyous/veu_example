import { Vue, Prop } from 'nuxt-property-decorator'

/**
 * Base class for custom input components
 * @author Carl Jeremy Omandam <carl@simplexi.com.ph>
 * @since 2019.09.27
 */
export default abstract class InputComponent extends Vue {
  /**
   * Input color class
   */
  @Prop({ type: String, default: '' }) readonly color!: string

  /**
   * Input label property
   */
  @Prop({ type: String, default: '' }) readonly label!: string

  /**
   * Input name property
   */
  @Prop({ type: String, default: '' }) readonly name!: string

  /**
   * Input value property
   * Note: Can't have default implentation
   */
  abstract readonly value: any | null

  /**
   * Input disabled property
   */
  @Prop({ type: Boolean, default: false }) readonly disabled!: boolean

  /**
   * Emits input event
   * @param val the payload
   */
  emitInput (val: any): void {
    this.$emit('input', val)
  }
}
