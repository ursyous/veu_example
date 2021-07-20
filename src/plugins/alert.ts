import VueSweetalert2 from 'vue-sweetalert2'
import { SweetAlertType, SweetAlertResult } from 'sweetalert2'
import Vue from 'vue'

Vue.use(VueSweetalert2)

const VueAlert = new Vue()

function nl2br (message: string = ''): string {
  return message ? (message + '').replace(/\n/g, '<br />') : ''
}

const alert = function (message: string = '', type: SweetAlertType = 'info'): Promise<SweetAlertResult> {
  return VueAlert.$swal({
    html: nl2br(message),
    type,
    allowOutsideClick: false,
    animation: false
  })
}

const confirm = function (message: string = '', type: SweetAlertType = 'info'): Promise<boolean> {
  return VueAlert.$swal({
    html: nl2br(message),
    type,
    showCancelButton: true,
    confirmButtonText: 'Confirm',
    cancelButtonText: 'Cancel',
    allowOutsideClick: false,
    animation: false
  }).then((result: SweetAlertResult): boolean => {
    return result.value === true
  })
}

const alertPlugin = {
  install: (Vue: Vue | any): void => {
    Vue.prototype.$alert = alert
    Vue.prototype.$confirm = confirm
  }
}

Vue.use(alertPlugin)
