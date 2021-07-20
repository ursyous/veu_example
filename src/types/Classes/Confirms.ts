import Vue from 'vue'
import Component from 'vue-class-component'
import { MessageBoxData } from 'element-ui/types/message-box'

/**
 * Confirms Class
 * Used to show confirm message box
 * Note: You can declare a mixin as the same style as components.
 *
 * @author Carl Jeremy Omandam <carl@simplexi.com.ph>
 * @author John Alene Pacheco <john12@simplexi.com.ph>
 * @since 2019.10.16
 */
@Component
export default class Confirms extends Vue {
  /**
   * Binds the Vue instance to translation method
   */
  readonly $t: any = this.$t.bind(this)

  /**
   * Function that sets the font size/style of title of Alert Messages
   *
   * @param messageTitle
   * @returns string
   */
  setMessageTitle (messageTitle: string): string {
    return `<div class="text-2xl font-semibold">${messageTitle}</div>`
  }

  /**
   * Function that sets the font size/style of description of Alert Messages
   *
   * @param messageDescription
   * @returns string
   */
  setMessageDescription (messageDescription: string): string {
    return `<p>${messageDescription}</p>`
  }

  /**
   * Prompts user to confirm changes
   *
   * @returns {Promise<MessageBoxData>}
   */
  confirmSave (callBack: Function | null = null): Promise<MessageBoxData> {
    return this.$confirm(
      this.setMessageTitle(this.$t('pages.settings.alerts.save.title'))
    ).then(
      (result: MessageBoxData): MessageBoxData => {
        if (result) {
          (callBack === null) ?
            this.$alert(
              this.setMessageTitle(
                this.$t('pages.settings.alerts.success.saveEdit')
              ),
              'success'
            )
            : callBack()
        }
        return result as MessageBoxData
      }
    )
  }

  /**
   * Prompts user to confirm cancellation
   *
   * @param title
   * @param description
   * @returns {Promise<MessageBoxData>}
   */
  confirmCancel (title: string, description: string): Promise<MessageBoxData> {
    return this.$confirm(
      `${this.setMessageTitle(this.$t(title))}${this.setMessageDescription(
        this.$t(description)
      )}`,
      'warning'
    )
  }
}
