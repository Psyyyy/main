/**
 * 项目接口
 */

import request from '@/plugins/axios'
// import request from './request'
export function getStageList(pid) {
  return request({
    url: `/stage/all/${pid}`,
    method: 'get',
  })
}
export function getStage(id) {
  return request({
    url: `/stage/${id}`,
    method: 'get',
  })
}
export function newStage(data) {
  return request({
    url: '/stage/new',
    method: 'post',
    data,
  })
}
export function updateStage(data) {
  return request({
    url: '/stage/update',
    method: 'put',
    data,
  })
}
export function deleteStage(data) {
  return request({
    url: '/stage/delete',
    method: 'delete',
    data,
  })
}
