<template>
  <label :class="[{'disabled': disabled}, 'checkbox', color]">
    <input
      :name="name"
      :value="inputValue"
      :checked="checked"
      :disabled="disabled"
      @change="setValue()"
      type="checkbox"
    >
    <span class="checkmark" />
    <div>
      <span>{{ $t(label) }}</span>
    </div>
  </label>
</template>

<script lang="ts">
import { Component, Prop } from 'nuxt-property-decorator'
import InputComponent from '@/types/Classes/InputComponent'

/**
 *Checkbox component class
 * @author Carl Jeremy Omandam <carl@simplexi.com.ph>
 * @since 2019.09.27
 */
@Component
export default class Checkbox extends InputComponent {
  /**
   * Value of the checkbox
   */
  @Prop({ default: null }) optionValue: any

  /**
   * Value property
   */
  @Prop({
    default: () => {
      return []
    }
  })
  readonly value!: Array<any>

  /**
   * Computed data that determines if a checkbox is selected
   * @returns boolean
   */
  get checked (): boolean {
    return this.value.includes(this.inputValue)
  }

  /**
   * Sets the label as the value if the value is not specified
   * @returns any
   */
  get inputValue (): any {
    return this.optionValue !== null ? this.optionValue : this.label
  }

  /**
   * Adds or removes the input value in the assigned variable
   */
  setValue (): void {
    let value: Array<any> = this.value

    if (this.checked) {
      value = this.value.filter((elem: any) => {
        return elem !== this.inputValue
      })
    } else {
      this.value.push(this.inputValue)
    }

    this.emitInput(value)
  }
}
</script>

<style lang="postcss" scoped>
@import './Checkbox.sss';
</style>
