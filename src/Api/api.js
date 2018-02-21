import service from '@/Api/service';

export default{
	//获取文章列表
	getBlogList(){
		// return service.get('articlelist.json');
		return service.get('/api/blogs');
	},
	//获取文章详情
	getBlogDetail(id){
		return service.get(`/api/blogs/${id}`);
	},
	//添加blog
	addBlog(obj){
		return service.post('/api/blogs',obj);
	},
	//更新blog
	updateBlog(id,obj){
		return service.post(`/api/blogs/${id}`,obj);
	},
	//删除blog
	deleteBlog(id){
		return service.delete(`/api/blogs/${id}`);
	},
	//获取分类列表
	getCategoryList(){
		return service.get('/api/category');
	},
	//新增分类
	addCategory(obj){
		return service.post('/api/category',obj);
	},
	//删除分类
	deleteCategoty(id){
		return service.delete(`/api/category/${id}`);
	},
	//获取标签列表
	getLabelList(){
		return service.get('/api/labels');
	},
	//新增标签
	addLabel(obj){
		return service.post('/api/labels',obj);
	},
	//删除标签
	deleteLabel(id){
		return service.delete(`/api/labels/${id}`);
	},
	//获取评论列表
	getCommentsList(){
		return service.get('/api/comments');
	},
	//删除评论
	deleteComment(id){
		return service.delete(`/api/comments/${id}`);
	},
	//获取用户列表
	getUserList(){
		// return service.get('userlist.json');
		return service.get('/api/users');
	},
	//新增用户
	addUser(obj){
		return service.post('/api/users',obj);
	},
	//修改用户信息
	updateUser(obj){
		return service.patch('/api/users/update',obj)
	},
	//获取用户详细信息
	getUserDetail(id){
		return service.get(`/api/users/${id}`);
	},
	//用户登录
	login(obj){
		return service.post('/api/users/login',obj);
	},
	//退出登录
	logout(){
		return service.get('/api/users/logout');
	},
	//修改用户密码
	changePassword(obj){
		return service.post('/api/users/change-password',obj);
	}
}