<template>
	<view class="Exchange">	
		<view class="ExchangeAll" v-if="waitList.length !== 0">
			<view class="list-wrap" v-for="(item,index) in waitList" :key="index" @click="handlSongda(item)">
				<view class="item-left" v-for="(list,ind) in item.list" :key='ind'>					
					<view class="info-icon">
						<image :src="item.orde.icon"></image>
					</view>	 					
					<view class="content-info">
						<view class="info-name">
							<text>{{item.orde.iconName}}</text>----
							<text>第{{item.orde.Fixed}}期</text>				
						</view>				
						<view class="info-num">							
							<text class="red">{{list.RedBall | isRedBall}}</text>
							<text class="blue">{{list.BlueBall  | isRedBall}}</text>
						</view>					
					</view>					
					<view class="item-right">
						<view class="zhuangtai">{{item.orde.AmouType === '1' ? '待兑奖': item.orde.AmouType === '2' ? '已兑奖' : '已取票' }}</view>			
						<image src="../../static/shang.png" mode="widthFix"></image>
					</view>
				</view>
			</view>
		</view>
		<view v-else class="img">
			<image src="https://fucai.yiruit.com/UpFiles/tupian/line.png" mode="widthFix"></image>		
			<view class="img_btn">
				<view class="img_text">您暂未拥有中奖信息</view>
			</view>
		</view>	
		<view class="title" v-if="Merchants">没有更多中奖啦!!!...</view>
	</view>
</template>

<script>
	import common from '../../common/common';
	var _self;
	export default {		
		data() {
			return {
				userinfo:'',
				waitList:[],
				page:1,
				total:0,
				Merchants:false
			}
		},
		onLoad(){
			_self = this;
			_self.userinfo = common.getstate()			
			_self.prizeQuest(1)
		},
		onReachBottom(){      // 页面触底事件
			_self.page += 1;   // 当前页数
			if(_self.page > _self.total){				
				_self.Merchants = true;				
				return
			}	
			_self.prizeQuest(_self.page);
		},
		methods: {						
			prizeQuest(page){
				common.request({
					path: "Order/getpage",
					data: {
						amoutype:'1',
						memerid: _self.userinfo.ID,
						rows: 10,
						page: page,
						sidx: "LssueTime",
						sord: "desc"						
					},
					success: res => {
						for(let i = 0;i < res.data.rows.length; i++){
							if (res.data.rows[i].orde.LotteryType === "1") {
								res.data.rows[i].orde.icon = "https://fucai.yiruit.com/UpFiles/shouye/shuangseqiu.png";
								res.data.rows[i].orde.iconName = '双色球'	
							} else if (res.data.rows[i].orde.LotteryType === "2") {
								res.data.rows[i].orde.icon = "https://fucai.yiruit.com/UpFiles/shouye/fucai3d.png";
								res.data.rows[i].orde.iconName = '福彩3D'		
							} else if (res.data.rows[i].orde.LotteryType === "3") {
								res.data.rows[i].orde.icon = "https://fucai.yiruit.com/UpFiles/shouye/qilecai.png";
								res.data.rows[i].orde.iconName = '七乐彩'	
							}else if (res.data.rows[i].orde.LotteryType === "4") {
								res.data.rows[i].orde.icon = "https://fucai.yiruit.com/UpFiles/shouye/scraping.png";
								res.data.rows[i].orde.iconName = '刮刮乐'				
							}
						}					
						_self.waitList = [..._self.waitList,...res.data.rows];						
						_self.total = res.data.total
					}
				})
			},
			handlSongda(item){	
				uni.navigateTo({
					url: './prizeFinish?waitList=' + encodeURIComponent(JSON.stringify(item))
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
	.Exchange{
		width: 94%;
		margin: 0 auto;
		.list-wrap {
			margin-top: 30rpx;
			display: flex;
			background-color: #fff;
			justify-content: space-between;
			align-items: center;
			overflow: hidden;
			height: auto;
			padding: 0 30rpx;
			border-radius: 8rpx;
			.item-left {
				width: 100%;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				padding: 20rpx 0rpx;
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
				.content-info {
					flex: 1;
					display: flex;
					flex-direction: column;
					.info-name{
						display: flex;
						flex-direction: row;
						margin: 20rpx 0;
						text{
							color: #666;
							&:last-child{
								margin-left: 10rpx;
							}
						}
					}								
					.info-num {
						flex: 1;							
						.red{						
							color: red;	
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
				.item-right {
					display: flex;
					align-items: center;				
					color: $color;
					.right_title{
						font-size: 14px;
						color: #666;
						margin-right: 10rpx;
						width: 430rpx;
						height: 100%;
						overflow: hidden;
						text-align: right;
					}
					.zhuangtai{
						margin-right: 10rpx;
					}
					image{
						width: 20rpx;
						height: 20rpx;
						transform: rotate(90deg); 
					}
				}						
			}
		}
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
				width: 200rpx;
				height: 80rpx;
				line-height: 80rpx;
				background-color: #999;
				border-radius: 50rpx;
				text-align: center;
				color: #fff;
			}
		}
	}
</style>
