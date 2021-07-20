<template>
  <div class="page flex flex-row">
    <Content :template="sideBar" :data-source="sideBarData" />
    <Content :template="content" :data-source="contentData" />
  </div>
</template>

<script lang="ts">
import Settings from './index'
export default Settings
</script>

<style lang="postcss">
@import './Settings.sss';
</style>
