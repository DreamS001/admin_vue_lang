import request from '@/utils/request'

// 复投
export function finan(id) {
  return request({
    url: 'api/reivest/3/' + id,
    method: 'GET'

  })
}

export function finana(id) {
  return request({
    url: 'api/reivest/2/' + id,
    method: 'GET'

  })
}

export function toquery(pageNo, pageSize, startDate, endDate, name) {
  return request({
    url: 'api/finance/audit/2?pageNo=' + pageNo + '&pageSize=' + pageSize + '&startDate=' + startDate + '&endDate=' + endDate + "&name=" + name,
    method: 'get'
  })
}

export function cash(pageNo, pageSize) {
  return request({
    url: 'api/finance?pageNo=' + pageNo + '&pageSize=' + pageSize,
    method: 'get'

  })
}

export function cashquery(pageNo, pageSize, startDate, endDate) {
  return request({
    url: 'api/finance?pageNo=' + pageNo + '&pageSize=' + pageSize + '&startDate=' + startDate + '&endDate=' + endDate,
    method: 'get'

  })
}

// 充值财务审核
export function topupCashlist(pageNo, pageSize, startDate, endDate, name) {
  return request({
    url: 'api/finance/audit/1?pageNo=' + pageNo + '&pageSize=' + pageSize + '&startDate=' + startDate + '&endDate=' + endDate + "&name=" + name,
    method: 'get'
  })
}

// 提现财务审核
export function withdrawCashlist(pageNo, pageSize, startDate, endDate, name) {
  return request({
    url: 'api/finance/audit/2?pageNo=' + pageNo + '&pageSize=' + pageSize + '&startDate=' + startDate + '&endDate=' + endDate + "&name=" + name,
    method: 'get'
  })
}

// 静态数据
export function pages() {
  return request({
    url: 'api/finance/profit',
    method: 'get'
  })
}
//提现时获取验证码
export function getEmailCode() {
  return request({
    url: 'api/finance/code',
    method: 'get'
  })
}
// 提现
export function withdraw(data) {
  return request({
    url: 'api/finance/cashTrade/2',
    method: 'post',
    data
  })
}

// 充值

export function topup() {
  return request({
    url: 'api/finance/pocket',
    method: 'get'
  })
}

// 充值金额
export function toup(data) {
  return request({
    url: 'api/finance/cashTrade/1',
    method: 'POST',
    data
  })
}

// 充值列表
export function topupList(pageNo, pageSize) {
  return request({
    url: 'api/finance/logs/1?pageNo=' + pageNo + '&pageSize=' + pageSize,
    method: 'get'
  })
}

export function topupQueryList(pageNo, pageSize, startDate, endDate, name) {
  return request({
    url: 'api/finance/logs/1?pageNo=' + pageNo + '&pageSize=' + pageSize + '&startDate=' + startDate + '&endDate=' + endDate + '&name=' + name,
    method: 'get'
  })
}

// 提现列表
export function withdrawList(pageNo, pageSize, startDate, endDate, name) {
  return request({
    url: 'api/finance/logs/2?pageNo=' + pageNo + '&pageSize=' + pageSize + '&startDate=' + startDate + '&endDate=' + endDate + '&name=' + name,
    method: 'get'
  })
}

export function withdrawQueryList(pageNo, pageSize, startDate, endDate, name) {
  return request({
    url: 'api/finance/logs/2?pageNo=' + pageNo + '&pageSize=' + pageSize + '&startDate=' + startDate + '&endDate=' + endDate + '&name=' + name,
    method: 'get'
  })
}

// 查询提现

// 审核
export function audit(data) {
  return request({
    url: 'api/finance/audit/',
    method: 'post',
    data
  })
}

export function auditList(data) {
  return request({
    url: 'api/finance/audit/',
    method: 'post',
    data
  })
}

// 现金钱包
export function cashlist(date,type,pageNo, pageSize) {
  return request({
    url: 'api/finance/detail/' + date + '/' + type +'?pageNo=' + pageNo + '&pageSize=' + pageSize,
    method: 'get',

  })
}

//积分收益
export function integral(pageNo, pageSize, startDate, endDate, name) {
  return request({
    url: 'api/finance/credit?pageNo=' + pageNo + '&pageSize=' + pageSize + '&startDate=' + startDate + '&endDate=' + endDate + "&name=" + name,
    method: 'get'
  })
}
