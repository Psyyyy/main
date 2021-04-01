import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

import user from './modules/user'
import todo from './modules/todo'
import auth from './modules/auth'
import project from './modules/project'
import stage from './modules/stage'
import filter from './modules/filter'
import file from './modules/file'
import team from './modules/team'
import task from './modules/task'
import add from './modules/add'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    todo,
    auth,
    project,
    stage,
    filter,
    file,
    team,
    task,
    add,
  },

  state,
  getters,
  mutations,
  actions,

  plugins: [
    createPersistedState({
      paths: ['user.info'],
    }),
  ],
})
