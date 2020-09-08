<template>
	<view class="select-order">
		<!-- 获取地址开始 -->
		<view class="select">
			<!-- ========================= -->
			<view class="select-adress" :class="{happy_title:isHappy}">
				<text class="iconfont icon-dizhi" @tap="getLocation" v-if="current!=1"></text>
				<view @tap="goGiveSelect" class="adress-title" :class="{'happy_title':isHappy}">
					<view class="adress-title-top" v-if="current==0||current==2">{{wdTitle}}</view>
					<view class="adress-title-top adress-title-name" v-else-if="current==1 || type ==4">{{name}}</view>
					<!-- <view class="adress-title-top" v-else-if="current==2">福彩到家旗舰店</view> -->
					<view class="adress-title-bottom" v-if="juli != null && (current == 0||current==2)">距您{{juli}}km</view>
					<!-- <view class="adress-title-text">点击选择门店</view> -->
				</view>
				<view class="tabs" v-if="type<4">
					<segmented :tabs="tabs" @handleParent="handleChild"></segmented>
				</view>
			</view>
			<!-- ========================= -->
			<view class="detail" v-if="type<4">
				<view class="detail_address" v-if="address && (current ==0||current==2)">详细地址：{{address}}</view>
				<view class="detail_address" v-else-if="!address && (current ==0||current==2)">此网点暂时没有详细地址</view>
			</view>
			<!-- ========================= -->
		</view>
		<!-- 七彩乐内容开始 -->
		<view class="select-order-content" v-if="type<4">

			<image class="order-bg" src="/static/selectOrder/net-bg.png" mode="widthFix"></image>
			<view class="order-info">
				<view class="order-info-title">{{getTypeName(type)}}</view>
				<view class="order-num-wrap">
					<view class="order-info-num">
						<view class="info-num-item" v-for="(item,index) in saveNum" :key="index">
							<text v-for="(qiu,index1) in item.flagRender" :class="qiu.name == 'blue'?'qiu-color':''" :key="index1">{{qiu.num}}{{type==4?' * '+(item.price/qiu.num)+'福豆':''}}</text>
							<view class="info_num_content" v-if="type<4">
								<view class="order-footer-btn">
									定投
									<view class="buy_wrap">
										<button @click="handleDingtou(index,-1)">-</button>
										<text class="buy_text">{{item.dingtou}}</text>
										<button @click="handleDingtou(index,+1)">+</button>
									</view>
									期
								</view>
								<!-- 倍数 -->
								<view class="order-footer-btn btn2">
									乘以
									<view class="buy_wrap">
										<button @click="handleBeishu(index,-1)">-</button>
										<text class="buy_text">{{item.beishu}}</text>
										<button @click="handleBeishu(index,+1)">+</button>
									</view>
									倍
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="order-coupon">
					<view class="coupon">
						<image src="../../static/quan.png"></image>
						<text>体验券</text>
					</view>
					<view class="selectcoupon" @click="selectcoupon">
						<text>{{youhuiquan.length}}张可用</text>
						<image src="https://fucai.yiruit.com/UpFiles/shouye/more.png" mode="widthFix"></image>
					</view>
				</view>
			</view>
		</view>
		<!-- 七彩乐内容结束 -->

		<!-- 刮刮乐显示内容开始 -->

		<view class="select-order-content" v-if="type==4">
			<image class="order-bg" src="/static/selectOrder/net-bg.png" mode="widthFix"></image>
			<view class="order-info">
				<view class="order-info-title">{{happyObj.Tite}}</view>
				<view class="order-num-wrap">
					<view class="order-info-num">
						<view class="info-num-item">
							<view class="info_num_content">
								<view class="order-footer-btn">
									兑换数量
									<view class="buy_wrap happy_wrap">
										<button @click="handleDingtou('',-1)">-</button>
										<!-- <text class="buy_text">{{item.dingtou}}</text> -->
										<text class="buy_text">{{happyNum}}</text>
										<button @click="handleDingtou('',+1)">+</button>
									</view>
									张
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="order-coupon" @tap="showHappy">
					<view class="coupon" :class="{happy_coupon:isHappy}">
						<text>中奖规则</text>
					</view>
				</view>
			</view>
		</view>



		<!-- 刮刮乐显示内容结束 -->

		<!-- 底部确认按钮开始 -->
		<view class="select-order-footer">
			<view class="footer-info">
				<view class="footer-price">{{total}}福豆 {{THISYHQ.FaceValue>0?'(优惠券-'+THISYHQ.FaceValue+')':''}}</view>
			</view>
			<view class="footer-btn" @click="handleBuy">确认</view>
		</view>
		<!-- 底部确认按钮结束 -->
		<!-- 外送不够 100元 以及刮刮乐中奖规则 弹窗提醒 开始-->
		<view class="toast_box" v-if="isFull || isShowHappy">
			<view class="toast_box_item">
				<view class="toast_text">
					<view class="toast_text_item" v-if="isFull">您选择的总额不足100福豆</view>
					<scroll-view scroll-y="true" class="toast_text_item toast_text_happy" v-else-if="isShowHappy">
						<view>{{happyObj.contents}}</view>
					</scroll-view>
				</view>
				<view class="toast_btn toast_happy">
					<view class="toast_btn_item" @click="handleSure">确认</view>
				</view>
			</view>
		</view>
		<!-- 外送不够 100元 以及刮刮乐中奖规则 弹窗提醒 结束-->
	</view>
</template>
<script>
	// // #ifdef H5
	// 	var wx = require('jweixin-module');
	// // #endif
	// #ifdef H5
	import wxSdk from '../../common/wx-sdk.js'
	const jweixin = require('jweixin-module');
	// #endif
	import segmented from "@/components/tabs/segmented.vue";
	import common from '../../common/common';
	var _self;
	export default {
		components: {
			segmented
		},
		data() {
			return {
				canClear: false, // 判断是否是购买后返回的，如果 true，则 saveNum 要清空
				isShowHappy: false, // 刮刮乐 中奖规则弹窗
				happyNum: 1, // 刮刮乐 张数
				happyObj: {}, // 存放 刮刮乐页面过来的 刮刮乐彩票对象
				isHappy: false, // 判断 是否是 刮刮乐，给网点特别样式
				backData: {}, // 点击收货地址地图图标，更改之后返回页面的数据
				toastTitle: '',
				address: '', // 详细网点地址
				isConfirm: false, // 确认购买弹窗
				isFull: false, // 外送不够 100元 弹框提醒
				wdTitle: "", //外送的网点名字
				waiId: "", //外送的网点id
				num: [], //每一组彩票
				type: "", //彩票的类型
				ischange: false,
				saveNum: [], //保存所有彩票的数组
				tabs: [{
						id: 0,
						name: "自提",
						isActive: true
					},
					{
						id: 1,
						name: "到家",
						isActive: false
					},
					{
						id: 2,
						name: "托管",
						isActive: false
					}
				],
				current: 0, // 分段器标识 1 自提 2 到家 3 托管
				total: 0,	// 总价 单注价格*定投*倍数
				danPrice:0,	// 为以后 单注价格*倍数 的价格。
				delivery: "", //
				juli: null,
				name: "", // 获取的网点名字 和 收货地址名字
				id: "", // 获取网点的id 或 用户 id
				outlets: {},
				state: {},
				youhuiquan: [],
				THISYHQ: {
					ID: '',
					FaceValue: 0
				},
				par: [],
				memberId: '',
				adssList: [], // 收货地址列表
				str: '', // 点击购买 提示用
				types: '', // 确定 类型，7 为 七乐彩或双色球胆拖 1,2,3,4,5,6分别对应3D的一种状态，可以为空
				// choosedAddress:{},
				wangdianObj: {},
				newQiShu: {}, // 存放 即将开奖的期数
				ID: '', // 用户ID，用于在购买时 实时获取用户 余额 积分 优惠券等信息
			}
		},
		async onLoad(options) {
			_self = this;

			// #ifdef H5
			common.request({
				path: 'login/getcode',
				method: 'GET',
				data: encodeURIComponent(location.href.split('#')[0]),
				success(res3) {
					console.log('ticket', res3)
					let signPackage = res3.data;
					wxSdk.initJssdk(signPackage);
				},
				fail(err) {
					console.log('bbbb', err);
				}
			})
			// #endif
			// 判断用户是否注册 登录
			let {
				ID
			} = uni.getStorageSync('userinfo') || '';
			if (!!ID) {
				_self.ID = ID;
			} else {
				uni.navigateTo({
					url: '../login/userLogin'
				})
				return false;
			}

			_self.newQiShu = { // 购买时 如果选择了确定购买到下一期，这些数据 +1
				shuangseqiu: uni.getStorageSync('shuangseqiu') || '',
				qilecai: uni.getStorageSync('qilecai') || '',
				threed: uni.getStorageSync('threed') || '',
			};
			if (!options.type || options.type == '') return uni.navigateBack();
			// _self.types = options.types
			_self.type = options.type; // 彩种，双色球/七乐彩/3D/刮刮乐
			// 刮刮乐页面传递过来的参数 开始
			if (_self.type == 4) {
				_self.current = 1;
				_self.isHappy = true;
				_self.happyObj = JSON.parse(options.item)
				_self.total = parseInt(_self.happyObj.Typs)
				uni.setNavigationBarTitle({
					title: '刮刮乐'
				})
			}
			// 刮刮乐页面传递过来的参数	结束
			_self.state = common.getstate();


			let initCoupon = await _self.GetYHQ();
			// 自主选择优惠券
			console.log('options.yhq', options.yhq)
			if (!!options.yhq) {
				_self.THISYHQ = JSON.parse(options.yhq);
			} else if (initCoupon.length > 0) { // 进入购买也默认优惠券
				_self.THISYHQ = initCoupon[0];
			}
			/* 判断 _self.moreRandom 是否为真，为真则是从 随机定投过来的，下面代码
			 *			不用再执行
			 *		  直接弹窗 提醒用户选择方式 或者 选择外送地址
			 */
			if (options.totalnum) _self.par = JSON.parse(options.totalnum);
			for (var i = 0; i < _self.par.length; i++) {
				var _num = [],
					flagArr = [], //彩票 flagRed flagRed 两个字符串组成的数组，渲染用
					flagRed = '', //彩票 红球组成的字符串，没有逗号隔开的，渲染用
					flagBlue = '', //彩票 蓝球组成的字符串，没有逗号隔开的，渲染用
					red = '', //彩票 红球组成的字符串，逗号隔开的，传后台用	
					blue = ''; //彩票 蓝球组成的字符串，逗号隔开的，传后台用	
				var _rednum = [], //彩票 红球组成的数组
					_bluenum = []; //彩票 蓝球组成的数组
				_self.par[i].num.forEach((ele, ind) => {
					if (ele.name == 'red') {
						_self.type == 2 ? (ind == _self.par[i].num.length - 1 ? _rednum.push(ele.num) : _rednum.push((ele.num + "~"))) :
							_rednum.push(ele.num);
					} else {
						_bluenum.push(ele.num);
					}
				});
				red = _rednum.join(',');
				blue = _bluenum.join(',');
				flagRed = _rednum.join(' ');
				flagBlue = _bluenum.join(' ');
				flagArr.push({
					num: flagRed,
					name: 'red'
				})
				_num.push({
					num: red,
					name: 'red'
				});
				if (!!blue) {
					_num.push({
						num: blue,
						name: 'blue'
					});
					flagArr.push({
						num: flagBlue,
						name: 'blue'
					});
				}
				//_self.num.push(_num);
				// 用户点击确认时的提醒弹窗渲染数据 开始
				if (_self.type == 1) { // 双色球 玩法
					_self.str += '第' + (i + 1) + '组 红球 ' + flagRed + ' 蓝球 ' + flagBlue + "\n";
				} else if (_self.type == 3) { // 七乐彩 玩法
					_self.str += '第' + (i + 1) + '组 红球 ' + flagRed + "\n";
				} else { // 3D 玩法
					if (_self.types == 1) { // 3D 直选
						let comArr = _self.par[i].num;
						let bai = ' 百位 ' + comArr[0].num.split('').join('、');
						let shi = ' 十位 ' + comArr[1].num.split('').join('、');
						let ge = ' 个位 ' + comArr[2].num.split('').join('、');
						_self.str += '第' + (i + 1) + '组' + bai + shi + ge + "\n";
					} else { // 3D 直选 以外的玩法
						_self.str += '第' + (i + 1) + '组' + flagRed + "\n";
					}
				}
				// 用户点击确认时的提醒弹窗渲染数据 结束
				_self.total += parseInt(_self.par[i].price);
				// 准备 以后 只算单注价格*倍数，不算定投
				_self.danPrice += parseInt(_self.par[i].price);
				
				_self.saveNum.push({
					types: _self.par[i].types, // 每一组彩票的 玩法		
					flagRender: flagArr,
					caipiao: _num,
					dingtou: 1,
					beishu: 1,
					price: _self.par[i].price,		// 单注价格
					red: red,
					blue: blue
				})
			}
			_self.total -= _self.THISYHQ.FaceValue; // 有优惠券，总价减去优惠券后的价格
			if (_self.total < 0) _self.total = 0
			uni.removeStorageSync('outlets')
			_self.getAdress();
			// _self.getWangdian();
			_self.hasAddress();
			// 判断是否有 缓存 网点、旗舰店
			_self.hasStorage(_self.current);
			
		},

		async onShow() {
			
			var pages = getCurrentPages();
			var currPage = pages[pages.length - 1]; //当前页面

			_self.canClear = currPage.canClear;

			if (_self.canClear) _self.saveNum = [];

			let res = await _self.PromiseGetAdress()
			_self.adssList = res.data.rows;
			// 获取缓存的 current ++开始+++++++++++++++++++++++++
			let CURRENT = uni.getStorageSync("current") !== '' ? uni.getStorageSync("current") : '';
			if (CURRENT !== '') { // 存在，即表示是从 选择地址页面过来的
				_self.current = CURRENT;
				uni.removeStorageSync("current");
				if (_self.current == 1) {
					let outlets = uni.getStorageSync('outlets') || '';
					if (!!outlets) {
						_self.name = outlets.name;
						_self.id = outlets.id;
						_self.MemberId = outlets.juli;
					} else { // 表示 是从 选择地址页面过来，但是用户没有点击选择地址
						_self.hasAddress();
					}
				} else if (_self.current == 0 || _self.current == 2) {
					_self.hasStorage(_self.current);
				}
			} else { // 表示不是从 选择地址页面过来的 
				_self.hasAddress();
			}
			let backData = currPage.backData || '';
			if (backData.Address) {
				_self.name = backData.Address;
				_self.MemberId = backData.MemberID;
			}
			
		},
		onHide() {
			_self.canClear = false;
		},
		methods: {
			// 判断 网点 旗舰店 是否有缓存，有则取，没有则初始化
			hasStorage(current) {
				let storName = current == 0 ? 'wangdian' : 'flagshipStor';
				let wangdian = uni.getStorageSync(storName) || '';
				let latitude = parseFloat(wangdian.latitude)
				let longitude = parseFloat(wangdian.longitude)
				if (wangdian) {
					_self.wdTitle = wangdian.name;
					_self.waiId = wangdian.id;
					_self.juli = wangdian.juli;
					_self.address = wangdian.address;
					_self.wangdianObj = {
						F_latitude: latitude,
						F_longitude: longitude
					}
				} else {
					_self.getWangdian();
				}
			},
			// 刮刮乐弹窗
			showHappy() {
				_self.isShowHappy = true;
			},

			// 用户打开地图 搜索地址 为收货地址
			getShippingAddress() {
				return new Promise((resolve, reject) => {
					uni.chooseLocation({
						success(e) {
							resolve(e)
						},
						// 重新授权地理位置 开
						fail() {
							// #ifdef MP-WEIXIN
							uni.getSetting({
								success: function(res) {
									var statu = res.authSetting;
									if (!statu['scope.userLocation']) {
										uni.showModal({
											title: '是否授权当前位置',
											content: '需要获取您的地理位置，请确认授权，否则地图功能将无法使用',
											success(tip) {
												if (tip.confirm) {
													uni.openSetting({
														success: function(data) {
															if (data.authSetting["scope.userLocation"] === true) {
																uni.showToast({
																	title: '授权成功',
																	icon: 'success',
																	duration: 1000
																})
																//授权成功之后，再调用chooseLocation选择地方
																setTimeout(function() {
																	uni.chooseLocation({
																		success: (data) => {}
																	})
																}, 1000)
															}
														}
													})
												} else {
													uni.showToast({
														title: '授权失败',
														icon: 'none',
														duration: 1000
													})
												}
											}
										})

									}
								}
							})
							// #endif
						}
						// 重新授权地理位置 结束
					})
				})
			},


			// 点击定位图标获取地址详细信息
			async getLocation() {
				// 判断是 在地图查找 位置 为送货地址
				// if (_self.current == 1) {
				// 	let res = await _self.getShippingAddress()
				// 	console.log('地图查找 位置',res);
				// 	let index = res.address.indexOf('湖南省湘潭')
				// 	if(index == -1){
				// 		_self.showModal('您选择的地址不在湘潭');
				// 		return false;
				// 	}
				// 	setTimeout(()=>{
				// 		uni.navigateTo({
				// 			url: '../setadress/setAdress?current=' + _self.current + '&map=' + encodeURIComponent(JSON.stringify(res)),
				// 		})
				// 	},600)
				// } else { // 判断是 在地图查找 位置 为网点位置
				// 获取当前网点的 经纬度
				let {
					F_latitude,
					F_longitude
				} = _self.wangdianObj;
				F_latitude = parseFloat(F_latitude)
				F_longitude = parseFloat(F_longitude)
				// #ifdef H5
				let addressData = {
					latitude: F_latitude,
					longitude: F_longitude,
					name: _self.wdTitle,
					address: _self.address,
				}
				wxSdk.openlocation(addressData)
				// #endif
				// #ifdef MP-WEIXIN
				uni.openLocation({
					latitude: F_latitude,
					longitude: F_longitude,
					name: _self.wdTitle,
					address: _self.address,
					success() {},
					fail(err) {
						// console.log(err);
					}
				})
				// #endif

				// }
			},
			// 地址为空 或 是否有默认地址的判断
			hasAddress() {
				if (!_self.adssList.length) return _self.name = '添加地址';
				// 不是从 选择地址页面过来，先渲染默认地址	===========================================
				let index = _self.adssList.findIndex(item => {
					return item.Defaule == '1'
				})
				if (index != -1) {
					_self.name = _self.adssList[index].Address;
					_self.id = _self.adssList[index].ID;
					_self.MemberId = _self.adssList[index].MemberID;
				} else {
					_self.name = _self.adssList[0].Address;
					_self.id = _self.adssList[0].ID;
					_self.MemberId = _self.adssList[0].MemberID;
				}
			},
			// 订单不足100福豆，确认后关闭弹窗
			handleSure() {
				_self.isFull = false;
				_self.isShowHappy = false;
				_self.current = 0;
			},
			// 点击 网点地址或收货地址 跳转giveSelect页面
			goGiveSelect() {
				// 判断 current == 2 不能点击进入
				// if (_self.current == 2) return;
				// 其他跳转
				uni.navigateTo({
					url: '../giveSelect/giveSelect?current=' + _self.current
				})
			},
			selectcoupon() {
				uni.navigateTo({
					url: '../index/caijuan?par=' + JSON.stringify(_self.par) + '&type=' + _self.type
				})
			},
			GetYHQ() {
				return new Promise((resolve, reject) => {
					common.request({
						path: "Development/getcoupon",
						data: {
							state: 'dsy',
							memberid: _self.state.ID,
							page: 1,
							rows: 100
						},
						success: res => {
							console.log('优惠券接口', res);
							_self.youhuiquan = res.data.rows;
							resolve(res.data.rows);
						}
					});
				})
			},
			// 选择外送的网点
			handleSelect() {
				uni.navigateTo({
					url: '../giveSelect/giveSelect?id=1',
				});
			},
			// 获取网点
			getWangdian() {
				const {
					latitude,
					longitude
				} = uni.getStorageSync("jingwei");
				common.request({
					path: "Order/getoutlets",
					data: {
						name: "",
						longitude,
						latitude,
						rows: 1,
						// biaoshi:1,// 1 为普通 2 为旗舰
						page: 1,
						sidx: "",
						sord: ""
					},
					success: res => {
						// 判断到底要获取全部网点_self.current == 0 还是 只获取旗舰店_self.current == 2
						console.log('let stor = res.data.rows',res.data.rows);
						let stor = res.data.rows;
						if (_self.current == 2) {
							stor = res.data.rows.filter(item => {
								return item.F_ParentId === '0';
							})
						}
						let index;
						// 获取 初始化 时的当前网点对象
						_self.wangdianObj = stor[0];
						stor.forEach(elem => {
							if (elem.distance != null) {
								index = elem.distance.indexOf(".");
								elem.distance = elem.distance.slice(0, index + 2);
							}
						})
						_self.wdTitle = stor[0].F_FullName;
						_self.juli = stor[0].distance;
						_self.waiId = stor[0].F_CompanyId;
						_self.address = stor[0].F_Address;
					}
				})
			},
			// Promise封装 GetAdress
			PromiseGetAdress() {
				return new Promise((resolve, reject) => {
					common.request({
						path: "Development/getaddress",
						data: _self.state.ID,
						success: res => {
							try {
								resolve(res);
							} catch {
								reject(res)
							}
						}
					});
				})
			},
			//获取 送货地址
			getAdress() {
				common.request({
					path: "Development/getaddress",
					data: _self.state.ID,
					success: res => {
						if (res.data.rows.length > 0) {
							_self.name = res.data.rows[0].Address;
							_self.id = res.data.rows[0].ID;
							_self.adssList = res.data.rows;
						} else {
							// _self.name = ""
							_self.adssList = []
						}

					}
				});
			},
			// Promise 封装购买时的 uni.showModal
			cityShowModal(city) {
				return new Promise((resolve, reject) => {
					if (city != '湘潭市') {
						uni.showModal({
							title: '提示',
							content: '您不在湘潭市，暂时无法模拟选号',
							showCancel: false,
							success(e) {
								if (e.confirm) {
									resolve(false);
								}
							},
							fail(err) {
								reject(err);
							}
						})
					} else {
						resolve(true)
					}
				})
			},
			// Promise 封装 获取 当前欲购彩票是否在 允许购买的时间段内
			inBuyTime() {
				return new Promise((resolve, reject) => {
					common.request({
						path: 'Order/judgetime',
						data: _self.type,
						success: (res) => {
							console.log('qishujiabujia', res)
							if (res.info == '1' || res.info == '0') {
								resolve(res.info)
							} else {
								resolve('3')
							}
						},
						fail: (err) => {
							reject('3')
						}
					})
				})
			},
			// 根据 _self.type 给请求参数 Number 赋值 即将开奖的期数
			getQiShu(type) {
				if (type == '1') { // 双色球
					return _self.newQiShu.shuangseqiu;
				} else if (type == '2') { // 福彩3D
					return _self.newQiShu.threed;
				} else { // 七乐彩
					return _self.newQiShu.qilecai;
				}
			},
			// 实时获取 余额等信息
			getMenberInfo() {
				return new Promise((resolve, reject) => {
					common.request({
						path: 'Development/getmember',
						data: _self.ID,
						success: res => {
							resolve(res);
						},
						fail: err => {
							reject(err);
						}
					})
				})
			},
			// 点击购买
			async handleBuy() {
				// 实时更新 余额等 Balance
				let menberInfo = await _self.getMenberInfo()
				_self.state.Balance = menberInfo.data.member.Balance;
				// #ifdef H5
				// 测试人员不需要判断 位置 开始
				let phoneList = ['15084968801', '18592701479','18932181335', '15073163280', '15974242945', '15868879789', '18890395500']
				let testPhone = (uni.getStorageSync('userinfo')).mobile
				let index = phoneList.findIndex((item) => {
					return testPhone == item
				})
				// 测试人员不需要判断 位置 结束
				// H5判断在不在湘潭 开始
				if (index == -1) { // index == -1 表示不是测试人员
					common.request({
						path: 'login/getcode',
						method: 'GET',
						data: encodeURIComponent(location.href.split('#')[0]),
						success(res3) {
							console.log('ticket', res3)
							let signPackage = res3.data;

							function isTrueCity(res1) {
								let {
									latitude,
									longitude
								} = res1;
								common.request({
									path: 'Order/getaddress',
									data: {
										latitude,
										longitude
									},
									success: (result) => {
										console.log('result', result);
										console.log('城市', result.data.openinfo.result.address_component.city)
										let city = result.data.openinfo.result.address_component.city;
										if (city != "湘潭市") {
											uni.showModal({
												title: '提示',
												content: '您不在服务区范围内',
												showCancel: false,
												success(res2) {
													if (res2.confirm) {
														jweixin.closeWindow(); // 不在湘潭，退出网页，进入公众号会话s
														return false;
													}
												}
											})

										}
									}
								})
							}
							wxSdk.getlocation(signPackage, isTrueCity)
						},
						fail(err) {
							console.log('bbbb', err);
						}
					})
				}
				// H5判断在不在湘潭 结束
				// #endif
				// #ifdef MP-WEIXIN
				// 购买时不再湘潭市 不允许购买
				if (index == -1) { // index == -1 表示不是测试人员
					let cityNow = await common.getCity();
					let flagCity = await _self.cityShowModal(cityNow)
					if (!flagCity) {
						uni.showModal({
							title: '提示',
							content: '您不在服务区范围内',
							showCancel: false,
							success(res2) {
								if (res2.confirm) {
									// 直接退出小程序
								}
							}
						})
					}
				}
				// #endif
				/**  判断在不在允许购买的时间内
				 * timeFlag 最后 值是'1',则证明 没有进入 选择是否购买成下一期的判断
				 * timeFlag 最后 值是'true',则证明 进入了 选择是否购买成下一期的判断，并同意购买成下一期，参数
				 **/
				let timeFlag = '1';
				timeFlag = await _self.inBuyTime();
				if (timeFlag == '3') {
					uni.showToast({
						title: '网络不佳，请稍后再试'
					})
					return false;
				}
				console.log('aaaaaaaaaaaa',timeFlag)
				if (timeFlag === '0') {
					timeFlag = await _self.showModal('提示', '您选择的彩票已超过本期投注时间，请问是否投注为下一期彩票', 'none', true)
					if (timeFlag === false) {
						return false;
					}
				}
				// 外送不够100弹框不能外送
				_self.tabs.forEach(elem => {
					if (elem.isActive) {
						_self.delivery = elem.name
					}
				});

				_self.delivery = _self.type == 4 ? '到家' : _self.delivery;
				if (_self.delivery == '到家' && _self.total < 100) {
					_self.showModal('提示', '您选择的总额不足100福豆')
					return false;
				}

				// 确认购买提示
				let title = _self.type == 4 ? "请确认您选择的刮刮乐" : "请确认您选择的号码";
				let str = _self.type == 4 ? _self.happyObj.Tite : _self.str;
				
				// showModal(title = '', content = '', icon = 'none', showCancel = false) 
				
				let remindStr = await _self.showModal(title,str,'none',true) // 提示 确认彩票号码
				if(!remindStr) return false;
				if (_self.current == 1 && _self.wdTitle == undefined) {
							uni.showToast({
								title: '请选择到家网点',
								icon: 'none',
								image: '',
								duration: 1500,
								mask: true,
							});
							return;
						}
				
						let buyList = [];
						
						// 判断 是否是 刮刮乐，刮刮乐的buyList需要单独处理
						if (_self.type != 4) {
							let qishu;
							// 给参数 期数 Number 赋值，判断是否 +1，如果timeFlag === true,则 +1
							if (timeFlag === true) {
								qishu = parseInt(_self.getQiShu(_self.type)) + 1;
							} else {
								qishu = parseInt(_self.getQiShu(_self.type));
							}
							for (var i = 0; i < _self.saveNum.length; i++) {
								buyList.push({
									Number: qishu, // 传入购买的期数
									// ProductName:elem.money,
									// types: _self.types, // 表示 直选 还是 组选等玩法
									types: _self.saveNum[i].types, // 表示每组彩票 直选 还是 组选等玩法
									RedBall: _self.saveNum[i].red, //红球
									BlueBall: _self.saveNum[i].blue, //蓝球
									FixedState: '1', //定投状态
									Fixed: parseInt(_self.saveNum[i].dingtou), //定投第几期
									// Fixed, //定投第几期
									Multiple: _self.saveNum[i].beishu, //倍数
									Price: _self.saveNum[i].price,
								});
							}
						} else {
							let Price = parseInt(_self.happyObj.Typs);
							buyList.push({
								Num: _self.happyNum, // 刮刮乐 数量
								// ProductName:elem.money,
								// types: _self.types, // 表示 直选 还是 组选等玩法
								FixedState: '1', //定投状态
								// Fixed, //定投第几期
								Price, //	单张刮刮乐的价格
								ProductName: _self.happyObj.Tite, // 刮刮乐名字
								ProductID: _self.happyObj.ID, // 刮刮乐 ID
							});
						}
						switch (_self.delivery) {
							case '自提':
								_self.delivery = '1'
								break;
							case '到家':
								_self.delivery = '2'
								break;
							case '托管':
								_self.delivery = '3'
								break;
						}
						let number = _self.type == 4 ? _self.happyNum : _self.saveNum.length;

						if (_self.delivery == '2') {	// 外送 选择默认旗舰店
							_self.waiId = await _self.getFlagshipId();
						}
						
						common.request({
							path: 'Order/addorder',
							data: {
								// suiji: _self.suiji,	// 随机定投 判断字段
								Product: "goumai",
								Number: _self.saveNum.length, //注数 已单独处理 _self.type == 4 的情况
								MemberID: _self.state.ID, // 用户ID
								Self_Delivery: _self.delivery, //外送或自提 刮刮乐没有其他选项，只有自提的网点会显示，所以不用处理
								Price: _self.total, //总价格		不用处理
								danPrice:_self.danPrice,// 不算 定投 的价格
								LotteryType: _self.type, //彩种	不用处理
								list: buyList, // 已单独做 _self.type == 4 的情况
								DeductionAmount: _self.THISYHQ.FaceValue, //抵扣金额
								OutletsID: _self.waiId, // 网点ID 
								CouPonID: _self.THISYHQ.ID, // 优惠券ID
								AddressID: _self.id, // 送货地址ID
							},
							success: res => {
								console.log('购买成功');
								if (_self.state.Balance < _self.total) {
									// if (_self.state.Balance < 100000) {
									uni.showModal({
										title: '操作成功',
										content: '您的福豆不足，请至福彩到家线下网点获取福豆。',
										showCancel: true,
										cancelText: '取消',
										confirmText: "查看网点",
										success(j) {
											if (j.confirm) {
												uni.navigateTo({
													url: '../giveSelect/giveSelect?current=0&from=buy'
												})
											} else if (j.cancel) {
												uni.navigateBack({
													delta: 1
												})
												
											}
										_self.saveNum = [];
										}
									})
								} else {
									//更新缓存在本地的会员余额数据
									_self.state.Balance = _self.state.Balance - _self.total;
									common.setstate(_self.state);
									uni.showToast({
										title: res.info,
										icon: 'none',
										duration: 1500,
										mask: true,
									});
									uni.navigateTo({
										url: '../order/myOrder?id=2&order=frombuy'
									});
								}
							},
							fail(err) {
								console.log('购买错误', err);
							}
						})
						//}
					
					
			},
			// 请求 到家默认旗舰店网点ID   promise
			getFlagshipId(){
				const {
					latitude,
					longitude
				} = uni.getStorageSync("jingwei");
				return new Promise((resolve,reject)=>{
					common.request({
						path: "Order/getoutlets",
						data: {
							name: "",
							longitude,
							latitude,
							biaoshi:2,// 1为普通 2为旗舰 不传为所有
							rows: 1,
							page: 1,
							sidx: "",
							sord: ""
						},
						success: addressRes => {
							// 旗舰店ID
							console.log('旗舰店',addressRes.data.rows[0].F_CompanyId)
							resolve(addressRes.data.rows[0].F_CompanyId)
						},
						fail:(err)=>{
							reject(err)
						}
					})
				})
			},
			// uni.showModal 异步改同步封装
			showModal(title = '', content = '', icon = 'none', showCancel = false) {
				return new Promise((resolve, reject) => {
					uni.showModal({
						title: title,
						content: content,
						icon,
						showCancel,
						success(e) {
							if(e.confirm){
								resolve(true)
							}else if(e.cancel){
								resolve(false)
							}
						},
						fail(err) {
							reject(err)
						}
					})
				})
			},
			// 自提分段器 点击改变 分段器 active 
			async handleChild(e) {
				// 外送不够100弹框不能外送
				if (e == 1 && _self.total < 100) {
					let res = await _self.showModal('提示', '您选择的商品不足100福豆')
					if (res) return false;
				}
				_self.tabs.forEach(element => {
					element.id === e ?
						(element.isActive = true) :
						(element.isActive = false);
				});
				_self.current = e;
			},
			// 点击加减定投的期数 happyNum
			handleDingtou(i, num) {
				if (_self.type == 4) {
					if (_self.happyNum == 1 && num < 1) return;
					_self.happyNum += num
					_self.total = _self.happyObj.Typs * _self.happyNum
					return;
				}
				if (num == -1) {
					_self.saveNum.forEach((elem, index) => {
						if (i == index && elem.dingtou > 1) {
							elem.dingtou--;
							_self.getTotal();
						}
					})
				} else {
					_self.saveNum.forEach((elem, index) => {
						if (i == index) {
							elem.dingtou++;
							_self.getTotal();
						}
					})
				}
			},
			// 点击加减彩票的倍数
			handleBeishu(i, num) {
				if (num == -1) {
					_self.saveNum.forEach((elem, index) => {
						if (i == index && elem.beishu > 1) {
							elem.beishu--;
							_self.getTotal();
						}
					})
				} else {
					_self.saveNum.forEach((elem, index) => {
						if (i == index) {
							elem.beishu++;
							_self.getTotal();
						}
					})
				}
			},
			// 获取总价
			getTotal() {
				_self.total = 0;
				_self.danPrice = 0;
				_self.saveNum.forEach((elem, index) => {
					_self.total += (elem.price * elem.dingtou) * elem.beishu;
					_self.danPrice += elem.price * elem.beishu
				});
				if (_self.THISYHQ) {
					_self.total -= _self.THISYHQ.FaceValue;
				}
				if (_self.total < 0) _self.total = 0;
			},
			// 用来显示在彩票的 最上端
			getTypeName(_id) {
				switch (_id) {
					case '1':
						return '双色球';
					case '2':
						return '福彩3D';
					case '3':
						return '七乐彩';
					case '4':
						return '刮刮乐';
					default:
						return '';
				}
			},
		},
		watch: {
			current(val) {
				if (val == 0 || val == 2) {
					_self.hasStorage(val); // 判断是否有缓存网点、 旗舰店
				}
			}
		},
	}
</script>
<style lang="scss" scoped>
	.select-order {

		.wangdian {
			padding: 20rpx 30rpx;

			.wangdian-title {
				font-size: 30rpx;
			}

			.wangdian-text {
				color: blue;
			}
		}

		.select {
			border: 1rpx solid #eee;
			box-shadow: 2rpx 2rpx #ddd;
			background-color: #FFFFFF;
			width: 96%;
			margin: 0 auto;
			border-radius: 20rpx;

			.select-adress {
				width: 90%;
				margin: 20rpx auto 0;
				display: flex;
				justify-content: space-between;
				padding: 20rpx 20rpx;

				.tabs {
					width: 300rpx;
					height: 50rpx;
				}

				.tidai_iconfont {
					width: 65rpx;
				}

				.iconfont {
					flex: 1;
					color: #999;
					text-align: center;
					line-height: 60rpx;
				}

				.adress-title {
					margin-left: 10rpx;
					flex: 3;
					display: flex;
					flex-direction: column;
					justify-content: center;

					.adress-title-top {
						text-overflow: -o-ellipsis-lastline;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 1;
						-webkit-box-orient: vertical;
					}

					.adress-title-name {
						word-break: break-all;
						-webkit-line-clamp: 2;
					}

					.adress-title-bottom {
						font-size: 24rpx;
						color: #999;
					}

					.adress-title-text {
						color: $color;
						font-size: 24rpx;
						margin-top: 5rpx;
					}
				}

				.adress-btn {
					width: 260rpx;
					height: 60rpx;
					background-color: $color;
					border-radius: 30rpx;
					display: flex;
					justify-content: space-around;
					align-items: center;
					line-height: 60rpx;
					color: #fff;

					.btn-ziti {
						width: 80rpx;
						height: 55rpx;
						background-color: #fff;
						color: $color;
						text-align: center;
						border-radius: 25rpx;
					}
				}
			}

			// 刮刮乐
			.happy_title {
				width: 80%;
				justify-content: flex-start;
				margin: 0;
			}

			// 刮刮乐

			.detail {
				width: 100%;
				margin-top: -10rpx;

				.detail_address {
					padding: 0 0 20rpx 130rpx;
					font-size: 22rpx;
					color: #666666;
				}
			}
		}

		.select-order-content {
			position: relative;
			width: 90%;
			margin: 20rpx auto 0;

			.order-bg {}

			.order-info {

				position: absolute;
				top: 40rpx;
				width: 80%;
				left: 50%;
				transform: translateX(-50%);
				padding: 20rpx;

				.order-info-title {
					text-align: center;
					font-weight: bold;
					font-size: 34rpx;
				}

				.order-num-wrap {
					margin-top: 20rpx;
					height: 330rpx;
					overflow-y: scroll;

					.order-info-num {
						.info_num_content {
							display: flex;
							justify-content: space-around;
							font-size: 24rpx;
							color: #999;

							.btn2 {
								margin-left: 20rpx;
							}

							.order-footer-btn {
								display: flex;
								text-align: center;
								margin-top: 10rpx;
								justify-content: center;
								align-items: center;

								.buy_wrap {
									width: 160rpx;
									height: 40rpx;
									border: 2rpx solid #eee;
									display: flex;
									justify-content: space-between;
									margin: 0 10rpx;

									.buy_text {
										display: block;
										width: 50rpx;
										border-right: 1rpx solid #ddd;
										border-left: 1rpx solid #ddd;
										line-height: 40rpx;
										margin: 0;
									}

									button {
										flex: 1;
										height: 40rpx;
										line-height: 40rpx;
										border-radius: 0rpx;
									}

									button::after {
										border: 0;
									}
								}

								// 刮刮乐 开始
								.happy_wrap {
									margin: 0 30rpx;
								}

								// 刮刮乐 结束
							}
						}

						.info-num-item {
							color: $color;
							display: flex;
							flex-wrap: wrap;
							margin-top: 20rpx;

							text {
								display: block;
								margin-left: 20rpx;
							}
						}

						.qiu-color {
							color: blue;
						}

						.info-num-multiple {
							margin-left: 20rpx;
							letter-spacing: 4rpx;
							color: #666;
						}




					}
				}


			}
		}

		.select-order-footer {
			position: fixed;
			bottom: 0;
			width: 100%;
			height: 100rpx;
			display: flex;

			.footer-info {
				flex: 1;
				background-color: #eee;
				text-align: center;
				font-weight: bold;

				.footer-price {
					letter-spacing: 4rpx;
					margin-top: 10rpx;
					line-height: 100rpx;
				}
			}

			.footer-btn {
				width: 180rpx;
				background-color: $color;
				color: #fff;
				text-align: center;
				line-height: 100rpx;
			}
		}
	}

	.order-coupon {
		width: 100%;
		height: 90rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;

		.coupon {
			width: 500rpx;
			display: flex;
			flex-direction: row;
			align-items: center;

			image {
				height: 36rpx;
				width: 36rpx;
				margin-right: 10rpx;
			}
		}

		.selectcoupon {
			width: 500rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: flex-end;

			text {
				margin-right: 20rpx;
				color: #999;
			}

			image {
				height: 24rpx !important;
				width: 13rpx;
			}
		}

		.happy_coupon {
			width: 100%;
			justify-content: center;
			font-size: 34rpx;
		}
	}


	/*弹出框提示 */

	.toast_box {
		background-color: rgba(22, 33, 55, .4);
		position: fixed;
		width: 100vw;
		height: 100vh;
		z-index: 10;
		top: 0;

		.toast_box_item {
			border-radius: 20rpx;
			// 
			width: 80%;
			height: 30%;
			margin: 50vh auto;
			background-color: #fff;
			// 
			transform: translateY(-50%);
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.toast_text {
				letter-spacing: 4rpx;
				font-size: 34rpx;
				color: #666;
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: center;

				.toast_text_item {
					margin-bottom: 10rpx;
				}

				.toast_text_happy {
					width: 600rpx;
					height: 262rpx;
					text-align: center;
					margin: 0;
					box-sizing: border-box;
					-webkit-box-sizing: border-box;

					view {
						padding: 40rpx 20rpx;
					}
				}
			}

			.toast_btn {
				margin-top: 30rpx;
				border-top: 1rpx solid #e5e5e5;
				display: flex;
				letter-spacing: 4rpx;
				justify-content: space-between;
				font-size: 30rpx;
				color: #586985;

				.toast_btn_item {
					padding: 30rpx 0;
					flex: 1;
					text-align: center;
				}
			}

			.toast_happy {
				margin-top: 0;
			}
		}
	}
</style>
