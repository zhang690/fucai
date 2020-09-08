<template>
	<view class="duihuan">
		<view class="duihuan-wrap">			
			<view class="duihuan-item" v-for="(item,index) in duihuanList" :key="index">
				<view class="duihuan-icon">
					<image mode="widthFix" src="../../static/exchange.png"></image>
				</view>
				<view class="duihuan-info">
					<view class="info-title">{{item.order.OutletsName}}</view>
					<view class="info-text">{{item.orde.LssueTime}}</view>
				</view>		
				<!-- <view>
					{{item.orde.Price}}
				</view> -->
			</view>
		</view>
		<view class="title" v-if="Merchants">没有更多兑奖啦!!!...</view>
	</view>
</template>
<script>
	import common from '../../common/common'
	var _self;
	export default {
		data() {
			return {
				duihuanList: [],
				page:1,
				total:0,
				Merchants:false				
			}
		},
		onLoad() {
			_self = this;			
			_self.handleList(1);
		},
		onReachBottom(){      // 页面触底事件
			_self.page += 1;   // 当前页数
			if(_self.page > _self.total){				
				_self.Merchants = true;				
				return
			}	
			_self.handleList(_self.page);
		},
		methods: {
			handleList(page) {
				let { ID } = uni.getStorageSync("userinfo");
				common.request({
					path: "Order/getpage",
					data: {
						memerid: ID,
						product: "jifen",
						rows: 10,
						page: page,
						sidx: "AddTime",
						sord: "desc"
					},
					success: res => {
						_self.duihuanList =[..._self.duihuanList,...res.data.rows];
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
	.duihuan {
		.duihuan-wrap {
			.duihuan-item {
				display: flex;
				border-bottom: 1rpx solid #ddd;
				padding: 20rpx;
				align-items: center;

				.duihuan-icon {
					flex: 1;
					display: flex;
					align-items: center;
					justify-content: center;

					image {
						width: 80rpx;
						height: 80rpx;
						border-radius: 50%;
					}
				}

				.duihuan-info {
					flex: 5;
					margin-left: 20rpx;

					.info-title {}

					.info-text {
						font-size: 24rpx;
						color: #999;
					}
				}

				.duihuan-right {
					flex: 1;
					color: #666;
				}
			}
		}
	}
</style>
