import axios from 'axios';
import {baseURL} from '@/utils/config';
import types from '@/store/mutation_types';
import store from '@/store';
import router from '@/router';

axios.defaults.baseURL=baseURL;
axios.defaults.headers.common['Cache-Control'] = 'no-cache';
axios.defaults.headers.common['Pragma'] = 'no-cache';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.get['Content-Type'] = 'application/json';

axios.interceptors.request.use(
	config=>{       
		if (store.state.user) {
			console.log('user:',store.state.user)
        	// 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.Authorization = `user ${store.state.user.token}`;
        }
		return config;
	},
	err=>{
		console.error('request.err: ', err);
		return Promise.reject(err);
	}
)
axios.interceptors.response.use(
	res=>{
        return res.data.data;
	},
	err=>{
		if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 401 清除token信息并跳转到登录页面
                    store.commit(types.LOGOUT);
                    router.replace({
                        path: 'login',
                        query: {redirect: router.currentRoute.fullPath}
                    })
            }
        }
        console.log(JSON.stringify(error));
        return Promise.reject(error.response.data)// 返回接口返回的错误信息
	}
)

export default axios;
