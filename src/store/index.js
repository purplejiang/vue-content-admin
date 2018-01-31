import types from './mutation_types';
import Vue from 'vue';
import Vuex from 'vuex';
import localStore from '@/utils/localStore';

Vue.use(Vuex);

const user = localStore.getItem('boke_admin_user')||{};

const state={
	user:user
}
const getters={

}
const mutations={
	[types.SAVE_USER_TOKEN](state,data){
		state.user.token=data;
	},
	[types.LOGOUT](state){
		state.user={};
	}
}
const actions={

}

export default new Vuex.Store({
	state,
	getters,
	mutations,
	actions
})