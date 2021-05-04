const state = {
  // barKey: ['1'],
  isAddModalOpened: false,
  currAddType: '', // task or bug?
  currEditAdd: {},
  isFromDetail: false,
  isSubmit: false,
  submitName: '',
  stateAdd: {
    task: ['规划中', '实现中', '已实现', '已拒绝'],
    bug: ['新', '处理中', '已解决', '已验收', '已拒绝', '已关闭'],
    // stage: ['规划中', '实现中', '已实现', '测试中', '已验收', '已拒绝'],
  },
  board: {
    task: [
      {
        id: 1,
        state: '规划中',
        datalist: [],

      },
      {
        id: 2,
        state: '实现中',
        datalist: [],
      }, {
        id: 3,
        state: '已实现',
        datalist: [],
      }, {
        id: 4,
        state: '已拒绝',
        datalist: [],
      },
    ],
    bug: [
      {
        id: 1,
        state: '新',
        datalist: [],

      },
      {
        id: 2,
        state: '处理中',
        datalist: [],
      }, {
        id: 3,
        state: '已解决',
        datalist: [],
      }, {
        id: 4,
        state: '已验收',
        datalist: [],
      }, {
        id: 5,
        state: '已拒绝',
        datalist: [],
      }, {
        id: 6,
        state: '已关闭',
        datalist: [],
      },
    ],
    // stage: ['规划中', '实现中', '已实现', '测试中', '已验收', '已拒绝'],
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
  SET_SUBMIT(state, isSubmit) {
    state.isSubmit = isSubmit
  },
  SET_SUBMIT_NAME(state, name) {
    state.submitName = name
  },
}
const actions = {

}

const getters = {
  stateAdd: (state) => {
    console.log('add的type', state.currAddType)
    if (state.currAddType === 'task') { return state.stateAdd.task }
    if (state.currAddType === 'bug') { return state.stateAdd.bug }
    if (state.currAddType === 'stage') {
      return state.stateAdd.stage
    }
    return []
  },
  boardInit: (state) => {
    // console.log(state)
    if (state.currAddType === 'task') { return state.board.task }
    if (state.currAddType === 'bug') { return state.board.bug }
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
