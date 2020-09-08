<template>
	<view class="my-caiquan">
		<view class="caiquan-wrap" v-if = 'caiquanList.length !==0 ' >
			<view class="caiquan-item" v-for="item in caiquanList" :key="item.ID">
				<image src="https://fucai.yiruit.com/UpFiles/shouye/caiquan.png" class="caiquan-icon"></image>
				<view class="caiquan-content"  @click="selectquan(item)">
					<view class="caiquan-money">
						{{item.FaceValue}} 
						<!-- <view class="money-num">福豆</view> -->
					</view>
					<view class="caiquan-info">
						<view class="caiquan-youhui">体验券</view>
						<!-- <view class="caiquan-man">满20元可使用(不含配送费)</view> -->
						<view class="caiquan-time">有效期至{{item.OverdueTime}}</view>
					</view>
					<view class="caiquan-btn">
						<text>{{item.state == '1'?'已过期':'立即使用'}}</text>
						<view class="iconfont icon-xiajiantou"></view>
					</view>
				</view>
			</view>		
		</view>
		<view v-else class="img">
			<image src="https://fucai.yiruit.com/UpFiles/tupian/line.png" mode="widthFix"></image>		
			<view class="img_btn">
				<view class="img_text">您暂未拥有体验券</view>
				<view class="btn" @click="handleHuoqu">获取体验券</view>
				
			</view>
		</view>	
		<view class="isHide" v-if="isHide">加载中</view>
		<view class="title" v-if="Merchants">没有更多啦!!!...</view>
	</view>
</template>
<script>
	import common from '../../common/common';
	var _self;
	export default {
		data() {
			return {
				caiquanList: [],
				par: [],
				type: '',
				isHide:true,   // 为了去掉初始化时 不让背景图加载出来
				page:1,
				total:0,
				Merchants:false
			}
		},
		onLoad(e) {
			_self = this;
			_self.par = e.par;
			_self.type = e.type;
			_self.getCaiquan(1);
		},
	
		onReachBottom(){      // 页面触底事件
			_self.page += 1;   // 当前页数
			if(_self.page > _self.total){				
				_self.Merchants = true;				
				return
			}	
			_self.getCaiquan(_self.page)
		},
		methods: {
			selectquan(_item) {
				if (!!_self.par) {
					uni.navigateTo({
						url: '../selectOrder/selectOrder?totalnum=' + _self.par + '&yhq=' + JSON.stringify(_item) + '&type=' + _self.type
					});
				} else {
					uni.switchTab({
						url: '../getHome/getHome'
					});
				}
			},
			getCaiquan(page) {
				common.request({
					path: 'Development/getcoupon',
					data: {
						state: 'dsy',
						memberid: common.getstate().ID,
						page: page,
						rows: 10,
						sidx:'OverdueTime',    //排序
						sord:'desc'// asc   desc 升序/降序						
					},
					success: res => {
						_self.caiquanList = res.data.rows;
						_self.isHide = false;
						_self.total = res.data.total
					}
				})
			},
			handleHuoqu(){
				uni.showModal({
					title:'友情提示',
					content:'请前往福彩到家线下门店了解详细活动',
					confirmText:'前往网点',
					success:(res)=>{
						if(res.confirm){
							uni.navigateTo({
								url: '../giveSelect/giveSelect?current=0&from=buy'
							})
						}else if(res.cancel){
							return;
						}
					}
				})
				// uni.navigateTo({
				// 	url:'../mine/tuijian'				
				// })
			}
		},
	}
</script>
<style lang="scss" scoped>
	.title{
		width: 100%;
		text-align: center;
		padding: 40rpx 0;
		color: #ccc;
	}
	.isHide{
		height: 100vh;
		width: 100%;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 100;
		background: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 16px;
		color: #999;
	}
	.img{
		height: 100vh;
		width: 100vw;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: -140rpx;
		image{
			width: 40%;
		}
		.img_btn{
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			.img_text{
				font-size: 32rpx;
				color: #666;
			}
			.btn{
				margin-top: 60rpx;
				padding: 10rpx 40rpx;
				background-color: #999;
				border-radius: 50rpx;
				text-align: center;
				color: #fff;
			}
		}
	}
	.my-caiquan {
		height: 100vh;
		background-color: #f7f5f6;
		padding: 30rpx;

		.caiquan-wrap {
			.caiquan-item {
				position: relative;

				.caiquan-icon {
					height: 160rpx;
				}
				.caiquan-content {
					position: absolute;
					top: 0;
					width: 100%;
					display: flex;
					.caiquan-money {
						flex: 1;
						color: $color;
						font-size: 50px;
						padding-left: 20rpx;	
						text-align: center;
						// .money-num {
						// 	display: inline-block;
						// 	font-size: 10px;
						// 	color: $color;
						// }
					}

					.caiquan-info {
						flex: 3;
						border-left: 1rpx dotted $color;
						height: 140rpx;
						padding-top: 20rpx;
						color: $color;
						padding-left: 20rpx;
						display: flex;
						flex-direction: column;
						justify-content: space-around;
						
						.caiquan-man {
							width: 80%;
							border-top: 1rpx solid $color;
							border-bottom: 1rpx solid $color;
							padding: 5rpx 0;
							font-size: 24rpx;
						}

						.caiquan-time {
							margin-top: -52rpx;
							color: #999;
							font-size: 20rpx;
						}
					}

					.caiquan-btn {
						flex: 1;
						text {
							display: block;
							color: $color;
							font-size: 35rpx;
							letter-spacing: 4rpx;
							width: 100rpx;
							margin: 30rpx auto 0;
							text-align: center;
						}
						.iconfont {
							text-align: center;
							color: $color;
						}
					}
				}
			}
		}
	}
</style>
