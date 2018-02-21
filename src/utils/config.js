
let baseURL,imgbaseURL;
// console.log(`process.env.NODE_ENV: ${process.env.NODE_ENV}`);

if(process.env.NODE_ENV==='development'){
	// baseURL='http://localhost:8080/static/mock/';
	baseURL='http://localhost:8082';
    imgbaseURL='http://localhost:5000';
}else{

}

export {baseURL,imgbaseURL};