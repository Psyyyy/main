const state = {
  currProjectMemberList: [],
  otherMemberList: [],
  barKey: ['1'],
  isTeamDrawerOpened: false,
  currEditMember: {},
  currMemberTask: [],
  currMemberProject: [],
  isAdmin: false, // 为true时代表role字段加入控制
  isActive: true, // 控制成员显示，为true时表示isActive字段加入控制
}

const mutations = {
  SET_TEAM_DRAWER_STATUS(state, status) {
    // if (!status) {
    //   state.currEditMember = {}
    // }
    state.isTeamDrawerOpened = status
  },
  SET_TEAM_BAR_KEY(state, key) {
    state.barKey = [key]
  },
  SET_CURR_EDIT_MEMBER(state, member) {
    state.currEditMember = member
  },
  SET_MEMBER_TASK(state, task) {
    state.currMemberTask = task
  },
  SET_MEMBER_PROJECT(state, project) {
    state.currMemberProject = project
  },
  SET_CURR_PROJECT_MEMBER_LIST(state, list) {
    state.currProjectMemberList = list
  },
  SET_OTHER_MEMBER_LIST(state, list) {
    state.otherMemberList = list
  },
}
const actions = {}

const getters = {
  filterItems: (state) => {
    const [key] = state.barKey
    console.log(key)
    // 这应该是纯前端实现的逻辑，带后端的话应该是提交字段之后到数据库查了直接返回

    if (['1', '2'].includes(key)) {
      if (key === '1') {
        return state.currProjectMemberList.filter(({ is_active }) => is_active)
      }
      if (key === '2') {
        return state.currProjectMemberList.filter(({ is_active }) => !is_active)
      }
    } else {
      if (key === '3') {
        return state.currProjectMemberList.filter(({ is_active, role }) => is_active && role === 'admin')
      }
      if (key === '4') {
        return state.currProjectMemberList.filter(({ is_active, role }) => is_active && role !== 'admin')
      }
    }
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
