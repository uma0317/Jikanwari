import Vue from 'vue'
import Vuex from 'vuex'
import table from './modules/table'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        table,
        splitter: {
            namespaced: true,
            state: {
              open: false
            },
            mutations: {
              toggle (state, shouldOpen) {
                if (typeof shouldOpen === 'boolean') {
                  state.open = shouldOpen
                } else {
                  state.open = !state.open
                }
              }
            }
        }
    }
})