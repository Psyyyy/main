import { updateTask } from '@/api/task'
import { newDialog } from '@/api/dialog'

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
  finishMsg: {
    id: '',
    done: 0,
  },

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
  SET_TASK_FINISH(state, msg) {
    state.finishMsg.id = msg.id
    state.finishMsg.done = msg.done
  },
}

const actions = {
  async finishTask(_, msg) { // msg:id、type、done
    console.log('finish信息', msg)
    // return true
    const formData = {
      id: msg.id,
      is_done: msg.done,
    }
    const dialog = {
      pid: window.localStorage.getItem('currProjectID'),
      user: window.sessionStorage.getItem('currUserID'),
      source: msg.type === 1 ? 'task' : 'bug',
      sourceId: msg.id,
      action: msg.done === true ? '完成了任务' : '取消完成任务',
      target: '',
    }
    try {
      await updateTask(formData)
      await newDialog(dialog)
      return true
    } catch {
      return false
    }
  },
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
