mui.init();
mui(".mui-scroll-wrapper").scroll({
	bounce: true,//滚动条是否有弹力默认是true
	indicators: false, //是否显示滚动条,默认是true
});

//  页面跟随手指滑动
var _index, _self, _next;
mui.plusReady(function() {
	// 定义几个所需变量
	_self = plus.webview.currentWebview();
	_next = plus.webview.getWebviewById("my");
	//获取父窗体
	_index = plus.webview.currentWebview().parent();

	_self.drag({
		direction: "left",
		moveMode: "followFinger"
	}, {
		view: _next,
		moveMode: "follow"
	}, function(e) {
		// console.log(JSON.stringify(e));
		if (e.type == "end" && e.result) {
			_index.evalJS("changeTabStyle(2)");
		}
	})
})
