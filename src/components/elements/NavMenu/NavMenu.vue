<template>
  <div class="nav-menu">
    <div v-for="(menu, idx) in menus" :key="idx" class="flex flex-col mt-3">
      <span v-if="menu.target.trim().length === 0" class="block pl-2 font-semibold">{{ $t(menu.label) }}</span>
      <nuxt-link v-else :to="menu.target.trim()" class="nav-menu-link">
        {{ $t(menu.label) }}
      </nuxt-link>
      <navmenu
        v-if="menu.subMenus.length > 0"
        :key="menu.label"
        :menus="menu.subMenus"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

/**
 * Navigation menu component
 * @author Carl Jeremy Omandam <carl@simplexi.com.ph>
 * @since 2019.10.10
 */
@Component({
  name: 'navmenu'
})
export default class NavMenu extends Vue {
  /**
   * Menu content property
   */
  @Prop({ default: [] }) menus?: object[]
}
</script>

<style lang="postcss">
@import './NavMenu.sss';
</style>
