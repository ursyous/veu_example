<template>
  <div class="mx-12 my-8 h-screen z-10 p-8 bg-white shadow-lg relative" />
</template>

<script lang="ts">
import { Context } from 'vm'
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class Index extends Vue {
  /**
   * validate
   * check if the param lang in the context are valid
   */
  validate ( context : Context ) : boolean {
    const validLang = [ 'en', 'ko' ]
    const lang = context.params.lang
    const isPageValid = (lang === undefined || validLang.includes(lang))

    return isPageValid
  }

  beforeCreate () {
    this.$router.push('/dashboard')
  }
}
</script>
