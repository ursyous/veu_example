<template>
  <div class="relative h-full w-full">
    <div class="flex justify-end w-full py-2">
      <div v-show="pagination && selectRowCount" class="w-full">
        <select
          ref="rowNum"
          @change="actionDispatch('pageSize')"
          v-model="pageSizeVal"
          class="border-rounded p-1 float-left"
        >
          <option
            v-for="(value, index) in pageSizes"
            :key="index"
            :value="value"
          >
            {{ value + ' rows per page' }}
          </option>
        </select>
      </div>

      <div
        v-show="allowSearch === true"
        class="input-container lg:w-2/5 xl:w-1/4 lg:h-10 xl:h-12"
      >
        <div
          @click="actionDispatch('filter')"
          class="flex items-center w justify-center focus:outline-none float-right h-full w-1/5 border-r rounded-l-lg cursor-pointer lg:p-2 xl:p-3 hover:bg-gray-200"
        >
          <font-awesome-icon icon="search" size="lg" />
        </div>
        <div @keypress.13="actionDispatch('filter')">
          <el-autocomplete
            ref="searchInput"
            v-model="searchObject.value"
            :fetch-suggestions="!enableAutoComplete ? () => null : autoSearch"
            :trigger-on-focus="false"
            :value-key="autoSearchColumn ? autoSearchColumn.split('.')[0] : null"
            @select="checkSearchInput"
            :popper-class="!enableAutoComplete ? 'hidden' : ''"
            :placeholder="$t('elements.VTable.searchPlaceholder')"
            class="inline-input"
          >
            <template slot-scope="scope">
              <p class="truncate">
                {{ scope.item }}
              </p>
            </template>
          </el-autocomplete>
        </div>
        <Button
          @click="clearSearch"
          class="focus:outline-none float-right h-1/16 w-1/16 rounded-r-lg p-auto border-none outline-none"
        >
          <font-awesome-icon icon="times" size="xs" />
        </Button>
      </div>
    </div>

    <div class="relative h-auto w-full">
      <el-table
        :class="['el-table', 'shadow']"
        :data="displayData"
        :fit="true"
        :height="tableHeight"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        :header-cell-class-name="({column}) => { return getColumnHeaderClass(column.property) }"
        :row-key="rowKey"
        @sort-change="tableSortFunction"
        empty-text="   "
        border
        style="width: 100%; min-height: 300px"
        default-expand-all
      >
        <el-table-column
          v-if="rowCheck"
          class-name="select-column"
          type="selection"
        />
        <el-table-column
          v-for="(row, idx) in columnDefinition"
          :key="idx"
          :prop="row.src"
          :label="row.label"
          :sort-orders="[null]"
          :cell-class="row.cellClass || null"
          :sortable="(sortable && sortColumns.includes(row.src)) || (sortable && sortColumns.length === 0)"
          :width="row.width || 'auto'"
          align="center"
        >
          <template slot-scope="scope" class="text-center">
            <slot :data="scope.row[row.src]" :name="row.src">
              {{ scope.row[row.src] }}
            </slot>
          </template>
        </el-table-column>
      </el-table>

      <div
        v-if="errorResponse !== null || displayData.length === 0"
        class="loadingLayer"
      >
        <div v-if="errorResponse !== null" class="loadingLayerChild">
          <font-awesome-icon icon="exclamation-triangle" size="6x" />
          <br>
          <span class="tableMessage">{{ errorResponse }}</span>

          <h3
            @click="requestToApi(apiLink)"
            class="text-blue-500 hover:underline cursor-pointer"
          >
            retry again?
          </h3>
        </div>

        <div v-if="errorResponse === null && displayData.length === 0" class="loadingLayerChild">
          <font-awesome-icon icon="exclamation-circle" size="6x" />
          <span class="tableMessage">{{ emptyMessage }}</span>
          <br>
        </div>
      </div>

      <div
        v-if="loading === true && errorResponse === null"
        :class="['loadingLayer']"
      >
        <div :class="['loadingLayerChild']">
          <font-awesome-icon icon="spinner" size="6x" pulse />
          <br>
          <h1>{{ loadingMessage }}</h1>
        </div>
      </div>
    </div>
    <div class="flex justify-end">
      <el-pagination
        ref="pagination"
        v-if="pagination === true"
        @current-change="changePage"
        :page-size="pageSizeVal"
        :pager-count="5"
        :current-page="currentPageNumber"
        :total="totalRowCount"
        :page-count="pages"
        class="py-2"
        background
        layout="prev, pager, next"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'

/**
 * DataTable component class
 * @author Angelito Diwata <angelito@simplexi.com.ph>
 * @author Lowell Dave Agnir <lowell@simplexi.com.ph>
 * @author Carl Jeremy Omandam <carl@simplexi.com.ph>
 * @since 2019.11.07
 */
@Component
export default class DataTable extends Vue {
  /**
   * enables nested object column search
   */
  @Prop({ type: Boolean, default: false }) nestedSearch!: boolean

  /**
   * holds the local data to be used in this component
   */
  @Prop({ default: () => [ { empty: '' } ] }) tableData!: Array<{
    [key: string]: any
  }>

  /**
   * holds the API link of this component
   */
  @Prop({ type: String, default: null }) apiLink!: string

  /**
   * String that points to the table data in the api response
   */
  @Prop({ type: String, default: null }) apiTableDataPointer!: string

  /**
   * Loading meesage that will appear when loading
   */
  @Prop({ type: String, default: 'Loading, Please wait...' })
  loadingMessage!: string

  /**
   * Loading meesage that will appear when loading
   */
  @Prop({ type: String, default: 'Nothing to show.' })
  emptyMessage!: string

  /**
   * Determines the request method
   */
  @Prop({ type: String, default: 'GET' })
  requestMethod!: string

  /**
   * Determines the target suggestion column in autosearch
   */
  @Prop({ type: String, default: null })
  autoSearchColumn!: string

  /**
   * Holds the column alias names that will be displayed
   */
  @Prop({ type: Array, default: () => [] }) columnDefinition!: Array<{
    src: string,
    label: string
  }>

  /**
   * Holds the column where search will be conducted
   */
  @Prop({ type: Array, default: null }) searchColumn!: Array<string>

  /**
   * Holds the column where sorting will be allowed
   */
  @Prop({ type: Array, default: () => [] }) sortColumns!: Array<string>

  /**
   * Holds the options for row number in pagination
   */
  @Prop({ type: Array, default: () => [ 10, 20, 30, 40, 50 ] }) pageSizes!: Array<number>

  /**
   * sets if the columns can be locally sorted.
   */
  @Prop({ type: Boolean, default: false }) sortable!: boolean

  /**
   * determines if this component will do server side functioning.
   */
  @Prop({ type: Boolean, default: false }) serverSideProcessing!: boolean

  /**
   * determines if search box and button should be used.
   */
  @Prop({ type: Boolean, default: false }) allowSearch!: boolean

  /**
   * holds the tableHeight of this component
   */
  @Prop({ type: Number, default: null }) tableHeight!: number

  /**
   * enables/diables pagination for the dataTable component
   */
  @Prop({ type: Boolean, default: false }) pagination!: boolean

  /**
   * enables/diables selection of row count for the dataTable component
   */
  @Prop({ type: Boolean, default: false }) selectRowCount!: boolean

  /**
   * enables/diables autocomplete feature of searchbox
   */
  @Prop({ type: Boolean, default: false }) autoComplete!: boolean

  /**
   * Holds advance filter values
   */
  @Prop({ type: Object, default: () => ({}) }) advancedFilter!: {
    [key: string]: any
  }

  /**
   * Filter function for local filtering
   */
  @Prop({ type: Object, default: () => ({}) }) advancedFilterFunction!: {
    [key: string]: Function
  }

  /**
   * Determines if checkbox column should be displayed
   */
  @Prop({ type: Boolean, default: false }) rowCheck!: boolean

  /**
   * Used for nested rows
   */
  @Prop({ type: String, default: null }) rowKey!:string

  /**
   * holds the sorting order sequence of the table
   */
  @Prop({ default: () => [ 'asc', 'desc', null ] }) sortOrder!: Array<any>

  /**
   * Function that formats the request body before the API call
   */
  @Prop({ type: Function, default: () => (reqBody: any) => (reqBody) }) requestBodyFormatter!: Function
  /**
   * Formats the API response
   */
  @Prop({ type: Function, default: () => (resBody: any) => (resBody) }) responseBodyFormatter!: Function

  /**
   * Selected page size
   */
  pageSizeVal: number = this.pageSizes[0]

  /**
   * Deep copy of tableData property
   */
  tableDataCopy: Array<{
    [key: string]: any
  }> = JSON.parse(JSON.stringify(this.tableData))

  /**
   * holds the data to be displayed in the table
   */
  displayData: Array<{ [key: string]: any }> = []

  /**
   * utilities holder
   */
  $utilities: any

  /**
   * holds the current page number of the user
   */
  currentPageNumber: number = 1

  /**
   * holds the current page count
   */
  totalRowCount: number = 1

  /**
   * determines the state if currently in progress
   */
  loading: boolean = false

  /**
   * holds the error messages from the response
   */
  errorResponse: any = null

  /**
   * holds the searchObject value to be passed in the server
   */
  searchObject: { columns: Array<string>; value: string } = {
    columns: this.searchColumn,
    value: ''
  }

  /**
   * holds the sortObject value to be passed in the server
   */
  sortObject: { column: string; sortType: string } = {
    column: '',
    sortType: this.sortOrder[0]
  }

  /**
   * Returns true if auto complete is enabled
   */
  get enableAutoComplete (): boolean {
    return (this.autoSearchColumn && this.autoComplete) as boolean
  }

  /**
   * gets the number of offset by multiplying the max rows to -1 of current page
   * @returns number
   */
  get offset (): number {
    return (this.currentPage - 1) * this.pageSizeVal
  }

  /**
   * gets the number of pages by dividing total Rows by max Rows
   * @returns number
   */
  get pages (): number {
    return Math.ceil(this.totalRowCount / this.pageSizeVal)
  }

  /**
   * Returns current displayed page
   */
  get currentPage (): number {
    if (this.currentPageNumber > this.pages) {
      this.currentPageNumber = this.pages || 1
    }

    return this.currentPageNumber
  }

  /**
   * Filters datatable when value of advancedFilter property changes
   */
  @Watch('advancedFilter', { deep: true })
  filterTable (): void {
    if (this.serverSideProcessing) {
      this.requestToApi()
    } else {
      this.doFilter()
    }
  }

  /**
   * loads the initial data in SSR
   */
  mounted (): void {
    if (this.serverSideProcessing === true) {
      this.requestToApi()
    } else if (this.apiLink) {
      this.tableDataCopy = JSON.parse(JSON.stringify(this.apiLink))
    } else {
      this.displayTableData()
    }
  }

  /**
   * Returns the assembled requestBody to be sent in the server
   */
  getRequestBody (): { [key: string]: any } {
    const defaultRequestBody: {[key: string]: any} = {
      page: this.currentPage,
      limit: this.pageSizeVal,
      offset: this.offset,
      searchable: this.searchObject,
      advanceFilters: this.advancedFilter,
      sortObject: this.sortObject
    }

    return this.requestBodyFormatter(defaultRequestBody)
  }

  /**
   * Performs the requested action
   */
  actionDispatch (action: string): void {
    if (this.serverSideProcessing) {
      this.requestToApi()
    } else {
      switch (action) {
      case 'filter':
        this.doFilter()
        break
      case 'pageSize':
      case 'page':
        this.displayTableData()
        break
      }
    }
  }

  /**
   * Page change handler
   */
  changePage (page: number): void {
    this.currentPageNumber = page
    this.actionDispatch('page')
  }

  /**
   * requests to API using the API Link and requestBody
   */
  async requestToApi (): Promise<void> {
    this.loading = true
    const requestOptions: {[key: string]: any} = {
      method: this.requestMethod,
      url: this.apiLink
    }

    if (this.requestMethod.toLowerCase() === 'get') {
      requestOptions.params = this.getRequestBody()
    } else {
      requestOptions.data = this.getRequestBody()
    }

    await this.$axios(requestOptions).then(this.processResponse,
      (errorRes: { [key: string]: any }) => {
        this.loading = false
        this.errorResponse = errorRes
      }
    )
  }

  /**
   * Processes response data
   */
  processResponse (response: {[key: string]: any}) {
    const formatted: {[key: string]: any} = this.responseBodyFormatter(response.data)
    this.displayData = formatted.rows
    this.totalRowCount = formatted.total
    this.errorResponse = null
    this.loading = false
  }

  /**
   * assembles the response into DataTable Readable format
   */
  displayTableData (): void {
    this.totalRowCount = this.tableDataCopy.length
    this.displayData = this.tableDataCopy.slice(this.offset, (this.pageSizeVal * this.currentPage))
  }

  /**
   * Checks if the SSR function is enabled before sorting
   */
  tableSortFunction (column: any): void {
    this.assignSortMethod(column.prop)

    if (this.serverSideProcessing) {
      this.requestToApi()
    } else {
      this.localSort( column.prop)
    }
  }

  /**
   * sets the display data according to the sorted value
   */
  localSort (column: string): void {
    this.tableDataCopy.sort((objA: any, objB: any) => {
      return this.localObjectSorter(objA, objB, column)
    })
    this.displayTableData()
  }

  /**
   * sorts the locally given array according to the sort columns
   * @returns number
   */
  localObjectSorter (
    objectA: { [key: string]: any },
    objectB: { [key: string]: any },
    column: string
  ): number {
    const substanceA: { [key: string]: any } = objectA[column].toUpperCase()
    const substanceB: { [key: string]: any } = objectB[column].toUpperCase()
    let resultValue = 0
    if (substanceA > substanceB) {
      resultValue = 1
    } else if (substanceA < substanceB) {
      resultValue = -1
    }

    return this.sortObject.sortType === 'desc' ? resultValue * -1 : resultValue
  }

  /**
   * fills out the sortObject in the request body
   */
  assignSortMethod (column: string): void {
    if (this.sortObject.column !== column) {
      this.sortObject.sortType = this.sortOrder[0]
    } else {
      const nextSortDirection: string | null = this.sortOrder[this.sortOrder.indexOf(this.sortObject.sortType) + 1]
      this.sortObject.sortType = nextSortDirection !== undefined ? nextSortDirection : this.sortOrder[0]
    }

    this.sortObject.column = column
  }

  /**
   * filters the data according to filter object and input value
   */
  doFilter (): void {
    let result: Array<{ [key: string]: any }> = this.defaultSearch()
    const fns: Array<string> = Object.keys(this.advancedFilterFunction)

    fns.forEach((fn: string): void => {
      result = this.advancedFilterFunction[fn](
        result,
        this.advancedFilter[fn]
      )
    })

    this.tableDataCopy = result
    this.displayTableData()
  }

  /**
   * Default search function
   */
  defaultSearch (): Array<{ [key: string]: any }> {
    const needle: string =
      this.advancedFilter.search ||
      (this.searchObject.value).trim()
    const hayStack: Array<{ [key: string]: any }> = JSON.parse(JSON.stringify(this.tableData))
    if (needle === '') {
      return hayStack
    }

    return hayStack.filter(
      (row: { [key: string]: any } | Array<{ [key: string]: any }>): any => {
        const cols: Array<string> = this.searchColumn || this.columnDefinition.map(item => item.src)
        for (const key in cols) {
          const val: string = this.$utilities.getTargetVariable(cols[key], row)

          if (val && typeof val === 'string' && val.toLowerCase().includes(needle.toLowerCase())) {
            return true
          }
        }
      }
    )
  }

  /**
   * Get suggestions for auto complete element
   */
  autoSearch (queryString : string, callBack : any) : void {
    if (this.serverSideProcessing) {
      callBack([])
      return
    }

    let results : Array<string> = this.tableData.map((item: any) => this.$utilities.getTargetVariable(this.autoSearchColumn, item))
    queryString = queryString.trim().toLowerCase()

    if (queryString) {
      results = this.$utilities.getDistinct(results.filter(item => {
        const rowValue: string = item.trim().toLowerCase()
        return rowValue.includes(queryString)
      }))
    }

    callBack(results)
  }

  /**
   * set Search Input value upon click on suggestion
   *
   * @param value string | object
   */
  checkSearchInput (value : string | { [key: string]: any }) : void {
    let newValue : string = ''
    if ( typeof value === 'object' ) {
      newValue = this.$utilities.getTargetVariable(this.autoSearchColumn, value)
    } else {
      newValue = value
    }
    this.searchObject.value = newValue
    this.doFilter()
  }

  /**
   * Sets sort column's header class
   */
  getColumnHeaderClass (colName: string): string | void {
    if (colName === this.sortObject.column) {
      if (this.sortObject.sortType !== null) {
        return this.sortObject.sortType === 'asc' ? 'ascending' : 'descending'
      }

      return ''
    }
  }

  /**
   * Resets table
   */
  clearSearch (): void {
    this.searchObject.value = ''
    this.actionDispatch('filter')
  }
}
</script>

<style lang="postcss">
@import './DataTable.sss';
</style>
