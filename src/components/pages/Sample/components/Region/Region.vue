<template>
  <div class="flex flex-col mt-8 p-2 card w-full">
    <div class="row header w-full">
      <div class="w-1/2">
        <div class="section-title">
          {{ $t(title) }}
        </div>
      </div>
      <div class="w-1/2">
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
import Region from './index'
export default Region
</script>
