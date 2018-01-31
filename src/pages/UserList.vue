<template>
    <div class="userlist">
        <el-card style="marginTop:20px;">
            <div class="button-group">
                <el-button size="small" type="primary" icon="el-icon-circle-plus-outline"
                    @click="isshow_dialog_add_user = true">
                    新增用户
                </el-button>
            </div>
        </el-card>

        <el-dialog title="新增用户" :visible.sync="isshow_dialog_add_user" width="400px" append-to-body center>
            <el-form label-position="top"  
                :model="addform" 
                :rules="addrules"  
                ref="addform"           
                size="small">
                <el-form-item label="用户名称" prop="name">
                    <el-input v-model="addform.name" auto-complete="off"></el-input>
                </el-form-item>
                
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addUser('addform')" type="primary">确定</el-button>
                <el-button @click="isshow_dialog_add_user = false">取消</el-button>               
            </div>
        </el-dialog>

        <el-dialog title="编辑用户" :visible.sync="isshow_dialog_edit_user" width="400px" append-to-body center>
            <el-form label-position="top" ref="editform"
                :rules="editrules" :model="editform"
                size="small">
                <el-form-item label="用户名称" prop="name">
                    <el-input v-model="editform.name" auto-complete="off"></el-input>
                </el-form-item>
                
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editUser('editform')" type="primary">确定</el-button>
                <el-button @click="isshow_dialog_edit_user = false">取消</el-button>               
            </div>
        </el-dialog>
   
        <el-card :body-style="{padding:'15px'}" style="marginTop:20px;">
            <el-table
                :data="tableData"
                border
                stripe
                size="small"
                style="width: 100%">
                <el-table-column
                    prop="id"
                    sortable
                    label="id"                
                    width="180">
                   
                </el-table-column>
                <el-table-column
                    prop="name"
                    sortable
                    label="姓名"                
                    width="180">
                   
                </el-table-column>
                <el-table-column
                    label="创建时间"
                    width="180">
                    <template slot-scope="scope">
                        <el-icon name="time"></el-icon>
                        <span style="margin-left: 10px">{{ scope.row.date }}</span>
                    </template>
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
export default {  
    data () {
        return {
            tableData:[],
            isshow_dialog_add_user:false,
            isshow_dialog_edit_user:false,
            addform:{
                name:''
            },
            editform:{
                name:''
            },
            editrules:{
                name: [
                  { required: true, message: '分类名称不能为空', trigger: 'blur' }
                ],
            },
            addrules:{
                name: [
                  { required: true, message: '用户名称不能为空', trigger: 'blur' }
                ],
            }       
        }
    },
    mounted(){
        this.getData();
    },
    methods: {
        getData(){
            let loading=this.$loading({            
                target:'.el-main'
            })
            let _this=this;
            API.getUserList().then(res=>{
                console.log(res);
                
                setTimeout(()=>{
                    this.tableData=res;
                    loading.close();
                },1000)                
            },err=>{
                console.log(err);
                loading.close();
                this.$notify({
                    message: `获取用户列表出错：${err}`,
                    type: 'error',
                    duration: 0
                });
            })
        },
        addUser(name){
            this.$refs[name].validate((valid)=>{
                if(valid){
                    this.isshow_dialog_add_user=false;
                    this.$message({
                        message:"新增用户成功",
                        type:"success"
                    })
                    console.log('新增用户名称：',this.addform.name)
                }
            })
        },
        editUser(name){
            this.$refs[name].validate((valid)=>{
                if(valid){
                    this.$message({
                        message:"修改成功",
                        type:"success"
                    }) 
                    this.isshow_dialog_edit_user=false;    
                }
            })
        },
        handleEdit(index, row) {
            console.log(index, row);            
            this.isshow_dialog_edit_user=true;
            this.editform.name=row.name;
        },
        handleDelete(index, row) {
            console.log(index, row);
            this.$confirm('是否确定要删除该用户？','提示',{
                confirmButtonText:'确定',
                cancelButtonText:'取消',
                type:'warning'
            }).then(()=>{
                console.log(index, row);
                console.log('删除用户的id:',row.id);
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
        }
    }
}
</script>

<style scoped lang="less">


</style>