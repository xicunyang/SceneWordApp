var login = {
	// 获取三方登录服务
	login: function(name) {
		plus.oauth.getServices(
			//获取服务成功
			function(services) {
				for (var k in services) {
					if (services[k].id == name) {
						//得到登录对象后就去登录
						console.log("登录服务对象获取成功...");
						login.to_login(services[k]);
					}
				}
			},
			//获取服务失败
			function() {
				mui.toast("获取登录服务失败,请重试");
			});
	},
	//去登录
	to_login:function(login_obj){
		//得到该服务对象
		login_obj.login(
			//登陆成功
			function(res) {
				console.log("登录用户获取成功...");
				// 查看用户信息
				login_obj.getUserInfo(
					function(res) {
						var datas = {};
						//unionID
						datas.user_unionid = login_obj.userInfo.unionid;
						//昵称
						datas.user_nickname = login_obj.userInfo.nickname;
						//性别
						datas.user_sex = login_obj.userInfo.sex;
						//城市
						datas.user_city = login_obj.userInfo.city;
						//省份
						datas.user_province = login_obj.userInfo.province;
						//国家
						datas.user_country = login_obj.userInfo.country;
						//头像
						datas.user_face_img = login_obj.userInfo.headimgurl;
						// 进行保存本地
						for(var i=0;i<datas.length;i++){
							console.log(datas[i]);
						}
						plus.storage.setItem("user_unionid", datas.user_unionid);
						plus.storage.setItem("user_nickname", datas.user_nickname);
						plus.storage.setItem("user_sex", datas.user_sex);
						plus.storage.setItem("user_city", datas.user_city);
						plus.storage.setItem("user_province", datas.user_province);
						plus.storage.setItem("user_country", datas.user_country);
						plus.storage.setItem("user_face_img", datas.user_face_img);
						console.log("用户信息本地保存成功...");
						mui.toast('登录成功');
						// 获取  我的  页面的对象
						var my_page = plus.webview.getWebviewById("my");
						my_page.evalJS("change_page_login()");
					},
					function() {
						mui.toast('登录失败');
					});
			},
			//登录失败
			function() {
				mui.toast('登录失败');
			}
		)
	}
}
