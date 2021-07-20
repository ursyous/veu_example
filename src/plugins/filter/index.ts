import Vue from 'vue'

Vue.filter('numberFormat', (value: number): string => {
  return new Intl.NumberFormat().format(value)
})
