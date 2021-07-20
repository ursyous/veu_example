<template>
  <div class="numeric-input-container">
    <button v-if="stepper === true && allowFractional === false" :class="['step-buttons', 'min']" @click="stepFunction('-')">
      -
    </button>
    <input
      ref="input"
      :placeholder="placeholder"
      :class="['numeric-input', { stepper: stepper }, textAlign]"
      v-on="listeners"
      :value="Number.isNaN(Number(value)) ? null : value"
      type="text"
    >
    <button v-if="stepper === true && allowFractional === false" :class="['step-buttons', 'max']" @click="stepFunction('+')">
      +
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'nuxt-property-decorator'
import InputComponent from '@/types/Classes/InputComponent'

/**
 * Numeric input component class
 * @author Carl Jeremy Omandam <carl@simplexi.com.ph>
 * @author Angelito Diwata <angelito@simplexi.com.ph>
 * @since 2019.10.29
 */
@Component
export default class NumericInput extends InputComponent {
  /**
   * Holds the last numeric value
   */
  previousValue?: any = this.value

  /**
   * Value property implementation
   */
  @Prop({ default: () => '' }) value!: number

  /**
   * Prevents user from entering fractional values if set to false
   */
  @Prop({ type: Boolean, default: false }) allowFractional!: boolean

  /**
   *-Determines if the stepper will be visible in the number input component
   */
  @Prop({ type: Boolean, default: false }) stepper!: boolean

  /**
   *-Determines the number of steps of the stepper in the number input component
   */
  @Prop({ type: Number, default: 1 }) steps!: number

  /**
   *-Determines the placeholder of the number input component
   */
  @Prop({ type: String, default: 'your number here...' }) placeholder!: string

  /**
   *-Determines the textAlign of the number input component
   */
  @Prop({ type: String, default: 'left' }) textAlign!: string

  /**
   * Binds every listener attached to the component to the input element
   *
   * @returns object
   */
  get listeners (): object {
    return Object.assign({}, this.$listeners, {
      input: this.validateInput
    })
  }

  /**
   * Checks if new value is numeric and sets to previous value if not
   *
   * @param event
   * @returns void
   */
  validateInput (event: any): void {
    const val: any = event.target.value
    const numInput: HTMLInputElement = this.$refs.input as HTMLInputElement
    if (
      Number.isNaN(Number(val)) ||
      numInput.value[0] === '-' ||
      numInput.value[0] === '+' ||
      (this.allowFractional === false && String(val).includes('.'))
    ) {
      numInput.value = this.previousValue || null
    } else {
      this.previousValue = event.target !== null ? (event.target as HTMLInputElement).value : null
    }

    this.$emit('input', numInput.value)
  }

  /**
   * function for the stepper
   *
   * @param operator
   * @returns void
   */
  stepFunction (operator: string): void {
    const numInput: HTMLInputElement = this.$refs.input as HTMLInputElement
    if (operator === '+') {
      numInput.value = String(Number(numInput.value) + this.steps)
      if (Number.isNaN(Number(numInput.value))) {
        numInput.value = '0'
      }
    } else if (operator === '-') {
      numInput.value = String(Number(numInput.value) - this.steps)
      if (Number.isNaN(Number(numInput.value)) || Number(numInput.value) < 0) {
        numInput.value = ''
      }
    }
    this.$emit('input', numInput.value)
  }
}
</script>
<style lang="postcss">
@import './NumericInput.sss';
</style>
