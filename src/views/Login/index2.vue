<template>
	<div id="login">
	   <div class="login-wrap">
	   	   <ul class="menu-tab">
	   	   	  <li v-for="item in menuTab" :class="{'current': item.current}" @click="toggleMenu(item)" :key="item.id">{{item.txt}}</li>
	   	   </ul>
	   	   <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"  class="login-form"size="medium">
             
              <el-form-item prop="username" class="item-form">
              	<label>邮箱</label>
                <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
              </el-form-item>
              
              <el-form-item  prop="password" class="item-form">
              	<label>密码</label>
                <el-input type="text" maxlength="20" minlength="6" v-model="ruleForm.password" autocomplete="off"></el-input>
              </el-form-item>

               <el-form-item  prop="passwords" class="item-form" v-show="model === 'register'">
              	<label>重复密码</label>
                <el-input type="text" maxlength="20" minlength="6" v-model="ruleForm.passwords" autocomplete="off"></el-input>
              </el-form-item>
             
              <el-form-item  prop="code" class="item-form">
              	 <label>验证码</label>

              	 <el-row :gutter="11">
                     <el-col :span="15"> 
                     	<el-input v-model.number="ruleForm.code"></el-input> </el-col>
                     <el-col :span="9">
                     	<el-button type="success" class="block">获取验证码</el-button> </el-col>    
                  </el-row> 

              </el-form-item>
              <el-form-item>

                <el-button type="primary" @click="submitForm('ruleForm')" class="login-btn block">提交</el-button>              
              </el-form-item>
           </el-form>
	   </div>
	</div>
</template>

<script>
	//引入js校验文件
	import {stripscript,validatePass,validateEmali,validateCode,} from '@/utils/validate';
    export default{
     	name: 'login',
     	data(){ 
     	//验证用户名   	
        var validateUsername = (rule, value, callback) => {       
          if (value === '') {
          return callback(new Error('请输入用户名'));
          } else if(!validateEmali(value)){
          return callback(new Error('用户名不规范'));
          } else{           
            callback();
          }
        };
        //验证密码
        var validatePassword = (rule, value, callback) => {
        //过滤后的数据
        console.log(stripscript(value))
        this.ruleForm.password = stripscript(value)
        value = this.ruleForm.password       
          if (value === '') {
          return callback(new Error('请输入密码'));
          } else if (!validatePass(value)) {
            callback(new Error('密码为6到20位数字+字母'));
          } else {
            callback();
          }
        };
         //验证重复密码
        var validatePasswords = (rule, value, callback) => {
        //如果模块值为login 直接通过
        if (this.model === 'login') {
        	callback();
        }
        //过滤后的数据
        console.log(stripscript(value))
        this.ruleForm.passwords = stripscript(value)
        value = this.ruleForm.passwords       
          if (value === '') {
          return callback(new Error('请再次输入密码'));
          } else if (value != this.ruleForm.password) {
            callback(new Error('重复密码不正确'));
          } else {
            callback();
          }
        };
        //验证验证码
        var code = (rule, value, callback) => {
        //过滤后的数据
        this.ruleForm.code = stripscript(value)
        value = this.ruleForm.code      
          if (value === '') {
          return callback(new Error('验证码不能为空'));
          } else if(!validateCode(value)){
           callback(new Error('验证码格式有误'));
          }  else{
          	callback();
          }  
        };
     	return {
     	//菜单切换数据data
     	menuTab:[
              { txt: '登录',current : true, type:'login'},
              { txt: '注册',current : false, type:'register'}
     	],
     	//模块值
     	model:'login',
     	//表单的数据
        ruleForm: {
          username: '',
          password: '',
          passwords: '',
          code: ''
        },
          // 校验规则
        rules: {
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
        }
      }		
    },
     	created(){},
     	mounted(){},
     	//写函数的地方
     	methods:{
     	//点击数据事件函数方法
     	toggleMenu(data){
     		//高光初始化
     		console.log(data)
     	 	this.menuTab.forEach(elem => {
     	 		elem.current = false
     	 	});
     	 	//添加高光
     	 	data.current = true
            //修改模块值
            this.model = data.type
     	 	},
     	//提交表单
     	submitForm(formName) {
            this.$refs[formName].validate((valid) => {
              if (valid) {
                alert('submit!');
              } else {
                console.log('error submit!!');
                return false;
              }
            });
          }  
        }
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