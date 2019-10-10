import request from '@/plugin/axios'
import requestParam from '@/plugin/axios/requestParam'

// 角色列表
export function getCharacterList (data) {
  return request({
    url: 'authority/findRoleNameList.do',
    method: 'get',
    params: requestParam(data, 'get')
  })
}
// 菜单列表
export function getMenuList (data) {
  return request({
    url: 'authority/toList.do',
    method: 'get',
    params: requestParam(data, 'get')
  })
}
// 子菜单列表
export function getMenuChild (data) {
  return request({
    url: 'authority/toChildrenPage.do',
    method: 'get',
    params: requestParam(data, 'get')
  })
}
// 新增菜单
export function postAddMenu (data) {
  return request({
    url: 'authority/addPage.do',
    method: 'post',
    data: requestParam(data, 'post')
  })
}
// 编辑菜单
export function postEditMenu (data) {
  return request({
    url: 'authority/editorPage.do',
    method: 'post',
    data: requestParam(data, 'post')
  })
}
// 新增权限字段
export function postAddTag (data) {
  return request({
    url: 'authority/addAuthTag.do',
    method: 'post',
    data: requestParam(data, 'post')
  })
}
// 获取角色和权限信息
export function getCharacterTag (data) {
  return request({
    url: 'authority/toRoleList.do',
    method: 'get',
    params: requestParam(data, 'get')
  })
}
// 通过角色id 获取 权限信息
export function getCharacterById (data) {
  return request({
    url: 'authority/toAuthList.do',
    method: 'get',
    params: requestParam(data, 'get')
  })
}
// 授权
export function postSaveCharacter (data) {
  return request({
    url: 'authority/addAuthRole.do',
    method: 'post',
    data: requestParam(data, 'post')
  })
}
// 角色新增
export function postAddCharacter (data) {
  return request({
    url: 'authority/addRole.do',
    method: 'post',
    data: requestParam(data, 'post')
  })
}
