<template>
	<view class="my_jifen">
		<view class="mounthAll">
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
					</view>
				</view>				
			</view>	
			<view class="uni-All">
				<view class="num">收入:{{income.toFixed(2)}}</view>
				<view class="num">支出:{{expenditure.toFixed(2)}}</view>
			</view>
		</view>
		
		<view class="myjifen_list">
			<view class="myjifen_item" v-for="(item,index) in jifenList" :key="index">
				<view class="myjifen_item_icon">						
					 <image v-if="item.PlusReduce === '1'" src="https://fucai.yiruit.com/UpFiles/tupian/shop.png" mode="aspectFit"></image>
					 <image v-else src="https://fucai.yiruit.com/UpFiles/tupian/order.png" mode="aspectFit"></image>
				</view>
				<view class="myjifen_item_info">
					<view class="info_text">{{item.Remarks === '' ? '系统充值' : item.Remarks}}</view>
					<view class="info_time">{{item.RechargeTime}}</view>
				</view>
				<view class="myjifen_item_num">{{item.PlusReduce === '1' ? '+' : '-'}}{{item.Price}}</view>
			</view>
		</view>
		<view class="title" v-if="Merchants">没有更多啦!!!...</view>
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
				jifenList:[],
				page:1,
				total:0,
				Merchants:false,
				startTime: common.Time().substring(0,10) + ' 00:00:01',
				endTime: common.Time().substring(0,10) + ' 23:59:59',	
				date: common.Time().substring(0,10),
				activeQuest: true,// 初次进来 不用筛选
				income:0,    // 收入
				expenditure:0   // 支出
			}
		},
		onLoad() {
			_self = this;	
			_self.jifenList = []		
			_self.getRuderlist(1);
		},
		onReachBottom(){      // 页面触底事件
			_self.page += 1;   // 当前页数
			if(_self.page > _self.total){				
				_self.Merchants = true;				
				return
			}
			if(_self.activeQuest){ // 初次进来 true 不用筛选	
				_self.getRuderlist(_self.page);
			}else{   // 筛选后 下拉 数据
				_self.handleChaxun(_self.page)
			}
		},
		methods: {
			queryVal(result){  // 收入 支出 的方法
				var jiaVal = 0;
				var jianVal = 0;
				for(var i = 0;i < result.length;i++){							
					if(result[i].PlusReduce === '1'){ //  收入
						jiaVal = Number(result[i].Price)
						_self.income += jiaVal;
					}else{			// 支出				
						jianVal =  Number(result[i].Price)	
						_self.expenditure += jianVal							
					}							
				}	
			},
			getRuderlist(page) {	// 会员 /商家 充值历史记录
				let { F_CompanyId } = uni.getStorageSync("riderinfo");					
				common.request({
					path: "UserOrder/getchongzhi",      
					data: {							
						companyid:F_CompanyId,
						rows: 10,
						page: page,
						sidx: "RechargeTime",
						sord: "desc",
					},
					success: res => {							
						_self.queryVal(res.data.rows);						
						_self.jifenList = [..._self.jifenList,...res.data.rows];
						_self.total = res.data.total
					}
				})
			},			
			handleChaxun(page){
				if(_self.startTime < _self.endTime){
					common.request({
						path: "UserOrder/Getchongzhi",      
						data: {		
							starttime:_self.startTime,
							endtime: _self.endTime,						
							rows: 10,
							page: page,
							sidx: "RechargeTime",
							sord: "desc",
						},
						success: res => {								
							_self.queryVal(res.data.rows);	
							_self.jifenList = [..._self.jifenList,...res.data.rows];	
							_self.total = res.data.total						
						}
					})
				}else{
					uni.showToast({
						icon:'none',
						title: '结束时间要大于开始时间哦~',
					})
				}	
					
			},			
			// 开始时间
			bindChange(e){	
				_self.startTime = e + ' 00:00:01'
				_self.jifenList = [];
				_self.activeQuest = false;   // 下拉刷新的一个标识	
				_self.page = 1;
				_self.Merchants = false;		
				_self.income = 0;    // 收入
				_self.expenditure = 0;   // 支出
				_self.handleChaxun(_self.page)
				
			}, 
			bindChangeMsg(e){
				_self.endTime = e + ' 23:59:59' 
				_self.jifenList = [];
				_self.activeQuest = false;   // 下拉刷新的一个标识	
				_self.page = 1;				
				_self.Merchants = false;
				_self.income = 0;    // 收入
				_self.expenditure = 0;   // 支出
				_self.handleChaxun(_self.page)			
			},
			// 结束
			bindCancel(e){
				console.log(e) 
			},
			bindCancelMsg(e){
				console.log(e) 
			},
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
		.mounthAll{
			width: 88%;
			position: fixed;
		    left: 7px;
		    top: 36px;
			background-color: #fff;
			padding: 30rpx;
			margin:0 auto;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: center;	
			z-index: 2;
			.uni-time{
				display: flex;
				flex-direction: row;			
				justify-content: space-between;
				width: 100%;
				.uin-info{
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: flex-start;
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
						width: 120px;						
					}				
				}
			}	
			.uni-All {
				width: 100%;
				padding: 20upx 0;
				margin-top: 10px;
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				align-items: center;
				.num{
					font-size: 14px;
					color: #333;
					&:first-child{
						margin-right: 20px;
					}
				}			
			}
	
		}
		.myjifen_list {
			margin-top: 113px;
			padding: 0 15rpx;					
			.myjifen_item {
				border-bottom: 2rpx solid #eee;
				padding: 20rpx;
				display: flex;		
				background-color: #fff;
				.myjifen_item_icon {
					flex: 1;
					width: 50rpx;
					margin-right: 10rpx;
					image{
						width: 70rpx;
						height: 70rpx;
					}
				}		
				.myjifen_item_info {
					flex: 3;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
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
</style>
