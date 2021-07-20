<template>
  <nav>
    <div class="header">
      <div class="row">
        <nuxt-link :to="$path('/main')" tag="a" class="navbar-logo mr-8">
          <img src="/logo.png" alt="logo">
          <span class="whitespace-no-wrap">{{ $t('service.name') }}</span>
        </nuxt-link>
      </div>
      <div class="header-nav-bar">
        <ul>
          <earth-icon class="icon-2x mr-2 mb-1" />
          <Dropdown v-model="locale" :items="languageDropdownData" placeholder="언어 선택" />
          <li>
            <div class="text-gray-600">
              <div
                class="row cursor-pointer"
              >
                <nuxt-link :to="$path('/login')" tag="h1">
                  {{ $t('pages.login.title') }}
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

/**
 * CleanHeader Nav Bar
 * @author Angelito Diwata <angelito@simplexi.com.ph>
 * @since 2019.12.03
 */
@Component({
  components: {
    EarthIcon
  }
})
export default class CleanHeader extends Vue {
  /**
 * Data for the current locale
 */
  locale = this.$store.getters['locale/getLocale']
  /**
 * Gets the locale to be used
 */
  get languageDropdownData (): object {
    return this.$store.state.locale.availableLocales.map((item: any) => {
      return {
        value: item.code,
        text: this.$t(item.text)
      }
    })
  }

  /**
 * Watches the locale change and applies it to the I18n and store
 */
  @Watch('locale')
  changeLocale (locale: string): void {
    this.$store.commit('locale/setLocale', locale)

    this.$i18n.locale = locale

    this.$router.push(this.$path(this.$route.fullPath))
  }
}
</script>

<style lang="postcss" scoped>
@import './CleanHeader.sss';
</style>
