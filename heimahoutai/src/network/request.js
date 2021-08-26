import axios from 'axios';

// 创建请求的基本地址，可以根据环境不同配置不同的地址
// const baseURL = 'http://ttapi.research.itcast.cn/app/';
const baseURL = 'http://api-toutiao-web.itheima.net';
// const baseURL = process.env.BASE_URL   //在各自的环境变量配置文件中写入BASE_URL即可根据不同的编译环境配置不同的基本请求地址

// 创建axios'单例
const instance = axios.create({
  baseURL,
  timeout: 5000
});

// 添加请求拦截
instance.interceptors.request.use(config => {
  // 给请求头加入token验证字段
  config.headers.token = window.sessionStorage.getItem('token');
  return config;
}, err => Promise.reject(err));

// 添加响应拦截
instance.interceptors.response.use(res => {
  // 可以根据不同的状态码进行不同的操作，这里暂时只对成功请求的情况进行操作，其他的根据项目情况加入不同的状态码操作
  if (res.status === '200') {
    return res.data;
  }
}, err => Promise.reject(err));

// 封装get请求,因为get请求传递参数是直接拼接在地址中，因此需要将传递的参数写在config的params中
export function Get (url, params) {
  return instance.get(url, { params });
}

// 封装post请求
export function Post (url, data) {
  return instance.post(url, data);
}

// 封装delete请求
export function Delete (url) {
  return instance.delete(url);
}

// 封装put请求
export function Put (url, data) {
  return instance.put(url, data);
}

// 封装patch请求
export function Patch (url, data) {
  return instance.patch(url, data);
}
