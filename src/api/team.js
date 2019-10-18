import request from '@/utils/request'
// 人员结构
export function persAll(params) {
  return request({
    url: 'api/dept',
    method: 'get',
    params
  })
}
// 投资方列表
export function alllist(pageNo,pageSize) {
  return request({
    url: 'api/users?pageNo='+pageNo+'&pageSize='+pageSize,
    method: 'get',
  })
}
// 资方添加
export function add(data) {
  return request({
    url: 'api/dept',
    method: 'post',
  data
  })
}
// 团队折线图
export function chart(data) {
  return request({
    url: 'api/team',
    method: 'post',
    data
  })
}


// 详情
export function detail(userId) {
  return request({
    url: 'api/users/detail/'+userId,
    method: 'get'
  })
}