<template>
	<view class="selectCodeqicai">
		<!-- 选号方式开始 -->
		<view class="manner">
			<view class="manner_choose" @tap="chooseManner">
				<text>{{defaultName}}</text>
				<view class="manner_choose_arrow" :class="{'up_arrow':!arrow}">
					<image src="https://fucai.yiruit.com/UpFiles/tupian/arrow.png"></image>
				</view>
			</view>
			<view class="manner_wrap" :class="[arrow?'':'manner_wrap_height']">
				<view class="manner_wrap_box">
					<view class="manner_wrap_common" v-for="(item,index) in manner" :key="item.id" :class="[mannerId == item.id?'activeClass':'']"
					 @tap="getManner(item)">{{item.name}}
					</view>
				</view>
			</view>
		</view>
		<!-- 选号方式结束 -->



		<view class="kaijiang_time">第{{qishu}}期 {{riqi}}截至投注&nbsp; 21:15开奖</view>
		<!-- 下拉双色球开始 -->
		<view class="xiala_wrap" :class="{Height: jiantou}">
			<view class="xiala_item" v-for="(item,index) in historyNum" :key="item.ID">
				<text class="xiala_title">第{{item.PeriodsNumber}}期</text>
				<view class="xiala_item_content">
					<text v-for="(n,i) in item.RedBall" :key="i">{{n}}</text>
					<text class="xiala_item_content_blue">{{item.BlueBall}}</text>
				</view>
				<view class="xiala_btn" v-if="index === 0" @click="handleArrow">
					<image :src="!jiantou?'/static/xia.png':'/static/shang.png'" mode="widthFix"></image>
				</view>
			</view>
		</view>
		<!-- 下拉双色球结束 -->

		<!-- 红球开始 -->
		<view class="select_red">
			<view class="select_red_title">
				<view class="select_red_title_text" v-if="mannerId==1">
					至少选择7个
				</view>
				<view class="select_red_title_text" v-else>
					胆码区，至少选择1个，最多6个
				</view>
				<!-- 随机投注开始 -->
				<block v-if="mannerId == 1">
					<view class="select_red_title_choose">
						<view class="select_red_title_randow_a" @tap="handleRadom">
							<view class="select_red_title_image">
								<image src="https://fucai.yiruit.com/fileLogoImg/zhendong1.jpg" mode="widthFix"></image>
							</view>
							<text>模拟机选</text>
						</view>
						<!-- <view class="select_red_title_randow_a" @tap="handleRadomAppoint">
							<view class="select_red_title_image">
								<image src="http://fucai.yiruit.com/fileLogoImg/zhendong2.jpg" mode="widthFix"></image>
							</view>
							<text>随机定投</text>
						</view> -->
					</view>
				</block>
				<!-- 随机投注结束 -->
			</view>
			<!-- 红球初始化 -->
			<view class="red_ball_wrap">
				<view class="red_ball init_red_ball" :class="{'red_ball_bg':red.isActive,'red_ball_hide':red.isActiveSpecil}" v-for="(red,index) of redNum"
				 :key="red.num" @click="handleRedBall('redCommon',index)">{{red.num}}
				</view>
			</view>
			<!-- 胆拖红球初始化 -->
			<block v-if="mannerId == 2">
				<view class="select_red_title_specil">
					拖码区，至少选择2个
				</view>
				<view class="red_ball_wrap">
					<view class="red_ball init_red_ball" :class="{'red_ball_bg':item.isActiveSpecil,'red_ball_hide':item.isActive}"
					 v-for="(item,index) of redNum" :key="index" @click="handleRedBall('redSpecil',index)">
						{{item.num}}
					</view>
				</view>
			</block>
		</view>

		<!-- 红球结束 -->



		<!-- 选号按钮开始 -->
		<view class="xuanhao_wrap">
			<view class="xuanhao_btn" @click="handleSurecode">加入笔记本</view>
			<!-- <view class="xuanhao_btn xuanhao_bg" @click="handleBuy">确认选号</view> -->
		</view>
		<view class="footer_wrap">
			<scroll-view scroll-y class="footer_select" ref="box">
				<view v-for="(item,index) of totalNum" :key="index">
					<view class="select_num">
						<text class="red_color" v-for="(v,i) of item.num" :key="v.num">{{v.num}}</text>
						<view class="delete_btn" @click="handleDel(index)" v-if="totalNum.length">
							<text class="iconfont icon-shanchu"></text>
						</view>
					</view>
				</view>
			</scroll-view>
			<!-- <view class="caipiao_select">
				<view class="select_btn" @click="handlRadom">机选一注</view>
				<view class="select_btn" @click="handleClear">清空列表</view>
			</view> -->
		</view>
		<!-- 底部结束 -->

		<!-- 随机定投提示框 -->
		<!-- <view class="tost_wrap" v-if="isSelect">
			<view class="tost_item">
				<view class="tost_text">
					<view class="tost_text_title">请输入期数：</view>
					<input class="tost_text_input" type="number" focus v-model="howMany">
				</view>
				<view class="tost_btn_wrap">
					<view class="tost_btn" @click="handlecancel">取消</view>
					<view class="tost_line"></view>
					<view class="tost_btn" @click="handleSure">确认</view>
				</view>
			</view>
		</view>
 -->
		<!-- 底部购买栏 -->

		<view class="confirm_buy">
			<view class="confirm_wrap">
				<view class="confirm_delete" @tap="handleClear">
					<view class="confirm_delete_img">
						<image src="https://fucai.yiruit.com/fileLogoImg/shanchu.jpg" mode="widthFix"></image>
					</view>
				</view>
				<view class="confirm_detail">
					<text>{{zhushu}}</text>
					<text>注</text>
					<text class="confirm_money">{{total}}</text>
					<text>福豆</text>
				</view>
			</view>
			<view class="confirm_btn" @tap="handleBuy">确定</view>
		</view>



	</view>
</template>
<script>
	import {
		forNum
	} from '../../utils/ballNum';
	import common from "../../common/common.js";
	export default {
		data() {
			return {
				riqi:'',
				qishu:'',
				// moreRandom:'',	// 传入购买页面，表示是 随机定投 方式跳转的
				// // 随机定投期数
				// howMany: '',
				// 胆拖 时 拖球的数组
				selectSpecil: [],
				// 箭头
				arrow: true,
				// 方式的id
				mannerId: 1,
				// 默认选号方式：
				defaultName: '普通模拟选号',
				// 选号方式
				manner: [{
						name: '普通模拟选号',
						id: 1,
						isActive: true
					},
					{
						name: '胆拖模拟选号',
						id: 2,
						isActive: false
					}
				],
				// 提示框是否选中
				isSelect: false,
				// 红色球的数量
				redNum: [],
				// 保存红球被点击后的数组
				selectRed: [],
				// 红球和蓝球的所有组合
				allNum: [],
				jiantou: false,
				historyNum: [],
				total: 0,
				zhushu: 0,
				totalNum: []
			};
		},
		onLoad() {
			
			
			
			
			forNum(this.redNum, 31);
			this.getQicai();

		},
		onShow() {

		},
		methods: {
			// 封装 uni.showToast()
			showToast(title = "", icon = "none") {
				return new Promise((resolve, reject) => {
					uni.showToast({
						title: title,
						icon: icon,
						mask: true,
						duration: 1500,
						success: (res) => {
							resolve(res);
						},
						fail: (err) => {
							reject(err);
						},
						complete: (data) => {
							resolve(data);
						},
						// image
						// position
					})
				})
			},
			// 随机定投
			// handleRadomAppoint() {
			// 	this.howMany = '';
			// 	this.isSelect = true;
			// },
			// 随机定投 确定
			// handleSure() {
			// 	if(!this.howMany || this.howMany <= 1) return this.showToast('请最少选择 2 期投注');
			// 	this.moreRandom = true;	// 表示 点击的是 随机定投，在购买方法中 跳转后 重赋值 false haoMany 也在跳转后重新赋值为空
			// 	this.isSelect = false;
			// 	this.handleRadom();
			// 	this.handleSurecode();
			// 	this.handleBuy();
				
			// },
			// 随机定投 取消
			// handlecancel() {
			// 	this.isSelect = false;
			// },
			// 点击确认选择方式
			getManner(item) {
				this.arrow = !this.arrow;
				this.mannerId = item.id;
				this.defaultName = item.name;
				this.clearActive();
			},
			// 点击选择方式
			chooseManner() {
				this.arrow = !this.arrow;
			},
			// 获取七彩乐开奖历史
			getQicai() {
				common.request({
					path: "Development/getpage",
					// method:'POST',
					data: {
						rows: 3,
						page: 1,
						sidx: "PrizeTime",
						sord: "desc",
						caizhongid: "3"
					},
					success: res => {
						console.log('qishu',res)
						this.riqi = res.data.riqi;
						this.qishu = res.data.qishu;
						res.data.rows.forEach(elem => {
							elem.RedBall = elem.RedBall.split(",");
						})
						this.historyNum = res.data.rows;
					}
				})
			},
			// 点击删除选好数据
			handleDel(e) {
				this.totalNum.splice(e, 1);
				this.total = 0
				this.totalNum.forEach(v => {
					this.total += v.price
				})
				this.zhushu = this.total / 2;
				this.clearActive();
			},
			handleArrow() {
				this.jiantou = !this.jiantou
			},
			// 清除已选中的号码时调用
			clearActive() {
				this.allNum = [];
				this.selectRed = [];
				this.redNum.forEach(elem => {
					elem.isActive = false;
					elem.isActiveSpecil = false;
				})
			},
			// 点击随机选择一组彩票
			handleRadom() {
				this.clearActive();
				let red;
				let index = 0;
				do {
					red = this.redNum[Math.floor(Math.random() * this.redNum.length)]
					if (this.selectRed.length < 7 && red.isActive == false) {
						index++;
						red.isActive = true;
						this.selectRed.push({
							num: red.num,
							name: 'red'
						});
					}
				} while (index < 7);
			},
			// 确认选号后跳转页面
			handleBuy() {
				// 如果球的数量满足条件时才执行
				// this.suerSelect();
				if(this.totalNum.length < 1) return this.showToast('请选择号码并加入记事本')
				// if (this.totalNum.length > 0) {
					if (this.selectRed.length > 6) {
						this.allNum = this.selectRed;
						let price = this.comPrice(this.allNum.length,7);
						this.totalNum.push({
							num: this.selectRed,
							price: price
						});
					} else {
						this.clearActive();
					}
					// let num = this.allNum.join(",");
					// let price = this.comPrice();
					// let types = this.mannerId == 1 ? '' : 7;
					uni.navigateTo({
						url: '../selectOrder/selectOrder?totalnum=' + JSON.stringify(this.totalNum) + '&type=3',
						// url: '../selectOrder/selectOrder?totalnum=' + JSON.stringify(this.totalNum) + '&type=3&moreRandom='+this.moreRandom+'&fixed='+this.howMany,
					});
					// this.moreRandom='';
					// this.howMany = '';
					this.clearActive();
					this.totalNum = [];
					this.total = 0;
					this.zhushu = 0;
				// } else {
				// 	if (this.selectRed.length > 6) {
				// 		this.allNum = this.selectRed;
				// 		let price = this.comPrice();
				// 		this.totalNum.push({
				// 			num: this.selectRed,
				// 			price: price
				// 		});
				// 		wx.navigateTo({
				// 			url: '../selectOrder/selectOrder?totalnum=' + JSON.stringify(this.totalNum) + '&type=3',
				// 		});
				// 		this.clearActive();
				// 		this.totalNum = [];
				// 		this.total = 0;
				// 		this.zhushu = 0;
				// 	} else {
				// 		this.showToast('请最少选择7个号码')
				// 	}
				// }
			},
			// 计算价格的方法
			comPrice(max, min) {
				let price = 0;
				price = common.getGroups(max, min) * 2
				return price;
			},
			// 点击选中红球时
			// 点击时选中蓝球或者红球
			handleRedBall(type, i) {
				//	this.mannerId == 1 表示是从普通选号进入
				if (this.mannerId == 1) {
					if (type == "redCommon") {
						// 如果红球被选中的个数为16个了，那么后面将不可以选中。只能先取消
						if (this.selectRed.length === 16 && this.redNum[i].isActive == false) {
							this.showToast('只能选择16个红球')
							return;
						}
						this.redNum[i].isActive = !this.redNum[i].isActive;
						//1. 如果点击时为true
						if (this.redNum[i].isActive) {
							//2. 把这个球添加进数组
							this.selectRed.push({
								num: this.redNum[i].num,
								name: 'red'
							})
						} else {
							// 2. 再次点击时找个这个值在另一个数组中的下标
							var index;
							index = this.selectRed.findIndex(elem => {
								return elem.num == this.redNum[i].num;
							})
							// 如果数组内有这个球时，删除这个球
							if (index != -1) {
								this.selectRed.splice(index, 1);
							}
						}
					}
				} else { // else 表示是从 胆拖选号 进入	// ==========================================	
					// 如果胆拖总数等于25个了，那么后面将不可以选中。只能先取消
					let arrLength = this.selectRed.length + this.selectSpecil.length;
					if (type == "redCommon") { // redCommon 表示点击的是 胆码
						// 判断 拖码区是否选中
						if (this.redNum[i].isActiveSpecil) return;
						// 判断 点击 胆码时 选中的 胆码 是否超出 6 个
						if (this.selectRed.length === 6 && this.redNum[i].isActive === false) return this.showToast('胆码最多选择6个');
						this.redNum[i].isActive = !this.redNum[i].isActive;
						//1. 如果点击时为true 即点击的胆码本来没选中
						if (this.redNum[i].isActive) {
							//2. 把这个球添加进数组
							this.selectRed.push({
								num: this.redNum[i].num,
								name: 'red',
								type: 1 // 表示是胆码
							})
						} else {
							// 2. 再次点击时找个这个值在另一个数组中的下标(取消选中)
							var index;
							index = this.selectRed.findIndex(elem => {
								return elem.num == this.redNum[i].num;
							})
							// 删除数组内这个球
							this.selectRed.splice(index, 1);
						}
					} else if (type == 'redSpecil') {
						// 判断 胆码区是否选中
						if (this.redNum[i].isActive) return;
						// 判断 点击 胆码区时，拖码 是否超出 24 个
						if (this.selectSpecil.length === 24 && this.redNum[i].isActiveSpecil === false) return this.showToast('拖码最多选择24个')
						// 判断 点击 胆码时 全部红球 是否超出 25 个
						if (arrLength === 25 && this.redNum[i].isActiveSpecil == false) return this.showToast('只能选择25个号');
						this.redNum[i].isActiveSpecil = !this.redNum[i].isActiveSpecil;
						//1. 如果点击时为true
						if (this.redNum[i].isActiveSpecil) {
							//2. 把这个球添加进数组
							this.selectSpecil.push({
								num: this.redNum[i].num,
								name: 'red',
								type: 2 // 表示是胆码
							})
						} else {
							// 2. 再次点击时找个这个值在另一个数组中的下标
							var index;
							index = this.selectSpecil.findIndex(elem => {
								return elem.num == this.redNum[i].num;
							})
							// 删除这个球
							this.selectSpecil.splice(index, 1);
						}
					}
				}

			},

			// 弹出提示框
			// handleSure() {
			// this.isSelect = false;
			// },
			// 取消提示框
			// handlecancel() {
			// this.isSelect = false;
			// this.clearActive();
			// },
			// 加入记事本判断是拖胆选择时执行这个方法
			handlerSpecil() {
				this.allNum = [];
				let redLength = this.selectRed.length + this.selectSpecil.length; //胆拖 已选红球总个数
				let commonLength = this.selectRed.length; // 胆拖 已选胆码总个数
				let specilLength = this.selectSpecil.length; // 胆拖 已选拖码总个数
				if (redLength > 7 && commonLength > 0 && specilLength > 1) {
					// this.isSelect = true;
					let max = specilLength;
					let min = 7 - commonLength;

					let price = this.comPrice(max, min);
					this.total += price;
					this.zhushu = this.total / 2;
					this.allNum = [...this.selectRed, {
						num: '#',
						name: 'red'
					}, ...this.selectSpecil];
					var one = {
						num: this.allNum,
						price: price,

					}
					// 使用二维数组保存每一注彩票
					this.totalNum.push(one);
					this.clearActive();
					this.selectSpecil = [];
				} else {
					this.showToast('选号格式不正确')
				}
			},
			// 确认选号 点击加入笔记本按钮
			handleSurecode() {
				if (this.mannerId == 2) {
					this.handlerSpecil();
					return;
				}
				// 如果球的数量满足条件时才执行
				if (this.selectRed.length > 6) {
					this.allNum = this.selectRed;
					let price = this.comPrice(this.selectRed.length, 7);
					let types = this.mannerId == 1 ? '' : 7;
					this.totalNum.push({
						num: this.selectRed,
						price: price,
						types
					});
					
					this.allNum = [];
					// this.suerSelect();
					this.selectRed = []
					this.total += price;
					this.zhushu = this.total / 2
					this.clearActive();
				} else {
					this.showToast('至少选择7个红球')
				}
			},
			// 确认选好彩票后调用此方法
			// suerSelect() {
			// this.redNum.forEach(element => {
			// 	if (element.isActive) {
			// 		this.allNum.push(element.num)
			// 	}
			// });
			// this.redNum.forEach(elem => {
			// 	elem.isActive = false
			// })
			// },
			// 清除号码框
			handleClear() {
				this.totalNum = [];
				this.clearActive();
				this.zhushu = 0;
				this.total = 0;
			},
			// 把添加进数组的红球进行随机匹配
			/*
			radomRed(arr) {
        let newArr = []
				let str = '';
				let a = '';
				for (let i = 0; i < arr.length; i++) {
					str = '';
					str = str + arr[i] + ',';
					for (let n = i + 1, b = ''; n < arr.length; n++) {
						b = str + arr[n] + ',';
						for (let t = n + 1; t < arr.length; t++) {
							a = b + arr[t] + ',';
							for (let m = t + 1, c = ''; m < arr.length; m++) {
								c = a + arr[m] + ',';
								for (let q = m + 1, d = ''; q < arr.length; q++) {
									d = c + arr[q] + ',';
									for (let w = q + 1, f = ''; w < arr.length; w++) {
										f = d + arr[w];
										newArr.push(f);
									}
								}
							}
						}
					}
				}
				let mapArr = []
				mapArr = newArr.map(elem => {
					return elem.split(",");
				})
				return mapArr
      }
      */
		},
	};
</script>
<style lang="scss" scoped>
	.selectCodeqicai {
		padding-bottom: 40rpx;

		// 拖胆
		.manner {
			position: relative;
			.manner_choose {
				width: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: $color;
				height: 80rpx;
				font-size:30rpx;
				color: #FFFFFF;

				text {}

				.manner_choose_arrow {
					width: 34rpx;
					height: 24rpx;
					margin-left: 10rpx;

					image {
						width: 34rpx;
						height: 24rpx;
					}
				}
				.up_arrow{
					transform: rotate(180deg);
				}
			}

			.manner_wrap {
				position: absolute;
				background-color: #FFFFFF;
				width: 100%;
				top: 80rpx;
				left: 0;
				height: 0;
				overflow: hidden;
				box-shadow: 0 4rpx 3rpx #aaaaaa;

				.manner_wrap_box {
					display: flex;
					background-color: #FFFFFF;
					align-items: center;
					justify-content: space-between;
					width: 60%;

					.manner_wrap_common {
						margin-top:10rpx;
						margin-left: 40rpx;
						padding: 10rpx 0;
						width: 40%;
						text-align: center;
						border: 1rpx solid #666666;
					}

					.activeClass {
						color: $color;
						border: 1rpx solid $color;
					}
				}
			}

			.manner_wrap_height {
				height: 100%;
				padding: 20rpx;
			}
		}

		/*弹出框提示 */
		.tost_wrap {
			background-color: rgba(22, 33, 55, .4);
			position: fixed;
			width: 100vw;
			height: 100vh;
			z-index: 1000;
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
					margin-top:30rpx;
					border-top:1px solid #CDC5BF;
					display: flex;
					justify-content: space-between;
					font-size: 30rpx;
					color: #8F8F8F;
					.tost_btn {
						padding: 30rpx 0;
						flex:1;
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

		.kaijiang_time {
			font-size: 24rpx;
			color: #999;
			border-bottom: 2rpx solid #eee;
			padding: 15rpx 20rpx;
		}

		.xiala_wrap {
			height: 64rpx;
			line-height: 64rpx;
			overflow: hidden;

			.xiala_item {
				display: flex;
				border-bottom: 2rpx solid #eee;
				padding: 15rpx 0;
				align-items: center;

				.xiala_title {
					color: #999;
					padding-left: 20rpx;
				}

				.xiala_item_content {
					color: $color;
					display: flex;
					flex: 1;

					text {
						display: block;
						margin-left: 20rpx;
					}
					
					.xiala_item_content_blue{
						color:blue;
					}
				}

				.xiala_btn {
					width: 40rpx;
					height: 35rpx;
					margin-right: 40rpx;
					line-height: 35rpx;
					margin-top: 10rpx;

					image {
						height: 16rpx;
						width: 75%;
					}
				}
			}
		}

		.Height {
			height: auto;
		}


		// 红球开始

		.select_red {
			margin-top: 20rpx;

			.select_red_title_specil {
				color: #999;
				padding: 20rpx 0 10rpx 35rpx;
			}

			.select_red_title {
				color: #999;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.select_red_title_text {
					padding: 20rpx 0 10rpx 35rpx;

				}

				.select_red_title_choose {
					display: flex;
					margin-right: 42rpx;

					.select_red_title_randow_a {
						margin-left: 6rpx;
						display: flex;
						align-items: center;
						border: 4rpx solid #E7E7E7;
						width: 180rpx;
						height: 68rpx;
						box-sizing: border-box;

						.select_red_title_image {
							width: 52rpx;
							height: 48rpx;

							image {
								width: 52rpx;
								height: 48rpx;
							}
						}

						text {
						  padding-left:10rpx;
							color: #A0A0A0;
							font-size: 24rpx;
						}
					}
				}
			}

			.select_blue_title {
				color: #999;

				text {
					padding-left: 25rpx;
					color: blue;
					margin-right: 20rpx;
				}
			}

			.red_ball_wrap {
				display: flex;
				flex-wrap: wrap;
				text-align: center;

				.red_ball {
					font-size:32rpx;
					width: 70rpx;
					height: 70rpx;
					line-height: 70rpx;
					border-radius: 50%;
					background-color: #e7e7e7;
					margin-left: 35rpx;
					margin-top: 30rpx;
				}

				.init_red_ball {
					color: $color;
				}

				.init_blue_ball {
					color: blue;
				}

				.red_ball_bg {
					background-color: $color;
					color: #fff;
				}

				.red_ball_hide {
					color: #fff;
				}

				.select_blue_bg {
					background-color: #2092fa;
					color: #fff;
				}
			}
		}

		// 红球结束
		.xuanhao_wrap {
			display: flex;
			justify-content: space-around;
			margin-top: 40rpx;

			.xuanhao_btn {
				width: 200rpx;
				height: 60rpx;
				text-align: center;
				line-height: 60rpx;
				border-radius: 30rpx;
				background-color: #ddd;
			}

			.xuanhao_bg {
				background-color: $color;
				color: #fff;
			}
		}

		// 底部
		.footer_wrap {
			padding-bottom: 100rpx;

			.footer_select {
				border: 2rpx solid #ddd;
				width: 80%;
				height: 300rpx;
				border-radius: 10rpx;
				box-shadow: 2rpx 2rpx 2rpx #ddd;
				margin: 30rpx auto 0;
				overflow: auto;

				.select_num {
					display: flex;
					flex-wrap: wrap;

					.red_color {
						color: $color;
					}

					.delete_btn {
						flex:1;
						display: flex;
						justify-content: flex-end;
						padding-right:20rpx;

						.iconfont {
							color: #666;
						}
					}

					text {
						display: block;
						margin-left: 20rpx;
						margin-top: 20rpx;
					}

					.last_color {
						color: #2092fa;
					}
				}
			}

			.caipiao_select {
				margin-top: 25rpx;
				display: flex;
				justify-content: space-around;

				.select_btn {
					width: 160rpx;
					height: 40rpx;
					text-align: center;
					line-height: 40rpx;
					border-radius: 5rpx;
					font-size: 26rpx;
					border: 2rpx solid #ddd;
					box-shadow: 1rpx 1rpx #ddd;
				}
			}

			.caipiao_buy {
				display: flex;
				text-align: center;
				margin-top: 30rpx;
				justify-content: center;
				align-items: center;

				text {
					color: $color;
				}

				.buy_wrap {
					width: 200rpx;
					height: 40rpx;
					border: 2rpx solid #eee;
					display: flex;
					justify-content: space-between;

					margin-left: 10rpx;

					button {
						flex: 1;
						height: 40rpx;
						line-height: 40rpx;
						border-radius: 0rpx;
					}

					text {
						display: block;
						flex: 1;
						border-left: 2rpx solid #eee;
						border-right: 2rpx solid #eee;
						color: #000;
					}
				}
			}
		}
	}

	.uni-collapse-cell--hide {
		height: 60rpx;
	}


	.confirm_buy {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		-webkit-box-sizing: border-box;
		border-top: 1rpx solid #F0F0F0;
		background-color: #FFFFFF;

		.confirm_wrap {
			display: flex;
			text-align: center;

			.confirm_delete {
				padding: 0 20rpx;
				border-right: 1rpx solid #E4E4E4;

				.confirm_delete_img {
					width: 48rpx;
					height: 48rpx;

					image {
						width: 48rpx;
						height: 48rpx;
					}
				}
			}

			.confirm_detail {
				display: flex;
				align-items: center;
				margin-left: 38rpx;

				text {
					padding-right: 9rpx;
				}

				.confirm_money {
					padding-left: 5rpx;
					color: $color;
				}
			}
		}

		.confirm_btn {
			width: 120rpx;
			height: 60rpx;
			border-radius: 8rpx;
			color: #FFFFFF;
			line-height: 60rpx;
			text-align: center;
			background-color: $color;
			margin-right: 16rpx;
		}
	}
</style>
