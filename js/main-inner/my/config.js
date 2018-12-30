mui.init({
	swipeBack: true //启用右滑关闭功能
});

// 批量获取开关对象数组
var mui_switchs = document.getElementsByClassName("mui-switch");
for(var i=0;i<mui_switchs.length;i++){
	//循环开关对象数组  进行事件的绑定
	mui_switchs[i].addEventListener("toggle",function(event){
		//根据前端页面的msg属性  即可知道是哪个开关在进行操作
		var msg = h(this).attr("msg");
		if(event.detail.isActive){
			mui.toast("你开启了开关"+msg);
		}else{
			mui.toast("你关闭了开关"+msg);
		}
	})
}