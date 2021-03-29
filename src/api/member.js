/**
 * 项目接口
 */

import request from '@/plugins/axios'
// import request from './request'
export function getMemberList(pid) {
  console.log('laile')
  return request({
    url: `/user/members/${pid}`,
    method: 'get',
  })
}

export function deleteMember(data) {
  return request({
    url: '/project',
    method: 'put',
    data,
  })
}
