/**
 * 项目接口
 */

import request from '@/plugins/axios'
// import request from './request'
export function getProjectFileList(pid) {
  return request({
    url: `/file/project/${pid}`,
    method: 'get',
  })
}
export function getTaskFileList(tid) {
  return request({
    url: `/file/task/${tid}`,
    method: 'get',
  })
}
export function downloadFile(uid, fid) {
  return request({
    url: `/file/download?file_name=${fid}&uid=${uid}`,
    method: 'get',
  })
}
export function uploadFile(data) {
  return request({
    url: '/file/upload',
    method: 'post',
    data,
  })
}
export function deleteFile(data) { // uid,fid
  return request({
    url: '/file/delete',
    method: 'post',
    data,
  })
}
export function deleteAllFile(data) { // uid,fid
  return request({
    url: '/file/deleteall',
    method: 'post',
    data,
  })
}
