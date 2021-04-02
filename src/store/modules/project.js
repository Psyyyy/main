const state = {
  projectList: [
    {
      id: '1',
      title: '白日依山尽，黄河入海流。',
      tag: '前端',
      tagColor: 'success',
      percent: 60,
      avatar: 'A',
      done: false,
    },
    {
      id: '2',
      title: '故人西辞黄鹤楼，烟花三月下扬州。',
      tag: '后端',
      tagColor: 'danger',
      percent: 60,
      avatar: 'B',
      done: false,
    },
    {
      id: '3',
      title: '两岸猿声啼不住，轻舟已过万重山。',
      tag: 'UI/UX',
      tagColor: 'primary',
      percent: 80,
      avatar: 'C',
      done: true,
    },
    {
      id: '4',
      title: '红颜未老恩先断，斜倚薰笼坐到明。',
      tag: '界面设计',
      tagColor: 'info',
      percent: 60,
      avatar: 'D',
      done: false,
    },
    {
      id: '5',
      title: '嫦娥应悔偷灵药，碧海青天夜夜心。',
      tag: 'JAVASCRIPT',
      tagColor: 'warning',
      percent: 20,
      avatar: 'E',
      done: false,
    },
    {
      id: '6',
      title: '嫦娥应悔偷灵药，碧海青天夜夜心。',
      tag: 'JAVASCRIPT',
      tagColor: 'warning',
      percent: 30,
      avatar: 'E',
      done: false,
    },
    {
      id: '7',
      title: '嫦娥应悔偷灵药，碧海青天夜夜心。',
      tag: 'JAVASCRIPT',
      tagColor: 'warning',
      percent: 20,
      avatar: 'E',
      done: false,
    },
  ],
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
