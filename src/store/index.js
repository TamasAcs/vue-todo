import Vue from 'vue'
import Vuex from 'vuex'
import store from './store'

import VueRouter from 'vue-router'
Vue.use(Vuex)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
// this is to avoid duplication of routing:
// Uncaught (in promise) NavigationDuplicated: Avoided redundant navigation to current location: "/home".

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      store
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })

  return Store
}
