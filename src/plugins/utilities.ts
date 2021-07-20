import Vue from 'vue'

/**
 * Returns distinct values in an array
 * 
 * @returns Array<any>
 */
const getDistinct  = (filterArray: Array<any>): any => {
  return filterArray.reduce((accumulator: Array<any>, currentValue: any) => {
    if (!accumulator.includes(currentValue)) {
      accumulator.push(currentValue)
    }

    return accumulator
  }, [])
}

/**
 * Retrives value in a nested object using string pointer
 *
 * @param path string
 * @param obj object
 * @returns any
 */
const getTargetVariable = (path: string, obj: { [x: string]: any }): any => {
  const src: Array<string> = path.split('.')
  let target: any = obj[src[0]]

  for (let idx = 1; idx < src.length; idx++) {
    target = target[src[idx]]
  }
  
  return target
}

/**
 * Collection of utility methods
 */
const utilities: { install: (Vue: any) => void } = {
  install: (Vue: Vue | any): void => {
    Vue.prototype.$utilities = {
      getDistinct,
      getTargetVariable
    }
  }
}

Vue.use(utilities)
