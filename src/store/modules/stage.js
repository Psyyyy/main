const state = {
  currStage: window.localStorage.getItem('currStage') ? window.localStorage.getItem('currStage') : '',
  currStageId: window.localStorage.getItem('currStageId') ? window.localStorage.getItem('currStageId') : '',
  stageList: [],
  currStageInfo: {},
  currBoardType: '',
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
  SET_CURR_STAGE_ID(state, stageId) {
    state.currStageId = stageId
    window.localStorage.setItem('currStageId', stageId)
  },
  SET_CURR_STAGE_NAME(state, stageName) {
    state.currStage = stageName
  },
  SET_STAGE_LIST(state, list) {
    state.stageList = list
  },
  SET_CURR_STAGE(state, stage) {
    state.currStageInfo = stage
  },

}
const actions = {
  setCurrStage(id, name) {
    this.$store.commit('stage/SET_CURR_STAGE_NAME', name)
    this.$store.commit('stage/SET_CURR_STAGE_ID', id)
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
