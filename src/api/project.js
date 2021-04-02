/**
 * 项目接口
 */

import request from '@/plugins/axios'
// import request from './request'
export function getProjectList(uid) {
  return request({
    url: `/project/${uid}`,
    method: 'get',
  })
}
export function newProject(data) {
  return request({
    url: '/project/new',
    method: 'post',
    data,
  })
}
export function updateProject(data) {
  return request({
    url: '/project/update',
    method: 'put',
    data,
  })
}
export function deleteProject(data) {
  return request({
    url: '/project/delete',
    method: 'delete',
    data,
  })
}
