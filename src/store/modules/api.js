// const baseUrl = 'http://fpt.urfpt.com'
// const baseUrl = process.env.BASE_API

// 新增 2019.10.14 10：12
let baseUrl = '/api';
if (process.env.NODE_ENV == 'development') {
    baseUrl = "/api";
}else if(process.env.NODE_ENV == 'testing'){
    // baseUrl = "http://fpt.urfpt.com";
    baseUrl = "http://investor.jie360.com.cn";
}else if(process.env.NODE_ENV == 'production'){
    baseUrl = "https://pc.fptvip.com";
}

const api = {
  state: {
    // 实时控制台
    socketApi: baseUrl + '/websocket?token=kl',
    // 图片上传
    imagesUploadApi: baseUrl + '/api/pictures',
    // 图片上传2
    imagesUploadApiNew: baseUrl + '/api/product/upload',
    // 修改头像
    updateAvatarApi: baseUrl + '/api/users/updateAvatar',
    // 上传文件到七牛云
    qiNiuUploadApi: baseUrl + '/api/qiNiuContent',
    // Sql 监控
    sqlApi: baseUrl + '/druid',
    // swagger
    swaggerApi: baseUrl + '/swagger-ui.html'
  }
}

export default api
