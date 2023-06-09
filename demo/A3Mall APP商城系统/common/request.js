import config from "@/config";
import storage from "./storage";

export default {
	console(options){
		if(config.debug){
			console.log("<<===============================================>>");
			console.log("request start");
			console.log("header" + JSON.stringify(options.header));
			console.log("method: " + options.method + " URL: " + options.url);
			console.log(options.data);
			console.log("request end");
			console.log("<<===============================================>>");
		} 
	},
	domain(){
		return config.uni_app_web_api_url.replace("api","");
	},
	send(options={}){
		options.url = config.uni_app_web_api_url + '' + options.url;
		options.method = options.method || "GET";
		
		let users = storage.getJson("users");
		if(users != null){
			options.header = { "Auth-Token" : users.token };
		}
		
		this.console(options);
		return new Promise((resolve, reject) =>{
			uni.request(options).then(data=>{
				var [error, res]  = data;
				console.log(res);
				if(error != null){
					reject(error);
				}else{
					if(res.data.status == '-1001'){
						uni.hideLoading();
						uni.navigateTo({
						    url: '/pages/public/login'
						});
					}else{
						resolve(res.data); 
					}
				}
			});
		});
	},
	get(url="",data={}){
		return this.send({
			url: url,
			data: data
		});
	},
	post(url="",data={}){
		return this.send({
			url: url,
			data: data,
			method: "POST"
		});
	}
};