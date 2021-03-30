/**
 * 评论接口
 */

import request from '@/plugins/axios'
// import request from './request'
export function getComment(data) {
  return request({
    url: `/commtent/${data}`,
    method: 'get',
  })
}

export function newComment(data) {
  return request({
    url: '/comment/new',
    method: 'post',
    data,
  })
}

export function deleteComment(data) {
  return request({
    url: `/comment/delete/${data}`,
    method: 'delete',
  })
}
