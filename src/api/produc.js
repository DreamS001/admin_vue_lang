import request from '@/utils/request'

export function getConfig() {
  return request({
    url: 'api/product/config',
    method: 'get'
  })
}

// 添加
export function add(data) {
  return request({
    url: 'api/product',
    method: 'post',
    data
  })
}

// 全部
export function all(pageNo, pageSize) {
  return request({
    url: 'api/product?pageNo=' + pageNo + '&pageSize=' + pageSize,
    method: 'get'
  })
}

// 查询产品组合
export function list(pageNo, pageSize, startDate, endDate) {
  return request({
    url: 'api/product?pageNo=' + pageNo + '&pageSize=' + pageSize + '&startDate=' + startDate + '&endDate=' + endDate,
    method: 'get'
  })
}

// 删除
export function deleter(id) {
  return request({
    url: 'api/product/' + id,
    method: 'delete'
  })
}

// 编辑
export function update(data) {
  return request({
    url: 'api/product',
    method: 'PUT',
    data
  })
}

// 查询
export function inquire(id) {
  return request({
    url: 'api/product?pageNo=1&pageSize=10&id=' + id,
    method: 'GET'
  })
}

// 购买
export function purchase(data) {
  return request({
    url: 'api/productPay',
    method: 'POST',
    data
  })
}

// 记录
export function record(pageNo, pageSize, startDate, endDate) {
  return request({
    url: 'api/product/records?pageNo=' + pageNo + '&pageSize=' + pageSize + '&startDate=' + startDate + '&endDate=' + endDate,
    method: 'GET'
  })
}

// 复投请求
export function reivest(pay, id) {
  return request({
    url: 'api/reivest/' + pay + '/' + id,
    method: 'GET'
  })
}
