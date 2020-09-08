<template>
	<view class="wancheng">
		<!-- 头部地址开始 -->
		<!-- <view class="header_adress">
      <view class="adress_left">
        <view class="left_title">{{detail.OutletsName}}</view>
        <view class="left_text">{{detail.Address}}</view>
      </view>
      <view class="adress_right">
        <view class="right_distance">130m</view>
        <view class="right_go">去这里</view>
      </view>
    </view> -->
		<!-- 头部地址结束 -->

		<!-- 待出票开始 -->
		<view class="wancheng_container">
			<view class="wancheng_title">
				<view class="wancheng_title_left">
					<text>{{detail.Self_Delivery}}</text>{{detail.OutletsName}}投注站
				</view>
				<view class="wancheng_title_right">{{detail.name}}</view>
			</view>
			<view class="wait_list">
				<!-- 彩票内容开始 -->
				<view class="wait_item">
					<view class="wait_item_icon">
						<image :src="detail.icon" mode="widthFix"></image>
					</view>
					<view class="wait_item_wrap">
						<view class="wait_item_info" v-for="(item,index) in list" :key="index">
							<view class="qiu_text">
								<text v-for="red in item.RedBall" :key="red">{{red}}{{detail.LotteryType==4?' * '+(item.Price/red)+'元':''}}</text>
								<text class="blue" v-for="blue in item.BlueBall" :key="blue">{{blue}}</text>
							</view>
							<view class="wait_item_qishu" v-if="detail.LotteryType<4">
								<view class="qishu_text">
									<text>期数*{{item.Num}}</text>
									<text>倍数*{{item.Multiple}}</text>
								</view>
								<view class="qishu_info">第{{item.Fixed}}期</view>
							</view>
						</view>

					</view>
				</view>
				<!-- 彩票内容结束 -->
				<view class="total_wrap">
					<view class="total_title">
						<view>第 {{list[0].Number}} 期</view>
						<view>共 {{list.length}} 注</view>
					</view>
					<view class="total_item">
						<view v-if="detail.OrderState != 1">合计：{{detail.SinglePrice}} 福豆</view>
						<view v-else>合计：{{detail.Price}} 福豆</view>
						<view class="total_item_item" v-if="detail.DeductionAmount>0">(体验券:-{{detail.DeductionAmount}})</view >
					</view>
				</view>
			</view>
		</view>
		<!-- 待出票结束 -->
		<!-- 出票时间开始 -->
		<view class="chupiao_container">
			<view class="chupiao_time">兑换编码：{{detail.OrderNumber}}</view>
			<view class="chupiao_time">兑换体验时间：{{detail.AddTime}}</view>
			<view class="chupiao_time">出票时间：{{detail.LssueTime}}</view>
			<view class="chupiao_time">领取时间：{{detail.ReceiveTime}}</view>
			<view class="chupiao_time">自提站点名称：{{detail.OutletsName}}</view>
			<view class="chupiao_time shop_address" @tap='goNavigation'>
				<view class="shop_address_title">自提站点地址：</view>
				<view class="shop_address_detail">{{detail.F_Address}}</view>
				<view class="shop_address_icon iconfont icon-dizhi"></view>
			</view>
			<view class="chupiao_time chupiao_phone">
				<view>站点联系方式：{{detail.F_OuterPhone}}</view>
				<view class="chupiao_phone_img" @tap='handleTanke(detail.F_OuterPhone)'>
					<image src="../../static/mine/telephone.png" mode="widthFix"></image>
				</view>
			</view>
			
		</view>
		<!-- 兑票时间结束 -->
		<!-- 兑票凭证开始 -->
		<view class="chupiao">
			<view class="chupiao_title">已完成</view>
			<!-- <view class="laod_chupiao">等待兑票...</view> -->
		</view>
		<!-- 出票凭证结束 -->
		<!-- 图片 -->
		<view class="chupiao_title_photo">
			<view v-for="(v,i) in imgUrl" :key='i' class="chupiao_title_photo_warp" @tap="previewImage(i)">
				<image :src='v' mode="widthFix"></image>
			</view>
		</view>

	</view>
</template>
<script>
	// #ifdef H5
	import wxSdk from '../../common/wx-sdk.js'
	const jweixin = require('jweixin-module');
	// #endif
	import common from '../../common/common.js'
	var _self;
	export default {
		data() {
			return {
				detail: {},
				list: [],
				item: {},
				imgUrl: []
			}
		},
		onLoad(e) {
			_self = this;
			_self.item = JSON.parse(decodeURIComponent(e.item));
			_self.detail = _self.item.orde;
			_self.list = _self.item.list;
			_self.imgUrl = _self.detail.LotteryImage.split(',');
			_self.imgUrl = _self.imgUrl.map(item => {
				return common.PicURL + item;
			})
		},
		methods: {
			// 拨打电话
			handleTanke(phoneNum) { 
				uni.makePhoneCall({
					phoneNumber: phoneNum
				})
			},
			// 点击导航图标，导航到网点
			goNavigation() {
				let addressData = {
					latitude: parseFloat(_self.detail.F_latitude),
					longitude: parseFloat(_self.detail.F_longitude),
					name: _self.detail.OutletsName,
					address: _self.detail.F_Address,
				}
				// #ifdef H5
				common.request({
					path: 'login/getcode',
					method: 'GET',
					data: encodeURIComponent(location.href.split('#')[0]),
					success(res3) {
						let signPackage = res3.data;
						wxSdk.initJssdk(signPackage); // 初始化 wx-sdk的config配置
						wxSdk.openlocation(addressData) // 调用 wx-sdk
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
			// 预览图片
			previewImage(i) {
				uni.previewImage({
					current: i,
					urls: _self.imgUrl,
					loop: true
				})

			},
		}


	}
</script>
<style lang="scss" scoped>
	.wancheng {
		background-color: #f7f5f6;

		.header_adress {
			display: flex;
			justify-content: space-between;
			padding: 20rpx 40rpx;
			align-items: center;
			background-color: #fff;

			.adress_left {
				.left_title {
					font-size: 30rpx;
					font-weight: 600;
				}

				.left_text {
					color: #666;
					margin-top: 10rpx;
				}
			}

			.adress_right {
				font-size: 24rpx;

				.right_distance {
					color: #666;
				}

				.right_go {
					color: $color;
					margin-top: 10rpx;
				}
			}
		}

		.wancheng_container {
			background-color: #fff;
			margin-top: 15rpx;

			.wancheng_title {
				display: flex;
				justify-content: space-between;
				padding: 20rpx;
				border-bottom: 1rpx solid #eee;

				.wancheng_title_left {
					display: flex;
					font-weight: 600;
					align-items: center;

					text {
						display: block;
						background-color: $color;
						color: #fff;
						width: 65rpx;
						height: 32rpx;
						text-align: center;
						line-height: 32rpx;
						font-size: 24rpx;
						border-radius: 5rpx;
						margin-right: 10rpx;
					}
				}

				.wancheng_title_right {
					white-space: normal;
					word-break: keep-all;
					display: flex;
					align-items: center;
					color: #999;
				}
			}

			.wait_list {
				.wait_item {
					display: flex;
					border-bottom: 1rpx solid #eee;
					padding: 20rpx;

					.wait_item_icon {
						// flex: 1;
						width: 60rpx;
						margin-top: 15rpx;
					}

					.wait_item_wrap {
						flex: 3;

						.wait_item_info {

							color: $color;
							font-weight: 600;
							margin-left: 10rpx;
							line-height: 50rpx;
							display: flex;
							margin-top: 15rpx;

							.qiu_text {
								width: 400rpx;
								display: flex;
								flex-wrap: wrap;

								.blue {
									color: blue;
								}
							}

							.wait_item_qishu {
								flex: 2;
								font-size: 24rpx;
								text-align: center;

								.qishu_text {
									color: #666;

									text {
										margin-left: 20rpx;
									}
								}

								.qishu_info {
									width: 90rpx;
									height: 32rpx;
									color: #333;
									background-color: #f7f5f6;
									margin-left: 130rpx;
									margin-top: 20rpx;
									line-height: 32rpx;
								}
							}

							text {
								margin-left: 15rpx;
							}
						}
					}


				}

				.total_wrap {
					display: flex;
					justify-content: space-between;
					font-size: 30rpx;
					font-weight: 600;
					padding: 20rpx 30rpx;

					.total_title {
						display: flex;
						align-items: center;

						:nth-child(2) {
							margin-left: 20rpx;
						}
					}

					.total_item_text {
						font-size: 24rpx;
						color: #999999;
					}
				}
			}
		}

		.chupiao_container {
			margin-top: 20rpx;
			background-color: #fff;
			color: #999;

			.chupiao_time {
				padding: 20rpx;
				margin-bottom: 10rpx;
				border-bottom: 1rpx solid #eee;
			}
			.chupiao_phone {
				display:flex;
				align-items: center;
				.chupiao_phone_img{
					margin-left:40rpx;
					width:30rpx;
					height:30rpx;
					image{
						width:30rpx;
						height:30rpx;
					}
				}
			}
			.shop_address {
				display: flex;
				align-items: center;

				.shop_address_title {
					flex: 4;
				}

				.shop_address_detail {
					flex: 9;
				}

				.shop_address_icon {
					flex: 1;
				}
			}

			.recive_time {
				padding: 20rpx;
			}
		}

		.chupiao {
			margin-top: 15rpx;
			background-color: #fff;
			font-weight: 600;

			.chupiao_title {
				border: 1rpx solid #eee;
				padding: 20rpx 30rpx;
			}

			.laod_chupiao {
				text-align: center;
				margin-top: 20rpx;
				color: #999;
			}
		}

		.chupiao_title_photo {
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			box-sizing: border-box;
			padding-bottom: 22rpx;
			-webkit-box-sizing: border-box;

			.chupiao_title_photo_warp {
				margin-left: 22rpx;
				margin-top: 22rpx;
				width: 220rpx;
				height: 220rpx;

				image {
					width: 220rpx;
					height: 220rpx !important;
				}
			}
		}
	}
</style>
