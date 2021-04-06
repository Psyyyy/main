const state = {
  fileList: [],
  barKey: ['1'],
  isFileDrawerOpened: false,
  currEditFile: {},
}

const mutations = {
  SET_FILE_LIST(state, list) {
    state.fileList = list
  },
  SET_FILE_BAR_KEY(state, key) {
    state.barKey = [key]
  },
  SET_CURR_EDIT_FILE(state, fileItem) {
    state.currEditFile = fileItem
  },
}
const actions = {

}

const getters = {
  filterItems: (state) => {
    const [key] = state.barKey
    console.log(key)
    // 这应该是纯前端实现的逻辑，带后端的话应该是提交字段之后到数据库查了直接返回

    if (['1', '2', '3', '4'].includes(key)) {
      if (key === '1') {
        return state.fileList.filter(({ trash }) => !trash)
      }
      if (key === '2') {
        return state.fileList.filter(({ done, trash }) => done && !trash)
      }
      if (key === '3') {
        return state.fileList.filter(({ star }) => star)
      }
      if (key === '4') {
        return state.fileList.filter(({ trash }) => trash)
      }
    } else {
      if (key === '5') {
        return state.fileList.filter(({ tag }) => tag?.includes('1'))
      }
      if (key === '6') {
        return state.fileList.filter(({ tag }) => tag?.includes('2'))
      }
      if (key === '7') {
        return state.fileList.filter(({ tag }) => tag?.includes('3'))
      }
      if (key === '8') {
        return state.fileList.filter(({ tag }) => tag?.includes('4'))
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
