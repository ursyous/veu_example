<template>
  <div class="image-upload">
    <img :src="src" class="display">
    <div class="action-buttons">
      <input
        :value="$t(editText)"
        @click="triggerFileUpload"
        type="button"
        class="edit-btn"
      >
      <input
        :value="$t(removeText)"
        @click="removeImage"
        type="button"
        class="remove-btn"
      >
      <input
        ref="upload"
        @change="emitChange"
        :name="name"
        type="file"
        class="file-upload"
        accept="image/x-png, image/gif, image/jpeg"
      >
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, mixins } from 'nuxt-property-decorator'
import Confirms from '~/types/Classes/Confirms'

/**
 * Image Upload component class
 * @author Carl Jeremy Omandam <carl@simplexi.com.ph>
 * @author Lowell Dave Agnir <lowell@simplexi.com.ph>
 * @since 2019.10.15
 * @updated 2019.12.03
 */
@Component
export default class ImageUpload extends mixins(Confirms) {
  /**
   * Default image
   */
  @Prop({ type: String, default: '/default-image.png' }) defaultSrc !: string

  /**
   * User selected image
   */
  selectedSrc: string | null = null

  /**
   * Has the element been cleared
   */
  cleared: boolean = false

  /**
   * Alert messages
   */
  readonly removeImageMessage: { title: string; description: string } = {
    title: 'elements.imageUpload.removeImage.title',
    description: ''
  }

  /**
   * File upload value
   */
  @Prop({ default: null }) readonly value!: File | string

  /**
   * Default image
   */
  @Prop({ type: String, default: '/basic-user.png' }) defaultImage!: string

  /**
   * Input name
   */
  @Prop({ type: String, default: '' }) readonly name!: string

  /**
   * Edit button text
   */
  @Prop({ type: String, default: '' }) readonly editText!: string

  /**
   * Remove button text
   */
  @Prop({ type: String, default: '' }) readonly removeText!: string

  /**
   * Returns the proper image source
   *
   * @returns string
   */
  get src (): string {
    if (this.value && !this.cleared && typeof this.value === 'string') {
      return this.value
    } else if (this.selectedSrc) {
      return this.selectedSrc
    }

    return this.defaultSrc
  }

  /**
   * Trigges the file upload element
   *
   * @returns void
   */
  triggerFileUpload (): void {
    ;(this.$refs.upload as HTMLInputElement).click()
  }

  /**
   * Emits event with the current content of the file upload element
   *
   * @returns void
   */
  async emitChange (): Promise<void> {
    const uploadElem: any = this.$refs.upload
    const image: File = uploadElem.files[0]

    if (image) {
      if ((await this.validateImage(image)) === true) {
        this.selectedSrc = await this.readImage(image)
        this.$emit('input', image)
      } else {
        this.$alert('Invalid image', 'error')
      }
    }
  }

  /**
   * Removes displayed image
   *
   * @returns Promise
   */
  async removeImage (): Promise<void> {
    const res: any = await this.confirmCancel(
      this.removeImageMessage.title,
      this.removeImageMessage.description
    )

    if (res === true) {
      this.cleared = true
      this.selectedSrc = null
      this.$emit('input', null)
    }
  }

  /**
   * Converts the image file into a base64 string
   *
   * @param file (File)
   * @returns {Promise<String>}
   */
  readImage (file: File): Promise<string> {
    return new Promise(function (resolve) {
      const reader: FileReader = new FileReader()
      reader.onload = function (oEvent: any): void {
        resolve(oEvent.target.result)
      }
      reader.readAsDataURL(file)
    })
  }

  /**
   * Validates if a file is png, gif, jpg, or jpeg
   *
   * @param oUpload (File)
   * @returns {Promise<any>}
   */
  validateImage (oUpload: File): Promise<boolean> {
    return new Promise(resolve => {
      const fileReader: FileReader = new FileReader()

      fileReader.onloadend = (event: Event): void => {
        const target: any = event.target
        if (target.readyState === FileReader.DONE) {
          const uint: Uint8Array = new Uint8Array(target.result)
          const aBytes: string[] = []

          uint.forEach((iByte: number) => {
            aBytes.push(iByte.toString(16))
          })

          const hex: string = aBytes.join('').toUpperCase()
          resolve(this.validateImageHex(hex))
        }
      }

      const blob: any = oUpload.slice(0, 4)
      fileReader.readAsArrayBuffer(blob)
    })
  }

  /**
   * Checks if file signature is of png, gif, jpg, or jpeg file
   *
   * @param sSignature (string)
   * @returns {boolean}
   */
  validateImageHex (sSignature: string): boolean {
    return (
      sSignature === '89504E47' ||
      sSignature === '47494638' ||
      sSignature.includes('FFD8FF')
    )
  }
}
</script>

<style lang="postcss" scoped>
@import './ImageUpload.sss';
</style>
