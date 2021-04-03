const state = {
  todoList: [],
  barKey: ['1'],
  isTodoDrawerOpened: false,
  currEditTodo: {},
}

const mutations = {
  SET_TODO_DRAWER_STATUS(state, status) {
    if (!status) {
      state.currEditTodo = {}
    }
    state.isTodoDrawerOpened = status
  },
  SET_TODO_LIST(state, list) {
    state.todoList = list
  },
  SET_TODO_BAR_KEY(state, key) {
    state.barKey = [key]
  },
  SET_CURR_EDIT_TODO(state, todoItem) {
    state.currEditTodo = todoItem
  },
}
const actions = {

}

const getters = {
  filterItems: (state) => {
    const [key] = state.barKey
    console.log(key)
    // 这应该是纯前端实现的逻辑，带后端的话应该是提交字段之后到数据库查了直接返回
    // 所有 规划 实现中 已实现 已完成
    if (['1', '2', '3', '4', '5'].includes(key)) {
      if (key === '1') {
        return state.todoList.filter(({ is_del }) => !is_del)
      }
      if (key === '2') {
        return state.todoList.filter(({ t_state }) => t_state === '规划中')
      }
      if (key === '3') {
        return state.todoList.filter(({ t_state }) => t_state === '实现中')
      }
      if (key === '4') {
        return state.todoList.filter(({ t_state }) => t_state === '已实现')
      }
      if (key === '5') {
        return state.todoList.filter(({ is_done }) => is_done)
      }
    } else {
      if (key === '6') {
        return state.todoList.filter(({ t_rank }) => t_rank === 3)
      }
      if (key === '7') {
        return state.todoList.filter(({ t_rank }) => t_rank === 2)
      }
      if (key === '8') {
        return state.todoList.filter(({ t_rank }) => t_rank === 1)
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
