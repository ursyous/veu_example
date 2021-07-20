<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import Magnify from 'vue-material-design-icons/Magnify.vue'
import Header from './Header.vue'
import region from './Region.vue'
import info from './Info.vue'
import TemplateBuilder from '~/types/Classes/TemplateBuilder'
import Confirms from '~/types/Classes/Confirms'
import 'vue-select/dist/vue-select.css'

/**
 * Settings content component
 * Builds the settings page based on the data in a JSON template
 * @author Carl Jeremy Omandam <carl@simplexi.com.ph>
 * @author John Alene Pacheco <john12@simplexi.com.ph>
 * @since 2019.10.07
 */
@Component({
  components: { region, info, Header, Magnify }
})
export default class Content extends mixins(TemplateBuilder, Confirms) {
  eventHandlers: { [x: string]: Function } = {
    confirmSave: this.confirmSave,
    isModalShown: this.isModalShown,
    deleteSubUser: this.deleteSubUser,
    saveSubUser: this.saveSubUser,
    formatDate: this.formatDate
  }

  /**
   * Negates the value of the Modal state
   *
   * @returns void
   */
  isModalShown (): void {
    this.pageVars.isModalShown = !this.pageVars.isModalShown
  }

  /**
   * Filters datatable content based on date range
   * 
   * @param rows 
   * @param dates 
   * @returns Array<{[x: string]: any}>
   */
  filterByDate (rows: Array<{[x: string]: any}>, dates: {[x: string]: any}): Array<{[x: string]: any}> {
    this.formatDate(dates)
    if (!dates.from && !dates.to) {
      return rows
    }

    return rows.filter((elem: {[x: string]: any}): boolean => {
      const rowDate: Date = new Date(elem.date)
      const dateFrom: Date | null = !dates.from ? null : new Date(dates.from)
      const dateTo: Date | null = !dates.to ? null : new Date(dates.to) 

      if (dateFrom === null && dateTo) {
        return rowDate <= dateTo
      } else if (dateTo === null && dateFrom) {
        return rowDate >= dateFrom
      }

      return (dateFrom !== null && dateTo !== null) ? rowDate >= dateFrom && rowDate <= dateTo : true 
    })
  }

  /**
   * Filter table by selected user id
   * 
   * @param rows 
   * @param dates 
   * @returns Array<{[x: string]: any}>
   */
  filterByUserId (rows: Array<{[x: string]: any}>, userID: string): Array<{[x: string]: any}> {
    if (!userID) {
      return rows
    }

    return rows.filter((elem: {[x: string]: any}): boolean => {
      return elem.id === userID
    })
  }

  /**
   * Filter table based on selected column and search text
   * 
   * @param rows 
   * @param params 
   * @returns Array<{[x: string]: any}>
   */
  colSearch (rows: Array<{[x: string]: any}>, params: {[x: string]: any}): Array<{[x: string]: any}> {
    if (!params.searchText || !params.column) {
      return rows
    }

    return rows.filter((row: {[x: string]: any}): boolean => {
      const text: string = params.searchText.toLowerCase().trim()

      return row[params.column.value].toLowerCase().includes(text)
    })
  }
  
  /**
   * Formats date display
   * 
   * @param event
   * @returns void
   */
  formatDate (dates: {[x: string]: any}): void {
    for (const date in dates) {
      if (dates[date]) {
        const dateObj: Date = new Date(dates[date])
        const target: HTMLInputElement = this.$refs[`date-display-${date}`] as HTMLInputElement

        target.value = dateObj.getFullYear() + '/' + (dateObj.getMonth() + 1) + '/' + dateObj.getDate()
      }
    }
  }

  /**
   * Shows confirmation when deleting a sub user
   *
   * @returns void
   */
  async deleteSubUser (): Promise<void> {
    await this.confirmCancel(
      'pages.settings.sections.subUser.subSections.add.alerts.delete.title',
      'pages.settings.sections.subUser.subSections.add.alerts.delete.description'
    )
  }

  /**
   * Shows confirmation when saving a sub user
   *
   * @returns void
   */
  async saveSubUser (): Promise<void> {
    const res = await this.confirmSave()

    if (res) {
      this.isModalShown()
    }
  }
}

</script>
