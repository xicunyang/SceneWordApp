var is_open = true;
var is_open_who;

// 初始化轮播图控件
var gallery = mui('.mui-slider');
gallery.slider();

mui.plusReady(function() {
	var scene_style = plus.storage.getItem("scene_style");
	//判断应该显示什么
	if (scene_style == "list") {
		init_data_l();
		h("#change_style").attr("msg", "list");
	} else {
		init_data_p();
		h("#change_style").attr("msg", "p");
		h("#change_style").removeClass("icon-pubuliu");
		h("#change_style").addClass("icon-list");
	}
	
	
})

mui.ready(function() {
	// init_data_l();
	mui(".mui-scroll-wrapper").scroll({
		bounce: true, //滚动条是否有弹力默认是true
		indicators: false, //是否显示滚动条,默认是true
	});

	// 设置悬浮按钮点击时的样式,类似hover效果
	mui(".mui-content").on('touchstart', '.float_button', function() {
		h(this).css({
			"backgroundColor": "rgba(255,79,84,0.5)"
		});
	})
	mui(".mui-content").on('touchend', '.float_button', function() {
		h(this).css({
			"backgroundColor": "rgb(255,79,84)"
		});
	})
	mui(".mui-content").on('touchcancel', '.float_button', function() {
		h(this).css({
			"backgroundColor": "rgb(255,79,84)"
		});
	})

	// 点击切换页面展示样式
	h("#change_style").tap(function() {
		//先取出msg的值

		var msg = h(this).attr("msg");
		console.log(msg);
		if (msg == "list") {
			//从list-->卡片
			console.log("从list-->卡片");
			h(this).removeClass("icon-pubuliu");
			h(this).addClass("icon-list");
			h(this).attr("msg", "p");
			h("#l_scenes").html("");
			init_data_p();
			//存到本地持久化
			plus.storage.setItem("scene_style", "p");
		} else {
			//从卡片-->list
			console.log("从卡片-->list");
			h(this).removeClass("icon-list");
			h(this).addClass("icon-pubuliu");
			h(this).attr("msg", "list");
			h("#p_scenes").html("");
			init_data_l();
			plus.storage.setItem("scene_style", "list");
		}
	})

	//添加场景
	h(".float_button").tap(function() {
		// utils.openWindow_no_extras("../../../pages/main-inner/scene/scene-add.html","scene-add");		

		//获得slider插件对象 
		//默认显示在第一个
		gallery.slider().gotoItem(0);
				
		//将箭头和叉号的hide类名去掉
		h(".next_page_ch").removeClass("hide_ch");
		h(".next_page_jt").removeClass("hide_jt");
		//init弹出框内的值
		mui("#sheet_progressbar").progressbar({
			progress: (now_slide_num + 1) / 4 * 100
		}).show();

		//最后再显示底部菜单
		mui('#scene_add_sheet').popover('toggle');
		
	})

	//默认
// 	mui('#scene_add_sheet').popover('toggle');
// 		var gallery = mui('.mui-slider');
// 		gallery.slider({
// 			interval: 0 //自动轮播周期，若为0则不自动播放，默认为0；
// 		});
// 	gallery.slider().gotoItem(2);

	// 轮播图滑动slide事件
	var now_slide_num = 0;
	document.querySelector('.mui-slider').addEventListener('slide', function(event) {
		console.log(event.detail.slideNumber);
		now_slide_num = event.detail.slideNumber;
		//使用进度条
		var progress = (now_slide_num + 1) / 4 * 100;
		mui("#sheet_progressbar").progressbar({
			progress: progress
		}).show();
	})

	// 轮播图中的下一页点击事件
	var next_page_jts = document.getElementsByClassName("next_page_jt");
	for (var i = 0; i < next_page_jts.length; i++) {
		next_page_jts[i].addEventListener("tap", function() {
			//切换页面
			gallery.slider().gotoItem(now_slide_num+1);
		})
	}
	
	// 点击增加场景提交按钮
	h("#btn_submit").tap(function(){
		mui('#scene_add_sheet').popover('toggle');
		mui("#sheet_progressbar").progressbar({
			progress: 20
		}).show();
	});


	// 文字输入监听事件
	document.getElementById("input_scene_word").addEventListener('input', function() {
		if (this.value.length > 0) {
			//显示叉号
			show_ch(".scene_name");
		} else {
			//隐藏叉号
			hide_ch(".scene_name");
		}
	});
	document.getElementById("input_scene_desc").addEventListener('input', function() {
		if (this.value.length > 0) {
			//显示叉号
			show_ch(".scene_desc");
		} else {
			//隐藏叉号
			hide_ch(".scene_desc");
		}
	});

	function show_ch(className) {
		//显示叉号
		h(className + " .next_page_ch").removeClass("hide_ch");
		h(className + " .next_page_jt").removeClass("hide_jt");
		h(className + " .next_page_ch").addClass("show_ch");
		h(className + " .next_page_jt").addClass("show_jt");
	}

	function hide_ch(className) {
		//隐藏叉号
		h(className + " .next_page_ch").removeClass("show_ch");
		h(className + " .next_page_jt").removeClass("show_jt");
		h(className + " .next_page_ch").addClass("hide_ch");
		h(className + " .next_page_jt").addClass("hide_jt");
	}

	// 叉号的点击事件
	h(".scene_name .next_page_ch").tap(function() {
		h("#input_scene_word").val("");
		//隐藏叉号
		hide_ch(".scene_name");
	});
	h(".scene_desc .next_page_ch").tap(function() {
		h("#input_scene_desc").val("");
		//隐藏叉号
		hide_ch(".scene_desc");
	});
	h(".scene_pic .next_page_ch").tap(function() {
		h("#show_pic").css({
			"backgroundImage":"url()"
		});
		h(".icon-shangchuan").css({"opacity":"1"})
		//隐藏叉号
		hide_ch(".scene_pic");
	});
	
	
	// 点击摄像头拍照事件
	h("#from_camera").tap(function(){
		var cmr = plus.camera.getCamera();
		cmr.captureImage(
		function(path){ 
			console.log("cmr--path--->"+path);
			plus.io.resolveLocalFileSystemURL(path,function(e){
	            console.log(e.fullPath);
				plus.storage.setItem("upload_scene_pic_path",e.fullPath);
				//将上传云标签隐藏掉
				h(".icon-shangchuan").css({"opacity":"0"})
				h("#show_pic").css({
					"backgroundImage":"url("+e.fullPath+")"
				});
				show_ch(".scene_pic");
	        }); 
		},
		function(){
			// console.log("error");
			mui.toast("相机加载异常");
		},
		{})
	});
	
	//点击图库事件
	h("#from_library").tap(function(){
		plus.gallery.pick(
		function(path){
			plus.io.resolveLocalFileSystemURL(path,function(e){
				console.log(e.fullPath);
				h(".icon-shangchuan").css({"opacity":"0"})
				h("#show_pic").css({
					"backgroundImage":"url("+e.fullPath+")"
				})
				show_ch(".scene_pic");
			})
		},
		function(){
			mui.toast("图库加载异常");
		}, {filter:"image"});
	});


	//向上滑动
	document.querySelector('.mui-scroll-wrapper').addEventListener("swipeup", function(e) {
		h(".float_button").css({
			"animation": "ani_float_btn_hide 1s  1 forwards"
		})
	})
	//向下滑动
	document.querySelector('.mui-scroll-wrapper').addEventListener("swipedown", function(e) {
		h(".float_button").css({
			"animation": "ani_float_btn_show 1s  1 forwards"
		})
	})




	//标签的左右滑动 
	var lis = document.getElementsByClassName('mui-table-view-cell');
	for (var i = 0; i < lis.length; i++) {
		lis[i].addEventListener("swipeleft", function(e) {
			//向左滑动
			var id = h(this).find("div").eq(1).attr("id");
			console.log(id + "--->关闭");
			is_open = true;
			is_open_who = id;
		});
		lis[i].addEventListener("swiperight", function(e) {
			//向右滑动
			var id = h(this).find("div").eq(1).attr("id");
			console.log(id + "--->打开");
			is_open = false;
			is_open_who = id;
		});
	}

	// 新添加元素的点击事件
	mui("body").on('tap', ".scene", function() {
		//跳转页面并传值
		var sceneId = h(this).attr("id");

		/**
		 * 打开111 -->点击其他人---->111自动关掉
		 * 		  |           |
		 *		  |            --->is_open = true
		 *		  | 	
		 *		   -->点自己  ---->是自己吗
		 * 					 |
		 * 					  --->不是自己
		 * 
		 */

		console.log(sceneId + "---" + is_open_who + "---" + is_open);
		if (!is_open) {
			//现在处于打开状态
			if (sceneId == is_open_who) {
				console.log("是本人");
				return false;
			}
			console.log("不是本人");
			is_open = true;
			return false;
		}


		var data = {
			scene_id: sceneId
		};
		utils.openWindow_with_extras("../../../pages/main-inner/scene/word/word-library.html", "word-library", data);
	})

});

function init_data_l() {
	var scenes = ["公司", "厨房", "地铁", "上班路上", "枣庄小炒", "潍院", "潍院宿舍", "天一楼", "大巴车", "高铁动车", "绿皮车", "大棚吃饭", "大排档", "年会", "排练"];
	var scnens_nums = [12, 22, 16, 23, 45, 21, 32, 54, 12, 23, 23, 43, 12, 32, 13];

	var html = '<ul class="mui-table-view">';
	for (var i = 0; i < scenes.length; i++) {
		html +=
			'<li class="mui-table-view-cell">' +
			'	<div class="mui-slider-left mui-disabled">' +
			'		<a class="mui-btn mui-btn-red mui-icon iconfont icon-shanchu"></a>' +
			'		<a class="mui-btn mui-btn-my mui-icon iconfont icon-edit"></a>' +
			'	</div>' +
			'	<div class="mui-slider-handle scene" id="' + i + '">' +
			'		<div class="scene_card_index">' +
			'			<span class="mui-badge mui-badge-my-index scene_card_num">' + (i + 1) + '</span>' +
			'		</div>' +
			'		<div class="scene_card_word">' +
			'			<span>' + scenes[i] + '<span>' +
			'		</div>' +
			'		<span class="mui-badge mui-badge-my scene_card_num">' + scnens_nums[i] + '</span>' +
			'	</div>' +
			'</li>';
	}
	html += '</ul>';
	h("#l_scenes").html(html);
}

function init_data_p() {
	/**
	 * 思路：
	 * 还是单个for循环
	 * 判断奇偶数
	 * 奇数  用  item  +  left
	 * 偶数  用  right +  /item
	 * 
	 * 最后一个元素进行判断
	 * 此时 只针对left  就加上 /item
	 * 
	 * 如果是right作为结束  
	 * 不用加 /item
	 */
	var scenes = ["公司", "厨房", "地铁", "上班路上", "枣庄小炒", "潍院", "潍院宿舍", "天一楼", "大巴车", "高铁动车", "绿皮车", "大棚吃饭", "大排档", "年会", "排练",
		"sss"
	];
	var scnens_nums = [12, 22, 16, 23, 45, 21, 32, 54, 12, 23, 23, 43, 12, 32, 13, 33];

	var html = '';

	for (var i = 0; i < scenes.length; i++) {
		var inner_html = '';
		if (i % 2 == 0) {
			//偶数
			inner_html =
				'<div class="p_scene_item">' +
				'	<div class="p_scene_left">' +
				'		<ul class="mui-table-view">' +
				'			<li class="mui-table-view-cell">' +
				'				<div class="mui-slider-left mui-disabled">' +
				'					<a class="mui-btn mui-btn-red mui-icon iconfont icon-shanchu"></a>' +
				'					<a class="mui-btn mui-btn-my mui-icon iconfont icon-edit"></a>' +
				'				</div>' +
				'				<div class="mui-slider-handle scene" id="' + i + '">' +
				'					<div class="mui-table-cell">' +
				'						<div class="scene_card_index_left">' +
				'							<span class="mui-badge mui-badge-my-index">' + (i + 1) + '</span>' +
				'						</div>' +
				'						<div class="scene_card_word">' +
				'							<span>' + scenes[i] + '</span>' +
				'					    </div>' +
				'					    <div class="gaosi"></div>' +
				'						<div class="scene_card_num">' +
				'							<span class="mui-badge mui-badge-my">' + scnens_nums[i] + '</span>' +
				'						</div>								' +
				'					</div>' +
				'				</div>' +
				'			</li>' +
				'		</ul>' +
				'	</div>';
			if ((i + 1) == scenes.length) {
				//到了最后一个
				//将left的最后拼上</div>
				inner_html += '<div>';
			}

		} else {
			//奇数
			inner_html =
				'<div class="p_scene_right">' +
				'	<ul class="mui-table-view">' +
				'		<li class="mui-table-view-cell">' +
				'			<div class="mui-slider-right mui-disabled">' +
				'				<a class="mui-btn mui-btn-red mui-icon iconfont icon-shanchu"></a>' +
				'				<a class="mui-btn mui-btn-my mui-icon iconfont icon-edit"></a>' +
				'			</div>' +
				'			<div class="mui-slider-handle scene" id="' + i + '">' +
				'				<div class="mui-table-cell">' +
				'					<div class="scene_card_index_right">' +
				'						<span class="mui-badge mui-badge-my-index">' + (i + 1) + '</span>' +
				'					</div>' +
				'					<div class="scene_card_word">' +
				'						<span>' + scenes[i] + '</span>' +
				'					</div>' +
				'					<div class="gaosi"></div>' +
				'					<div class="scene_card_num">' +
				'						<span class="mui-badge mui-badge-my">' + scnens_nums[i] + '</span>' +
				'					</div>' +

				'				</div>' +
				'			</div>' +
				'		</li>' +
				'	</ul>' +
				'</div>' +
				'</div>';
		}


		html += inner_html;
	}


	//进行塞值操作
	// console.log(html);
	h("#p_scenes").html(html);
}
