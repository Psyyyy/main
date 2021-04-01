const state = {
  currStage: window.localStorage.getItem('currStage') ? window.localStorage.getItem('currStage') : '',
  currStageId: window.localStorage.getItem('currStageId') ? window.localStorage.getItem('currStageId') : '',
  stageList: [],
  currStageInfo: {},
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
