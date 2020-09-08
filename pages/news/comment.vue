<template>
	<view class="container">
		<view>
			<image src="https://fucai.yiruit.com/UpFiles/tupian/user.jpeg"></image>
			<view>
				<view class="userName">2020-07-12 22:31:04</view>
				<view class="userInfo">uniapp大法好，小程序大法好！</view>
			</view>
			
		</view>
		<view>
	  <image src="https://fucai.yiruit.com/UpFiles/tupian/user1.jpeg"></image>
			<view>
				<view class="userName">2020-07-12 22:31:04</view>
		<view class="userInfo">uniapp大法好，小程序大法好！</view>
			</view>
		
		</view>
		<view>
			<image src="https://fucai.yiruit.com/UpFiles/tupian/user2.jpeg"></image>
			<view>
	<view class="userName">2020-07-12 22:31:04</view>
		<view class="userInfo">uniapp大法好，小程序大法好！</view>
			</view>
				
		</view>
		<view>
			<image src="https://fucai.yiruit.com/UpFiles/tupian/user3.jpeg"></image>
			<view>
				<view class="userName">2020-07-12 22:31:04</view>
				<view class="userInfo">uniapp大法好，小程序大法好！</view>
			</view>
		</view>
		<view>
			<image src="https://fucai.yiruit.com/UpFiles/tupian/user4.jpg"></image>
			<view>
				<view class="userName">2020-07-12 22:31:04</view>
				<view class="userInfo">uniapp大法好，小程序大法好！</view>
			</view>
			
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
			margin-left: 50rpx;
	
		}
		.userName{
			font-size:20rpx;
			color:#999;
			line-height: 30rpx;
			margin-top: 5rpx;
		}
		.userInfo{
			font-size:25rpx;
		
			color:#303030;
			line-height: 50rpx;
		}

</style>
