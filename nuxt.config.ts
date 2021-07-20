import path from 'path'
import { Configuration } from '@nuxt/types'
import { NuxtRouteConfig } from '@nuxt/types/config/router'
import pkg from './package.json'

const config: Configuration = {
  head: {
    title: 'BI Targeting System',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui'
      },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Noto+Sans+KR:300,400,500,700,900&display=swap&subset=korean'
      }
    ]
  },
  loading: { color: '#000' },
  css: [
    '@/assets/css/tailwind.css',
    '@fortawesome/fontawesome-svg-core/styles.css',
    'vue-material-design-icons/styles.css',
    'vue-snotify/styles/material.css'
  ],
  plugins: [
    { src: '~/plugins/uiKit.ts' },
    { src: '~/plugins/i18n.ts' },
    { src: '~/plugins/bus.ts' },
    { src: '~/plugins/closable.ts' },
    { src: '~/plugins/snotify.ts', ssr: false },
    { src: '~/plugins/alert.ts', ssr: false },
    { src: '~/plugins/datepicker.ts', ssr: false },
    { src: '~/plugins/table.ts', ssr: false },
    { src: '~/plugins/filter/index.ts' },
    { src: '~/plugins/select.ts' },
    { src: '~/plugins/dataTable.ts' },
    { src: '~/plugins/utilities.ts' },
    { src: '~/plugins/select.ts' },
    { src: '~/plugins/tooltip.ts' },
    { src: '~/plugins/fontawesome.ts' },
    { src: '~/plugins/vue-editor.ts', mode: 'client' },
    { src: '~/plugins/vue-carousel.ts', mode: 'client' },
    { src: '~/plugins/vue-color.ts', ssr: false },
    { src: '~/plugins/vue-timeago.ts', ssr: false },
    { src: '~/plugins/api.ts' }
  ],
  modules: [ '@nuxtjs/axios', 'cookie-universal-nuxt' ],
  buildModules: [ '@nuxt/typescript-build' ],
  srcDir: 'src',
  router: {
    extendRoutes (routes): NuxtRouteConfig[] {
      return rewriteParentRoute(routes)

      function rewriteParentRoute (routes: NuxtRouteConfig[]): NuxtRouteConfig[] {
        const defaultRoutes = JSON.parse(JSON.stringify(routes))

        for (const route of defaultRoutes) {
          if (route.path.indexOf('/:lang') === 0 && route.name !== 'lang') {
            if (route.name) {
              route.name = route.name.replace('lang-', '')
            }
            route.path = route.path.replace('/:lang', '')

            if (route.children && route.children.length > 0) {
              route.children = rewriteChildRoute(route.children)
            }
          } else if (route.name === 'lang') {
            route.name = 'index'
            route.path = '/'
          }
        }

        return defaultRoutes.concat(routes)
      }

      function rewriteChildRoute (routes: NuxtRouteConfig[]): NuxtRouteConfig[] {
        const children = []
        for (const i in routes) {
          const route = JSON.parse(JSON.stringify(routes[i]))

          route.name = route.name.replace('lang-', 'default-')
          children.push(route)

          if (route.children && route.children.length > 0) {
            route.children = rewriteChildRoute(route.children)
          }
        }

        return children
      }
    }
  },
  build: {
    extractCSS: true,
    babel: {
      presets ({ isServer }, [ , options ]: [ string, any ]): void {
        options.targets = isServer
          ? { node: 'current' }
          : {
            browsers: pkg.browserslist
          }
        options.useBuiltIns = 'entry'
        options.corejs = { version: 3 }
      }
    },
    extend (config, context): void {
      if (context.isDev && context.isClient) {
        if (!config.module) config.module = { rules: [] }

        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }

      config.devtool = context.isClient ? 'source-map' : 'inline-source-map'
    },
    postcss: {
      // parser: 'sugarss',
      preset: {
        autoprefixer: {
          grid: true
        }
      },
      plugins: {
        'postcss-url': {},
        'postcss-mixins': {
          mixinsDir: path.join(__dirname, 'src', 'assets', 'sss', 'mixins')
        },
        'postcss-selector-not': {},
        'postcss-nested': {},
        'postcss-simple-vars': {},
        'postcss-easy-import': {
          extenstion: [ '.sss' ]
        },
        'postcss-assets': {},
        cssnano: {},
        autoprefixer: {
          grid: true
        },
        tailwindcss: {}

        // ...process.env.NODE_ENV === 'production' ? {
        //   '@fullhuman/postcss-purgecss': {
        //     content: [
        //       './src/**/*.html',
        //       './src/pages/**/*.vue',
        //       './src/layouts/**/*.vue',
        //       './src/components/**/*.vue',
        //       './node_modules/vuetable-2/src/**/*.vue',
        //       './node_modules/v-calendar/src/components/**/*.vue',
        //       './node_modules/vue-autosuggest/src/**/*.vue',
        //       './node_modules/vue-select/src/components/**/*.vue'
        //     ],
        //     whitelist: [ 'html', 'body' ],
        //     defaultExtractor: (content: string) => content.match(/[\w-/:]+(?<!:)/g) || []
        //   }
        // } : []
      }
    }
  }
}

export default config
