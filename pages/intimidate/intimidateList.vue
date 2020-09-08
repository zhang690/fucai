<template>
	<view class="rider-list">
		<view class="tabs">
			<segmented :tabs="tabs" @handleParent="handleChild"></segmented>
		</view>	
		<view class="itme">
			<text>选择网点:</text>
			<view class="uni-size">
				<picker class="pickerOne" @change="handlePicker" :value="PickerIndex" :range-key="'F_FullName'" :range="PickerArray">
					{{PickerArray[PickerIndex].F_FullName === underfined ? '请选择' : PickerArray[PickerIndex].F_FullName}}
				</picker>
				<view class="img">	
					<image src="../../static/xia.png" mode="aspectFill"></image>
				</view>			
			</view>
		</view>	
		<view class="content" v-if="current === 1">	
			<view class="list-wrap" v-for="(item,indexA) in waitList" :key="indexA" @click="handleDetail(indexA)">
				<view class="item-left">{{item.orde.OrderNumber}} </view>
				<view class="item-right">
					<view class="right_title">{{item.orde.AddTime ? item.orde.AddTime.substring(0,11) : ' '}}</view>
					<image src="../../static/shang.png" mode="widthFix"></image>					
				</view>
			</view>
		</view>
		<view class="content" v-if="current === 2">		
			<view class="list-wrap" v-for="(item,indexB) in waitList" :key="indexB" @click="handlLook(indexB)">
				<view class="item-left">{{item.orde.OrderNumber}}</view>
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
	import segmented from "@/components/tabs/segmented.vue";
	import common from '../../common/common'
	var _self;
	export default {
		components: {
			segmented
		},
		data() {
			return {
				tabs: [{
						id: 0,
						name: "待打单",
						isActive: true
					},
					{
						id: 1,
						name: "已完成",
						isActive: false
					}
				],
				current: 1,
				waitList: [],
				page:1,
				total:0,
				Merchants:false,
				PickerArray:[],
				PickerIndex:0,
				outletsid:''  // 网点id
			};
		},
		onLoad() {
			_self = this;
			// 页面进来就是跳转到待打单
			_self.getRuderlist(1,1,null);  //初始话是显示全部
			_self.PickerQuery()   // 获取网点  
		},
		onReachBottom(){      // 页面触底事件
			_self.page += 1;   // 当前页数
			if(_self.page > _self.total){				
				_self.Merchants = true;				
				return
			}				
			_self.getRuderlist(_self.current,_self.page,_self.outletsid);
		},
		methods: {
			handleChild(e) { // 切换/获取到下标  
				_self.tabs.forEach(element => {
					element.id === e ? (element.isActive = true) : (element.isActive = false);
				});
				_self.current = e + 1;					
				_self.waitList = [];	
				_self.page = 1;
				_self.Merchants = false
				//初始化 全部数据						
				_self.PickerIndex = 0;	// 修改成请选择
				_self.getRuderlist(_self.current,_self.page,null) 
			},
			PickerQuery(){  // 获取网点
				let { F_UserId } = uni.getStorageSync("riderinfo");
				common.request({
					path: "UserOrder/companyUser",
					data:  F_UserId,  //  类型id	
					success: res => {
						res.data.rows.unshift({F_FullName:'请选择'})
						_self.PickerArray = res.data.rows					
					}
				})
			},
			getRuderlist(i,page,outletsid) {	// 获取一些订单		
				let { F_UserId } = uni.getStorageSync("riderinfo"); 
				   common.request({
				    path: "UserOrder/getpage",
				    data: {
				    userid:F_UserId,
						outletsid: outletsid,
						orderstate: i === 1 ? '2' : '4',   // 订单状态  全部0 / 待结算 1 / 待出票 2 / 待领取 3 / 已完成 4 / 关闭订单 5
						rows: 10,
						page: page,
						sidx: "AddTime",
						sord: "desc",						
						// distributionstate: i   // 配送状态
					},
					success: res => {
						_self.waitList = [..._self.waitList,...res.data.rows];	
						_self.total = res.data.total
					}
				})
			},
			handlePicker(e){  // 根据网点获取订单
				_self.PickerIndex = Number(e.target.value);  // 网点的value	
				_self.outletsid = _self.PickerArray[_self.PickerIndex].F_CompanyId;
				_self.page = 1;
				_self.waitList = [];
				_self.Merchants = false;				
				_self.getRuderlist(_self.current,_self.page,_self.outletsid) 				
			},			
			// 点击跳转订单详情页
			handleDetail(i) {	
				// if(_self.waitList[i].list.length == 0){
				// }else{
					uni.navigateTo({
						url: './intimidateDetail?waitList=' + encodeURIComponent(JSON.stringify(_self.waitList[i]))
					})	
				// }
			},
			// 点击查看已完成订单
			handlLook(i) {						
				uni.navigateTo({
					url: './intimidateFinish?waitList=' + encodeURIComponent(JSON.stringify(_self.waitList[i]))
				});
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
	.itme {
		width: 90%;
		margin: 20rpx auto;
		padding: 30rpx 20rpx;
		display: flex;
		align-items: center;
		background-color: #fff;		
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
				color: #666;
			}
			.img{
				width: 33rpx;
				height: 40rpx;
				image {
					height: 22rpx;
					margin-top: 10rpx;
				}
			}
		}		
	}	
	.rider-list {
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
</style>
