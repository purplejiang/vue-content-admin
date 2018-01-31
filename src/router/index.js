import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import store from '@/store'

// import Layout from '@/pages/Layout'

const Layout = r => require(['@/pages/Layout'],r);
const Login = r => require(['@/pages/Login'],r);
const Articlelist = r => require(['@/pages/ArticleList'],r);
const AddArticle = r => require(['@/pages/AddArticle'],r);
const ArticleDetail = r => require(['@/pages/ArticleDetail'],r);
const Typelist = r => require(['@/pages/TypeList'],r);
const Userlist = r => require(['@/pages/UserList'],r);
const Userme = r => require(['@/pages/Userme'],r);
const CommentList = r => require(['@/pages/CommentList'],r);

Vue.use(Router)

const router = new Router({
  routes: [
    {
     	path: '/',     
        component: Layout,
        children:[
        	{
        		path:'/article/list',
        		component:Articlelist,
        		meta:{
        			requireAuth:true,
        			bcrumd:['文章管理','文章列表']
        		}
        	},
        	{
        		path:'/article/add',
        		component:AddArticle,
        		meta:{
        			requireAuth:true,
        			bcrumd:['文章管理','新建文章']
        		}
        	},
        	{
        		path:'/article/edit/:id',
        		component:AddArticle,
        		meta:{
        			requireAuth:true,
        			bcrumd:['文章管理','编辑文章']
        		}
        	},
        	{
        		path:'/article/detail/:id',
        		component:ArticleDetail,
        		meta:{
        			requireAuth:true,
        			bcrumd:['文章管理','文章详情']
        		}
        	},
        	{
        		path:'/type/list',
        		component:Typelist,
        		meta:{
        			requireAuth:true,
        			bcrumd:['分類管理','分類列表']
        		}
        	},
        	{
        		path:'/comment/list',
        		component:CommentList,
        		meta:{
        			requireAuth:true,
        			bcrumd:['评论管理','评论列表']
        		}	
        	},
        	{
        		path:'/user/list',
        		component:Userlist,
        		meta:{
        			requireAuth:true,
        			bcrumd:['用戶管理','用戶列表']
        		}
        	},
        	{
        		path:'/user/me',
        		component:Userme,
        		meta:{
        			requireAuth:true,
        			bcrumd:['用戶管理','個人中心']
        		}
        	}
        ]
    },
    {
    	path:'/login',
    	component:Login
    }
  ]
})

router.beforeEach((to,from,next)=>{
	if(to.meta.requireAuth){// 判断该路由是否需要登录权限
		if(store.state.user.token){
			next();
		}else{
			next({
				path:'/login',
				query:{redirect:to.fullPath}// 将跳转的路由path作为参数，登录成功后跳转到该路由
			})
		}
	}else{
		next();
	}
})

export default router;
