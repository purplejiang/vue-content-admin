
let baseURL;
console.log(`process.env.NODE_ENV: ${process.env.NODE_ENV}`);

if(process.env.NODE_ENV==='development'){
	baseURL='http://localhost:8080/static/mock/';
}else{

}

export {baseURL}