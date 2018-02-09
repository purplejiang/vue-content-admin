<template>
	<div>
		<el-card style="marginTop:20px;">
			<el-table :data="tableData"
				size="small">
				<el-table-column label="id"
					prop="id">					
				</el-table-column>
				<el-table-column label="评论内容"
					prop="content">					
				</el-table-column>
				<el-table-column label="文章id"
					prop="blog_id">
					<template slot-scope="scope">
						<router-link style="color:#09c;text-decoration:underline;" :to="`/article/detail/${scope.row.blog_id}`">{{scope.row.blog_id}}</router-link>
					</template>							
				</el-table-column>
				<el-table-column label="评论的人"
					prop="use_id">					
				</el-table-column>
				<el-table-column label="创建时间"
					prop="create_time">					
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button size="small" type="danger"
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
				tableData:[]
			}
		},
		mounted(){
			this.getData();
		},
		methods:{
			getData(){
				let loading=this.$loading({
					target:'.el-main'
				})
				API.getCommentsList().then(res=>{
					console.log('获取评论列表res:',res);
					this.tableData=res.items;
					loading.close();
				},err=>{
					console.log('获取评论列表出错：',err);
					this.$notify({
						message:`获取评论列表出错：${err.message}`,
						type:'error',
						duration:0
					})
					loading.close();
				})
			},
			handleDelete(index,row){
				console.log(row.id);
				this.$confirm('是否确定删除该条评论','提示',{
					confirmButtonText:'确定',
					cancelButtonText:'取消',
					type:'warnning'
				}).then(()=>{
					this.$message({
			           type: 'success',
			           message: '删除功能待开发'
			        });  
				}).catch(()=>{
					this.$message({
			           type: 'info',
			           message: '已取消删除'
			        });      
				})
			}

		}
	}
</script>
<style scoped lang="less">
	
</style>