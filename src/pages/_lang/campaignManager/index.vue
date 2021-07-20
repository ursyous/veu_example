<template>
  <div>
    <campaignCreate />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import campaignCreate from '@/components/pages/CampaignCreate/CampaignCreate.vue'

@Component({
  components: {
    campaignCreate
  }
})
export default class CampaignCreatePage extends Vue {}
</script>

<style></style>
