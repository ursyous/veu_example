<template>
  <div>
    <div v-if="editorType === 'INPUT_NUMBER'">
      <input v-model="inputNumber" type="text" class="inputNumber ml-2 lineHeight30">
    </div>
    <div v-else-if="editorType === 'NUMBER_RANGE'">
      <select v-model="selectedMin" @change="numberRangeChange()" class="border-rounded p-1">
        <option v-for="( item, i ) in getNumberArray" :key="i" :value="item">
          {{ item }}
        </option>
      </select> -
      <select v-model="selectedMax" @change="numberRangeChange()" class="border-rounded p-1">
        <option v-for="( item, i ) in getNumberArray" :key="i" :value="item" :disabled="optionDisabled(item)">
          {{ item }}
        </option>
      </select>
    </div>
    <div v-else-if="editorType === 'RADIO'">
      <Radio
        v-for="( item ) in variablesItem.filterVariableDetails"
        v-model="radioValue"
        :key="item.detailNo"
        :class="['radio', 'mr-3']"
        :label="item.stringLabel"
        :name="variablesItem.filterVariableName"
        :optionValue="item.stringValue"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class FilterInputNumber extends Vue {
  @Prop({ default: () => [] }) filterItem!: any
  @Prop({ default: () => [] }) variablesItem!: any
  @Prop({ type: String, default: '' }) editorType!: string

  selectedMin = this.filterItem.selectedOptionValue ? this.spiltValue(this.filterItem.selectedOptionValue, 0) : this.setDefaultValue(this.variablesItem.minValue)
  selectedMax = this.filterItem.selectedOptionValue ? this.spiltValue(this.filterItem.selectedOptionValue, 1) : this.setDefaultValue(this.variablesItem.minValue)

  get inputNumber () {
    if ( this.filterItem.numberValue ) {
      return this.filterItem.numberValue
    } else {
      this.filterItem.numberValue = this.variablesItem.minValue
      this.filterItem.stringLabel = this.variablesItem.minValue
      this.filterItem.variableDataType = this.variablesItem.variableDataType

      return this.variablesItem.minValue
    }
  }

  set inputNumber ( value ) {
    const replacedValue = value.replace(/[^0-9.]/g, '')
    this.filterItem.numberValue = replacedValue
    this.filterItem.stringLabel = replacedValue
    this.$emit('addSegments', this.filterItem)
  }

  get radioValue () {
    if ( this.filterItem.stringValue ) {
      return this.filterItem.stringValue
    } else {
      this.filterItem.detailNo = this.variablesItem.filterVariableDetails[0].detailNo
      this.filterItem.variableDataType = this.variablesItem.variableDataType
      this.filterItem.stringValue = this.variablesItem.filterVariableDetails[0].stringValue
      this.filterItem.stringLabel = this.variablesItem.filterVariableDetails[0].stringLabel
      this.$emit('addSegments', this.filterItem)

      return this.variablesItem.filterVariableDetails[0].stringValue
    }
  }

  set radioValue ( value ) {
    const tempItem = this.variablesItem.filterVariableDetails.filter((elem: any) => {
      return elem.stringValue === value
    })
    this.filterItem.detailNo = tempItem[0].detailNo
    this.filterItem.stringValue = tempItem[0].stringValue
    this.filterItem.stringLabel = tempItem[0].stringLabel
    this.$emit('addSegments', this.filterItem)
  }

  get getNumberArray (): Array<number> {
    return new Array( (this.variablesItem.maxValue - this.variablesItem.minValue) / this.variablesItem.incrementalValue + 1 ).fill(Number(this.variablesItem.minValue)).map( (n : number, i: number) => n + i * this.variablesItem.incrementalValue )
  }

  spiltValue ( optionValue: string, index: number ): number {
    const temp = optionValue.split('-').map(function ( item: any ) {
      return item.trim()
    })
    return temp[index]
  }
  
  setDefaultValue ( defaultValue: number ): number {
    this.filterItem.minNumberValue = this.variablesItem.minValue
    this.filterItem.maxNumberValue = this.variablesItem.minValue
    this.filterItem.variableDataType = this.variablesItem.variableDataType
    this.filterItem.stringLabel = this.variablesItem.minValue + ' - ' + this.variablesItem.minValue
    this.$emit('addSegments', this.filterItem)

    return defaultValue
  }

  numberRangeChange () {
    if ( this.selectedMin > this.selectedMax ) {
      this.selectedMax = this.selectedMin
    }
    this.filterItem.minNumberValue = this.selectedMin
    this.filterItem.maxNumberValue = this.selectedMax
    this.filterItem.stringLabel = this.selectedMin + ' - ' + this.selectedMax
    this.$emit('addSegments', this.filterItem)
  }

  optionDisabled ( item : number ) : boolean {
    return item < this.selectedMin
  }
}
</script>
