const state = {
  noticeList: [],
  haveNewNotice: false,
}

const mutations = {
  SET_NOTICE_LIST(state, list) {
    state.noticeList = list
  },
  SET_NOTICE_STATUS(state, status) {
    state.haveNewNotice = status
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
