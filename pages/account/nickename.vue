<template>
	<view class="namePull">
		<view class="pullTile">
			<view class="cancel" @click="handleCancel">取消</view>
			<view class="finish" @click="handleFinish">完成</view>
		</view>	
		<view class="pullInput">
			<input v-model="nickename" class="inputInfo" type="text"/>
			<view class="close" @click="handleClose">x</view>
		</view>
	</view>
</template>

<script>
	import common from '@/common/common.js'
	var _self;
	export default {
		data() {
			return {
				nickename:'',
				cancelnickename:''
			}
		},	
		onLoad(option){
			_self = this;	
			_self.nickename = option.list;
			_self.cancelnickename = option.list
		},
		methods:{
			userRequest(value){
				uni.showLoading({
					mask: true
				});
				common.request({
					path: 'Development/updatemember',
					data: {
						ID:common.getstate().ID,
						RealName:value
					},
					method:"POST",
					success:(res)=>{
						if(res.code === 200){
							uni.showToast({
								icon: "none",
								title: "修改成功"
							})
							uni.switchTab({
								url: '../mine/mine'								
							})		
						}else{
							uni.showToast({
								icon: "none",
								title: "修改失败"
							})
						}
					}
				})				
			},			
			handleClose(){   // x
			    if(_self.nickename){			    
			    	_self.nickename = ''
			    }else{
					uni.showToast({
						title: '已经为空了!!!',
						icon: 'none',
						duration: 1500,
						mask: true,
					})	
				}			
			},
			handleCancel(){		// 取消								
				uni.showToast({
					title: '取消修改',
					icon: 'none',
					duration: 1500,
					mask: true,
				})	
				_self.nickename = _self.cancelnickename				
			},
			handleFinish(){	
				if(_self.nickename === _self.cancelnickename || _self.nickename === '' ){
					uni.showToast({
						title: '不能为空或数据未作修改',
						icon: 'none',
						duration: 1500,
						mask: true,
					})	
				}else{
					_self.userRequest(_self.nickename)					
				}	
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #eee;
	}
	.namePull{
		width: 100%;
	}
	.pullTile{
		margin: 0 auto ;
		display: flex;
		padding: 20rpx 30rpx;
		justify-content: space-between;
		background-color: #eee;
		view{
			width: 100rpx;
			height: 60rpx;
			line-height: 60rpx;
			text-align: center;
			font-size: 14px;
			color: #333;
		}
	}
	.pullTile .cancel{
		margin-left: -20rpx;
	}
	.pullTile .finish{
		background: #fb6d5f;
		color: #fff;
		border-radius: 10rpx;
	}
	.pullInput{
		margin: 0 auto ;
		padding: 30rpx;
		justify-content: space-between;
		background-color: #fff;
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.pullInput .inputInfo{
		flex: 1;
		height: 64rpx;
		line-height: 64rpx;
	}
	.pullInput .close{
		height: 40rpx;
		width: 40rpx;
		background-color: #999;
		color: #fff;
		display: flex;
		justify-content: center;
		border-radius: 50%;
		margin-left: 30rpx;
	}
</style>
