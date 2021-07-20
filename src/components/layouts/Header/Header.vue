<template>
  <nav>
    <div class="header">
      <div class="row">
        <nuxt-link :to="$path('/')" tag="a" class="navbar-logo mr-8">
          <img src="/logo.png" alt="logo">
          <span class="whitespace-no-wrap">{{ $t('service.name') }}</span>
        </nuxt-link>
      </div>
      <div class="header-nav-bar">
        <ul>
          <li>
            <div class="row">
              <div class="border rounded py-3 px-10 border-gray-300">
                <p class="text-sm">
                  mall_name(mall_id)
                </p>
              </div>
            </div>
          </li>
          <li>
            <earth-icon class="icon-2x mr-2 mb-1" />
            <Dropdown v-model="locale" :items="languageDropdownData" />
          </li>
          <li>
            <div class="text-gray-600">
              <div
                ref="profileDropdown"
                @click="isShowProfileDropdown = !isShowProfileDropdown"
                class="row cursor-pointer"
              >
                <img src="/basic-user.png" class="w-10 h-10 rounded-full border">
                <span class="text-sm ml-3">{{ nickname }}</span>
                <chevron-down-icon class="icon-lg ml-2" />
              </div>
              <div
                v-show="isShowProfileDropdown"
                v-closable="{
                  handler: 'closeProfileDropdown',
                  exclude: [ 'profileDropdown' ]
                }"
                class="profile-dropdown"
              >
                <nuxt-link
                  v-for="(item, index) in profileDropdownMenu"
                  :key="index"
                  @click="() => closeProfileDropdown()"
                  :to="$path(item.link)"
                  tag="a"
                  class="px-6 py-3 hover:bg-gray-100 block"
                >
                  {{ $t(item.text) }}
                </nuxt-link>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import EarthIcon from 'vue-material-design-icons/Earth.vue'
import ChevronDownIcon from 'vue-material-design-icons/ChevronDown.vue'
import HeaderTemplate from '~/static/templates/header.json'

@Component({
  components: {
    EarthIcon,
    ChevronDownIcon
  }
})

/**
 * Header Nav Bar
 * @author John Alene Pacheco <john12@simplexi.com.ph>
 * @since 2019.10.10
 */
export default class Header extends Vue {
  readonly profileDropdownMenu = HeaderTemplate.profileDropdown

  locale = this.$store.getters['locale/getLocale']

  isShowProfileDropdown = false

  nickname = 'Administrator'

  get languageDropdownData (): object {
    return this.$store.state.locale.availableLocales.map((item: any) => {
      return {
        value: item.code,
        text: this.$t(item.text)
      }
    })
  }

  closeProfileDropdown (): void {
    this.isShowProfileDropdown = false
  }

  @Watch('locale')
  changeLocale (locale: string): void {
    this.$store.commit('locale/setLocale', locale)

    this.$i18n.locale = locale

    this.$router.push(this.$path(this.$route.fullPath))
  }
}
</script>

<style lang="postcss" scoped>
@import './Header.sss';
</style>
