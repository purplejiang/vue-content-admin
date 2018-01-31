import service from '@/Api/service';

export default{
	//获取文章列表
	getArticleList(){
		return service.get('articlelist.json');
	},
	//获取文章详情
	getArticleDetail(){
		return service.get('articledetail.json');
	},
	//获取分类列表
	getTypeList(){
		return service.get('typelist.json');
	},
	//获取用户列表
	getUserList(){
		return service.get('userlist.json');
	},
	//获取用户详细信息
	getUserDetail(){
		return service.get('userdetail.json');
	}
}