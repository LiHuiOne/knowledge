import axios from "axios"; // 注意先安装
import config from "./config.js"; // 倒入默认配置
import {
    ElMessage
} from "element-plus";
import {
    isString
} from "util";
//配置请求和响应拦截器(axios的二次封装)
export default function $axios(options) {
    return new Promise((resolve, reject) => {
        const instance = axios.create({
            baseURL: config.baseURL,
            headers: config.headers
        });
        // request 拦截器
        instance.interceptors.request.use(config => {
                if(localStorage.getItem('token')){
                    //请求头添加token,   
                    //Bearer: node服务器检验token过期需要请求头加入Bearer和空格+token
                    config.headers['Authorization']='Bearer'+" "+localStorage.getItem('token')
                }
                return config;
            },
            err => {
                ElMessage.error({
                    message: "请求超时!"
                });
                return Promise.resolve(err);
            }
        );

        // response 拦截器
        instance.interceptors.response.use(
            response => {
                let data;
                if (response.data == undefined) {
                    data = response.request.responseText;
                } else {
                    data = response.data;
                }
                if (!isString(data) && data.success !== undefined && !data.success) {
                    ElMessage.error({
                        message: data.i18nMessage
                    });
                }
                return data;
            },
            err => {
                if (err && err.response) {
                    switch (err.response.status) {
                        case 400:
                            err.message = "请求错误";
                            break;
                        case 401:
                            err.message = "token过期，请重新登录";
                            //  可以在此移除本地缓存
                            localStorage.removeItem('token')
                            break;
                        case 403:
                            err.message = "拒绝访问";
                            break;

                        case 404:
                            err.message = `请求地址出错: ${err.response.config.url}`;
                            break;

                        case 408:
                            err.message = "请求超时";
                            break;

                        case 500:
                            err.message = "服务器内部错误";
                            break;

                        case 501:
                            err.message = "服务未实现";
                            break;

                        case 502:
                            err.message = "网关错误";
                            break;

                        case 503:
                            err.message = "服务不可用";
                            break;

                        case 504:
                            err.message = "网关超时";
                            break;

                        case 505:
                            err.message = "HTTP版本不受支持";
                            break;

                        default:
                    }
                }
                if (err.response.status !== 401) {
                    ElMessage.error({
                        message: err.message
                    });
                }else{
                    window.location.reload();
                }
                return Promise.reject(err); // 返回接口返回的错误信息
            }
        );

        // 请求处理
        instance(options)
            .then(res => {
                resolve(res);
                return false;
            })
            .catch(error => {
                reject(error);
            });
    });
}