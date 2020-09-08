<template>
	<view class="namePull">
		<view class="pullTile">
			<view class="cancel" @click="handleCancel">取消</view>
			<view class="finish" @click="handleFinish">完成</view>
		</view>	
		<view class="pullInput">
			<input maxlength="11" @blur='inputTel' v-model="phone" class="inputInfo" type="text"/>
			<view class="close" @click="handleClose">x</view>
		</view>
		<view class="pullInput">
			<input v-model="verification" class="inputInfo" placeholder="请输入验证码" type="text"/>
			<view class="huoqu" @click="handleCode">
				<text>{{dataTime}}</text>
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
				phone:'',
				cancelPhone:'',
				dataTime:'获取验证码',
				verification:''
			}
		},	
		onLoad(option){
			_self = this;				
			_self.phone = option.list !== 'null' ? option.list : '输入手机号';
			_self.cancelPhone = option.list
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
						Phone:value
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
				if(_self.phone){
					_self.phone = ''
				}else{
					uni.showToast({
						title: '已经为空了!!!',
						icon: 'none',
						duration: 1500,
						mask: true,
					})	
				}
			},
			handleCancel(){	 // 取消	
			    uni.showToast({
					title: '取消修改',
					icon: 'none',
					duration: 1500,
					mask: true,
			    })	
				_self.phone = _self.cancelPhone							
			},
			inputTel() { // 手机号的判断
				if (!common.checkPhone(_self.phone)) {
					uni.showToast({
						icon: 'none',
						title: '请输入正确的手机号码',
						duration: 1500,
					});	
					_self.phone = ''
				}				
			},
			handleFinish(){	
				if(_self.phone === _self.cancelPhone || _self.phone === ''){
					uni.showToast({
						title: '不能为空或数据未作修改',
						icon: 'none',
						duration: 1500,
						mask: true,
					})	
				}else{
					if(!!!_self.verification){					
						uni.showToast({
							title: '验证码未填写',
							icon: 'none',
							duration: 1500,
							mask: true,
						})	
						return
					}
					_self.userRequest(_self.phone)						
				}		
			},
			handleCode(){  // 获取验证码
				if(_self.phone){	// 判断手机是否填写 正确					
					let time = 60
					var timeId = setInterval(()=>{		
						if(time == 0) {
							_self.dataTime = '获取验证码'	
							clearInterval(timeId)
							return 
						} 
						time --
						_self.dataTime = time + 's'				
					},1000)
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
		&:last-of-type{
			border-top: 1px solid #eee;
		}
		.huoqu {
			width: 160rpx;
			height: 60rpx;
			line-height: 60rpx;					
			text-align: center;
			border-radius: 10rpx;		
			background-color: #fb6d5f;
			text{
				font-size: 12px;
				color: #fff;
			}
		}
	}
	.pullInput .inputInfo{
		flex: 1;
		height: 64rpx;
		line-height: 64rpx;
		color: #999;
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
