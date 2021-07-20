<template>
  <div class="shadow-sm shadow-md rounded-t-lg">
    <div @click="setTriggerStatus(!triggerCollapse)" :class="['py-2', 'px-10', 'shadow-md', 'border-t', 'collapse', 'cursor-pointer', (color !== '' ? 'collapse-' + color : ''), { 'selected': triggerCollapse }, { 'disabled' : disabled}]">
      <span class="text-sm">{{ title }}</span>
      <span class="collapse-trigger float-right">
        <font-awesome-icon :icon="triggerCollapse === true ? 'chevron-up' : 'chevron-down'" fas />
      </span>
    </div>
    <transition name="slideCollapse" enter-active-class="slideCollapseOut" leave-active-class="slideCollapseIn">
      <div ref="collapse" v-show="triggerCollapse" :style="collapseHeight" class="collapse-panel">
        <slot />
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

/**
 * Collapsible component class
 * @author Lowell Dave Agnir <lowell@simplexi.com.ph>
 * @since 2019.10.24
 */
@Component
export default class Collapse extends Vue {
  /**
   * Life-Cycle Hooks: Mounted
   * Getting content height upon creation and setting event listener to the window for resizing
  */
  mounted () : void {
    this.getContentHeight()
    window.addEventListener('resize', () => {
      this.getContentHeight(this.triggerCollapse)
    })
  }

  /**
   * Life-Cycle Hooks: Destroyed
   * Unsetting event listener to the window for resizing then get current content height
  */
  destroyed (): void {
    return window.removeEventListener('resize', () => {
      this.getContentHeight(this.triggerCollapse)
    })
  }

  /**
   * Collapse Title Property
  */
  @Prop({ type: String, default: '' }) title !: string

  /**
   * Collapse Color Appearance Property
  */
  @Prop({ type: String, default: '' }) color !: string

  /**
   * Collapse Disabled Property
  */
  @Prop({ type: Boolean, default: false }) disabled !: boolean

  /**
   * Collapse Trigger Property
  */
  triggerCollapse : boolean = false

  /**
   * Collapse Content Height Property
  */
  height : string = '0px'

  /**
   * collapseHeight
   * setting height prop to be passed in the css
   * @return object
  */
  get collapseHeight () : object {
    return {
      '--iHeight': this.height
    }
  }

  /**
   * getContentHeight
   * Getting computed collapsible height
   * @param bParam boolean
  */
  getContentHeight (bParam = false) : void {
    const oCollapse : HTMLElement = this.$refs.collapse as HTMLElement
    if (bParam === false) {
      oCollapse.style.height = 'auto'
      oCollapse.style.display = 'block'
      this.height = getComputedStyle(oCollapse).height || ''
      oCollapse.style.display = 'none'
      oCollapse.style.height = null
    } else {
      this.height = getComputedStyle(oCollapse).height || ''
    }
  }

  /**
   * setTriggerStatus
   * Setting boolean status of collapsible
   * @param bTrigger boolean
  */
  setTriggerStatus (bTrigger : boolean) : void {
    if (this.disabled === false) {
      this.triggerCollapse = bTrigger
    }
  }
}
</script>
<style lang="postcss" scoped>
@import './Collapse.sss'
</style>
