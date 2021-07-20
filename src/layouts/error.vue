<template>
  <div />
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { Route } from 'vue-router'

/**
 * Error Layout class
 * @author Lowell Dave Agnir <lowell@simplexi.com.ph>
 * @since 2019.11.07
 */
@Component({
  layout: 'clean'
})
export default class Error extends Vue {
  /**
    * error
    * code that passed from the context
  */
  @Prop({ type: Object, default: () : object => { return {} } }) error !: { statusCode : number, message : string }

  /**
    * errorCode
    * code that will be passed to the error page
  */
  errorCode !: number

  /**
    * Life Cycle Hooks: Created
    * gets the full path paremeter of the _.vue then
    * replacing the url with the Error Page's URL
  */
  created () : void {
    const code : number = this.error.statusCode

    this.errorCode = !isNaN(Number(code)) ? code : 404

    this.$router.replace('/error', (result : Route) => {
      result.params.code = this.errorCode.toString()
    })
  }
}
</script>
