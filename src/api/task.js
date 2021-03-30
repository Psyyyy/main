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
export function newTask(data) {
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
  console.log('task.js', data)
  return request({
    url: '/task/filter',
    method: 'get',
    params: data,
  })
}
