<template>
	<view>
		<block v-if='isOk'>
			<view class="index" v-if="isFormal == 2">
				<!-- 轮播开始 -->
				<!-- #ifdef MP-WEIXIN -->
				<swiperImg :banner="banner" :indicatorDots="false" :autoplay="true" :interval="3000" :duration="500" />
				<!-- #endif -->
				<!-- #ifdef H5 -->
				<swiperImg :banner="banner" :indicatorDots="false" :autoplay="true" :interval="3000" :duration="500" />
				<!-- #endif -->

				<!-- 轮播结束 -->
				<!-- 内容开始 -->
				
				<view class="index_content">
					
					<!-- 卡片开始 -->
					<view class="card_wrap">
						<navigator url="../selectCode/selectCode" class="card_item">
							<view class="card_icon">
								<image mode="widthFix" src="https://fucai.yiruit.com/UpFiles/shouye/shuangseqiu.png"></image>
							</view>
							<view class="card_title">双色球</view>
							<view class="card_text">2元可中1000万</view>
						</navigator>
						
						<navigator url="../selectCode/selectCodeqicai" class="card_item">
							<view class="card_icon">
								<image mode="widthFix" src="https://fucai.yiruit.com/UpFiles/shouye/qilecai.png"></image>
							</view>
							<view class="card_title">七乐彩</view>
							<view class="card_text">单注奖金最高500万</view>
						</navigator>
						
						<navigator url="../selectCode/selectThreeD" class="card_item">
							<view class="card_icon">
								<image mode="widthFix" src="https://fucai.yiruit.com/UpFiles/shouye/fucai3d.png"></image>
							</view>
							<view class="card_title">福彩3D</view>
							<view class="card_text">固定奖，天天开</view>
						</navigator>
					</view>
					<!-- 卡片结束 -->
					<!-- 彩卷开始 -->
					<view class="caijuan_wrap">
						<view @click="handleGua" class="caijuan_item">
							<image src="https://fucai.yiruit.com/UpFiles/shouye/scraping.png" mode="aspectFit"></image>
							<view class="caijuan_text">刮刮乐</view>
						</view>
						<navigator url="../luckyWheel/luckyWheel" class="caijuan_item">
							<image src="https://fucai.yiruit.com/UpFiles/shouye/luck.png" mode="aspectFit"></image>
							<view class="caijuan_text">幸运抽奖</view>
						</navigator>
						<navigator url="./caijuan" class="caijuan_item">
							<image src="https://fucai.yiruit.com/UpFiles/shouye/ticket.png" mode="aspectFit"></image>
							<view class="caijuan_text">体验券</view>
						</navigator>
					</view>
					<!-- 彩卷结束 -->
					<view class="fenge_bg">
						<image src="https://fucai.yiruit.com/UpFiles/shouye/GO.png" mode="widthFix"></image>
					</view>
					<!-- <navigator open-type="navigate" url="../mine/jifen" class="fenge_bg">
						<image src="https://fucai.yiruit.com/UpFiles/shouye/GO.png" mode="widthFix"></image>
					</navigator> -->
					<!-- 开奖开始 -->
					<view class="kaijiang_wrap">
						<view class="kaijiang_header">
							<view class="kaijiang_title"><text>开奖情况</text></view>
						</view>
						<navigator open-type='navigate' url="../kaijiang/shuangseDetail" class="kaijiang_item" v-for="(item,index) in shuangse"
						 :key="index">
							<view class="kaijiang_item_icon">
								<image src="https://fucai.yiruit.com/UpFiles/shouye/shuangseqiu.png" mode="widthFix"></image>
								<view class="icon_text">双色球</view>
							</view>
							<view class="kaijiang_item_content">
								<view class="content_text">第{{item.PeriodsNumber}}期<text class="blcak">{{item.PrizeTime}}</text></view>
								<view class="content_qiu">
									<text v-for="red in item.RedBall" :key="red">{{red}}</text>
									<text class="blue_num">{{item.BlueBall}}</text>
								</view>
							</view>
							<view class="qiu_btn">
								<image src="https://fucai.yiruit.com/UpFiles/shouye/more.png" mode="aspectFit"></image>
							</view>
						</navigator>
						<navigator open-type='navigate' url="../kaijiang/qilecaiDetail" class="kaijiang_item" v-for="(item,index) in qicai"
						 :key="item.ID">
							<!--  -->
							<view class="kaijiang_item_icon">
								<image src="https://fucai.yiruit.com/UpFiles/shouye/qilecai.png" mode="widthFix"></image>
								<view class="icon_text">七乐彩</view>
							</view>
							<view class="kaijiang_item_content">
								<view class="content_text">第{{item.PeriodsNumber}}期<text class="blcak">{{item.PrizeTime}}</text></view>
								<view class="content_qiu">
									<text v-for="red in item.RedBall" :key="red">{{red}}</text>
									<text class="blue_num">{{item.BlueBall}}</text>
								</view>
							</view>
							<view class="qiu_btn">
								<image src="https://fucai.yiruit.com/UpFiles/shouye/more.png" mode="aspectFit"></image>
							</view>
						</navigator>
						<navigator open-type='navigate' url="../kaijiang/fucaiDetail" class="kaijiang_item" v-for="item in fucai" :key="item.ID">
							<view class="kaijiang_item_icon">
								<image src="https://fucai.yiruit.com/UpFiles/shouye/fucai3d.png" mode="widthFix"></image>
								<view class="icon_text">福彩3D</view>
							</view>
							<view class="kaijiang_item_content">
								<view class="content_text">第{{item.PeriodsNumber}}期<text class="blcak">{{item.PrizeTime}}</text></view>
								<view class="content_qiu">
									<text v-for="(red,index) in item.RedBall" :key="index">{{red}}</text>
								</view>
							</view>
							<view class="qiu_btn">
								<image src="https://fucai.yiruit.com/UpFiles/shouye/more.png" mode="aspectFit"></image>
							</view>
						</navigator>
					</view>
					<!-- 开奖结束 -->
				</view>
				<!-- 内容结束 -->
			</view>

			<!-- isFormal==1 -->
			<view class="index_specil" v-else-if="isFormal==1">
				<view class='index_specil_content'>
					<!-- 轮播图 -->
					<view class="index_specil_banner">
						<swiper-item :banner="banner"></swiper-item>
					</view>
					<!-- 资讯 -->
					<view class="news">

						<view class="news_main">
							<view class="news_item" v-for="(item,index) in news" :key="index" @tap="goNewsDetail(item)">
								<view class="news_item_title">
									<view class="news_item_title_name">
										{{item.Title}}
									</view>
									<view class="news_item_title_time">
										{{item.AddTime}}
									</view>
								</view>
								<view class="news_item_img">
									<image :src='item.image' mode="scaleToFill"></image>
								</view>
							</view>
						</view>

					</view>
				</view>
			</view>
		</block>
	</view>
</template>
<script>
	// #ifdef H5
	import wxSdk from '../../common/wx-sdk.js'
	const jweixin = require('jweixin-module');
	// #endif

	import SwiperItem from "../../components/swiper/SwiperItem.vue";
	import common from '../../common/common';
	import swiperImg from '@/components/hswiper/swiper.vue'
	var _self;
	export default {
		components: {
			SwiperItem,
			swiperImg
		},
		data() {
			return {
				isOk: false,
				num: 3,
				banner: [],
				shuangse: [],
				qicai: [],
				fucai: [],
				city: "",
				qqMap: '', // 测试腾讯位置服务
				swiperList: [], // H5 轮播图
				isFormal: 2,
				shuangseUrl: '',
				news: [],
				optimization: false, // 优化onLoad onShow中请求
				receive: false,
				copyCode: false, // 从登录界面跳转过来，会是相同的code，不能执行 wxlogin方法
			};
		},
		 onLoad() {
			uni.hideTabBar()
			_self = this;
			// 轮播图
			_self.getIndex();
			// 双色球
			_self.getKaijiang();
			// 福彩3d
			_self.getFucai();
			// 七乐彩
			_self.getQicai();

			// #ifdef H5
			// 公众号 发送 code 获取用户信息
			// let repeatCode = _self.getUrlParam('code');
			// let happenCode = uni.getStorageSync('happenCode')
			let openid = uni.getStorageSync('openid')
			if (!openid || openid == '') { //从登录页面uni.switchTab 会进入 onLoad,但是code不会变化，不能用相同的code执行多次授权
				_self.wxLogin()
			} else {
				_self.handleIsCity()
			}
			// #endif
			// 小程序专用
			// #ifdef MP-WEIXIN 
			_self.getAdress() // 获取城市名
			// 是否注册过
			_self.hangdleOpid();
			_self.getNews();
			// #endif
		},
		onShow() {
			// 小程序过审时用的
			// let result = await _self.getVersion();
			// _self.isFormal = result;
			if (_self.isFormal == 2) {
				uni.setNavigationBarTitle({
					title: '福彩到家-77派'
				})
				uni.setTabBarItem({
					index: 1,
					text: '开奖'
				})
				uni.setTabBarItem({
					index: 2,
					text: '福彩到家'
				})
			}

		},
		methods: {
			// 判断有没有code，有则 获取用户信息，没有引导用户进入授权页面
			wxLogin() {
					var appId = 'wxeb23f51daa27076e';
					var url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appId + "&redirect_uri=" + location.href
						.split('#')[0] + "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect"
					var code = _self.getUrlParam("code");
					// 从登录uni.switchTab进入index页面进入后 会重新执行onLoad 要判断code是否相同
					// uni.setStorageSync('happenCode',code)
					if (!code) {
						window.location.href = url;
					} else {
						common.request({
							path: 'login/getcoder',
							method: 'GET',
							data: code,
							success: async (result) => {
								console.log('主页_res', result)
								let user = result.data;
								// 判断用户是否登录注册
								// 没有ID，则没有登录 或 注册，进入登录注册页面
								if (!!user.ID) { //  如果 那就直接登录
									uni.setStorageSync("openid", user.openId);
									uni.setStorageSync("userinfo", result.data);
									common.setstate(result.data);
								} else { // 没有ID  那显示注册
									// 没有 ID ，注册可以获取体验券
									_self.receive = true;
									let userForLogin = {
										nickName: user.openinfo.nickname,
										openId: user.openinfo.openid,
										avatarUrl: user.openinfo.headimgurl,
										gender: user.openinfo.sex
									};
									uni.setStorageSync('userforlogin', userForLogin)
									uni.setStorageSync("openid", result.data.openinfo.openid); //	未注册时获取的openid
								}
									// 返回 true 才是在湘潭市，不需要做操作，在判断是否是湘潭市的时候，如果是false就已经 return false 了。这里主要是用来在判断完成之前，提示新注册用户 去获取优惠券不要弹窗，否则在判断不是湘潭市的同时，也会弹窗 去获取优惠券。
								await _self.handleIsCity()
								
								if (!!_self.receive) {
									_self.receive = false;
									let confirmYHQ = await common.showModal('恭喜您！！', '您获取了一张优惠体验券，注册即可领取', 'none', true, '领取体验', '等会再去');
									if(confirmYHQ) uni.navigateTo({url: "/pages/login/userLogin"})
								}
								
							},
							fail: (err) => {
								console.log('主页没有进入回调', err)
							}
						})
					}

			},
			// 公众号 解析url上是否有code参数
			getUrlParam(name) {
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
				var r = window.location.search.substr(1).match(reg);
				if (r != null) return unescape(r[2]);
				return null;
			},
			// H5 判断位置 方法 该方法的参数 res1 为 js-sdk getLocation的返回结果
			isTrueCity(res1) {
				return new Promise((resolve,reject)=>{
					let {
						latitude,
						longitude
					} = res1;
					uni.setStorageSync('jingwei', {latitude,longitude})
					// 获取 城市名称
					common.request({
						path: 'Order/getaddress',
						data: {
							latitude,
							longitude
						},
						success: async (result) => {
							// 测试人员不需要判断位置 开始
							let phoneList = ['15084968801', '张宾','18932181335', '月半', '朱林军℡¹⁸⁸⁹⁰³⁹⁵⁵⁰⁰', '小文君', ".", '15073163280', '15868879789',
								'18890395500', '15974242945', '18528020801'
							]
							let testName = (uni.getStorageSync('userforlogin')).nickName
							let testPhone = (uni.getStorageSync('userinfo')).mobile
							
							let nameIndex = phoneList.findIndex((item) => {
								return testName == item
							})
							let phoneIndex = phoneList.findIndex((item) => {
								return testPhone == item
							})
							if (nameIndex != -1 || phoneIndex != -1) {
								_self.isOk = true;
								uni.showTabBar();
								resolve(true) // 测试人员返回 true,假定他在湘潭
								// return false;
								// 测试人员不需要判断位置 结束
							}else{
								let city = result.data.openinfo.result.address_component.city;
								console.log('city',city)
								if (city != "湘潭市") {
									let currentPosition = await common.showModal('提示！！', '您不在服务区范围内');
									if(currentPosition) {
										jweixin.closeWindow(); //正式上线放开注释！！！！！！！！
										resolve(false)
										return false;					//正式上线放开注释！！！！！！！！
										
									}
								} else {	// 在湘潭市，显示页面
									_self.isOk = true;
									uni.showTabBar();
									resolve(true)
								}
							}
						}
					})
				})
			},

			// H5 只有在湘潭市，才会继续显示页面，否则退出页面进入会话
			handleIsCity() {
				return new Promise((resolve,reject)=>{
					// H5判断在不在湘潭
					common.request({
						path: 'login/getcode',
						method: 'GET',
						// 传入 url 到后台换取配置config参数
						data: encodeURIComponent(location.href.split('#')[0]),
						success:async (res3)=> {
							console.log('signPackage',res3)
							let signPackage = res3.data;
							
							try{
								let flagCity = await wxSdk.getlocation(signPackage, _self.isTrueCity)
								resolve(flagCity)
							}catch(err){
								let errMsg = await common.showModal('温馨提示',err)
								jweixin.closeWindow();
								return false
							}
						},
						fail(err) {
							console.log('bbbb', err);
							reject(err)
						}
					})
				})
			},

			// 去往新闻详情页
			goNewsDetail(item) {
				uni.navigateTo({
					url: '../news/newsDetail?item=' + encodeURIComponent(JSON.stringify(item))
				})
			},
			// 获取资讯
			getNews() {
				common.request({
					path: 'Development/getnewlist',
					data: {
						type: '1',
						page: 1,
						rows: 10,
					},
					success: (res) => {
						res.data.rows.forEach(item => {
							item.image = common.PicURL + item.image;
						})
						_self.news = res.data.rows;
					},
				})
			},
			getVersion() {
				return new Promise((resolve, reject) => {
					common.request({
						path: 'login/getversion',
						method: 'GET',
						success: (res) => {
							if (res.info == '响应成功') {
								resolve(res.data.Version);
							} else {
								reject(res.info)
							}
						}
					})
				})
			},
			async getAdress() { // 小程序 获取用户的经纬度 得到城市
				let isRightCity = await common.getCity;
				if (isRightCity != "湘潭市") return common.showModal('提示', '您不在服务区范围内', 'none', false)
			},
			// 小程序 opid获取判断 是否是用户
			hangdleOpid() {
				uni.login({
					provider: 'weixin',
					success(loginResult) {
						// 获取微信登录的code:授权码
						const code = loginResult.code;
						common.request({
							path: "login/selecttoken",
							method: "GET",
							data: code,
							success: (res) => { // 是否有openid 是否曾经注册过
								if (res.data.ID) { //  如果 那就直接登录
									uni.setStorageSync("openid", res.data.openId);
									uni.setStorageSync("userinfo", res.data);
									common.setstate(res.data);
								} else { // 没有openid  那显示注册
									uni.setStorageSync("openid", res.data.openinfo.openid); //	未注册时获取的openid								
									// uni.navigateTo({
									// 	url: "/pages/login/userLogin"
									// })
								}
							}
						})
					}
				})
			},
			// 获取轮播数据
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

			// 获取七彩乐开奖历史
			getQicai() {
				common.request({
					path: "Development/getpage",
					data: {
						rows: 1,
						page: 1,
						sidx: "PrizeTime",
						sord: "desc",
						caizhongid: "3"
					},
					success: res => {
						uni.setStorageSync('qilecai', res.data.qishu)
						res.data.rows.forEach(elem => {
							elem.RedBall = elem.RedBall.split(",")
						})
						_self.qicai = res.data.rows
					}
				})
			},
			// 获取福彩开奖历史
			getFucai() {
				common.request({
					path: "Development/getpage",
					// method:'POST',
					data: {
						rows: 1,
						page: 1,
						sidx: "PrizeTime",
						sord: "desc",
						caizhongid: "2"
					},
					success: res => {
						uni.setStorageSync('threed', res.data.qishu)
						res.data.rows.forEach(elem => {
							elem.RedBall = elem.RedBall.split(",")
						})
						_self.fucai = res.data.rows
					}
				})
			},
			// 获取双色球开奖历史
			getKaijiang() {
				common.request({
					path: "Development/getpage",
					// method:'POST',
					data: {
						rows: 1,
						page: 1,
						sidx: "PrizeTime",
						sord: "desc",
						caizhongid: "1"
					},
					success: res => {
						uni.setStorageSync('shuangseqiu', res.data.qishu)
						res.data.rows.forEach(elem => {
							if (elem.RedBall) {
								elem.RedBall = elem.RedBall.split(",")
							}
						})
						_self.shuangse = res.data.rows;

					}
				})
			},
			handleGua() { // 刮刮乐
				uni.setStorageSync('type', 'guaguale')
				uni.switchTab({
					url: "../getHome/getHome",
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.index_content {
		width: 95%;
		margin: 10rpx auto 0;
	}

	.blcak {
		color: #aaa;
	}

	.card_wrap {
		display: flex;
		margin: 15rpx 0;
		text-align: center;

		.card_item {
			width: 33.33%;

			.card_icon {
				width: 120rpx;
				margin: 15rpx auto;

				image {
					width: 120rpx;
					border-radius: 50%;
				}
			}

			.card_title {
				font-size: 32rpx;
			}

			.card_text {
				font-size: 26rpx;
				color: #666;
			}
		}
	}

	.caijuan_wrap {
		display: flex;
		justify-content: space-between;
		margin-top: 30rpx;

		.caijuan_item {
			display: flex;
			justify-content: space-around;
			width: 31%;
			background-color: #eeeeee;
			height: 100rpx;
			align-items: center;

			image {
				width: 23%;
			}

			.caijuan_text {
				display: flex;
				align-items: center;
			}
		}
	}

	.fenge_bg {
		width: 90%;
		margin: 20rpx auto;
		image{
			width:100%;
		}
	}

	.kaijiang_wrap {
		margin-top: 30rpx;

		.kaijiang_header {
			display: flex;
			justify-content: space-between;
			padding-left: 15rpx;

			.kaijiang_title {
				border-left: 10rpx solid $color;
				font-size: 30rpx;

				text {
					margin-left: 15rpx;
				}
			}

			.kaijiang_btn {
				font-size: 26rpx;

				text {
					margin-left: 5rpx;
				}
			}
		}

		.kaijiang_item {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			margin-top: 20rpx;
			background-color: #eee;
			height: 160rpx;

			&:last-of-type {
				margin-bottom: 20rpx;
			}

			.kaijiang_item_icon {
				flex: 0.9;
				display: flex;
				flex-direction: column;
				align-items: center;
				margin-left: -10rpx;

				image {
					width: 80rpx;
				}

				.icon_text {}
			}

			.kaijiang_item_content {
				flex: 3;
				height: 100%;
				overflow: hidden;
				display: flex;
				flex-direction: column;
				justify-content: space-around;

				.content_text {
					font-size: 26rpx;

					text {
						margin-left: 8rpx;
					}
				}

				.content_qiu {
					display: flex;
					justify-content: flex-start;
					align-items: center;

					text {
						display: block;
						width: 55rpx;
						height: 55rpx;
						background-color: $color;
						text-align: center;
						line-height: 55rpx;
						border-radius: 50%;
						color: #fff;
						margin-left: 10rpx;
					}

					.blue_num {
						background-color: blue;
					}
				}

				.content_info {
					font-size: 24rpx;
					color: #ccc;
					margin-top: 15rpx;
				}
			}

			.qiu_btn {
				width: 60rpx;
				height: 100%;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;

				image {
					width: 20%;
					height: 100%;
					display: block;
				}
			}
		}
	}


	.index_specil {
		.index_specil_content {
			.index_specil_banner {}

			.news {
				background-color: #F5F5F5;

				.news_main {
					margin-top: 20rpx;
					padding: 0 40rpx;

					.news_item {
						display: flex;
						padding: 45rpx 42rpx 30rpx;
						border-bottom: 1rpx solid #E7E7E7;

						.news_item_title {
							width: 374rpx;
							margin-right: 46rpx;
							display: flex;
							flex-direction: column;
							justify-content: space-between;

							.news_item_title_name {
								text-overflow: ellipsis;
								display: -webkit-box;
								/* autoprefixer: off */
								// 不能省略
								-webkit-box-orient: vertical;
								-webkit-line-clamp: 3;
								word-break: break-all;
								overflow: hidden;
							}

							.news_item_title_time {
								font-size: 24rpx;
							}


						}

						.news_item_img {
							width: 242rpx;
							height: 174rpx;
							border-radius: 14rpx;
							overflow: hidden;

							image {
								width: 242rpx;
								height: 174rpx;
							}
						}
					}
				}
			}
		}
	}
</style>
