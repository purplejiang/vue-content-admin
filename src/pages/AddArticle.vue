<template>
	<div>
		<el-card style="marginTop:20px;">
	        <div class="button-group">
	            <el-button size="small" type="primary" icon="el-icon-back"
	                       style="margin-right: 10px" @click="toArticleList">
	                文章列表
	            </el-button>
	        </div>
	    </el-card>
		<el-card style="marginTop:20px">
			<el-form ref="form" :model="form" label-width="90px" :rules="rulesLogin">
				<el-form-item label="文章标题" prop="title">
					<el-input v-model="form.title" placeholder="输入文章标题"></el-input>
				</el-form-item>
				<el-form-item label="文章作者" prop="author">
					<el-input v-model="form.author" placeholder="输入文章作者" readonly></el-input>
				</el-form-item>
				<el-form-item label="文章分类" prop="category_id">
	    			<el-select v-model="form.category_id" placeholder="请选择文章分类">
	      				<el-option v-for="(item,index) in categories" :label="item.name" :value="item.id" :key="index"></el-option>	      				
	    			</el-select>
	 			</el-form-item>	 			
	 			<el-form-item label="文章内容" prop="content">
	 				<el-input type="textarea" v-model="form.content"
	 					placeholder="输入文章内容" :rows="20"></el-input>
	 			</el-form-item>
	 			<el-form-item>
				    <el-button type="primary" @click="onSubmit('form')">提交</el-button>				  
				</el-form-item>
			</el-form>
		</el-card>		
	</div>
</template>
<script>
	import API from '@/Api/api';	
	export default{
		data(){
			return{
				form:{
					title:'',
					category_id:'',
					author:'',
					content:''
				},
				articleid:'',
				categories:[],
				rulesLogin: {
			        title: [
			            { required: true, message: '文章标题不能为空', trigger: 'blur' }
			        ],
			        author: [
			            { required: true, message: '文章作者不能为空', trigger: 'blur' }
			        ],
			        category_id:[
			        	{ required: true, message: '请选择文章分类', trigger: 'change' }
			        ],
			        content:[
			        	{ required: true, message: '文章内容不能为空', trigger: 'blur' }
			        ]
		      	},
			}
		},		
		mounted(){
			const articleid=this.$route.params.id;
			if(articleid){
				console.log('编辑文章id：',articleid);
				this.getArticleDetailData(articleid);
			}
			this.articleid=articleid;
			this.form.author=this.$store.state.user.token;
			this.getCategories();
			
		},
		methods:{
			//获取文章分类
			getCategories(){				
				const arr=[];
				API.getCategoryList().then(res=>{
					console.log('获取分类res：',res);					
					const data=res.items;

					data.forEach((item,index)=>{						
						arr.push({
							id:item.id,
							name:item.name
						})
					})
					this.categories=arr;											
				},err=>{
					console.log('获取文章分类数据出错:',err);
					this.$notify({
						message:`获取文章分类数据出错:${err.message}`,
						type:'error',
						duration:0
					})
				})
			},
			getArticleDetailData(articleid){				

				let loading=this.$loading({
					target:".el-main"
				})				
				API.getBlogDetail(articleid).then(res=>{
					console.log('获取文章详情res:',res);
					this.form.title=res.title;
					this.form.category_id=res.category_id;
					this.form.author=res.user_id;
					this.form.content=res.content;
					loading.close();					
				},err=>{
					console.log('获取文章详情',articleid,'数据出错:',err);
					this.$notify({
						message:`获取文章详情出错：${err.message}`,
						type:'error',
						duration:0
					})
				})
			},
			onSubmit(formName){				
				this.$refs[formName].validate((valid) => {
					if(valid){

						if(this.articleid){
							//更新文章
							console.log('修改文章：',JSON.stringify(this.form))

							API.updateBlog(this.articleid,{
								title:this.form.title,
								content:this.form.content,
								category_id:this.form.category_id
							}).then(res=>{
								console.log('修改文章res：',res);
								this.$message({
									message:"修改文章成功",
									type:"success"
								})
								this.$router.push({path:'/article/list'});
							},err=>{
								console.log('修改文章出错：',err);
								this.$notify({
									message:`修改文章出错：${err.message}`,
									type:'error',
									duration:0
								})
							})
							
						}else{
							//新增文章
							console.log('新增文章：',JSON.stringify(this.form))
							API.addBlog({
								title:this.form.title,
								content:this.form.content,
								category_id:this.form.category_id,								
							}).then(res=>{
								console.log('新增文章res:',res);
								this.$message({
									message:"新增文章成功",
									type:"success"
								})
								this.$router.push({path:'/article/list'});
							},err=>{
								console.log('新增文章出错:',err);
								this.$notify({
									message:`新增文章出错：${err.message}`,
									type:'error',
									duration:0
								})

							})							
						}						
					}
					
				})
				
			},	
			//跳转到文章列表		
			toArticleList(){
				this.$router.push('/article/list');
			}
		}
	}
</script>
<style scoped lang="less">
	
</style>