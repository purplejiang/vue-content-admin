<template>
	<div class="article_detail">
		<el-card style="marginTop:20px;">
			<el-button
				size="small"
				@click="goback">返回</el-button>
		</el-card>	
		
		<el-card style="marginTop:20px;">
			<div slot="header" class="clearfix">
				<h1>{{title}}</h1>
				<el-row style="marginTop:15px;">
					<el-col :offset="12" :span="4">作者：{{author}}</el-col>	
					<el-col :span="8">创建时间：{{create_time}}</el-col>
								
				</el-row>
			</div>			
			<div class="content">
				{{content}}
			</div>
		</el-card>
		<el-card>
			<el-row>
				<el-col :span="6">
					阅读数： <el-tag>{{view_count}}</el-tag>
				</el-col>
				<el-col :span="6">
					点赞数： <el-tag>{{good_count}}</el-tag>
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
				title:'',
				author:'',
				content:'',
				view_count:0,
				good_count:0,
				create_time:''
			}
		},
		mounted(){
			this.getData();
		},
		methods:{
			getData(){
				let loading=this.$loading({
					target:".el-main"
				})
				const articleid=this.$route.params.id;				
				API.getBlogDetail(articleid).then(res=>{
					console.log('获取文章详情res:',res);					
					this.title=res.title;
					this.content=res.content;
					this.author=res.user_id;
					this.view_count=res.view_count;
					this.good_count=res.good_count;
					this.create_time=res.create_time;
					loading.close();					
				},err=>{
					console.log('获取文章详情出错:',err);
					this.$notify({
						message:`获取文章详情出错：${err.message}`,
						type:'error',
						duration:0
					})
				})
			},
			goback(){
				this.$router.go(-1);
			}
		}
	}
</script>
<style scoped lang="less">
.article_detail{
	h1{
		text-align: center;
		font-size: 28px;
	}
	.author{
		width: 100%;	
		text-align: right;
		display: table;
		margin-top: 20px;
	}
	.content{
		text-indent: 2em;
		margin-top: 20px;
		text-align: justify;
		clear: both;
	}
}

</style>