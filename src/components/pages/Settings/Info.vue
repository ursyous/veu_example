<template>
  <div :class="[...appliedClasses]" class="info">
    <div :class="[titleClass, 'info-title']">
      {{ $t(title) }}
    </div>
    <div class="info-content">
      <img
        v-if="info !== null && info.type === 'image'"
        :src="info.value"
        class="border-rounded h-20 w-20 inline-block"
      >
      <span v-if="info !== null && info.type === 'text'">{{
        $t(info.value)
      }}</span>
      <input
        v-if="info !== null && info.type === 'input'"
        :type="info.inputType"
        :value="info.value"
        :placeholder="info.placeholder"
        :maxlength="info.maxlength"
        class="border-rounded p-1 w-64"
      >
      <slot />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop } from 'nuxt-property-decorator'
import DynamicClasses from '~/types/Classes/DynamicClasses'

/**
 * Info component
 * @author Carl Jeremy Omandam <carl@simplexi.com.ph>
 * @since 2019.10.03
 */
@Component
export default class Info extends DynamicClasses {
  /**
   * Title property
   */
  @Prop({ type: String, default: null }) title?: string

  /**
   * Info content
   */
  @Prop({ type: Object, default: (): Object => ({}) }) info!: {
    [x: string]: any
  }

  /**
   * Classes to be applied to the title section
   */
  @Prop({ type: String, default: null }) titleClass!:string
}
</script>
<style lang="postcss" scoped>
  @import './info.sss';
</style>
