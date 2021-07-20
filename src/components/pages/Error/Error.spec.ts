import { mount, createLocalVue } from '@vue/test-utils'
import { VueConstructor } from 'vue'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import i18n from 'vue-i18n'
import Error from './Error.vue'
import en from '~/assets/locales/en.json'
import ko from '~/assets/locales/ko.json'

// This is important, we are going to let Nuxt.js worry about the CSS
config.autoAddCss = false

// You can add your icons directly in this plugin. See other examples for how you
// can add other styles or just individual icons.
library.add(fas)

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

// Register the component globally
localVue.component('font-awesome-icon', FontAwesomeIcon)

/**
 * Mock $route object
 */
const mockRoute = {
  params: {
    code: '404'
  }
}

/**
 * Set of tests for error page
 */
describe('Error page', () => {
  const component = mount(Error, {
    localVue,
    mocks: {
      $route: mockRoute
    },
    i18n: i18n_obj
  })

  it('Displays proper error page based on error code', () => {
    expect(component.element).toMatchSnapshot()
  })
})
