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
export function getProjectAnalysisData(pid) {
  return request({
    url: `/analysis/project/data/${pid}`,
    method: 'get',
  })
}
export function getStageAnalysisData(sid) {
  return request({
    url: `/analysis/stage/data/${sid}`,
    method: 'get',
  })
}
