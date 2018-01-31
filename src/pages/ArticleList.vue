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
			<el-table
				border
				stripe
				size="small"
				:data="articledata">
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
					prop="author"
					sortable
					label="作者">				
				</el-table-column>
				<el-table-column
					prop="categoryname"
					sortable
					label="分类">				
				</el-table-column>
				<el-table-column
					width="150"
					sortable
					prop="createtime"
					label="创建时间">				
				</el-table-column>
				<el-table-column
					width="150"
					sortable
					prop="updatetime"
					label="更新时间">				
				</el-table-column>
				<el-table-column label="操作" min-width="160">
	                <template slot-scope="scope">
	                    <el-button
	                        size="small"
	                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
	                    <el-button
	                        size="small"
	                        type="danger"
	                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
				
			}
		},
		mounted(){
			this.getData();
		},
		methods: {
			getData(){
				let loading=this.$loading({
					target:".el-main"
				})
				API.getArticleList().then(res=>{
					setTimeout(()=>{
						this.articledata=res;
						loading.close();
					},1000)
				},err=>{
					console.log(err);
					loading.close();
		            this.$notify({
		              	message: `获取文章列表出错：${err}`,
		              	type: 'error',
		              	duration: 0
		            });
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
	           		this.$message({
	           			message:"删除成功",
	           			type:"success"
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