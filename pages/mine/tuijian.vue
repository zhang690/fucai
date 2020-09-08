<template>
	<view class="tuijian">
		<view class="header-icon">
			<image class="icon-title" src="https://fucai.yiruit.com/UpFiles/static/tuijianyouli.png"></image>
			<image class="icon-bg" src="https://fucai.yiruit.com/UpFiles/static/header.png"></image>
		</view>		
		<view class="tuijian-content">
			<view class="tuijian-title">您的邀请码</view>
			<view class="tuijian-num">{{invitedCodeVal}}</view>
			<view class="copy" @click="handleCopy">复制</view>
			<view class="tuijian-text">邀请的好友也可在注册时直接填写邀请码</view>		
			<view class="code-bg">
				<image :src="courseUrl" mode="aspectFill" />	
			</view>
			<view class="tuijian-btn">
				<button open-type="share" type="warn" class="sharebtn">分享有礼</button>
			</view>
		</view>
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
				invitedCode: common.getstate().Invitation,     // 邀请码	
				invitedCodeVal:'',  // 转换后的接收
				mystate:common.getstate(),
				canvasContext: null,
				courseUrl:''
			}
		},
		onLoad() {
			_self = this;
			_self.inputPut();
			_self.getAcode();			
		},
		onShareAppMessage(e) {   // 分享有礼
			return {
				title:'分享有礼',
				path: '/pages/login/userLogin',
				success(resp) {
				}
			}
		},
		methods: {			
			getAcode(){  // 二维码			   
				common.request({
					path: 'Order/getwxacode',
					data: _self.invitedCodeVal,
					success: function(res) {						
						_self.courseUrl =common.PicURL + res.data						
					},
					fail: function(res) {
						
					}
				})
			},
			inputPut(){
				var inputValue		
				var res = _self.invitedCode.toString()
				switch(res.length){
					case 1 :
						inputValue = '00000' + res;
						break;
					case 2 :
						inputValue = '0000' + res;
						break;
					case 3 :
						inputValue = '000' + res;
						break;
					case 4 :
						inputValue = '00' + res;
						break;
					case 5 :
						inputValue = '0' + res;
						break;
					case 6 :
						inputValue = res;
						break;
				}			
				_self.invitedCodeVal = inputValue
			},
			handleCopy(){				
				uni.setClipboardData({
					data: _self.invitedCodeVal,   // 要复制的文字
					success: function(res) {
						uni.getClipboardData({
							success: function(res) {
								uni.showToast({
									title: '复制成功'
								});
							}
						})
					}
				})
			}
		}		
	}
</script>
<style lang="scss" scoped>
	.share {
		width: 300px;
		height: 550px;
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 100rpx;
		margin: auto;
		border: 10rpx #FFFFFF solid;
		box-shadow: 4rpx 4rpx 20rpx #999999;
	}

	.bottom {
		width: 100%;
		height: 90px;
		background-color: white;
		text-align: center;
	}

	.tuijian {
		background: linear-gradient(to bottom, #f6454c, #d54d8f, #ad41d0);
		height: 100vh;
		padding-top: 10rpx;

		.header-icon {
			width: 85%;
			margin-left: calc((100vw - 85vw) / 2);
			margin-top: 40rpx;
			position: relative;

			.icon-title {
				width: 95%;
				margin: 0 auto;
				height: 200rpx;
			}

			.icon-bg {
				position: absolute;
				bottom: -135rpx;
				height: 200rpx;
			}
		}

		.tuijian-content {
			background-color: #fff;
			width: 90%;
			height: 800rpx;
			margin: 30rpx auto;
			border-radius: 10rpx;
			text-align: center;
			padding-top: 50rpx;
			.tuijian-title {
				font-size: 32rpx;
				font-weight: 600;
			}
			.tuijian-num {
				font-size: 26px;
				color: $uni-color-error;
				margin: 20rpx auto;
				.num-item {
					background-color: #efefef;
					color: $color;
					width: 40rpx;
					height: 60rpx;
					margin-left: 10rpx;
					line-height: 60rpx;
				}
			}
			.copy{
				width: 130rpx;
				height: 60rpx;
				line-height: 60rpx;
				background-color: $color;
				margin: 0 auto;
				border-radius: 10rpx;
				color: #fff;
			}

			.tuijian-text {
				color: #999;
				font-size: 22rpx;
				margin-top: 30rpx;
			}

			.code-icon {
				display: flex;
				flex-direction: column;				
				margin-top: 30rpx;
				color: #999;
				font-size: 20rpx;
				image {
					background-color: #000;
					width: 300rpx;
					height: 300rpx;
					margin: 0 auto 30rpx;
				}
			}

			.tuijian-btn {
				width: 80%;
				height: 80rpx;
				margin: 0 auto;
				// background: linear-gradient(to right, #ec7a4b, #ea6567, #e85183);
				// color: #fff;
				line-height: 80rpx;
				margin-top: 50rpx;
				border-radius: 40rpx;
			}
		}
		.code-bg{
			margin: 0 auto;
			margin-top: 20rpx;
			width: 300rpx;
			height: 300rpx;
			overflow: hidden;
			image{
				width: 100%;
				height: 100%;
				display: block;
			}
		}
	}
</style>
