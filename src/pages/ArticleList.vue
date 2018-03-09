<template>
	<div>
		<el-card style="marginTop:20px;">
	        <el-row>
	        	<el-col :span="4">
	        		<el-button size="small" type="primary" icon="el-icon-circle-plus-outline"
	                       style="margin-right: 10px" @click="addArticle">
		                新增文章
		            </el-button>	   
	        	</el-col>
	        	<el-col :span="6">
	        		<el-input size="small"  style="margin-right: 10px" v-model="searchvalue" placeholder="输入文章标题"></el-input>
	        		
	        	</el-col>	        	
	        	<el-button size="small" type="primary" icon="el-icon-search" @click="search">
	                搜索
	            </el-button>	
	        	
	        </el-row>                     
	        
	    </el-card>
		<el-card style="marginTop:20px">
			<el-button size="small" type="danger" style="marginBottom:20px;"
				:disabled="this.selecteds.length===0"
				@click="handleDeleteAll">批量删除</el-button>
			<el-table
				border
				stripe
				size="small"
				@selection-change="selectsChange"
				:data="articledata">
				<el-table-column
					type="selection"
					width="55"
					>					
				</el-table-column>
				<el-table-column
					prop="id"
					sortable
					label="文章id">				
				</el-table-column>
				<el-table-column
					prop="title"
					label="文章标题">	
					<template slot-scope="scope">
						<router-link style="color:#09c;text-decoration:underline;" :to="'/article/detail/'+scope.row.id">{{scope.row.title}}</router-link>
					</template>			
				</el-table-column>
				<el-table-column
					prop="user_id"
					sortable
					label="作者">				
				</el-table-column>
				<el-table-column
					prop="category_id"
					sortable
					label="分类">				
				</el-table-column>
				<el-table-column
					prop="view_count"
					sortable
					label="阅读数">				
				</el-table-column>
				<el-table-column
					prop="good_count"
					sortable
					label="点赞数">				
				</el-table-column>
				<el-table-column
					prop="is_published"
					label="状态">	
					<template slot-scope="scope">
						<el-tag v-if="scope.row.is_published==1" type="success">已发布</el-tag>
						<el-tag v-else type="warning">未发布</el-tag>
					</template>			
				</el-table-column>
				<el-table-column
					width="150"
					sortable
					prop="create_time"
					label="创建时间">				
				</el-table-column>				
				<el-table-column				
					sortable
					prop="published_time"
					label="发布时间">				
				</el-table-column>
				<el-table-column label="操作" min-width="190">
	                <template slot-scope="scope">
	                	<el-button-group>               	
		                	<el-button v-if="scope.row.is_published==0"
		                        size="small"	                       
		                        >发布</el-button>
		                    <el-button v-else
		                        size="small"
		                        type="primary"	                       
		                        >撤回</el-button>
		                    <el-button
		                        size="small"
		                        type="success"
		                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
		                    <el-button
		                        size="small"
		                        type="danger"
		                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
	                    </el-button-group>	 
	                </template>
	            </el-table-column>
			</el-table>
		</el-card>
	</div>
</template>
<script>
	import API from '@/Api/api';
	export default{
		data(){
			return{
				articledata:[],
				searchvalue:'',	
				selecteds:[]//选中的值			
				
			}
		},
		mounted(){
			// let type=this.$route.params.type;
			// console.log(type)
			this.getData();

			console.log('data:',this.articledata);
		},
		watch:{
			"$route":"getData"
			// $route(to,from){
			// 	this.getData();
			// }
		},
		methods: {
			getData(){
				let type=this.$route.params.type;
				console.log(type);
				let loading=this.$loading({
					target:".el-main"
				})
				if(type=='published'){
					API.getBlogList().then(res=>{
						console.log('获取文章列表res：',res);					
						this.articledata=res.items;							
						loading.close();				
					},err=>{
						console.log('获取文章列表出错：',err);
						loading.close();
			            this.$notify({
			              	message: `获取文章列表出错：${err.message}`,
			              	type: 'error',
			              	duration: 0
			            });
					})
				}else{
					setTimeout(()=>{
						this.articledata=[];							
						loading.close();
					},500)
					
				}
				
			},
			selectsChange(selects){
				this.selecteds=selects;
			},
			//批量删除
			handleDeleteAll(){
				console.log('选中的项：',this.selecteds);
				this.$message({
					message:'待接入接口',
					type:'success'
				})
			},
			//编辑
	        handleEdit(index, row) {
	            console.log(index, row,row.id);
	            this.$router.push({path:'/article/edit/'+row.id})
	        },
	        //删除
	        handleDelete(index, row) {	            
	            this.$confirm('是否确定要删除该文章？','提示',{
	           		confirmButtonText:'确定',
	           		cancelButtonText:'取消',
	           		type:'warning'
	           	}).then(()=>{
	           		console.log(index, row);
	            	console.log('要删除的文章的id：',row.id);
	            	API.deleteBlog(row.id).then(res=>{
	            		console.log('删除文章res:',res);
	            		this.$message({
		           			message:"删除成功",
		           			type:"success"
		           		})
		           		this.getData();
	            	},err=>{
	            		console.log('删除文章出错：',err);
	            		this.$notify({
			              	message: `删除文章出错：${err.message}`,
			              	type: 'error',
			              	duration: 0
			            });
	            	})
	           		
	           	}).catch(()=>{
	           		this.$message({
	           			message:"已取消删除",
	           			type:"info"
	           		})
	           	})
	        },
	        //新增文章
	        addArticle(){
	        	this.$router.push({path:'/article/add'})
	        },
	        //查找
	        search(){
	        	console.log('查找',this.searchvalue);
	        	this.getData();
	        }
	    }
	}
</script>
<style scoped lang="less">
	
</style>