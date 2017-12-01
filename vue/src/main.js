// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

// Clear out localstorage
// to give Gun a fresh start on every load
localStorage.clear()

// Import Gun as a dependency
import Gun from 'gun'

// Create a new gun instance
// and set it on the window.
// We're not going to connect
// it to any peers just yet.
let gun = new Gun()
window.gun = gun

// This is a little Vue plugin that
// allows us to reference the gun instance
// within components like so: this.$gun
import VueGun from 'vue-gun'
Vue.use(VueGun, {gun})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
