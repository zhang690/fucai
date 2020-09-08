<template>
	<view>
		<view class="mine" v-if="isFormal==2">
			<view class="mine_warp">
				<view class="header_bg">
					<image src="https://fucai.yiruit.com/UpFiles/static/header_bg.png" mode="widthFix"></image>
					<!-- 用户信息开始 -->
					<view class="user_wrap">
						<view class="kefu_btn" @click="callPhone">
							<image src="https://fucai.yiruit.com/UpFiles/static/kefu.png" mode="widthFix"></image>
						</view>
						<view class="user_info">
							<view class="user_avatar" @click="handleType('../account/accountList')">
								<image :src="getUserObj.headIcon | Revise"></image>
							</view>
							<view class="user_name">{{getUserObj.OpenName}}</view>
						</view>
						<view class="user_other">
							<view class="other_item" @click="handleJifen(1)">
								<view class="other_item_num">{{getUserObj.Integral}}</view>
								<view class="other_item_text">积分</view>
							</view>
							<view class="other_item" @click="handleJifen(2)">
								<view class="other_item_num">{{getUserObj.Balance}}</view>
								<view class="other_item_text">福豆</view>
							</view>
							<navigator url='../index/caijuan' class="other_item">
								<view class="other_item_num">{{quan}}</view>
								<view class="other_item_text">体验券</view>
							</navigator>
						</view>
					</view>
					<!-- 用户信息结束 -->
				</view>

				<!-- 充值按钮开始 -->
				<view class="chongzhi_wrap">
					<view class="chongzhi chongzhi_item" @click="chongzhibtn">
						<text>获取福豆</text>
					</view>
					<!-- 	<view class="tixian chongzhi_item">
					<text>提现</text>
				</view> -->
				</view>
				<!-- 充值按钮结束 -->
				<!-- 订单开始 -->
				<view class="order_wrap">
					<view class="title_wrap">
						<!-- <view class="order_title">我的体验</view> -->
						<!-- <view class="title_right" @click="handleTiao(0)" >全部
						<text class="iconfont icon-iconfontjiantou5"></text>
					</view> -->
					</view>
					<view class="order_container">
						<view @click="handleTiao(2)" class="order_item">
							<view class="order_load_icon">
								<image src="https://fucai.yiruit.com/UpFiles/mine/daichupiao.png" mode="widthFix"></image>
							</view>
							<view class="order_text">兑换中</view>
						</view>
						<view @click="handleTiao(3)" class="order_item">
							<view class="order_load_icon">
								<image src="https://fucai.yiruit.com/UpFiles/mine/dailingqu.png" mode="widthFix"></image>
							</view>
							<view class="order_text">待领取</view>
						</view>
						<view @click="handleTiao(4)" class="order_item">
							<view class="order_load_icon">
								<image src="https://fucai.yiruit.com/UpFiles/mine/yiwancheng.png" mode="widthFix"></image>
							</view>
							<view class="order_text">已完成</view>
						</view>
					</view>
				</view>
				<!-- 订单结束 -->
				<!-- 列表开始 -->
				<view class="list_wrap">
					<uni-list>
						<view @click="handleType('../prize/prizeList')" class="list_item">
							<uni-list-item title="我的中奖" thumb="https://fucai.yiruit.com/UpFiles/mine/zhongjiang.png"></uni-list-item>
						</view>
						<view @click="handleType('./jifen')" class="list_item">
							<uni-list-item title="积分商城" thumb="https://fucai.yiruit.com/UpFiles/mine/jifenshangcheng.png"></uni-list-item>
						</view>
						<!-- <view @click="handleType('./tuijian')" class="list_item">
						<uni-list-item title="推荐有礼" thumb="https://fucai.yiruit.com/UpFiles/mine/tuijian.png"></uni-list-item>
					</view> -->
						<view @click="handleType('../setadress/adressList')" class="list_item">
							<uni-list-item title="收货地址" thumb="https://fucai.yiruit.com/UpFiles/mine/shouhuo.png"></uni-list-item>
						</view>
						<view @click="handleType('../account/accountList')" class="list_item">
							<uni-list-item title="账户设置" thumb="https://fucai.yiruit.com/UpFiles/mine/setting.png"></uni-list-item>
						</view>
						<!-- 	<view class="list_item">
						<uni-list-item title="关于软件" thumb="https://fucai.yiruit.com/UpFiles/mine/guanyu.png"></uni-list-item>
					</view> -->
					</uni-list>
				</view>
				<!-- 列表结束 -->
				<view class="btn">
					<view class="login-btn" @click="signoutBtn">退出登录</view>
				</view>
				<!-- 弹框 -->
				<view class="background" v-if="isShow || isZhifuShow"></view>	<!-- 遮罩 -->
				<view class="bag_img" v-if="isShow">
					<view class="bag_map">
						<view class="bag_item" @click="handleClone">
							<!-- <image src="http://fucai.yiruit.com/UpFiles/tupian/watch.png" mode="widthFix"></image> -->
							<image src="../../static/mine/weixin.png" mode="widthFix"></image>
							<text>客服微信</text>
						</view>
						<view class="bag_item" @click="handleTanke">
							<!-- <image src="https://fucai.yiruit.com/UpFiles/tupian/tel.png" mode="widthFix"></image> -->
							<image src="../../static/mine/tele.png" mode="widthFix"></image>
							<text>17373245005</text>
						</view>
					</view>
					<view class="close" @click="handleCloseKF">
						<image src="../../static/lucky/close.png" mode="aspectFill"></image>
					</view>
				</view>
			</view>
			<!-- 充值弹框 开始 -->
			<!-- 遮罩 复用上面的class='background'-->

			<view class="bag_img_chongzhi" v-if="isZhifuShow">
				<view class="bag_map_chongzhi">
					<view class="bag_width_chongzhi">
						<view class="bag_item_chongzhi">
							<!-- <image src="../../static/mine/jine.png" mode="widthFix"></image> -->
							<view class="inputAll_chongzhi">福豆：<input type="number" placeholder="请输入福豆数量" v-model="money"></view>
						</view>
						<view class="bag_btn_chongzhi">
							<view class="close_chongzhi" @click="handleConfirm">确定</view>
							<view class="close_chongzhi" @click="handleClose">取消</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 充值弹框 结束 -->
		</view>
		<!-- -->
		<view v-else>
			<view class="head">
				<view class="userall">
					<image src="https://fucai.yiruit.com/UpFiles/tupian/user.jpeg" class="user"></image>
					<view class="userTxet">
						<view>大包图军来也</view>
						<view>让设计融入理性之光</view>
					</view>
				</view>
				<view class="read">
					18K阅读
				</view>
			</view>

			<!-- 详情 -->
			<view class="detill">
				<view @tap="toConcerns">
					<image src='https://fucai.yiruit.com/UpFiles/tupian/guanzhu.png'></image>
					<view>我的关注</view>
				</view>
				<view @tap="toComment">
					<image src='https://fucai.yiruit.com/UpFiles/tupian/pinglun.png'></image>
					<view>我的评论</view>
				</view>
				<view>
					<image src='https://fucai.yiruit.com/UpFiles/tupian/23.png'></image>
					<view>我的收藏</view>
				</view>
			</view>

			<!-- more-->
			<view class="more">
				<view>
					<image src="https://fucai.yiruit.com/UpFiles/tupian/set.png"></image>
					<view>
						设置
					</view>

				</view>
				<view>
					<image src="https://fucai.yiruit.com/UpFiles/tupian/my.png"></image>
					<view>
						我的资料
					</view>

				</view>

			</view>
			<view class="btn">
				<view class="login-btn" @click="signoutBtn">退出登录</view>
			</view>
		</view>
	</view>

</template>
<script>
	// #ifdef H5
	import icanH5Api from '../../common/ican-H5Api'
	import wxSdk from '../../common/wx-sdk.js'
	const jweixin = require('jweixin-module');
	// #endif
	import uniList from "../../components/uni-list/uni-list.vue";
	import uniListItem from "../../components/uni-list-item/uni-list-item.vue";
	import SwiperItem from "../../components/swiper/SwiperItem.vue";
	import common from '../../common/common';
	var _self;
	export default {
		components: {
			uniList,
			uniListItem,
			SwiperItem
		},
		data() {
			return {
				userinfo: {},
				quan: 0,
				isShow: false,
				getUserObj: '',
				isFormal: 2,
				num: 3,
				banner: [],
				swiperList: [], // H5 轮播图
				isZhifuShow: false, // 充值弹框标记
				money: '', // 充值金额
			}
		},

		onLoad() {
			_self = this;
			// _self.checkProject();
			_self.getIndex()
		},
		onShow() {
			_self.userinfo = common.getstate();
			_self.getUserList()
			common.request({
				method: "GET",
				path: "login/getversion",
				success: res => {
					_self.isFormal = res.data.Version;
				}
			})
		},

		methods: {
			// 使用微信 js-sdk 的时候，都需要通过config接口注入权限验证配置。所以需要先调用后台接口获取config配置：
			getConfig() {
				common.request({
					path: 'login/getcode',
					method: 'GET',
					data: encodeURIComponent(location.href.split('#')[0]),
					success(res) {
						jweixin.config({
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



			// 
			toConcerns() {
				uni.navigateTo({
					url: '../news/concerns'
				})
			},
			toComment() {
				uni.navigateTo({
					url: '../news/comment'
				})
			},
			//结束
			getIndex() {
				common.request({
					path: "Development/getbanner",
					// method:'POST',
					data: {
						rows: 3,
						page: 1,
						sidx: "",
						sord: "desc",
					},
					success: res => {
						res.data.rows.forEach((element, index) => {
							element.Images = common.PicURL + element.Images
						});
						_self.banner = res.data.rows

					}
				})
			},
			// checkProject(){
			// common.request({
			// method:"GET",
			// 	path: "login/getversion",
			// 	success: res => {		

			// if(res.data.Version == 1){
			// 	uni.navigateTo({
			// 		url:'./show'
			// 	})				
			// }
			// 	}
			// })
			// },
			getUserList() { // 获取个人信息和积分余额	
				common.request({
					path: "Development/getmember",
					data: _self.userinfo.ID,
					success: res => {
						_self.getUserObj = res.data.member;
						_self.quan = res.data.rows
					}
				})
			},
			
			
			// 实时获取 权限
			getRecharge(){
				return new Promise((resolve,reject)=>{
					common.request({
						path:'Development/getmember',
						data: uni.getStorageSync('userinfo').ID,
						success:(res)=>{
							resolve(res.data.member.WeChatRecharge);
						}
					})
				})
			},
			// 充值福豆 微信支付
			async chongzhibtn() {
				// 有权限会员自己充值 微信支付 开始
				let WeChatRecharge = await _self.getRecharge();
				if (WeChatRecharge == 1) { // WeChatRecharge == 1 表示有自助充值权限，其他没有
					_self.isZhifuShow = true
				} else {
					uni.showModal({
						title: '友情提示',
						content: '请前往福彩到家线下网点获取福豆',
						confirmText: '查看网点',
						cancelText:'取消',
						success:(j)=> {
							if(j.confirm){
								uni.navigateTo({
									url: '../giveSelect/giveSelect?current=0&from=buy'
								})
							}
						}
					})
				}
			},
			// 取消充值
			handleClose(){
				_self.money = 0;
				_self.isZhifuShow = false;
			},
			// 确认充值
			handleConfirm(){
				_self.isZhifuShow = false;
				_self.getConfig();	// 配置 wx.config
				// 有权限的会员自己充值
					let openID = uni.getStorageSync('userinfo').openId
					let memberid = uni.getStorageSync("userinfo").ID;
					console.log('openID',openID);
					console.log('memberid',memberid);
					if (_self.money) {
						common.request({
							path: "payment/getpayment",
							data: {
								amount: _self.money, //金额
								remark: '自助充值', //描述
								openid: openID, //用户openid
								// openid : 'owrext-AIGRNvrUcCh36CTnbiMR8', //用户openid
								companyid: '', //网点ID
								memberid: memberid,
								reviewerid:'' // 网点操作员userid
							},
							success: res => {
								jweixin.ready(() => {
									jweixin.chooseWXPay({
										/*
										{"code":200,"info":"响应成功","data":{"appId":"wxfcd7e94afb22cd1a","timeStamp":"1598928207","signType":"RSA","package":"prepay_id=wx011043270198681a237e96db47f0940000","nonceStr":"fa77292ef000484fae8d870f5456dc2d","paySign":"i7iC8UIPZOVY8aBK+qwdoacz5UD0DXLizi9eqyB5bp+k2ImduAG4FlhDpLG3SXj0CMaNBijlopTPm51sbzT6jXELI+XPDkFCNx0ndAksdHyyH3p7e1gR2vw8SlQ98Ddjf9FChXf+ThqpBNIhxXTd67S8uz2LKwUMAKBichleBAao0hWuWHZLnPOXLuE+HoJMLT9ocm/C05ql9G7mH8rP/o6eiKj8jlh/rJ0AsAsa+QK5/Uft0kO6mV7FG91ytEiFSYH9xPhdm1F8RANzuNVleM0jSCAOVwpRFxETfd3aKPq5LbOUOth0G3t/ARBZ3fRnyhJSqGJKhmNo0QJjAxsN+A=="}}
										*/
										timestamp: res.data.rows.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
										nonceStr: res.data.rows.nonceStr, // 支付签名随机串，不长于 32 位
										package: res.data.rows.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
										signType: res.data.rows.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
										paySign: res.data.rows.paySign, // 支付签名
										success: (res) => {
											// 支付成功后的回调函数 拉取更新用户信息
											uni.showModal({
												title:'充值成功',
												showCancel:false,
												success:(resConfirm)=>{
													if(resConfirm.confirm){
														_self.money = 0;
														_self.isZhifuShow = false;
														// 拉取用户信息
														_self.getUserList();
													}
												}
											})
										},
										fail: (err) => {
											// 支付失败后的回调函数
											uni.showModal({
												title:'充值成功',
												showCancel:false,
												success:(resConfirm)=>{
													if(resConfirm.confirm){
														_self.money = 0;
														_self.isZhifuShow = false;
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
				// 有权限 会员自己充值福豆 微信支付
			},
			
			
			
			signoutBtn() {
				uni.showModal({
					title: '提示',
					content: '是否确认退出登录！',
					success: function(res) {
						if (res.confirm) {
							common.logout();
							uni.showToast({
								icon: 'none',
								title: '您已退出登录',
							})
							uni.navigateTo({
								url: '../login/userLogin'
							})
						}
					}
				})
			},
			callPhone() { // 客服电话拨打
				_self.isShow = true
			},
			handleCloseKF() { // 关闭客服
				_self.isShow = false
			},
			handleClone() { // 复制微信号
				uni.setClipboardData({
					data: 'fucaidaojia-0001', // 要复制的文字
					success: function(res) {
						uni.getClipboardData({
							success: function(res) {
								uni.showToast({
									title: '复制成功'
								});
							}
						})
					}
				})
			},
			handleTanke() { // 拨打电话
				uni.makePhoneCall({
					phoneNumber: '17373245005'
				})
			},
			handleJifen(id) {
				uni.navigateTo({
					url: './myjifen?&id=' + id
				})
			},
			handleType(url) {
				uni.navigateTo({
					url: url
				})
			},
			handleTiao(id) { // 状态的跳转			   
				uni.navigateTo({
					url: '../order/myOrder?id=' + id
				})
			}
		}
	};
</script>
<style lang="scss" scoped>
	.mine {
		background-color: #faf6f7;
		// position: relative;
		// .mine_wrap {
		// 	.bag_img{
		// 		position: absolute;
		// 		left: 48%;
		// 		top: 14%;
		// 		background-color: #FFFFFF;
		// 		width: 500rpx;
		// 		height: auto;
		// 		margin: 0 auto;
		// 		margin-left: -250rpx;
		// 		margin-top: 200rpx;
		// 		border-radius: 10rpx;
		// 		box-shadow: 0px 0px 4px #999;
		// 		z-index: 100;
		// 	}
		// }
	}

	.header_bg {
		height: 100%;

		image {
			display: block;
			height: 100%;
			width: 100%;
		}
	}

	.user_wrap {
		width: 90%;
		height: 300rpx;
		border-radius: 15rpx;
		margin: 0 auto;
		box-shadow: 0 15rpx 5rpx $color;
		margin-top: -230rpx;
		position: relative;
		background-color: #fff;

		.kefu_btn {
			width: 40rpx;
			position: absolute;
			right: 10rpx;
			top: -60rpx;
		}

		.user_info {
			width: 100%;
			height: auto;
			overflow: hidden;

			.user_avatar {
				position: absolute;
				top: -50rpx;
				left: 40rpx;
				z-index: 1;
				border-radius: 50%;
				overflow: hidden;
				box-shadow: 0px 0px 5px #666;

				image {
					width: 130rpx;
					height: 130rpx;
				}
			}

			.user_name {
				margin-left: 200rpx;
				margin-top: 15rpx;
			}
		}

		.user_other {
			display: flex;
			justify-content: space-around;
			margin-top: 80rpx;

			.other_item {
				.other_item_num {
					color: #eb5454;
					text-align: center;
				}

				.other_item_text {
					margin-top: 10rpx;
				}
			}
		}
	}

	.chongzhi_wrap {
		color: #fff;
		display: flex;
		justify-content: space-around;
		margin-top: 40rpx;

		.chongzhi_item {
			text-align: center;
			height: 80rpx;
			width: 660rpx;
			border-radius: 10rpx;
			letter-spacing: 3rpx;
			line-height: 80rpx;
			font-size: 34rpx;
		}

		.chongzhi {
			background-color: $color;
		}

		.tixian {
			background-color: #feb302;
		}
	}

	.order_wrap {
		width: 90%;
		background-color: #fff;
		border-radius: 10rpx;
		margin: 20rpx auto 0;
		padding: 10rpx 0 0 10rpx;

		.title_wrap {
			display: flex;
			justify-content: space-between;
			padding: 20rpx 10rpx;

			.order_title {
				font-size: 34rpx;
				text-align: left;
			}

			.title_right {
				color: #999;
			}
		}

		.order_container {
			display: flex;
			justify-content: space-around;
			color: #333;

			.order_item {
				width: 33.33%;
				margin: 20rpx 0;
				text-align: center;

				.order_load_icon {
					display: flex;
					justify-content: center;

					image {
						width: 40rpx;
					}
				}

				.order_text {
					margin-top: 20rpx;
				}
			}
		}
	}

	.list_wrap {
		width: 90%;
		margin: 0 auto;
		margin-top: 15rpx;
		color: #cecece;
	}

	.btn {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		margin: 30rpx 0;

		.login-btn {
			width: 90%;
			height: 100%;
			line-height: 100rpx;
			background-color: #ccc;
			border-radius: 50rpx;
			color: #fff;
			font-size: 18px;
			text-align: center;
			margin: 0 auto;
		}
	}

	.background {
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.5);
		position: fixed;
		left: 0;
		top: 0;
		z-index: 1;
	}

	.bag_img {
		transform: translate(-50%, -50%);
		position: fixed;
		left: 50%;
		top: 50%;
		background-color: rgba(255, 255, 255, 1);
		border-radius: 10px;
		padding: 20px;
		color: #fff;
		z-index: 2 !important;
		width: 500rpx;
		height: 200rpx;

		.bag_map {
			width: 100%;
			height: auto;
			display: flex;
			flex-direction: column;
			align-items: center;

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

				&:last-of-type {
					border-bottom: none;
					margin: 0 auto;
				}

				image {
					width: 50rpx;
					height: 50rpx;
					display: block;
					margin-right: 30rpx;
				}

				text {
					font-size: 18px;
					color: #666;
				}
			}
		}

		.close {
			width: 60rpx;
			height: 60rpx;
			background-color: #fff;
			border-radius: 50%;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			font-size: 16px;
			position: absolute;
			bottom: -80rpx;
			left: 46%;
			box-shadow: 0 0 4px #666;
			color: #666;

			image {
				width: 30rpx;
				height: 30rpx;
			}
		}
	}

	.head {
		width: 100%;
		height: 436rpx;
		background: #7c90ec;
		border-radius: 0 0 20rpx 20rpx;
	}

	.userall {
		display: flex;
		padding-top: 56rpx;
	}

	.user {
		width: 138rpx;
		height: 138rpx;
		border-radius: 50%;
		margin-left: 60rpx;
	}

	.userTxet {
		width: 500rpx;
		height: 100rpx;
		margin-top: 20rpx;
		margin-left: 37rpx;
	}

	.userTxet>view:nth-child(1) {
		color: white;
		font-size: 35rpx;
		letter-spacing: 1rpx;
	}

	.userTxet>view:nth-child(2) {
		color: #d2dbff;
		font-size: 23rpx;
		margin-top: 25rpx;
	}

	.read {
		margin: 50rpx 0 0 80rpx;
		color: white;
		font-size: 35rpx;
	}

	.detill {
		width: 686rpx;
		height: 224rpx;
		background-color: white;
		border-radius: 30rpx;
		margin: 0 auto;
		margin-top: -35rpx;
		display: flex;
		margin-bottom: 40rpx;
	}

	.detill>view {
		margin-left: 73rpx;
		margin-top: 26rpx;
		margin-right: 43rpx;
		width: 93rpx;
		height: 152rpx;
	}

	.detill>view:nth-last-child(1) {
		margin-left: 90rpx;
	}

	.detill>view>image {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		margin-bottom: 20rpx;
	}

	.detill>view>view {
		color: #464646;
		font-size: 20rpx;
		text-align: center;
	}

	.more {
		width: 686rpx;
		height: 215rpx;
		padding-top: 70rpx;
		background-color: white;
		display: flex;
		margin: 0 auto;
	}

	.more>view {
		width: 116rpx;
	}

	.more>view:nth-child(1) {
		margin-left: 104rpx;
	}

	.more>view:nth-child(2) {
		margin-left: 280rpx;
	}

	.more>view>view {
		text-align: center;
		font-size: 30rpx;
	}

	.more>view>image {
		display: block;
		margin: 0 auto;
		width: 60rpx;
		height: 52rpx;
		margin-bottom: 40rpx;
	}
	
	.bag_img_chongzhi{
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
		.bag_map_chongzhi{
			width: 100%;
			height: auto;	
			display: flex;
			flex-direction: column;
			align-items: center;
			overflow: hidden;		
			.bag_item_chongzhi{
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
				image{
					width: 50rpx;
					height: 50rpx;
					display: block;
					margin-right: 30rpx;
				}
				.inputAll_chongzhi{
					flex: 1;
					display: flex;
					align-items: center;
					input{
						// width: 100%;
						height: 100%;
					}
				}
			}
			.bag_width_chongzhi{
				width: 100%;
			}
			.bag_btn_chongzhi{
				width: 100%;
				height: 100rpx;
				line-height: 100rpx;
				overflow: hidden;
				display: flex;
				flex-direction: row;
				justify-content: space-around;
				font-size: 18px;
				color: #333;
				.close_chongzhi{
					flex: 1;
					color: #666;
					font-size: 16px;
					text-align: center;
					&:first-child{
						color: #ff3c36;
					}
				}
			}
		}
	}
</style>
