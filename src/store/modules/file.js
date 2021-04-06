const state = {
  fileList: [],
  barKey: ['1'],
  isFileDrawerOpened: false,
  currEditFile: {},
  fileIcon: [
    {
      end: 'ppt',
      icon: 'file-ppt',
      color: '#ff5b5c',
    },
    {
      end: 'pptx',
      icon: 'file-ppt',
      color: '#ff5b5c',
    },

    {
      end: 'pdf',
      icon: 'file-pdf',
      color: '#ff5b5c',
    },
    {
      end: 'doc',
      icon: 'file-word',
      color: '#6485ff',
    },
    {
      end: 'docx',
      icon: 'file-word',
      color: '#6485ff',
    },
    {
      end: 'xls',
      icon: 'file-excel',
      color: '#2bbf3d',
    },
    {
      end: 'xlsx',
      icon: 'file-excel',
      color: '#2bbf3d',
    },
    {
      end: 'csv',
      icon: 'file-excel',
      color: '#2bbf3d',
    },
    {
      end: 'txt',
      icon: 'file-text',
      color: '#adafb2',
    },
    {
      end: 'rar',
      icon: 'file-zip',
      color: '#b27c8a',
    },
    {
      end: 'zip',
      icon: 'file-zip',
      color: '#b27c8a',
    },
    {
      end: 'md',
      icon: 'file-markdown',
      color: '#ad99e5',
    },
    {
      end: 'jpeg',
      icon: 'file-image',
      color: '#eb2f96',
    },
    {
      end: 'png',
      icon: 'file-image',
      color: '#eb2f96',
    },
    {
      end: 'jpg',
      icon: 'file-image',
      color: '#eb2f96',
    },
    {
      end: 'sql',
      icon: 'database',
      color: '#7cbfc9',
    },
  ],
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
        return state.fileList
      }
      if (key === '2') {
        return state.fileList.filter(({ end }) => end !== 'sql' && end !== 'jpg' && end !== 'png' && end !== 'jpeg')
      }
      if (key === '3') {
        return state.fileList.filter(({ end }) => end === 'jpg' || end === 'png' || end === 'jpeg')
      }
      if (key === '4') {
        return state.fileList.filter(({ end }) => end === 'sql')
      }
    } else {
      if (key === '5') {
        return state.fileList.filter(({ source }) => source === 'task')
      }
      if (key === '6') {
        return state.fileList.filter(({ source }) => source === 'bug')
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
