const state = {
  taskList: [],
  currEditTask: '',
}

const mutations = {
  SET_TASK_LIST(state, tasklist) {
    state.taskList = tasklist
  },
  SET_CURR_EDIT_TASK(state, id) {
    state.currEditTask = id
  },
}
const actions = {
}
const getters = {}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
