import { constantRoutes, asyncRoutes } from '@/router/router'
import { isArray, isFunction } from '@/utils/util'

/**
 * 3.检测是否能对应上相应路由的角色权限
 *
 * @param {Array.<string>} permissions 用户拥有的权限标识数组
 * @param {Object} param1 路由元数据
 * @returns {boolean} 为 true 时表示具有权限，否则无权限
 */
function hasPermission(permissions, { meta }) { // 从路由对象里解构出meta
  const permissionKeyName = process.env.VUE_APP_ROUTE_PERMISSION_KEY_NAME || 'permission'
  // console.log(isArray(meta?.[permissionKeyName]))
  if (isArray(meta?.[permissionKeyName])) { // 关键在这里， permission就是在这里设定的
    return meta.permission.some((el) => permissions.includes(el))// 返回false或者true
    // meta.permission是前端每个路由定义好的权限   permissions是后台返回的用户的权限admin/normal
  }

  if (isFunction(meta?.[permissionKeyName])) {
    return meta.permission(permissions)
  }

  // 默认是具有权限的，所以返回 true
  return false
}

/**
 * 2.对已定义的动态路由进行过滤
 *
 * @param {Array.<Object>} routes 已定义的动态路由数组
 * @param {Array.<string>} permissions 用户拥有的权限标识数组
 */
export function filterAsyncRoutes(routes, permissions) {
  const res = routes.map((route) => { // 检查已定义的动态路由的每个对象
    const tmp = { ...route }// tmp就是数组中一个对象
    if (hasPermission(permissions, tmp)) { // haspermission返回true，说明这个路由数组中的这个对象可以访问
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, permissions)// 如果存在子路由，对子路由进行遍历
      }
      return tmp// 权限允许，返回这个路由对象
    }
    return null// 权限不允许，返回空对象//相当于把数组原来的这个路由设为空
  })

  return res.filter((item) => item)
}

const state = {
  routes: [],
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.routes = constantRoutes.concat(routes)
  },
}

const actions = {
  /**
   * 1.触发生成动态路由的方法
   *
   * @param {Array.<Object>} asyncRoutes 已定义的动态路由
   * @param {Array.<string>} permissions 用户拥有的权限标识数组
   */
  generateRoutes({ commit }, permissions) {
    const accessedRoutes = filterAsyncRoutes(asyncRoutes, permissions)
    commit('SET_ROUTES', accessedRoutes)
    return accessedRoutes
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
