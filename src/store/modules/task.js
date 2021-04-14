const state = {
  taskList: [],
  boardList: [],
  currEditTask: '',
  currEditTaskLevel: '',
  taskDetail: {},
  taskDialog: {},
  taskComment: {},
  currFatherTask: '',
  currFatherTaskName: '',
  currListType: 'task', // 'task':需求/缺陷，stage：迭代

}

const mutations = {
  SET_TASK_LIST(state, tasklist) {
    state.taskList = tasklist
  },
  SET_BOARD_LIST(state, boardlist) {
    state.boardList = boardlist
  },
  SET_LIST_TYPE(state, type) {
    state.currListType = type
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
const getters = {
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
