const state = {
  taskList: [],
  currEditTask: '',
  currEditTaskLevel: '',
  taskDetail: {},
  taskDialog: {},
  taskComment: {},
  currFatherTask: '',
  currFatherTaskName: '',
}

const mutations = {
  SET_TASK_LIST(state, tasklist) {
    state.taskList = tasklist
  },
  SET_CURR_EDIT_TASK(state, id) {
    state.currEditTask = id
  },
  SET_CURR_EDIT_TASK_LEVEL(state, level) {
    state.currEditTaskLevel = level
  },
  SET_CURR_FATHER_TASK(state, data) {
    state.currFatherTask = data.id
    state.currFatherTaskName = data.t_title
  },
  SET_TASK_DETAIL(state, data) {
    state.taskDetail = data
  },
  SET_TASK_DIALOG(state, data) {
    state.taskDialog = data
  },
  SET_TASK_COMMENT(state, data) {
    state.taskComment = data
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
