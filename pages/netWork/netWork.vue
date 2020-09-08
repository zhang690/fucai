<template>
	<view class="netWork">
		<!-- 沒有笔记开始 -->
		<view class="nowork" v-if="isShow">
			<view class="nowork_icon">
				<image src="https://fucai.yiruit.com/UpFiles/tupian/line.png" mode="widthFix"></image>
			</view>
			<view class="nowork_text">笔记本里没有记录</view>
			<view class="nowork_btn">去选号</view>
		</view>
		<!-- 沒有笔记结束 -->
		<!-- 有笔记开始 -->
		<view class="caipiao_wrap">
			<view class="caipiao_item">
				<view class="caipiao_title">
					<view class="title_left">
						<checkbox-group>
							<checkbox></checkbox>双色球
						</checkbox-group>
					</view>
					<view class="title_right">删除</view>
				</view>
				<view class="capiao_content">
					<view class="caipiao_info">
						<view class="info_text">
							<checkbox-group>
							<checkbox></checkbox>
						</checkbox-group>
							<text v-for="n in num" :key="n">07</text></view>
						<view class="info_btn">
							<text class="btn_style">-</text>
							<text>1</text>
							<text class="btn_style btn_bg">+</text>倍
						</view>
					</view>
					
				</view>
				<view class="caipiao_select">
					<view class="select_btn select_one">+机选一注</view>
					<view class="select_btn select_two">+自选一注</view>
				</view>
				<!-- <view class="caipiao_buy">
					共<text>2</text>注，我要买
					<view class="buy_wrap">
						<button>-</button>
						<text>1</text>
						<button>+</button>
					</view>
					倍
				</view> -->
			</view>
		</view>
		<!-- 底部选号开始 -->
		<view class="footer_total">
			<view class="allSelect">
				<checkbox-group>
					<checkbox></checkbox>全选
				</checkbox-group>
        <text>共2注，共计12元</text>
			</view>
    <view class="allselect_btn">确认选号</view>
		</view>
		<!-- 底部选号结束 -->
		<!-- 有笔记结束 -->
	</view>
</template>
<script>
	export default {
		data() {
			return {
				isShow: false,
				num:7
			}
		},
	}
</script>
<style lang="scss">
	/**修改复选框样式 */
	checkbox .wx-checkbox-input {
    width: 30rpx;
    height: 30rpx;
		border-radius: 50% !important;
	}

	.netWork {
		background-color: #f6f6f6;
		height: 100vh;

		.nowork {
			width: 70%;
			padding-top: 200rpx;
			margin: 0 auto;
			text-align: center;

			.nowork_icon {
				width: 65%;
				margin: 0 auto;
			}

			.nowork_text {
				margin-top: 20rpx;
				color: #666;
			}

			.nowork_btn {
				width: 200rpx;
				height: 60rpx;
				line-height: 60rpx;
				margin: 100rpx auto 0;
				border-radius: 30rpx;
				background-color: #e4e4e4;
				font-weight: bolder;
			}
		}

		.caipiao_wrap {
			border-top: 1rpx solid transparent;

			.caipiao_item {
				background-color: #fff;
				margin: 0 auto;
				margin-top: 20rpx;
				width: 90%;
				box-shadow: 2rpx 2rpx 2rpx #eee;
				border-radius: 20rpx;
				padding: 20rpx 15rpx;

				.caipiao_title {
					display: flex;
					justify-content: space-between;
					border-bottom: 2rpx solid #eee;
					padding-bottom: 10rpx;

					.title_left {
						font-weight: bolder;
						font-size: 30rpx;
						line-height: 30rpx;
					}

					.title_right {
						color: #999;
					}
				}

				.capiao_content {
					margin-top: 20rpx;

					.caipiao_info {
						display: flex;
						margin-top: 20rpx;
						justify-content: space-between;
						.info_text {
							display: flex;
							text {
								margin-left: 15rpx;
								color: $color;
								font-weight: bolder;
							}
						}

						.info_btn {
							display: flex;
							align-items: center;
							color: #666;
							.btn_style{
								display: block;
								width: 30rpx;
								height: 30rpx;
								text-align: center;
								line-height: 30rpx;
								background-color: #ddd;
								font-size: 26rpx;
								border-radius: 50%;
								margin-right: 10rpx;
							}
							.btn_bg{
								background-color: $color;
								margin-left: 10rpx;
								color: #fff;
							}
						}
					}
				}

				.caipiao_select {
					display: flex;
					justify-content: center;
					margin-top: 30rpx;
					.select_btn {
						width: 200rpx;
						height: 60rpx;
						text-align: center;
						line-height: 60rpx;
						border-radius: 30rpx;
						color: #999;
					}

					.select_one {
						background-color: #fbd3b4;
					}

					.select_two {
						margin-left: 20rpx;
						background-color: #f9c3c0;
					}
				}

				// .caipiao_buy {
				// 	display: flex;
				// 	text-align: center;
				// 	margin-top: 20rpx;
				// 	justify-content: center;
				// 	align-items: center;

				// 	text {
				// 		color: $color;
				// 	}

				// 	.buy_wrap {
				// 		width: 200rpx;
				// 		height: 40rpx;
				// 		border: 2rpx solid #eee;
				// 		display: flex;
				// 		justify-content: space-between;

				// 		margin-left: 10rpx;

				// 		button {
				// 			flex: 1;
				// 			height: 40rpx;
				// 			line-height: 40rpx;
				// 			border-radius: 0rpx;
				// 		}

				// 		text {
				// 			display: block;
				// 			flex: 1;
				// 			border-left: 2rpx solid #eee;
				// 			border-right: 2rpx solid #eee;
				// 			color: #000;
				// 		}
				// 	}
				// }
			}
    }
    .footer_total{
      position: fixed;
      bottom: 0;
      width: 100%;
      height: 100rpx;
      display: flex;
      justify-content: space-between;
      background-color: #fff;
      .allSelect{
        display: flex;
        align-items: center;
        margin-left: 20rpx;
        text{
          margin-left: 20rpx;
          letter-spacing: 2rpx;
        }
      }
      .allselect_btn{
        width: 230rpx;
        background-color: $color;
        text-align: center;
        line-height: 100rpx;
        color: #fff;
        font-size: 34rpx;
      }
    }
	}
</style>
