/**
 * 项目接口
 */

import request from '@/plugins/axios'
// import request from './request'
export function getTaskList(data) {
  return request({
    url: `/task/list/${data}`,
    method: 'get',
  })
}

export function getTaskDetail(pid, tid) {
  return request({
    url: `/task/list/${pid}/detail/${tid}`,
    method: 'get',
  })
}

export function getUndoneChild(pid, tid) {
  return request({
    url: `/task/list/${pid}/father/${tid}`,
    method: 'get',
  })
}

export function addTask(data) {
  return request({
    url: '/task/new',
    method: 'post',
    data,
  })
}
export function updateTask(data) {
  return request({
    url: '/task/update',
    method: 'put',
    data,
  })
}
export function deleteTask(data) {
  return request({
    url: `/task/delete/${data}`,
    method: 'put',
  })
}

export function filterTask(data) {
  return request({
    url: '/task/filter',
    method: 'get',
    params: data,
  })
}
