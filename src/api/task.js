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
// export function newProject(data) {
//   return request({
//     url: '/project/new',
//     method: 'post',
//     data,
//   })
// }
// export function updateProject(data) {
//   return request({
//     url: '/project/update',
//     method: 'put',
//     data,
//   })
// }
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
