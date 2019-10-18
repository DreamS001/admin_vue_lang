import request from '@/utils/request'
// 海报上传照片
export function img(data,file) {
  return request({
    url: 'api/product/upload',
    method: 'post',
    data,
    file
  })
}

//banner列表

export function bannerlist(pageNo, pageSize,name){
  return request({
    url:'api/banner?pageNo=' + pageNo + '&pageSize=' + pageSize+'&name='+name,
    method: 'get',
  })
}
// 增加、编辑
export function banneradd(data){
  return request({
    url:'api/banner',
    method: 'post',
    data,
  })
}

// 删除
export function bannerdel(id) {
  return request({
    url: 'api/banner/' + id,
    method: 'delete'
  })
}
// 查询动态公告列表
export function writerlist(pageNo, pageSize,name){
  return request({
    url:'api/mix/announcement?pageNo=' + pageNo + '&pageSize=' + pageSize+'&name='+name,
    method: 'get',
  })
}
// 增加、编辑
export function writeradd(data){
  return request({
    url:'api/mix/announcement',
    method: 'post',
    data,
  })
}
// 删除
export function writerdel(id) {
  return request({
    url: 'api/mix/announcement/' + id,
    method: 'delete'
  })
}
