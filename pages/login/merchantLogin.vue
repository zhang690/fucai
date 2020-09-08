<template>
	<view class="user-login">
		<view class="user_all">
			<view class="user_logo">
				<image src="https://fucai.yiruit.com/UpFiles/tupian/logo.png" mode="aspectFit"></image>
			</view>
			<view class="user_info">
				<view class="input-wrap">
					<view class="user-input">
						<view class="input_put first_icon">
							<image src="https://fucai.yiruit.com/UpFiles/tupian/tel.png" mode="widthFix"></image>
						</view>
						<input type="text" maxlength="11" placeholder="请输入手机号" v-model="username" placeholder-style="color:#fff" />
					</view>
					<view class="user-input">
						<view class="input_put">
							<image src="https://fucai.yiruit.com/UpFiles/tupian/password.png" mode="widthFix"></image>
						</view>
						<input type="password" placeholder="请输入密码" v-model="password" placeholder-style="color:#fff" />
					</view>
					<view class="user-store-btn">
						<view class="user_title">
							<text @click="handleJump('./userLogin')">返回用户登录</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="user_bg">
			<image src="../../static/bg.png" mode="widthFix"></image>
		</view>
		<view class="user_btn">
			<button @click="handleLogin">站长登录</button>
		</view>
		<view class="handle">
			<text @click="handleJump('./riderLogin')">骑手登录</text>
			<text @click="handleJump('./intimidateLogin')">业务员登录</text>
		</view>
		<view class="btn_bg">
			<image src="https://fucai.yiruit.com/UpFiles/tupian/title.png" mode="aspectFit"></image>
		</view>
	</view>
</template>
<script>
	import common from "../../common/common";
	import md5 from 'js-md5';
	var _self;
	export default {
		data() {
			return {
				username: "",
				password: ""
				// username: "18526456544",
				// password: "123456"				           
			}
		},
		onLoad() {
			_self = this;
		},
		methods: {
			handleLogin() {
			
				
				
				
				
				common.request({
					path: "userlogin/loginbyoutlets",
					method: "GET",
					data: {
						username: _self.username,
						password: md5(_self.password),
						usertype:'1'  //  1 商家  2 骑手 3 打单员
					},
					success: res => {
						if (res.code == 200) {
							uni.setStorageSync("riderinfo", res.data);	
							// common.setstate(res.data);	
							uni.showToast({
								icon: 'none',
								title: '登录成功',
								duration: 1500,
							})
							uni.navigateTo({
								url: '../merchant/merchantList',
							});							
						} else {
							uni.showToast({
								title: res.info,
								icon: 'none',
								duration: 1500,
								mask: true,
							});
						}
					}
				});
			},
			handleJump(url){  // 用户
				uni.navigateTo({
					url: url
				})
			}
		}
	};
</script>
<style lang="scss" scoped>
	.user-login {
		height: 100vh;
		overflow: hidden;
		background-color: #fff;

		.user_bg {
			margin-bottom: 40rpx;
		}

		.user_all {
			background-color: #ff3c35;
		}
	}

	.user_all {
		.user_logo {
			padding-top: 50rpx;

			image {
				width: 200rpx;
				height: 200rpx;
				display: block;
				margin: auto;
			}
		}

		.user_info {
			width: 80%;
			margin-top: 60rpx;
			padding: 0 10%;
		}
	}
	.user_btn {
		width: 100%;
		margin-top: 60rpx;
		button {
			align-items: center;
			justify-content: center;
			width: 80%;
			height: 80rpx;
			
			line-height:80rpx;
			background-color: #ff3c35;
			border-radius: 20rpx;
			color: #fff;
			font-size: 28rpx;
		}
	}
	.handle{
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		width: 100%;
		margin-top: 100rpx;
		text{
			color: #999;
		}
	}
	
	.btn_bg {
		width: 100%;
		margin-top: 220rpx;
		text-align: center;
	
		image {
			height: 80rpx;
			margin: auto;
		}
	}
	.user_info {
		.input-wrap {
			display: flex;
			justify-content: center;
			align-items: center;
			display: flex;
			flex-direction: column;

			.user-input {
				width: 100%;
				height: 70rpx;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				border-bottom: 1px solid #eee;
				margin-bottom: 40rpx;
				align-items: center;
				.input_put {
					width: 50rpx;
					height: 60rpx;
					margin-right: 10rpx;

					image {
						display: block;
						width: 80%;
					}
				}

				.first_icon {
					image {
						width: 70%;
					}
				}

				input {
					flex: 1;
					height: 64rpx;
					background: none;
					color: #fff;
					display: block;
					width: 100%;
					height: 100%;
				}
			}

			.user-btn {
				width: 100%;
				text-align: right;
				margin-top: -24rpx;
				display: flex;
				flex-direction: row;
				justify-content: flex-end;

				text {
					color: #fff;
					font-size: 14px;
				}
			}
			.user-store-btn {
				width: 100%;		
				.user_title {
					display: flex;
					flex-direction: row;
					justify-content: flex-end;					
				}
				text {
					color: #fff;
					font-size: 14px;
				}
			}
		}
	}
</style>
