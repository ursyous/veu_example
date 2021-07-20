<template>
  <div>
    <div class="flex p-1 rounded bg-gray-300">
      <Magnify class="icon-lg m-1" />
      <v-select
        v-model="selectVModel"
        :options="allOptions.map(item => ({ label : filter === 'Filter' ? item.filterName : item.segmentName, filterNo : filter === 'Filter' ? item.filterNo : item.segmentNo, variables : filter === 'Filter' ? item.filterVariables : '' }))"
        :placeholder="placeholder"
        class="w-full text-xs bg-transparent"
        dir="ltr"
      />
    </div>
    <span v-if="filter == 'Target'">
      <div v-for="(filterItem, index) in resultSegment.target" :key="index">
        <div class="flex justify-between	items-center border-1 border-black rounded mx-1 my-4 p-3">
          <div class="selectedCards">{{ filterItem.label }}</div>
          <Close @click="deleteSelectedSegments(filterItem.filterNo, filter)" class="icon-lg" />
        </div>
      </div>
      <span v-if="resultSegment.target.length <= 0">
        <div class="selectedFilters">
          <PlusIcon class="icon-lg" />
        </div>
      </span>
    </span>
    <span v-if="filter == 'Filter'">
      <div v-for="(filterItem, index) in resultSegment.filter" :key="index">
        <div class="border-1 border-black rounded mx-1 my-4 p-3">
          <div>
            <span class="selectedCards">{{ filterItem.label }}</span>
            <Close @click="deleteSelectedSegments(filterItem.filterNo, filter)" class="icon-lg float-right" />
          </div>
          <div>
            <span
              v-for=" ( item, idx ) in filterItem.variables "
              :key="idx"
            >
              <FilterType :editorType="item.editorType" :filterItem="filterItem" :variablesItem="item" @addSegments="addSegments" />
            </span>
          </div>
        </div>
        <div v-if="resultSegment.filter.length > 1 && index !== resultSegment.filter.length - 1" class="text-center">
          AND
        </div>
      </div>
      <span v-if="resultSegment.filter.length <= 0">
        <div class="selectedFilters">
          <PlusIcon class="icon-lg" />
        </div>
      </span>
    </span>
    <span v-if="filter == 'Recommendations'">
      <div v-for="(filterItem, index) in resultSegment.recommendations" :key="index">
        <div class="border-1 border-black rounded mx-1 my-4 p-3">
          <div>
            <span class="selectedCards">{{ filterItem.label }}</span>
            <Close @click="deleteSelectedSegments(filterItem.filterNo, filter)" class="icon-lg float-right" />
          </div>
        </div>
      </div>
      <span v-if="resultSegment.recommendations.length <= 0">
        <div class="selectedFilters">
          <PlusIcon class="icon-lg" />
        </div>
      </span>
    </span>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'nuxt-property-decorator'
import Magnify from 'vue-material-design-icons/Magnify.vue'
import PlusIcon from 'vue-material-design-icons/PlusCircleOutline.vue'
import Close from 'vue-material-design-icons/Close.vue'
import FilterType from '@/components/pages/Plan/FilterType.vue'


@Component({
  components: {
    Magnify,
    PlusIcon,
    Close,
    FilterType
  }
})
export default class SelectFilters extends Vue {
  @Prop({ type: String, default: null }) filter!: string
  @Prop({ default: () => [] }) allOptions!: Array<any>
  @Prop({ default: () => [] }) resultSegment!: Array<any>


  selectVModel: object | null = null

  get placeholder (): string {
    if (this.filter === 'Target') {
      return 'Choose Members'
    } else if (this.filter === 'Filter') {
      return 'Choose Filter'
    } else {
      return 'Choose Contents'
    }
  }

  @Watch('selectVModel')
  viewSelectSingle (selectVModel: object): void {
    if (selectVModel === null ) return
    this.addSegments(selectVModel, 'add')
  }

  addSegments (optionItem: any, type: string) {
    if (this.filter === 'Filter') {
      const resultFilterOption: any = this.resultSegment.filter
      const existOption = resultFilterOption.filter((elem: any) => {
        return elem.filterNo === optionItem.filterNo
      })
      if ( existOption.length > 0 && type === 'add' ) return
      const tempData = {
        itemNo: optionItem.filterNo,
        data: optionItem
      }
      this.$store.dispatch('plan/addFilterOptions', tempData)
      this.$bus.$emit('updateSegmentData')
    } else {
      this.$store.dispatch('plan/add' + this.filter + 'Options', optionItem )
      this.$bus.$emit('updateSegmentData')
    }
  }

  deleteSelectedSegments (selectedValue : string, filterName : string): void {
    if (filterName === 'Target' || filterName === 'Recommendations') {
      this.selectVModel = null
    }
    this.$store.dispatch('plan/remove' + filterName + 'Options', selectedValue)
  }
}
</script>
