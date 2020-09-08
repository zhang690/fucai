<template>
	<view class="jifen-integral">
		<!-- <view class="jifen-adress">
			<view class="adress-title">收货人<text>158****5556</text></view>
			<view class="adress-info">湖南省长沙市雨花区德思勤创业大街5栋1003</view>
		</view> -->
		<view class="commodity-wrap">
			<view class="commodity-item">
				<view class="commodity-icon">
					<image mode="widthFix" src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2049221826,3660697758&fm=26&gp=0.jpg"></image>
				</view>
				<view class="commodity-title">{{jifen.ProductName}}</view>
			</view>
			<view class="commodity-jifen">
				<view class="dikou-title">积分抵扣</view>
				<view class="dikou-num">-{{jifen.Price}}</view>
			</view>
		</view>
		<view class="jifen-order">
			<!-- <view class="order-item">
        <view class="order-title">快递单号</view>
        <view class="order-num">1234567890<text>复制</text></view>
      </view> -->
			<!-- <view class="order-item">
        <view class="order-title">订单编号</view>
        <view class="order-num">1234567890</view>
      </view> -->
			<view class="order-item">
				<view class="order-title">创建时间</view>
				<view class="order-num">{{jifen.time}}</view>
			</view>
		</view>
		<view class="sure-btn">
			<view class="btn" @click="handleComplete">确认兑换</view>
		</view>
	</view>
</template>
<script>
	import common from '../../common/common'
	var _self;
	export default {
		data() {
			return {
				jifen: {}
			}
		},
		onLoad() {
			_self = this;

		},
		onShow() {
			let now = new Date();
			let year = now.getFullYear(); //得到年份
			let month = now.getMonth(); //得到月份
			let date = now.getDate(); //得到日期
			let day = now.getDay(); //得到周几
			let hour = now.getHours(); //得到小时
			let minu = now.getMinutes(); //得到分钟
			let sec = now.getSeconds(); //得到秒
			if (hour < 10) {
				hour = "0" + hour
			}
			if (minu < 10) {
				minu = "0" + minu
			}
			if (sec < 10) {
				sec = "0" + sec
			}
			month = month + 1;
			let time = year + "-" + month + "-" + date + " " + hour + ":" + minu + ":" + sec;
			let jifen = uni.getStorageSync("jifen");
			jifen.time = time;
			_self.jifen = jifen;
		},
		methods: {
			handleComplete() {
				let {
					ID
				} = uni.getStorageSync("userinfo");
				common.request({
					path: "Order/addorder",
					data: {
						MemberID: ID,
						AddTime: _self.jifen.time,
						Product: "jifen",

						list: [{
							Price: _self.jifen.Price,
							ProductID: _self.jifen.ID,
							ProductName: _self.jifen.ProductName,
						}]
					},
					success: res => {
					}
				})
			}
		},
	}
</script>
<style lang="scss" scoped>
	.jifen-integral {
		width: 100vw;
		height: 100vh;
		background-color: #f7f5f6;
		padding-top: 20rpx;

		.jifen-adress {
			width: 90%;
			border-radius: 15rpx;
			margin: 0 auto;
			background-color: #fff;
			padding: 20rpx;
			overflow: hidden;

			.adress-title {
				font-weight: 600;
				font-size: 30rpx;

				text {
					margin-left: 20rpx;
					font-size: 26rpx;
				}
			}

			.adress-info {
				margin-top: 20rpx;
				font-size: 24rpx;
				color: #999;
			}
		}

		.commodity-wrap {
			padding: 30rpx;
			background-color: #fff;
			width: 86%;
			margin: 25rpx auto 0;
			border-radius: 15rpx;

			.commodity-item {
				display: flex;

				.commodity-icon {
					image {
						width: 80rpx;
						border-radius: 8rpx;
					}
				}

				.commodity-title {
					margin-left: 30rpx;
				}
			}

			.commodity-jifen {
				display: flex;
				justify-content: space-between;
				margin-top: 20rpx;
			}
		}

		.jifen-order {
			width: 86%;
			border-radius: 15rpx;
			margin: 25rpx auto 0;
			background-color: #fff;
			padding: 30rpx;

			.order-item {
				display: flex;
				justify-content: space-between;
				margin-top: 20rpx;

				.order-title {}

				.order-num {
					color: #999;

					text {
						color: $color;
						margin-left: 20rpx;
					}
				}
			}
		}

		.sure-btn {
			position: fixed;
			bottom: 30rpx;
			width: 100%;
			height: 70rpx;

			.btn {
				width: 90%;
				background-color: $color;
				color: #fff;
				text-align: center;
				line-height: 70rpx;
				margin: 0 auto;
				border-radius: 35rpx;
			}
		}
	}
</style>
