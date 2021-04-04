/**
 * 项目接口
 */

import request from '@/plugins/axios'
// import request from './request'
export function getNoticeList(uid) { // uid,pid
  return request({
    url: `/notice/${uid}`,
    method: 'get',
  })
}

export function updateAllNotice(uid) { // uid,pid
  return request({
    url: `/notice/update/${uid}`,
    method: 'put',
  })
}
export function updateOneNotice(nid) { // uid,pid,id
  return request({
    url: `/notice/update/one/${nid}`,
    method: 'put',
  })
}
