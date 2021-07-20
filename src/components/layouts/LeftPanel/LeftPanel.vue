<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import ChartBarIcon from 'vue-material-design-icons/ChartBar.vue'
import AccountBoxMultipleIcon from 'vue-material-design-icons/AccountBoxMultiple.vue'
import WrenchIcon from 'vue-material-design-icons/Wrench.vue'
import History from 'vue-material-design-icons/History.vue'
import EmailIcon from 'vue-material-design-icons/Email.vue'
import MessageProcessingIcon from 'vue-material-design-icons/MessageProcessing.vue'
import StickerEmojiIcon from 'vue-material-design-icons/StickerEmoji.vue'
import SettingsIcon from 'vue-material-design-icons/Settings.vue'
import HelpCircleOutlineIcon from 'vue-material-design-icons/HelpCircleOutline.vue'
import TimetableIcon from 'vue-material-design-icons/Timetable.vue'
import FileChartIcon from 'vue-material-design-icons/FileChart.vue'
import BorderNoneIcon from 'vue-material-design-icons/BorderNone.vue'
import { CreateElement } from 'vue'
import LeftPanelTemplate from '~/static/templates/leftPanel.json'

@Component({
  components: {
    ChartBarIcon,
    AccountBoxMultipleIcon,
    WrenchIcon,
    EmailIcon,
    MessageProcessingIcon,
    StickerEmojiIcon,
    SettingsIcon,
    HelpCircleOutlineIcon,
    TimetableIcon,
    FileChartIcon,
    History,
    BorderNoneIcon
  }
})

/**
 * Left Side Nav
 * @author John Alene Pacheco <john12@simplexi.com.ph>
 * @since 2019.10.10
 */
export default class LeftPanel extends Vue {
  getIcon (h: CreateElement, iconName: string) {
    return h(
      iconName, {
        class: [
          'icon-lg'
        ]
      }
    )
  }

  /**
   * Rendered the Left Panel Navigation using a JSON Template
   */
  render (h: CreateElement) {
    const sideNavMenus = {
      top: {
        style: 'main-menu',
        items: []
      },
      bottom: {
        style: 'more-menu',
        items: []
      }
    }

    for (const menu of LeftPanelTemplate.menus) {
      const sideNavMenu = sideNavMenus[menu.position]
      const menuItem = h(
        'nuxt-link', {
          attrs: {
            to: this.$path(menu.link),
            tag: 'a'
          }
        },
        [
          h('div', {
            attrs: {
              class: [ sideNavMenu.style ]
            } }, [
            h('div', [ this.getIcon(h, menu.icon) ]),
            h('div', {
              attrs: {
                class: [ 'text-xs', 'whitespace-no-wrap' ].join(' ')
              } }, this.$t(menu.text) as string)
          ])
        ]
      )

      sideNavMenu.items.push(menuItem)
    }

    return h(
      'div', { attrs: { class: [ 'sidenav' ] } }, [
        h('div', sideNavMenus.top.items),
        h('div', sideNavMenus.bottom.items)
      ]
    )
  }
}
</script>

<style lang="postcss" scoped>
  @import './LeftPanel.sss'
</style>
