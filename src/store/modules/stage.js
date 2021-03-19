const state = {

  currStage: window.localStorage.getItem('currStage') ? window.localStorage.getItem('currStage') : '',
  currStageId: '',
}

const mutations = {
  SET_STAGE_DRAWER_STATUS(state, status) {
    if (!status) {
      state.currEditTodo = {}
    }
    state.isTodoDrawerOpened = status
  },
  SET_CURR_STAGE_ID(state, stageId) {
    state.currStageId = stageId
  },
  SET_CURR_STAGE_NAME(state, stageName) {
    state.currStage = stageName
  },

}
const actions = {
  setCurrStage(id, name) {
    this.$store.commit('stage/SET_CURR_STAGE_NAME', name)
    this.$store.commit('stage/SET_CURR_STAGE_ID', id)
  },
}
const getters = {}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
