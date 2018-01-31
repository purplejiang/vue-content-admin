<template>    
    <el-container>
        
        <el-header>  
        	<Header/>
        </el-header>        
        <el-container>
            <el-aside width="200px">   
            	<side-nav></side-nav>             
            </el-aside>
            <el-container>
                <el-main>
                	<common-bread></common-bread>
                	<router-view/>
                </el-main>
                <el-footer>~~~~~by jt</el-footer>
            </el-container>
      </el-container>
    </el-container>
  
</template>
<script>
import Header from '@/components/Header';
import SideNav from '@/components/SideNav';
import CommonBread from '@/components/CommonBread';
export default {  
	data () {
		return {
			msg: 'Welcome to Your Vue.js App'
		}
	},
	components:{
		Header,
		SideNav,
		CommonBread
	},
	methods:{
		
	}
}
</script>

<style scoped lang="less">
.el-header{
	// border: 1px solid red;
	box-sizing: border-box;
	padding: 0;
	line-height: 60px;
	background: #09c;
	color: #fff;
}
.el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
    // min-width: 800px;
}
.el-aside {
    /*background-color: #D3DCE6;*/
    background: #304156;
    color: #fff;
    // text-align: center;
    // line-height: 200px;
    border: 1px solid black;
    overflow: hidden;
    box-sizing: border-box;

    
}
.el-main {
    background-color: #E9EEF3;
    color: #333;
    // text-align: center;
    // line-height: 160px;
}

body > .el-container {
    /*margin-bottom: 40px;*/
    height: 100%;
}

.el-container .el-aside{
    line-height: 260px;
}

</style>