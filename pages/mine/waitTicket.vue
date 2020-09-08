<template>
	<view class="waitTicket">
		<!-- 头部地址开始 -->
		<!-- <view class="header_adress">
			<view class="adress_left">
				<view class="left_title">{{detail.OutletsName}}</view>
				<view class="left_text">{{!!detail.Address?detail.Address:''}}</view>
			</view>
			<view class="adress_right">
				<view class="right_distance">130m</view>
				<view class="right_go">去这里</view>
			</view>
		</view> -->
		<!-- 头部地址结束 -->
		<!-- isDelete==true -->
		
		



		<!-- 待出票开始 -->
		<view class="wait_container">
			<view class="wait_title">
				<view class="wait_title_left">
					<text>{{detail.Self_Delivery}}</text>{{detail.OutletsName}}投注站
				</view>
				<view class="wait_title_right">{{detail.name}}</view>
			</view>
			<view class="wait_list">
				<!-- 彩票内容开始 -->
				<view class="wait_item">
					<view class="wait_item_icon">
						<image :src="detail.icon" mode="widthFix"></image>
					</view>
					<view class="wait_item_wrap">
						<view class="wait_item_info" v-for="(item,index) in list" :key="index">
							<!-- 双色球、七乐彩、福彩3D -->
							<view class="qiu_text" v-if="detail.LotteryType<4">
								<text v-for="(red) in item.RedBall" :key="red">{{red}}{{detail.LotteryType==4?' * '+(item.Price/red)+'元':''}}</text>
								<text class="blue" v-for="(blue,ind) in item.BlueBall" :key="ind">{{blue}}</text>
							</view>
							<!-- 刮刮乐 -->
							<view class="qiu_text" v-else>
								<text>{{item.ProductName}} {{item.Price}}福豆/张</text>
							</view>
							<!-- 双色球、七乐彩、福彩3D -->
							<view class="wait_item_qishu" v-if="detail.LotteryType<4">
								<view class="qishu_text">
									<text>期数*{{item.Num}}</text>
									<text>倍数*{{item.Multiple}}</text>
								</view>
								<view class="qishu_info">第{{item.Fixed}}期</view>
							</view>
							<!-- 刮刮乐 -->
							<view class="wait_item_qishu" v-else>
								<view class="qishu_text">
									<text>共计：{{item.Num}} 张 </text>
								</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 彩票内容结束 -->
				<view class="total_wrap">
					<view class="total_title">
						<view>第 {{list[0].Number}} 期</view>
						<view>共 {{list.length}} 注</view>
					</view>
					<!-- <view class="total_title">共{{list.length}}注</view> -->
					<!-- 取消订单 -->
					<view class="total_delete" v-if="applyForDelete&&!isDelete" @tap="deleteOrder">申请取消</view>
					<view class="total_delete" v-else>{{applyForState}}</view>
					<view class="total_item">
						<view v-if="detail.OrderState != 1">合计：{{detail.SinglePrice}} 福豆</view>
						<view v-else>合计：{{detail.Price}} 福豆</view>
						<view class="total_item_text" v-if="detail.DeductionAmount>0">
							(体验券:-{{detail.DeductionAmount}})
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 待出票结束 -->

		<!-- 下单时间开始 -->
		<view class="chupiao_container">
			<view class="chupiao_time">兑换编码：{{detail.OrderNumber}}</view>
			<view class="chupiao_time">兑换体验时间：{{detail.AddTime}}</view>
		</view>

		<!-- 以下的在 isDelete == false 的时候才显示 -->
		<!-- 催促出票开始 -->
		<block v-if="applyForState===''">
			<view class="cuicu_btn" v-if="!isDelete">
				<view class="cuicu" @click="handleCuicu">催促兑票</view>
			</view>
			<!-- 催促兑票结束 -->
			<!-- 兑票凭证开始 -->
			<view class="chupiao" v-if="!isDelete">
				<!-- <view class="chupiao_title">兑票凭证</view> -->
				<view class="laod_chupiao">等待兑票...</view>
			</view>
			<!-- 出票凭证结束 -->
			<!-- 以上的在 isDelete == false 的时候才显示 -->

			<!-- 取消原因 isDelete == true 的时候才显示 -->
			<view class="delete_area" v-if="isDelete">
				<view class="delete_area_text" @tap="beforeDelete" v-if="canDelete">退单原因</view>
				<view>
					<textarea @blur="enterReason" placeholder="请输入您取消订单的原因" />
					</view>
			</view>
			<!-- 底部 确认取消按钮 -->
			<view class="footer" v-if="isDelete">
				<view class="footer_btn_wrap">
					<view class="footer_btn" @tap="confirmDelete">确认</view>
				</view>
			</view>
		</block>
	</view>
</template>
<script>
	import common from '../../common/common'
	var _self;
	export default {
		data() {
			return {
				applyForState:'',// 订单状态 提示字段 审核中 或 已退单
				applyForDelete:true,// 取消订单按钮，在审核中 和 已退单的订单点击进入不能显示
				canDelete:true,
				reason:'',
				isDelete:false,
				num: 7,
				detail: {},
				list: [],
				item: {}
			}
		},
		onLoad(e) {
			_self = this;
			_self.isDelete = false;
			_self.item = JSON.parse(decodeURIComponent(e.item));
			_self.detail = _self.item.orde;
			_self.list = _self.item.list;
			if(_self.detail.name != '兑票中') {
				this.canDelete = false;
			}
			if(_self.detail.name == '审核中' || _self.detail.name == '已退单'){
				_self.applyForDelete = false;
				_self.applyForState = _self.detail.name;
				
			}
			
		},
		onShow(e) {
			
		},
		onHide() {
			_self.canDelete = true;
			_self.applyForDelete = true;
			_self.applyForState = '';
		},
		onBackPress() {
			if(_self.isDelete) _self.isDelete = false;
		},
		methods: {
			// 按下取消订单按钮之前判断 是否为 
			beforeDelete(){
				if(_self.detail.name != '兑票中' || _self.detail.name != '待领取'){
					uni.showModal({
						content:'您的订单不能取消',
						showCancel:false
					})
				}
			},
			// textarea区域失去焦点事件
			enterReason(e){
				_self.reason = e.detail.value;
			},
			// 确认 按钮点击事件
			confirmDelete(){
				uni.showModal({
					title:'提示',
					content:"您确认取消当前订单吗？",
					success(e) {
						if(e.cancel){
							return false;
						}else if(e.confirm){
							common.request({
								path:'Order/chargeback',
								data:{
									orderid:_self.item.orde.ID,
									reason:_self.reason
								},
								success(){
									_self.reason='';
									uni.showModal({
										title:'退单申请',
										content:'已将您的退单申请提交，正在审核中...',
										showCancel:false,
										success() {
											uni.navigateBack({
												delta:1
											})
										}
									})
								}
							})
						}
						
					}
				})
			},
			// 取消订单 按钮事件
			deleteOrder(){
				if(!_self.isDelete){
					_self.isDelete = true;
					uni.setNavigationBarTitle({
						title:'取消订单'
					})
				}else {
					uni.setNavigationBarTitle({
						title:'待出票'
					})
				}
			},
			handleCuicu() {
				uni.showToast({
					title: '催促出票成功，请耐心等待',
					icon: 'none',
					duration: 1500,
					mask: true,
				});
			}
		},
	}
</script>
<style lang="scss" scoped>
	.waitTicket {
		
		height:100vh;
		background-color: #f7f5f6;
		.chupiao_container{
		  margin-top: 20rpx;
		  background-color: #fff;
		  color: #999;
		  .chupiao_time{
		    padding: 20rpx;
				margin-bottom:10rpx;
		    border-bottom: 1rpx solid #eee;
		  }
		}
		.header_adress {
			display: flex;
			justify-content: space-between;
			padding: 20rpx 40rpx;
			align-items: center;
			background-color: #fff;

			.adress_left {
				.left_title {
					font-size: 30rpx;
					font-weight: 600;
				}

				.left_text {
					color: #666;
					margin-top: 10rpx;
				}
			}

			.adress_right {
				font-size: 24rpx;

				.right_distance {
					color: #666;
				}

				.right_go {
					color: $color;
					margin-top: 10rpx;
				}
			}
		}

		.wait_container {
			background-color: #fff;
			margin-top: 15rpx;

			.wait_title {
				display: flex;
				justify-content: space-between;
				padding: 20rpx;
				border-bottom: 1rpx solid #eee;

				.wait_title_left {
					display: flex;
					font-weight: 600;
					align-items: center;

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

				.wait_title_right {
					white-space: normal;
					word-break: keep-all;
					display: flex;
					align-items: center;
					color: #999;
				}
			}

			.wait_list {
				.wait_item {
					display: flex;
					border-bottom: 1rpx solid #eee;
					padding: 20rpx;

					.wait_item_icon {
						// flex: 1;
						width: 60rpx;
						margin-top: 15rpx;
					}

					.wait_item_wrap {
						flex: 3;

						.wait_item_info {

							color: $color;
							font-weight: 600;
							margin-left: 10rpx;
							line-height: 50rpx;
							display: flex;
							margin-top: 15rpx;

							.qiu_text {
								width: 400rpx;
								display: flex;
								flex-wrap: wrap;

								.blue {
									color: blue;
								}
							}

							.wait_item_qishu {
								flex: 2;
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
						}
					}


				}

				.total_wrap {
					display: flex;
					justify-content: space-between;
					font-size: 30rpx;
					font-weight: 600;
					padding: 20rpx 30rpx;

					.total_title {
						display: flex;
						align-items: center;
						:nth-child(2) {
							margin-left:20rpx;
						}
					}
					.total_delete {
						display: flex;
						justify-content: center;
						align-items: center;
						font-size: 26rpx;
						letter-spacing: 2rpx;
						// margin-left:240rpx;
						color:#999999;
					}
					.total_item_text{
						font-size: 24rpx;
						color: #999999;
					}
				}
			}
		}

		.cuicu_btn {
			margin-top: 20rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100rpx;
			background-color: #fff;

			.cuicu {
				border: 1rpx solid $color;
				color: $color;
				height: 60rpx;
				width: 200rpx;
				text-align: center;
				line-height: 60rpx;
				border-radius: 30rpx;
				font-weight: 600;
			}
		}

		.chupiao {
			margin-top: 15rpx;
			background-color: #fff;
			font-weight: 600;

			.chupiao_title {
				border: 1rpx solid #eee;
				padding: 20rpx 30rpx;
			}

			.laod_chupiao {
				text-align: center;
				padding: 20rpx 0;
				color: #999;
			}
		}
	}
	

	.delete_area {
		margin-top:15rpx;
		.delete_area_text {
			padding:30rpx 0;
			background-color: #FFFFFF;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		view {
			padding-bottom: 100rpx;
			textarea{
				margin:15rpx auto 0;
				resize: none;
				width: 80%;
				height: 200rpx;
				max-width: 80%;
				max-height: 200rpx;
				border: 1rpx solid #cccccc;
				background-color: #FFFFFF;
				padding:30rpx;
			}
		}
	}
	
	.footer{
		background-color: #FFFFFF;
		position: fixed;
		left:0;
		bottom: 0;
		width:100%;
		height:100rpx;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		.footer_btn_wrap{
			padding-right:20rpx;
			.footer_btn{
				width: 120rpx;
				height: 60rpx;
				border-radius: 8rpx;
				color: #FFFFFF;
				line-height: 60rpx;
				text-align: center;
				background-color: $color;
				margin-right: 20rpx;
			}
		}
		
	}
	
</style>
