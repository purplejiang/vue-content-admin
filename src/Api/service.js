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
			// console.log('user:',store.state.user)
        	// 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.Authorization = `user ${store.state.user.token}`;
        }
        console.log('config:',config);
		return config;
	},
	err=>{
		console.error('request.err: ', err);
		return Promise.reject(`reject request err: ${err}`);
	}
)
axios.interceptors.response.use(
	res=>{
        console.log('axios response res:',res);
        console.log(res.status)
        return res.data;            
       
	},
	err=>{
        console.error('response.err: ', err);      
	    console.log('err response:');
        console.log(err);
        console.log(err.response);
        if(err.response){
            switch(err.response.status){
                case 401:
                    store.commit(types.LOGOUT);
                    router.replace({
                        path: '/login',
                        query: {redirect: router.currentRoute.fullPath}
                    })
                    break;
                case 404:
                case 405:
                case 504:
                    return Promise.reject({
                        message:err.response.statusText
                    });
                    break;

            }
        }
        // return Promise.reject('axios reject response.err '+err)// 返回接口返回的错误信息
        return Promise.reject(err.response.data)// 返回接口返回的错误信息
        
	}
)

export default axios;
