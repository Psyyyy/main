/**
 * 项目接口
 */

import request from '@/plugins/axios'
// import request from './request'
export function getTaskList(id, type) { // 区分缺陷和需求
  return request({
    url: `/task/varylist/${id}/type/${type}`,
    method: 'get',
  })
}

export function getStageTaskList(id) { // 迭代用的
  return request({
    url: `/task/list/${id}`,
    method: 'get',
  })
}

export function getTaskDetail(pid, tid) { // 有tid的时候就不用区分
  return request({
    url: `/task/list/${pid}/detail/${tid}`,
    method: 'get',
  })
}

export function getUndoneChild(pid, tid) { // 有tid
  return request({
    url: `/task/list/${pid}/father/${tid}`,
    method: 'get',
  })
}

export function addTask(data) { // 已增加type字段
  return request({
    url: '/task/new',
    method: 'post',
    data,
  })
}
export function updateTask(data) { // 有tid
  return request({
    url: '/task/update',
    method: 'put',
    data,
  })
}
export function deleteTask(data) { // 有tid
  return request({
    url: `/task/delete/${data}`,
    method: 'put',
  })
}

export function filterTask(data) { // 已增加type字段
  return request({
    url: '/task/filter',
    method: 'get',
    params: data,
  })
}
