<template>
	<view class="namePull">
		<view class="pullTile">
			<view class="cancel" @click="handleCancel">取消</view>
			<view class="finish" @click="handleFinish">完成</view>
		</view>	
		<view class="pullInput">
			<view class="header" @click="handleHead">
				<image :src="myName | Revise" mode=""></image>
			</view>
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
				myName:'',
				imgUrl:'',
				cancelName:''				
			}
		},	
		onLoad(option){
			_self = this;
			_self.myName = option.list;			
			_self.cancelName = option.list
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
						headIcon:value
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
			handleHead(){
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['camera'], //从相册选择   album
					success: function (res) {
						let tempFilePath = res.tempFilePaths[0]						
						uni.showLoading({
							title: '上传中'
						});
						uni.uploadFile({
							url: common.URL+ "annexes/upload",
							filePath: tempFilePath,
							name: 'file',
							formData:common.postdata({
								dir:"caipiaoDadan",
								old:''
							}),
							success: (uploadFileRes) => {						
								let res = JSON.parse(uploadFileRes.data)
								if(res.code === 200){
									uni.showToast({
										icon: 'none',
										title: '上传成功'
									})	
									_self.imgUrl = res.data									
									_self.myName = res.data	
								}else{
									uni.showToast({
										title: '图片上传失败',
										icon: 'none',
										image: '',
										duration: 1500,
										mask: true,
									})
								}
							}
						})						
					}
				})				
			},
			handleClose(){   // x 取消
				if(_self.imgUrl !== ''){					
					_self.imgUrl = ''
					_self.myName = _self.cancelName
				}else{
					uni.showToast({
						title: '您未更新图片,无法取消',
						icon: 'none',
						duration: 1500,
						mask: true,
					})
				}
			},
			handleCancel(){		//取消				  
			    if(_self.imgUrl !== ''){
					_self.myName = _self.cancelName		
					_self.imgUrl = ''	
				}else{
					uni.showToast({
						title: '您未更新图片,无法取消',
						icon: 'none',
						duration: 1500,
						mask: true,
					})
				}
			},
			handleFinish(){					
				if(_self.imgUrl !== ''){
					_self.userRequest(_self.imgUrl)						
				}else{
					uni.showToast({
						title: '您未更新图片,无法提交',
						icon: 'none',
						duration: 1500,
						mask: true,
					})
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
