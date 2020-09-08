<template>
	<view class="wait-lingqu">
		<view class="order-number">
			<!-- 外送 -->
			<view class="order-number-info" v-if="orde.Self_Delivery === '2'">
				<view class="order-item"> 
					<view class="order-number-name">
						<view class="order-number-left">{{ orde.MemberName}} </view>
						<view class="order-number-left">{{ orde.Phone}} </view>				
					</view>				
					<view class="order-number-address">{{ orde.Address}} </view>
				</view>
				<view class="qishou" @click="handleQishou">
					<text>分配骑手</text>
				</view>
			</view>		
			<view class="order-number-info" v-else>
				<view class="order-number-left">{{ orde.MemberName}} </view>				
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
							<block v-if='item.RedBall'>		
								<view class="red">{{item.RedBall | isRedBall}}</view>
							</block>
							<block v-if='item.BlueBall'>	
								<view class="blue">{{item.BlueBall  | isRedBall}}</view>
							</block>
						</view>
					</view>
				</view>
			</view>
		</view>		
		<view class="order-number">	
			<view class="order-number-info">
				<view class="order-number-left">兑换编码</view>
				<view class="order-number-right">{{orde.OrderNumber}}</view>
			</view>
			<view class="order-number-info">
				<view class="order-number-left">创建时间{{nowTime}}</view>
				<view class="order-number-right">{{orde.AddTime}}</view>
			</view>
		</view>	
		<view class="order_img">			
			<view class="paizhao" @click="handlePaizhao">
				<view class="paizhao_num">+</view>
				<text>拍照上传</text>				
			</view>
			<view class="list_img">
				<view class="item" v-for="(url,index) in imgArray" :key='index'>
					<image :src="imgUrl + url" mode="aspectFill" @click="handleImg"></image>
					<view class="del" @click="handleDel(url)">x</view>
				</view>
			</view>
		</view>					
		<view class="lingqu-btn" @click="handleLingqu">
			<text :class="{dadan_btn:active}">确认打单</text>			
		</view>
		
		<!-- 分配骑手弹框 -->
		<!-- 弹框 -->
		<view class="background" v-if="isShow"></view>
		<view class="bag_img" v-if="isShow">
			<view class="bag_map">				
				<view class="itme">
					<text>选择骑手:</text>
					<view class="uni-size">
						<picker class="pickerOne" @change="handlePicker" :value="PickerIndex" :range-key="'F_RealName'" :range="PickerArray">
							{{PickerArray[PickerIndex].F_RealName}}
							 <!-- === underfined ? '请选择' : PickerArray[PickerIndex].F_FullName}} -->
						</picker>
						<view class="img">	
							<image src="../../static/xia.png" mode="aspectFill"></image>
						</view>							
					</view>
				</view>					
				<view class="bag_btn">					
					<view class="close" @click="handleStoreConfirm">确定分配</view>
					<view class="close" @click="handleClose">取消分配</view>
				</view>
			</view>
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
				isShow:false,
				PickerArray:[],
				PickerIndex:0,
				qishouId:'',// 骑手id
				imgArray:[],
				active:true,
				imgUrl:common.PicURL				
			}
		},	
		async onLoad(option) {
			_self = this;	
			const detail = await JSON.parse(decodeURIComponent(option.waitList))		
			if (detail.orde.LotteryType === "1") {
				detail.orde.icon = "https://fucai.yiruit.com/UpFiles/shouye/shuangseqiu.png";
				detail.orde.iconName = '双色球'	
			} else if (detail.orde.LotteryType === "2") {
				detail.orde.icon = "https://fucai.yiruit.com/UpFiles/shouye/fucai3d.png";
				detail.orde.iconName = '福彩3D'		
			} else if (detail.orde.LotteryType === "3") {
				detail.orde.icon = "https://fucai.yiruit.com/UpFiles/shouye/qilecai.png";
				detail.orde.iconName = '七乐彩'	
			}else if (detail.orde.LotteryType === "4") {
				detail.orde.icon = "https://fucai.yiruit.com/UpFiles/shouye/scraping.png";
				detail.orde.iconName = '刮刮乐'				
			}
			_self.orde = detail.orde;
			_self.listArray = detail.list		
			_self.PickerQuest()
		},
		methods: {
			handleQishou(){ // 分配骑手				 
				_self.isShow = true	
			},			
			PickerQuest(){  // 获取骑手		
				let { F_UserId } = uni.getStorageSync("riderinfo");  // 打单员 id
				common.request({
					path: 'UserOrder/getqishou',					
					data: F_UserId,
					success: function(result) {						
						result.data.unshift({F_RealName:'请选择骑手',F_UserId:''})
						_self.PickerArray = result.data;
						_self.qishouId = _self.PickerArray[0].F_UserId
					}					
				})
			},
			handleStoreConfirm(){  // 确定分配					
				if(_self.qishouId){					
					uni.showModal({
						title: '提示',
						content: '确定分配该订单给:' + _self.PickerArray[_self.PickerIndex].F_RealName,
						success: function(res) {
							if (res.confirm) {							
								uni.showToast({
									title: '分配成功',
									icon: 'none',
									duration: 1500,
									mask: true,
								})
								_self.isShow = false									
							}
						},
						fail() {
							_self.isShow = false;
							_self.PickerIndex = 0							
						}
					})
				}else{
					uni.showToast({
						title: '请选择骑手',
						icon: 'none',
						duration: 1500,
						mask: true,
					})	
				}			
			},
			handleClose(){  // 取消
				_self.isShow = false; 
				_self.PickerIndex = 0;
				_self.qishouId = ''
			},
			handlePicker(e){  // 选择骑手
				_self.PickerIndex = Number(e.target.value);  
				_self.qishouId = _self.PickerArray[_self.PickerIndex].F_UserId	  // 骑手id	
			},
			handlePaizhao(e){// 拍照					
				uni.showToast({
					title: '每次只能上传一张',
					icon: 'none',
					duration: 1500,
					mask: true,
				})
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
									let updataUrl = res.data;	
									uni.showToast({
										icon: 'none',
										title: '上传成功'
									});
									_self.active = false;
									_self.imgArray.push(updataUrl)	
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
			handleDel(_url){  //  删除图片						
				uni.showModal({
					title: '确定要删除该图片吗？',
					success(res) {
						if (res.confirm) {
							uni.showLoading({
								mask: true
							});
							common.request({
								path: 'annexes/delete',
								data: _url,
								success: function(result) {								
									if(result.code === 400 ){
										uni.showToast({
											title: '删除失败',
											icon: 'none',
											image: '',
											duration: 1500,
											mask: true,
										})
									}else{
										uni.showToast({
											icon: 'none',
											title: '删除成功'
										});										
										// 把页面上的图片也要删掉
										var nthimg = [];
										for (var i = 0; i < _self.imgArray.length; i++) {
											if (_self.imgArray[i] != _url) {
												nthimg.push(_self.imgArray[i]);
											}
										}
										_self.imgArray = nthimg
									}									
								}
							})
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
			handleLingqu() {  // 确认打单		
				let { F_UserId } = uni.getStorageSync("riderinfo");  // 打单员 id
				// 分配骑手		
				if(_self.orde.Self_Delivery === '2'){	// 外送要先选择骑手										
					if(_self.qishouId){
						_self.handleTijiao(_self.qishouId,F_UserId)			
					}else{
						uni.showToast({
							title: '请选择骑手',
							icon: 'none',
							image: '',
							duration: 1500,
							mask: true,
						})					
					}					
				}else{     // 自提					
					_self.handleTijiao(null,F_UserId)				
				}
			},
			handleTijiao(qishouId,dadanId){
				if(_self.imgArray.length){					
					uni.showModal({
						title: '提示',
						content: '确定提交',
						success: function(res) {
							if (res.confirm) {
								common.request({
									path: "UserOrder/uapdatepage",
									data: {					
										id : _self.orde.ID,
										orderstate : "3",  // 订单状态  全部0 / 待结算 1 / 待出票 2 / 待领取 3 / 已完成 4 / 关闭订单 5
										lssuetime : common.Time(),
										lotteryimage : _self.imgArray.join(','),	// 图片集
										qishouid: qishouId,  // 分配骑手的id
										dadanid:dadanId     // 打单员id
									},
									success: res => {
										if(Object.keys(res.data).length === 0 ){							
											uni.showToast({
												title: '打单成功',
												icon: 'none',
												image: '',
												duration: 1500,
												mask: true,
											});
											uni.navigateTo({
												url: "./intimidateList"											
											})	
										}						
									}
								})
							}
						},
						fail() {
							_self.isShow = false
						}
					})						
				}else{
					uni.showToast({
						title: '请上传图片',
						icon: 'none',
						image: '',
						duration: 1500,
						mask: true,
					});
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	.wait-lingqu {
		padding: 0 35rpx;
		.bag_img{
			position: absolute;
			left: 48%;
			top: 14%;
			background-color: #FFFFFF;
			width: 500rpx;
			height: auto;
			margin: 0 auto;
			margin-left: -250rpx;
			margin-top: 200rpx;
			border-radius: 10rpx;
			box-shadow: 0px 0px 4px #999;
			z-index: 100;
		}
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
					width: 150rpx;
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
		.order_img{	
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			background-color: #fff;	
			width: 100%;
			padding: 0 20rpx;
			margin-bottom: 120rpx;
			padding-top: 20rpx;
			.paizhao{
				width: 120rpx;
				height: 120rpx;	
				display: flex;
				flex-direction: column;
				align-items: center;
				margin-right: 20rpx;
				.paizhao_num{
					font-size: 28px;
					color: #999;				
				}
				text{
					font-size: 12px;
					color: #999;
				}
			}
			.list_img{
				flex: 1;
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				flex-wrap: wrap;				
				.item{
					width: 170rpx;
					height: 160rpx;
					margin-bottom: 20rpx;
					margin-right: 10rpx;
					position: relative;					
					image{
						display: block;
						width: 160rpx;
						height: 160rpx;
					}
					.del{
						width: 50rpx;
						height: 50rpx;
						border-radius: 50%;
						position: absolute;
						right: -12rpx;
						top: -22rpx;
						background: #666;
						color: #fff;
						display: flex;
						justify-content: center;
						align-items: center;	
											
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
			.dadan_btn{
				background-color: #fe8685;			
			}
		}
	}
	.background{
		width: 100vw;
		height: 100vh;
		background-color: rgba(0,0,0,0.5);
		position: fixed;
		left: 0;
		top: 0;
		z-index: 10;
	}
	.bag_img {	
		.bag_map{
			width: 100%;
			height: auto;	
			display: flex;
			flex-direction: column;
			align-items: center;
			overflow: hidden;		
			.itme {
				width: 80%;
				margin: 20rpx auto;
				padding: 30rpx 20rpx;
				display: flex;
				align-items: center;
				background-color: #fff;		
				border-bottom: 1px solid #ccc;
				>text {
					font-size: 30upx;
					float: left;
					width: 150upx;
					line-height: 54upx;
					color: #666;
				}		
				.uni-size {
					font-size: 32upx;
					border: 1px solid #ccc;
					padding: 4upx 20upx;
					border-radius: 10upx;
					height: 100%;
					display: inline-block;
					box-sizing: border-box;
					width: 75%;
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					.pickerOne{
						flex: 1;
						height: 100%;
						color: #999;
					}
					.img{
						width: 33rpx;
						height: 40rpx;
						image {
							height: 15rpx;
							margin-top: 17rpx;
							width: 28rpx;
						}
					}
				}		
			}
			.bag_btn{
				width: 100%;
				height: 100rpx;
				line-height: 100rpx;
				overflow: hidden;
				display: flex;
				flex-direction: row;
				justify-content: space-around;
				font-size: 18px;
				color: #333;
				.close{
					flex: 1;
					color: #666;
					font-size: 16px;
					text-align: center;
					&:first-child{
						color: #ff3c36;
					}
				}
			}
		}	
	}
</style>
