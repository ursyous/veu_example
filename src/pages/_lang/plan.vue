<template>
  <Plan />
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Plan from '@/components/pages/Plan/Plan.vue'

@Component({
  components: {
    Plan
  }
})
export default class PlanPage extends Vue {}
</script>
