import { mount, createLocalVue } from '@vue/test-utils'
import i18n from 'vue-i18n'
import { VueConstructor } from 'vue'
import Component from './Button.vue'
import en from '~/assets/locales/en.json'
import ko from '~/assets/locales/ko.json'

/**
 * Vue instance used for testing
 */
const localVue: VueConstructor = createLocalVue()
localVue.use(i18n)

/**
 * i18n object
 */
const i18n_obj: i18n = new i18n({
  locale: 'en',
  messages: {
    en,
    ko
  }
})

/**
 * Set of tests for custom button component
 */
describe('Button', () => {
  const wrapper: any = mount(Component, {
    propsData: {
      title: 'commons.save'
    },
    localVue,
    i18n: i18n_obj
  })

  it('Renders in English correctly', () => {
    expect(wrapper.element).toMatchSnapshot()
  })

  it('Renders in Korean correctly', () => {
    wrapper.vm.$i18n.locale = 'ko'
    expect(wrapper.element).toMatchSnapshot()
  })

  it('Emits click event', () => {
    wrapper.find('button').trigger('click')
    expect(wrapper.emitted().click.length).toBe(1)
  })
})
