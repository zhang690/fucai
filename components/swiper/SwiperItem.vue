<template>
  <view class="swiper_compontent">
		<swiper autoplay 
			:interval="3000" 
			circular
			:duration="1000" 
			class="swiper"
		>
			<swiper-item v-for="(item,index) in banner" :key="index">	
				<image :src="item.Images" mode="widthFix"></image>
			</swiper-item>
		</swiper>
  </view>
</template>
<script>
export default {
  data(){
		return{
			
		}
	},
	props:{
		banner:Array
	}
}
</script>
<style lang="scss" scoped>
	.swiper_compontent{
		width: 90%;
		height: 100%;
		margin-left: 20rpx;
		border-radius: 50rpx;
		swiper{
			width: 710rpx;
			height: 380rpx;	
			overflow:hidden;		
			border-radius: 40rpx!important;
			swiper-item{
				// width: 90%!important;				
				// margin: 0 20rpx!important;
				// padding: 0 20rpx!important;				
				image{
					height: 100%;
					width: 100%;
				}
			}			
		}
	}
	
</style>