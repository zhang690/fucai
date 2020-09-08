<template>
	<view class="container">
		<view>
			<image src="https://fucai.yiruit.com/UpFiles/tupian/user.jpeg"></image>
			<view>
				<view class="userName">德玛西亚思琪</view>
				<view class="userInfo">专业点评，热点播报，购买咨询</view>
			</view>
			<view class="sbtn">已关注</view>
		</view>
		<view>
	  <image src="https://fucai.yiruit.com/UpFiles/tupian/user1.jpeg"></image>
			<view>
				<view class="userName">德玛西亚思琪</view>
				<view class="userInfo">uniapp大法好，小程序大法好！</view>
			</view>
			<view class="sbtn">已关注</view>
		</view>
		<view>
			<image src="https://fucai.yiruit.com/UpFiles/tupian/user2.jpeg"></image>
			<view>
			<view class="userName">德玛西亚思琪</view>
			<view class="userInfo">专业点评，热点播报，购买咨询</view>
			</view>
				<view class="sbtn">已关注</view>
		</view>
		<view>
			<image src="https://fucai.yiruit.com/UpFiles/tupian/user3.jpeg"></image>
			<view>
				<view class="userName">德玛西亚思琪</view>
				<view class="userInfo">专业点评，热点播报，购买咨询</view>
			</view>
				<view class="sbtn">已关注</view>
		</view>
		<view>
			<image src="https://fucai.yiruit.com/UpFiles/tupian/user4.jpg"></image>
			<view>
				<view class="userName">德玛西亚思琪</view>
				<view class="userInfo">专业点评，热点播报，购买咨询</view>
			</view>
				<view class="sbtn">已关注</view>
		</view>
	</view>
	
</template>

<script>
	export default{
		
	}
	</script>

<style>
	
	.container{
		width: 100%;
		margin-top:10rpx;
		overflow-x: hidden;
	}
	
	.container>view{
		margin: 0 auto;
		width:700rpx;
		height: 85rpx;
		padding-top:35rpx;
		display:flex;
	}
	.container>view>image{
		display: block;
		width:80rpx;
		height: 80rpx;
		border-radius:50%;
	}
		.container>view>view{
			width:331rpx;
			height: 80rpx;
			margin-left: 30rpx;
	
		}
		.userName{
			font-size:25rpx;
			color:#303030;
			line-height: 30rpx;
		}
		.userInfo{
			font-size:20rpx;
			color:#999;
			line-height: 50rpx;
		}
		.sbtn{
			width:115rpx !important;
			height:50rpx  !important;
			margin-left: 140rpx !important;
			background:#556adc;
			border-radius: 5rpx;
			text-align: center;
			line-height: 50rpx;
			font-size: 26rpx;
			color:white;
		}
</style>
