import Vue from 'vue'
import { Plugin } from '@nuxt/types'

declare module 'vue/types/vue' {
  interface Vue {
    $bus: Vue
  }
}

const busPlugin: Plugin = (_contex, inject): void => {
  inject('bus', new Vue())
}

export default busPlugin
