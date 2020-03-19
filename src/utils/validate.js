
// 过滤特殊字符
export function stripscript(s) {
  var pattern = new RegExp("[`%~!@#$^&*()=|{ }':;',\\[\\].<>/?~！@#￥……&*（）&+;—|{}【】‘；：”“'。，、？]")
  var rs = "";
  for (var i = 0; i < s.length; i++) {
          rs = rs + s.substr(i, 1).replace(pattern, '');
      }
  return rs;
 }

//验证用户名邮箱
export function validateEmali(value){
	let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;	
    if(!reg.test(value)){      
        return false;
      }
       return true;
    }
//验证密码 6到20位数字+字母
export function validatePass(value){
    let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
    console.log(reg.test(value))
     if(!reg.test(value)){      
        return false;
      }
       return true;
    // return !reg.test(value) ? true :false;
}
//验证验证码
export function validateCode(value){
     let reg = /^[a-z0-9]{6}$/;
    if(!reg.test(value)){      
        return false;
      }
       return true;
}


/**
*没有使用default时，可以同时声明多个export。
*文件 import 需要花括号。
*/