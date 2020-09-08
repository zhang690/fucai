<template>
	<view class="setAdress">
		<view class="setAdress_wrap">
			<!-- 联系人开始 -->
			<view class="input_item">
				<view class="input_title">联系人</view>
				<view class="input">
					<input type="text" placeholder="用于送货时对您的称呼" v-model="name" />
				</view>
			</view>
			<!-- 联系人结束 -->
			<view class="input_item">
				<view class="input_title">手机号</view>
				<view class="input">
					<input type="number" placeholder="请输入您的手机号码" v-model="phone" />
				</view>
			</view>
			<view class="input_item">
				<view class="input_title">详细地址</view>
				<view class="input">
					<input type="text" placeholder="请填写您的详细地址，具体到门牌号" v-model="adress" />
				</view>
			</view>
			<view class="defalut_address">
				<view class="defalut_address_text">是否设置为默认地址</view>
				<switch class="defalut_address_open" :checked='checked' @change="changeIdea"></switch>
			</view>
		</view>
		<view class="setAdress_btn">
			<view class="btn_text" @click="handleAdd">保存</view>
		</view>
	</view>
</template>

<script>
	import common from "../../common/common";
	var _self;
	export default {
		data() {
			return {
				checked: false,
				defaultIdea: false,
				name: "",
				phone: "",
				adress: "",
				id: "0"
			};
		},

		onLoad(options) {
			_self = this;
			// 判断 map ,有 则是从 地图上选择的位置 到此页面
			if (options.map) {
				let timer = setTimeout(() => {
					uni.setStorageSync('current', options.current);
					_self.name = '';
					_self.adress = JSON.parse(decodeURIComponent(options.map)).address;
					_self.phone = '';
					clearTimeout(timer);
				}, 1000);

			}

			// 编辑页面 过来，判断是否是在编辑 默认地址
			if (options.item) {
				let Defaule = JSON.parse(options.item).Defaule;
				_self.checked = Defaule == '1' ? true : false;
			}

			_self.id = options.id; // 收货地址id,有，则证明是从点击的 编辑 到此页面
			let user = wx.getStorageSync("adress");
			if (user != null || user != undefined) {
				_self.name = user.Name;
				_self.adress = user.Address;
				_self.phone = user.Phone;
			}
			if (!_self.id) { // 收货地址id,没有，则证明是从点击的 添加地址 到此页面
				_self.name = '';
				_self.phone = '';
				_self.adress = '';
			}
		},
		methods: {
			changeIdea(e) {
				this.defaultIdea = e.detail.value
			},
			handleAdd() {
				// 判断输入信息不为空 正则电话号码
				if (!(/^1[3456789]\d{9}$/.test(_self.phone))) {
					uni.showToast({
						title: '电话号码格式不正确，请重新输入',
						icon: 'none'
					})
					return false;
				} else if (_self.name.trim().length <= 0 || _self.adress.trim().length <= 0) {
					uni.showToast({
						title: '联系人或收货地址格式不正确，请重新输入',
						icon: 'none'
					})
					return false;
				}

				let {
					ID
				} = wx.getStorageSync("userinfo");
				let Defaule = this.defaultIdea ? '1' : '0';
				if (_self.id === undefined) {
					common.request({
						path: "Development/addupadderss",
						data: {
							MemberID: ID,
							Address: _self.adress,
							Name: _self.name,
							Phone: _self.phone,
							Defaule // 是否设为默认地址
						},
						success: res => {

						}
					});
				} else {
					common.request({
						path: "Development/addupadderss",
						data: {
							ID: _self.id,
							MemberID: ID,
							Address: _self.adress,
							Name: _self.name,
							Phone: _self.phone,
							Defaule // 是否设为默认地址
						},
						success: res => {

						}
					});  
				}
				var pages = getCurrentPages();
				var prevPage = pages[pages.length - 2];
				prevPage.backData = {
					MemberID:ID,
					Address:_self.adress,
					Name: _self.name,
					Phone: _self.phone,
				}
				uni.navigateBack({
					delta: 1,
				})
			}
		}
	};
</script>
<style lang="scss" scoped>
	.setAdress {
		background-color: #f7f5f6;
		height: 100vh;

		.setAdress_wrap {
			background-color: #fff;

			.input_item {
				display: flex;
				padding: 20rpx;
				border-bottom: 1rpx solid #eee;

				.input_title {
					font-weight: bold;
				}

				.input {
					flex: 1;
					margin-left: 50rpx;
					color: #999;

					input {
						width: 100%;
					}
				}
			}
		}

		.setAdress_btn {
			position: fixed;
			bottom: 50rpx;
			width: 100%;

			.btn_text {
				width: 80%;
				height: 70rpx;
				background-color: #ff3c36;
				color: #fff;
				margin: 0 auto;
				text-align: center;
				line-height: 70rpx;
				border-radius: 35rpx;
			}
		}

		.defalut_address {
			margin-top: 10rpx;
			display: flex;
			padding: 10rpx 40rpx;
			-webkit-box-sizing: border-box;
			box-sizing: border-box;
			justify-content: space-between;
			align-items: center;

			.defalut_address_text {
				letter-spacing: 4rpx;
			}

			.defalut_address_open {
				transform: scale(0.6);
			}
		}
	}
</style>
