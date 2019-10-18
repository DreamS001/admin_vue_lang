import request from '@/utils/request'
// 全部
export function all(pageNo,pageSize) {
  return request({
    url: 'api/device?pageNo='+pageNo+'&pageSize='+pageSize,
    method: 'get'
  })
}
export function allQuery(pageNo,pageSize,name,id) {
  return request({
    url: 'api/device?pageNo='+pageNo+'&pageSize='+pageSize+'&name='+name+'&name1='+id,
    method: 'get'
  })
}
export function toquery(pageNo,pageSize,startDate,endDate,name) {
  return request({
    url: 'api/device?pageNo='+pageNo+'&pageSize='+pageSize+'&startDate='+startDate+'&endDate='+endDate+"&name="+name,
    method: 'get'
  })
}
// 明细api/finance/trade/{token}
export function allpar(id) {
  return request({
    url: 'api/finance/trade/'+id,
    method: 'get'
  })
}
// 设备交易记录

export function trade(pageNo,pageSize) {
  return request({
    url: 'api/finance/trade/all?pageNo='+pageNo+'&pageSize='+pageSize,
    method: 'get'
  })
}
export function tradeQuery(pageNo,pageSize,startDate,endDate,name) {
  return request({
    url: 'api/finance/trade/all?pageNo='+pageNo+'&pageSize='+pageSize+'&startDate='+startDate+'&endDate='+endDate+"&name="+name,
    method: 'get'
  })
}
export function trades() {
  return request({
    url: 'api/finance/trade/all?',
    method: 'get'
  })
}

export function output() {
  return request({
    url: 'api/device/output',
		responseType: 'blob',
    method: 'post'
  })
}
