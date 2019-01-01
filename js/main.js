mui.init({
			subpages: [{
					url: '../pages/main-inner/scene.html',
					id: 'scene',
					styles: {
						top: '0',
						bottom: '50px',
						top:'40px',
						width: '100%'
					}
				},
				{
					url: '../pages/main-inner/my.html',
					id: 'my',
					styles: {
						top: '0',
						bottom: '50px',
						width: '100%',
						left: '100%',
						top:'40px',
					}
				}
			]
		});
		h("#bottom_scene").tap(function() {
			changeTabStyle(1);
			changeTab(1);
		})
		h("#bottom_my").tap(function() {
			changeTabStyle(2);
			changeTab(2);		
		})

		/**
		 * 切换页面函数  index:需要跳转到的页面下标
		 */
		function changeTab(index) {
			var bottom_scene = plus.webview.getWebviewById('scene');
			var bottom_my = plus.webview.getWebviewById('my');

			bottom_scene.setStyle({
				left: (1 - index) * 100 + "%"
			});
			bottom_my.setStyle({
				left: (2 - index) * 100 + "%"
			});
		}

		function main_login() {
			var user_id = plus.storage.getItem("user_unionid");
			if (user_id == null) {
				console.log("进入登录...");
				login.login("weixin");
				return false;
			}
			console.log("已登录...");
		}

		function changeTabStyle(index) {
			if (index == 2) {
				main_login();
			}
			index = index - 1;
			//先把所有的标签的a的激活样式去掉
			h(".mui-bar-tab").find("a").removeClass("mui-active");
			h(".mui-bar-tab").find("a").eq(index).addClass("mui-active");

			//图标下的文字的显示与隐藏
			var select_id = "";
			var un_select_id = "";
			switch (index + 1) {
				case 1:
					select_id = "bottom_scene";
					un_select_id = "bottom_my";

					break;
				case 2:
					select_id = "bottom_my";
					un_select_id = "bottom_scene";
					break;
			}
			h("#" + un_select_id).find("span").last().css({
				"display": "none"
			});
			h("#" + select_id).find("span").last().css({
				"display": "block"
			});
		}

		document.addEventListener("plusready", function() {
			//在新页面加载之后  先去关闭上一个父页面	
			setTimeout(function() {
				plus.webview.currentWebview().opener().close("none");
			}, 1000);
		})