<template>
  <div>
    <label v-if="title !== ''" :class="`${(color !== '') ? 'text-' + color : ''}`" class="my-2 block font-medium text-sm">{{ title }}</label>
    <div class="button-group inline-flex shadow-lg shadow-sm">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

/**
 * Button Group component class
 * @author Lowell Dave Agnir <lowell@simplexi.com.ph>
 * @since 2019.10.28
 * @updated 2019.10.30
 */
@Component({
  name: 'buttongroup'
})
export default class ButtonGroup extends Vue {
  /**
   * Button Group Title Value
   */
  @Prop({ type: String, default: '' }) title !: string

  /**
   * Button Group Appearance Value
   */
  @Prop({ type: String, default: '' }) color !: string
}
</script>

<style lang="postcss">
@import './ButtonGroup.sss'
</style>
