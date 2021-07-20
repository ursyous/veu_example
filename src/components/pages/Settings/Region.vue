<template>
  <div class="region">
    <div class="region-header">
      <div class="region-header-item">
        <div class="section-title">
          {{ $t(title) }}
        </div>
      </div>
      <div class="region-header-item">
        <Nav
          v-if="editable && buttonTarget !== null"
          :target="buttonTarget"
          class="float-right"
        >
          {{ $t(buttonLabel) }}
        </Nav>
      </div>
    </div>
    <slot />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

/**
 * Region component
 * @author Carl Jeremy Omandam <carl@simplexi.com.ph>
 * @since 2019.10.03
 */
@Component
export default class Region extends Vue {
  /**
   * Region title property
   */
  @Prop({ type: String, default: null }) title?: string

  /**
   * Displays the edit button when set to true
   */
  @Prop({ type: Boolean, default: false }) editable?: boolean

  /**
   * Edit button label
   */
  @Prop({
    type: String,
    default: 'pages.settings.sections.accountSettings.buttonText'
  })
  buttonLabel?: string

  /**
   * Edit button target page
   */
  @Prop({
    type: String,
    default: null
  })
  buttonTarget?: string
}
</script>
