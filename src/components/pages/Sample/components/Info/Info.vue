<template>
  <div class="flex py-2 w-full">
    <div class="w-1/4">
      <div class="row-title font-semibold pr-3">
        {{ $t(title) }}
      </div>
    </div>
    <div class="w-3/4">
      <img
        v-if="info !== null && info.type === 'image'"
        :src="info.value"
        class="border-rounded h-20 w-20"
      >
      <span v-if="info !== null && info.type === 'text'">{{ $t(info.value) }}</span>
      <slot />
    </div>
  </div>
</template>
<script lang="ts">
import Info from './index'
export default Info
</script>
