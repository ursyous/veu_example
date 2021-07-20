<template>
  <div :class="['text-input', color, { empty: empty }]">
    <input
      ref="textbox"
      :value="value"
      :name="name"
      :disabled="disabled"
      :readonly="readonly"
      @input="setLimit"
      :type="!masked ? 'text' : 'password'"
      autocomplete="off"
      class="text-box"
      required
    >
    <label>
      <span>{{ $t(label) }}</span>
    </label>
    <p v-if="maxChars !== null">
      Characters Remaining: {{ remainingChars }} / {{ maxChars }}
    </p>
    <p :class="['error-message', color, { empty: empty }]" v-if="errorFlag.error === true">
      {{ errorFlag.message }}
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'nuxt-property-decorator'
import InputComponent from '@/types/Classes/InputComponent'

/**
 * Textbox component class
 * @author Carl Jeremy Omandam <carl@simplexi.com.ph>
 * @author Angelito Diwata <angelito@simplexi.com.ph>
 * @since 2019.09.27
 */
@Component
export default class Textbox extends InputComponent {
  /**
   * Value property implementation
   */
  @Prop({ type: String, default: '' }) value!: string

  /**
   * Sets input as readonly
   */
  @Prop({ type: Boolean, default: false }) readonly!: boolean

  /**
   * "maxChars"
   * - Serves as the maximum character property of this component
   */
  @Prop({ type: Number, default: null }) maxChars!: number

  /**
   * "bannedChars"
   * - Serves as the banned characters property of this component
   */
  @Prop({ default: null }) bannedChars!: any

  /**
   * "type"
   * - Serves as the input type property of this component
   */
  @Prop({ default: false }) masked!: boolean

  /**
   * Sets 'empty' class when value is empty
   */
  get empty (): boolean {
    return this.value === null || this.value.trim().length === 0
  }

  /**
   * computed function for errorflag
   * -Checks if there were any banned characters
   *  Existing in the input string.
   *
   * @return errorFlag : object
   */
  get errorFlag (): any {
    if (this.bannedChars !== '' && this.bannedChars !== null) {
      const rule: RegExp = new RegExp(this.bannedChars, 'g')
      const listedChars: Array<any> = [ ...new Set(this.value.match(rule)) ]
      if (rule.test(this.value) === true) {
        return {
          error: true,
          message: `Use of illegal characters (${listedChars}) not allowed!`
        }
      }
    }

    return {
      error: false,
      message: 'No Errors'
    }
  }

  /**
   * 'remainingChars function'
   * - Gets the remaining chartacters in the input
   * @return number
   */
  get remainingChars (): Number {
    return this.maxChars - this.value.length
  }

  /**
   * 'setLimit'
   * -Sets the limit and emits the current value to the parent element
   */
  setLimit (e: any): void {
    if (this.maxChars !== null) {
      const textBox: HTMLInputElement = this.$refs.textbox as HTMLInputElement
      textBox.value = textBox.value.substr(0, this.maxChars)
      this.emitInput(e.target.value)
    }
  }
}
</script>

<style lang="postcss" scoped>
@import './Textbox.sss';
</style>
