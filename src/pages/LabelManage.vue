<template>
	<div>
		<el-dialog :visible.sync="is_show_add_dialog" width="400px"
			append-to-body center>
			<el-form :rules="addrule" :model="add_form" size="small" ref="addform">
				<el-form-item label="标签名" prop="labelname">
					<el-input v-model="add_form.labelname"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">	
				<el-button type="primary" @click="addLabelHandle('addform')">确定</el-button>
				<el-button @click="is_show_add_dialog=false">取消</el-button>
			</div>
		</el-dialog>
		<el-card style="marginTop:20px;">
			<el-button size="small" type="primary" icon="el-icon-circle-plus-outline"
				@click="is_show_add_dialog=true">
				新增标签
			</el-button>
		</el-card>
		<el-card style="marginTop:20px;">
			<el-table :data="tableData"
				size="small">
				<el-table-column prop="id"
					sortable
					label="id"></el-table-column>
				<el-table-column prop="name"
					label="标签名">
					<template slot-scope="scope">
						<el-tag>{{scope.row.name}}</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="create_time"
					sortable
					label="创建时间"></el-table-column>
				<el-table-column label="操作" min-width="160"
					align="center">
	                <template slot-scope="scope">
	                    <!-- <el-button
	                        size="small"
	                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
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
	export default {
		data(){
			return{
				tableData:[],
				is_show_add_dialog:false,
				add_form:{
					labelname:''
				},
				addrule:{
					labelname:[
						{required:'true',message:'标签名不能为空',trigger:'blur'}
					]					
					
				}
			}
		},
		mounted(){
			this.getData();
		},
		methods:{
			getData(){
				API.getLabelList().then(res=>{
					console.log('获取标签列表res：',res);
					this.tableData=res.items;

				},err=>{
					console.log('获取标签列表出错：',err);
				})
			},
			// handleEdit(index, row) {

			// },
			//删除标签
			handleDelete(index, row) {
				this.$confirm('是否确定删除标签','提示',{
					confirmButtonText:'确定',
					cancelButtonText:'取消',
					type:'warning'
				}).then(()=>{
					API.deleteLabel(row.id).then(res=>{
						console.log('删除标签res：',res);
						this.$message({
							message:'删除成功',
							type:'success'
						})
						this.getData();
					},err=>{
						console.log('删除标签出错：',err);
						this.$notify({
							message:`删除标签出错：${err.message}`,
							type:'error',
							duration:0
						})
					})
				}).catch(()=>{
					this.$message({
						type:'info',
						message:'已取消删除'
					})
				})
			},
			//新增标签点击确定
			addLabelHandle(name){
				this.$refs[name].validate((valid)=>{
					if(valid){
						API.addLabel({
							name:this.add_form.labelname
						}).then(res=>{
							console.log('新增标签res:',res);
							this.$message({
								message:'新增标签成功',
								type:'success'
							})
							this.add_form.labelname='';
							this.is_show_add_dialog=false;
							this.getData();
						},err=>{
							console.log('新增标签出错：',err);
							this.$notify({
								message:`新增标签出错：${err.message}`,
								type:'error',
								duration:0
							})
						})
					}
				})
			}
		}
	}
</script>
<style scoped lang="less">
	
</style>