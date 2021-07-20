import Vue from 'vue'
import { SnotifyService } from 'vue-snotify/SnotifyService'
import { SweetAlertType, SweetAlertResult } from 'sweetalert2'
import axios from 'axios'
import utilities from '~/plugins/utilities.ts'

declare module 'vue/types/vue' {
  interface Vue {
    $snotify: SnotifyService,
    $alert: Alert,
    $confirm: Alert,
    $path: Path
    $utilities: utilities
    $axios: axios
  }
}

interface Alert {
  (message: String, type?: SweetAlertType): Promise<SweetAlertResult>
}

interface Path {
  (link: string): string
}
