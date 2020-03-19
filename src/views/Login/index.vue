<template>
	<div id="login">
	   <div class="login-wrap">
	   	   <ul class="menu-tab">
	   	   	  <li v-for="item in menuTab" :class="{'current': item.current}" @click="toggleMenu(item)" :key="item.id">{{item.txt}}</li>
	   	   </ul>
	   	   <el-form :model="ruleForm" status-icon :rules="rules" ref="loginForm" class="login-form"size="medium">
             
              <el-form-item prop="username" class="item-form">
              	<label for="username">邮箱</label>
                <el-input id="username" type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
              </el-form-item>
              
              <el-form-item  prop="password" class="item-form">
              	<label for="password">密码</label>
                <el-input id="password" type="password" maxlength="20" minlength="6" v-model="ruleForm.password" autocomplete="off"></el-input>
              </el-form-item>

               <el-form-item  prop="passwords" class="item-form" v-show="model === 'register'">
              	<label for="passwords">重复密码</label>
                <el-input id="passwords" type="password" maxlength="20" minlength="6"v-model="ruleForm.passwords" autocomplete="off"></el-input>
              </el-form-item>
             
              <el-form-item  prop="code" class="item-form">
              	 <label for="code">验证码</label>

              	 <el-row :gutter="11">
                     <el-col :span="15"> 
                     	<el-input id="code" v-model="ruleForm.code"></el-input> </el-col>
                     <el-col :span="9">
                     	<el-button type="success" class="block" :disabled="codeButtonStatus.status" @click="getsms()">{{codeButtonStatus.text}}</el-button> </el-col>    
                  </el-row> 

              </el-form-item>
              <el-form-item>

                <el-button type="danger" @click="submitForm('loginForm')" class="login-btn block"
                :disabled="loginButtonStatus"> {{model === 'login' ?'登录':'注册'}}</el-button>              
              </el-form-item>
           </el-form>
	   </div>
	</div>
</template>

<script>
	//引入js校验文件
  import { Message } from 'element-ui';
  import { GetSms, Register }  from '@/api/login'
  import { reactive, ref, isRef, onMounted} from '@vue/composition-api'
  import { stripscript,validatePass,validateEmali,validateCode,} from '@/utils/validate';
    export default{
     	name: 'login',      
      //setup (props, context){
         //root: (...)
         //parent: (...)
         //refs: (...)
         //attrs: (...)
         //listeners: (...)
         //emit: (...)       
        setup (props, {refs, root}){
        //验证用户名     
        let validateUsername = (rule, value, callback) => {       
          if (value === '') {
          return callback(new Error('请输入用户名'));
          } else if(!validateEmali(value)){
          return callback(new Error('用户名不规范'));
          } else{           
            callback();
          }
        };
        //验证密码
        let validatePassword = (rule, value, callback) => {
        //过滤后的数据   
        ruleForm.password = stripscript(value)
        value = ruleForm.password       
          if (value === '') {
          return callback(new Error('请输入密码'));
          } else if (!validatePass(value)) {
            callback(new Error('密码为6到20位数字+字母'));
          } else {
            callback();
          }
        };
         //验证重复密码
        let validatePasswords = (rule, value, callback) => {
        //如果模块值为login 直接通过
        if (model.value === 'login') {
          callback();
        }
        //过滤后的数据      
        ruleForm.passwords = stripscript(value)
        value = ruleForm.passwords       
          if (value === '') {
          return callback(new Error('请再次输入密码'));
          } else if (value != ruleForm.password) {
            callback(new Error('重复密码不正确'));
          } else {
            callback();
          }
        };
        //验证验证码
        let code = (rule, value, callback) => {
        //过滤后的数据
        ruleForm.code = stripscript(value)
        value = ruleForm.code      
          if (value === '') {
          return callback(new Error('验证码不能为空'));
          } else if(!validateCode(value)){
           callback(new Error('验证码格式有误'));
          }  else{
            callback();
          }  
        };   
        //这里放置数据data，生命周期，自定义的函数，
        

        /**
         *声明数据
         */

        //菜单切换数据data  //声明对象类型 reactive函数 
        const menuTab = reactive ([
              { txt: '登录',current : true, type:'login'},
              { txt: '注册',current : false, type:'register'}
        ])
        //模块值  //声明基础数据 ref函数
        const model = ref('login') 
        //登录按钮禁用状态
        const loginButtonStatus = ref(false)
        //验证码按钮禁用状态
        const codeButtonStatus =reactive(
           {
            status:false,
            text:'获取验证码'
           }
        )
       //倒计时
       const timer = ref(null);



        //表单的数据
        const ruleForm = reactive({
          username: '',
          password: '',
          passwords: '',
          code: ''
        }) 
        // 校验规则
        const rules = reactive({
          // 校验用户名，主要通过validator来指定验证器名称   //何事件触发
          username: [
            { validator: validateUsername, trigger: 'blur' }
          ],
          password: [
            { validator: validatePassword, trigger: 'blur' }
          ],
          passwords: [
            { validator: validatePasswords, trigger: 'blur' }
          ],
          code: [
            { validator: code, trigger: 'blur' }
          ]
        }) 


        /**
         *声明函数
         */
        //点击数据事件函数方法
        const toggleMenu =(data =>{
          //高光初始化
          menuTab.forEach(elem => {
            elem.current = false
          });
           //添加高光
            data.current = true
           //修改模块值
          model.value = data.type 
           //重置表单
          refs['loginForm'].resetFields();
           //重置提交和验证码按钮
          loginButtonStatus.value = false
          codeButtonStatus.status = false
          codeButtonStatus.text ='获取验证码'
          clearInterval(timer.value)
        }) 


         /**
          *获取验证码
          */
         const getsms = (() =>{
         //进行提示         
         if (ruleForm.username == '') {
           root.$message.error('邮箱不能为空！！');
           return false
         } 
          if (validateEmali(ruleForm.username) == false) {
           root.$message.error('邮箱格式有误，请重新输入！！');
            return false
         }  

           console.log(validateEmali(ruleForm.username)); 

          //请求的接口 （获取验证码） 校验邮箱是否存在 
           let requestData ={
              username:ruleForm.username,
              module:model.value
              }
             //修改获取验证码的状态
              codeButtonStatus.status = true
              codeButtonStatus.text ='发送中'

            //延时多长时间
            GetSms(requestData).then(responce => {
               let data =responce.data
               root.$message({
                message:data.message,
                type:'success'             
               })
               //启用登录或注册按钮
               loginButtonStatus.value = false               
               //调用定时器 开始计时
               countDown(60)
               console.log(data)
            }).catch(error => {
              console.log(error);
            })     
         })
 
 
         /**
          *提交表单
          */
         const submitForm =(formName =>{
          toggleMenu(menuTab[0])

          return false
          // 为给定 ID 的 user 创建请求     
          refs[formName].validate((valid) => {
             if (valid) {
               let requestData = {
                username: ruleForm.username,
                password: ruleForm.password,
                code: ruleForm.code,
                module:'register'
               }
              Register(requestData).then(responce =>{
                console.log(requestData)                
                 let data = responce.data
                 root.$message({
                  message:data.message,
                  type:'success',                  
                 })
              }).catch(error =>{
                
              })
             } else {
               console.log('error submit!!');
               return false;
             }
          })
        }) 

        /**
         *倒计时
         */
        
        const countDown= ((number) => {
          //两种倒计时
          // setsetTimeout  只执行一次   
          // setInterval  不断的执行 需要条件才能停止

         let time = number 
         timer.value = setInterval(() =>{
            time--
            if (time === 0) {
              clearInterval(timer.value)
              codeButtonStatus.status = false
              codeButtonStatus.text = '再次获取'   
            }else{
              codeButtonStatus.text = `倒计时${time}秒`  //'倒计时'+ time + '秒'
            }           
         },1000)
        })



        /**
         *生命周期
         */

        //挂载完成后
        onMounted(() => {
            
        })

        return{
          menuTab,
          model,
          ruleForm,
          rules,
          toggleMenu,
          submitForm,
          getsms,
          loginButtonStatus,
          codeButtonStatus
        }

      },
  }
</script>

<style lang="scss" scoped>
	#login{
		height:100vh;
		background-color:#344a5f;
	}
	.login-wrap{
		width:330px;
		margin:auto;
	}
	.menu-tab{
		text-align:center;
	  li{
	  	display:inline-block;
	  	width:88px;
	  	line-height:36px;
	  	font-size:14px;
	  	color:#fff;
	  	border-radius:2px;
	  	cursor:pointer;
	  }
	  .current{
	  	background-color:#214c75;
	  }
	}
	.login-form{
		margin-top:20px;
	   label{
	   	display:block;
	   	font-size:14px;
	   	color:#fff;
        margin-bottom:3px;
	   }
	}
    .item-form{
    	margin-bottom:13px;
    }
    .block{
    	width:100%;
    	display:block;
    }
    .login-btn{
    	margin-top:19px;
    }
</style>