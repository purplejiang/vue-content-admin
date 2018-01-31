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
					<el-input v-model="form.author" placeholder="输入文章作者"></el-input>
				</el-form-item>
				<el-form-item label="文章分类" prop="category">
	    			<el-select v-model="form.category" placeholder="请选择文章分类">
	      				<el-option v-for="(item,index) in categories" :label="item" :value="item" :key="index"></el-option>	      				
	    			</el-select>
	 			</el-form-item>	 			
	 			<el-form-item label="文章内容" prop="content">
	 				<el-input type="textarea" v-model="form.content"
	 					placeholder="输入文章内容" :rows="20"></el-input>
	 			</el-form-item>
	 			<el-form-item>
				    <el-button type="primary" @click="onSubmit('form')">提交</el-button>
				    <!-- <el-button>取消</el-button> -->
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
					category:'',
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
			        category:[
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
			this.getCategories();
			
		},
		methods:{
			//获取文章分类
			getCategories(){
				const arr=[];
				API.getTypeList().then(res=>{
					const data=res;
					data.forEach((item,index)=>{
						arr.push(item.typename)
					})
					this.categories=arr;					
				},err=>{
					console.log('获取文章分类数据出错:',err);
					this.$notify({
						message:`获取文章分类数据出错:${err}`,
						type:'error',
						duration:0
					})
				})
			},
			getArticleDetailData(articleid){
				console.log('获取数据文章id：',articleid)
				let loading=this.$loading({
					target:".el-main"
				})
				API.getArticleDetail().then(res=>{
					const data=res;
					setTimeout(()=>{
						this.form.title=data.title;
						this.form.category=data.typename;
						this.form.author=data.author;
						this.form.content=data.content;
						loading.close();

					},1000)
				},err=>{
					console.log('获取数据文章',articleid,'数据出错:',err);
					this.$notify({
						message:`${err}`,
						type:'error',
						duration:1000
					})
				})
			},
			onSubmit(formName){
				// if(!this.form.title){
				// 	this.$message.error('请输入文章标题');
				// 	return false;
				// }
				// if(!this.form.author){
				// 	this.$message.error('请输入文章作者');
				// 	return false;
				// }
				// if(!this.form.category){
				// 	this.$message.error('请选择文章分类');
				// 	return false;
				// }
				// if(!this.form.content){
				// 	this.$message.error('请输入文章内容');
				// 	return false;
				// }
				this.$refs[formName].validate((valid) => {
					if(valid){
						if(this.articleid){
							console.log('修改文章：',JSON.stringify(this.form))
							this.$message({
								message:"修改文章成功",
								type:"success"
							})
						}else{
							//新增文章
							console.log('新增文章：',JSON.stringify(this.form))
							this.$message({
								message:"新增文章成功",
								type:"success"
							})
						}
						setTimeout(()=>{
							this.$router.push({path:'/article/list'});
						},1000)
						
					}
					
				})
				
			},			
			toArticleList(){
				this.$router.push('/article/list');
			}
		}
	}
</script>
<style scoped lang="less">
	
</style>