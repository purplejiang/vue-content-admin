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
            <el-form
                :model="addform"
                :rules="addrules"
                ref="addform"
                size="small">
                <!-- <el-form-item label="用户名称" prop="name">
                    <el-input v-model="addform.name" auto-complete="off"></el-input>
                </el-form-item> -->
                <el-form-item label="email地址" prop="email">
                    <el-input v-model="addform.email" auto-complete="off"></el-input>
                </el-form-item>
                 <el-form-item label="账户密码" prop="password">
                    <el-input v-model="addform.password" type="password" auto-complete="off"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addUser('addform')" type="primary">确定</el-button>
                <el-button @click="isshow_dialog_add_user = false">取消</el-button>
            </div>
        </el-dialog>

        <el-dialog title="编辑用户" :visible.sync="isshow_dialog_edit_user" width="500px" append-to-body center>
            <el-form ref="editform" label-width="100px"
                :rules="editrules" :model="editform"
                size="small">

                <el-form-item label="email地址" prop="email">
                    <el-input v-model="editform.email" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户名称" prop="name">
                    <el-input v-model="editform.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="年龄" prop="age">
                    <el-input v-model="editform.age" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="gender">
                    <el-radio v-model="editform.gender" label="0">男</el-radio>
                    <el-radio v-model="editform.gender" label="1">女</el-radio>
                </el-form-item>
                <el-form-item label="电话号码" prop="phone_number">
                    <el-input v-model="editform.phone_number" auto-complete="off"></el-input>
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
                    >
                </el-table-column>
                <el-table-column
                    prop="name"
                    sortable
                    label="用户名"
                   >
                </el-table-column>
                <el-table-column
                    prop="email"
                    label="email"
                    >
                </el-table-column>
                <el-table-column
                    prop="age"
                    label="是否是管理员"
                    >
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.is_admin==true">是</el-tag>
                        <el-tag type="danger" v-else>否</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="age"
                    label="年龄"
                    >
                </el-table-column>
                <el-table-column
                    prop="gender"
                    label="性别"
                    >
                </el-table-column>
                <el-table-column
                    prop="phone_number"
                    label="电话号码"
                    >
                </el-table-column>
                <el-table-column
                    label="注册时间"
                    width="180">
                    <template slot-scope="scope">
                        <el-icon name="time"></el-icon>
                        <span>{{ scope.row.sign_up_time }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="上次登录时间"
                    width="180">
                    <template slot-scope="scope">
                        <el-icon name="time"></el-icon>
                        <span>{{ scope.row.last_login_time }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="操作" min-width="230">
                    <template slot-scope="scope">
                        <el-button
                            size="small"
                            @click="handleLook(scope.$index, scope.row)">查看</el-button>
                        <el-button
                            size="small"
                            type="success"
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
                name:'',
                email:'',
                password:''
            },
            editform:{
                name:'',
                email:'',
                age:'',
                gender:'',
                phone_number:''
            },
            editrules:{
                email: [
                  { required: true, message: 'email地址不能为空', trigger: 'blur' }
                ],
            },
            addrules:{
                email: [
                  { required: true, message: 'email地址不能为空', trigger: 'blur' }
                ],
                password: [
                  { required: true, message: '密码不能为空', trigger: 'blur' }
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
                console.log('获取用户列表数据res：',res);
                this.tableData=res.items;
                loading.close();
            },err=>{
                console.log('获取用户列表出错:',err);
                this.$notify({
                    message: `获取用户列表出错：${err.message}`,
                    type: 'error',
                    duration: 0
                });
                loading.close();
            })
        },
        addUser(name){
            this.$refs[name].validate((valid)=>{
                if(valid){
                    API.addUser({
                        email:this.addform.email,
                        password:this.addform.password
                    }).then(res=>{
                        console.log('新增用户res：',res);
                        this.$message({
                            message:"新增用户成功",
                            type:"success"
                        })
                        this.isshow_dialog_add_user=false;
                        this.getData();
                    },err=>{
                        this.$notify({
                            message:`新增用户出错：${err.message}`,
                            type:'error',
                            duration:0
                        })
                    })

                }
            })
        },
        editUser(name){
            this.$refs[name].validate((valid)=>{
                if(valid){
                    console.log(this.editform)
                    this.$message({
                        message:"修改功能暂未接入接口",
                        type:"success"
                    })
                    this.isshow_dialog_edit_user=false;
                    this.getData();
                }
            })
        },
        handleLook(index,row){

        },
        handleEdit(index, row) {
            console.log(index, row);
            this.isshow_dialog_edit_user=true;
            this.editform.name=row.name;
            this.editform.email=row.email;
            this.editform.age=row.age;
            this.editform.gender=row.gender;
            this.editform.phone_number=row.phone_number;
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
                    message:"删除功能暂未接入接口",
                    type:"success"
                })
                this.getData();
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