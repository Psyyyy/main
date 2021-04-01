const state = {
  // barKey: ['1'],
  isAddModalOpened: false,
  currAddType: '',
  currEditAdd: {},
  isFromDetail: false,
  stateAdd: {
    task: ['规划中', '实现中', '已实现', '已拒绝'],
    bug: ['新', '处理中', '已解决', '已验收', '已拒绝', '已关闭'],
    stage: ['规划中', '实现中', '已实现', '测试中', '已验收', '已拒绝'],
  },
}

const mutations = {
  SET_ADD_MODAL_STATUS(state, status) {
    if (!status) {
      state.currEditAdd = {}
    }
    state.isAddModalOpened = status
  },
  SET_ADD_MODAL_TYPE(state, type) {
    state.currAddType = type
  },
  SET_ADD_FROM_DETAIL(state, type) {
    state.isFromDetail = type
  },
  //   SET_TODO_BAR_KEY(state, key) {
  //     state.barKey = [key]
  //   },
  SET_CURR_EDIT_ADD(state, addItem) {
    state.currEditAdd = addItem
  },
}
const actions = {

}

const getters = {
  stateAdd: (state) => {
    // console.log(state)
    if (state.currAddType === 'task') { return state.stateAdd.task }
    if (state.currAddType === 'bug') { return state.stateAdd.bug }
    if (state.currAddType === 'stage') {
      return state.stateAdd.stage
    }
    return []
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
