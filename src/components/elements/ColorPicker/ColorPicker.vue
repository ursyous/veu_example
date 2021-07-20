<template>
  <div>
    <span v-closable="{ handler: 'closePicker' }" class="color-picker-container">
      <input
        ref="colorInput"
        :value="hexColor"
        @focus="displayPicker = true"
        @change="onValueChange"
        placeholder="Ex.) #000000"
        class="color-picker-input focus:outline-none"
        type="text"
        title="Color Picker"
      >
      <span class="flex relative cursor-pointer">
        <span
          :style="'background-color: ' + hexColor"
          @click="displayPicker = !displayPicker"
          class="current-color"
        />
        <client-only>
          <vue-color-chrome v-show="displayPicker" v-model="colorHex" class="color-picker" />
        </client-only>
      </span>
    </span>
  </div>
</template>
<script lang="ts">
import { Prop, Component, Watch } from 'nuxt-property-decorator'
import InputComponent from '@/types/Classes/InputComponent'

/**
 * ColorPicker component class
 * @author Lowell Dave Agnir <lowell@simplexi.com.ph>
 * @since 2019.11.21
 */
@Component
export default class ColorPicker extends InputComponent {
  /**
   * v-model prop value property
  */
  @Prop({ type: String, default: '#000000' }) value !: string
  
  /**
   * vue-color v-model property
  */
  colorHex : { [key: string] : any } = { hex: '' }

  /**
   * vue-color display trigger property
  */
  displayPicker : boolean = false

  /**
   * hexColor
   * @return string
  */
  get hexColor () : string {
    const hex : string = !this.colorHex.hex ? '#000000' : this.colorHex.hex
    this.emitInput(hex)
    return hex
  }

  /**
   * onValueChange
   * @param event object | string
   * @return void
  */
  @Watch('value')
  onValueChange (event : { [key: string] : any } | string) : void {
    if (typeof event === 'object') {
      this.colorHex = { hex: event.target.value }
    } else if (typeof event === 'string') {
      this.colorHex = { hex: event }
    }
  }

  /**
   * closePicker
   * sets displayPicker to false
   * @return void
  */
  closePicker () : void {
    this.displayPicker = false
  }
}
</script>

<style lang="postcss">
  @import './ColorPicker.sss'
</style>
