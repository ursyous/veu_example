<template>
  <input
    :value="value"
    :min="min"
    :max="max"
    :name="name"
    :class="[{'disabled': disabled}, 'range-input', color]"
    :disabled="disabled"
    @input="emitInput(parseInt($event.target.value, 10))"
    type="range"
  >
</template>

<script lang="ts">
import { Component, Prop } from 'nuxt-property-decorator'
import InputComponent from '@/types/Classes/InputComponent'

/**
 * Slider component class
 * @author Carl Jeremy Omandam <carl@simplexi.com.ph>
 * @since 2019.09.27
 */
@Component
export default class Slider extends InputComponent {
  /**
   * Value property implementation
   */
  @Prop({ type: Number, default: () => 50 }) value!: any

  /**
   * Minimum value
   */
  @Prop({ type: Number, default: 0 }) min!: Number

  /**
   * Maximum value
   */
  @Prop({ type: Number, default: 100 }) max!: Number
}
</script>

<style lang="postcss" scoped>
@import './Slider.sss';
</style>
