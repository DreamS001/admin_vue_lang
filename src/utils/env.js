/*
 * 配置编译环境和线上环境之间的切换
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * DEBUG: debug状态
 * cancleHTTP: 取消请求头设置
 */
let baseUrl = '/auth';
if (process.env.NODE_ENV == 'development') {
    // baseUrl = "http://shipz.jie360.com.cn";
    // baseUrl = "http://pc.jie360.com.cn";
    baseUrl="/auth"
}else if(process.env.NODE_ENV == 'testing'){
    baseUrl = "http://investor.jie360.com.cn";
    // baseUrl = "http://shipz.jie360.com.cn";
    // baseUrl = "http://linf01.jie360.com.cn";
}else if(process.env.NODE_ENV == 'production'){
    baseUrl = "https://pc.urfpt.com";
}
export{
    baseUrl
}
