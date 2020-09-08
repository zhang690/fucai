<template>
	<view class="jifen">
		<!-- 主体内容开始 -->
		<view class="jifen_content">		
			<view class="jifen_card_wrap">
				<view class="jifen_card_item" v-for="(item,index) in products" :key="item.ID">
					<view class="card_icon" @click="handleDuihuan(index)">
						<image :src="'https://fucai.yiruit.com' + item.images" mode="aspectFill"></image>
					</view>
					<view class="card_title">{{item.ProductName}}</view>
					<view class="card_jifen">{{item.Price}}积分</view>
				</view>
			</view>
		</view>
		<view class="title" v-if="Merchants">没有更多活动啦!!!...</view>
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
				page:1,
				total:0,
				Merchants:false
			}
		},
		onLoad() {
			_self = this;
			_self.getData(1);
		},
		onReachBottom(){      // 页面触底事件
			_self.page += 1;   // 当前页数
			if(_self.page > _self.total){				
				_self.Merchants = true;				
				return
			}	
			_self.getData(_self.page);
		},	
		methods: {
			// 跳转积分兑换
			handleDuihuan(i) {
				uni.setStorageSync("jifen", _self.products[i]);
				uni.navigateTo({
					url: './jifenIntegral',
				});
			},		
			getData(page) {
				common.request({
					path: "Development/getshopping",				
					data: {
						rows: 5,
						page: page,
						productname: "",
						sidx: "ReleaseTime",
						sord: "desc",
					},
					success: res => {						
						_self.products = [..._self.products ,...res.data.rows];
						_self.total = res.data.total						
					}
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.title{
		width: 100%;
		text-align: center;
		padding: 40rpx 0;
		color: #ccc;
	}
	.jifen {
		.jifen_content {
			padding-top: 60rpx;
			padding: 20rpx 30rpx;
			background-color: #fff;
			.jifen_card_wrap {
				display: flex;
				flex-wrap: wrap;
				flex-direction: row;
				justify-content: space-between;
				.jifen_card_item {
					width: 48%;
					text-align: center;
					padding: 20rpx 0;
					.card_icon {
						width: 100%;
						margin: 0 auto;
						height: 500rpx;
						image{
							display: block;
							width: 100%;
							height: 100%;
						}
					}
					.card_title {
						margin: 13rpx 0;
					}
					.card_jifen {
						color: $color;
						font-size: 24rpx;
					}
				}
			}
		}
	}
</style>
