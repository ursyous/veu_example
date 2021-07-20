<template>
  <img v-on="$listeners" :src="iconType" class="inline-block align-middle">
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

/**
 * Icon component
 * @author Carl Jeremy Omandam <carl@simplexi.com.ph>
 * @since 2019.10.03
 */
@Component
export default class Icon extends Vue {
  readonly prefix: string = '/images/icons'
  readonly icons: object = {
    check: 'check.png',
    close: 'close.png',
    help: 'help.png',
    info: 'info.png',
    edit: 'pen.png',
    'edit-account': 'account-edit.png',
    'edit-account-light': 'account-edit-light.png'
  }

  /**
   * Icon name property
   */
  @Prop({
    default: () => {
      return null
    }
  })
  icon!: any

  get iconType (): string {
    return this.prefix + '/' + this.icons[this.icon]
  }
}
</script>

<style lang="postcss" scoped>
@import './Icon.sss';
</style>
