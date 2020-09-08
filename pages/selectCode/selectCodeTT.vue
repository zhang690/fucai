<template>
	<view class="content">
		<view class="content_title">
			<view class="content_title_item" :class="item.active?'content_title_item_active':''" v-for="(item,index) in titles"
			 @tap="chooseColor(index)">{{item.title}}</view>
		</view>
		<view class="content_warp">
			<scroll-view scroll-y scroll-x class="scroll">
				<!-- 标题 -->
				<view class="fixed_item">
					<view class="fixed_item_name">期数</view>
					<view class="fixed_item_red" v-if="flag == 0">
						<view class="fixed_item_red_ball" v-for="(item,index) in formatRedList" :key="index">{{item.num}}</view>
					</view>
					<view class="fixed_item_blue" v-else>
						<view class="fixed_item_blue_ball" v-for="(item,index) in formatBlueList" :key="index">{{item.num}}</view>
					</view>
				</view>
				<!-- 历史记录 -->
				<view class="scroll_item" v-for="(item,index) in historyList" :key="index">

					<view class="scroll_item_qishu">
						<view>{{item.PeriodsNumber}}期</view>
					</view>

					<view class="scroll_item_red" :class="index%2 == 1?'scroll_item_interleave':''" v-if="flag == 0">
						<view v-for="(reditem,redindex) in goodRedList[index]" class="scroll_item_reditem" :class="reditem.isActive?'scroll_item_reditem_red':''"
						 :key="redindex">
							{{reditem.num}}
						</view>
					</view>

					<view class="scroll_item_blue" :class="index%2 == 1?'scroll_item_interleave':''" v-else>
						<view v-for="(blueitem,blueindex) in goodBlueList[index]" class="scroll_item_blueitem" :class="blueitem.isActive?'scroll_item_blueitem_blue':''" :key="blueindex">
							{{blueitem.num}}
						</view>
					</view>

				</view>
				<!-- 出现次数 -->
				<view class="fixed_item flex_item_bg">
					<view class="fixed_item_name fixed_item_times">出现次数</view>
					<view class="fixed_item_red flex_item_bg" v-if="flag == 0">
						<view class="fixed_item_red_ball" v-for="(item,index) in formatRedList" :key="index">{{item.times}}</view>
					</view>
					<view class="fixed_item_blue flex_item_bg" v-else>
						<view class="fixed_item_blue_ball" v-for="(item,index) in formatBlueList" :key="index">{{item.times}}</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import common from '../../common/common.js'
	import {
		forNum
	} from '../../utils/ballNum';
	export default {
		data() {
			return {
				formatRedList: [],	// 初始化红球数组
				formatBlueList: [],	
				goodRedList: [],		// 处理了历史记录的红球数组
				goodBlueList: [],
				historyList: [],		// 历史记录
				titles: [{					
						id: 0,
						active: true,
						title: '红球走势'
					},
					{
						id: 1,
						active: false,
						title: '蓝球走势'
					}
				],
				flag: 0,				// 初始显示标记
			}
		}, // data 结束
		onLoad() {
			forNum(this.formatRedList,34)
			forNum(this.formatBlueList,17)
			this.getKaijiang()

		}, // onLoad 结束
		onShow() {

		}, // onShow 结束
		methods: {
			// 标题点击事件
			chooseColor(index) {
				this.flag = index;
				this.titles.forEach(item => {
					item.active = item.id == index ? true : false;
				})
			},
			// 获取双色球开奖历史
			getKaijiang() {
				// return new Promise((resolve, reject) => {
				common.request({
					path: "Development/getpage",
					// method:'POST',
					data: {
						rows: 20,
						page: 1,
						sidx: "PrizeTime",
						sord: "desc",
						caizhongid: "1"
					},
					success: result => {
						// 将历史记录红球字符串 转换成 数组
						result.data.rows.forEach(elem => {
							if (elem.RedBall) {
								elem.RedBall = elem.RedBall.split(",")
							}
						});
						// 赋值
						this.historyList = result.data.rows;
						let timesRed = [];
						let timesBlue = [];
						this.historyList.forEach(item => {
							// 截取期数后三位数
							item.PeriodsNumber = item.PeriodsNumber.substring(item.PeriodsNumber,item.PeriodsNumber.length-3);
							// 处理红球历史变色
							let arr = [];
							arr = forNum(arr, 34);
							item.RedBall.forEach(val => {
								val = parseInt(val) - 1; // 球数从 1 开始的，所以当作索引需要 -1
								arr[val].isActive = true;
							})
							this.goodRedList.push(arr);
							// 处理蓝球历史变色
							let arrBlue = [];
							arrBlue = forNum(arrBlue, 17);
							let blueNum = parseInt(item.BlueBall)-1
							arrBlue[blueNum].isActive = true;
							this.goodBlueList.push(arrBlue);
							// 计算红球出现次数
							timesRed.push(item.RedBall);
							timesBlue.push(item.BlueBall)
						})
						var arr2 = timesRed.reduce(function (a, b) { return a.concat(b)} );
						this.appearTimes(arr2,this.formatRedList)
						// 计算蓝球出现次数
						this.appearTimes(timesBlue,this.formatBlueList)
					}
				})
				// })
			},
			appearTimes(numberList,ballList){
				for(let i = 0;i<numberList.length;i++){
					let v = numberList[i];
					let ind = ballList.findIndex(item=>{
						return v == item.num;
					})
					if(ind!=-1){
						if(ballList[ind].times){
							ballList[ind].times++
						}else{
							ballList[ind].times = 1;
						}
					}
				}
				ballList.forEach(item=>{
					if(!item.times) item.times = 0;
				})
			},
		}, // methods 结束
	}
</script>

<style lang="scss" scoped>
	.content {
		padding:0;
		.content_title {
			display: flex;
			height: 60rpx;
			justify-content: center;

			.content_title_item {
				height: 100%;
				width: 300rpx;
				line-height: 60rpx;
				text-align: center;
				font-size: 30rpx;
				color: #999999;
			}

			.content_title_item_active {
				font-size: 34rpx;
				color: #333333;
			}
		}

		.content_warp {
			font-size: 34rpx;
			
			.fixed_item {
				display: flex;
				flex-wrap: nowrap;
				height: 80rpx;
				align-items: center;
				.fixed_item_name {
					box-sizing: border-box;
					-webkit-box-sizing: border-box;
					padding-left:25rpx;
					flex-shrink: 0;
					width:130rpx;
					color:#999999;
					background-color: #F6F6F6;
				}
				.fixed_item_times {
					padding-left:10rpx;
					margin-right:12rpx;
					font-size:30rpx;
					background-color: #FEE6E5;
				}
				.fixed_item_red {
					display: flex;
					align-items: center;
					.fixed_item_red_ball{
						color:#999999;
						width: 60rpx;
						height: 60rpx;
						text-align: center;
						line-height: 60rpx;
						border-radius: 50%;
						margin-right: 40rpx;
					}
				}
				.fixed_item_blue {
					display: flex;
					.fixed_item_blue_ball{
						color:#999999;
						width: 60rpx;
						height: 60rpx;
						text-align: center;
						line-height: 60rpx;
						border-radius: 50%;
						margin-right: 40rpx;
					}
				}
			}
			.flex_item_bg {
				height:80rpx;
				background-color: #FEE6E5;
			}
			.scroll {
				height: 100vh;

				.scroll_item {
					height: 80rpx;
					display: flex;
					align-items: center;
					flex-wrap: nowrap;

					.scroll_item_qishu {
						view{
							flex-shrink:0;
							margin-right: 40rpx;
							color:#999999;
							white-space: nowrap;
							padding-left:10rpx;
						}
					}

					.scroll_item_red {
						display: flex;
						.scroll_item_reditem {
							color:#999999;
							width: 60rpx;
							height: 60rpx;
							text-align: center;
							line-height: 60rpx;
							border-radius: 50%;
							margin-right: 40rpx;
						}

						.scroll_item_reditem_red {
							background-color: #FF0000;
							color: #FFFFFF;
						}
					}

					.scroll_item_blue {
						display: flex;
						.scroll_item_blueitem {
							color:#999999;
							width: 60rpx;
							height: 60rpx;
							text-align: center;
							line-height: 60rpx;
							border-radius: 50%;
							margin-right: 40rpx;
						}
						.scroll_item_blueitem_blue {
							background-color: blue;
							color: #FFFFFF;
						}
					}

					.scroll_item_interleave {
						background-color: #F6F6F6;
					}
				}
			}
		}
	}
</style>
