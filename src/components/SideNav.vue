<template>
	<div class="nav_container">
		<el-menu class="sidebar-content"
			text-color="#fff"
			active-text-color="#09c"
			background-color="#304156"
			:router="true"
			>			
			<el-submenu index="article">
				<template slot="title">
          			<i class="el-icon-document"></i>
          			文章管理
        		</template>
        		<el-menu-item index="/article/list"><i style="display:inline-block;width:14px;"></i>文章列表</el-menu-item>
        		<el-menu-item index="/article/add"><i style="display:inline-block;width:14px;"></i>新建文章</el-menu-item>
			</el-submenu>
			<el-submenu index="type">
				<template slot="title">
          			<i class="el-icon-message"></i>
          			分类管理
        		</template>
        		<el-menu-item index="/type/list"><i style="display:inline-block;width:14px;"></i>分类列表</el-menu-item>
			</el-submenu>

			<el-submenu index="comment">
				<template slot="title">
          			<i class="el-icon-edit-outline"></i>
          			评论管理
        		</template>
        		<el-menu-item index="/comment/list"><i style="display:inline-block;width:14px;"></i>评论列表</el-menu-item>
			</el-submenu>
			<el-menu-item index="/label/list"><i class="el-icon-tickets"></i>标签管理</el-menu-item>
			<el-submenu index="user">
        		<template slot="title">
          			<i class="el-icon-menu"></i>
          			用户管理
        		</template>
        		<el-menu-item index="/user/list"><i style="display:inline-block;width:14px;"></i>用户列表</el-menu-item>
        		<el-menu-item index="/user/me"><i style="display:inline-block;width:14px;"></i>个人中心</el-menu-item>
      		</el-submenu>
		</el-menu>
	</div>
</template>
<script>
	export default{
		data(){
			return{

			}
		}
	}
</script>
<style scoped lang="less">
	.nav_container{		
		width: 200px;
		height: 100%;
		.sidebar-content {
			width: 200px;
			height: 100%;
			overflow-x: hidden;			
			overflow-y: auto;			
			background: #304156;			
		}
	}
	.el-submenu .el-menu-item{
		padding-left: 50px;
	}
</style>