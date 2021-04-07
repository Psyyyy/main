const state = {
  weekDate: [],
}

const mutations = {
  SET_WEEK_DATE(state, date) {
    state.weekDate = date
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
