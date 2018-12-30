var logout = {
	logout: function(name) {
		plus.oauth.getServices(
			//获取服务成功
			function(services) {
				for (var k in services) {
					if (services[k].id == name) {
						//得到登录对象后就去登录
						console.log("退出登录对象获取成功...");
						logout.to_logout(services[k]);
					}
				}
			},
			//获取服务失败
			function() {
				mui.toast("获取退出登录对象失败，请重试");
			});
	},
	to_logout: function(logout_obj) {
		plus.storage.removeItem("user_unionid");
		logout_obj.logout(
			function(res) {
				console.log(JSON.stringify(res));
				//登出成功
				//先将本地的数据清掉
				plus.storage.removeItem("user_unionid");
				plus.storage.removeItem("user_nickname");
				plus.storage.removeItem("user_sex");
				plus.storage.removeItem("user_city");
				plus.storage.removeItem("user_province");
				plus.storage.removeItem("user_country");
				plus.storage.removeItem("user_face_img");
				mui.toast('退出登录成功');
				
				//进行页面数据布局的修改
				change_page_logout();
			},
			function(res) {
				console.log(JSON.stringify(res));
				mui.toast('退出登录成失败');
			}
		)
	}
}
