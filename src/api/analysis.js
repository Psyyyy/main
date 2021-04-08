/**
 * 统计接口
 */

import request from '@/plugins/axios'
// import request from './request'
export function getProjectRecord(pid) {
  return request({
    url: `/analysis/project/${pid}`,
    method: 'get',
  })
}
export function getStageRecord(sid) {
  return request({
    url: `/analysis/stage/${sid}`,
    method: 'get',
  })
}
