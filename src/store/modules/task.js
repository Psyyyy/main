const state = {
  taskList: [],
  currEditTask: '',
  taskDetail: {},
  taskDialog: {},
}

const mutations = {
  SET_TASK_LIST(state, tasklist) {
    state.taskList = tasklist
  },
  SET_CURR_EDIT_TASK(state, id) {
    state.currEditTask = id
  },
  SET_TASK_DETAIL(state, data) {
    state.taskDetail = data
  },
  SET_TASK_DIALOG(state, data) {
    state.taskDialog = data
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
