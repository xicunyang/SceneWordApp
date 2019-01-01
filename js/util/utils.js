var utils = {
	// 对json对象的key进行自然排序
	sort_nature: function(obj) {
		var newKey = Object.keys(obj).sort();
		console.log(newKey);
		var newObj = {};
		for (var i = 0; i < newKey.length; i++) {
			newObj[newKey[i]] = [newKey[i]];
		}
		return newObj;
	},
	openWindow_no_extras: function(new_html, new_id) {
		mui.openWindow({
			url: new_html,
			id: new_id,
			createNew: false, //是否重复创建同样id的webview，默认为false:不重复创建，直接显示
			show: {
				autoShow: true, //页面loaded事件发生后自动显示，默认为true
				aniShow: "slide-in-right", //页面显示动画，默认为”slide-in-right“；
			},
			waiting: {
				autoShow: true, //自动显示等待框，默认为true
				title: '正在加载...', //等待对话框上显示的提示内容
			}
		});
	},
	openWindow_with_extras: function(new_html, new_id, data) {
		mui.openWindow({
			url: new_html,
			id: new_id,
			createNew: false, //是否重复创建同样id的webview，默认为false:不重复创建，直接显示
			extras: data,
			show: {
				autoShow: true, //页面loaded事件发生后自动显示，默认为true
				aniShow: "slide-in-right", //页面显示动画，默认为”slide-in-right“；
			},
			waiting: {
				autoShow: true, //自动显示等待框，默认为true
				title: '正在加载...', //等待对话框上显示的提示内容
			}
		});
	}
}
