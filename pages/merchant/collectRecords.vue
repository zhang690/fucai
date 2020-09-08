<template>
	<view class="rider-list">	
		<view class="all_item" @click="handleActive">
			<view class="text" >
				筛选<image class="xuanzhuan" src="../../static/shang.png" mode="widthFix"></image>
			</view>
		</view>		
		<view class="mounthAll" v-if="active">
			<view class="bg"></view>			
			<view class='bg_msg'>			
				<view class="uni-time">
					<view class="uin-info">
						<text class="uin-title">开始 :</text>
						<view class="inputTime">
							<ruiDatePicker
								fields="day"
								start="2010-00-00"
								end="2030-12-30"
								:value="date"
								@change="bindChange"
								@cancel="bindCancel"
							></ruiDatePicker>
							<view class="iconfont icon-xiangxia"></view>
						</view>					
					</view>
					
					<view class="uin-info">
						<text class="uin-title">结束 :</text>
						<view class="inputTime">
							<ruiDatePicker
							    fields="day"
							    start="2010-00-00"
							    end="2030-12-30"
							    :value="date"
							    @change="bindChangeMsg"
							    @cancel="bindCancelMsg"
							></ruiDatePicker>
							<view class="iconfont icon-xiangxia"></view>
						</view>
					</view>				
				</view>						
				<view class="itme">
					<text>订单号：</text>
					<view class="uni-size">
						<input type="text" placeholder="请输入您要查询的订单号"  v-model="bianhao">
					</view>
				</view>
				<view class="time" @click="queryTime">确认</view>
			</view>
		</view>
		
		<view class="content">	
			<view class="list-wrap" v-for="(item,indexA) in waitList" :key="indexA" @click="handleDetail(indexA)">
				<view class="item-left">{{item.orde.OrderNumber}} </view>
				<view class="item-right">
					<view class="right_title">{{item.orde.LssueTime ? item.orde.LssueTime.substring(0,11) : ' '}}</view>
					<image src="../../static/shang.png" mode="widthFix"></image>					
				</view>
			</view>
		</view>		
		<view class="title" v-if="Merchants">没有更多订单啦!!!...</view>
	</view>
</template>
<script>
	import common from '../../common/common'
	import ruiDatePicker from '@/components/rattenking-dtpicker/rattenking-dtpicker.vue';
	var _self;
	export default {	
		components: {ruiDatePicker},
		data() {
			return {
				waitList: [],
				page:1,
				total:0,
				Merchants:false,			
				outletsid:'',  // 网点id
				active:false,
				startTime: common.Time().substring(0,10) + ' 00:00:01',
				endTime: common.Time().substring(0,10) + ' 23:59:59',
				bianhao:'',
				date:common.Time().substring(0,10),
				activeQuest: true  // 初次进来 不用筛选
			};
		},
		onLoad() {
			_self = this;
			_self.waitList = [];
			let { F_CompanyId } = uni.getStorageSync("riderinfo")
			_self.outletsid = F_CompanyId
			// 页面进来就是跳转到待打单
			_self.getRuderlist(1,_self.outletsid);  //初始话网点下的全部数据
		},
		onReachBottom(){      // 页面触底事件
			_self.page += 1;   // 当前页数
			if(_self.page > _self.total){				
				_self.Merchants = true;				
				return
			}	
			
			if(_self.activeQuest){ // 初次进来 true 不用筛选		
				_self.getRuderlist(_self.page,_self.outletsid);
			}else{  // 筛选后 下拉 数据 请求
				_self.queryQuest(_self.page)			
			}			
		},
		methods: {
			getRuderlist(page,outletsid) {	// 获取一些订单		
				common.request({
					path: "UserOrder/getpage",
					data: {
						outletsid: outletsid,   // 网点id
						orderstate: '4',   // 订单状态  全部0 / 待结算 1 / 待出票 2 / 待领取 3 / 已完成 4 / 关闭订单 5
						rows: 10,
						page: page,
						sidx: "LssueTime",
						sord: "desc",					
					},
					success: res => {
						_self.waitList = [..._self.waitList,...res.data.rows];	
						_self.total = res.data.total
					}
				})
			},
			// 点击查看已完成订单
			handleDetail(i) {						
				uni.navigateTo({
					url: './merchantHistoryDetails?waitList=' + encodeURIComponent(JSON.stringify(_self.waitList[i]))
				});
			},
			// 开始
			bindChange(e){
				_self.startTime = e + ' 00:00:01'
			}, 
			bindChangeMsg(e){
				_self.endTime = e + ' 23:59:59' 
			},
			// 结束
			bindCancel(e){
				console.log(e) 
			},
			bindCancelMsg(e){
				console.log(e) 
			},
			handleActive(){
				_self.active = !_self.active				
			},
			queryTime(){   // 确定查询
				if(_self.startTime < _self.endTime){					
					_self.waitList = [];
					_self.activeQuest = false; // 改变下拉加载数据的接口调用					
					_self.Merchants = false;
					_self.queryQuest(1)
				}else{
					uni.showToast({
						icon:'none',
						title: '结束时间要大于开始时间哦~',
					})
				}				
			},
			queryQuest(page){
				common.request({
					path: 'UserOrder/getpage',					
					data: {						
						ordernumber: _self.bianhao, // 订单编号
						rows: 10,
						page: page,						
						starttime:_self.startTime,
						endtime: _self.endTime,
						outletsid: _self.outletsid,
						orderstate: '4',
						// amoutype: 1,
						sidx: "LssueTime",
						sord: "desc",		
					},
					success: function(result) {
						if(result.data.rows.length > 0){							 
							_self.waitList = [..._self.waitList,...result.data.rows];
						}else{
							uni.showToast({
								icon:'none',
								title: '没有订单哦!!!',
								duration: 3000,
								mask: true,
							})
						}
						_self.total = result.data.total;
						_self.active = false						
					}					
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.all_item{
		position: fixed;
		width: 100%;
		top: 43px;
		left: 0;
		z-index: 10;
		height: 40px;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		background-color: #fff;
		border-bottom: 1px solid #ccc;
		.text{
			font-size: 16px;
			color: #999;
			height: 30px;
			line-height: 30px;
			text-align: center;					
			.xuanzhuan{
				display: inline-block;
				width: 18px;
				height: 14px;
				margin-left: 10px;
				transform: rotate(180deg); 
			}
		}
	}	
	.title{
		width: 100%;
		text-align: center;
		padding: 40rpx 0;
		color: #ccc;
	}	
	.rider-list {
		.content{
			margin-top: 50px;
		}
		.nav {
			height: 13vh;
			display: flex;
			flex-direction: row;
			align-items: center;
			border-bottom: 1px solid #eee;
			background-color: #FFFFFF;
		}
		.tabs {
			width: 80vw;
			margin: 20rpx auto 0;
		}
		.list-wrap {	
			margin-top: 15rpx;
			display: flex;
			background-color: #fff;
			justify-content: space-between;
			align-items: center;
			padding: 30rpx;
			height: 70rpx;
			border-radius: 8rpx;
			.item-left {
				font-size: 16px;
				color: #666;
			}
			.item-right {
				display: flex;
				align-items: center;				
				color: $color;
				.right_title{
					font-size: 14px;
					color: #666;
					margin-right: 10rpx;
					width: 173px;
					height: 100%;
					overflow: hidden;
					text-align: right;
				}
				image{
					width: 20rpx;
					height: 20rpx;
					transform: rotate(90deg); 
				}
			}						
		}
	}
	.item-left {
		display: flex;
		flex-direction: column;
		justify-content: space-between;	
		.item-adress {
			text {
				font-size: 32rpx;
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
		
	.mounthAll{	
		background-color: #fff;
		padding: 30rpx;
		margin:0 auto;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		.bg{
			width: 100vw;
			height: 100vh;
			background-color: rgba(0,0,0,0.5);
			position: fixed;
			left: 0;
			top: 0;
			z-index: 2;			
		}
		.bg_msg{
			position: fixed;
			left: 0;
			top: 84px;
			width: 100%;
			z-index: 10;
			background-color: #fff;
			padding: 30rpx;
			height: 150px;
		}
		.uni-time{
			display: flex;
			flex-direction: row;			
			justify-content: space-between;
			width: 100%;
			.uin-info{
				display: flex;
				flex-direction: row;
				margin-bottom: 30rpx;
				align-items: center;
				flex: 1;
				.uin-title{
					margin-right: 10rpx;
					font-size: 14px;
					color: #333;
				}
				.inputTime{
					display: flex;
					flex-direction: row;
					border: 1px solid #aaa;
					border-radius: 3px;
				}				
			}
		}	
		.itme {
			width: 100%;
			padding: 20upx 0;
			display: flex;
			align-items: center;
			margin-bottom: 30upx;
			text{
				font-size: 14px;
				color: #333;
			}
			.uni-size {
				font-size: 32upx;
				border: 1px solid #ccc;
				padding: 4upx 20upx;
				border-radius: 10upx;
				height: 100%;
				display: inline-block;
				box-sizing: border-box;
				width: 76%;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				
				.pickerOne {			
					color: #666;
					width: 88%;
				}
				.iconfont{
					margin-top: 10rpx;
					color: #666;
				}
			}
		}
		.time{
			font-size: 16px;
			height: 60rpx;
			line-height: 90rpx;
			width: 30%;
			border-radius: 15rpx;
			border: 1px solid #999;			
			color: #999;
			display: flex;
			align-items: center;
			justify-content: center;
			margin: 0 auto;
		}
	}	
</style>
