<template>	
	<el-breadcrumb separator="/">
		<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
	  	<div v-if="$route.meta && $route.meta.bcrumd">
      		<el-breadcrumb-item v-for="(item, index) in $route.meta.bcrumd" :key="index">{{item}}</el-breadcrumb-item>
    	</div>
	</el-breadcrumb>	
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
	
</style>