import { Vue, Prop, Watch, Component } from 'nuxt-property-decorator'

/**
 * Base class for components that use dynamic html classes
 * intended to be used as a mixin
 * @author Carl Jeremy Omandam <carl@simplexi.com.ph>
 * @since 2019.10.16
 */
@Component
export default class DynamicClasses extends Vue {
  /**
   * Conditional classes that meets the condition
   */
  appliedClasses: object = []

  /**
   * Dynamic properties
   */
  @Prop({ type: Object, default: (): object => ({}) }) dynamicProps!: object

  /**
   * Classes and conditions when to add them
   */
  @Prop({ default: (): Array<any> => [] }) conditionalClass!: object[]

  /**
   * Applies conditional classes
   *
   * @returns void
   */
  @Watch('dynamicProps', { immediate: true, deep: true })
  class (): void {
    const classes: string[] = []
    this.conditionalClass.forEach((element: any): void => {
      if (this.evaluateClassCondition(element) === true) {
        classes.push(element.name)
      }
    })

    this.appliedClasses = classes
  }

  /**
   * Evaluates the class condition
   *
   * @param element
   * @returns boolean
   */
  evaluateClassCondition (element: any): boolean {
    switch (element.operator) {
    case '!==': {
      return this.dynamicProps[element.reference] !== element.value
    }
    case '>': {
      return this.dynamicProps[element.reference] > element.value
    }
    case '<': {
      return this.dynamicProps[element.reference] < element.value
    }
    case '>=': {
      return this.dynamicProps[element.reference] >= element.value
    }
    case '<=': {
      return this.dynamicProps[element.reference] <= element.value
    }
    default: {
      return this.dynamicProps[element.reference] === element.value
    }
    }
  }
}
