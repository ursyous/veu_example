<template>
  <div class="bg-gray-200">
    <div class="min-h-screen flex">
      <div v-show="isLoaded" class="error w-10/12 lg:p-12 md:p-0 lg:inline-flex md:block">
        <div class="error-image-container lg:p-16 md:p-12 sm:p-8">
          <img
            id="error-image"
            :src="getCodeSet.image"
            class="lg:w-auto md:w-64 sm:w-40 xs:w-28 h-auto"
          >
        </div>
        <div class="error-content-container">
          <div>
            <span id="error-greeting" class="lg:text-6xl md:text-4xl sm:text-3xl">
              Oops!
              <strong class="text-red-600">{{ errorCode !== '0' ? errorCode : '' }}</strong>
            </span>
          </div>
          <div>
            <span
              id="error-message"
              class="lg:text-5xl md:text-3xl sm:text-3xl"
            >{{ getCodeSet.message }}</span>
          </div>
          <div>
            <span id="error-text" class="lg:text-xl md:text-lg sm:text-lg">
              You can contact the development team to fix the problem
              <b>or you can go back to the previous page.</b>
            </span>
          </div>
          <div class="my-8">
            <span id="error-option" @click="clickBack" class="lg:text-sm">
              <font-awesome-icon fas icon="chevron-left" />&nbsp;
              Go back
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="relative">
      <Footer />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import Footer from '@/components/layouts/Footer'

/**
 * Error component class
 * @author Lowell Dave Agnir <lowell@simplexi.com.ph>
 * @since 2019.10.30
 * @updated 2019.11.06
 */
@Component({
  components: { Footer },
  layout: 'clean'
})
export default class ErrorPage extends Vue {
  /**
    * isLoaded
    * trigger upon page mount variable
  */
  isLoaded : boolean = false

  /**
    * imageList
    * list of errors that can be used including message and image link
  */
  readonly imageList : object = {
    0: { image: '/images/warning.png', message: 'There\'s an error.' },
    404: { image: '/images/warning.png', message: 'Can\'t find the page you\'re looking for.' },
    403: { image: '/images/forbidden.png', message: 'You\'re not allowed to access this page.' }
  }

  /**
     * errorCode
     * error code used in this page
    */
  errorCode !: number

  /**
    * getCodeSet
    * returns object from imageList
    * @return object
  */
  get getCodeSet () : object {
    if (this.imageList[this.errorCode] === undefined) {
      return this.imageList[0]
    }

    return this.imageList[this.errorCode]
  }

  /**
    * Life Cycle Hooks: Created
    * checks code Parameter and set errorCode if valid error code
    * sets to default if invalid parameter
  */
  created () : void {
    const errorCode : number = this.$route.params.code !== undefined ? parseInt(this.$route.params.code, 10) : 0
    errorCode < 400 || errorCode > 599 ? this.errorCode = 0 : this.errorCode = errorCode
  }

  /**
    * Life Cycle Hooks: Mounted
    * set isLoaded to true upon mounted
  */
  mounted () : void {
    this.isLoaded = true
  }

  /**
    * clickBack
    * returns user to previous page
  */
  clickBack () : void {
    this.$router.back()
  }
}
</script>

<style lang="postcss">
@import './Error.sss';
</style>
