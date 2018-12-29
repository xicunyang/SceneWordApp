// 底部云上升动画
h("#bottom_pic").css({
	"animation": "ani_cloud_grow 1s  1 forwards"
});
// 中间场景图片动画
h("#middle_pic").css({
	"animation": "ani_center_pic_show 1s  1 forwards"
});
// 中间文字动画
setTimeout(function() {
	h("#middle_word").css({
		"animation": "ani_center_word_show 1s  1 forwards"
	});
}, 800);

// 中间版本文字动画
setTimeout(function() {
	h("#bottom_version").css({
		"animation": "ani_center_word_show 1s  1 forwards"
	});
}, 1000);

setTimeout(function() {
	h("#middle_pic").css({
		"animation": "ani_rotateX 1.7s  1 forwards"
	})
}, 1800)


//页面切换
setTimeout(function() {
	mui.openWindow({
		url: "pages/main.html",
		id: "main",
		extras: {
			//自定义扩展参数，可以用来处理页面间传值
		},
		createNew: false, //是否重复创建同样id的webview，默认为false:不重复创建，直接显示
		show: {
			autoShow: true, //页面loaded事件发生后自动显示，默认为true
			aniShow: "slide-in-right", //页面显示动画，默认为”slide-in-right“；
			duration: 300 //页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
		},
		waiting: {
			autoShow: true, //自动显示等待框，默认为true
			title: '正在加载...', //等待对话框上显示的提示内容
		}
	})
}, 3500);

//实现中央图片的翻转
//一面单词  一面场景


mui.init();
mui.plusReady(function() {
	plus.navigator.closeSplashscreen();
	plus.navigator.setStatusBarBackground("#9ad7da");
})
