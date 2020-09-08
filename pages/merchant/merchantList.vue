<template>
	<view class="rider-list">
		<view class="header">
			<view class="black" @click="handleBlack">返回登录</view>
			<view class="title">站长</view>
			<view class="setup" @click="handleSet">密码修改</view>
		</view>
		<view class="title">{{FullName}}</view>
		<view class="circle">
			<view class="circle_img">
				<image class="img_A" src="https://fucai.yiruit.com/UpFiles/tupian/crice.png" mode=""></image>
				<view class="circle_title" @click="handleSao">
					<image class="img_B" src="https://fucai.yiruit.com/UpFiles/tupian/sao.png" mode="aspectFill">
						<view class="title">扫一扫</view>
				</view>
			</view>
		</view>
		<view class="btnList">
			<view class="btn_img">
				<text>{{Balance}}</text>
			</view>
			<view class="btn_img" @click="handleMemberList('memberHistory')">
				<text>余额明细</text>
			</view>
		</view>

		<view class="btn">
			<view class="btn_img" @click="handleMember">
				<text>会员</text>
			</view>
			<view class="btn_img" @click="handleMemberList('collectRecords')">
				<text>领取记录</text>
			</view>
			<view class="btn_img" @click="handleStore">
				<text>站长</text>
			</view>
		</view>
		<view class="btn_dingdanAll">
			<view class="btn_dingdan" @click="handleDingdan">
				<text>查询编号</text>
			</view>
		</view>


		<!-- 弹框 -->
		<view class="background" v-if="isShow"></view>
		<view class="bag_img" v-if="isShow">
			<view class="bag_map">
				<view class="bag_btn" v-if="huiyuan === 1">会员</view>
				<view class="bag_btn" v-else-if="huiyuan === 2">站长</view>
				<view class="bag_btn" v-else-if="huiyuan === 3">查询编号</view>
				<view class="bag_btn" v-else>修改密码</view>
				<!-- 商家给会员充值 -->
				<view class="bag_width" v-if="huiyuan === 1">
					<view class="bag_item">
						<image src="../../static/mine/iphone.png" mode="widthFix"></image>
						<view class="inputAll">
							<input type="text" placeholder="请输入会员手机号" v-model="iPhone" maxlength="11">
						</view>
					</view>
					<view class="bag_item">
						<image src="../../static/mine/jine.png" mode="widthFix"></image>
						<view class="inputAll"><input type="text" placeholder="请输入会员充值金额" v-model="money"></view>
					</view>
				</view>
				<!-- 商家自己充值 -->
				<view class="bag_width" v-else-if="huiyuan === 2">
					<view class="bag_item">
						<!-- <image src="../../static/mine/jine.png" mode="widthFix"></image> -->
						<view class="inputAll bag_alone">福豆：<input type="text" placeholder="请输入充值金额" v-model="money"></view>
					</view>
				</view>
				<!-- 输入订单号 -->
				<view class="bag_width" v-else-if="huiyuan === 3">
					<view class="bag_item">
						<view class="inputAll"><input type="text" placeholder="请输入订单号" v-model="dingdan"></view>
					</view>
				</view>
				<!-- 账号设置/ 密码修改 -->
				<view class="bag_width" v-else>
					<view class="bag_item">
						<view class="inputAll"><input type="number" password maxlength="12" placeholder="请输入6-12位最新密码" @blur='passwordInput' v-model="password"></view>
					</view>
					<view class="bag_item">
						<view class="inputAll"><input type="number" password maxlength="12" placeholder="再次输入密码" @blur='passwordMsgInput' v-model="passwordMsg"></view>
					</view>
				</view>
				<view class="bag_btn">
					<view class="close" v-if="huiyuan === 1" @click="handleConfirm">确定充值</view>
					<view class="close" v-else-if="huiyuan === 2" @click="handleStoreConfirm">确定充值</view>
					<view class="close" v-else-if="huiyuan === 3" @click="handleDingdanConfirm">查询</view>
					<view class="close" v-else @click="handleSetConfirm">确定修改</view>
					<view class="close" @click="handleClose">{{huiyuan===1 || huiyuan===2 ? '取消充值' : '取消'}}</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import common from '../../common/common'
	// #ifdef H5
	var wx = require('jweixin-module');

	// #endif
	var _self;
	export default {
		data() {
			return {
				iPhone: '',
				money: '',
				FullName: '',
				isShow: false,
				huiyuan: 1,
				Balance: '',
				userInfo: '',
				dingdan: '',
				password: '',
				passwordMsg: ''
			};
		},
		onLoad() {
			_self = this;
			_self.getRuderlist()
			// #ifdef H5
			_self.getConfig()
			// #endif
		},
		methods: {
			// 使用微信 js-sdk 的时候，都需要通过config接口注入权限验证配置。所以需要先调用后台接口获取config配置：
			getConfig() {
				common.request({
					path: 'login/getcode',
					method: 'GET',
					data: encodeURIComponent(location.href.split('#')[0]),
					success(res) {
						wx.config({
							debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来,测试完成后需要关闭。
							appId: 'wxeb23f51daa27076e', // 必填，公众号的唯一标识
							timestamp: res.data.timestamp, // 必填，生成签名的时间戳
							nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
							signature: res.data.signature, // 必填，签名（加密后，下文有实现）
							jsApiList: ['scanQRCode', 'chooseWXPay'], // 必填，需要使用的JS接口列表，开发文档上有所有接口名称，根据需要选用就好。
						})
					},
					fail(err) {
						uni.showToast({
							icon: 'none',
							title: '请求失败',
							duration: 1500,
						})
					}
				})
			},
			handleSao() {
				// #ifdef H5	
				wx.ready(() => {
					wx.scanQRCode({
						needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
						scanType: ["qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
						success: (res) => {
							var resultQr = res.resultStr; // 当needResult 为 1 时，扫码返回的结果	 订单编号	
							let {
								F_CompanyId
							} = uni.getStorageSync("riderinfo")
							if (resultQr) {
								common.request({
									path: "UserOrder/getorder",
									method: "POST",
									data: {
										ordernumber: resultQr, //  '200818001100001',  //订单编号
										outletsid: F_CompanyId //'48b2d1a0-c86c-4eb9-95d8-e2cfe054e1d2'   //F_CompanyId // 网点id
									},
									success: result => {
										if (Object.keys(result.data).length !== 0) {
											uni.navigateTo({
												url: './merchantHistoryDetails?waitList=' + encodeURIComponent(JSON.stringify(result.data))
											})
										} else {
											uni.showToast({
												title: result.info,
												icon: 'none',
												duration: 1500,
												mask: true,
											});
											_self.dingdan = ''
										}
									}
								})

							} else {
								uni.showToast({
									icon: 'none',
									title: '订单号错误',
									duration: 1500,
								});
							}
						},
						fail: () => {

						}
					})
				})
				// #endif	

				// #ifdef MP-WEIXIN				
				uni.scanCode({
					success: function(res) {
						if (res.result) {
							uni.navigateTo({
								url: './merchantInfo?orderid=' + res.result
							})
						}
					},
					fail() {
						uni.showToast({
							title: '扫码失败,请重新扫码',
							icon: 'none',
							duration: 1500,
							mask: true,
						})
					}
				})
				// #endif
			},
			getRuderlist() { // 获取商家信息  
				let {
					F_CompanyId
				} = uni.getStorageSync("riderinfo")
				common.request({
					path: "UserOrder/getprice",
					data: F_CompanyId,
					success: res => {
						_self.FullName = res.data.F_FullName;
						_self.Balance = res.data.Balance
					}
				})
			},
			handleBack() {
				uni.redirectTo({ // 商家登录页面
					url: '../login/merchantLogin'
				});
			},
			handleMember() { // 会员充值
				_self.isShow = true;
				_self.huiyuan = 1;
				_self.iPhone = '';
				_self.money = ''
			},
			handleStore() { // 商家充值
				_self.isShow = true;
				_self.huiyuan = 2
			},
			handleMemberList(url) {
				uni.navigateTo({
					url: url
				})
			},
			handleDingdan() { // 订单查询
				_self.isShow = true;
				_self.huiyuan = 3
			},
			handleBlack() { // 返回登录
				uni.reLaunch({
					url: '../login/merchantLogin'
				});
			},
			handleSet() { // 账号的设置
				_self.isShow = true
				_self.huiyuan = 4
			},
			passwordInput() { // 密码的验证
				if (_self.password.length >= 6 && _self.password.length <= 12) {

				} else {
					uni.showToast({
						icon: 'none',
						title: '请输入6-12位密码',
						duration: 1500,
					})
					_self.password = '';
					_self.passwordMsg = ''
				}
			},
			handleSetConfirm() { // 密码修改
				if (!_self.password && !_self.passwordMsg) {
					uni.showToast({
						icon: 'none',
						title: '密码不能为空',
						duration: 1500,
					})
					return
				}
				if (_self.password === _self.passwordMsg) {
					let {
						F_UserId
					} = uni.getStorageSync("riderinfo")
					uni.showModal({
						title: '提示',
						content: '确定修改密码',
						success: function(res) {
							if (res.confirm) {
								common.request({
									path: "UserOrder/updatepassword",
									data: {
										id: F_UserId, //'04163421-f9aa-452a-ba56-e878a1d571b5',   // 用户id F_UserId,
										password: _self.password
									},
									success: res => {
										if (res.code === 200) {
											_self.isShow = false
											_self.password = '';
											_self.passwordMsg = '';
											uni.showToast({
												icon: "none",
												title: "修改成功"
											})
											uni.reLaunch({
												url: '../login/merchantLogin'
											})
										}
									}
								})
							}
						},
						fail() {
							_self.isShow = false
						}
					})
				} else {
					uni.showToast({
						icon: 'none',
						title: '密码不一致',
						duration: 1500,
					})
				}
			},
			passwordMsgInput() { // 密码的再次输入
				if (_self.password !== _self.passwordMsg) {
					uni.showToast({
						icon: 'none',
						title: '密码不一致,请重新输入',
						duration: 1500,
					})
					_self.passwordMsg = ''
				}
			},
			handleStoreConfirm() { // 商家充值		

				let openID = uni.getStorageSync('userforlogin') != '' ? uni.getStorageSync('userforlogin').openId : uni.getStorageSync(
					'userinfo').openId

				let {
					F_CompanyId,
					F_UserId
				} = uni.getStorageSync("riderinfo")
				
				console.log('openID',openID);
				console.log('F_CompanyId',F_CompanyId);
				console.log('F_UserId',F_UserId);
				if (_self.money) {
					common.request({
						path: "payment/getpayment",
						data: {
							amount: _self.money, //金额
							remark: '商家充值', //描述
							openid: openID, //用户openid
							// openid : 'owrext-AIGRNvrUcCh36CTnbiMR8', //用户openid
							companyid: F_CompanyId, //网点ID		
							memberid: "",
							reviewerid: F_UserId, // 操作充值的商家人员userid
						},
						success: res => {
							console.log('商家充值', res)
							wx.ready(() => {
								wx.chooseWXPay({
									/*
									{"code":200,"info":"响应成功","data":{"appId":"wxfcd7e94afb22cd1a","timeStamp":"1598928207","signType":"RSA","package":"prepay_id=wx011043270198681a237e96db47f0940000","nonceStr":"fa77292ef000484fae8d870f5456dc2d","paySign":"i7iC8UIPZOVY8aBK+qwdoacz5UD0DXLizi9eqyB5bp+k2ImduAG4FlhDpLG3SXj0CMaNBijlopTPm51sbzT6jXELI+XPDkFCNx0ndAksdHyyH3p7e1gR2vw8SlQ98Ddjf9FChXf+ThqpBNIhxXTd67S8uz2LKwUMAKBichleBAao0hWuWHZLnPOXLuE+HoJMLT9ocm/C05ql9G7mH8rP/o6eiKj8jlh/rJ0AsAsa+QK5/Uft0kO6mV7FG91ytEiFSYH9xPhdm1F8RANzuNVleM0jSCAOVwpRFxETfd3aKPq5LbOUOth0G3t/ARBZ3fRnyhJSqGJKhmNo0QJjAxsN+A=="}}
									*/
									timestamp: res.data.rows.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
									nonceStr: res.data.rows.nonceStr, // 支付签名随机串，不长于 32 位
									package: res.data.rows.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
									signType: res.data.rows.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
									paySign: res.data.rows.paySign, // 支付签名
									success: (res) => {
										// 支付成功后的回调函数 
										uni.showModal({
											title:'充值成功',
											showCancel:false,
											success:(resConfirm)=>{
												if(resConfirm.confirm){
													_self.isShow = false;
													_self.money = 0;
													_self.getRuderlist(); // 拉取商户信息
												}
											}
										})
									},
									fail: (err) => {
										// 支付失败后的回调函数
										uni.showModal({
											title:'支付失败，请稍后重试！',
											showCancel:false,
											success:(resConfirm)=>{
												if(resConfirm.confirm){
													_self.isShow = false;
													_self.money = 0;
												}
											}
										})
									}
								});
							})
						}
					})
				} else {
					uni.showToast({
						title: '请填写金额',
						icon: 'none',
						duration: 1500,
						mask: true,
					})
				}
			},


			handleConfirm() { // 会员充值 
				// 判断会员手机号格式是否正确
				if (!common.checkPhone(_self.iPhone)) {
					uni.showToast({
						icon: 'none',
						title: '请输入正确的手机号码',
						duration: 1500,
					})
					// _self.iPhone = ''
					return false;
				}
				common.request({ // 判断是否有该会员
					path: "login/selectphone",
					method: "GET",
					data: {
						mobile: _self.iPhone // 手机号
					},
					success: res => {
						if (Object.keys(res.data).length === 0) {
							uni.showToast({
								icon: 'none',
								title: '该会员不存在',
								duration: 1500,
							})
							// _self.iPhone = ''
							return false;
						}
					}
				})


				if (_self.iPhone && _self.money) {
					let {
						F_CompanyId
					} = uni.getStorageSync("riderinfo")
					let {
						F_UserId
					} = uni.getStorageSync("riderinfo")
					uni.showModal({
						title: '提示',
						content: '是否确认为' + _self.iPhone + '充值' + _self.money + '福豆?',
						success: function(res) {
							if (res.confirm) {
								common.request({
									path: "UserOrder/recharge",
									data: {
										companyid: F_CompanyId,
										amount: _self.money,
										userid: F_UserId,
										phone: _self.iPhone
									},
									success: res => {
										if (res.code === 200) {
											_self.isShow = false
											_self.getRuderlist()
											uni.showToast({
												icon: 'none',
												title: '充值成功',
												duration: 1500,
											});
										} else { // 余额不足  
											if (res.info.indexOf('会员')) {
												uni.showToast({
													icon: 'none',
													title: res.info + ';请先商家充值',
													duration: 1500,
												})
												setTimeout(() => {
													_self.money = '0.00'
													_self.huiyuan = 2;
												}, 1600)
											} else { // 会员手机号不正确
												uni.showToast({
													icon: 'none',
													title: res.info,
													duration: 1500,
												})
												_self.iPhone = ''
											}
										}
									}
								})
							}
						}
					})
				}
			},




			handleClose() { // 取消
				_self.isShow = false;
				_self.iPhone = '';
				_self.money = '';
				_self.dingdan = '';
				_self.password = '';
				_self.passwordMsg = ''
			},
			handleDingdanConfirm() { // 输入订单号
				let F_CompanyId = uni.getStorageSync("riderinfo").F_CompanyId;
				if (_self.dingdan) {
					common.request({
						path: "UserOrder/getorder",
						method: "POST",
						data: {
							ordernumber: _self.dingdan, //  订单编号,  200818001100001
							outletsid: F_CompanyId //'48b2d1a0-c86c-4eb9-95d8-e2cfe054e1d2'   //F_CompanyId       // 网点id
						},
						success: result => {
							if (Object.keys(result.data).length !== 0) {
								uni.navigateTo({
									url: './merchantHistoryDetails?waitList=' + encodeURIComponent(JSON.stringify(result.data))
								})
							} else {
								uni.showToast({
									title: result.info,
									icon: 'none',
									image: '',
									duration: 1500,
									mask: true,
								});
								_self.dingdan = ''
							}
						}
					})
				} else {
					uni.showToast({
						icon: 'none',
						title: '请输入订单号',
						duration: 1500,
					});
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	.rider-list {
		position: relative;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background-color: #ff3c36;

		>.header {
			height: 80rpx;
			background-color: #fff;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			padding: 0 40rpx;
			align-items: center;

			view {
				font-size: 40rpx;
				color: #333;
			}

			.black,
			.setup {
				font-size: 30rpx;
				color: #666;
			}
		}

		>.title {
			margin: 0 auto;
			font-size: 20px;
			color: #fff;
			padding: 70rpx 0 30rpx;
			text-align: center;
			font-weight: bold;
		}

		.bag_img {
			position: absolute;
			left: 48%;
			top: 12%;
			background-color: #FFFFFF;
			width: 500rpx;
			height: auto;
			margin: 0 auto;
			margin-left: -250rpx;
			margin-top: 200rpx;
			border-radius: 10rpx;
			box-shadow: 0px 0px 4px #999;
			z-index: 100;
			padding: 0 20rpx;

			.bag_map {
				width: 100%;
				height: auto;
				display: flex;
				flex-direction: column;
				align-items: center;
				overflow: hidden;

				.bag_item {
					width: 100%;
					height: 80rpx;
					line-height: 80rpx;
					overflow: hidden;
					display: flex;
					flex-direction: row;
					justify-content: flex-start;
					align-items: center;
					padding: 16rpx 0;
					border-bottom: 1px solid #eee;

					image {
						width: 50rpx;
						height: 50rpx;
						display: block;
						margin-right: 30rpx;
					}

					.inputAll {
						flex: 1;

						input {
							// width: 100%;
							height: 100%;
						}
					}
					.bag_alone {
						display: flex;
						align-items: center;
					}
				}

				.bag_width {
					width: 100%;
				}

				.bag_btn {
					width: 100%;
					height: 100rpx;
					line-height: 100rpx;
					overflow: hidden;
					display: flex;
					flex-direction: row;
					justify-content: space-around;
					font-size: 18px;
					color: #333;

					.close {
						flex: 1;
						color: #666;
						font-size: 16px;
						text-align: center;

						&:first-child {
							color: #ff3c36;
						}
					}
				}

			}
		}

		.nav {
			height: 10vh;
			display: flex;
			justify-content: space-between;
			flex-direction: row;
			background: #fff;
			color: #333;

			.blanck {
				width: 180rpx;
				background-color: red;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				padding-top: 10rpx;
			}

			.title {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: center;
				padding-top: 20rpx;
				margin-left: -160rpx;
			}
		}

		.circle {
			width: 100vw;
			height: auto;
			overflow: hidden;
			margin-top: 15rpx;

			.circle_img {
				position: relative;
				height: 540rpx;

				.img_A {
					width: 70%;
					height: 500rpx;
					position: absolute;
					top: 0px;
					left: 15%;
				}

				.circle_title {
					position: absolute;
					top: 160rpx;
					left: 270rpx;
					// margin: 30px auto 0;
					width: 210rpx;
					height: 230rpx;
					display: flex;
					flex-direction: column;
					align-items: center;

					.img_B {
						width: 130rpx;
						height: 130rpx;
					}

					.title {
						font-size: 18px;
						color: #ff3c36;
						margin-top: 20rpx;
					}
				}
			}
		}

		.btn {
			width: 100vw;
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			position: absolute;
			bottom: 180rpx;

			.btn_img {
				width: 27%;
				background-color: #fff;
				border-radius: 50rpx;
				height: 70rpx;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;

				text {
					font-size: 16px;
					color: #ff3c36;
				}
			}
		}

		.btnList {
			width: 100vw;
			display: flex;
			flex-direction: column;
			align-items: center;
			position: absolute;
			bottom: 300rpx;

			.btn_img {
				width: 36%;
				text-align: center;

				&:first-of-type {
					text {
						font-weight: bold;
						font-size: 20px;
					}
				}

				&:last-of-type {
					margin-top: 20rpx;
				}

				text {
					font-size: 16px;
					color: #fff;
				}
			}
		}
	}

	.background {
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.5);
		position: fixed;
		left: 0;
		top: 0;
		z-index: 10;
	}

	.btn_dingdanAll {
		padding: 0 30rpx;

		.btn_dingdan {
			position: absolute;
			bottom: 80rpx;
			width: 92%;
			background-color: #fff;
			border-radius: 50rpx;
			height: 70rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;

			text {
				font-size: 16px;
				color: #ff3c36;
			}
		}
	}
</style>
