import request from '@/utils/request'

export function count() {
  return request({
    url: 'api/visits',
    method: 'post'
  })
}

export function get() {
  return request({
    url: 'api/visits',
    method: 'get'
  })
}

export function getChartData(type) {
  return request({
    url: 'api/dashBoard/'+type,
    method: 'get'
  })
}


export function getUrl(type) {
  return request({
    url: 'api/dashBoard/'+type,
    method: 'get'
  })
}
