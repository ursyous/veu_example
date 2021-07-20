<template>
  <div class="flex flex-col h-screen">
    <Header />

    <div class="wrapper">
      <LeftPanel />

      <div id="page-wrapper" class="content-container">
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
import 'core-js'
import { Component, Vue } from 'nuxt-property-decorator'
import Header from '@/components/layouts/Header'
import Footer from '@/components/layouts/Footer'
import LeftPanel from '@/components/layouts/LeftPanel'

/**
 * Default layout
 * @author Carl Jeremy Omandam <carl@simplexi.com.ph>
 * @author John Alene Pacheco <john12@simplexi.com.ph>
 * @since
 */
@Component({
  components: {
    Header,
    Footer,
    LeftPanel
  }
})
export default class Default extends Vue {
  mounted (): void {
    this.setLayoutListener()
  }

  setLayoutListener (): void {
    window.addEventListener('scroll', this.setScroll)
    window.addEventListener('resize', this.setSize)
  }

  setScroll (): void {
    this.$store.commit('layout/setScrollY', window.pageYOffset)
  }

  setSize (): void {
    this.$store.commit('layout/setClientWidth', window.innerWidth)
    this.$store.commit('layout/setClientHeight', window.innerHeight)
  }
}
</script>

<style lang="postcss">
@import '@/assets/sss/app.sss';
</style>
