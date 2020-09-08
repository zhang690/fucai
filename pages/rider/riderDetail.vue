<template>
	<view class="wait-lingqu">
		<view class="lingqu-adress">
			<view class="lingqu-left">				
				<view class="adress-title">{{orde.Address}}</view>
				<view class="adress-info">
					<text>{{orde.MemberName}}</text><text class="info-phone">{{orde.Phone}}</text>
				</view>
			</view>	
			<view class="lingqu-right">
				<view class="iconfont icon-dizhi" @click="confirmAddress"></view>
				<!-- <input type="text" :value=value @confirm="" placeholder="111"/> -->
				<!-- <view class="mine">{{ address.distance ? Number(address.distance).toFixed(2) : 0 }}m</view> -->
			</view>	
		</view>
		<view class="lingqu-content">
			<view class="content-title" @click="handAddres">
				<view class="title-left">站点</view>
				<text>福彩到家---{{orde.OutletsName}}---投注站</text>
				<view class="lingqu-right">
					<view class="iconfont icon-dizhi"></view>
					<!-- <view class="mine">{{ address.distance ? Number(address.distance).toFixed(2) : 0 }}m</view> -->
				</view>		
			</view>
			<view class="content-info" v-for="(item,index) in listArray" :key='index'>
				<view class="info-icon">
					<image :src="orde.icon"></image>
				</view>
				<view class="info-item">
					<view class="info-name">
						<text>{{orde.iconName}} ------ </text>
					    <text> {{item.Types | TypesInfo }}</text>						
					</view>
					<view class="info-num">				
						<view class="red">{{item.RedBall | isRedBall }}</view>
						<view class="blue">{{item.BlueBall | isRedBall}}</view>
					</view>
				</view>
			</view>
			<view class="content-total">共{{listArray.length}}件商品</view>
		</view>
		<view class="order-time">兑换体验时间：{{orde.AddTime}}</view>
		<view class="lingqu-btn" @click="handleLingqu">
			<text>确认领取</text>			
		</view>
	</view>
</template>
<script>
	import common from '../../common/common'
	import QQMapWX from '../../utils/qqmap-wx-jssdk.min.js';
	// #ifdef H5
		var wx = require('jweixin-module');
		import wxSdk from "../../common/wx-sdk.js"
	// #endif
	var _self;
	export default {
		data() {
			return {
				orde: {},
				listArray:[],
				address:{}
			}
		},
		async onLoad(option) {
			_self = this;
			const detail =await JSON.parse(decodeURIComponent(option.waitList))		
			if (detail.orde.LotteryType === "1") {
				detail.orde.icon = "https://fucai.yiruit.com/UpFiles/shouye/shuangseqiu.png";
				detail.orde.iconName = '双色球'	
			} else if (detail.orde.LotteryType === "2") {
				detail.orde.icon = "https://fucai.yiruit.com/UpFiles/shouye/fucai3d.png";
				detail.orde.iconName = '福彩3D'		
			} else if (detail.orde.LotteryType === "3") {
				detail.orde.icon = "https://fucai.yiruit.com/UpFiles/shouye/qilecai.png";
				detail.orde.iconName = '七乐彩'	
			}else if (detail.orde.LotteryType === "4") {
				detail.orde.icon = "https://fucai.yiruit.com/UpFiles/shouye/scraping.png";
				detail.orde.iconName = '刮刮乐'				
			}
			_self.orde = detail.orde;
			_self.listArray = detail.list;
			_self.businessQuest()  // 商家经纬度
		},
		
		methods: {		
			confirmAddress(){// 通过腾讯地图api 根据地址获取经纬度
				// #ifdef H5
				console.log('_self.orde.Address',_self.orde.Address);
				common.request({
					path:'UserOrder/getaddressjinweidu',
					data:_self.orde.Address,
					success:(dataJinWei)=>{
						let jinweiObj = dataJinWei.data.openinfo.result.location
						console.log('address',dataJinWei.data.openinfo.result.title)
						dataJinWei = {
							latitude:jinweiObj.lat,
							longitude:jinweiObj.lng,
							name:dataJinWei.data.openinfo.result.title,
							address:_self.orde.Address
						}
						wxSdk.openlocation(dataJinWei);
					},
					fail:(res)=>{
						uni.showToast({
							title:'您的地址不正确',
							mask:true,
							duration:1500
						})
						console.log('fail_res',res);
					}
				})
				// #endif
			    // #ifdef MP-WEIXIN
			    let	qqMap = new QQMapWX({
			    	key: '5XTBZ-SXL6R-7OYWX-WTOCF-M7BUK-TSFBQ' // 必填
			    });
			    qqMap.geocoder({
			    	address: _self.orde.Address,   //用户输入的地址（注：地址中请包含城市名称，否则会影响解析效果），如：'北京市海淀区彩和坊路海淀西大街74号'
			    	complete: res => {						
			    		if(res){
			    			if(res.status === 0){								
			    				_self.getMap(res.result.location.lat,res.result.location.lng,res.result.title,res.result.title)								
			    			}else{
			    				uni.showToast({
			    					title: '获取用户坐标失败',
			    					icon: 'none',
			    					image: '',
			    					duration: 1500,
			    					mask: true,
			    				});
			    			}
			    		} else {
			    			uni.showToast({
			    				title: '无法定位到该地址，请确认地址信息!!!',
			    				icon: 'none',
			    				image: '',
			    				duration: 1500,
			    				mask: true,
			    			})							
			    		}
			    	}
			    })
			    // #endif
			},
			// 使用微信 js-sdk 的时候，都需要通过config接口注入权限验证配置。所以需要先调用后台接口获取config配置：
			getConfig() {  //调用微信的 js-sdk	
				common.request({
					path: 'login/getcode',
					method: 'GET',
					data: encodeURIComponent(location.href.split('#')[0]),
					success(res) {	
						wx.config({
							debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来,测试完成后需要关闭。
							appId: 'wxeb23f51daa27076e', // 必填，公众号的唯一标识
							timestamp: res.data.timestamp, // 必填，生成签名的时间戳
							nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
							signature: res.data.signature, // 必填，签名（加密后，下文有实现）
							jsApiList: ['scanQRCode','getLocation','openLocation'] ,// 必填，需要使用的JS接口列表，开发文档上有所有接口名称，根据需要选用就好。
						})
					},
					fail(err){
						uni.showToast({
							icon: 'none',
							title: '请求失败',
							duration: 1500,
						})
					}
				})
			},	
			// 获取商家坐标
			businessQuest(){  // 获取商家的经纬度
				// #ifdef H5	
				_self.getConfig()  // 调取 微信的  sdk
				wx.ready(()=>{
					wx.getLocation({
						type: "gcj02",
						success(res) {
							const latitude = res.latitude;
							const longitude = res.longitude;
							console.log('获取商家地址失败_res',res)
							console.log('_self.orde.OutletsID',_self.orde.OutletsID);
							common.request({
								path: "UserOrder/getoutlets",
								data: {
									companyid: _self.orde.OutletsID, // '48b2d1a0-c86c-4eb9-95d8-e2cfe054e1d2', //  F_CompanyId  //网点ID						
									longitude:longitude,         // 经度
									latitude:latitude            // 纬度
								},
								success: res => {	
									console.log('获取商家地址失败',res)
									if(res.data.rows.length === 0){
										uni.showToast({
											title: '获取商家地址失败',
											icon: 'none',
											image: '',
											duration: 1500,
											mask: true,
										});
										return
									}
									_self.address = res.data.rows[0]								
								}
							})
						},
						fail: err => {
						}
					})
				})
				// #endif	
				// #ifdef MP-WEIXIN
				uni.getLocation({
					type: "gcj02",
					success(res) {
						const latitude = res.latitude;
						const longitude = res.longitude;							
						common.request({
							path: "UserOrder/getoutlets",
							data: {
								companyid:_self.orde.OutletsID,		
								longitude:longitude,            // 经度
								latitude:latitude               // 纬度
							},
							success: res => {	
								if(res.data.rows.length === 0){
									uni.showToast({
										title: '获取商家地址失败',
										icon: 'none',
										image: '',
										duration: 1500,
										mask: true,
									});
									return
								}
								_self.address = res.data.rows[0]								
							}
						})					
					},
					fail: err => {
					}
				})	
				// #endif
			},
			handleLingqu() {
				uni.showModal({
					title: '提示',
					content: '确定领取该订单',
					success: function(res) {
						if (res.confirm) {							
							common.request({
								path: "UserOrder/uapdatepage",
								data: {
									id: _self.orde.ID,
									receivestate: "ylq",
									receivetime: common.Time()								
								},
								success: res => {	
									if(Object.keys(res.data).length === 0 ){							
										uni.showToast({
											title: '领取成功',
											icon: 'none',
											image: '',
											duration: 1500,
											mask: true,
										});
										uni.navigateTo({
											url: "./riderList"											
										})	
									}						
								}
							})
						}
					}
				})
			},
			handAddres(){   // 自己骑手的经纬度
				// 获取站点商家网点的 经纬度
				let { F_longitude,F_latitude } = _self.address;	
				F_latitude = parseFloat(F_latitude)
				F_longitude = parseFloat(F_longitude)
				
				if(F_latitude && F_longitude){
					_self.getMap(F_latitude,F_longitude,_self.orde.OutletsName,_self.orde.OutletsName)				
				}else{
					uni.showToast({
						title: '获取商家地址失败',
						icon: 'none',
						image: '',
						duration: 1500,
						mask: true,
					})
				}
			},
			getMap(latitude,longitude,name,address){
				// #ifdef H5
				let addressData={
					latitude,
					longitude,
					name,
					address,
					}
					console.log('addressData',addressData);
					wxSdk.openlocation(addressData)
				// #endif
				// #ifdef MP-WEIXIN
						uni.openLocation({
							latitude: latitude,
							longitude: longitude,
							name: name,
							address:address,
							success(res) {
							},
							fail(err) {
							}
						})
				// #endif
			}
		}
	}
</script>
<style lang="scss" scoped>
	.wait-lingqu {
		padding: 35rpx;
		.lingqu-adress {
			height: 100rpx;
			border-radius: 5rpx;
			box-shadow: 2rpx 2rpx 2rpx #bbb;
			background-color: #fff;
			padding: 20rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.lingqu-left{
				flex: 1;
				.adress-title {
					font-size: 30rpx;
				}
				.adress-info {
					margin-top: 20rpx;
					font-size: 26rpx;
					color: #999;
					.info-phone {
						margin-left: 30rpx;
					}
				}
			}			
			.lingqu-right{
				display: flex;
				flex-direction: row;
				align-items: center;
				.icon-dizhi{
					color: #666;
				}
				.mine{
					color: #666;
				}
			}
		}

		.lingqu-content {
			margin-top: 20rpx;
			border-radius: 10rpx;
			background-color: #fff;
			box-shadow: 2rpx 2rpx 2rpx #eee;

			.content-title {
				display: flex;
				border-bottom: 2rpx solid #eee;
				padding-bottom: 10rpx;
				padding: 20rpx 20rpx;
				align-items: center;
				justify-content: space-between;
				.title-left {
					background-color: $color;
					width: 80rpx;
					height: 35rpx;
					text-align: center;
					line-height: 35rpx;
					border-radius: 5rpx;
					margin-right: 15rpx;
					color: #fff;
					font-size: 24rpx;
				}
				.lingqu-right{
					display: flex;
					flex-direction: row;
					align-items: center;
					.icon-dizhi{
						color: #666;
					}
					.mine{
						color: #666;
					}
				}
			}
			.content-info {
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				padding: 25rpx 20rpx;				
				.info-icon {
					width: 90rpx;
					height: 90rpx;	
					margin-right: 20rpx;
					image {
						display: block;
						width: 100%;
						height: 100%;
					}
				}
				.info-item{
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					.info-name{
						display: flex;
						flex-direction: row;
						text{
							color: #666;
							&:last-child{
								margin-left: 10rpx;
							}
						}
					}					
					.info-num {
						flex: 1;
						display: flex;
						justify-content: flex-start;
						align-items: center;
						.red{						
							color: red;		
							white-space:pre;
						}
						.blue{
							color: blue;
							margin-left: 16rpx;
						}
					}
				}				
			}
			.content-total{
				text-align: right;
				padding: 20rpx 0;
				padding-right: 20rpx;
				color: #999;
			}
		}

		.order-time {
			margin-top: 20rpx;
			background-color: #fff;
			color: #999;
			height: 50rpx;
			line-height: 50rpx;
			padding: 20rpx;
			border-radius: 5rpx;
		}

		.lingqu-btn {
			position: fixed;
			bottom: 0rpx;
			width: 100%;
			left: 50%;
			height: 120rpx;
			transform: translateX(-50%);
			background-color: #faf6f7;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			text{				
				width: 90%;
				height: 60rpx;				
				border-radius: 30rpx;
				color: #fff;
				background-color: $color;
				line-height: 60rpx;
				text-align: center;
			}
		}
	}
	
</style>
