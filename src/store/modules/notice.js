const state = {
  noticeList: [],
  haveNewNotice: false,
  newNotice: [],
}

const mutations = {
  SET_NOTICE_LIST(state, list) {
    state.noticeList = list
  },
  SET_NOTICE_STATUS(state, status) {
    state.haveNewNotice = status
  },
  SET_NEW_NOTICE(state, list) {
    state.newNotice = list
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
