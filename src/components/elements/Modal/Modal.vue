<template>
  <div id="modal" :class="[...appliedClasses]">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <slot name="modal-header" class="modal-header">
            {{ $t(header) }}
          </slot>
          <slot name="modal-content" class="modal-content" />
          <slot name="modal-footer" class="modal-footer">
            {{ $t(footer) }}
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'nuxt-property-decorator'
import DynamicClasses from '~/types/Classes/DynamicClasses'

/**
 * Custom modal component
 * @author John Alene Pacheco <john12@simplexi.com.ph>
 * @author Lowell Dave Agnir <lowell@simplexi.com.ph>
 * @since 2019.10.18
 * @updated 2019.11.15
 */
@Component
export default class Modal extends DynamicClasses {
  /**
   * Modal header text
   */
  @Prop({ type: String, default: null }) header?: string

  /**
   * Modall footer text
   */
  @Prop({ type: String, default: null }) footer?: string
}
</script>

<style lang="postcss" scoped>
@import './Modal.sss';
</style>
