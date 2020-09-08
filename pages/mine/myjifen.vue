<template>
	<view class="my_jifen">
		<!-- 头部开始 -->
		<view class="header">
			<view class="header_bg">
				<image src="https://fucai.yiruit.com/UpFiles/static/jifen.png" mode="widthFix"></image>
			</view>
			<view class="header_content">
				<block v-if="flag == 1">
					<view class="header_title">积分</view>
					<view class="header_num">{{getUserObjJifen}}</view>
				</block>
				<block v-else>
					<view class="header_title">福豆</view>
					<view class="header_num">{{getUserObjFudou}}</view>
				</block>
			</view>
		</view>
		<!-- 头部结束 -->
		<!-- 内容开始 -->
		<view class="myjifen_container" v-if="flag == 1">		
			<view class="myjifen_btn_wrap">
				<view class="btn_item" @click="handleJifenOne">积分商城</view>
				<view class="btn_item btn_bg">积分规则</view>
			</view>
			<!-- 积分 -->
			<view class="myjifen_list">
				<view class="myjifen_item" v-for="item in jifenList" :key="item.ID">
					<view class="myjifen_item_icon">						
						 <image v-if="item.types == '1'" src="https://fucai.yiruit.com/UpFiles/tupian/shop.png" mode="widthFix"></image>
						 <image v-else src="https://fucai.yiruit.com/UpFiles/tupian/order.png" mode="widthFix"></image>
					</view>
					<view class="myjifen_item_info">
						<view class="info_text">{{item.Remarks}}</view>
						<view class="info_time">{{item.ProduceTime}}</view>
					</view>
					<view class="myjifen_item_num">{{item.types == '1' ? '+' : '-'}}{{item.Number}}</view>
				</view>
			</view>
		</view>
		<!-- 余额 -->
		<view class="myjifen_container" v-else>			
			<!-- <view class="myjifen_btn_wrap">
				<view @click="handleJifenTwo" class="btn_item">积分商城</view>
				<view class="btn_item btn_bg">积分规则</view>
			</view> -->
			<view class="myjifen_list">
				<view class="myjifen_item" v-for="item in jifenList" :key="item.ID">
					<view class="myjifen_item_icon">					
						 <image v-if="item.types == '1'" src="https://fucai.yiruit.com/UpFiles/tupian/shop.png" mode="widthFix"></image>
						 <image v-else src="https://fucai.yiruit.com/UpFiles/tupian/order.png" mode="widthFix"></image>
					</view>
					<view class="myjifen_item_info">
						<view class="info_text">{{item.Remarks}}</view>
						<view class="info_time">{{item.ProduceTime}}</view>
					</view>
					<view class="myjifen_item_num" v-if="flag == 1">
						{{item.types == '1' ? '+' : '-'}}{{item.Number}}
					</view>
					<view class="myjifen_item_num" v-else>
						{{item.types == '1' ? '+' : '-'}}{{item.Price}}
					</view>
				</view>
			</view>
		</view>
		<!-- 内容结束 -->
		<view class="title" v-if="Merchants">没有更多啦!!!...</view>
	</view>
</template>
<script>
	import common from '../../common/common';
	var _self;
	export default {
		data() {
			return {
				num: 5,
				jifenList: [],
				Integral: '',
				state: {},
				flag:1,
				page:1,
				total:0,
				Merchants:false,
				userinfo:'',  //个人本地信息
				getUserObjJifen:'',  // 请求到的积分信息
				getUserObjFudou:''
			}
		},		
		onLoad(options) {					
			_self = this;			
			_self.flag = options.id;	
			if(_self.flag === '1'){
				uni.setNavigationBarTitle ({
					title:'我的积分',		
				}) 
			}else{				
				uni.setNavigationBarTitle ({
					title:'我的福豆',		
				})
			}	
			_self.state = common.getstate();	
			_self.getJifen(_self.page,_self.flag)
		},
		onShow(){
			_self.userinfo = common.getstate();		
			_self.getUserList()
		},
		onReachBottom(){      // 页面触底事件	
			_self.page += 1;   // 当前页数
			if(_self.page > _self.total){				
				_self.Merchants = true;				
				return
			}	
			_self.getJifen(_self.page,_self.flag)
		},
		methods: {
			getJifen(page,couptype) {	
				common.request({
					path: "Development/getintegral",
					data: {
						memberid:_self.state.ID,  //用户id
						couptype: couptype === '1' ? 2 : 3,    //明细类型（1信用/2积分/3支付(余额)）					
						rows:10,    //当前页码
						page:page,     //页数					
						sidx:'ProduceTime',    //排序					
						sord:'desc'// asc   desc 升序/降序
					},				
					success: res => {	
						_self.jifenList =[..._self.jifenList,...res.data.rows]; 			
						_self.total = res.data.total
					}
				})
			},
			handleJifenOne(){
				uni.navigateTo({					
					url : "./jifen?content=" + _self.content			
				})
			},			
			getUserList(){// 获取个人信息和积分余额
				common.request({
					path: "Development/getmember",
					data: _self.userinfo.ID,
					success: res => {
						_self.getUserObjJifen = res.data.member.Integral;		 // 获取积分		
						_self.getUserObjFudou = res.data.member.Balance          // 获取余额
					}
				})
			},
			handleJifenTwo(){  // 显示的余额  点击积分商城 带过去的是积分 所有要再次获取到积分 			  
				uni.navigateTo({					
					url : "./jifen?content=" + _self.getUserObjJifen			
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
	.my_jifen {
		height: 100vh;
		background-color: #f5f3f4;

		.header {
			position: relative;

			.header_bg {
				width: 80%;
				margin: 0 auto;
			}

			.header_content {
				position: absolute;
				top: 50%;
				left: 15%;
				transform: translateY(-50%);
				color: #fff;

				.header_title {}

				.header_num {
					font-size: 40rpx;
					font-weight: 700;
				}
			}
		}

		.myjifen_container {
			background-color: #fff;
			margin-top: 20rpx;
			padding: 20rpx;

			.myjifen_btn_wrap {
				display: flex;
				justify-content: center;

				.btn_item {
					width: 200rpx;
					height: 60rpx;
					border-radius: 30rpx;
					background-color: $color;
					color: #fff;
					text-align: center;
					line-height: 60rpx;
				}

				.btn_bg {
					background-color: #ffb403;
					margin-left: 50rpx;
				}
			}

			.myjifen_list {
				margin-top: 20rpx;
				padding: 0 15rpx;

				.myjifen_item {
					border-bottom: 2rpx solid #eee;
					padding: 20rpx 0;
					display: flex;

					.myjifen_item_icon {
						// flex: 1;
						width: 50rpx;
						margin-right: 20rpx;
					}

					.myjifen_item_info {
						flex: 3;

						.info_text {}

						.info_time {
							font-size: 24rpx;
							color: #999;
						}
					}

					.myjifen_item_num {
						flex: 1;
						text-align: right;
						line-height: 60rpx;
						font-weight: 700;
					}
				}
			}
		}
	}
</style>
