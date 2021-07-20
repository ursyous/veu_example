<template>
  <div class="bg-white flex flex-col h-screen">
    <CleanHeader />

    <div class="wrapper">
      <div id="page-wrapper" class="content-container main">
        <nuxt />
        <Footer />
      </div>
    </div>

    <client-only>
      <vue-snotify class="material" />
    </client-only>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import CleanHeader from '@/components/layouts/CleanHeader'
import Footer from '@/components/layouts/Footer'

/**
 * Default layout
 * @author Angelito Diwata <angelito@simplexi.com.ph>
 * @since 2019.12.03
 */
@Component({
  components: {
    CleanHeader,
    Footer
  }
})
export default class Main extends Vue {
  /**
   * mounted function that executes the layout listener
   */
  mounted (): void {
    this.setLayoutListener()
  }

  /**
 * Listener for the layout
 */
  setLayoutListener (): void {
    window.addEventListener('scroll', this.setScroll)
  }

  /**
 * sets the scroll position using offset
 */
  setScroll (): void {
    this.$store.commit('layout/setScrollY', window.pageYOffset)
  }
}
</script>

<style lang="postcss">
@import '@/assets/sss/app.sss';
</style>
