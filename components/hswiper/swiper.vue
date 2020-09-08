<template>
	<view class="swiper_compontent">
		<swiper class="swiper" acceleration circular :autoplay="autoplay" indicator-dots indicator-color='rgba(0, 0, 0, 0.6)' indicator-active-color="#fff"   :interval="interval" :duration="duration">
			<swiper-item v-for="(item,index) in banner" :key="item.index">
					<image :src="item.Images" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	
	export default {
		props:{
			indicatorDots: {
				defalut:true,
			},
			autoplay: {
				defalut:false,
			},
			interval: {
				defalut:2000,
			},
			duration: {
				defalut:500,
			},
			banner:Array
		},
		
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background: #fff;
	}
	
	.swiper_compontent{
		width: 100%;
		height: 100%;
		margin:0 auto;
		// border-radius: 40rpx;
		overflow:hidden;
		swiper{
			width: 100%;
			height: 380rpx;	
			swiper-item{
				width: 100%;
				height: 380rpx;	
				overflow:hidden;
				// border-radius: 40rpx!important;
				image{
					height: 100%;
					width: 100%;
				}
			}			
		}
	}
	
	
	
	
</style>
