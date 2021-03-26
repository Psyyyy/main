/**
 * 用户接口
 */

import request from '@/plugins/axios'
// import request from './request'

export function login(data) {
  console.log('login:', data)
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

export function getUserInfo(params) {
  return request({
    url: '/user/info',
    method: 'get',
    params,
  })
}

export function resetPassword(data) {
  return request({
    url: '/user/resetPassword',
    method: 'post',
    data,
  })
}
