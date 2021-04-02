const state = {
  // barKey: ['1'],
  isFilterModalOpened: false,
  currFilterType: '',
  currEditFilter: {},
  stateFilter: {
    task: [
      '规划中', '实现中', '已实现', '已拒绝',
    ],
    bug: ['新', '处理中', '已解决', '已验收', '已拒绝', '已关闭'],
    // stage: ['规划中', '实现中', '已实现', '测试中', '已验收', '已拒绝'],
  },
}

const mutations = {
  SET_FILTER_MODAL_STATUS(state, status) {
    if (!status) {
      state.currEditFilter = {}
    }
    state.isFilterModalOpened = status
  },
  SET_FILTER_MODAL_TYPE(state, type) {
    state.currFilterType = type
  },
  //   SET_TODO_BAR_KEY(state, key) {
  //     state.barKey = [key]
  //   },
  SET_CURR_EDIT_FILTER(state, filterItem) {
    state.currEditFilter = filterItem
  },
}
const actions = {

}

const getters = {
  stateFilter: (state) => {
    // console.log(state)
    if (state.currFilterType === 'task') { return state.stateFilter.task }
    if (state.currFilterType === 'bug') { return state.stateFilter.bug }
    if (state.currFilterType === 'stage') {
      return state.stateFilter.stage
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
