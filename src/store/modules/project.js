const state = {
  projectList: [],
  currProject: window.localStorage.getItem('currProject') ? window.localStorage.getItem('currProject') : '',
  currProjectId: window.localStorage.getItem('currProjectID') ? window.localStorage.getItem('currProjectID') : '',
  currEditProject: {},
  // currProjectMemberList: [],
}

const mutations = {
  SET_PROJECT_LIST(state, projectlist) {
    state.projectList = projectlist
  },
  SET_PROJECT_DRAWER_STATUS(state, status) {
    if (!status) {
      state.currEditTodo = {}
    }
    state.isTodoDrawerOpened = status
  },
  SET_CURR_PROJECT_ID(state, projectId) {
    state.currProjectId = projectId
  },
  SET_CURR_PROJECT_NAME(state, projectName) {
    state.currProject = projectName
  },
  SET_CURR_EDIT_PROJECT(state, todoItem) {
    state.currEditProject = todoItem
  },
}
const actions = {
  setCurrProject(id, name) {
    this.$store.commit('project/SET_CURR_PROJECT_NAME', name)
    this.$store.commit('project/SET_CURR_PROJECT_ID', id)
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
