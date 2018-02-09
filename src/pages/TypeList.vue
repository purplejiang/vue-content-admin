<template>
	<div>
		<el-dialog title="新增分类" :visible.sync="isshow_dialog_add_type" width="400px" append-to-body center>
            <el-form label-position="top"  
            	:model="addform" 
            	:rules="addrules"  
            	ref="addform"        	
            	size="small">
                <el-form-item label="分类名称" prop="typename">
                    <el-input v-model="addform.typename" auto-complete="off"></el-input>
                </el-form-item>
                
            </el-form>
            <div slot="footer" class="dialog-footer">
            	<el-button @click="addType('addform')" type="primary">确定</el-button>
                <el-button @click="isshow_dialog_add_type = false">取消</el-button>               
            </div>
        </el-dialog>

       <!--  <el-dialog title="编辑分类" :visible.sync="isshow_dialog_edit_type" width="400px" append-to-body center>
            <el-form label-position="top" ref="editform"
            	:rules="editrules" :model="editform"
            	size="small">
                <el-form-item label="分类名称" prop="typename">
                    <el-input v-model="editform.typename" auto-complete="off"></el-input>
                </el-form-item>
                
            </el-form>
            <div slot="footer" class="dialog-footer">
            	<el-button @click="editType('editform')" type="primary">确定</el-button>
                <el-button @click="isshow_dialog_edit_type = false">取消</el-button>                
            </div>
        </el-dialog> -->
        <el-card style="marginTop:20px;">
	        <div class="button-group">
	            <el-button size="small" type="primary" icon="el-icon-circle-plus-outline"
	                @click="addNewCategory">
	                新增分类
	            </el-button>
	        </div>
	    </el-card>
		<el-card style="marginTop:20px;">
			<el-table
				size="small"
				:data="tableData">
				<el-table-column
					prop="id"
					sortable
					label="id">					
				</el-table-column>
				<el-table-column
					prop="use_id"
					sortable
					label="创建者">					
				</el-table-column>
				<el-table-column
					prop="name"
					sortable
					align="center"
					label="分类名称">
					<template slot-scope="scope">
						<el-tag type="info">{{scope.row.name}}</el-tag>
					</template>					
				</el-table-column>
				<el-table-column
					prop="create_time"
					sortable
					label="创建时间">					
				</el-table-column>
				<el-table-column label="操作" min-width="160" align="center">
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
	export default{
		data(){
			return{
				tableData:[	],					
				isshow_dialog_add_type: false,
				// isshow_dialog_edit_type: false,				 
		        addform:{
		        	typename:''
		        },
		        // editform:{
		        // 	typename:''
		        // } ,     	
		       
		        // editrules:{
		        // 	typename: [
			       //    { required: true, message: '分类名称不能为空', trigger: 'blur' }
			       //  ],
		        // },
		        addrules:{
		        	typename: [
			          { required: true, message: '分类名称不能为空', trigger: 'blur' }
			        ],
		        }
			}
		},
		mounted(){
			this.getData();
		},
		methods:{
			getData(){
				let loading=this.$loading({
					target:'.el-main',
				})			
				API.getCategoryList().then(res=>{
					console.log('获取分类列表res:',res);				
					this.tableData=res.items;
		            loading.close();
						
				},err=>{
					console.log('获取分类列表出错：',err);
					loading.close();
		            this.$notify({
		              	message: `获取分类列表出错：${err}`,
		              	type: 'error',
		              	duration: 0
		            });
				})

			},
			//新增分类
			addNewCategory() {       
        		this.isshow_dialog_add_type = true;
      		},
      		//新增分类  点击确定
      		addType(name){
      			this.$refs[name].validate((valid) => {
      				if(valid){   				

      					API.addCategory({
      						name:this.addform.typename
      					}).then(res=>{
      						console.log('新增分类res:',res);
      						this.$message({
      							message:'新增分类成功',
      							type:'success'
      						})
      						this.isshow_dialog_add_type = false;
      						this.addform.typename='';
      						this.getData();
      					},err=>{
      						console.log('新增分类出错：',err);
      						this.$notify({
      							message:`新增分类出错：${err.message}`,
      							type:'error',
      							duration:0
      						})
      					})
      					
      				}
      			})
      			
      		},
      		//编辑分类  点击确定
      		// editType(name){
      		// 	this.$refs[name].validate((valid) => {
      		// 		if(valid){
      		// 			this.$message({
		      // 				message:"修改成功",
		      // 				type:"success"
		      // 			})      			
		      // 			this.isshow_dialog_edit_type = false;
      		// 		}
      		// 	})
      			
      		// },
      		//编辑
      		// handleEdit(index, row) {
	       //      console.log(index, row,row.id);	
	       //      this.isshow_dialog_edit_type = true;	                 
	       //      this.editform.typename=row.name;            
	       //  },
	        //删除
	        handleDelete(index, row) {	            
	           	this.$confirm('是否确定要删除该分类？','提示',{
	           		confirmButtonText:'确定',
	           		cancelButtonText:'取消',
	           		type:'warning'
	           	}).then(()=>{	           		
	            	API.deleteCategoty(row.id).then(res=>{
	            		console.log('删除分类res:',res);
		            	this.$message({
		           			message:"删除成功",
		           			type:"success"
		           		})
		           		this.getData();
	            	},err=>{
	            		console.log('删除分类出错：',err);
	            		this.$notify({
	            			message:`删除分类出错：${err.message}`,
	            			type:'error',
	            			duration:0
	            		})
	            	})	           		
	           	}).catch(()=>{
	           		this.$message({
	           			message:"已取消删除",
	           			type:"info"
	           		})
	           	})
	        },
		}
	}
</script>
<style scoped lang="less">
	
</style>