<template>
  <div>
    <div class="text-2xl">
      <LoginPage />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import LoginPage from '@/components/pages/Login/Login.vue'

@Component({
  layout: 'main',
  components: 
  {
    LoginPage
  }
})
export default class Login extends Vue {}
</script>
