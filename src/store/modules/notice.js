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
