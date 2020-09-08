<template>
	<view class="lucky_wheel">
		<view class="lucky">
			<!-- 转盘标题开始 -->
			<!-- 顶部标题图片 ==================== -->
			<!-- <view class="lucky-title"><image src="../../static/lucky/title.png" mode="widthFix"></image></view> -->
			<view class="lucky-title">
				<image src="https://fucai.yiruit.com/UpFiles/static/ditu.png" mode="widthFix"></image>
			</view>
			<!-- 转盘标题结束 -->
			<view class="wheel-main">
				<!-- 点击开始抽奖 开始抽奖按钮=======================================-->
				<view class="wheel-pointer" @click="beginRotate()"></view>
				<!-- 转盘   旋转区域开始 ================================================ -->
				<view class="wheel-bg" :style="rotateStyle">
					<view class="defalut_bg">
						<image class="bg_zhuanpan" src="https://fucai.yiruit.com/UpFiles/static/zhuanpan.png" mode="widthFix"></image>
					</view>
					<view class="prize-list">
						<view class="prize-item" v-for="(item, index) in prizeList" :style="item.style" :key="index">
							<view class="prize-type">{{ item.Name }}</view>
							<view class="prize-type" v-if="item.Name!='谢谢参与'">{{ item.Prize }}</view>
							<view class="prize-pic">
								<image :src="item.Icon" />
							</view>
						</view>
					</view>
				</view>
				<!-- 转盘   旋转区域结束 ================================================ -->
			</view>
		</view>
		<view class="main">
			<view class="content">
				<view class="count">所剩余积分： {{ count }}</view>
			</view>
			<!-- 底部 活动规则 我的奖品 按钮==================================================== -->
			<!-- 活动和奖品按钮开始 -->
			<view class="wheel_rule">
				<view class="rule_btn" @click="handleRule">
					活动规则
				</view>
				<view class="rule_btn wheel_prize" @click="handlePrizeRuleFalse">
					<image src="../../static/lucky/prize.png"></image>
					我的奖品
				</view>
			</view>
			<!-- 活动和奖品按钮结束 -->
		</view>
		<!-- 旋转完毕后中奖提示的 弹窗 ======================================-->
		<!-- <view class="tost_wrap" v-if="prize">
			<view class="tost_item">
				<view class="tost_text">
					<view>
						<image :src="toastIcon" mode="widthFix"></image>
					</view>
					<view class="tost_text_title">{{toastTitle}}</view>
					<view class="tost_text_title">{{toastContent}}</view>
				</view>
				<view class="tost_btn_wrap">
					<view class="tost_btn" @click="handleSure">确认</view>
				</view>
			</view>
		</view> -->
		<!-- 以前的旧的提示框 -->
		<!-- <view class="toast" v-show="prize">
			<view class="toast-container">
				<image :src="s" class="toast-picture" />
				<view class="close" @click="closeToast()"></view>
				<view class="toast-title">{{ toastTitle }}</view>
				<view class="toast-btn">
					<view class="toast-cancel" @click="closeToast">关闭
					</view>
				</view>
			</view>
		</view> -->
		<!-- 旋转完毕后中奖提示的 遮罩 ===========================================-->
		<!-- <view class="toast-mask" v-show="prize || rotateMask" :class="{mask:rotateMask}"></view> -->
		<!-- 活动规则 提示框 开始 ================================================-->
		<view class="tip" v-if="isShow" @click="handleRuleFalse">
			<view class="top_wrap">
				<view class="tip-title">
					<image src="../../static/lucky/active.png"></image>
				</view>
				<view class="tip-content">
					<view>
						1.首次进入小程序可获得250积分，抽奖扣除200积分。
					</view>
					<view>
						2.一等奖一名，二等奖10名，三等奖20名，四等奖50名，安慰奖100名。
					</view>
					<view>
						3.兑换方式：<br/>积分在1个工作日内到账，其余奖品在指定地点自提
					</view>
				</view>
			</view>
		</view>
		<!-- 我的奖品 -->
		<view class="tip" v-if="isShowPrize" @click="handleRuleFalse">
			<view class="top_wrap">
				<view class="tip-content">
					<image src="../../static/lucky/me.png"></image>
					<scroll-view scroll-y class="tip_scroll_box" @scrolltolower='getNextPage'>
						<view class="tip-content-item" v-for="(item,index) in winPrizeList" :key="index">
							<view class="tip-content-img">
								<image :src="item.Icon" mode="widthFix"></image>
							</view>
							<view class="tip-content-text">{{item.LuckName}}</view>
							<view class="tip-content-text" v-if="item.Prize != '谢谢参与'">{{item.Prize}}</view>
						</view>
						<!-- 没有中奖纪录 以及 没有更多奖品 -->
						<view class="tip-content-item" v-if="nothing">
								<view class="nothing">{{nothingPrize}}</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>

		<!-- 活动提示框结束 -->
	</view>
</template>

<script>
	// 引入存放图片模块
	import common from '../../common/common';
	import {
		defaultList
	} from './config.js';
	// 旋转度数
	let CIRCLE_ANGLE = 360;
	let config = {
		// 总旋转时间
		duration: 4000,
		// 旋转圈数
		circle: 8,
		mode: 'ease-in-out'
	};
	export default {
		data() {
			return {
				nothing:false,//没有更多中奖纪录的标记
				nothingPrize:'',// 没有更多中奖纪录的提示语
				chaosList:[],// 奇数项 与 偶数项 集合的 混乱列表，只是渲染，与逻辑无关
				flagIndex:0,// 页面上的奖品的下标
				contrast:1,
				proList:[],	// 奖品几率数组
				rotateMask:false,// 旋转时的透明遮罩
				isShowPrize: false, //显示获奖品
				isShow: false, //显示规则框
				count: 0, // 剩余积分
				duration: 3000, // 转盘旋转时间
				prizeList: [], // 渲染到转盘的奖品列表
				rotateAngle: 0, // 旋转角度
				index: 0,
				prize: null,
				winPrize:{},
				winPrizeList: [] ,// 获得的奖品列表
				menberId:'',// 用户 ID
				page:1,// 获取中奖奖品列表的 页数
				totalPage:0,// 获取的中奖奖品列表的 总页数
			};
		},
		onLoad() {
			
			this.menberId = uni.getStorageSync('userinfo').ID||''
			this.initPrizeList();// 获取所有奖品列表
		},
		onHide() {
			this.page = 1;
			this.nothing = false;
			this.winPrizeList = [];
		},
		created() {
			let {
				Integral
			} = uni.getStorageSync('userinfo'); //	获取用户剩余 积分=================
			this.count = Integral;
			// 初始化一些值
			this.angleList = []; //	角度数组 =========================================
			// 是否正在旋转
			this.isRotating = true; // 是否正在旋转 ======================================
			// 基本配置
			this.config = config; // 基本配置 ===========================
			this.getWheel();		 // 获取已经获得的奖品列表
		},
		// watch:{
		// 	count(newVal){
		// 		this.count = newVal
		// 	}
		// },
		computed: {
			rotateStyle() {
				// 旋转的时间和旋转速度
				return `
        transition: transform ${this.config.duration}ms ${this.config.mode};
						transform: rotate(${this.rotateAngle}deg);`;
				// 旋转的角度
			},
			// toastTitle() {
			// 	return this.prize && this.prize.isPrize === 1 ? '获得:' + this.prize.Name : '';
			// },
			// toastIcon() {
			// 	return this.prize && this.prize.isPrize === 1 ? require('../../static/lucky/gongxi.png') : require(
			// 		'../../static/lucky/sorry.png');
			// }
			toastTitle() {
				// return this.winPrize.Name !== '谢谢参与' ? '获得:' + this.winPrize.Name : '';
				return this.winPrize.Name;
			},
			toastContent() {
				return this.winPrize.Name !== '谢谢参与' ? '获得:' + this.winPrize.Prize : '';
			},
			toastIcon() {
				return this.winPrize.Name !== '谢谢参与' ? require('../../static/lucky/gongxi.png') : require(
					'../../static/lucky/sorry.png');
			}
		},
		methods: {
			// 我的奖品 触底获取下一页数据
			getNextPage(){
				this.page++;
				if(this.page>this.totalPage){
					this.nothing = true;
					this.nothingPrize='已经没有更多中奖记录了'
					return false;
				}
				this.getNewPrize(this.menberId,this.page);
			},
			handleSure() {
				this.prize = null;
			},
			// 获取奖项数据
			getWheel() {},
			// 点击关闭规则框
			handleRuleFalse() {
				this.isShow = false;
				this.isShowPrize = false;
			},
			// 点击显示规则框
			handleRule() {
				this.isShow = true;
			},
			// 获取奖品列表 不用传参 ========================
			initPrizeList() {
				// 这里可以发起请求，从服务端获取奖品列表
				common.request({
					path: 'Order/getluckdraw',
					// method:'POST',
					success: res => {
						// res.data.rows.forEach((elem, index) => {
						// 	if (index == 0) {
						// 		elem.isPrize = 0;
						// 	} else {
						// 		elem.isPrize = 1;
						// 	}
						// });
						// 后台数据 正确的奖品列表排列顺序 
						this.prizeList = res.data;
						console.log('this.prizeList',this.prizeList.length)
						if(this.prizeList.length===0){
							uni.showModal({
								title:"温馨提示",
								content:"暂时不在活动期内",
								showCancel:false,
								success:(surebtn) => {
									if(surebtn.confirm){
										uni.switchTab({
											url:'../index/index'
										})
										return false;
									}
								}
							})
						}else{
							this.getNewPrize(this.menberId);
						}
						// 后台数据打乱之后的奖品列表排列顺序 开始
						let oddList = [];		// 奇数项奖品列表
						let evenList = [];	// 偶数项奖品列表
						this.prizeList.forEach((item,index)=>{
							if(index%2 == 1) oddList.push(item)
							if(index%2 == 0) evenList.push(item)
						})
						this.chaosList=[...oddList,...evenList]
						// 后台数据打乱之后的奖品列表排列顺序 结束
						// 初始化到页面
						this.formatPrizeList(this.chaosList);
						// this.formatPrizeList(this.prizeList);
						// 将所有奖品的几率放入一个数组，与随机数进行对比
						this.prizeList.forEach((item)=>{
							this.proList.push(parseFloat(item.Probability));
						});
					}
				});

				// 模拟数据
				// this.prizeList = this.formatPrizeList(defaultList);
			},
			// 格式化奖品列表，计算每个奖品的位置
			formatPrizeList(list) {
				// 记录每个奖的位置
				const angleList = [];
				//获取数组的长度
				const l = list.length;
				// 计算单个奖项所占的角度 360/长度 即：有几个奖品，将360° 分成几份
				// 	每一份就是单个奖品所占的角度。
				const average = CIRCLE_ANGLE / l;	// l 是 奖品的个数
				// 获取每个角度的平均值
				const half = average / 2;
				// 循环计算给每个奖项添加style属性
				list.forEach((item, i) => {
					// 每个奖项旋转的位置为 当前 i * 平均值 + 平均值 / 2
					const angle = -(i * average + half);
					// 增加 style
					item.style =
						`-webkit-transform:  rotate(${angle}deg) translateY(-50%);transform:  rotate(${angle}deg) translateY(-50%)`;
					// 记录每个奖项的角度范围
					angleList.push(i * average + half);
				});
				this.angleList = angleList;
				return list;
			},
			// 点击抽奖按钮事件开始 ==========================================
			beginRotate() {
				// 添加次数校验============================================================================
				if (this.count < 200) {
					wx.showToast({
						title: '您的积分不足',
						icon: 'none',
						image: '',
						duration: 1500,
						mask: true,
					});
					return;
				}

				let {
					ID
				} = wx.getStorageSync('userinfo'); // 取出 ID
				
				// 此接口作废，合并到提交奖品的接口
				// common.request({
				// 	// 向后台发送请求，扣除一次抽奖积分，不需要返回值。
				// 	path: 'Order/updateintegral',
				// 	// method:'POST',
				// 	data: {
				// 		MemberID: ID,
				// 		// number:200,==================================================
				// 		number: 0
				// 	},
				// 	success: res => {
				// 	}
				// });

				// 开始抽奖
				// 这里这里向服务端发起请求，得到要获得的奖
				// 可以返回下标，也可以返回奖品 id，通过查询 奖品列表，最终得到下标
				// 随机获取下标
				// this.index = this.random(this.prizeList.length - 1);
				
				// let proSum = 0;
				// this.proList.forEach(item=>{
				// 	proSum += parseInt(item);
				// })
				this.contrast = this.random(100);	// 获取对比值
				// 获取奖品下标
				this.index = this.proList.findIndex(item=>{	
					return item >= this.contrast;	// 奖品的几率大于这个随机数，就是获奖了
				})
				// 获取 渲染到页面的奖品 下标
				this.flagIndex =this.chaosList.findIndex(item=>{
					return this.prizeList[this.index].ID==item.ID
				})
				// 开始旋转
				this.rotating();
				// 将奖品放入列表准备渲染 改成从将奖品发送到后台后 从后台实时拉取 10条最新奖品数据
				this.winPrize = this.prizeList[this.index]; 
				// this.winPrizeList.push(this.winPrize);
				
				// 将获奖奖品发送到后台，再旋转完毕之后，再次拉取后台的获奖奖品
				// 添加中奖纪录到后台
					common.request({
						path:'Order/addluckdraw',
						data:{
							LuckID:this.winPrize.ID,
							MemberID:ID,
							LuckName:this.winPrize.Name,
							Prize:this.winPrize.Prize,
							LuckTime:this.winPrize.LuckTime,
						},
						success:(e)=>{
								this.count = e.data.Integral;
								this.getNewPrize(ID,1,true);
						} 
					})
			}, // 点击抽奖按钮事件结束=========================================
			// 实时更新 用户获得的奖品
			getNewPrize(ID, page=1,flag){
				common.request({
					path:'Order/getluck',
					data:{
						memberid:ID,
						page,
						rows:10,
					},
					success:(res)=>{
						this.totalPage = res.data.total;
						if(this.totalPage == 0){
							this.nothing = true;
							this.nothingPrize = '您暂时没有更多中奖记录'
							uni.showModal({
								title:'中奖信息',
								content:'您暂时没有更多中奖记录',
								showCancel:false,
								mark:true,
								success(e) {
									if(e.confirm) return false;
								}
							})
						}
						if(!!flag){
							this.winPrizeList=[...res.data.rows];
							return false;
						}
						this.winPrizeList=[...this.winPrizeList,...res.data.rows];
					}
				});
			},
			// 封装一个随机函数
			random(max, min = 0) {
				// return parseInt(Math.random() * (max - min + 1) + min);
				return parseFloat(Math.random() * (max - min) + min);	
			},
			rotating() {
				this.rotateMask = true;
				const {
					isRotating,
					angleList,
					config,
					rotateAngle,
					// index
					flagIndex
				} = this;
				if (!isRotating) return;
				// 点击时不可以再次点击
				this.isRotating = false;
				// 减少剩余抽奖次数 后台直接扣除，不需要前台处理，前台只需每次抽奖，发送奖品时的同时 获取 剩余积分
				// this.count-=200 ======================================================
				// 计算角度	先计算 随机一个角度，让后，让转盘旋转 这个度数，
				//   其实 奖品已经先出来了，是根据这个奖品在 奖品列表的 下标，才来计算这个 旋转角度的。
				// 	 而不是先旋转，再计算获得的是什么奖品。
				const angle =
					// 初始角度 0
					rotateAngle +
					// 多旋转的圈数  8 * 360
					config.circle * CIRCLE_ANGLE +
					// 奖项的角度
					// angleList[index] -
					angleList[flagIndex] -
					(rotateAngle % CIRCLE_ANGLE);

				this.rotateAngle = angle;
				// 旋转结束后，允许再次触发
				setTimeout(() => {
					this.rotateMask = false;
					this.rotateOver();
				}, config.duration + 1000);
			},
			rotateOver() {
				// 当旋转结束后可以再次点击转盘
				this.isRotating = true;
				// 把得到的奖项放入到data中进行数据渲染到页面弹窗
				this.prize = this.prizeList[this.index];
				uni.showModal({
					title:this.toastTitle,
					content:this.toastContent,
					showCancel:false,
					success:(e)=>{
						if(e.confirm){
							this.prize = null;
						}
					}
				})
				
			},
			//关闭弹窗
			closeToast() {
				this.prize = null;
			},
			handlePrizeRuleFalse() {
				this.isShowPrize = true;
			},
		}
	};
</script>

<style lang="scss" scoped>
	.lucky {
		width: 100%;
		padding-top: 20px;
	}

	.lucky_wheel {
		width: 100%;
		height: 100vh;
		position: relative;
		background-color: #fb471e;
	}

	.tip {
		position: absolute;
		top: 0;
		background-color: rgba(11, 11, 11, 0);
		height: 100vh;
		width: 100vw;
		z-index: 1000;
		display: flex;
		justify-content: center;
		align-items: center;

		.top_wrap {
			width: 90%;
			background-color: #ffe1cd;
			letter-spacing: 4rpx;
			padding: 15rpx;
			border-radius: 15rpx;

			.tip-title {
				margin-left:50%;
				transform: translateX(-50%);
				margin-top: -45rpx;
				width: 450rpx;
				height: 66rpx;
				image {
					
					width: 450rpx;
					height: 66rpx;
					
				}
			}

			.tip-content {
				line-height: 40rpx;
				image {
					margin-left:50%;
					transform: translateX(-50%);
					margin-top:-45rpx;
					width: 450rpx;
					height: 66rpx;
				}
				.tip_scroll_box {
					width: 100%;
					height:250rpx;

					.tip-content-item {
						display: flex;
						justify-content: flex-start;
						align-items: center;
						padding:20rpx;	
						border-bottom: 2rpx solid #CCCCCC;
						.tip-content-img {
							width:100rpx;
							height:60rpx;
							image {
								width:100rpx;
								height:60rpx;
							}
						}

						.tip-content-text {
							padding-left:40rpx;
							text-align: center;
							line-height: 60rpx;
						}
						.nothing{
							flex:1;
							text-align: center;
						}
					}
				}

			}

		}
	}



	.toast-cancel {
		width: 130rpx;
		height: 40rpx;
		background-color: $color;
		color: #fff;
		border-radius: 10rpx;
		text-align: center;
	}

	.lucky-title {
		width: 100%;
		height: 230rpx;
		position: relative;

		image {
			position: absolute;
			top: -360rpx;
			left: 0;
			width: 750rpx;
			transform: scaleY(0.9);
		}
	}

	.wheel-main {
		margin: 0 auto;
		position: relative;
		// width: 295px;
		// height: 295px;
		width: 600rpx;
		height: 600rpx;
	}

	.wheel-bg {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
		width: 100%;
		height: 100%;
		color: #fff;

		.defalut_bg {
			width: 100%;
			height: 100%;
			transform: rotate(10deg);
			position: absolute;
			top: 0;
			left: 0;

			.bg_zhuanpan {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%) rotate(35deg);
				width: 100%;
			}
		}

		.prize-list {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;

			.prize-item {
				display: flex;
				justify-content: center;
				flex-direction: column;
				align-items: center;
				position: absolute;
				// width: 95px;
				// height: 150px;
				width: 190rpx;
				height: 300rpx;
				top: 50%;
				left: 50%;
				// margin-top: -75px;
				// margin-left: -47px;
				margin-top: -150rpx;
				margin-left: -94rpx;
				color: black;

				.prize-type {
					font-size: 0.75rem;
					text-align: center;
					margin-top: 10rpx;
				}

				.prize-pic {
					width: 100rpx;
					height: 60rpx;

					image {
						// width: 4.0625rem;
						// height: 2.5rem;
						// margin-top: 1.5625rem;
						width: 100rpx;
						height: 60rpx;
					}
				}
			}
		}
	}

	.wheel-pointer {
		position: absolute;
		top: 50%;
		left: 50%;
		z-index: 2;
		width: 170rpx;
		height: 234rpx;
		background: url('https://fucai.yiruit.com/UpFiles/tupian/zhizhen.png') no-repeat center top;
		background-size: 170rpx 234rpx;
		transform: translate3d(-50%, -65%, 0);
	}

	.wheel-bg view {
		text-align: center;
	}

	.prize-count {
		font-size: 0.875rem;
	}

	.main {
		// position: relative;
		width: 100%;
		// min-height: 14.25rem;
		// background: rgb(243, 109, 86);
		// padding-bottom: 1.6875rem;
		// .main-bg {
		// 	width: 100%;
		// 	height: 6.5625rem;
		// 	position: absolute;
		// 	top: -3.4375rem;
		// 	left: 0;
		// 	/* background: url("../../static/lucky/color_pillar.png") no-repeat center top; */
		// 	/* background-size: 100%; */
		// }
		// .bg-p {
		// 	width: 100%;
		// 	height: 2.95rem;
		// 	// background: rgb(252, 207, 133);
		// }
		.content {
			// position: absolute;
			// top: 0;
			// left: 0;
			// background: rgb(243, 109, 86);
			width: 100%;
			// height: 5.1875rem;
			margin-top: 20rpx;
			font-size: 0.8rem;
			color: #FFFFFF;
			padding: 0;
			// padding-left: 6.75rem;


			.count {
				text-align: center;
				margin-left: 50%;
				transform: translateX(-50%);
			}
		}

		.wheel_rule {
			display: flex;
			justify-content: center;
			margin-top: 100rpx;
			// margin-top:45%;

			.rule_btn {
				// width: 220rpx;
				// height: 70rpx;
				width: 250rpx;
				height: 60rpx;
				border-radius: 30rpx;
				text-align: center;
				line-height: 60rpx;
				background-color: #FFFFFF;
				border-radius: 30rpx;
				font-size: 30rpx;
				color: #f06664;
				font-weight: bolder;

				
			}

			.wheel_prize {
				margin-left: 40rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				image {
					width: 40rpx;
					height:40rpx;
					margin-right:6rpx;
				}
			}
		}
	}

	.toast-mask {
		position: fixed;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.6);
		z-index: 10000;
		width: 100%;
		height: 100%;
	}
	.mask {
		background: rgba(0, 0, 0, 0);
	}

	.toast {
		position: fixed;
		top: 50%;
		left: 50%;
		z-index: 20000;
		transform: translate(-50%, -50%);
		width: 15.4375rem;
		background: #fff;
		border-radius: 0.3125rem;
		padding: 0.3125rem;
		background-color: rgb(252, 244, 224);
	}

	.toast-container {
		position: relative;
		width: 100%;
		height: 100%;
		border: 1px dotted #fccc6e;
	}

	.toast-picture {
		position: absolute;
		top: -6.5rem;
		left: -1.5rem;
		width: 18.75rem;
		height: 8.5625rem;
	}

	.toast-pictrue-change {
		position: absolute;
		top: -1.5rem;
		left: -1.375rem;
		width: 17.5rem;
		height: 3.125rem;
	}

	.toast-title {
		padding: 2.8125rem 0;
		font-size: 18px;
		color: #fc7939;
		text-align: center;
	}

	.toast-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 0.9375rem;
	}

	.toast-btn div {
		background-image: -moz-linear-gradient(-18deg, rgb(242, 148, 85) 0%, rgb(252, 124, 88) 51%, rgb(252, 124, 88) 99%);
		background-image: -ms-linear-gradient(-18deg, rgb(242, 148, 85) 0%, rgb(252, 124, 88) 51%, rgb(252, 124, 88) 99%);
		background-image: -webkit-linear-gradient(-18deg, rgb(242, 148, 85) 0%, rgb(252, 124, 88) 51%, rgb(252, 124, 88) 99%);
		box-shadow: 0px 4px 0px 0px rgba(174, 34, 5, 0.7);
		width: 4.6875rem;
		height: 1.875rem;
		border-radius: 1.875rem;
		text-align: center;
		line-height: 1.875rem;
		color: #fff;
	}

	.close {
		position: absolute;
		top: -0.9375rem;
		right: -0.9375rem;
		width: 2rem;
		height: 2rem;
		background-color: red;
		// background: url('../../static/lucky/bean5.png') no-repeat center top;=========================
		background-size: 100%;
	}

	/*弹出框提示 */
	.tost_wrap {
		background-color: rgba(22, 33, 55, .4);
		position: fixed;
		width: 100vw;
		height: 100vh;
		z-index: 20000;
		top: 0;

		.tost_item {
			border-radius: 20rpx;
			width: 60%;
			margin: 40vh auto;
			background-color: #fff;
			transform: translateY(-50%);
			padding: 0 20rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.tost_text {
				letter-spacing: 4rpx;
				font-size: 34rpx;
				color: #666;
				padding: 40rpx 40rpx 0;

				.tost_text_title {
					text-align: center;
					margin-bottom: 10rpx;
				}

				.tost_text_input {
					margin-top: 20rpx;
					text-align: center;
				}
			}

			.tost_btn_wrap {
				margin-top: 30rpx;
				border-top: 1px solid #CDC5BF;
				display: flex;
				justify-content: space-between;
				font-size: 30rpx;
				color: #8F8F8F;

				.tost_btn {
					padding: 30rpx 0;
					flex: 1;
					text-align: center;
				}

				.tost_line {
					flex-shrink: 0;
					width: 2rpx;
					background-color: #d6d6d6;
				}
			}
		}
	}
</style>
