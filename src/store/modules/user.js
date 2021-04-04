import { setToken, removeToken } from '@/utils/token'
import { login, logout, getUserInfo } from '@/api/user'
import { getNoticeList } from '@/api/notice'
import { resetRouter } from '@/router/router'

const state = {
  permissions: null, // NOTE: 此处 permission 不能初始化为空数组
  info: {}, // 存储用户信息
}

const mutations = {
  SET_USER_INFO(state, info) {
    state.info = info
  },
  SET_USER_ID(state, id) {
    state.id = id
  },
  SET_USER_PERMISSIONS(state, permissions) {
    state.permissions = permissions
  },
}

const actions = {
  async login(_, { username, password }) {
    try {
      const { data: result } = await login({ username, password })
      // console.log('store', result.token)
      setToken(result.token)
      window.sessionStorage.setItem('currUserID', result.info.id)
      return true
    } catch {
      return false
    }
  },

  async logout({ commit }) {
    try {
      commit('SET_USER_PERMISSIONS', null)
      removeToken()
      resetRouter() // NOTE: 重置路由，不然会出现路由重复的情况
      // await logout()
      return true
    } catch {
      return false
    }
  },

  async getUserInfo({ commit }) {
    const uid = window.sessionStorage.getItem('currUserID')
    const { data } = await getUserInfo(uid)
    commit('SET_USER_INFO', data.info)
    // commit('SET_USER_PERMISSIONS', data.permissions)
    commit('SET_USER_PERMISSIONS', data.permissions)
    return data
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
