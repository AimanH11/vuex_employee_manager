// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VeeValidate from 'vee-validate'

import 'keen-ui/dist/keen-ui.css'
import KeenUI from 'keen-ui'

/* eslint-disable no-new */

import store from './store/store'

Vue.use(VeeValidate)
Vue.use(KeenUI)

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.config.productionTip = false
new Vue({
  router,
  store: store,
  render: h => h(App)
}).$mount('#app')
