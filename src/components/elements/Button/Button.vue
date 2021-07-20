<template>
  <button
    ref="button"
    @click="emitClick"
    :value="value"
    :name="name"
    :class="[{'disabled': disabled, 'tooltip': (tooltip && tipText !== '')}, tipColor, 'btn', (color !== '' ? 'btn-' + color : '')]"
    :disabled="disabled"
    :data-tooltip="tipText"
    :data-tooltip-position="position"
  >
    <slot>{{ $t(title) }}</slot>
  </button>
</template>

<script lang="ts">
import { Component, Prop } from 'nuxt-property-decorator'
import InputComponent from '@/types/Classes/InputComponent'

/**
 * Button component class
 * @author Carl Jeremy Omandam <carl@simplexi.com.ph>
 * @author Lowell Dave Agnir <lowell@simplexi.com.ph>
 * @since 2019.09.27
 * @updated 2019.10.25
 */
@Component
export default class Button extends InputComponent {
  /**
   * Title property implementation (for data-driven)
   */
  @Prop({
    default: () => {
      return null
    }
  })
  title!: any

  /**
   * Value property implementation
   */
  @Prop({
    default: () => {
      return null
    }
  })
  value!: any

  /**
   * Determines button appearance
   */
  @Prop({ type: Boolean, default: false }) solid!: boolean

  /**
   * Emits click event
   */
  emitClick (): void {
    this.$emit('click', this.value)
  }

  /**
   * Tooltip toggle property
   */
  @Prop({ type: Boolean, default: false }) tooltip!: boolean

  /**
   * Tooltip text property
   */
  @Prop({ type: String, default: '' }) tipText!: string

  /**
   * Tooltip display position property
   */
  @Prop({ type: String, default: 'top' }) position!: string

  /**
   * Tooltip appearance property
   */
  @Prop({ type: String, default: '' }) tipColor!: string
}
</script>

<style lang="postcss" scoped>
@import './Button.sss';
</style>
