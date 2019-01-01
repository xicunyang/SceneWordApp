var is_open = true;
var is_open_who;

mui.plusReady(function(){
	//获取到上一个页面的 场景ID
	var _self = plus.webview.currentWebview();
	console.log(_self.scene_id);
	
})

mui(".mui-scroll-wrapper").scroll({
	bounce: true, //滚动条是否有弹力默认是true
	indicators: false, //是否显示滚动条,默认是true
});

mui.ready(function(){
	//初始化页面数据
	init_data();
	
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
	
	
	//点击事件
	mui(".mui-table-view").on('tap',".word",function(){
		//页面进行跳转
		var wordId = h(this).attr("id");
		var data = {
			word_id : wordId
		}
		utils.openWindow_with_extras("../../../../pages/main-inner/scene/word/word-detail.html","word-detail",data);
	})
	
	
	
	
	function init_data(){
		var html = "";
		var words = ["前台","电视","健身房","编程","前台","电视","健身房","编程","前台","电视","健身房","编程","前台","电视","健身房","编程"];
		var words_right = ["Reception","television","Gym","programming","Reception","television","Gym","programming","Reception","television","Gym","programming","Reception","television","Gym","programming"];
		var words_nums = [21,43,21,45,21,43,21,45,21,43,21,45,21,43,21,45];
		
		for(var i=0;i<words.length;i++){
			html+='<li class="mui-table-view-cell">'+
					'		<div class="mui-slider-left mui-disabled">'+
					'			<a class="mui-btn mui-btn-red mui-icon iconfont icon-shanchu"></a>'+
					'			<a class="mui-btn mui-btn-my mui-icon iconfont icon-edit"></a>'+
					'		</div>'+
					'		<div class="mui-slider-right mui-disabled">'+
					'			<a class="mui-btn mui-btn word_right_word"><span>'+words_right[i]+'</span></a>'+
					'			<!-- <a class="mui-btn mui-btn-my mui-icon iconfont icon-edit"></a> -->'+
					'		</div>'+
					'		<div class="mui-slider-handle word" id="111">'+
					'			<div class="word_card_index">'+
					'				<span class="mui-badge mui-badge-my-index scene_card_num">'+(i+1)+'</span>'+
					'			</div>'+
					'			<div class="word_card_word">'+
					'				<span>'+words[i]+'<span>'+
					'			</div>'+
					'			<span class="mui-badge mui-badge-my word_card_num">'+words_nums[i]+'</span>'+
					'		</div>'+
					'	</li>';
		}
		h(".mui-table-view").html(html);
	}
})