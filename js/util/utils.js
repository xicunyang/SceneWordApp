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
	}
}
