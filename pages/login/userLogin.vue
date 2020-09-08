<template>
	<view class="user-login">
		<view class="user_all">
			<view class="user_logo">
				<image src="https://fucai.yiruit.com/UpFiles/tupian/logo.png" mode="aspectFit"></image>
			</view>
			<view class="user_info">
				<!-- 注册 -->
				<view class="input-wrap" v-if="isRegister">
					<view class="user-input">
						<view class="input_put">
							<image src="https://fucai.yiruit.com/UpFiles/tupian/user.png" mode="widthFix"></image>
						</view>
						<input type="text" placeholder="请输入真实姓名" v-model="realname" placeholder-style="color:#fff" />
					</view>
					<view class="user-input">
						<view class="input_put first_icon">
							<image src="https://fucai.yiruit.com/UpFiles/tupian/tel.png" mode="widthFix"></image>
						</view>
						<input type="number" maxlength="11" placeholder="请输入手机号" v-model="phone" placeholder-style="color:#fff" />
					</view>
					<view class="user-input">
						<view class="input_put">
							<image src="https://fucai.yiruit.com/UpFiles/tupian/yanzhengma.png" mode="widthFix"></image>
						</view>
						<input type="number" placeholder="请输入验证码" v-model="verification" placeholder-style="color:#fff" />
						<view class="huoqu" :class="[{'huoquclick':clicked}]" @click="handleCode">
							<text>{{dataTime}}</text>
						</view>
					</view>
					<view class="user-input" v-if="isFormal == 2">
						<view class="input_put">
							<image src="https://fucai.yiruit.com/UpFiles/tupian/yaoqingma.png" mode="widthFix"></image>
						</view>
						<input type="text" placeholder="请输入邀请码" maxlength="6" @blur='invitationChang' v-model="invitation"
						 placeholder-style="color:#fff" />
					</view>
					<view class="user-store-btn">
						<view class="user_title">
							<text @click="handleFanhui">返回登录</text>
						</view>
					</view>
				</view>
				<!-- 登录 -->
				<view v-else class="input-wrap">
					<view class="user-input">
						<view class="input_put first_icon">
							<image src="https://fucai.yiruit.com/UpFiles/tupian/tel.png" mode="widthFix"></image>
						</view>
						<input type="number" maxlength="11" placeholder="请输入手机号" v-model="phone" placeholder-style="color:#fff" />
					</view>
					<view class="user-input">
						<view class="input_put">
							<image src="https://fucai.yiruit.com/UpFiles/tupian/yanzhengma.png" mode="widthFix"></image>
						</view>
						<input type="number" placeholder="请输入验证码" v-model="verification" placeholder-style="color:#fff" />
						<view class="huoqu" :class="[{'huoquclick':clicked}]" @click="handleCode">
							<text>{{dataTime}}</text>
						</view>
					</view>
					<view class="user-store-btn">
						<view class="user_title">
							<text @click="handleUser">注册</text>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="user_bg">
			<image src="../../static/bg.png" mode="widthFix"></image>
		</view>
		<view class="user_btn" :class="{user_logo:active}">
			<button v-if="isRegister == false" @click="handleGetUserInfo">登录</button>
			<!-- #ifdef MP-WEIXIN -->
			<button v-else open-type="getUserInfo" @getuserinfo="handleRegiter">注册</button>
			<!-- #endif -->
			<!-- #ifdef H5 -->
			<button v-else @tap="handleRegiter">注册</button>
			<!-- #endif -->
		</view>
		<view v-if="isFormal == 2">
			<view class="handle" :class="{handle_logo:active}">
				<text @click="handleJump('./merchantLogin')">站长登录</text>
				<text @click="handleJump('./riderLogin')">骑手登录</text>
				<text @click="handleJump('./intimidateLogin')">业务员登录</text>
			</view>
		</view>
		<view class="btn_bg" :class="{'bgTop':active}">
			<image src="https://fucai.yiruit.com/UpFiles/tupian/title.png" mode="aspectFit"></image>
		</view>
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
	import common from "../../common/common";
	var _self;
	export default {
		data() {
			return {
				realname: "",
				phone: "",
				verification: "", // 验证码
				invitation: '', // 邀请码
				isRegister: false,
				userInfo: {},
				city: "",
				active: false,
				dataTime: '获取验证码',
				isFormal: 2,
				clicked: false, // 是否已经发送过验证码
				vCode: '', // 初始验证码
				vPhone: '', // 初始化获取验证码的手机号码，防止客户中途改变号码
				// vState: 1, //判断用户是注册还是登录 0 注册，1 登录
			};
		},
		onLoad() {
			_self = this;
			// #ifdef H5
			// 配置config
			common.request({
				path: 'login/getcode',
				method: 'GET',
				data: encodeURIComponent(location.href.split('#')[0]),
				success(res) {
					let signPackage = res.data;
					wxSdk.initJssdk(signPackage); // 配置wx.config
				},
				fail(err) {
					console.log('bbbb', err);
				}
			})
			// #endif
			// _self.stypeQuest(); // 判断是否显示
			// #ifdef MP-WEIXIN
			_self.getAdress(); // 经纬度			
			// #endif	
		},
		methods: {
			stypeQuest() {
				common.request({
					method: "GET",
					path: "login/getversion",
					success: res => {
						_self.isFormal = res.data.Version
					}
				})
			},
			handleFanhui() { // 返回用户登录
				_self.isRegister = false;
				_self.active = false
			},
			invitationChang() {
				common.request({ // 注册时判断邀请码填写是否正确
					path: "login/panduan",
					method: "GET",
					data: parseFloat(_self.invitation),
					success: res => {
						if (res.code === 200) {
							common.showToast('邀请码正确')
						} else {
							common.showToast('邀请码错误')
							_self.invitation = ''
						}
					}
				})
			},

			// 用户注册
			handleRegiter() {
				// 测试人员 删除原会员 再次注册 不需要判断位置 开始
				let phoneList = ['15084968801', '张宾', '月半', '月半', '朱林军℡¹⁸⁸⁹⁰³⁹⁵⁵⁰⁰', '小文君', ".", '15073163280', '15868879789',
					'18890395500', '15974242945', '18528020801'
				]
				let testPhone = _self.phone.toString()
				let index = phoneList.findIndex((item) => {
					return testPhone == item
				})
				// 测试人员 删除原会员 再次注册 不需要判断位置	结束
				if (!common.checkPhone(_self.phone)) return common.showToast('请输入正确的手机号码')
				// #ifdef H5
				// H5判断在不在湘潭
				if (index == -1) { // index == -1 表示不是测试人员
					common.request({
						path: 'login/getcode',
						method: 'GET',
						data: encodeURIComponent(location.href.split('#')[0]),
						success(res3) {
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
				if (_self.phone != _self.vPhone || _self.verification != _self.vCode) return common.showToast('您输入的信息不正确')
				// #endif
				// #ifdef MP-WEIXIN
				// 小程序判断是否在湘潭市
				if (_self.city != "湘潭市") return common.showToast('您不在湘潭市，暂时无法注册登陆')
				// #endif	
				// 判断微信是否有过注册
				let {
					ID
				} = uni.getStorageSync('userinfo')
				if (ID) return common.showModal('提示','您的微信已经注册过账号，不能再次注册')
				// 姓名  手机号  验证码  邀请码     手机号再次判断
				if (_self.realname && _self.phone == _self.vPhone && _self.verification == _self.vCode) {
					// 首页初始化后台给的openId	
					// #ifdef H5
					let openId = uni.getStorageSync("userforlogin").openId;
					let userForLogin = uni.getStorageSync('userforlogin') || '';
					_self.userLogin(userForLogin.nickName, openId, _self.phone, _self.realname, userForLogin.avatarUrl, _self.invitation,
						userForLogin.gender);
					// #endif
					// 小程序流程
					// #ifdef MP-WEIXIN
					let openId = uni.getStorageSync("userInfo").openId;
					uni.login({
						provider: 'weixin',
						success(loginResult) {
							uni.getUserInfo({
								provider: 'weixin',
								success: function(infoRes) {
									_self.userInfo = infoRes.userInfo;
									_self.userLogin(_self.userInfo.nickName, openId, _self.phone, _self.realname, _self.userInfo.avatarUrl,
										_self.invitation, _self.userInfo.gender);
								},
								fail: () => {
									common.showToast('未授权')
									return false;
								}
							})
						}
					})
					// #endif
				} else { common.showToast('未授权') }
			},
			// 用户注册的接口
			userLogin(nickName, openId, phone, realname, avatarUrl, invitation, gender) {
				let dataTest = {
					nickName: nickName, //微信名
					openId: openId,
					phone: phone,
					realname: realname, //真实姓名
					avatarUrl: avatarUrl, // 头像
					invite: invitation, //邀请码
					gender: gender // 性别
				}
				console.log('dataTest', dataTest)
				common.request({
					path: "login/loginbyopenid",
					method: "GET",
					data: {
						nickName: nickName, //微信名
						openId: openId,
						phone: phone,
						realname: realname, //真实姓名
						avatarUrl: avatarUrl, // 头像
						invite: invitation, //邀请码
						gender: gender // 性别
					},
					success: result => {
						uni.showToast({
							title: "注册成功！您已成功领取体验卷",
							duration: 1500,
							mask: true
						});
						console.log('h5_注册成功', result) //============
						uni.setStorageSync("userinfo", result.data);
						common.setstate(result.data);
						uni.switchTab({
							url: "../index/index"
						});
					}
				});
			},
			// 获取用户的经纬度
			getAdress() {
				uni.getLocation({
					type: "gcj02",
					success(res1) {
						const latitude = res1.latitude;
						const longitude = res1.longitude;
						uni.setStorageSync("jingwei", {
							latitude,
							longitude
						});
						wx.request({
							url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${latitude},${longitude}&key=5XTBZ-SXL6R-7OYWX-WTOCF-M7BUK-TSFBQ`,
							data: {},
							header: {
								"content-type": "application/json"
							},
							method: "GET",
							dataType: "json",
							responseType: "text",
							success: result => {
								_self.city = result.data.result.address_component.city;
							}
						});
					},
					fail: err => {
						console.log(err);
					}
				});
			},
			handleUser() { // 新用户
				_self.isRegister = true;
				_self.active = true;
			},
			handleJump(url) { // 跳转
				uni.navigateTo({
					url: url
				})
			},
		
			handleGetUserInfo() { // 用户登录
				// #ifdef H5
				/**
				 * 	判断是 开发人员 就不要判断验证码可以登录
				 * 	否则 需要验证 验证码 才能登录
				 * 			开始
				 * */
				let phoneList = ['15084968801', '15974242945','18932181335', '18592701479', '15073163280', '15868879789', '18890395500']
				let testPhone = _self.phone.toString()
				console.log('testPhone', testPhone)
				let index = phoneList.findIndex((item) => {
					return testPhone == item
				})
				// H5判断在不在湘潭
				if (index == -1) { // index == -1 表示不是测试人员
					common.request({
						path: 'login/getcode',
						method: 'GET',
						data: encodeURIComponent(location.href.split('#')[0]),
						success(res3) {
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
				// #endif
				if (!common.checkPhone(_self.phone)) {
					uni.showToast({
						icon: 'none',
						title: '请输入正确的手机号码',
						duration: 1500,
					});
					// _self.phone = ''
					return false
				}

				if (index != -1) {
					common.request({ // 用户再次输入手机号 登录  判断是否注册过
						path: "login/selectphone",
						method: "GET",
						data: {
							mobile: _self.phone,
							code: _self.verification
						},
						success: res => {
							if (Object.keys(res.data).length !== 0) {
								uni.setStorageSync("userinfo", res.data);
								common.setstate(res.data);
								uni.switchTab({
									url: "../index/index"
								})
							} else {
								uni.showToast({
									icon: 'none',
									title: '该用户不存在',
									duration: 1500,
								})
							}
						}
					})
				} else if (_self.phone == _self.vPhone && _self.verification == _self.vCode) {
					// if( _self.phone && _self.verification){
					common.request({ // 用户再次输入手机号 登录  判断是否注册过	
						path: "login/selectphone",
						method: "GET",
						data: {
							mobile: _self.phone,
							code: _self.verification
						},
						success: res => {
							if (Object.keys(res.data).length !== 0) {
								uni.setStorageSync("userinfo", res.data);
								common.setstate(res.data);
								uni.switchTab({
									url: "../index/index"
								})
							} else {
								uni.showToast({
									icon: 'none',
									title: '该用户不存在',
									duration: 1500,
								})
							}
						}
					})
				} else {
					uni.showToast({
						icon: 'none',
						title: '请输入正确信息',
						duration: 1500,
					})
				}
			},
			handleCode() { // 获取验证码
				if (common.checkPhone(_self.phone)) { // 判断手机是否填写 正确
				
					if (!_self.clicked) {
						common.request({
							path: 'login/getsms',
							method: 'GET',
							data: {
								phone: _self.phone,
								sort: _self.isRegister?0:1,
							},
							success: (res) => {
								uni.showToast({
									title: '验证码获取成功'
								})
								console.log('短信验证码', res);
								_self.vCode = res.data.code;
								_self.vPhone = res.data.mobile;
								_self.clicked = true
								let time = 60
								var timeId = setInterval(() => {
									time--
									_self.dataTime = time + 's 重新发送'
									if (time == 0) {
										_self.clicked = false;
										_self.dataTime = '获取验证码'
										clearInterval(timeId)
										return
									}
								}, 1000)
							},
							fail: (err) => {
								uni.showToast({
									title: '验证码发送失败，请稍后再试'
								})
								_self.dataTime = '重新获取验证码'
							}
						})
					}
				} else {
					uni.showToast({
						title: '您输入的电话号码格式不正确',
						mask: true,
						duration: 1500
					})
				}
			}
		}
	};
</script>
<style lang="scss" scoped>
	.user-login {
		height: 100vh;
		overflow: hidden;
		background-color: #fff;

		.user_bg {
			margin-bottom: 40rpx;
		}

		.user_all {
			background-color: #ff3c35;
		}
	}

	.user_all {
		.user_logo {
			padding-top: 100rpx;

			image {
				width: 200rpx;
				height: 200rpx;
				display: block;
				margin: auto;
			}
		}

		.user_info {
			width: 80%;
			margin-top: 60rpx;
			padding: 0 10%;
		}
	}

	.user_btn {
		width: 100%;
		margin-top: -20rpx;

		button {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 80%;
			height: 80rpx;
			line-height: 80rpx;
			background-color: #ff3c35;
			border-radius: 20rpx;
			color: #fff;
			font-size: 28rpx;
		}
	}

	.handle {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		width: 100%;
		margin-top: 110rpx;

		text {
			color: #999;
		}
	}

	.handle_logo {
		margin-top: 70rpx;
	}

	.btn_bg {
		width: 100%;
		margin-top: 190rpx;
		text-align: center;

		image {
			height: 80rpx;
			margin: auto;
		}
	}

	.bgTop {
		margin-top: 50rpx;
	}

	.user_info {
		.input-wrap {
			display: flex;
			justify-content: center;
			align-items: center;
			display: flex;
			flex-direction: column;

			.user-input {
				width: 100%;
				height: 70rpx;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				border-bottom: 1px solid #eee;
				margin-bottom: 40rpx;
				align-items: center;

				.input_put {
					width: 50rpx;
					height: 60rpx;
					margin-right: 10rpx;
					padding-top: 10rpx;

					image {
						display: block;
						width: 80%;
					}
				}

				.huoqu {
					// width: 160rpx;
					height: 60rpx;
					line-height: 60rpx;
					text-align: center;
					border-radius: 10rpx;

					text {
						font-size: 12px;
						color: #fff;
					}
				}

				.huoquclick {
					text {
						font-size: 12px;
						color: #ccc;
					}
				}

				.first_icon {
					image {
						width: 70%;
					}
				}

				input {
					flex: 1;
					height: 64rpx;
					background: none;
					color: #fff;
					display: block;
					width: 100%;
					height: 100%;
				}
			}

			.user-btn {
				width: 100%;
				text-align: right;
				margin-top: -24rpx;
				display: flex;
				flex-direction: row;
				justify-content: flex-end;

				text {
					color: #fff;
					font-size: 14px;
				}
			}

			.user-store-btn {
				width: 100%;

				.user_title {
					display: flex;
					flex-direction: row;
					justify-content: flex-end;
				}

				text {
					color: #fff;
					font-size: 14px;
				}
			}
		}
	}
</style>
