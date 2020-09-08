<template>
	<view class="qilecai_detail">
		<view class="qilecai_detail_wrap">
			<view class="qilecai_detail_item" v-for="item in qicai" :key="item.ID">
				<view class="qilecai_detail_header">
					<view class="qilecai_detail_title">
						<text>第{{item.PeriodsNumber}}期</text>
					</view>
					<view class="content_text black">
						<text>{{item.PrizeTime}}</text>
					</view>
				</view>
				<view class="qilecai_item_content">
					<view class="content_qiu">
						<view class="qiu-wrap">
							<text class="qiu_num" v-for="(red,i) in item.RedBall" :key="i">{{red}}</text>
							<text class="qiu_num bull-num">{{item.BlueBall}}</text>
						</view>
					</view>
					<navigator :url="item.codeUrl" class="qilecai_btn" v-if="isFormal == 2">模拟选号</navigator>
				</view>
			</view>
		</view>
		<view class="title" v-if="Merchants">没有更多啦!!!...</view>
	</view>
</template>
<script>
	import common from "../../common/common";
	var _self;
	export default {
		data() {
			return {
				isFormal:1,
				num: 3,
				qicai: [],
				page:1,
				total:'',
				Merchants:false,
			};
		},
		onLoad() {
			_self = this;
			_self.getQicai(1);
		},
		onShow() {
			_self.getVersion().then(res=>{
				_self.isFormal = res
			})
		},
		onReachBottom(){      // 页面触底事件
			_self.page += 1;   // 当前页数
			if(_self.page > _self.total){				
				_self.Merchants = true;				
				return
			}				
			_self.getQicai(_self.page);
		},
		methods: {
			//
			getVersion(){
				return new Promise((resolve,reject)=>{
					common.request({
						path:'login/getversion',
						method:'GET',
						success:(res)=>{
							if(res.info == '响应成功'){
								resolve(res.data.Version);
							}else{
								reject(res.info)
							}
						}
					})
				})
			},
			getQicai(page) {
				common.request({
					path: "Development/getpage",
					// method:'POST',
					data: {
						rows: 5,
						page: page,
						sidx: "PrizeTime",
						sord: "desc",
						caizhongid: "3"
					},
					success: res => {						
						res.data.rows.forEach(elem => {
							elem.RedBall = elem.RedBall.split(",");
							elem.codeUrl = "../selectCode/selectCodeqicai";
						});
						_self.qicai = [..._self.qicai,...res.data.rows];
						_self.total = res.data.total;
					}
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.title{
		width: 100%;
		text-align: center;
		padding: 40rpx 0;
		color: #ccc;
	}	
	.qilecai_detail {
		background-color: #f6f6f6;
		height: 100vh;

		.qilecai_detail_wrap {
			margin-top: 30rpx;

			.qilecai_detail_item {
				margin-top: 20rpx;
				background-color: #fff;
				padding-top: 10px;

				.qilecai_detail_header {
					display: flex;
					padding-left: 15rpx;
					align-items: center;

					.qilecai_detail_title {
						border-left: 10rpx solid $color;
						font-size: 34rpx;
						font-weight: bolder;
						letter-spacing: 2rpx;

						text {
							margin-left: 15rpx;
						}
					}

					.content_text {
						font-size: 26rpx;
						margin-left: 15rpx;

						text {
							margin-left: 8rpx;
						}
					}
				}

				.qilecai_item_content {
					margin-top: 25rpx;
					padding: 0 10rpx;

					.content_qiu {
						display: flex;
						align-items: center;
						margin-top: 20rpx;

						.qiu-wrap {
							display: flex;

							.qiu_num {
								width: 65rpx;
								height: 65rpx;
								font-size: 30rpx;
								margin-left: 15rpx;
								background-color: $color;
								border-radius: 50%;
								display: flex;
								color: #fff;
								justify-content: center;
								align-items: center;
								margin-left: 10rpx;
							}

							.bull-num {
								background-color: blue;
							}
						}
					}

					.qilecai_btn {
						text-align: center;
						border-top: 1rpx solid #eee;
						color: #999;
						padding: 10rpx 0;
						height: 40rpx;
						line-height: 40rpx;
						font-size: 30rpx;
						margin-top: 15rpx;
					}
				}
			}
		}
	}
</style>
