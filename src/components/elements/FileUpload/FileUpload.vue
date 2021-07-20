<template>
  <label :name="name" :class="[{'disabled': disabled}, 'file-upload', 'text-center', color]">
    <span>{{ $t(label) }}</span>
    <input :disabled="disabled" :accept="accept" @input="emitInput($event.target.value)" type="file" class="hidden">
  </label>
</template>

<script lang="ts">
import { Component, Prop } from 'nuxt-property-decorator'
import InputComponent from '@/types/Classes/InputComponent'

/**
 * File upload component class
 * @author Carl Jeremy Omandam <carl@simplexi.com.ph>
 * @author John Alene Pacheco <john12@simplexi.com.ph>
 * @since 2019.09.27
 */
@Component
export default class FileUpload extends InputComponent {
  /**
   * Value property implementation
   */
  @Prop({ default: () => null }) value!: any

  /**
   * File type accept property implementation
   */
  @Prop({ default: () => null }) accept!: any
}
</script>

<style lang="postcss" scoped>
@import './FileUpload.sss';
</style>
