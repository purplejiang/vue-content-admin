console.log(`process.env.NODE_ENV: ${process.env.NODE_ENV}`);


export default{
	getItem:(key)=>{
		let value;
		try{
			value=JSON.parse(localStorage.getItem(key));
		}catch(ex){
			//开发环境下提示error
			if(process.env.NODE_ENV==='development'){
				console.error('localStorage.getItem报错，',ex.message);
			}
		}finally{
			return value;
		}
	},
	setItem:(key,value)=>{		
		try{
			localStorage.setItem(key,JSON.stringify(value));
		}catch(ex){
			// 开发环境下提示 error
			if(process.env.NODE_ENV==='development'){
				console.error('localStorage.setItem报错, ', ex.message);
			}
		}
	},
	removeItem:(key)=>{
		try{
			localStorage.removeItem(key);
		}catch(ex){
			// 开发环境下提示 error
			if(process.env.NODE_ENV==='development'){
				console.error('localStorage.removeItem报错, ', ex.message);
			}
		}
	}
}