<template>
  <nuxt-link :to="target" class="btn">
    {{ $t(label) }}
    <slot />
  </nuxt-link>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

/**
 * Nav component class
 * @author Carl Jeremy Omandam <carl@simplexi.com.ph>
 * @since 2019.09.27
 */
@Component
export default class Nav extends Vue {
  /**
   * Nav label property
   */
  @Prop({ type: String, default: '' }) readonly label!: string

  /**
   * Nav target directory
   */
  @Prop({ type: String, default: '/' }) readonly target!: string
}
</script>

<style lang="postcss" scoped>
@import '../Button/Button.sss';
</style>
