const state = {
  teamList: [
    {
      id: '10',
      title: 'Amy',
      email: '251610413@qq.com',
      activity: '提交了缺陷',
      tag: ['1', '2'],
      done: false,
      star: false,
      date: ['2020-06-09', '2020-06-10'],
    },
    {
      id: '11',
      title: 'Jack',
      email: '251610413@qq.com',
      activity: '提交了需求',
      tag: ['2', '3'],
      done: false,
      star: false,
      date: ['2020-06-09', '2020-06-10'],
    },
    {
      id: '12',
      title: 'Lucy',
      email: '251610413@qq.com',
      activity: '验收了需求',
      tag: ['1'],
      done: false,
      star: false,
      date: ['2020-02-09', '2020-06-10'],
    },
    {
      id: '13',
      title: 'Monica',
      email: '251610413@qq.com',
      activity: '发表了评论',
      tag: ['3'],
      done: false,
      star: false,
      date: ['2020-01-23', '2020-02-23'],
    },
    {
      id: '14',
      title: 'Chandler',
      email: '251610413@qq.com',
      activity: '完车了需求1',
      done: true,
      star: true,
      date: ['2020-06-09', '2020-06-10'],
    },
    {
      id: '15',
      title: 'Ross',
      email: '251610413@qq.com',
      activity: '完车了需求1',
      tag: ['1', '2'],
      done: false,
      star: false,
      date: ['2020-06-09', '2020-06-10'],
    },
    {
      id: '16',
      title:
        'Rachel',
      email: '251610413@qq.com',
      activity: '完车了需求1',
      tag: ['1', '2'],
      done: false,
      star: true,
      date: ['2020-06-09', '2020-06-10'],
    },
    {
      id: '17',
      title:
        'Phebe',
      email: '251610413@qq.com',
      activity: '完车了需求1',
      tag: ['2', '1'],
      done: false,
      star: false,
      date: ['2020-06-09', '2020-06-10'],
    },
    {
      id: '18',
      title: 'Joey',
      email: '251610413@qq.com',
      activity: '完车了需求1',
      tag: ['1'],
      done: true,
      star: false,
    },
  ],
  barKey: ['1'],
  isTeamDrawerOpened: false,
  currEditMember: {},
  currMemberTask: [],
  currMemberProject: [],
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
}
const actions = {}

const getters = {
  filterItems: (state) => {
    const [key] = state.barKey
    console.log(key)
    // 这应该是纯前端实现的逻辑，带后端的话应该是提交字段之后到数据库查了直接返回

    if (['1', '2', '3'].includes(key)) {
      if (key === '1') {
        return state.teamList.filter(({ star }) => !star)
      }
      if (key === '2') {
        return state.teamList.filter(({ done, star }) => done && !star)
      }
      if (key === '3') {
        return state.teamList.filter(({ star }) => star)
      }
    } else {
      if (key === '4') {
        return state.teamList.filter(({ tag }) => tag?.includes('1'))
      }
      if (key === '5') {
        return state.teamList.filter(({ tag }) => tag?.includes('2'))
      }
      if (key === '6') {
        return state.teamList.filter(({ tag }) => tag?.includes('3'))
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
