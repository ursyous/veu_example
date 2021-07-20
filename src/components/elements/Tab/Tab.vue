<template>
  <div :class="['tab', { active: showActive && content }, color]">
    <div v-if="!content" @click="setCurrentTab(list)" :class="{ active: showActive }" class="tab-title">
      <span>
        {{ title }}
      </span>
    </div>
    <div v-else-if="content" v-show="showActive" :style="[{ height: height }]" class="tab-content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
/**
 * Tab component class
 * @author Lowell Dave Agnir <lowell@simplexi.com.ph>
 * @since 2019.10.24
 * @updated 2019.11.06
 */
@Component
export default class Tab extends Vue {
  /**
   * Tab default active property
   */
  @Prop({ type: Boolean, default: false }) active!: boolean

  /**
   * Tab title property
   */
  @Prop({ type: String, default: '' }) title!: string

  /**
   * Tab title index property
   */
  @Prop({ type: String, default: '' }) index!: string

  /**
   * Tab color appearance property
   */
  @Prop({ type: String, default: '' }) color!: string

  /**
   * Tab content index property
   */
  @Prop({ type: String, default: '' }) target!: string

  /**
   * Tab content height property
   */
  @Prop({ type: String, default: '' }) height!: string

  /**
   * TabList index
   */
  list!: string

  /**
   * Tab show current active property
   */
  showActive: boolean = false

  /**
   * Tab content flag
   */
  content: boolean = false

  /**
   * Life Cycle Hooks: Created
   * Setting active status to the specified default tab
   */
  created (): void {
    this.list = this.$parent.$props.list

    this.$bus.$on('tabSelect', (params: { [x: string]: any }) => {
      if (this.list === params.list) {
        this.showActive = params.index === this.index || params.index === this.target
      }
    })

    if (this.target !== '') {
      this.content = true
    }

    this.showActive = this.active
  }

  /**
   * setCurrentTab
   * setting this as current tab br emitting event to bus
   * @param defaultTab boolean
   * @param index boolean
   */
  setCurrentTab (list: string): void {
    if (this.index !== '') {
      this.$bus.$emit('tabSelect', { index: this.index, list })
    }
  }
}
</script>
<style lang="postcss">
@import './Tab.sss';
</style>
