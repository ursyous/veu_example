<template>
  <div :class="[{'disabled': disabled}, 'switch', color]">
    <label>
      <input
        :name="name"
        :checked="checked"
        :disabled="disabled"
        @change="emitInput(!value)"
        type="checkbox"
      >
      <span class="switch-label">{{ label }}</span>
      <span class="slider round" />
    </label>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'nuxt-property-decorator'
import InputComponent from '@/types/Classes/InputComponent'

/**
 * Toggle switch button component class
 * @author Carl Jeremy Omandam <carl@simplexi.com.ph>
 * @since 2019.09.27
 */
@Component
export default class ToggleSwitch extends InputComponent {
  /**
   * Value property implementation
   */
  @Prop({ default: () => false }) value!: any

  /**
   * Computed data that determines whether the switch is toggled or not
   */
  get checked (): boolean {
    return this.value === true
  }
}
</script>

<style lang="postcss" scoped>
@import './ToggleSwitch.sss';
</style>
