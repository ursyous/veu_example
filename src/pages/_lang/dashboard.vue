<template>
  <!-- {{ $t('guide.dashboard') }} -->
  <Dashboard />
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Dashboard from '@/components/pages/Dashboard/Dashboard.vue'

@Component({
  components: {
    Dashboard
  }
})
export default class DashboardPage extends Vue {}
</script>

<style></style>
