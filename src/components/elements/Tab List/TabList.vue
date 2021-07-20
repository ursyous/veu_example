<template>
  <div :class="[ tabs, color ]" class="tab-list">
    <div class="tab-title-container z-0">
      <slot name="title" />
    </div>
    <div :style="{height: height}" class="tab-content-container z-10">
      <slot name="content" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

/**
 * Tab list component class
 * @author Lowell Dave Agnir <lowell@simplexi.com.ph>
 * @since 2019.10.24
 * @updated 2019.11.06
 */
@Component
export default class TabList extends Vue {
  /**
   * TabList Display Style
  */
  @Prop({ type: String, default: 'top' }) tabs !: string

  /**
   * TabList Color Appearance
  */
  @Prop({ type: String, default: '' }) color !: string

  /**
   * TabList id
  */
  @Prop({ type: String, default: '' }) list !: string

  /**
   * TabList height
  */
  @Prop({ type: String, default: '' }) height !: string
}
</script>

<style lang="postcss">
  @import './TabList.sss'
</style>
