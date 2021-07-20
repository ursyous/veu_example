<script lang="ts">
import { Component, Vue, Prop, Model } from 'nuxt-property-decorator'
import ArrowDownIcon from 'vue-material-design-icons/ArrowDown.vue'
import ArrowUpIcon from 'vue-material-design-icons/ArrowUp.vue'
import { CreateElement, VNode } from 'vue'
import { DropdownItem } from './dropdown'

@Component({
  name: 'drop-down',
  components: {
    ArrowDownIcon,
    ArrowUpIcon
  }
})
export default class Dropdown extends Vue {
  @Model() selected!: string

  @Prop({ default: [] }) readonly items!: Array<DropdownItem>

  @Prop({ default: '' }) readonly placeholder!: string

  private selectedText: string = ''

  private isActive = false

  toggleSelect (): void {
    this.isActive = !this.isActive
  }

  itemNode (h: CreateElement, item: DropdownItem): VNode {
    return h('div', {
      attrs: {
        class: [ 'item-node' ]
      },
      on: {
        click: () => {
          this.selectItem(item)
        }
      }
    }, item.text)
  }

  selectItem (item: DropdownItem): void {
    this.selectedText = item.text

    if ( this.selected !== item.value ) this.$emit('selected', item.value)
  }

  closeDropdown (): void {
    this.isActive = false
  }

  render (h: CreateElement): VNode | undefined {
    const itemWrapperClass = [ 'item-wrapper' ]

    const upIcon = h('ArrowUpIcon')
    const downIcon = h('ArrowDownIcon')

    const key = this.items.findIndex((item: DropdownItem) => {
      return item.value === this.selected
    })
    if (this.items[key] === undefined) {
      return undefined
    }
    this.selectedText = this.items[key].text

    if ( !this.isActive ) itemWrapperClass.push('hidden')

    return h('div',
      {
        class: [ 'dropdown' ],
        attrs: {
          tabindex: 0
        },
        on: {
          click: this.toggleSelect
        }
      },
      [
        h('div', {
          class: [ 'select-node' ],
          ref: 'select-node'
        }, [
          h('div', { attrs: { class: 'flex' } }, [
            h('div', { attrs: { class: 'flex-grow' } }, this.selectedText || this.placeholder),
            h('div', { attrs: { class: 'ml-2' } }, [
              this.isActive ? upIcon : downIcon
            ])
          ])
        ]),
        h('div', {
          attrs: {
            class: itemWrapperClass.join(' ')
          },
          directives: [
            {
              name: 'closable',
              value: {
                handler: 'closeDropdown',
                exclude: [ 'select-node' ]
              }
            }
          ]
        }, [
          ...this.items.map(item => this.itemNode(h, item))
        ])
      ]
    )
  }
}
</script>

<style lang="postcss" scoped>
@import './dropdown.sss'
</style>
