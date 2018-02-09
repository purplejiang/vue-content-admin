<template>
	<div class="login_container">
		<div class="login_form">
			<div class="login_title">内容管理系统</div>
			<el-form :model="formLogin" :rules="rulesLogin" ref="formLogin">
          		<el-form-item prop="username">
            		<el-input type="text" v-model="formLogin.username" auto-complete="off" placeholder="输入用户名" @keyup.enter.native="submitForm('formLogin')"></el-input>
          		</el-form-item>
          		<el-form-item prop="password">
            		<el-input type="password" placeholder="输入密码" v-model="formLogin.password" auto-complete="off" @keyup.enter.native="submitForm('formLogin')" ></el-input>
          		</el-form-item>
          		<el-form-item align="center">
            		<el-button type="primary" @click="submitForm('formLogin')">登录</el-button>
            		<el-button @click="resetForm('formLogin')">重置</el-button>
          		</el-form-item>
        	</el-form>
			<!-- <div class="login-account">
	        	<span>账号：123</span><span>密码：123</span>
	        </div> -->
		</div>
	</div>
</template>

<script>	
	import localStore from '@/utils/localStore';
	import API from '@/Api/api';
	export default{
		data(){
			return{
				formLogin: {
			        username: '',
			        password: ''
			    },
			    rulesLogin: {
			        username: [
			          { required: true, message: '用户名不能为空', trigger: 'blur' }
			        ],
			        password: [
			          { required: true, message: '密码不能为空', trigger: 'blur' }
			        ]
		      	},
			}
		},
		mounted(){
			console.log(this.$route.query.redirect)
		},
		methods:{
			submitForm(name) {		    	
		    	this.$refs[name].validate((valid) => {
		        	if (valid) this.goLogin(); // 验证通过，前去登录
		      	});
		    },
		    goLogin(){
		    	const data={
		    		username:this.formLogin.username,
		    		password:this.formLogin.password
		    	}		    	
		    	API.login({
		    		email:this.formLogin.username,
		    		password:this.formLogin.password
		    	}).then(res=>{
		    		console.log('登录成功:',res);
		    		this.$message({
		    			message:'登录成功',
		    			type:'success'
		    		})
		    		const url = this.$route.query.redirect||'/';	    		
		    		//存储user到store中	
	    			this.$store.commit('SAVE_USER',res);
	    			console.log('user:',this.$store.state.user);
	    			localStore.setItem('boke_admin_user',this.$store.state.user);

	    			this.$router.push({path:decodeURIComponent(url)});
		    	},err=>{
		    		console.log('登录失败：',err);		    		
	    			this.$message({
	    				message:`登录失败：${err.message}`,
	    				type:'error'
	    			})
		    		
		    	})		    	
		    },		    
			resetForm(name) { // 重置表单		    	
		      	this.$refs[name].resetFields();
		    },
		}
	}
</script>
<style scoped lang="less">	
	.el-form-item__content{
		text-align: center;
	}
	.login_container{		
		width: 100%;
		height: 100%;
		position: relative;
		background: #304156;
		.login_form{
			position: absolute;
		    top: 50%;
		    left: 50%;
		    margin: -230px 0 0 -180px;
		    width: 310px;
		    height: 240px;
		    padding: 25px;
		    box-shadow: 0 0 100px rgba(0,0,0,.08);
		    background-color: #fff;
		    border-radius: 4px;
		    z-index: 3;		  
		    .login_title{
		    	text-align: center;
			    height: 40px;
			    line-height: 40px;
			    cursor: pointer;
			    font-size: 16px;
        		text-transform: uppercase;
		    }
		    .login-account {
		      	color: #999;
		      	text-align: center;
		      	margin-top: -15px;
		     	span {
		        	font-size: 12px;
		        	&:first-child {
		          		margin-right: 16px;
		        	}
		      	}
		    }

		}
	}	
	
</style>