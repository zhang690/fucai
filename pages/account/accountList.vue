<template>
	<view class="userAll">
		<view class="app_info_wrap">	
			<view class="app_info_contact" @click="handleClick('../account/myName',userList.headIcon)">
				<text class="title">我的头像</text>
				<view class="name header">
					<image :src="userList.headIcon | Revise" mode=""></image>
				</view>
				<text class="iconfont icon-iconfontjiantou5"></text>
			</view>
			<view class="app_info_contact" @click="handleClick('../account/nickename',userList.RealName)">
				<text class="title">真实姓名</text>
				<text class="name">{{userList.RealName || '填写姓名'}}</text>
				<text class="iconfont icon-iconfontjiantou5"></text>
			</view>				
			<view class="app_info_contact" @click="handleClick('../account/loginName',userList.OpenName)">
				<text class="title">登录名/昵称</text>
				<text class="name">{{ userList.OpenName || '未填写'}}</text>			
				<text class="iconfont icon-iconfontjiantou5"></text>
			</view>			
			<view class="app_info_contact" @click="handleClick('../account/phone',userList.Phone)">
				<text class="title">我的手机号</text>
				<text class="name">{{userList.Phone !== null ? userList.Phone:'完善手机号'}}</text>
				<text class="iconfont icon-iconfontjiantou5"></text>
			</view>
		</view>
	</view>
</template>

<script>
	import common from '@/common/common.js'
	var _self;
	export default {
		data() {
			return {
				imgURL:common.imgURL,
				userList:''	
			}
		},		
	    onShow(){
			_self = this;	
		    _self.getUser()	
		},
		methods:{
			getUser(){
				common.request({
					path: 'Development/getmember',
					data: common.getstate().ID,
					method:"POST",
					success:(res)=>{
						_self.userList = res.data.member						
					}
				})
			},
			handleClick(url,list){
				uni.navigateTo({
				    url: url + '?list=' + list
				})
			}			
		}
	}
</script>

<style lang="scss">
	.app_info_wrap {
		display: flex;
		flex-direction: column;
		margin-bottom: 50rpx;	
		background-color: #fff;
		padding: 0 20rpx;
		.app_info_contact {
			display: flex;
			justify-content: flex-start;
			height: auto;
			width: 100%;
			line-height: 100rpx;
			border-bottom: 1px solid #ececec;	
			overflow: hidden;
			padding: 10rpx 0;
			.header_img{
				width: 100rpx;
				height: 100rpx;				
				margin: 10rpx 0;
				image{
					width: 100%;
					height: 100%;
				}
			}
			&:last-of-type {
				border-bottom: none;
			}	
			.iconfont {
				font-size: 20px;
			}	
			.title {
				flex: 1;
				font-size: 14px;
				color: #666;
			}
			.name{
				font-size: 14px;
				color: #999;				
			}
			.header{
				height: 100rpx;
				width: 100rpx;
				border-radius: 50%;
				image{
					display: block;
					height: 100rpx;
					width: 100rpx;
				}
			}
			.iconfont {
				font-size: 18px;
				color: #acacac;
			}
		}
	}
	
</style>
