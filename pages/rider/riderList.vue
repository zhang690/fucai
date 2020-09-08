<template>
	<view class="rider-list">	
		<!-- 分段器 -->
		<view class="tabs">
			<segmented :tabs="tabs" @handleParent="handleChild"></segmented>
		</view>
		<view class="content" v-if="current === 1">
			<view class="list-wrap">
				<view class="list-item" v-for="(item,indexA) in waitList" :key="indexA" @click="handleDetail(indexA)">
					<view class="item-left">
						<view class="item-adress">
							<text>{{item.orde.Address}}</text>
						</view>
						<view class="item-user">
							<text>{{item.orde.Name}}</text>
							<text class="user-phone">{{item.orde.Phone}}</text>
						</view>
					</view>
					<view class="item-right">待领取</view>
				</view>
			</view>
		</view>
		<view class="content" v-if="current === 2">
			<view class="list-wrap">
				<view class="list-item" v-for="(item,indexB) in waitList" :key="indexB" @click="handlLook(indexB)">
					<view class="item-left">
						<view class="item-adress">
							<text>{{item.orde.Address}}</text>
						</view>
						<view class="item-user">
							<text>{{item.orde.Name}}</text>
							<text class="user-phone">{{item.orde.Phone}}</text>
						</view>
					</view>
					<view class="item-right">查看</view>
				</view>
			</view>
		</view>
		<view class="content" v-if="current === 3">
			<view class="list-wrap">
				<view class="list-item" v-for="(item,indexC) in waitList" :key="indexC" @click="handlSongda(indexC)">
					<view class="item-left">
						<view class="item-adress">
							<text>{{item.orde.Address}}</text>
						</view>
						<view class="item-user">
							<text>{{item.orde.Name}}</text>
							<text class="user-phone">{{item.orde.Phone}}</text>
						</view>
					</view>
					<view class="item-right">已送达</view>
				</view>
			</view>
		</view>
		<view class="title" v-if="Merchants">没有更多订单啦!!!...</view>
	</view>
</template>
<script>
	import segmented from "@/components/tabs/segmented.vue";
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue";
	import common from '../../common/common'
	var _self;
	export default {
		components: {
			uniNavBar,
			segmented
		},
		data() {
			return {
				tabs: [{
						id: 0,
						name: "待领取",
						isActive: true
					},
					{
						id: 1,
						name: "待配送",
						isActive: false
					},
					{
						id: 2,
						name: "配送成功",
						isActive: false
					}
				],
				current: 1,
				waitList: [],
				page:1,
				total:0,
				Merchants:false
			};
		},
		onShow() {
			_self = this;	
			// 页面进来就是跳转到待领取
			_self.getRuderlist(1,1)			
		},
		onReachBottom(){      // 页面触底事件
			_self.page += 1;   // 当前页数
			if(_self.page > _self.total){				
				_self.Merchants = true;				
				return
			}	
			_self.getRuderlist(_self.current,_self.page);
		},		
		methods: {
			handleChild(e) {
				_self.tabs.forEach(element => {
					element.id === e ? (element.isActive = true) : (element.isActive = false);
				});
				_self.current = e + 1;	
				_self.waitList = [];
				_self.page = 1;
				_self.Merchants = false
				_self.getRuderlist(_self.current,_self.page)				
			},
			// 点击查看配送订单
			handlLook(i) {				
				uni.navigateTo({
					url: './riderPeisong?waitList=' + encodeURIComponent(JSON.stringify(_self.waitList[i]))
				});
			},
			handlSongda(i) {  // 已经送达				
				uni.navigateTo({
					url: './riderWancheng?waitList=' + encodeURIComponent(JSON.stringify(_self.waitList[i]))
				});
			},
			// 点击跳转详情页  待领取
			handleDetail(i) {				
				uni.navigateTo({
					url: './riderDetail?waitList=' + encodeURIComponent(JSON.stringify(_self.waitList[i]))
				});
			},
			getRuderlist(i,page) {
				let { F_UserId } = uni.getStorageSync("riderinfo")
				common.request({
					path: "UserOrder/getpage",    
					data: {
						riderid: F_UserId,    // 骑手id  只有配送
						self_delivery: "2",   // 自提1 /配送2/托管3 
						receivestate: i === 1 ? 'dlq' :'ylq',    // 领取状态   待领取(dlq) 对应待领取  / 已领取 (ylq) 对应待配送和配送成功
						distributionState: i === 1 ? '' : i === 2 ? '1' : '2', //   配送状态: 待配送1 配送成功2  已核销3							
						rows: 10,
						page: page,
						sidx: "LssueTime",
						sord: "desc"
						// outletsid :"",  // 网点id
						// orderstate: "3",     // 订单状态  全部0 / 待结算 1 / 待出票 2 / 待领取 3 / 已完成 4 / 关闭订单 5
					},
					success: res => {
						_self.waitList = [..._self.waitList,...res.data.rows];
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
	.rider-list {
		.nav {
			height: 100rpx;
			margin-top: 40rpx;
		}

		.tabs {
			width: 80vw;
			margin: 20rpx auto 0;
		}

		.list-wrap {
			.list-item {
				margin-top: 15rpx;
				display: flex;
				background-color: #fff;
				justify-content: space-between;
				padding: 30rpx;
				height: 110rpx;
				border-radius: 8rpx;

				.item-left {
					display: flex;
					flex-direction: column;
					justify-content: space-between;

					.item-adress {
						text {
							font-size: 32rpx;
						}

						.juli {
							font-size: 28rpx;
							color: $color;
							margin-left: 20rpx;
						}
					}
					.item-user {
						color: #999;

						.user-phone {
							margin-left: 20rpx;
						}
					}
				}
				.item-right {
					display: flex;
					align-items: center;
					color: $color;
				}
			}
		}
	}
</style>
