<template>
  <div class="main-container">
    <div class="login-container">
      <h1 class="login-title">
        {{ $t('pages.login.title') }}
      </h1>
      <p v-if="!$store.getters['auth/getConnectionState']" class="sub-texts">
        {{ $t('pages.login.subtitle1') }}
      </p>
      <p v-else class="sub-texts">
        {{ $t('pages.login.subtitle2') }}
      </p>
      <Textbox v-model="username" label="ID" class="py-5" name="lastName" />
      <Textbox v-model="password" :masked="true" :label=" $t('pages.login.passwordplaceholder')" class="py-5" name="lastName" />
      <Button @click="getLogin" class="btn-solid-primary text-lg rounded-lg p-2 my-5">
        {{ $t('pages.login.loginbtn') }}
      </Button>
      <a
        class="sub-texts hover:underline"
        href="https://user.cafe24.com/user/echosting/idsearch/"
      >{{ $t('pages.login.forgotpassword') }}</a>
    </div>
    <Modal :class="{ hidden: modalState }">
      <div slot="modal-header" class="flex justify-between w-full">
        <div v-if="loginOption !== 'storeSelect'">
          <div v-if="!containerState">
            {{ $t('pages.main.modal.title1') }}
          </div>
          <div v-else>
            {{ $t('pages.main.modal.title2') }}
          </div>
        </div>
        <div v-if="loginOption === 'storeSelect'">
          {{ $t('pages.login.modal.title') }}
        </div>
        <font-awesome-icon @click="modalState = true" class="float-right cursor-pointer" icon="times" size="lg" />
      </div>
      <div v-if="loginOption !== 'storeSelect'">
        <div slot="modal-content" :class="[{ hidden: containerState }, 'flex flex-col justify-between']">
          <TextArea :value="$t('pages.main.modal.termsofservice')" class="h-48" />
          <TextArea :value="$t('pages.main.modal.privacypolicy')" class="h-48" />
        </div>
        <div slot="modal-content" :class="[{ hidden: !containerState }, 'flex flex-col justify-start mb-64']">
          <p class="py-2">
            {{ $t('pages.main.modal.connectedMallsInfo') }}
          </p>
          <p class="py-2">
            [MALL_NAME]
          </p>
          <p class="py-2">
            {{ $t('pages.main.modal.categoryInfo') }}
          </p>
          <div class="flex flex-row w-full">
            <v-select
              v-model="primarySelection1"
              :options="$t('pages.main.modal.category1')"
              :clearable="true"
              placeholder="select one"
              class="text-sm w-1/2 mx-2"
            />
            <v-select
              v-model="primarySelection2"
              :options="$t('pages.main.modal.category2')"
              :clearable="true"
              placeholder="select one"
              class="text-sm w-1/2 mx-2"
            />
          </div>
        </div>
      </div>
      <div v-if="loginOption === 'storeSelect'">
        <div slot="modal-content" class="modalBody2 visible">
          <p class="py-2">
            {{ $t('pages.login.modal.content1') }}
          </p>
          <div class="flex flex-row w-full">
            <v-select
              v-model="mallSelection"
              :options="mallOptions"
              :clearable="true"
              placeholder="select one"
              class="text-sm w-1/2 mx-2"
            />
          </div>
          <p class="py-2">
            {{ $t('pages.login.modal.content2') }}
          </p>
        </div>
      </div>
      <div slot="modal-footer" :class="[{ hidden: containerState && loginOption !== 'storeSelect' }, 'w-full flex justify-end']">
        <Button @click="modalState = true" class="btn-solid-tertiary modal">
          {{ $t('pages.main.modal.buttonSets.set1.btnCancel') }}
        </Button>
        <Button @click="(loginOption !== 'storeSelect') ? containerState = true : $router.push('/dashboard')" class="btn-solid-primary modal">
          {{ (loginOption !== 'storeSelect') ? $t('pages.main.modal.buttonSets.set1.btnAgree') : $t('pages.main.modal.buttonSets.set2.btnStart') }}
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
import { Component, Vue } from 'nuxt-property-decorator'
import 'vue-select/dist/vue-select.css'

/**
 * Login Component page
 * @author Angelito Diwata <angelito@simplexi.com.ph>
 * @since 2019.12.06
 */
@Component
export default class Login extends Vue {
  /**
   * Data for the username field
   */
  username: string = ''

  /**
   * Data for the password field
   */
  password: string = ''

  /**
   *  Determines if the 1st modal is visible
   */
  modalState: boolean = true

  /**
   *  Determines the login option when login button is clicked
   */
  loginOption: string = 'default'

  /**
   * mall options to choose which mall to monitor using BTS
   */
  mallOptions: Array<string> = [ 'MALL_A', 'MALL_B', 'MALL_C' ]

  /**
   * mall selection holder
   */
  mallSelection: string = ''

  /**
   *  Determines if the first button container of the modal is visible
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
   * returns the container state2 reactively
   * @returns void
   */
  getLogin (): void {
    if (this.loginOption === 'default') {
      this.$router.push('/dashboard')
    } else {
      this.modalState = false
    }
  }
}
</script>
<style lang="postcss" scoped>
@import './Login.sss';
</style>
