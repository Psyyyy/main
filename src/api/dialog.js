/**
 * 日志接口
 */

import request from '@/plugins/axios'
// import request from './request'
export function getDialog(data) {
  return request({
    url: '/dialog',
    method: 'get',
    params: data,
  })
}

export function newDialog(data) {
  return request({
    url: '/dialog/new',
    method: 'post',
    data,
  })
}
