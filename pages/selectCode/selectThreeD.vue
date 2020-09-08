<template>
	<view class="selectThree">
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
			<view class="xiala_item" v-for="(item,index) in historyNum" :key="index">
				<text class="xiala_title">第{{item.PeriodsNumber}}期</text>
				<view class="xiala_item_content">
					<text v-for="(n,i) in item.RedBall" :key="i">{{n}}</text>
				</view>
				<view class="xiala_btn" v-if="index === 0" @click="handleArrow">
					<image :src="!jiantou?'/static/xia.png':'/static/shang.png'" mode="widthFix"></image>
				</view>
			</view>
		</view>
		<!-- 下拉双色球结束 -->
		<view class="selectD">
			<text v-if="mannerId==1">每位至少选择1个号码</text>
			<text v-else-if="mannerId==2">至少选择2个号码</text>
			<text v-else-if="mannerId==3">至少选择3个号码</text>
			<text v-else>至少选择1个有效号码</text>
			<!-- 随机投注开始 -->
			<block v-if="mannerId == 1">
				<view class="select_red_title_choose">
					<view class="select_red_title_randow_a" @tap="handleRadom">
						<view class="select_red_title_image">
							<image src="https://fucai.yiruit.com/fileLogoImg/zhendong1.jpg" mode="widthFix"></image>
						</view>
						<text class="select_red_title_text">模拟机选</text>
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
		<!-- 百位球开始 -->
		<!-- mannerId == 1 直选区域 ==================直选区域开始=============================-->
		<block v-if="mannerId == 1">
			<view class="select_red">
				<view class="select_red_title">
					百位
				</view>
				<view class="red_ball_wrap">
					<view class="red_ball" :class="item.isActive?'red_ball_bg':''" v-for="(item,index) of baiNum" :key="item.id" @click="handleBaidBall(index)">{{item.num}}</view>
				</view>
			</view>
			<!-- 百位球结束 -->
			<!-- 十位球开始 -->
			<view class="select_red">
				<view class="select_red_title">
					十位
				</view>
				<view class="red_ball_wrap">
					<view class="red_ball" :class="item.isActive?'red_ball_bg':''" v-for="(item,index) of shiNum" :key="item.id" @click="handleShiBall(index)">{{item.num}}</view>
				</view>
			</view>
			<!-- 十位球结束 -->
			<!-- 个位球开始 -->
			<view class="select_red">
				<view class="select_red_title">
					个位
				</view>
				<view class="red_ball_wrap">
					<view class="red_ball" :class="item.isActive?'red_ball_bg':''" v-for="(item,index) of geNum" :key="item.id" @click="handleGeBall(index)">{{item.num}}</view>
				</view>
			</view>
		</block>
		<!-- 个位球结束 -->
		<!-- mannerId == 2 组选3区域 =================组选3区域开始============================-->
		<block v-else-if="mannerId == 2">
			<view class="select_red">
				<view class="red_ball_wrap group_three">
					<view class="red_ball" :class="item.isActive?'red_ball_bg':''" v-for="(item,index) of groupThree" :key="index"
					 @click="handleItemBall(index)">{{item.num}}</view>
				</view>
			</view>
		</block>
		<!-- mannerId == 3 组选3区域 =================组选6区域开始============================-->
		<block v-else-if="mannerId == 3">
			<view class="select_red">
				<view class="red_ball_wrap group_three">
					<view class="red_ball" :class="item.isActive?'red_ball_bg':''" v-for="(item,index) of groupThree" :key="index"
					 @click="handleItemBall(index)">{{item.num}}</view>
				</view>
			</view>
		</block>
		<!-- mannerId == 4 5 6 =============和值-直选，和值-直选3，和值-直选6，================-->
		<block v-else>
			<view class="select_red">
				<view class="red_ball_wrap">
					<view class="red_ball sum_init" :class="item.isActive?'red_ball_bg':''" v-for="(item,index) of sumInit" :key="index"
					 @click="handleItemBall(index)">{{item.num}}</view>
				</view>
			</view>
		</block>
		<!-- 选号按钮开始 -->
		<view class="xuanhao_wrap">
			<view class="xuanhao_btn" @click="handleSurecode">加入笔记本</view>
			<!-- <view class="xuanhao_btn xuanhao_bg" @click="handleBuy">确认选号</view> -->
		</view>
		<!-- 选号按钮结束 -->
		<!-- 底部开始 -->
		<view class="footer_wrap">
			<scroll-view scroll-y class="footer_select" ref="box">
				<view v-for="(item,index) of totalNum" :key="index">
					<view class="select_num">
						<text class="num_color" v-for="(v,i) of item.num" :key="i">{{v.num}}</text>
						<view class="delete_btn" @click="handleDel(index)" v-if="totalNum.length">
							<text class="iconfont icon-shanchu"></text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 底部结束 -->
		<!-- 随机定投 提示框 -->
<!-- 		<view class="tost_wrap" v-if="isSelect">
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
		</view> -->


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
		forNum,
		forGroup
	} from '../../utils/ballNum';
	import common from "../../common/common.js";
	export default {
		data() {
			return {
				riqi:'',
				qishu:'',
				// 组选3， 6，初始化数组
				groupThree: [],
				// 和值 初始化数组
				sumInit: [],
				// // 随机定投期数
				// howMany: '',

				// 提示框 是否显示
				isSelect: false,
				// 默认选号方式：
				defaultName: '直选',
				// 箭头
				arrow: true,
				// 方式的id
				mannerId: 1,
				// 选号方式
				manner: [{
						name: '直选',
						id: 1,
						isActive: true
					},
					{
						name: '组选3',
						id: 2,
						isActive: false
					},
					{
						name: '组选6',
						id: 3,
						isActive: false
					},
					{
						name: '和值-直选',
						id: 4,
						isActive: false
					},
					{
						name: '和值-组选3',
						id: 5,
						isActive: false
					},
					{
						name: '和值-组选6',
						id: 6,
						isActive: false
					}
				],

				// 总的购买注数
				zhushu: 0,
				// 总的价格
				total: 0,
				// 百位球的数量 初始化用的
				baiNum: [],
				// 十位球的数量 初始化用的
				shiNum: [],
				// 个位球的数量 初始化用的
				geNum: [],
				// 保存百位数被点击后的数组
				selectBai: [],
				// 保存十位数被点击后的数组
				selectShi: [],
				// 保存个位数被点击后的数组
				selectGe: [],
				// 红球的所有组合
				allNum: [],
				jiantou: false,
				historyNum: [],
				totalNum: []
			};
		},
		onLoad() {
			// 百十个 位初始化
			this.getNum(this.baiNum, 10);
			this.getNum(this.shiNum, 10);
			this.getNum(this.geNum, 10);
			this.getFucai();
			// 组选3,6初始化数组
			forGroup(this.groupThree, 9)
			// 和值 初始化数组
			forGroup(this.sumInit, 27)
		},
		onShow() {

		},
		methods: {
			// 点击 直选 之外的方式的 球的事件 传入下标==========================点击球=
			handleItemBall(i) {
				// 和值-组选3 和值-组选6 判断是否为有效号码
				let numberMark = this.mannerId==5? i == 0 || i == 27 : i == 0 || i == 1 || i == 2 || i == 25 || i == 26 || i == 27;
				if((this.mannerId==5 && numberMark)||(this.mannerId==6 && numberMark)) return this.showToast("不符合有效号码")
				// this.mannerId 是组选3 和组选6 的时候，数组是this.groupThree，其他时候数组是this.sumInit
				let flagGroup = (this.mannerId == 2 || this.mannerId == 3)?this.groupThree:this.sumInit;
				flagGroup[i].isActive = !flagGroup[i].isActive;
				if (flagGroup[i].isActive) {
					flagGroup[i].name = 'red';
					this.allNum.push(flagGroup[i]);
				} else {
					let index = this.allNum.findIndex(item => {
						return flagGroup[i].num == item.num;
					});
					this.allNum.splice(index, 1);
				}
			},
			// 清除号码框
			handleClear() {
				this.totalNum = [];
				this.clearNum();
				this.zhushu = 0;
				this.total = 0;
			},
			//  点击选号
			chooseManner() {
				this.arrow = !this.arrow;
			},
			// 点击确认选择方式
			getManner(item) {
				this.arrow = !this.arrow;
				this.mannerId = item.id;
				this.defaultName = item.name;
				this.clearNum();
			},

			// 获取福彩开奖历史
			getFucai() {
				common.request({
					path: "Development/getpage",
					// method:'POST',
					data: {
						rows: 5,
						page: 1,
						sidx: "PrizeTime",
						sord: "desc",
						caizhongid: "2"
					},
					success: res => {
						this.riqi = res.data.riqi;
						this.qishu = res.data.qishu;
						res.data.rows.forEach(elem => {
							elem.RedBall = elem.RedBall.split(",");
						})
						this.historyNum = res.data.rows
					}
				})
			},
			// 点击随机获取一组彩票
			handleRadom() {
				this.clearNum();
				let ge, shi, bai;
				// let arr = [];
				for (let index = 0; index < 10; index++) {
					ge = this.geNum[Math.floor(Math.random() * this.geNum.length)]
					shi = this.shiNum[Math.floor(Math.random() * this.shiNum.length)]
					bai = this.baiNum[Math.floor(Math.random() * this.baiNum.length)]
					if (this.selectGe.length < 1 && ge.isActive == false) {
						ge.isActive = true;
						this.selectGe.push(ge.num)
					}
					if (this.selectShi.length < 1 && shi.isActive == false) {
						shi.isActive = true;
						this.selectShi.push(shi.num)
					}
					if (this.selectBai.length < 1 && bai.isActive == false) {
						bai.isActive = true;
						this.selectBai.push(bai.num)
					}
				}

			},
			// 随机定投
			// handleRadomAppoint() {
			// 	this.howMany = '';
			// 	this.isSelect = true;
			// },
			// 随机定投 确定
			// handleSure() {
			// 	this.isSelect = false;
			// 	for (let i = 0; i < this.howMany; i++) {
			// 		this.handleRadom();
			// 		this.handleSurecode();
			// 	}
			// },
			// 随机定投 取消
			// handlecancel() {
			// 	this.isSelect = false;
			// },
			handleArrow() {
				this.jiantou = !this.jiantou
			},
			// 获取个十百的球数
			getNum(arr, num) {
				for (let i = 0; i < num; i++) {
					arr.push({
						id:i,
						num: i,
						isActive: false
					})
				}
			},
			// 点击清空选项框内的球
			handleCealr() {
				this.clearNum();
				this.totalNum = [];
			},
			// 点击删除选好数据
			handleDel(e) {
				this.totalNum.splice(e, 1);
				this.total = 0;
				this.totalNum.forEach(v => {
					this.total += v.price;
				})
				this.zhushu = this.total / 2;
				this.clearNum()
			},
			// 点击时选中百位球
			handleBaidBall(i) {
				this.clicknum(this.baiNum, this.selectBai, i)
			},
			// 选中十位球
			handleShiBall(i) {
				this.clicknum(this.shiNum, this.selectShi, i)
			},
			// 选中个位球
			handleGeBall(i) {
				this.clicknum(this.geNum, this.selectGe, i)
			},
			// 确认选号后跳转页面
			handleBuy() {
				/**
				 * 判断 this.totalNum.length 大于0 
				 *    判断选中的  百十个位全部大于0
				 * 				执行 this.selectCode 方法封装的操作将自动执行接下来的事情
				 * 		跳转，清除。
				 * 		判断选中的  百十个位不是全部大于0
				 * 				不做操作
				 * 		执行跳转 清除操作
				 * 判断 this.totalNum.length 小于0 
				 * 		判断选中的  百十个位全部大于0
				 * 				执行 this.selectCode 方法封装的操作将自动执行接下来的事情，跳转，清除 
				 * 		判断选中的  百十个位不是全部大于0
				 * 				执行 提示操作
				 */
				// 以下是 this.mannerId == 1 时执行
				if(this.totalNum.length < 1) return this.showToast('请选择号码并加入记事本')
					uni.navigateTo({
						url: '../selectOrder/selectOrder?totalnum=' + JSON.stringify(this.totalNum) + '&type=2',
					});
					this.totalNum = [];
					this.clearNum();
				
				// if (this.totalNum.length === 0) {
				// 	uni.showToast({
				// 		icon: 'none',
				// 		title: '您还没有选择',
				// 		duration: 1500,
				// 	})
				// } else {
				// 	wx.navigateTo({
				// 		url: '../selectOrder/selectOrder?totalnum=' + JSON.stringify(this.totalNum) + '&type=2',
				// 	});
				// 	this.totalNum = [];
				// }

				// if (this.allNum.length === 0) {
				// 	if (this.selectBai.length > 0 && this.selectShi.length > 0 && this.selectGe.length > 0) {
				// 		this.selectCode()
				// 	}
				// }
				// if (this.allNum.length >= 3) {
				// 	let num = this.allNum.join(",");
				// 	this.clearNum();
				// 	this.allNum = []
				//return
				// wx.navigateTo({
				// 	url: '../selectOrder/selectOrder?num=' + num + '&type=2&price=' + this.total * 2,
				// });
				// }
			},
			// 点击每个球时调用此方法
			/**
			 * arr 球的数组
			 * select 存放被选中的球
			 * i 每个球的下标
			 */
			clicknum(arr, select, i) {
				arr[i].isActive = !arr[i].isActive;
				//1. 如果点击时为true
				if (arr[i].isActive) {
					//2. 把这个球添加进数组
					select.push(arr[i].num);
				} else {
					// 2. 再次点击时找个这个值在另一个数组中的下标
					var index;
					index = select.findIndex(elem => {
						return elem == arr[i].num;
					})
					// 如果数组内有这个球时，删除这个球
					if (index != -1) {
						select.splice(index, 1);
					}
				}
			},
			// 弹出提示框
			// handleSure() {
			// 	this.isSelect = false;
			// 	this.baiNum.forEach(elem => {
			// 		elem.isActive = false;
			// 	})
			// 	this.shiNum.forEach(elem => {
			// 		elem.isActive = false;
			// 	})
			// 	this.geNum.forEach(elem => {
			// 		elem.isActive = false;
			// 	})
			// },
			// 取消提示框
			// handlecancel() {
			// 	this.isSelect = false;
			// 	this.clearNum()
			// },
			// 点击取消选号内的数组时调用
			clearNum() {
				this.allNum = [];
				this.selectBai = [];
				this.selectShi = [];
				this.selectGe = [];
				// 初始化所有初始数组
				let array = [];
				array.push(this.baiNum,this.shiNum,this.geNum,this.groupThree,this.sumInit)
				array.forEach(item=>{
					item.forEach(v=>{
						v.isActive = false;
					})
				});
			},
			// 计算 mannerId == 2 的组选3 价格 传入 所选号码的长度
			imputedPrice(number) {
				return (number - 1) * number * 2;
			},
			// 计算 mannerId == 4 和值 的价格 传入 下标，也就是 和值 返回价格
			directPrice(index){
				switch(index){
					case 0:
					case 27: return 1*2;
					break;
					case 1:
					case 26: return 3*2;
					break;
					case 2:
					case 25: return 6*2;
					break;
					case 3:
					case 24: return 10*2;
					break;
					case 4:
					case 23: return 15*2;
					break;
					case 5:
					case 22: return 21*2;
					break;
					case 6:
					case 21: return 28*2;
					break;
					case 7:
					case 20: return 36*2;
					break;
					case 8:
					case 19: return 45*2;
					break;
					case 9:
					case 18: return 55*2;
					break;
					case 10:
					case 17: return 63*2;
					break;
					case 11:
					case 16: return 69*2;
					break;
					case 12:
					case 15: return 73*2;
					break;
					case 13:
					case 14: return 75*2;
					break;
					default:
				};
			},
			// 计算 mannerId == 5和值-组选3 的 价格 的方法
			threePrice(index){
				switch(index){
					case 1:
					case 3:
					case 24: return 1*2;
					break;
					case 2:
					case 25:
					case 26: return 2*2;
					break;
					case 4:
					case 5:
					case 6:
					case 21:
					case 22:
					case 23: return 3*2;
					break;
					case 7:
					case 9:
					case 12:
					case 15:
					case 18:
					case 20: return 4*2;
					break;
					case 8:
					case 10:
					case 11:
					case 13:
					case 14:
					case 16:
					case 17:
					case 19: return 5*2;
					break;
					default: return 0;
				};
			},
			// 计算 mannerId == 6 的 和值-组选6 的价格 sixPrice
			sixPrice(index){
				switch(index){
					case 3:
					case 4:
					case 23:
					case 24: return 1*2;
					break;
					case 5:
					case 22: return 2*2;
					break;
					case 6:
					case 21: return 3*2;
					break;
					case 7:
					case 20: return 4*2;
					break;
					case 8:
					case 19: return 5*2;
					break;
					case 9:
					case 18: return 7*2;
					break;
					case 10:
					case 17: return 8*2;
					break;
					case 11:
					case 16: return 9*2;
					break;
					case 12:
					case 13:
					case 14:
					case 15: return 10*2;
					break;
					default: return 0;
					};
			},
			// 加入笔记本 是从直选之外 进来的，处理数据封装到 this.totalNum 中，并清理 传入价格
			// 他们只是 计算方式不同而已，在封装时，都给定了指定来源的mannerid给每一组彩票。
			mannerClearHandle(price) {
				this.totalNum.push({
					num: this.allNum,
					price,
					types: this.mannerId //传到后面准备给后台判断类型
				})
				this.total = 0;
				this.totalNum.forEach(v => {
					this.total += v.price;
				})
				this.zhushu = this.total / 2;
				this.clearNum();
			},
			// 加入笔记本
			handleSurecode() {
				if (this.mannerId == 2) { // 从组选 3 进入
					if (this.allNum.length < 2) return this.showToast('至少需要选择2个');
					let price = this.imputedPrice(this.allNum.length);	// 直接获取价格
					this.mannerClearHandle(price); // 调用处理数据封装到 this.totalNum 中的方法
					return;
				} else if (this.mannerId == 3) { // 从组选 6 进入
					if (this.allNum.length < 3) return this.showToast('至少需要选择3个');
					let price = common.getGroups(this.allNum.length, 3);	// 获取注数
					price *= 2;
					this.mannerClearHandle(price);
					return;
					// 从 和值-直选,和值-组选3,和值-组选6 进入
				} else if(this.mannerId == 4 || this.mannerId == 5 || this.mannerId == 6){	
					if (this.allNum.length < 1) return this.showToast('至少需要选择1个');
					let price = 0;
					if(this.mannerId == 4){
						this.allNum.forEach(item=>{
							price += this.directPrice(parseInt(item.num))
						})
					}else if(this.mannerId == 5){
						this.allNum.forEach(item=>{
							price += this.threePrice(parseInt(item.num))
						})
					}else {
						this.allNum.forEach(item=>{
							price += this.sixPrice(parseInt(item.num))
						})
					}
					this.mannerClearHandle(price);
					return;
				}
				// this.manner == 1 直选，复式 如果所有球的数量都满足条件时才执行
				if (this.selectBai.length > 0 && this.selectShi.length > 0 && this.selectGe.length > 0) {
					// 弹窗通知用户选择的详细信息的
					// this.isSelect = true;
					this.selectCode()
					this.clearNum()
				} else {
					this.showToast('每位至少选择一个号码')
				}
			},
			// 选好彩票后调用
			// 分别拼接 百 十 个 位上选择的数字，最后 
			selectCode() {
				this.allNum = [];
				// 拼接选好的 百位数 为字符串
				let price = this.selectBai.length * this.selectShi.length * this.selectGe.length * 2;
				this.selectBai = this.selectBai.join(" ");
				// 拼接选好的 十位数 为字符串
				this.selectShi = this.selectShi.join(" ");
				// 拼接选好的 个位数 为字符串
				this.selectGe = this.selectGe.join(" ");
				this.total += price;
				this.zhushu = this.total / 2
				this.allNum = [{
					num: this.selectBai+' ',
					name: 'red'
				}, {
					num: this.selectShi+' ',
					name: 'red'
				}, {
					num: this.selectGe+' ',
					name: 'red'
				}]
				this.totalNum.push({
					num: this.allNum,
					price: price,
					types: this.mannerId
				});
				/*
				  this.totalNum 为对象数组，如：totalNum:[
					{num:[{num:3,name:'red'},{num:4,name:'red'}],price:20}
					{num:[{num:6,name:'red'},{num:2,name:'red'}],price:20}
					] 
				*/
				this.selectBai = [];
				this.selectShi = [];
				this.selectGe = [];
			},
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
		},
	};
</script>
<style lang="scss" scoped>
	.selectThree {
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
				box-sizing: border-box;
				-webkit-box-sizing: border-box;

				.manner_wrap_box {
					display: flex;
					background-color: #FFFFFF;
					align-items: center;
					justify-content: space-around;
					flex-wrap: wrap;
					width: 100%;

					.manner_wrap_common {
						padding: 10rpx 0;
						width: 28%;
						text-align: center;
						border: 1rpx solid #666666;
						margin-bottom: 20rpx;
						letter-spacing: 2rpx;
					}

					.activeClass {
						color: $color;
						border: 1rpx solid $color;
					}
				}
			}

			.manner_wrap_height {
				height: 180rpx;
				padding: 20rpx;
			}
		}

		// 选择选号方式结束
		.selectD {
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: #999;
			margin-top: 25rpx;
			padding-left:20rpx;

			// text {
			// 	margin-left: 20rpx;
			// }

			// 随机选号
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

					.select_red_title_text {
						color: #A0A0A0;
						font-size: 24rpx;
						padding-left:10rpx;
					}
				}
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

		.select_red {
			margin-top: 20rpx;

			.select_red_title {
				color: #999;
				margin-left: 20rpx;
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
					color: $color;
					border-radius: 50%;
					background-color: #e7e7e7;
					margin-left: 66rpx;
					margin-top: 30rpx;
				}

				.sum_init {
					margin-left: 38rpx;
					margin-top: 50rpx;
				}

				.red_ball_bg {
					background-color: $color;
					color: #fff;
				}
			}

			.group_three {
				:nth-child(5n+1) {
					margin-left: 50rpx;
				}

				:nth-child(n) {
					margin-top: 50rpx;
				}
			}
		}

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
					align-items: center;

					.num_color {
						margin-left: 20rpx;
						margin-top: 20rpx;
						color: $color;
					}

					.delete_btn {
						margin-left: 20rpx;

						.iconfont {
							margin-top: 20rpx;
							color: #666;
						}
					}

					text {
						display: block;

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
