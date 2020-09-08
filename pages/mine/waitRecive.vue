<template>
	<view class="waitRecive">
		<!-- 头部地址开始 -->
		<!-- <view class="header_adress">
      <view class="adress_left">
        <view class="left_title">{{detail.OutletsName}}</view>
        <view class="left_text">{{detail.Address}}</view>
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
							<view class="qiu_text">
								<!-- #ifdef MP-WEIXIN -->
								<text v-for="red in item.RedBall" :key="red">{{red}}{{detail.LotteryType==4?' * '+(item.Price/red)+'福豆':''}}</text>
								<!-- #endif -->
								<!-- #ifdef H5 -->
								<text v-for="(red,i) in item.RedBall" :key="i">{{red}}{{detail.LotteryType==4?' * '+(item.Price/red)+'福豆':''}}</text>
								<!-- #endif -->
								<text class="blue" v-for="blue in item.BlueBall" :key="blue">{{blue}}</text>
							</view>
							<view class="wait_item_qishu" v-if="detail.LotteryType<4">
								<view class="qishu_text">
									<text>期数*{{item.Num}}</text>
									<text>倍数*{{item.Multiple}}</text>
								</view>
								<view class="qishu_info">第{{item.Fixed}}期</view>
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
					<view class="total_delete" v-if="!isDelete" @tap="deleteOrder">申请取消</view>
					<view class="total_item">
						<view v-if="detail.OrderState != 1">合计：{{detail.SinglePrice}} 福豆</view>
						<view v-else>合计：{{detail.Price}} 福豆</view>
						<view class="total_item_text" v-if="detail.DeductionAmount>0">(体验券:-{{detail.DeductionAmount}})</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 待出票结束 -->
		<!-- 出票时间开始 -->
		<view class="chupiao_container" v-if="!isDelete">
			<view class="chupiao_time">
				兑换编码：{{detail.OrderNumber}}
				<text class="chupiao_time_copy" v-if="_self.detail.name == '待领取'" @tap="copy">复制</text>
			</view>
			<view class="chupiao_time">兑换体验时间：{{detail.AddTime}}</view>
			<view class="chupiao_time">出票时间：{{detail.LssueTime}}</view>
			<view class="chupiao_time">自提站点名称：{{detail.OutletsName}}</view>
			<view class="chupiao_time shop_address" @tap="goNavigation">
				<view class="shop_address_title">自提站点地址：</view>
				<view class="shop_address_detail">{{detail.F_Address}}</view>
				<view class="shop_address_icon iconfont icon-dizhi"></view>
			</view>
			<view class="chupiao_time chupiao_phone">
				<view>站点联系方式：{{detail.F_OuterPhone}}</view>
				<view class="chupiao_phone_img" @tap='handleTanke(detail.F_OuterPhone)'>
					<image src="../../static/mine/telephone.png" mode="widthFix"></image>
				</view>
			</view>
			<!-- <view class="recive_time">领取时间：请在{{detail.ReceiveTime}}前领取</view> -->
		</view>
		<!-- 出票时间结束 -->
		<!-- 出票凭证开始 -->
		<view class="chupiao" v-if="!isDelete">
			<view class="chupiao_title">兑票凭证</view>
			<!-- 彩票二维码，携带 彩票 ID  -->
			<view class="chupiao_title_qrcode">
				<tkiQrcode :val='val' :loadMake='loadMake' @result="resultFn"></tkiQrcode>
			</view>
			<view class="laod_chupiao">等待兑票...</view>
			<view class="chupiao_title_photo">
				<view v-for="(v,i) in imgUrl" :key='i' class="chupiao_title_photo_warp" @tap="previewImage(i)">
					<image :src='v' mode="widthFix"></image>
				</view>
			</view>

		</view>
		<!-- 出票凭证结束 -->
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
		
  </view>
</template>
<script>
var _self;
	// #ifdef H5
		import wxSdk from '../../common/wx-sdk.js'
		const jweixin = require('jweixin-module');
	// #endif
import common from '../../common/common'
import tkiQrcode from '@/components/tki-qrcode/tki-qrcode.vue'
export default {
  data() {
    return {
			loadMake:true,
			val:'',
			canDelete:true,
			reason:'',
			isDelete:false,
      num:7,
      detail: {},
      list: [],
      item: {},
			qrUrl:'',
			imgUrl:[],
			imgBaseUrl:''
    }
  },
	components: {
	    tkiQrcode
	},
	
  onLoad(e){
    _self = this;
    _self.item = JSON.parse(decodeURIComponent(e.item));
		console.log('_self.items',_self.item)
    _self.detail = _self.item.orde;
    _self.list = _self.item.list;
		_self.val = _self.detail.OrderNumber;
		if(_self.detail.name != '待领取') {
			this.canDelete = false;
		}
		if(_self.detail.LotteryImage){
			_self.imgUrl = _self.detail.LotteryImage.split(',');
			_self.imgUrl = _self.imgUrl.map(item=>{
					return common.PicURL + item;
			})
		}
  },
	
	onHide() {
		this.canDelete = true;
	},
	onBackPress() {
		if(_self.isDelete) _self.isDelete = false;
	},
	methods:{
		// 点击导航图标，导航到网点
		goNavigation(){
			let addressData = {
				latitude: parseFloat(_self.detail.F_latitude),
				longitude: parseFloat(_self.detail.F_longitude),
				name:  _self.detail.OutletsName,
				address:  _self.detail.F_Address,
			}
			// #ifdef H5
				common.request({
					path: 'login/getcode',
					method: 'GET',
					data: encodeURIComponent(location.href.split('#')[0]),
					success(res3) {
						let signPackage = res3.data;
						wxSdk.initJssdk(signPackage);	// 初始化 wx-sdk的config配置
						wxSdk.openlocation(addressData)// 调用 wx-sdk
					}
				})
			// #endif
			// #ifdef MP-WEIXIN
					uni.openLocation({
						latitude: addressData.latitude,
						longitude: addressData.longitude,
						name: addressData.name,
						address: addressData.address,
						success() {},
						fail(err) {
							// console.log(err);
						}
					})
			// #endif
		},
		// 复制订单编号
		copy(){
			uni.setClipboardData({
				data:_self.detail.OrderNumber,
				success:()=>{
					uni.showToast({
						title:'订单复制成功',
						mask:true,
						duration:1500,
					})
				}
			})
		},
		// 拨打电话
		handleTanke(phoneNum) { 
			uni.makePhoneCall({
				phoneNumber: phoneNum
			})
		},
		// 按下取消订单按钮之前判断 是否为
		beforeDelete(){
			if(_self.detail.name != '兑票中' || _self.detail.name != '待领取'){
				uni.showModal({
					content:'您的订单不能取消',
					showCancel:false
				})
			}
		},
		resultFn(e){
		},
		// 预览图片
		previewImage(i){
			uni.previewImage({
				current:i,
				urls:_self.imgUrl,
				loop:true
			})
			
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
	},
}
</script>
<style lang="scss" scoped>
  .waitRecive{
    background-color: #f7f5f6;

    .header_adress{
      display: flex;
      justify-content: space-between;
      padding: 20rpx 40rpx;
      align-items: center;
      background-color: #fff;
      .adress_left{
        .left_title{
          font-size: 30rpx;
          font-weight: 600;
        }
        .left_text{
          color: #666;
          margin-top: 10rpx;
        }
      }
      .adress_right{
        font-size: 24rpx;
        .right_distance{
          color: #666;
        }
        .right_go{
          color: $color;
          margin-top: 10rpx;
        }
      }
    }
    .wait_container{
      background-color: #fff;
      margin-top: 15rpx;
      .wait_title{
        display: flex;
        justify-content: space-between;
        padding: 20rpx;
        border-bottom: 1rpx solid #eee;
        .wait_title_left{
          display: flex;
          font-weight: 600;
          align-items: center;
          text{
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
        .wait_title_right{
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
      		.total_item_text {
      			font-size: 24rpx;
      			color: #999999;
      		}
      	}
      }
    }
    .chupiao_container{
      margin-top: 20rpx;
      background-color: #fff;
      color: #999;
      .chupiao_time{
        padding: 20rpx;
        border-bottom: 1rpx solid #eee;
				.chupiao_time_copy {
					margin-left:30rpx;
					color:#DD524D;
				}
				
      }
			.chupiao_phone {
				display:flex;
				align-items: center;
				.chupiao_phone_img{
					margin-left:40rpx;
					width:30rpx;
					height:30rpx;
					image{
						width:30rpx;
						height:30rpx;
					}
				}
			}
			.shop_address {
				display:flex;
				align-items: center;
				.shop_address_title{
					flex:4;
				}
				.shop_address_detail {
					flex:9;
				}
				.shop_address_icon {
					flex:1;
				}
			}
      .recive_time{
        padding: 20rpx;
      }
    }
    .chupiao{
      margin-top: 15rpx;
      background-color: #fff;
      font-weight: 600;
      .chupiao_title{
        border: 1rpx solid #eee;
        padding: 20rpx 30rpx;
      }
			.chupiao_title_qrcode {
				width:200rpx;
				height:200rpx;
				margin:40rpx auto;
			}
      .laod_chupiao{
        text-align: center;
        padding: 40rpx 0;
        color: #999;
      }
			.chupiao_title_photo {
				width:100%;
				display: flex;
				flex-wrap: wrap;
				box-sizing: border-box;
				padding-bottom: 22rpx;
				-webkit-box-sizing: border-box;
				.chupiao_title_photo_warp {
					margin-left:22rpx;
					margin-top:22rpx;
					width:220rpx;
					height:220rpx;
					image{
						width:220rpx;
						height:220rpx !important;
					}
				}
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
