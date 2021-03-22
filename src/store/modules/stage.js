const state = {
  currStage: window.localStorage.getItem('currStage') ? window.localStorage.getItem('currStage') : '',
  currStageId: '',
  stageList: [
    {
      name: '迭代1',
      id: '0',
    },
    {
      name: '迭代2',
      id: '1',
    },
  ],
}

const mutations = {
  SET_CURR_STAGE_ID(state, stageId) {
    state.currStageId = stageId
  },
  SET_CURR_STAGE_NAME(state, stageName) {
    state.currStage = stageName
  },
  SET_STAGE_List(state, newStage) {
    state.stageList.push(newStage)
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
