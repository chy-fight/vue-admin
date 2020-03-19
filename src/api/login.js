 import service from '@/utils/request'
 /**
  *获取验证码
  */
 export function GetSms(data){
  return service.request({
	method: 'post',
    url: '/getSms/',
    data
    // data:data,左边的data是变量名（key）后台接收的。右边的data是接收的数据。如果两者是同名的情况下。可以写成一个即可（es6）
    })
 }
 /**
  *获取用户角色
  */


 /**
  *登录
  */


 /**
 *注册
 */
  export function Register(data){
   return service.request({
	method: 'post',
    url: '/register/',
    data
    // data:data,左边的data是变量名（key）后台接收的。右边的data是接收的数据。如果两者是同名的情况下。可以写成一个即可（es6）
    })
 }