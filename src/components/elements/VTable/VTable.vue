<template>
  <div id="VTable">
    <div v-if="searcheable | pagination" class="row">
      <div v-if="searcheable" class="w-1/2">
        <input
          :placeholder="$t('elements.VTable.searchPlaceholder')"
          class="border-rounded p-1"
          type="search"
        >
      </div>
      <div v-if="pagination" class="w-1/2">
        <select class="border-rounded p-1 float-right">
          <option
            v-for="(value, index) in $t('elements.VTable.rowsPerPage')"
            :key="index"
            :value="10"
          >
            {{ value }}
          </option>
        </select>
      </div>
    </div>
    <div class="row">
      <div class="w-full">
        <client-only>
          <VueTable ref="vuetable" :api-mode="false" :fields="tableHeaders" :data="rows">
            <template slot="edit" slot-scope="props">
              <a
                @click="emitClick"
                href="#"
                class="text-blue-600 hover:underline"
              >{{ props.rowData.id }}</a>
            </template>
          </VueTable>
        </client-only>
      </div>
    </div>
    <div v-if="pagination" class="row">
      <div class="w-full">
        <div class="float-right">
          <button class="btn-primary font-semibold">
            1
          </button>
          <button>2</button>
          <span class="text-gray-600 font-semibold mx-2">...</span>
          <button>12</button>
          <button>&lt;</button>
          <button>&gt;</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

/**
 * Custom table component
 * @author Carl Jeremy Omandam <carl@simplexi.com.ph>
 * @since 2019.10.08
 */
@Component
export default class VTable extends Vue {
  /**
   * Binds the Vue instance to translation method
   */
  readonly $t: any = this.$t.bind(this)

  /**
   * Table columns
   */
  @Prop({ default: (): object => [] }) columns!: Array<any>

  /**
   * Mock Table Columns
   */
  @Prop({ default: (): object => ({}) }) rows!: Array<any>

  /**
   * Applies pagination when set to true
   */
  @Prop({ type: Boolean, default: false }) pagination!: boolean

  /**
   * Enables searching when set to true
   */
  @Prop({ type: Boolean, default: false }) searcheable!: boolean

  /**
   * Value property
   */
  @Prop({
    default: () => {
      return null
    }
  })
  value!: any

  /**
   * Returns the proper column headers based on the current language
   */
  get tableHeaders (): object[] | string {
    const headers: Array<any> = JSON.parse(JSON.stringify(this.columns))

    return headers.map((item: any, idx: number): object[] => {
      if (typeof item === 'object') {
        item.title = this.$root.$t(this.columns[idx].title)
      }

      return item
    })
  }

  /**
   * Emits click event
   */
  emitClick (): void {
    this.$emit('click', this.value)
  }
}
</script>
<style lang="postcss" scoped>
@import './VTable.sss';
</style>
