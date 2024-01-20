import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'
import { ToastPlugin, ModalPlugin } from 'bootstrap-vue'
import Notifications from 'vue-notification'
import i18n from '@/libs/i18n'
import router from './router'
import store from './store'
import App from './App.vue'
import VeeValidate from 'vee-validate';
import swal from 'sweetalert2';
window.Swal = swal;

// CommonJS

// Global Components
import './global-components'

// 3rd party plugins
import '@axios'
import '@/libs/acl'
import '@/libs/portal-vue'
import '@/libs/clipboard'
import '@/libs/toastification'
import '@/libs/sweet-alerts'
import '@/libs/vue-select'
import '@/libs/tour'

// Axios Mock Adapter 
import '@/@fake-db/db'

// BSV Plugin Registration
Vue.use(VueCompositionAPI)
Vue.use(ToastPlugin)
Vue.use(ModalPlugin)
Vue.use(VeeValidate);
Vue.use(Notifications)
// Composition API
// Feather font icon - For form-wizard
// * Shall remove it if not using font-icons of feather-icons - For form-wizard
require('@core/assets/fonts/feather/iconfont.css') // For form-wizard

// import core styles
require('@core/scss/core.scss')

// import assets styles
require('@/assets/scss/style.scss')

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
