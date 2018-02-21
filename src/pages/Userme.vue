<template>
	<div class="userme">
		<el-dialog :visible.sync="isshowdialog" title="修改基本信息" center width="500px">
			<el-form :model="userdetailForm" ref="userdetailForm" size="small" label-width="100px">
                <el-form-item label="用户名称：">
                    <el-input v-model="userdetailForm.name" auto-complete="off"></el-input>
                </el-form-item>
                 <el-form-item label="性别：">
                    <el-radio v-model="userdetailForm.gender" label="0">男</el-radio>
                    <el-radio v-model="userdetailForm.gender" label="1">女</el-radio>
                </el-form-item>
                <el-form-item label="年龄：">
                    <el-input v-model="userdetailForm.age" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="电话号码：">
                    <el-input v-model="userdetailForm.phone_number" auto-complete="off"></el-input>
                </el-form-item>
                 <el-form-item label="个人简介：">
                    <el-input v-model="userdetailForm.description" type="textarea" :rows="4" auto-complete="off"></el-input>
                </el-form-item>
			</el-form>
			<div slot="footer">
				<el-button @click="isshowdialog=false" size="small">取消</el-button>
				<el-button type="primary" size="small" @click="updateUser">确定</el-button>
			</div>
		</el-dialog>
		<el-card>
			<div slot="header" class="clearfix">
				<span>基本信息</span>
				<el-button type="primary" size="small" icon="el-icon-edit"
					@click="showUpdateDialog"
					style="float:right;font-size:18px;padding:4px 10px;"></el-button>
			</div>
			<el-row :gutter="20">
				<el-col :span="6" align="right">用户名：</el-col>
				<el-col :span="16">{{user.name||'暂未设置'}}</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="6" align="right">性别：</el-col>
				<el-col :span="16">
					<span v-if="user.gender==1">女</span>
					<span v-else>男</span>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="6" align="right">年龄：</el-col>
				<el-col :span="16">{{user.age||'暂未设置'}}</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="6" align="right">是否是管理员：</el-col>
				<el-col :span="16">
					<el-tag v-if="user.is_admin==true" type="success">是</el-tag>
					<el-tag v-else type="danger">否</el-tag>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="6" align="right">电话号码：</el-col>
				<el-col :span="16">{{user.phone_number||'暂未填写'}}</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="6" align="right">注册时间：</el-col>
				<el-col :span="16">{{user.sign_up_time}}</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="6" align="right">上次登录时间：</el-col>
				<el-col :span="16">{{user.last_login_time}}</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="6" align="right">个人简介：</el-col>
				<el-col :span="16">{{user.description}}</el-col>
			</el-row>
		</el-card>
		<el-card style="marginTop:20px">
			<div slot="header">
				<span>邮箱信息</span>
			</div>
			<el-row :gutter="20" style="lineHeight:32px;">
				<el-col :span="6" align="right">email地址：</el-col>
				<el-col :span="16">
					<span>{{user.email||'暂未设置'}}</span>
					<el-button type="primary" size="small" style="marginLeft:20px;" @click="updateEmail">修改</el-button>
				</el-col>
			</el-row>
		</el-card>
		<el-card style="marginTop:20px;">
			<div slot="header">
				<span>头像</span>
			</div>
			<el-row :gutter="20">
				<el-col :span="4" align="right">当前头像</el-col>
				<el-col :span="18">
					<div class="imgbox">
						<div class="imguser imgbig">
							<img :src="imgbaseURL+user.avatar_large">
						</div>
						<span>120*120</span>
					</div>
					<div class="imgbox">
						<div class="imguser imgmedium">
							<img :src="imgbaseURL+user.avatar_mid">
						</div>
						<span>90*90</span>
					</div>
					<div class="imgbox">
						<div class="imguser imgsmall">
							<img :src="imgbaseURL+user.avatar_small">
						</div>
						<span>48*48</span>
					</div>
				</el-col>
			</el-row>
			<el-row>
				<el-col :offset="4">
					<el-button type="primary" size="small" style="marginTop:20px"
						@click="changeAvatar">修改头像</el-button>
				</el-col>
			</el-row>
		</el-card>
		<cropper></cropper>
		<el-card style="margin:20px 0;">
			<div slot="header">
				<span>修改密码</span>
			</div>
			<el-row>
				<el-col :span="16">
					<el-form label-width="200px" status-icon ref="passwordForm" :model="passwordForm" :rules="passwordrule">
						<el-form-item label="当前密码：" prop="oldpassword">
							<el-input v-model="passwordForm.oldpassword" type="password" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="新密码：" prop="newpassword">
							<el-input v-model="passwordForm.newpassword" type="password" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="确认密码：" prop="confirmpassword">
							<el-input v-model="passwordForm.confirmpassword" type="password" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" size="small" @click="submit('passwordForm')">确认</el-button>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
		</el-card>
	</div>
</template>
<script>
	import API from '@/Api/api';
	import {imgbaseURL} from '@/utils/config';
	import cropper from '@/components/cropper';
	export default{
		data(){
			var validpass1=(rule,value,callback)=>{
				if(value!==''){
					if(this.passwordForm.confirmpassword!==''){
						this.$refs.passwordForm.validateField('confirmpassword');
					}
					callback();
				}
			}
			var validpass2=(rule,value,callback)=>{
				if(value!==''){
					if(value!=this.passwordForm.newpassword){
						callback(new Error('两次输入的密码不一致'))
					}else{
						callback();
					}
				}
			}
			return{
				user:{},
				imgbaseURL:'',
				userdetailForm:{
					// name:'',
					// age:'',
					// gender:'',
					// email:'',
					// phone_number:''
				},
				passwordForm:{
					oldpassword:'',
					newpassword:'',
					confirmpassword:''
				},
				passwordrule:{
					oldpassword:[
						{required:true,message:'请输入当前密码',trigger:'blur'}
					],
					newpassword:[
						{required:true,message:'请输入新密码',trigger:'blur'},
						{validator:validpass1,trigger:'blur'}

					],
					confirmpassword:[
						{required:true,message:'请再次输入密码',trigger:'blur'},
						{validator:validpass2,trigger:'blur'}
					]
				},
				isshowdialog:false
			}
		},
		components:{
			cropper
		},
		mounted(){
			this.imgbaseURL=imgbaseURL;
			this.getData();
		},
		computed:{
			username(){
				return this.$store.state.user.name;
			},
			id(){
				return this.$store.state.user.id;
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
			getData(){
				let id=this.$store.state.user.id;
				let loading=this.$loading({
					target:'.el-main'
				})
				API.getUserDetail(id).then(res=>{
					console.log('获取用户详细信息res:',res);
					this.user=res;
					loading.close();
				},err=>{
					console.log('获取用户详情出错:',err);
					this.$notify({
						message:`获取用户详情出错${err.message}`,
						type:'error',
						duration:0
					})
				})
			},
			//显示修改用户信息的对话框
			showUpdateDialog(){
				this.isshowdialog=true;
				this.userdetailForm=this.user;
			},
			//修改邮箱
			updateEmail(){
				this.$message({
					message:'修改邮箱地址功能暂待开发',
					type:'success'
				})
			},
			//修改用户头像
			changeAvatar(){
				this.$message({
					message:'修改用户头像功能暂待开发',
					type:'success'
				})
			},
			//修改用户基本信息
			updateUser(){
				console.log(this.userdetailForm);
				API.updateUser({
					name:this.userdetailForm.name,
					age:this.userdetailForm.age,
					gender:this.userdetailForm.gender,
					phone_number:this.userdetailForm.phone_number,
					description:this.userdetailForm.description
				}).then(res=>{
					console.log('修改用户基本信息res：',res);
					this.$message({
						message:'修改成功',
						type:'success'
					})
					this.isshowdialog=false;
					this.getData();
				},err=>{
					console.log('修改用户基本信息出错：',err);
					this.$notify({
						message:`修改用户基本信息出错：${err.message}`,
						type:'error',
						duration:0
					})
				})
			},
			//提交修改密码
			submit(name){
				this.$refs[name].validate(valid=>{
					if(valid){
						let loading=this.$loading({
							target:'.el-main'
						})
						API.changePassword({
							old_password:this.passwordForm.oldpassword,
							new_password:this.passwordForm.newpassword
						}).then(res=>{
							console.log('修改用户密码res：',res);
							this.$message({
								message:'修改密码成功',
								type:'success'
							})
							this.passwordForm.oldpassword='';
							this.passwordForm.newpassword='';
							this.passwordForm.confirmpassword='';
							loading.close();
						},err=>{
							console.log('修改用户密码出错：',err);
							this.$notify({
								message:`修改用户密码出错：${err.message}`,
								type:'error',
								duration:0
							})
							loading.close();
						})
					}else{
						console.log('err submit.');
						return false;
					}
				})
			}

		}
	}
</script>
<style scoped lang="less">
	.userme{
		margin-top: 20px;
		.el-card{
			.el-row{
				margin-bottom: 7px;
			}
		}

	}

	.clearfix:before,
	.clearfix:after {
	    display: table;
	    content: "";
	}
	.clearfix:after {
	    clear: both
	}
	.imgbox{
		display:inline-block;
		margin-right:30px;
		.imguser{
			img{
				display:block;
				width:100%;
			}
		}
		span{
			display:block;
			width:100%;
			text-align:center;
			margin-top:10px;
		}
	}
	.imgbig{
		width:120px;
		height:120px;

	}
	.imgmedium{
		width:90px;
		height:90px;

	}
	.imgsmall{
		width:48px;
		height:48px;

	}
</style>