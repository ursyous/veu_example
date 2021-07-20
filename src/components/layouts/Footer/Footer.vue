<template>
  <div class="footer opacity-50">
    <span class="font-semibold text-white mr-3 text-gray-600">{{ $t('layouts.footer.copyright') }}</span>
    <a href="#"><span class="text-xs text-blue-600">{{ $t('layouts.footer.terms') }}</span></a>
    <span> - </span>
    <a href="#"><span class="text-xs text-blue-600">{{ $t('layouts.footer.privacy') }}</span></a>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class Footer extends Vue {}
</script>


<style lang="postcss" scoped>
@import './Footer.sss';
</style>
