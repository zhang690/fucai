<template>
	<view class="kaijiang_page" v-if="isFormal == 2" >
		<!-- 轮播开始 -->
			<!-- #ifdef MP-WEIXIN -->
			<swiper-item :banner="banner"></swiper-item>
			<!-- #endif -->
			<!-- #ifdef H5 -->
			<swiperImg :banner="banner"
				 :indicatorDots="false" 
				 :autoplay="true" 
				 :interval="3000" 
				 :duration="500" 
			 />
			<!-- #endif -->
		
		<!-- 轮播结束 -->
		<!-- 彩票开始 -->
		<view class="kaijiang_wrap">			
			<view class="kaijiang_item" v-for="item in shuangse" :key="item.ID">				
				<view class="kaijiang_header">
					<view class="kaijiang_title">
						<text>{{item.title}}</text>
					</view> 
					<view class="content_text black">
						第{{item.PeriodsNumber}}期
						<text>{{item.PrizeTime}}</text>
					</view>
				</view>
				<navigator open-type="navigate" :url="item.url"  class="kaijiang_item_content">
					<view class="content_qiu">
						<view class="qiu-wrap"><text class="qiu_num" v-for="(red,index) in item.RedBall" :key="index">{{red}}</text><text class="qiu_num bull-num">{{item.BlueBall}}</text></view>
					</view>
					<view class="kaijiang_btn black">
						更多
					</view>
				</navigator>
				
				<navigator v-if="isFormal ==2" open-type="navigate" :url="item.codeUrl" class="kaijiang_item_btn">
					模拟选号
				</navigator>
			</view>
			
			<view class="kaijiang_item" v-for="item in qicai" :key="item.ID">
				<view class="kaijiang_header">
					<view class="kaijiang_title">
						<text>{{item.title}}</text>
					</view> 
					<view class="content_text black">
						第{{item.PeriodsNumber}}期
						<text>{{item.PrizeTime}}</text>
					</view>
				</view>
				<navigator open-type="navigate" :url="item.url" class="kaijiang_item_content">
					<view class="content_qiu">
						<view class="qiu-wrap">
							<text class="qiu_num" v-for="(redq, ind) in item.RedBall" :key="ind">{{redq}}</text>
							<text class="qiu_num bull-num">{{item.BlueBall}}</text>
						</view>
					</view>
					<view class="kaijiang_btn black">
						更多
					</view>
				</navigator>
				<navigator v-if="isFormal ==2" open-type="navigate" :url="item.codeUrl" class="kaijiang_item_btn">
					模拟选号
				</navigator>
			</view>
			
			<view class="kaijiang_item" v-for="item in fucai" :key="item.ID">
				<view class="kaijiang_header">
					<view class="kaijiang_title">
						<text>{{item.title}}</text>
					</view> 
					<view class="content_text black">
						第{{item.PeriodsNumber}}期
						<text>{{item.PrizeTime}}</text>
					</view>
				</view>
				
				
				<navigator open-type="navigate" :url="item.url" class="kaijiang_item_content">
					<view class="content_qiu">
						<view class="qiu-wrap" ><text class="qiu_num" v-for="(redf,i) in item.RedBall" :key="i">{{redf}}</text></view>
					</view>
					<view class="kaijiang_btn black">
						更多
					</view>
				</navigator>
				<navigator v-if="isFormal ==2" open-type="navigate" :url="item.codeUrl" class="kaijiang_item_btn">
					模拟选号
				</navigator>
				
			</view>  
		</view>

		<!-- 彩票结束 -->
	<!-- 	<view class="kaijiang_footer">
			<image src="../../static/kaijiang/banner.png" mode="widthFix"></image>
		</view> -->
		<!-- 备注 -->
		<view class="beizhu">
			<view class="item">数据来源于福利彩票官网</view>
			<view class="item">(http://www.cwl.gov.cn)</view>
			<view class="item">请以福彩官网公布的数据为准</view>			
		</view>
	</view>
	<view class="kaijiangWall" v-else>  
		<view class="searchWall">
			<view class="searchInput" @click="hangdleSearch">				
				<input type="text" value="" placeholder="发现" placeholder-style='text-align: center;'/>
			</view>
			<view class="searchBtn">
				<image src="../../static/search.png" mode="aspectFill"></image>
			</view>
		</view>
		<view class="kaijiang_Info">
			<view class="kaijiang_Item" v-for="(item,index) in getListArray" :key="index" @tap="goDetail(item)">
				<view class="kaijiang_Img">
					<image :src="item.image" mode="aspectFill"></image>
				</view>
				<view class="kaijiang_item">
					<view class="title">{{item.Title}}</view>
					<view class="title_info">
						<view class="title_name">#旅行攻略</view>
						<view class="title_item">
							<view class="title_img"><image src="../../static/pinglun.png" mode=""></image></view>
							<view class="title_num">150</view>
							<view class="title_more">···</view>
						</view>						
					</view>
				</view>
			</view>
		</view>
	</view>	
</template>
<script>
	import common from '../../common/common';
	import SwiperItem from "../../components/swiper/SwiperItem.vue";
	import swiperImg from '@/components/hswiper/swiper.vue';
	var _self;
	export default {
		components: {
			SwiperItem,
			swiperImg
		},
		data() {
			return {
				isFormal:2,
				shuangse:[],
				qicai:[],
				fucai:[],
				banner: [],
				getListArray:[]
			};
		},
		onLoad(){
			
		},
		onShow() {
			_self = this;
			_self.getVersion()		
			
			getApp().globalData.saveNum = [];
			_self.getQicai();
			_self.getKaijiang();
			_self.getFucai();
			wx.removeStorageSync("outlets");
			_self.getIndex();
			
			_self.getList().then(res=>{		
				res.rows.forEach(item=>{
					item.image = common.PicURL+item.image;
				})
				_self.getListArray = res.rows
			})
			
		},
		methods: {
			// 跳转新闻详情
			goDetail(item){
				uni.navigateTo({
					url:'../news/newsDetail?item='+encodeURIComponent(JSON.stringify(item))
				})
			},
			getList(){
				return new Promise((resolve,reject)=>{
					common.request({
						path:'Development/getnewlist',
						data:{
							type:1,
							rows: 20,
							page: 1,
						},
						success:(res)=>{
							
							if(res.info == '响应成功'){
								resolve(res.data);
							}else{
								reject(res.info)
							}
						}
					})
				})
			},	
			//判断
			getVersion(){
					common.request({
						path:'login/getversion',
						method:'GET',
						success:(res)=>{
							_self.isFormal = res.data.Version
							if(_self.isFormal == 2){
								uni.setNavigationBarTitle({  // 设置title
								　　title:'开奖'
								})
								
							}
						}
					})
			},
			goDetailPage(url){
				uni.navigateTo({
					url
				})
			},
			// 获取轮播数据
			getLunbo() {
				return new Promise((resolve,reject)=>{
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
							resolve(res.data.rows)
						}
					})
				})
			},
			async getIndex(){
				let res = await _self.getLunbo()
				res.forEach(element => {
					element.Images = common.PicURL + element.Images
				})
				_self.banner = res
			},
			// 获取七彩乐开奖历史
			getQicai(){
				common.request({
					path: "Development/getpage",
					// method:'POST',
					data: {
						rows: 1,
						page: 1,
						sidx: "PrizeTime",
						sord: "desc",
						caizhongid:"3"
					},
					success: res => {
						res.data.rows.forEach(elem=>{
							elem.RedBall = elem.RedBall.split(",");
							elem.title = "七乐彩";
						elem.url = "./qilecaiDetail";
						elem.codeUrl = "../selectCode/selectCodeqicai";
						})
						_self.qicai = res.data.rows
					}
				})
			},
			// 获取福彩开奖历史
			getFucai(){
				common.request({
					path: "Development/getpage",
					// method:'POST',
					data: {
						rows: 1,
						page: 1,
						sidx: "PrizeTime",
						sord: "desc",
						caizhongid:"2"
					},
					success: res => {
						res.data.rows.forEach(elem=>{
							elem.RedBall = elem.RedBall.split(",");
							elem.title = "福彩3D";
							elem.url = "./fucaiDetail";
							elem.codeUrl = "../selectCode/selectThreeD";
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
						caizhongid:"1"
					},
					success: res => {
						res.data.rows.forEach(elem => {
							if (elem.RedBall) {
								elem.RedBall = elem.RedBall.split(",");
							}
							elem.title = "双色球";
								elem.url = "./shuangseDetail";
								elem.codeUrl = "../selectCode/selectCode";
						})
						_self.shuangse = res.data.rows;
					}
				})				
			},
			hangdleSearch(){
				uni.navigateTo({
					url:'./search'
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.kaijiang_page {
		.kaijiang_wrap {
			margin-top: 30rpx;
			background-color: #e8e8e8;

			.kaijiang_item {
				margin: 20rpx 0;
				padding: 15rpx 0;
				background-color: #fff;

				.kaijiang_header {
					display: flex;
					padding-left: 15rpx;
					align-items: center;

					.kaijiang_title {
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

				.kaijiang_item_content {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-top: 25rpx;
					padding: 0 10rpx;

					.content_qiu {
						display: flex;
						align-items: center;
						margin-top: 20rpx;
						.qiu-wrap{
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
						}
						.bull-num{
							background-color: blue;
						}
						}
						
					}

					.kaijiang_btn {
						font-size: 26rpx;
						margin-right: 20rpx;

						text {
							margin-left: 5rpx;
						}
					}
				}

				.kaijiang_item_btn {
					text-align: center;
					color: #666;
					border-top: 1rpx solid #eee;
					padding: 10rpx 0;
					height: 40rpx;
					font-size: 30rpx;
					line-height: 40rpx;
					margin-top:15rpx;
				}
			}
		}
		.kaijiang_footer{
			width: 90%;
			margin: 0 auto;
			padding-bottom: 20rpx;
		}
	}
	.beizhu{
		margin: 30rpx auto;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	    .item{
			font-size: 30rpx;
			color: #ccc;
		}
	}
	.kaijiangWall{
		
		.searchWall{
			background-color: #fff;
			padding: 0 20rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-around;
			height: 120rpx;
			border-bottom: 1px solid #eee;
			.searchInput{
				flex: 1;	
				height: 120rpx;
				input{
					width: 100%;
					height: 120rpx;
					text-align: center;
				}
			}
			.searchBtn{
				width: 80rpx;
				height: 120rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				image{
					display:block;
					width: 40rpx;
					height: 40rpx;
				}
			}
		}
		.kaijiang_Info{
			padding: 20rpx;
			background-color: #fff;
			.kaijiang_Item{	
				height: auto;
				border-bottom: 1px solid #eee;
				margin-bottom: 30rpx;
				.kaijiang_Img{
					width: 100%;
					height: 400rpx;
					image{
						display: flex;
						width: 100%;
						height: 100%;
					}
				}
				.kaijiang_item{	
				
					.title{
						height: 100rpx;
						line-height: 100rpx;
						font-size: 30rpx;
						color: #333;
						overflow: hidden;
						text-overflow:ellipsis;
						white-space: nowrap;
						padding-right: 30rpx;
					}
					.title_info{
						display: flex;
						flex-direction: row;
						justify-content: space-between;
						align-items: center;
						height: 60rpx;
						margin-bottom: 20rpx;
						.title_name{
							color: #333;
							font-size: 30rpx;
						}
						.title_item{
							display: flex;
							flex-direction: row;
							width: 170rpx;
							justify-content: space-between;
							align-items: center;
							.title_img{
								width: 40rpx;
								height: 35rpx;	
								image{
									display: block;
									width: 100%;
									height: 100%;	
								}
							}
							.title_num{
								font-size: 15px;
								color: #666;
								margin-right: 36rpx;
							}
							.title_more{
								font-size: 18px;
								color: #666;
							}
						}
					}					
				}
			}
		}
	}
</style>
