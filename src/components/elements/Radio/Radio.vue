<template>
  <div :class="[{'disabled': disabled, 'ellipsis': ellipsis}, 'radio', color]">
    <label>
      <input
        @change="change"
        :value="inputValue"
        :name="name"
        :checked="checked"
        :disabled="disabled"
        type="radio"
      >
      <div class="check" />
      <span>{{ $t(label) }}</span>
    </label>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'nuxt-property-decorator'
import InputComponent from '@/types/Classes/InputComponent'

/**
 * Radio button component class
 * @author Carl Jeremy Omandam <carl@simplexi.com.ph>
 * @since 2019.09.27
 */
@Component
export default class Radio extends InputComponent {
  /**
   * Value of the radio button
   */
  @Prop({ default: null }) optionValue: any | null

  /**
   * Value property implementation
   */
  @Prop({ default: () => null }) value!: any

  /**
   * Truncates text and adds ellipsis to label when set to true
   */
  @Prop({ default: true }) ellipsis!: any

  /**
   * Sets the label as the value of the input if the value is not specified
   *
   * @returns any
   */
  get inputValue (): any {
    return this.optionValue !== null ? this.optionValue : this.label
  }

  change () {
    this.$emit('input', this.inputValue)
  }

  /**
   * Computed data that determines if a radio button is selected
   *
   * @returns boolean
   */
  get checked (): boolean {
    if (this.optionValue !== null) {
      return this.value === this.optionValue
    }

    return this.value === this.label
  }
}
</script>

<style lang="postcss" scoped>
@import './Radio.sss';
</style>
