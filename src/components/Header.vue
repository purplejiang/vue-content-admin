<template>
	<el-row class="admin_header" type="flex">
		<el-col :xs="12" :sm="12" :md="12" :lg="12">
			<a class="header_logo" href="javascript:;"></a>
			<a href="javascript:;" class="header_home">
				<span>内容管理系统</span>
			</a>
		</el-col>
		<el-col :xs="12" :sm="12" :md="12" :lg="12">
			<el-dropdown trigger="click" class="header_info" @command="handleCommand">
				<a href="javascript:void(0)" class="name">
					{{username}}<i class="el-icon-caret-bottom el-icon--right"></i>
				</a>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item><router-link to="/user/me">个人中心</router-link></el-dropdown-item>
					<!-- <el-dropdown-item>重置密码</el-dropdown-item> -->
					<el-dropdown-item command="signOut">退出</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</el-col>
	</el-row> 
</template>
<script>
import localStore from '@/utils/localStore';
import API from '@/Api/api';
export default {  
	data(){
		return{

		}
	},
	computed:{
		username(){
			return this.$store.state.user.email;
		}
	},
	methods:{
		handleCommand(command) { // 点击菜单项触发的事件回调
			console.log(command)
			if(command=='signOut'){
				API.logout().then(res=>{
					console.log('退出登录res:',res);
					this.$store.commit('LOGOUT');
					localStore.removeItem('boke_admin_user');
					// console.log(this.$store.state.user);
					this.$router.replace({path:'/login'});
				},err=>{
					console.log('调用登出接口出错：',err);
					this.$notify({
						message:`调用登出接口出错: ${err.message}`,
						type:'error',
						duration:0
					})
				})
				
			}
		}
	}
}
</script>

<style scoped lang="less">

.el-col{	
	height: 60px;	
}
.admin_header{	
	.header_logo {
    	position: relative;
      	display: block;
      	width: 60px;
      	background: #0087b4;
      	font-size: 28px;
      	color: #FFF;
      	text-align: center;
     	height: 60px;
      	line-height: 60px;
      	overflow: hidden;
      	float: left;      
    }
    .header_home{
    	display: block;
      	height: 60px;
      	float: left;
      	box-sizing: border-box;      
      	width: 140px;
		text-align: center;
      	color: #fff;
      	font-size: 14px;
      	line-height: 60px;
      	border-right: 1px solid #008fbf;      	
    }
    .header_info{
    	float: right;
      	width: 100px;
      	line-height: 60px;
      	padding: 0 10px;
      	height: 60px;
      	display: block;
      	z-index: 2;
      	background: #09c;
      	color: #fff;
      	font-size: 14px;
      	border-left: 1px solid #008fbf;
      	text-align: center;
      	text-overflow: ellipsis;
      	white-space: nowrap;
      	overflow: hidden;     
      	.name{
      		display: block;
        	width: 100%;
        	color: #fff;
       	 	font-size: 14px;
      	}
      	.el-dropdown-menu {
        	padding: 0 !important;
        	.el-dropdown-menu__item {
          		padding: 0 10px;
          		height: 30px;
          		line-height: 30px;
        	}
      	}
    }
}
</style>