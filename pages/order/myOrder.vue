<template>
	<view class="myOrder">
		<view class="tabs">
			<view class="tabs_wrap">
				<view :class="item.id==thisID?'tabs_item':''" v-for="item in tabs" :key="item.id" @click="handelChild(item)">{{item.name}}</view>
			</view>
		</view>
		<!-- <tabs :tabs="tabs" @handelChild="handelChild"></tabs> -->
		<view class="allOrder_container">
			<view @click="handleDetail(item)" class="allOrder_item" v-for="(item,index) in orderList" :key="index">
				<view class="allOrder_title">
					<view class="allOrder_title_left">
						<!-- '福彩到家'+ -->
						<text>{{item.orde.Self_Delivery}}</text>{{!!item.orde.OutletsName?(item.orde.OutletsName+'投注站'):''}}
						<!-- <text>{{item.orde.Self_Delivery}}</text>{{item.orde.Self_Delivery == '外送'?item.orde.Address:(item.orde.OutletsName+'投注站')}} -->
					</view>
					<view class="allOrder_title_right" v-if="item.orde.OrderState!=1">{{item.orde.name}}</view>
					<view class="jiesuan_warp" v-if="item.orde.OrderState==1">
						<view class="jiesuan delete" @click="handleSettle(item.orde)">结算</view>
						<view class="jiesuan" @click="handleDelete(item.orde)">删除</view>
					</view>
				</view>
				<view class="allOrder_list">
					<!-- 彩票内容开始 -->
					<view class="allOrder_item">
						<view class="allOrder_item_icon">
							<image :src="item.orde.icon" mode="widthFix"></image>
						</view>
						<view class="allOrder_item_wrap">
							<view class="allOrder_item_info" v-for="(redItem,redindex) in item.list" :key="redindex">
								<!-- 双色球、七乐彩、福彩3D -->
								<view class="qiu_text" v-if="item.orde.LotteryType<4">
									<!-- #ifdef MP-WEIXIN -->
									<text v-for="red in redItem.RedBall" :key="red">{{red}}{{item.orde.LotteryType==4?' * '+(redItem.Price/red)+'福豆':''}}</text><text
									 class="blue" v-for="blue in redItem.BlueBall">
									 <!-- #endif -->
										<!-- #ifdef H5 -->
										<text v-for="(red,i) in redItem.RedBall" :key="i">{{red}}{{item.orde.LotteryType==4?' * '+(redItem.Price/red)+'福豆':''}}</text><text
										 class="blue" v-for="blue in redItem.BlueBall" :key="blue">{{blue}}</text>
										<!-- #endif -->

										<!-- <view class="qiu_text_item">第{{redItem.Number}}期</view> -->

								</view>
								<!-- 刮刮乐 -->
								<view class="qiu_text" v-else>
									<text>{{redItem.ProductName}} {{redItem.Price}}福豆/张</text>
								</view>
								<!-- 双色球、七乐彩、福彩3D -->
								<view class="allOrder_item_qishu" v-if="item.orde.LotteryType<4">
									<view class="qishu_text">
										<!-- <text>期数*{{redItem.Fixed}}</text> -->
										<text>期数*{{redItem.Num}}</text>
										<text>倍数*{{redItem.Multiple}}</text>
									</view>
									<view class="qishu_info">
										第{{redItem.Fixed}}期
									</view>
								</view>
								<!-- 刮刮乐 -->
								<view class="allOrder_item_qishu" v-else>
									<view class="qishu_text">
										<text>共计：{{redItem.Num}} 张</text>
									</view>
								</view>
							</view>

						</view>
					</view>
					<!-- 彩票内容结束 -->
					<view class="total_wrap">
						<view class="total_time">{{item.orde.AddTime}}</view>
						<view class="total_right">
							<text v-if="item.orde.OrderState != 1">共 {{item.list.length}} 组，合计：{{item.orde.SinglePrice}} 福豆</text>
							<text v-else>共 {{item.list.length}} 组，合计：{{item.orde.Price}} 福豆</text>
							<text v-if="item.orde.DeductionAmount>0">(体验券:-{{item.orde.DeductionAmount}})</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	// import tabs from '../../components/tabs/tabs';
	import common from '../../common/common';
	var _self;
	export default {
		// components: {
		// 	tabs
		// },
		data() {
			return {
				tabs: [{
						id: 0,
						name: '全部',
						param: '111',
						isActive: true
					},
					{
						id: 1,
						name: '待确定', // 原 待结算
						param: '222',
						isActive: false
					},
					{
						id: 2,
						name: '兑票中', // 原 待出票
						param: '333',
						isActive: false
					},
					{
						id: 3,
						name: '待领取',
						param: '4444',
						isActive: false
					},
					{
						id: 4,
						name: '已完成',
						param: '555',
						isActive: false
					}
					// ,
					// {
					// 	id: 6,
					// 	name: '退单中',
					// 	param: '777',
					// 	isActive: false
					// },
					// {
					// 	id: 5,
					// 	name: '已退单',
					// 	param: '666',
					// 	isActive: false
					// }
				],
				orderstate: "",
				orderList: [],
				active: false,
				state: {},
				thisID: 0,
				orderFlag: false, // 判断是从购买页进入，则返回时直接到首页
			}
		},
		onLoad(e) {
			_self = this;
			if (!!e.order) _self.orderFlag = true;
			if (!!e.id) _self.thisID = e.id;
			_self.state = common.getstate();
			_self.handleOeder();

			let pages = getCurrentPages(); //获取页面栈
			let prevPage = pages[pages.length - 2] // 获取上一级页面
			if (prevPage.canClear === false) {
				prevPage.canClear = true;
			}

		},
		onShow() {
			_self.handleOeder();
			// let page = getCurrentPages();
			// _self.orderstate = page[page.length - 1].options.id;
			// if (_self.orderstate != "") {
			// 	_self.tabs.forEach((element, index) => {
			// 		index == _self.orderstate ? element.isActive = true : element.isActive = false;
			// 	});
			// } else {
			// 	_self.tabs.forEach((element, index) => {
			// 		index == 0 ? element.isActive = true : element.isActive = false
			// 	});
			// }

		},
		onBackPress(e) {
			if (_self.orderFlag && e.from == "backbutton") {
				console.log('购买页进入');
				_self.orderFlag = false;
				uni.reLaunch({
					url: '../index/index'
				});
				return true;
			} else {
				return false;
			}

		},
		methods: {
			// 点击跳转详情页
			handleDetail(_item) {
				if (_item.orde.OrderState == 2 || _item.orde.OrderState == 5 || _item.orde.OrderState == 6) {
					uni.navigateTo({
						url: '../mine/waitTicket?item=' + encodeURIComponent(JSON.stringify(_item)), //待出票
					});
				} else if (_item.orde.OrderState == 3) {
					uni.navigateTo({
						url: '../mine/waitRecive?item=' + encodeURIComponent(JSON.stringify(_item)), //待领取
					});
				} else if (_item.orde.OrderState == 4) {
					uni.navigateTo({
						url: '../mine/wancheng?item=' + encodeURIComponent(JSON.stringify(_item)), //已完成
					});
				}
			},
			handelChild(_item) {
				_self.thisID = _item.id;
				_self.handleOeder();
			},
			handleOeder() {
				common.request({
					path: "Order/getpage",
					data: {
						memerid: _self.state.ID,
						orderstate: _self.thisID > 0 ? _self.thisID : '',
						rows: 50,
						page: 1,
						sidx: "AddTime",
						sord: "desc"
					},
					success: res => {
						res.data.rows.forEach(elem => {
							elem.list.forEach(element => {

								if (element.RedBall != null) {
									element.RedBall = element.RedBall.split(",");
								}
								if (element.BlueBall != null) {
									element.BlueBall = element.BlueBall.split(",");
								}
							})
							if (elem.orde.OrderState == 1) {
								elem.orde.name = "待确定"
							} else if (elem.orde.OrderState == 2) {
								elem.orde.name = "兑换中"
							} else if (elem.orde.OrderState == 3) {
								elem.orde.name = "待领取"
							} else if (elem.orde.OrderState == 4) {
								elem.orde.name = "已完成"
							} else if (elem.orde.OrderState == 5) {
								elem.orde.name = "已退单"
							} else if (elem.orde.OrderState == 6) {
								elem.orde.name = "审核中"
							}
							if (elem.orde.Self_Delivery == 1) {
								elem.orde.Self_Delivery = "自提"
							} else if (elem.orde.Self_Delivery == 2) {
								elem.orde.Self_Delivery = "到家"
							} else if (elem.orde.Self_Delivery == 3) {
								elem.orde.Self_Delivery = "托管"
							}
							if (elem.orde.LotteryType == "1") {
								elem.orde.icon = "https://fucai.yiruit.com/UpFiles/shouye/shuangseqiu.png"
							} else if (elem.orde.LotteryType == "2") {
								elem.orde.icon = "https://fucai.yiruit.com/UpFiles/shouye/fucai3d.png"
							} else if (elem.orde.LotteryType == "3") {
								elem.orde.icon = "https://fucai.yiruit.com/UpFiles/shouye/qilecai.png"
							} else if (elem.orde.LotteryType == "4") {
								elem.orde.icon = "https://fucai.yiruit.com/UpFiles/tupian/le.png"
							}
						});

						_self.orderList = res.data.rows;
					}
				});
			},
			// 获取个人信息和积分余额
			getUserList() {
				return new Promise((resolve,reject)=>{
					common.request({
						path: "Development/getmember",
						data: _self.state.ID,
						success: result => {
							resolve(result)
						},
						fail:(err)=>{
							reject(err);
						}
					})
				})
			},
			// 待结算订单点击删除按钮
			async handleDelete(item) {
				let isDelete = await common.showModal('删除订单','请问是否确认删除当前订单','none',true);
				if(isDelete){
					common.request({
						path: 'Order/deleteorder',
						data: item.ID,
						success() {
							_self.handleOeder();
							common.showModal('完成','您的订单已删除')
						}
					})
				}else{
					return false;
				}
			},
			// 待结算订单点击结算按钮
			async handleSettle (_order) {
				// 点击结算时，实时获取用户余额
				_self.state.Balance = await _self.getUserList();
				_self.state.Balance = _self.state.Balance.data.member.Balance;
				// 点击结算时，余额小于总价
				if (_self.state.Balance < _order.Price) {
					let moreMoney = await common.showModal('您的福豆不足','请至线下福彩到家网点获取福豆','none',true,'获取福豆');
					if(moreMoney) uni.navigateTo({url: '../giveSelect/giveSelect?current=0&from=buy'});
					//return false;
				// 点击结算时，余额大于总价
				} else {
					let clsAccount = await common.showModal('确定结算？','您当前剩余福豆为：' + _self.state.Balance,'none',true);
					if(clsAccount){
						common.request({
							path: "Order/jiesuan",
							data: _order.ID,
							success: res => {
								_self.state.Balance = _self.state.Balance - _order.Price;
								common.setstate(_self.state);
								_self.handleOeder();
								common.showModal('提交成功')
							}
						});
					}
				}
			}
		},
		
		watch: {
			orderstate(val, oldVal) {
				_self.handleOeder(val)
			}
		},
	}
</script>
<style lang="scss" scoped>
	.myOrder {
		background-color: #f7f5f6;

		.allOrder_container {
			.allOrder_item {
				background-color: #fff;
				margin-top: 15rpx;
				
				.allOrder_title {
					display: flex;
					justify-content: space-between;
					padding: 20rpx;
					border-bottom: 1rpx solid #eee;

					.allOrder_title_left {
						display: flex;
						font-weight: 600;
						align-items: center;
						padding-right: 20rpx;

						text {
							display: block;
							background-color: $color;
							color: #fff;
							width: 65rpx;
							height: 32rpx;
							text-align: center;
							line-height: 32rpx;
							font-size: 24rpx;
							border-radius: 5rpx;
							margin-right: 10rpx;
						}
					}

					.allOrder_title_right {
						white-space: normal;
						word-break: keep-all;
						display: flex;
						align-items: center;
						color: #999;
					}

					.jiesuan_warp {
						display: flex;
						width: 150rpx;

						.jiesuan {
							color: #FF3C36;
						}

						.delete {
							margin-right: 20rpx;
						}
					}
				}

				.allOrder_list {
					.allOrder_item {
						display: flex;
						border-bottom: 1rpx solid #eee;
						padding: 20rpx;

						.allOrder_item_icon {
							// flex: 1;
							width: 60rpx;
							// margin-top: 20rpx;
							display: flex;
							align-items: center;
							image {
								width: 60rpx;
								height: 60rpx;
							}
						}

						.allOrder_item_wrap {
							flex: 3;
							.allOrder_item_info {
								color: $color;
								font-weight: 600;
								margin-left: 10rpx;
								display: flex;
								justify-content: space-between;
								margin-top: 20rpx;

								.qiu_text {
									width: 400rpx;
									display: flex;
									flex-wrap: wrap;
								}

								.allOrder_item_qishu {
									flex: 1;
									font-size: 24rpx;
									text-align: center;

									.qishu_text {
										color: #666;

										text {
											margin-left: 20rpx;
										}
									}

									.qishu_info {
										width: 90rpx;
										height: 32rpx;
										color: #333;
										background-color: #f7f5f6;
										margin-left: 130rpx;
										margin-top: 20rpx;
										line-height: 32rpx;
									}
								}

								text {
									margin-left: 15rpx;
								}

								.blue {
									color: blue;
								}
							}
						}



					}

					.total_wrap {
						display: flex;
						justify-content: space-between;

						padding: 20rpx 30rpx;

						.total_time {
							color: #999;
							font-size: 24rpx;
						}
					}
				}
			}
		}
	}

	.tankuang {
		position: fixed;
		top: 50%;
		left: 50%;
		background-color: #fff;
		box-shadow: 0 2px 4px #000;
		width: 60%;
		height: auto;
		border-radius: 10rpx;
		margin-left: -30%;
		margin-top: -40%;

		view {
			width: 100%;
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			color: #FB471E;
			font-size: 16px;
			border-bottom: 1px solid #eee;

			&:last-child {
				border-bottom: none;
			}
		}
	}

	.tabs {
		background-color: #fff;

		.tabs_wrap {
			display: flex;
			height: 60rpx;
			align-items: center;
			justify-content: space-between;
			padding: 30rpx 20rpx;

			.tabs_item {
				border-bottom: 6rpx solid $color;
				padding-bottom: 15rpx;
				font-size: 32rpx;
			}
		}
	}

	.total_right text {
		font-size: 24rpx;
		color: #999999;
	}
</style>
