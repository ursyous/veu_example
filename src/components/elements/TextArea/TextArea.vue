<template>
  <textarea
    :value="value"
    :name="name"
    :disabled="disabled"
    :readonly="readonly"
    :placeholder="placeholder"
    :resize="resize"
    :class="['text-area-resize-' + resize]"
  />
</template>

<script lang="ts">
import { Component, Prop } from 'nuxt-property-decorator'
import InputComponent from '../../../types/Classes/InputComponent'

/**
 * TextArea component class
 * @author Angelito Diwata <angelito@simplexi.com.ph>
 * @since 2019.10.25
 */
@Component
export default class TextArea extends InputComponent {
  /**
   * "value"
   * - Serves as the value property of this component
   */
  @Prop({ default: () => null }) value!: any

  /**
   * "readonly"
   * - Serves as the readonly property of this component
   */
  @Prop({ type: Boolean, default: false }) readonly!: boolean

  /**
   * "placeholder"
   * - Serves as the placeholder property of this component
   */
  @Prop({ type: String, default: 'Your Text Here...' }) placeholder!: string

  /**
   * "resize"
   * - Serves as the resizability property of this component
   */
  @Prop({ type: String, default: 'none' }) resize!: string
}
</script>

<style scoped>
@import './TextArea.sss';
</style>
