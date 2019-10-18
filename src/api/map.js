import request from '@/utils/request'
// 地图
export function mapp(data) {
  return request({
    url: 'api/dashBoard/5',
    method: 'get'
  })
}
// 底部信息
export function foot(data) {
  return request({
    url: 'api/dashBoard/8',
    method: 'get'
  })
}


// 公告
export function notice() {
  return request({
    url: 'api/dashBoard/7',
    method: 'get',
  })
}
// 收益
// export function earnings(data) {
//   return request({
//     url: 'api/profit',
//     method: 'GET',
//     data
//   })
// }
export function earn() {
  return request({
    url: 'api/dashBoard/6',
    method: 'GET'
  })
}
