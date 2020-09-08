<template>
	<view class="giveSelect">
		<!-- <view class="giveselect_tabs"> -->
		<!-- <uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type="button" active-color="#ff3c35"></uni-segmented-control> -->
		<view class="content">
			<!-- 门店自提开始 -->
			<block v-if="current == 0 ||current == 2">
				<!-- v-if 自提 显示网点列表-->
				<view class="give_search" v-if="!fromBuy">
					<!-- <text class="iconfont icon-dizhi"></text> -->
					<view class="search">
						<uni-search-bar :radius="20" placeholder="搜索附近门店" @confirm="search" @input="input"></uni-search-bar>
					</view>
				</view>
				<!-- 搜索列表开始 -->
				<view class="search_wrap">
					<!-- <view class="search_item" v-for="(item) in adressList" :key="item.F_CompanyId"  @click="handleSuer(item.F_CompanyId,item.F_FullName,item.distance,'',item.F_Address,item.F_latitude,item.F_longitude)"> -->


					<view class="search_item" v-for="(item) in adressList" :key="item.F_CompanyId">
						<view class="search_item_left">
							<view class="search_left_title">
								<text class="iconfont icon-dizhi" @tap='goAddress(item)' v-if="!fromBuy"></text>
								<text class="iconfont icon-dizhi" @tap='goAddress(item)' v-else></text>
							</view>
							<view class="search_left_text" @click="handleSuer(item)">
								<view class="search_left_text_name">{{item.F_FullName}}</view>
								<view class="search_left_text_address">{{item.F_Address}}</view>
							</view>
						</view>
						<view class="search_item_right">
							<view class="search_right_num" v-if='item.distance != null'>{{item.distance}}km</view>
						</view>
					</view>


					
				</view>
				<!-- 搜索列表结束 -->
			</block>
			<!-- 门店自提结束 -->
			<!-- 外送开始 -->
			<view v-else>
				<!-- v-if 外送 显示送货地址列表-->
				<view class="songhuo_wrap">
					<view class="songhuo_item" v-for="(item,index) in shouhuoList" :key="index">
						<view class="songhuo_item_left" @click="handleSuer(item.ID,item.Address,item.MemberID, item.Defaule)">
							<!-- <view class="songhuo_item_left" @click="handleSuer(item)"> -->
							<view class="songhuo_title">
								<text v-if="item.Defaule == 1" style="color:red;">[默认]</text>
								{{item.Address}}
							</view>
							<view class="songhuo_info">{{item.Name}}<text>{{item.Phone}}</text></view>
						</view>
						<view class="songhuo_btn">

							<view class="songhuo_btn_item" @click="handleUpdate(index,item)">编辑</view>
							<view class="songhuo_btn_item" @click="handleDelete(index)">删除</view>
						</view>
					</view>
				</view>
			</view>
			<view class="add_address" @tap="addAddress" v-if="current == 1">添加收货地址</view>
			<!-- 外送结束 -->
		</view>
	</view>
</template>
<script>
	import uniSegmentedControl from "../../components/uni-segmented-control/uni-segmented-control.vue";
	import uniSearchBar from '../../components/uni-search-bar/uni-search-bar/uni-search-bar.vue';
	import common from '../../common/common';
	// #ifdef H5
	import wxSdk from '../../common/wx-sdk.js'
	const jweixin = require('jweixin-module');
	// #endif
	var _self;
	export default {
		components: {
			uniSegmentedControl,
			uniSearchBar
		},
		data() {
			return {
				items: ['门店自提', '送货上门'],
				current: 0,
				shouhuoList: [],
				adressList: [],
				id: "",
				fromBuy: false
			}
		},
		onLoad(options) {
			_self = this;
			_self.current = parseInt(options.current);
			_self.fromBuy = options.from;
			uni.setStorageSync('current', _self.current)
		},
		onShow() {
			if (_self.current == 0) {
				uni.setNavigationBarTitle({
					title: '门店自提'
				});
				_self.getWanddian();
			} else if (_self.current == 1) {
				uni.setNavigationBarTitle({
					title: '配送地址'
				});
				_self.getAdress();
				// _self.getWanddian();
			} else { //_self.current == 2
				uni.setNavigationBarTitle({
					title: '旗舰托管'
				});
				_self.getWanddian();
			}
		},
		onHide() {
			_self.fromBuy = false;
		},
		methods: {
			// 点击删除地址
			handleDelete(index) {
				let id = _self.shouhuoList[index].ID;
				common.request({
					path: "Development/deladdress",
					data: id,
					success: res => {
						// _self.shouhuoList = res.data.rows
					}
				});
				_self.shouhuoList.forEach((element, index) => {
					if (element.ID == id) {
						_self.shouhuoList.splice(index, 1);
					}
				});
			},
			// 添加收货地址
			addAddress() {
				uni.navigateTo({
					url: '../setadress/setAdress'
				})
			},
			// 确认选择 收货地址	======================================================
			handlequeding(name, id) {
				uni.setStorageSync("outlets", {
					id,
					name,
					juli: null,
				});
				uni.navigateBack({
					delta: 1
				});
			},
			// onClickItem(e) {
			// 	if (_self.id == 1) {
			// 		return;
			// 	}

			// 	if (this.current !== e.currentIndex) {
			// 		this.current = e.currentIndex;
			// 	}
			// },
			// 导航按钮
			goAddress(item) {
				let latitude = parseFloat(item.F_latitude);
				let longitude = parseFloat(item.F_longitude);
				let name = item.F_FullName
				let address = item.F_Address
				// #ifdef H5
				// H5 配置 wx.config
				common.request({
					path: 'login/getcode',
					method: 'GET',
					data: encodeURIComponent(location.href.split('#')[0]),
					success(res) {
						let signPackage = res.data;
						wxSdk.initJssdk(signPackage);
						let dataAddress = {
							latitude,
							longitude,
							name,
							address,
						}
						wxSdk.openlocation(dataAddress)
					}
				})
				// #endif
			},
			// 确认选择网点 
			handleSuer(id, name, juli, defaule, address, latitude, longitude) { // ===================
				console.log('item', id);
				let item = id
				// handleSuer(item) {	// ===================
				if (!!_self.fromBuy) { // 从购买页面 余额不足 弹框进入此页面
					console.log('goumai', item);
					let latitude = parseFloat(item.F_latitude);
					let longitude = parseFloat(item.F_longitude);
					let name = item.F_FullName
					let address = item.F_Address
					uni.setNavigationBarTitle({
						title: '附近彩票网点'
					});
					console.log(latitude, longitude, name, address)
					// #ifdef H5
					// H5 配置 wx.config
					common.request({
						path: 'login/getcode',
						method: 'GET',
						data: encodeURIComponent(location.href.split('#')[0]),
						success(res) {
							let signPackage = res.data;
							wxSdk.initJssdk(signPackage);
							let dataAddress = {
								latitude,
								longitude,
								name,
								address,
							}
							console.log('dataAddress', dataAddress)
							console.log('从购买页面 余额不足 弹框进入此页面_dataAddress', dataAddress);
							wxSdk.openlocation(dataAddress)
							return false;
						}
					})
					// #endif
					// #ifdef MP-WEIXIN
					uni.openLocation({
						latitude,
						longitude,
						success() {},
						fail(err) {}
					})
					// #endif
					return false;
				}
				if (_self.current == 0 || _self.current == 2) {
					console.log('adressList', _self.adressList);
					console.log('item', item);
					// 等于 0  缓存选择的 wangdian 等于 2  缓存选择的 flagshipStor
					let id = item.F_CompanyId;
					let name = item.F_FullName;
					let juli = item.distance;
					let address = item.F_Address;
					let latitude = parseFloat(item.F_latitude)
					let longitude = parseFloat(item.F_longitude)
					let storName = _self.current == 0 ? "wangdian" : "flagshipStor";
					uni.setStorageSync(storName, {
						id,
						name,
						juli,
						address,
						latitude,
						longitude
					});
					uni.navigateBack({
						delta: 1
					});
					return;
				}
				// 等于 1  缓存选择的 收货地址
				uni.setStorageSync("outlets", {
					id: id,
					name: name,
					memberid: juli,
					defaule,
				});
				wx.navigateBack({
					delta: 1
				});
			},
			search(e) {
				e.value = "";
			},
			input(e) {
				// if(e.value.trim()){
				_self.getWanddian(e.value)
				// }else{
				//   _self.adressList = []
				// }
			},
			// 获取网点列表
			getWanddian(val) {
				const {
					latitude,
					longitude
				} = uni.getStorageSync("jingwei"); // 获取 缓存 经纬度
				common.request({
					path: "Order/getoutlets", // 获取网点列表
					data: {
						name: val, // 搜索的网点名称
						longitude,
						latitude,
						rows: 7, // 当前页码
						page: 1, // 页数
						sidx: "",
						sord: ""
					},
					success: res => {
						let index;
						res.data.rows.forEach(elem => {
							if (elem.distance != null) {
								index = elem.distance.indexOf(".");
								elem.distance = elem.distance.slice(0, index + 2);
							}
						})
						// 判断 _self.current == 0,获取全部网点，_self.current ==2,获取旗舰店
						if (_self.current == 0) {
							_self.adressList = res.data.rows
							console.log('_self.adressList_all', _self.adressList);
						} else { //  _self.current ==2
							console.log('_self.current', _self.current);
							let flagshipStor = res.data.rows.filter((item) => {
								return item.F_ParentId === '0';
							})
							_self.adressList = flagshipStor;
							console.log('_self.adressList_alone', _self.adressList)
						}


					}
				})
			},
			// 点击修改地址
			handleUpdate(i, item) {
				let id = "";
				_self.shouhuoList.forEach((element, index) => {
					if (i == index) {
						uni.setStorageSync("adress", element);
						id = element.ID
					}
				});
				wx.navigateTo({
					url: '../setadress/setAdress?&id=' + id + '&item=' + JSON.stringify(item),
				});
			},
			// 获取送货地址列表
			getAdress() {
				let {
					ID
				} = uni.getStorageSync("userinfo");
				common.request({
					path: "Development/getaddress",
					data: ID,
					success: res => {
						_self.shouhuoList = res.data.rows;
					}
				});

			}
		},
		// watch: {
		// 	current(val) {
		// 		if (val == 0) {
		// 			_self.getWanddian()
		// 		} else {
		// 			_self.getAdress();_self.getWanddian()
		// 		}
		// 	}
		// },
	}
</script>
<style lang="scss" scoped>
	.giveSelect {
		background-color: #f7f5f6;
		height: 100vh;

		.giveselect_tabs {
			width: 80%;
			height: 36rpx;
			border-radius: 18rpx;
		}

		.content {

			.give_search {
				display: flex;
				align-items: center;
				background-color: #fff;
				width: 94%;
				margin: 20rpx auto 0;
				// padding-left: 20rpx;

				// border-radius: 8rpx;
				.search {
					width: 100%;
					// margin-left: 20rpx;
				}
			}

			.search_wrap {
				.search_item {
					display: flex;
					justify-content: space-between;
					width: 88%;
					margin: 20rpx auto 0;
					padding: 20rpx;
					align-items: center;
					background-color: #fff;
					border-radius: 8rpx;

					.search_item_left {
						display: flex;

						.search_left_title {
							display: flex;
							justify-content: center;
							align-items: center;
							margin-right: 20rpx;
						}

						.search_left_text {
							color: #999;
							margin-top: 10rpx;

							.search_left_text_name {
								color: black;
							}
						}
					}

					.search_item_right {
						text-align: right;

						.search_right_num {
							color: #999;
						}

						.search_right_btn {
							color: $color;
							margin-top: 10rpx;
						}
					}
				}
			}

			.songhuo_wrap {
				.songhuo_item {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin: 0 auto;
					padding: 20rpx;
					margin-top: 15rpx;
					background-color: #fff;
					width: 90%;

					.songhuo_item_left {
						flex: 5;

						.songhuo_title {
							font-size: 30rpx;
						}

						.songhuo_info {
							font-size: 24rpx;
							color: #999;
							margin-top: 20rpx;
						}
					}

					.songhuo_btn {
						display: flex;
						height: 100%;
						justify-content: space-between;
						align-items: center;
						flex: 2;

						.songhuo_item_right {
							color: #999;
							font-size: 24rpx;
						}

						.songhuo_btn_item {
							color: #999;
							margin-left: 30rpx;
						}
					}

				}
			}
		}

		.add_address {
			position: fixed;
			width: 80%;
			left: 50%;
			-webkit-transform: translateX(-50%);
			transform: translateX(-50%);
			height: 70rpx;
			background-color: #ff3c36;
			color: #fff;
			text-align: center;
			line-height: 70rpx;
			bottom: 50rpx;
			border-radius: 35rpx;
		}
	}
</style>
