import request from '@/utils/request'

export function initData(url, params) {
  return request({
    url: url,
    method: 'get',
    params
  })
}

export function getUserList(investorId, startDate,endDate,id,name,name1,pageNo,pageSize) {
  return request({
    url: 'api/users/list/'+investorId+'?pageNo='+pageNo+'&pageSize='+pageSize+'&startDate='+startDate+'&endDate='+endDate+"&name="+name+"&id="+id+"&name1="+name1,
    method: 'get'
  })
}
