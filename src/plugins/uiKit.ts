import Vue from 'vue'
import * as elements from '@/components/elements'

Object.keys({
  ...elements
}).forEach((key:string): void => Vue.component(key, elements[key]))
