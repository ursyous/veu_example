<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { CreateElement } from 'vue'
import { radioItem } from '@/components/elements/RadioBtn/radioBtn.ts'

@Component
export default class RadioBtn extends Vue {
  @Prop() item!: radioItem
  @Prop() radioType! : String

  updateRadioItem () {
    this.$emit('input', this.item.value)
  }

  render (h: CreateElement) {
    return h(
      'div', {
        attrs: {
          class: [ 'radio', this.radioType ].join(' ')
        }
      },
      [
        h(
          'input', {
            attrs: {
              id: this.item.value,
              name: 'selector'
            },
            on: {
              click: () => {
                this.updateRadioItem()
              }
            }
          }
        ),
        h('label', { attrs: { for: this.item.value } }, this.item.text),
        h('div', { attrs: { class: 'check' } })
      ]
    )
  }
}
</script>
<style lang="postcss" scoped>
@import '../inputs.sss'
</style>
