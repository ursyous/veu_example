<template>
  <div class="progress-bar">
    <div v-if="hasText" class="bar-text">
      <span>{{ progressText }}</span>
    </div>
    <div class="bar-background">
      <div :class="['bar-loaded', ...progressBarClass]" :style="{ width: progressWidth }">
        <div class="bar-shine" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

/**
 * Progress Bar component class
 * @author Lowell Dave Agnir <lowell@simplexi.com.ph>
 * @since 2019.11.13
 */
@Component
export default class ProgressBar extends Vue {
  /**
   * text show toggle property property
  */
  @Prop({ type: Boolean, default: true }) hasText !: boolean

  /**
   * base target number property
  */
  @Prop({ type: Number, default: 0 }) target !: number

  /**
   * current number property
  */
  @Prop({ type: Number, default: 0 }) current !: number

  /**
   * progress bar class array property
  */
  @Prop({ type: Array, default: () => { return [ 'bg-green-400' ] } }) progressBarClass !: Array<string>

  /**
   * progress width property
   * compute the width of progress bar
   * @return string
  */
  get progressWidth () : string {
    let percentage : number = (this.current / this.target) * 100
    if (this.current >= this.target) {
      percentage = 100
    } else if (this.target === 0 && this.current !== 0) {
      percentage = 0
    }

    return `${percentage}%`
  }

  /**
   * progress text property
   * @return string
  */
  get progressText () : string {
    return `(${this.progressWidth}) ${this.current} out of ${this.target} completed`
  }
}
</script>

<style lang="postcss" scoped>
  @import './ProgressBar.sss'
</style>
