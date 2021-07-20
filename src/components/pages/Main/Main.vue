<template>
  <div class="main-container">
    <div class="head-container">
      <div>
        <div><img src="~/assets/images/u104.jpg"></div>
        <h1 class="titles main">
          Welcome!
        </h1>
        <p class="formatText">
          {{ $t('pages.main.subtitle') }}
        </p>
      </div>
    </div>
    <div class="body-container">
      <div class="content-1">
        <h1 class="titles">
          TARGETING
        </h1>
        <div class="content-images-container">
          <img class="content-images" src="~/assets/images/u98.png">
        </div>
        <p class="formatText">
          {{ $t('pages.main.infomsgs.info1') }}
        </p>
      </div>
      <div class="content-2">
        <h1 class="titles">
          AUTOMATION
        </h1>
        <div class="content-images-container">
          <img class="content-images" src="~/assets/images/u92.png">
        </div>
        <p class="formatText">
          {{ $t('pages.main.infomsgs.info2') }}
        </p>
      </div>
      <div class="content-3">
        <h1 class="titles">
          MACHINE LEARNING
        </h1>
        <div class="content-images-container">
          <img class="content-images" src="~/assets/images/u86.png">
        </div>
        <p class="formatText">
          {{ $t('pages.main.infomsgs.info3') }}
        </p>
      </div>
    </div>
    <div class="foot-container">
      <div class="foot-content-container">
        <p class="formatText">
          {{ $t('pages.main.actionmsg') }}
        </p>
        <div>
          <Button :class="['btn-solid-primary']" @click="getLogin">
            {{ $t('pages.main.actionbtn') }}
          </Button>
        </div>
      </div>
    </div>
    <Modal :class="{ hidden: modalState }">
      <div slot="modal-header" class="flex justify-between w-full">
        <div v-if="!containerState">
          {{ $t('pages.main.modal.title1') }}
        </div>
        <div v-if="containerState">
          {{ $t('pages.main.modal.title2') }}
        </div>
        <font-awesome-icon @click="modalState = true" class="float-right cursor-pointer" icon="times" size="lg" />
      </div>
      <div slot="modal-content" :class="[{ hidden: containerState }, 'flex flex-col justify-between']">
        <TextArea :value="$t('pages.main.modal.termsofservice')" class="h-48" />
        <TextArea :value="$t('pages.main.modal.privacypolicy')" class="h-48" />
      </div>
      <div slot="modal-content" :class="[{ hidden: !containerState }, 'flex flex-col justify-start mb-64']">
        <h4 class="py-2">
          {{ $t('pages.main.modal.connectedMallsInfo') }}
        </h4>
        <h4 class="py-2">
          [MALL_NAME]
        </h4>
        <h4 class="py-2">
          {{ $t('pages.main.modal.categoryInfo') }}
        </h4>
        <div class="flex flex-row w-full">
          <v-select
            v-model="primarySelection1"
            :options="$t('pages.main.modal.category1')"
            :clearable="true"
            class="text-sm w-1/2 mx-2"
          />
          <v-select
            v-model="primarySelection2"
            :options="$t('pages.main.modal.category2')"
            :clearable="true"
            class="text-sm w-1/2 mx-2"
          />
        </div>
      </div>
      <div slot="modal-footer" :class="[{ hidden: containerState }, 'w-full flex justify-end']">
        <Button @click="modalState = true" class="btn-solid-tertiary modal">
          {{ $t('pages.main.modal.buttonSets.set1.btnCancel') }}
        </Button>
        <Button @click="containerState = true" class="btn-solid-primary modal">
          {{ $t('pages.main.modal.buttonSets.set1.btnAgree') }}
        </Button>
      </div>

      <div slot="modal-footer" :class="[{ hidden: !containerState }, 'w-full flex justify-end']">
        <Button @click="containerState = false" class="btn-solid-tertiary modal">
          {{ $t('pages.main.modal.buttonSets.set2.btnBack') }}
        </Button>
        <Button @click="$router.push('/dashboard')" class="btn-solid-primary modal">
          {{ $t('pages.main.modal.buttonSets.set2.btnStart') }}
        </Button>
      </div>
    </Modal>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import 'vue-select/dist/vue-select.css'

/**
 * Main Page
 * @author Angelito Diwata <angelito@simplexi.com.ph>
 * @since 2019.12.03
 */
@Component({
  layout: 'main'
})
export default class Main extends Vue {
  /**
   *  Determines if the modal is visible
   */
  modalState: boolean = true

  /**
   *  Determines which body container of the modal is visible
   */
  containerState: boolean = false

  /**
   * Determines the primary selection for v-select1
   */
  primarySelection1: string = ''

  /**
   * Determines the primary selection for v-select2
   */
  primarySelection2: string = ''

  /**
   * Checks and validates if values in state are valid for login
   * @returns boolean
   */
  getLogin (): void {
    if (this.$store.getters['auth/getLoginLocale'] === '') {
      this.$router.push('/login')
    } else {
      this.modalState = false
    }
  }
}
</script>

<style lang="postcss" scoped>
@import './Main.sss';
</style>
