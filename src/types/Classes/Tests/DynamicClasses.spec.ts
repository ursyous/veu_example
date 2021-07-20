import { mount, createLocalVue } from '@vue/test-utils'
import { VueConstructor } from 'vue'
import DynamicClasses from '../DynamicClasses'

/**
 * Vue instance used for testing
 */
const localVue: VueConstructor = createLocalVue()

/**
 * Creates new propsData object
 *
 * @param propName
 * @param state
 */
const createPropsData = (propName: string, state: boolean) : object => {
  const props: {[x : string]: any} = {
    dynamicProps: {},
    conditionalClass: [ {
      'name': 'hidden',
      'reference': 'isHidden',
      'operator': '===',
      'value': true
    } ]
  }
  props.dynamicProps[propName] = state

  return props
}

/**
 * Set of tests for DynamicClass
 */
describe('DynamicClass', () => {
  const component: any = mount(
    {
      render () {},
      mixins: [ DynamicClasses ]
    },
    {
      propsData: createPropsData('isHidden', true),
      localVue
    }
  )

  it('Applies class when condition is met', () => {
    expect(component.vm.$data.appliedClasses).toContain('hidden')
  })

  it('Removes class when condition is not met', () => {
    component.setProps(createPropsData('isHidden', false))
    expect(component.vm.$data.appliedClasses).not.toContain('hidden')
  })
})
