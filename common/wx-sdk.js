const jweixin = require('jweixin-module');
export default {
	//判断是否在微信中    
		isWechat: function() {
			var ua = window.navigator.userAgent.toLowerCase();
			return ua.match(/micromessenger/i) == 'micromessenger'
		},
		initJssdk: function(signPackage, callback) {
			jweixin.config({
				debug: false,
				// appId: signPackage.appId,
				appId: 'wxeb23f51daa27076e',
				timestamp: signPackage.timestamp,
				nonceStr: signPackage.nonceStr,
				signature: signPackage.signature,
				jsApiList: [ //这里是需要用到的接口名称  
					'checkJsApi', //判断当前客户端版本是否支持指定JS接口  
					'onMenuShareAppMessage', //分享接口  
					'getLocation', //获取位置  
					'openLocation', //打开位置  
					'scanQRCode', //扫一扫接口  
					'chooseWXPay', //微信支付  
					'chooseImage', //拍照或从手机相册中选图接口  
					'previewImage', //预览图片接口  
					'uploadImage' //上传图片  
				]
			});
			if (callback) callback()
		},
	
	//在需要定位页面调用  
		getlocation: function(signPackage,callback) {
			return new Promise((resolve,reject)=>{
				if (!this.isWechat()) {
					console.log('不是微信客户端')  
					return;
				}
				this.initJssdk(signPackage,function(res) {
					jweixin.ready(function() {
						jweixin.getLocation({
							type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'  
							success: async (res) => {
								// console.log(res); 
								let flag = await callback(res)
								resolve(flag)
							},
							fail: (res) => {
								// 进入失败回调，只能是微信客户端没有打开定位 或 打开了定位但是没有给微信客户端权限
								reject('需要获取您的位置信息，请确认已同意微信使用您的定位')
							},
							// complete:function(res){  
							//     console.log(res)  
							// }  
						});
					});
				});
			})
		},
		openlocation: function(data, callback) { //打开位置  
			jweixin.ready(function() {
				jweixin.openLocation({ //根据传入的坐标打开地图  
					latitude: data.latitude,
					longitude: data.longitude,
					name: data.name,
					address: data.address,
					scale: 14,
					success:()=>{
						console.log('H5-打开地图成功')
					}
				});
			});
		},
		// 预览图片
		previewImage: function(url) {
			console.log('开始预览')
			jweixin.previewImage({
				current: url, // 当前显示图片的http链接
				urls: [url] // 需要预览的图片http链接列表
			})
		},
		//选择图片
	chooseImage: function(callback) {   
			jweixin.ready(function() {
				jweixin.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['album', 'camera'],
					success: function(res) {
						console.log('======', res, '=====')
						callback(res)
					}
				})
			});
		},
	
	
	
	
	
	
}