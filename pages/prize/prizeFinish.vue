<template>
	<view class="wait-lingqu">
		<!-- <view class="item-user">
			<view class="item-name">{{orde.Name}}</view>
			<view class="user-phone">{{orde.Phone}}</view>
		</view>		 -->
		<view class="lingqu-content" v-if="listArray.length > 0">
			<view class="content-info" v-for="(item,index) in listArray" :key="index">
				<view class="info-icon">
					<image :src="orde.icon"></image>
				</view>
				<view class="info-item">
					<view class="info-num">
						<text class="red">{{item.RedBall | isRedBall}}</text>
						<text class="blue">{{item.BlueBall | isRedBall}}</text>
					</view>
					<view class="info-bar">
						<view class="item" v-for="(list,ind) in item.Remarks" :key='ind'>
							{{list}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="order-number">
			<view class="order-number-info">
				<view class="order-number-left">兑换编号</view>
				<view class="order-number-right">{{orde.OrderNumber}}</view>
			</view>
			<view class="order-number-info">
				<view class="order-number-left">开奖期</view>
				<view class="order-number-right">第{{orde.Fixed}}期</view>
			</view>
			<view class="order-number-info">
				<view class="order-number-left">中奖金额</view>
				<view class="order-number-right">￥{{orde.Amount}} 元</view>
			</view>
			<view class="order-number-info">
				<view class="order-number-left">服务网点</view>
				<view class="order-number-right">{{orde.OutletsName}}</view>
			</view>
			<view class="order-number-info" @tap="goNavigation">
				<view class="order-number-left">网点地址</view>
				<view class="order-number-right Exchange_right">
					<view class="order-number-address">
						{{orde.F_Address}}
					</view>
					<view class="iconfont icon-dizhi"></view>
				</view>
			</view>

			<view class="order-number-info">
				<view class="order-number-left">创建时间</view>
				<view class="order-number-right">{{orde.AddTime}}</view>
			</view>
		</view>
		<view class="order-number">
			<view class="order-number-info">
				<view class="order-number-left">核奖状态</view>
				<view class="order-number-right">{{orde.AmouType === '1' ? '待兑奖': orde.AmouType === '2' ? '已兑奖' : '已取票' }}</view>
			</view>
		</view>
		<view class="lingqu-btn" @click="handleLianxi">联系客服</view>
		<!-- 图片集 -->
		<view class="order_img">
			<view class="list_img">
				<view class="item" v-for="(url,index) in imgArray" :key='index'>
					<image :src="imgUrl + url" mode="aspectFill" @click="handleImg"></image>
				</view>
			</view>
		</view>


		<!-- 弹框 -->
		<view class="background" v-if="isShow"></view>
		<view class="bag_img" v-if="isShow">
			<view class="bag_map">
				<view class="bag_item" @click="handleClone">
					<image src="../../static/mine/watch.png" mode="aspectFill"></image>
					<text>客服微信</text>
				</view>
				<view class="bag_item" @click="handleTanke">
					<image src="../../static/mine/tel.png" mode="aspectFill"></image>
					<text>17373245005</text>
				</view>
			</view>
			<view class="close" @click="handleClose">
				<image src="../../static/lucky/close.png" mode="aspectFill"></image>
			</view>
		</view>
	</view>
</template>
<script>
	import common from '../../common/common'
	// #ifdef H5
	import icanH5Api from '../../common/ican-H5Api'
	import wxSdk from '../../common/wx-sdk.js'
	const jweixin = require('jweixin-module');
	// #endif
	var _self;
	export default {
		data() {
			return {
				orde: {},
				listArray: [],
				imgArray: [],
				isShow: false,
				imgUrl: common.PicURL
			}
		},
		onLoad(option) {
			_self = this;
			if (option.waitList) {
				let detail = JSON.parse(decodeURIComponent(option.waitList))
				console.log('detail', detail)
				if (detail.orde.LotteryType === "1") {
					detail.orde.icon = "https://fucai.yiruit.com/UpFiles/shouye/shuangseqiu.png";
					detail.orde.iconName = '双色球'
				} else if (detail.orde.LotteryType === "2") {
					detail.orde.icon = "https://fucai.yiruit.com/UpFiles/shouye/fucai3d.png";
					detail.orde.iconName = '福彩3D'
				} else if (detail.orde.LotteryType === "3") {
					detail.orde.icon = "https://fucai.yiruit.com/UpFiles/shouye/qilecai.png";
					detail.orde.iconName = '七乐彩'
				} else if (detail.orde.LotteryType === "4") {
					detail.orde.icon = "https://fucai.yiruit.com/UpFiles/shouye/scraping.png";
					detail.orde.iconName = '刮刮乐'
				}
				_self.orde = detail.orde;

				for (var i = 0; i < detail.list.length; i++) {
					if (detail.list[i].Remarks) {
						//中奖 注数 价格 去掉前后的#								
						detail.list[i].Remarks = detail.list[i].Remarks.replace(/^\#|\#$/g, '')
						//中奖 注数 价格 以#进行切割成数组					
						detail.list[i].Remarks = (detail.list[i].Remarks.split("#"))
						_self.listArray = detail.list
					} else {
						_self.listArray = detail.list
					}
				}
				// 图片展示
				if (_self.orde.LotteryImage) {
					_self.imgArray = _self.orde.LotteryImage.split(","); // 获取图片  字符串转数组
				}
			}
		},
		methods: {
			// 点击地址跳转导航
			goNavigation() {
				// 配置wx.config，并打开导航
				let addressData = {
					latitude: parseFloat(_self.orde.F_latitude),
					longitude: parseFloat(_self.orde.F_longitude),
					name:  _self.orde.OutletsName,
					address:  _self.orde.F_Address,
				}
				// #ifdef H5
					common.request({
						path: 'login/getcode',
						method: 'GET',
						data: encodeURIComponent(location.href.split('#')[0]),
						success(res3) {
							let signPackage = res3.data;
							wxSdk.initJssdk(signPackage);	// 初始化 wx-sdk的config配置
							wxSdk.openlocation(addressData)// 调用 wx-sdk
						}
					})
				// #endif
				// #ifdef MP-WEIXIN
						uni.openLocation({
							latitude: addressData.latitude,
							longitude: addressData.longitude,
							name: addressData.name,
							address: addressData.address,
							success() {},
							fail(err) {
								// console.log(err);
							}
						})
				// #endif
				
				
			},
			handleLianxi() {
				_self.isShow = true
			},
			handleClose() { // 关闭客服
				_self.isShow = false
			},
			handleClone() { // 复制微信号
				uni.setClipboardData({
					data: 'fucaidaojia-0001', // 要复制的文字
					success: function(res) {
						uni.getClipboardData({
							success: function(res) {
								uni.showToast({
									title: '复制成功'
								})
							}
						})
					}
				})
			},
			handleTanke() { // 拨打电话
				uni.makePhoneCall({
					phoneNumber: '17373245005'
				})
			},
			handleImg() { // 放大预览图片
				var imgList = []
				for (let i = 0; i < _self.imgArray.length; i++) {
					imgList.push(_self.imgUrl + _self.imgArray[i])
				}
				uni.previewImage({
					urls: imgList
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.wait-lingqu {
		padding: 35rpx;

		.item-user {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			background-color: #fff;
			border-radius: 10rpx;
			padding: 30rpx;

			.user-name {
				color: #333;
				font-size: 16px;
			}

			.user-phone {
				color: #999;
				font-size: 14px;
				margin-top: 10rpx;
			}
		}

		.lingqu-content {
			margin-top: 20rpx;
			padding: 10rpx 20rpx 20rpx;
			border-radius: 10rpx;
			background-color: #fff;
			box-shadow: 2rpx 2rpx 2rpx #eee;

			.content-title {
				font-size: 16px;
				font-weight: bold;
				color: #333;
				margin-bottom: 10rpx;
			}

			.content-info {
				width: 100%;
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				padding: 25rpx 0rpx;

				.info-icon {
					width: 90rpx;
					height: 90rpx;
					margin-right: 30rpx;

					image {
						display: block;
						width: 100%;
						height: 100%;
					}
				}

				.info-item {
					display: flex;
					flex: 1;
					flex-direction: column;
					justify-content: space-between;

					.info-num {
						flex: 1;

						.red {
							color: red;
						}

						.blue {
							color: blue;
							margin-left: 16rpx;
						}
					}

					.info-bar {
						display: flex;
						flex-direction: column;
						justify-content: space-between;

						.item {
							margin-top: 30rpx;
						}
					}
				}
			}
		}

		.order-number {
			height: auto;
			margin: 0 auto;
			margin-top: 20rpx;
			background-color: #fff;
			color: #999;
			padding: 30rpx 20rpx;
			border-radius: 5rpx;

			.order-number-info {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				font-size: 14px;
				color: #666;
				padding-bottom: 20rpx;
				margin-bottom: 20rpx;
				border-bottom: 1px solid #eee;

				&:last-of-type {
					margin-bottom: 0;
					padding-bottom: 0;
					border-bottom: none;
				}

				.order-number-left {
					width: 150rpx;
				}

				.order-number-right {
					flex: 1;
					text-align: right;
				}

				.Exchange_right {
					display: flex;
					flex-direction: row;
					justify-content: space-between;

					.order-number-address {
						text-align: left;
					}

					.icon-dizhi {
						width: 40rpx;
						display: flex;
						justify-content: center;
						align-items: center;
					}
				}
			}
		}

		.paizhao {
			height: auto;
			margin: 0 auto;
			margin-top: 20rpx;
			background-color: #fff;
			color: #999;
			padding: 30rpx;
			border-radius: 5rpx;
			display: flex;
			flex-direction: column;
			align-items: center;

			.paizhao_num {
				font-size: 50px;
				color: #999;
			}

			text {
				font-size: 14px;
				color: #999;
			}
		}

		.paizhao_info {
			height: auto;
			margin: 0 auto;
			display: flex;
			justify-content: center;
			align-items: center;

			image {
				width: 70%;
			}
		}

		.lingqu-btn {
			margin-top: 80rpx;
			width: 100%;
			height: 80rpx;
			text-align: center;
			background-color: #ff3c36;
			color: #fff;
			line-height: 80rpx;
			border-radius: 30rpx;
		}
	}

	.background {
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.5);
		position: fixed;
		left: 0;
		top: 0;
		z-index: 1;
	}

	.bag_img {
		transform: translate(-50%, -50%);
		position: fixed;
		left: 50%;
		top: 50%;
		background-color: rgba(255, 255, 255, 1);
		border-radius: 10px;
		padding: 20px;
		color: #fff;
		z-index: 2 !important;
		width: 500rpx;
		height: 200rpx;

		.bag_map {
			width: 100%;
			height: auto;
			display: flex;
			flex-direction: column;
			align-items: center;

			.bag_item {
				width: 100%;
				height: 80rpx;
				line-height: 80rpx;
				overflow: hidden;
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				align-items: center;
				padding: 16rpx 0;
				border-bottom: 1px solid #eee;

				&:last-of-type {
					border-bottom: none;
					margin: 0 auto;
				}

				image {
					width: 50rpx;
					height: 50rpx;
					display: block;
					margin-right: 30rpx;
				}

				text {
					font-size: 18px;
					color: #666;
				}
			}
		}

		.close {
			width: 60rpx;
			height: 60rpx;
			background-color: #fff;
			border-radius: 50%;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			font-size: 16px;
			position: absolute;
			bottom: -80rpx;
			left: 46%;
			box-shadow: 0 0 4px #666;
			color: #666;

			image {
				width: 30rpx;
				height: 30rpx;
			}
		}
	}

	.order_img {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		background-color: #fff;
		width: 100%;
		padding: 0 20rpx;
		margin-bottom: 120rpx;
		padding-top: 20rpx;

		.list_img {
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			flex-wrap: wrap;

			.item {
				width: 210rpx;
				height: 210rpx;
				margin-bottom: 20rpx;
				margin-right: 16rpx;

				image {
					display: block;
					width: 210rpx;
					height: 210rpx;
				}
			}
		}
	}
</style>
