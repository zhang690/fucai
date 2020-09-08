<template>
	<view class="duihuan">
		<view class="duihuan-wrap">
			<view class="search_wrap">
				<view class="search_item" v-for="(item,index) in duihuanList" :key="index">
					<view class="search_item_left">
						<view class="search_left_title">{{item.F_FullName}}</view>
						<view class="search_left_text">
							<text class="iconfont icon-dizhi"></text>
							{{item.F_Address}}
						</view>
					</view>
					<view class="search_item_right" @click="handleMap(item)">
						<view class="search_right_num">{{ item.distance ? parseFloat(item.distance).toFixed(2) : '0' }}km</view>
						<view class="item-right">
							<image src="../../static/shang.png" mode="widthFix"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	// #ifdef H5
		var wx = require('jweixin-module');
		import wxSdk from "../../common/wx-sdk.js"
	// #endif
	import common from '../../common/common'
	var _self;
	export default {
		data() {
			return {
				duihuanList: []
			}
		},
		onLoad() {
			_self = this;
			_self.handleList();
		},
		methods: {
			handleList() {
				const { latitude,longitude } = uni.getStorageSync("jingwei");
				common.request({
					path: "Order/getoutlets",
					data: {
						name: '',
						longitude,
						latitude,
						rows: 10,
						page: 1,
						sidx: "",
						sord: ""
					},
					success: res => {
						_self.duihuanList = res.data.rows					
					}
				})
			},
			// 使用微信 js-sdk 的时候，都需要通过config接口注入权限验证配置。所以需要先调用后台接口获取config配置：
			getConfig() {  //调用微信的 js-sdk	
				common.request({
					path: 'login/getcode',
					method: 'GET',
					data: encodeURIComponent(location.href.split('#')[0]),
					success(res) {	
						wx.config({
							debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来,测试完成后需要关闭。
							appId: 'wxeb23f51daa27076e', // 必填，公众号的唯一标识
							timestamp: res.data.timestamp, // 必填，生成签名的时间戳
							nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
							signature: res.data.signature, // 必填，签名（加密后，下文有实现）
							jsApiList: ['scanQRCode','getLocation'] ,// 必填，需要使用的JS接口列表，开发文档上有所有接口名称，根据需要选用就好。
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
			handleMap(item){
				let F_latitude = parseFloat(item.F_latitude)
				let F_longitude = parseFloat(item.F_longitude)				
				if(F_latitude && F_longitude){	
					// #ifdef H5
					_self.getConfig();
					let addressData={
						latitude:F_latitude,
						longitude:F_longitude,
						name:item.F_FullName,
						address:item.F_Address,
						}
						console.log('addressData',addressData);
						wxSdk.openlocation(addressData)
					// #endif
					// #ifdef MP-WEIXIN
							uni.openLocation({
								latitude: F_latitude,
								longitude: F_longitude,
								name: item.F_FullName,
								address:item.F_Address,
								success(res) {
								},
								fail(err) {
								}
							})
					// #endif
				}else{
					uni.showToast({
						title: '获取商家地址失败',
						icon: 'none',
						image: '',
						duration: 1500,
						mask: true,
					})
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	.duihuan {
		.search_wrap {
			.search_item {
				display: flex;
				justify-content: space-between;
				width: 88%;
				margin: 20rpx auto 0;
				padding: 20rpx;
				align-items: center;
				background-color: #fff;
				border-radius: 8rpx;
				.search_item_left {					
					.search_left_text {
						color: #999;
						margin-top: 20rpx;
						text{
							margin-right: 10rpx;
						}						
					}
				}
				.search_item_right {
					display: flex;
					flex-direction: row;
					align-items: center;
					.search_right_num {
						color: #999;
						margin-right: 10rpx;
					}
					.item-right {						
						image{
							width: 20rpx;
							height: 20rpx;
							transform: rotate(90deg); 
						}
					}	
				}
			}
		}
	}
</style>
