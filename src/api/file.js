/**
 * 项目接口
 */

import request from '@/plugins/axios'
// import request from './request'
export function getProjectFileList(pid) {
  return request({
    url: `/file?pid=${pid}`,
    method: 'get',
  })
}
export function getTaskFileList(tid) {
  return request({
    url: `/file?tid=${tid}`,
    method: 'get',
  })
}
export function getUserFileList(uid) {
  return request({
    url: `/file?uid=${uid}`,
    method: 'get',
  })
}
export function downloadFile(fid) {
  return request({
    url: `/file/download?file_name=${fid}`,
    method: 'get',
    responseType: 'blob',
  })
}
export function uploadFile(data, uid, pid, tid) {
  console.log('接口', data)
  return request({
    url: `/file/upload?uid=${uid}&pid=${pid}&tid=${tid}`,
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
