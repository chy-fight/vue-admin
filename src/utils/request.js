import axios from 'axios'
import {Message} from 'element-ui';

//创建axios，赋给变量service
const BASERL = process.env.NODE_ENV === 'production' ? '' : '/api';

const service = axios.create({
	  baseURL: BASERL,
      timeout: 2000,
});

// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器  从服务器请求了相关的数据之后做的响应拦截
service.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    let data = response.data
    if (data.resCode !== 0) {
        Message.error(data.message);
        return Promise.reject(data); //错误的信息返回前台
    }else{
        return response;  //返回正确的
        
    }
    
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });




export default service;