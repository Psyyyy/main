/**
 * 用户接口
 */

import request from '@/plugins/axios'
import axios from './registerAxios'
// import request from './request'

export function register(data) {
  return axios({
    url: '/register',
    method: 'post',
    data,
  })
}

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data,
  })
}

export function logout(data) {
  return request({
    url: '/logout',
    method: 'post',
    data,
  })
}

export function getUserInfo(id) {
  return request({
    url: `/user/${id}`,
    method: 'get',
  })
}

export function resetPassword(data) {
  return request({
    url: '/user/resetPassword',
    method: 'post',
    data,
  })
}
export function updateUser(data) {
  return request({
    url: '/user/update',
    method: 'put',
    data,
  })
}
