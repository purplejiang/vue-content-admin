<template>
	<div class="article_detail">
		<el-card style="marginTop:20px;">
			<el-button @click="goback">返回</el-button>
		</el-card>
		<el-card style="marginTop:20px;">
			<h1>{{title}}</h1>
			<div class="author">
				{{author}}
			</div>
			<div class="content">
				{{content}}
			</div>
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
				content:''
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
				console.log('当前文章id：',articleid);
				API.getArticleDetail().then(res=>{
					const data=res;
					setTimeout(()=>{
						this.title=data.title;
						this.author=data.author;
						this.content=data.content;
						loading.close();
					},1000)
				},err=>{
					console.log(err);
					this.$notify({
						message:`获取文章详情出错：${err}`,
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
	}
	.author{
		width: 100%;
		// float: right;
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