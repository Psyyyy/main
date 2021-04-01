/**
 * 项目接口
 */

import request from '@/plugins/axios'
// import request from './request'
export function getStageList(data) {
  return request({
    url: '/stage',
    method: 'get',
    data,
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
