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
					<div class="cell">用户名： {{username}}</div>
					<div class="cell">个人简介： 暂无</div>
					<!-- <div class="cell">文章数： <el-tag>{{articlenum}}</el-tag></div>
					<div class="cell">评论数： <el-tag type="success">{{commentnum}}</el-tag></div>		 -->			
				</el-col>				
			</el-row>
		</el-card>

		<!-- <el-upload
		  class="avatar-uploader"
		  action="https://jsonplaceholder.typicode.com/posts/"
		  :show-file-list="false"
		  :on-success="handleAvatarSuccess"
		  :before-upload="beforeAvatarUpload">
		  <img v-if="imageUrl" :src="imageUrl" class="avatar">
		  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
		</el-upload>
 -->
	</div>
</template>
<script>
	import API from '@/Api/api';
	export default{
		data(){
			return{				
				name:'',
				articlenum:'',
				commentnum:'',
				imageUrl: ''			
			}
		},
		mounted(){
			this.getData();
		},
		computed:{
			username(){
				return this.$store.state.user.token;
			}
		},
		methods:{
			getData(){
				let loading=this.$loading({
					target:".el-main"
				})
				API.getUserDetail().then(res=>{
					const data=res;
					setTimeout(()=>{
						this.name=data.name;
						this.articlenum=data.articlenum;
						this.commentnum=data.commentnum;
						loading.close();
					},1000);					
				},err=>{
					console.log(err);
	                loading.close();
	                this.$notify({
	                    message: `${err}`,
	                    type: 'error',
	                    duration: 1000
	                });
				})

			},
			// handleAvatarSuccess(res, file) {
		 //        this.imageUrl = URL.createObjectURL(file.raw);
		 //    },
		 //    beforeAvatarUpload(file) {
		 //        const isJPG = file.type === 'image/jpeg';
		 //        const isLt2M = file.size / 1024 / 1024 < 2;

		 //        if (!isJPG) {
		 //          this.$message.error('上传头像图片只能是 JPG 格式!');
		 //        }
		 //        if (!isLt2M) {
		 //          this.$message.error('上传头像图片大小不能超过 2MB!');
		 //        }
		 //        return isJPG && isLt2M;
		 //    }
		}
	}
</script>
<style scoped lang="less">
	.userme{
		margin-top: 20px;		
		.el-col{					
			margin: 0 auto;
		}
		.tx{
			width: 200px;
			height: 200px;
			overflow: hidden;			
			border-radius: 100%;
		}
		.cell{
			color: #494949;
			margin-bottom: 15px;
		}
	}
	.avatar-uploader .el-upload {
	    border: 1px dashed #d9d9d9;
	    border-radius: 6px;
	    cursor: pointer;
	    position: relative;
	    overflow: hidden;
	}
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>