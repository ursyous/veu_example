<template :theme="theme" :class="['breadCrumbs-Container']">
  <div>
    <ul class="flex content-start">
      <li :key="link.id" v-for="link in breadCrumbs" class="mx-1">
        <a :href="link.link">
          <p :class="['breadCrumbs', theme, color]">{{ link.text }}</p>
        </a>
        <p v-if="theme === 'link'" :class="['breadCrumbs']">
          /
        </p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

/**
 * BreadCrumbs component class
 * @author Angelito Diwata <angelito@simplexi.com.ph>
 * @since 2019.10.25
 */
@Component
export default class BreadCrumbs extends Vue {
  /**
   * 'theme'
   * -sets the theme for the breadcrumb
   * choices: chips, link
   */
  @Prop({ type: String, default: 'link' }) theme!: string

  /**
   * 'color'
   * -sets the color option for the breadcrumb
   * choices: primary, success, warning, danger
   */
  @Prop({ type: String, default: 'primary' }) color!: string

  /**
   * "SplitUrl"
   * - Splits the current route string into
   *   an array of strings.
   * @return routeParts : array
   */
  splitUrl (): Array<any> {
    const url: string = this.$router.currentRoute.fullPath
    const route: Array<string> = url.split('/')
    const routeParts: Array<any> = []
    let counter: number
    for (counter = 1; counter < route.length; counter++) {
      const linkText: string = route[counter].toUpperCase()
      const actualLink: string = `/${route.slice(2, counter + 1).join('/')}`
      routeParts.push({ text: linkText, link: actualLink })
    }

    return routeParts
  }

  breadCrumbs: Array<string> = this.splitUrl()
}
</script>

<style lang="postcss" scoped>
@import './BreadCrumbs.sss';
</style>
