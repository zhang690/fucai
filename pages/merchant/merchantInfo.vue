<template>
	<view class="wait-lingqu">
		<view class="order-number">
			<!-- 外送 -->
			<view class="order-number-info" v-if="orde.Self_Delivery === '2'">
				<view class="order-item"> 
					<view class="order-number-name">
						<view class="order-number-left">{{ orde.Name}} </view>
						<view class="order-number-left">{{ orde.Phone}} </view>				
					</view>				
					<view class="order-number-address">{{ orde.Address}} </view>
				</view>
			<!-- 	<view class="qishou">
					<text>骑手:{{orde.RiderName}}</text>
				</view> -->
			</view>	
			<!-- 自提 -->
			<view class="order-number-info" v-else>
				<view class="order-number-left">{{ orde.Name}} </view>
			</view>			
		</view>			
		<view class="lingqu-content">	
			<!-- 刮刮乐 -->
			<view v-if="orde.LotteryType === '4'">  
			    <view class="content-zhuangtai">					
					<view class="btn">外送</view>
					<view class="name">{{ orde.OutletsName }} </view>
				</view>
				<view class="content-info" v-for="(item,index) in listArray" :key='index'>
					<view class="info-icon">
						<image :src="orde.icon"></image>
					</view>	
					<view class="info-item">
						<view class="info-name">
							<text>{{orde.iconName}} ------ </text>
							<text>{{item.ProductName}} </text>										
						</view>
						<view class="info-num">				
							<view class="info">价格:{{item.Price}}</view>
							<view class="info">数量:{{item.Num}}</view>
							<!-- <view class="">总计:{{orde.Price}}</view> -->
						</view>
					</view>
				</view>
			</view>	
			<!-- 七乐彩 3D  双色球-->	
			<view v-else>
				<view class="content-zhuangtai">
					<view class="btn">{{orde.Self_Delivery | Delivery}}</view>					
					<view class="name">{{ orde.OutletsName }} </view>
				</view>	
				<view class="content-info" v-for="(item,index) in listArray" :key='index'>
					<view class="info-icon">
						<image :src="orde.icon"></image>
					</view>	
					<view class="info-item">
						<view class="info-name">
							<text>{{orde.iconName}} ------ </text>
							<text> {{item.Types | TypesInfo }}</text>						
						</view>
						<view class="info-num">				
							<view class="red">{{item.RedBall | isRedBall }}</view>
							<view class="blue">{{item.BlueBall | isRedBall}}</view>
						</view>
					</view>
				</view>	
			</view>
		</view>			
		<view class="order-number">						
			<!-- <view class="order-number-info" v-if="orde.Self_Delivery === '2'">
				<view class="order-number-left">配送骑手:</view>
				<view class="order-number-right">{{orde.RiderName}}</view>
			</view>	 -->	
			<view class="order-number-info">
				<view class="order-number-left">订单标号</view>
				<view class="order-number-right">{{orde.OrderNumber}}</view>
			</view>
			<view class="order-number-info">
				<view class="order-number-left">创建时间</view>
				<view class="order-number-right">{{orde.AddTime}}</view>				
			</view>
			<view class="order-number-info">
				<view class="order-number-left">完成时间</view>
				<view class="order-number-right">{{orde.LssueTime}}</view>				
			</view>
		</view>		
		<!-- 图片集 -->
		<view class="order_img" v-if = "orde.LotteryImage.length >0">			
			<view class="list_img">
				<view class="item" v-for="(url,index) in imgArray" :key='index'>
					<image :src="imgUrl + url" mode="aspectFill" @click="handleImg"></image>					
				</view>
			</view>
		</view>						
		<view class="lingqu-btn" @click='handleLingqu'>
			<text>确定领取</text>
		</view>
	</view>
</template>
<script>
	import common from '../../common/common'
	var _self;
	export default {
		data() {
			return {
				orde: {},
				listArray:[],
				imgArray:[],
				imgUrl:common.PicURL	
			}
		},		
		onLoad(option) {			
			_self = this;				
			if(option.orderid){				
				_self.handleQuest(option.orderid)
			}else{
				uni.showToast({
					title: '扫码获取数据失败,请重新扫码',
					icon: 'none',
					duration: 1500,
					mask: true,
				})
				uni.navigateTo({  // 返回
					url:'./merchantList'
				})
			}
		},
		methods: {
			handleQuest(orderid) {  // 扫码获取订单 进来的 
				common.request({
					path: "UserOrder/getorder",		
					method: "POST",
					data:orderid,					
					success: result => {						
						const detail = result.data						
						if (detail.rows.LotteryType === "1") {
							detail.rows.icon = "https://fucai.yiruit.com/UpFiles/shouye/shuangseqiu.png";
							detail.rows.iconName = '双色球'	
						} else if (detail.rows.LotteryType === "2") {
							detail.rows.icon = "https://fucai.yiruit.com/UpFiles/shouye/fucai3d.png";
							detail.rows.iconName = '福彩3D'		
						} else if (detail.rows.LotteryType === "3") {
							detail.rows.icon = "https://fucai.yiruit.com/UpFiles/shouye/qilecai.png";
							detail.rows.iconName = '七乐彩'	
						}else if (detail.rows.LotteryType === "4") {
							detail.rows.icon = "https://fucai.yiruit.com/UpFiles/shouye/scraping.png";
							detail.rows.iconName = '刮刮乐'				
						}
						_self.listArray = detail.list
						_self.orde = detail.rows;	
						if(_self.orde.LotteryImage){
							_self.imgArray = _self.orde.LotteryImage.split(",");  // 获取图片  字符串转数组							
						}
					}		
				})
			},
			handleImg(){   // 放大预览图片
				var imgList = []
				for( let i = 0; i < _self.imgArray.length; i++){
					imgList.push(_self.imgUrl + _self.imgArray[i])
				}
				uni.previewImage({				
					urls: imgList
				})				
			},			
			handleLingqu() {  // 确认领取			
				uni.showModal({
					title: '提示',
					content: '确定领取',
					success: function(res) {
						if (res.confirm) {
							common.request({
								path: "UserOrder/uapdatepage",
								data: {					
									id : _self.orde.ID,
									orderstate : "4",  // 订单状态  全部0 / 待结算 1 / 待出票 2 / 待领取 3 / 已完成 4 / 关闭订单 5
									lssuetime : common.Time()										
								},
								success: res => {									
									if(res.code === 200 ){									
										uni.showToast({
											title: '领取成功',
											icon: 'none',
											duration: 1500
										});
										uni.navigateTo({
											url: "./collectRecords"											
										})	
									}else{
										uni.showToast({
											title: '领取失败',
											icon: 'none',
											duration: 1500
										})
									}					
								}
							})
						}
					}
				})					
			}
		}
	}
</script>
<style lang="scss" scoped>
	.wait-lingqu {
		padding: 35rpx;
		.lingqu-content {
			margin-top: 20rpx;
			padding: 20rpx;
			border-radius: 10rpx;
			background-color: #fff;
			box-shadow: 2rpx 2rpx 2rpx #eee;
			.content-zhuangtai{
				width: 100%;
				background-color: #fff;
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				align-items: center;
				.btn{
					text-align: right;
					font-size: 26rpx;
					color: #fff;
					width: 100rpx;
					height: 50rpx;
					line-height: 50rpx;
					background-color: #ff3c36;
					border-radius: 10rpx;
					text-align: center;
					margin-right: 20rpx;
				}
				.name{
					font-size: 32rpx;
					color: #666;
				}
			}
			.content-title {
			    font-size: 16px;
				font-weight: bold;
				color: #333;	
				margin-bottom: 10rpx;
			}
			.content-info {
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				padding: 25rpx 20rpx;
				.info-icon {
					width: 90rpx;
					height: 90rpx;	
					margin-right: 20rpx;
					image {
						display: block;
						width: 100%;
						height: 100%;
					}
				}
				.info-item{
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					.info-name{
						display: flex;
						flex-direction: row;
						text{
							color: #666;
							&:last-child{
								margin-left: 10rpx;
							}
						}
					}					
					.info-num {
						flex: 1;
						display: flex;
						justify-content: flex-start;
						align-items: center;
						.red{						
							color: red;		
							white-space:pre;
						}
						.blue{
							color: blue;
							margin-left: 16rpx;
						}
						.info{
							font-size: 15px;
							color: #666;
							&:first-of-type{
								margin-right: 30rpx;
							}
						}
					}
				}
			}
		}
		.order-number {
			height: auto;
			margin: 0 auto;
			margin-top: 20rpx;
			background-color: #fff;
			color: #999;			
			padding: 30rpx 20rpx;
			border-radius: 10rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			font-size: 14px;			
			color: #666;	
			margin-bottom: 30rpx;
			.order-number-info{
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				font-size: 14px;	
				margin-bottom: 20rpx;
				align-items: center;
				.order-number-name{
					display: flex;
					flex-direction: row;
					justify-content: flex-start;
					.order-number-left{
						font-size: 30rpx;
						color: #666;
						&:first-of-type{
							color: #333;
							margin-right: 20rpx;
							margin-bottom: 20rpx;
							font-size: 36rpx;
						}
					}
				}
				.order-number-address{
					font-size: 30rpx;
					color: #666;
				}
				.order-item{
					display: flex;
					flex-direction: column;
					justify-content: space-between;
				}
				.qishou{
					width: 236rpx;
					height: 70rpx;
					line-height: 70rpx;
					text-align: center;
					background-color: #ff3c36;
					border-radius: 10rpx;				
					text{
						color: #fff;
						font-size: 30rpx;
					}
				}
			}				
			.order-number-item{
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				font-size: 14px;
				color: #666;
				.order-number-left{					
					&:last-of-type{
						margin: 0 20rpx;
					}			
				}	
			}
		}
	}
	.order_img{
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		background-color: #fff;	
		width: 100%;
		padding: 0 20rpx;
		margin-bottom: 120rpx;
		padding-top: 20rpx;				
		.list_img{
			display: flex;
			flex-direction: row;
			justify-content: flex-start;			
			flex-wrap: wrap;							
			.item{
				width: 210rpx;
				height: 210rpx;
				margin-bottom: 20rpx;
				margin-right: 16rpx;				
				image{
					display: block;
					width: 210rpx;
					height: 210rpx;
				}
			}
		}
	}
	.lingqu-btn {
		position: fixed;
		bottom: 0rpx;
		width: 100%;
		left: 50%;
		height: 120rpx;
		transform: translateX(-50%);
		background-color: #faf6f7;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		text{				
			width: 90%;
			height: 60rpx;				
			border-radius: 30rpx;
			color: #fff;
			background-color: $color;
			line-height: 60rpx;
			text-align: center;
		}	
	}
</style>
