<template>
	<view class="jifen">
		<!-- 头部开始 -->		
		<view class="header_bg">
			<image src="https://fucai.yiruit.com/UpFiles/static/lijicanyu.png" mode="widthFix"></image>
		</view>
		<!-- 头部导航开始 -->
		<view class="header_nav">
			<view class="nav_item" @click="handleJifen">
				<view class="nav_icon">
					<image src="https://fucai.yiruit.com/UpFiles/static/wodejifen.png" mode="widthFix"></image>
				</view>
				<view class="nav_title">我的积分</view>
			</view>
			<navigator url="./duihuanRecord" class="nav_item">
				<view class="nav_icon">
					<image src="https://fucai.yiruit.com/UpFiles/mine/duihuan.png" mode="widthFix"></image>
				</view>
				<view class="nav_title">兑换记录</view>
			</navigator>
			<navigator class="nav_item" url='./nearbyLottery'>
				<view class="nav_icon">
					<image src="https://fucai.yiruit.com/UpFiles/mine/fujin.png" mode="widthFix"></image>
				</view>
				<view class="nav_title">附近彩票</view>
			</navigator>
		</view>
		<!-- 头部导航结束 -->
		<!-- 头部结束 -->
		<!-- 主体内容开始 -->
	<!-- 	<view class="jifen_content">
			<view class="jifen_title_wrap">
				<view class="title_left">活动专场</view>
				<view class="title_right" @click="handleAll">
					全部<text class="iconfont icon-iconfontjiantou5"></text>
				</view>
			</view>
			<view class="jifen_card_wrap">
				<view class="jifen_card_item" v-for="(item,index) in products" :key="item.ID">
					<view class="card_icon" @click="handleDuihuan(index)">
						<image :src="'https://fucai.yiruit.com' + item.images" mode="aspectFill"></image>
					</view>
					<view class="card_title">{{item.ProductName}}</view>
					<view class="card_jifen">{{item.Price}}积分</view>
				</view>
			</view>
		</view> -->
		<!-- 主体内容结束 -->
		<!-- 底部图片开始 -->
		<!-- <view class="footer_icon" @click="handleSelectcode">
			<image src="https://fucai.yiruit.com/UpFiles/mine/12.png" mode="widthFix"></image>
		</view> -->
		<!-- 底部图片结束 -->
	</view>
</template>
<script>
	import common from '../../common/common';
	var _self;
	export default {
		data() {
			return {
				num: 4,
				products: [],
				jifenObj:''  // 积分携带者
			}
		},
		onLoad(option) {
			_self = this;
			_self.jifenObj = option.content;			
		},
		onShow() {
			_self.getData();
		},
		methods: {
			// 跳转积分兑换
			handleDuihuan(i) {
				uni.setStorageSync("jifen", _self.products[i]);
				uni.navigateTo({
					url: './jifenIntegral',
				});
			},
			handleSelectcode() {
				wx.switchTab({
					url: '../getHome/getHome',
				});
			},
			getData() {
				common.request({
					path: "Development/getshopping",
					// method:'POST',
					data: {
						rows: 4,
						page: 1,
						productname: "",
						sidx: "ReleaseTime",
						sord: "desc",
					},
					success: res => {
						_self.products = res.data.rows
					}
				})
			},
			handleJifen(){				
				uni.navigateTo({
					url:'./myjifen?content=' + _self.jifenObj + '&id=' + '1'
				})
			},
			handleAll(){  // 活动专场全部
				uni.navigateTo({
					url:'jifenAll'
				})
			}
		},
	}
</script>
<style lang="scss" scoped>
	.jifen {
		
		.header_bg {
			height: 30vh;
			width: 100vw;			
			background-color: #000;
			display: flex;
			justify-content: center;
			align-items: center;			
		}
		.header_nav {
			margin-top: -145rpx;
			background-color: #fff;
			width: 100%;
			padding-top: 120rpx;
			padding-bottom: 20rpx;
			display: flex;
			justify-content: space-around;			
			border-top-left-radius: 50rpx;
			border-top-right-radius: 50rpx;
			.nav_item {
				.nav_title {
					color: #999;
					font-size: 26rpx;
					margin-top: 10rpx;
				}
			}
		}
		

		.jifen_content {
			padding-top: 60rpx;
			padding: 20rpx 30rpx;
			background-color: #fff;
			.jifen_title_wrap {
				display: flex;
				justify-content: space-between;
				padding: 15rpx 0;

				.title_left {
					font-size: 30rpx;
					font-weight: 600;
				}

				.title_right {
					font-size: 26rpx;
					color: #999;
				}
			}

			.jifen_card_wrap {
				display: flex;
				flex-wrap: wrap;
				flex-direction: row;
				justify-content: space-between;
				.jifen_card_item {
					width: 48%;
					text-align: center;
					padding: 20rpx 0;
					.card_icon {
						width: 100%;
						margin: 0 auto;
						height: 500rpx;
						image{
							display: block;
							width: 100%;
							height: 100%;
						}
					}

					.card_title {
						margin: 13rpx 0;
					}

					.card_jifen {
						color: $color;
						font-size: 24rpx;
					}
				}
			}
		}

		.footer_icon {
			width: 90%;
			margin: 50rpx auto;
		}
	}
</style>
