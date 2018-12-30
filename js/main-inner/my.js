mui.init();

//实现用户信息栏hover时变色样式
mui(".mui-content").on('touchstart', '.user_info_div', function() {
	console.log("[[[]]]");
	h(this).css({
		"backgroundColor": "rgba(100,100,100,0.2)"
	});
})
mui(".mui-content").on('touchend', '.user_info_div', function() {
	h(this).css({
		"backgroundColor": "white"
	});
})
mui(".mui-content").on('touchcancel', '.user_info_div', function() {
	h(this).css({
		"backgroundColor": "white"
	});
})

//实现设置项hover时变色样式
mui("#config").on('touchstart', '.config_item', function() {
	h(this).css({
		"backgroundColor": "rgba(100,100,100,0.2)"
	});
})
mui("#config").on('touchcancel', '.config_item', function() {
	h(this).css({
		"backgroundColor": "white"
	});
})
mui("#config").on('touchend', '.config_item', function() {
	h(this).css({
		"backgroundColor": "white"
	});
})

//实现设置项hover时变色样式
mui(".user_info_div").on('touchstart', '#logout', function() {
	h(this).css({
		"backgroundColor": "rgba(100,100,100,0.2)"
	});
})
mui(".user_info_div").on('touchcancel', '#logout', function() {
	h(this).css({
		"backgroundColor": "rgba(100,100,100,0)"
	});
})
mui(".user_info_div").on('touchend', '#logout', function() {
	h(this).css({
		"backgroundColor": "rgba(100,100,100,0)"
	});
})


// 退出登录点击事件
mui(".user_info_div").on('touchstart', '#logout', function(e) {
	//阻止冒泡事件
	e.stopPropagation();
	//进行判断  如果已经登出 就不能再登出了
	if (plus.storage.getItem("user_unionid") == null) {
		return false;
	}
	var btnArray = ['心意已决', '我再想想'];
	mui.confirm("你是真的清除登录信息并..退..出吗?", "提示", btnArray, function(e) {
		switch (e.index) {
			case 0:
				//心意已决
				logout.logout("weixin");
				break;
			case 1:
				//我再想想
				mui.toast('这才对嘛...');
				break;
		}
	})
})

//登录完成后的页面操作
function change_page_login() {
	var user_nickname = plus.storage.getItem("user_nickname");
	var user_city = plus.storage.getItem("user_city");
	var user_province = plus.storage.getItem("user_province");
	var user_country = plus.storage.getItem("user_country");
	var user_face_img = plus.storage.getItem("user_face_img");

	//头像
	h("#user_face_img").css({
		"backgroundImage": "url(" + user_face_img + ")"
	});
	//昵称
	h("#user_nickname span").html(user_nickname);
	//地址信息
	h("#user_address span").html(user_country + " " + user_province + " " + user_city);
}


// 登出成功后进行页面布局的修改
function change_page_logout() {
	//头像
	h("#user_face_img").css({
		"backgroundImage": "url(../../img/my/user_face_img.png)"
	});
	//昵称
	h("#user_nickname span").html("请登录后操作");
	//地址信息
	h("#user_address span").html("nice to meet you ~");
}

// 设置项添加点击事件
h("#m_config").tap(function() {
	//打开新页面
	utils.openWindow_no_extras("../../pages/main-inner/my/config.html","my-config");
})

h("#m_about").tap(function(){
	utils.openWindow_no_extras("../../pages/main-inner/my/about.html","my-about");
})

mui.plusReady(function() {
	change_page_login();
})



var _self, _prev, _index;
mui.plusReady(function() {
	_self = plus.webview.currentWebview();
	_index = plus.webview.currentWebview().parent();
	_prev = plus.webview.getWebviewById("scene");

	_self.drag({
		direction: "right",
		moveMode: "followFinger"
	}, {
		view: _prev,
		moveMode: "follow"
	}, function(e) {
		if (e.type == "end" && e.result) {
			_index.evalJS("changeTabStyle(1)");
		}
	});
})
