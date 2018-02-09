<template>
	<div class="userme">
		<el-card>
			<el-row>
				<el-col :span="8">
					<div class="tx">
						<img src="../assets/img/tx.jpg" alt="">
					</div>
				</el-col>
				<el-col :span="16">
					<el-row :gutter="20">
						<el-col :span="6" align="right">用户名：</el-col>
						<el-col :span="16">{{username||'暂未设置'}}</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="6" align="right">性别：</el-col>
						<el-col :span="16">{{gender||'暂未设置'}}</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="6" align="right">年龄：</el-col>
						<el-col :span="16">{{age||'暂未设置'}}</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="6" align="right">email：</el-col>
						<el-col :span="16">{{email||'暂未设置'}}</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="6" align="right">是否是管理员：</el-col>
						<el-col :span="16">
							<el-tag v-if="is_admin==true" type="success">是</el-tag>
							<el-tag v-else type="danger">否</el-tag>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="6" align="right">电话号码：</el-col>
						<el-col :span="16">{{phone_number||'暂未填写'}}</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="6" align="right">注册时间：</el-col>
						<el-col :span="16">{{sign_up_time}}</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="6" align="right">上次登录时间：</el-col>
						<el-col :span="16">{{last_login_time}}</el-col>
					</el-row>				
				</el-col>				
			</el-row>
		</el-card>
	</div>
</template>
<script>
	import API from '@/Api/api';
	export default{
		data(){
			return{		
						
			}
		},
		mounted(){			
			// console.log(this.$store.state.user)
		},
		computed:{
			username(){
				return this.$store.state.user.name;
			},
			age(){
				return this.$store.state.user.age;
			},
			email(){
				return this.$store.state.user.email;
			},
			is_admin(){
				return this.$store.state.user.is_admin;
			},
			phone_number(){
				return this.$store.state.user.phone_number;
			},
			gender(){
				return this.$store.state.user.gender;
			},

			last_login_time(){
				return this.$store.state.user.last_login_time;
			},
			sign_up_time(){
				return this.$store.state.user.sign_up_time
			}
		},
		methods:{
			
			
		}
	}
</script>
<style scoped lang="less">
	.userme{
		margin-top: 20px;		
		.el-col{					
			margin: 0 auto;
			.el-row{
				margin-bottom: 10px;
			}
		}
		.tx{
			width: 200px;
			height: 200px;
			overflow: hidden;			
			border-radius: 100%;
		}	
	}
	
</style>