<template>
  <div>
    <span class="font-bold text-2xl">{{ $t('pages.settings.title') }}</span>
    <!-- <span v-if="!showTooltip">
      <icon @click="showTooltip = true" class="cursor-pointer" icon="help" />
    </span>
    <div
      v-if="showTooltip"
      class="border-rounded bg-white inline absolute p-2 ml-2 w-1/4 h-40 min-w-xs z-50"
    >
      <img
        @click="showTooltip = false"
        class="float-right cursor-pointer"
        src="@/assets/images/icons/close.png"
        draggable="false"
      >
      <div class="row mb-2">
        <img class="inline mr-1" src="@/assets/images/icons/info.png">
        <div class="font-semibold text-sm inline">
          {{ $t('pages.settings.tooltip.title') }}
        </div>
      </div>
      <div class="ml-5">
        <ul class="text-sm list-disc">
          <li
            v-for="(value, index) in $t('pages.settings.tooltip.descriptions')"
            :key="index"
          >
            {{ value }}
          </li>
        </ul>
      </div>
    </div> -->
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

/**
 * Settings page header component
 */
@Component
export default class Header extends Vue {
  /**
   * Tooltip state
   */
  showTooltip: boolean = false
}
</script>
