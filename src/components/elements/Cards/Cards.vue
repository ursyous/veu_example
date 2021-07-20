<template>
  <div :class="['card-main-div', width]">
    <img v-if="src !== null" :src="src" :class="['card-img']">
    <slot />
    <div :class="['card-sub-div']">
      <div :class="['card-title']">
        {{ title }}
      </div>
      <p :class="['card-desc']">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

/**
 * Cards component class
 * @author Angelito Diwata <angelito@simplexi.com.ph>
 * @since 2019.10.25
 */
@Component
export default class Cards extends Vue {
  /**
   * "title"
   * - Serves as the title property of this component
   */
  @Prop({ type: String, default: null }) title!: String

  /**
   * "description"
   * - Serves as the description property of this component
   */
  @Prop({ type: String, default: null }) description!: String

  /**
   * "src"
   * - Serves as the src property of the
   *   image inside this component
   */
  @Prop({ type: String, default: null }) src!: String

  /**
   * "width"
   * - Serves as the width property of this component
   */
  @Prop({ type: String, default: 'medium' }) width!: String
}
</script>

<style lang="postcss" scoped>
@import './Cards.sss';
</style>
