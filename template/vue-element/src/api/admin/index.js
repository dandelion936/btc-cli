import request from '@/plugin/axios'
import requestParam from '@/plugin/axios/requestParam'
import uploading from '@/plugin/axios/uplod.js'
/**
 * 个人信息
 */
export function getAccount (data) {
  return request({
    url: 'admin/userInfo.do',
    method: 'get',
    params: requestParam(data, 'get')
  })
}
// 编辑个人信息
export function postAccountEditSave (data) {
  return request({
    url: 'admin/editUser.do',
    method: 'post',
    data: requestParam(data)
  })
}
/**
 * 用户管理
 */

export function getAccountList (data) {
  return request({
    url: 'admin/userList.do',
    method: 'get',
    params: requestParam(data, 'get')
  })
}
// 重置密码
export function postResetPassword (data) {
  return request({
    url: 'admin/resetPassword.do',
    method: 'post',
    data: requestParam(data, 'post')
  })
}

export function postAccountAddSave (data) {
  return request({
    url: 'admin/addUser.do',
    method: 'post',
    data: requestParam(data, 'post')
  })
}
// 图片上传
export function uploadImgsDiff (data) {
  return uploading({
    url: 'ueditor/uploadImg4.do',
    method: 'post',
    data: data
  })
}
// 单张上传
export function uploadImgs (data) {
  return uploading({
    url: 'upload/uploadImg2.do',
    method: 'post',
    data: data
  })
}
