<template>
	<view class="gethome" v-if="isFormal == 2">
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
		<view class="scroll_wrap">
			<view class="scroll_one">
				<view v-for="(item,indexOne) in text" :key="indexOne" 
					class="scroll_title" 
					:class="{active:indexOne == midPlat}"
					@click="handleActive(indexOne)" 
				>
					<text>{{item.name}}</text>
				</view>
				<view class="scroll_item" v-if="isHide && isFormal == 2">					
					<view v-for="(item,index) in guagualeMenu" :key='index' 
						class="scroll_info" 
						@click="handleGua(index,item)"
						:class="{active:index == Plat}"
					>					
						<text class="scroll_text">{{item.F_ItemName}}</text>
					</view>
				</view>
			</view>
			
			<view class="scroll_two" v-if="midPlat == 0">				
				<view class="scroll_item" v-for="item in selectCode" :key="item.title" @tap="goDetailPage(item.url)">
					<image :src="item.pic" mode="widthFix"></image>
					<view class="item_text">{{item.title}}</view>
					<view class="item_duanxin">模拟选号</view>
				</view>
			</view>
			
			
				<scroll-view scroll-y v-if="midPlat == 1" class="scroll_two" @scrolltolower='onReachBtn'>
					<view class="scroll_item" v-for="(item,index) in guagualeList" :key="index" @click="handleGuaInfo(item)">
						<image class="ggl_img" :src="item.Images" mode="widthFix"></image>
						<view class="item_text">{{item.Tite}}</view>
						<view class="item_duanxin">福豆兑换</view>
					</view>
					<view class="title" v-if="Merchants">没有更多啦!!!</view>
				</scroll-view>
			
		</view>
	</view>	
	<view v-else class="gethomeWall">
		<view class="readAll">
			<view class="title">最近阅读</view>
			<view class="title_info">
				<view class="title_item">包图每日精选</view>
				<view class="title_item">BY包图中文</view>
				<view class="title_item">最美应用</view>
				<view class="title_item">包图妹妹在找</view>
			</view>
		</view> 
		<view class="followAll">
			<view class="follow_name">最新关注</view>
			<view class="follow_info">
				<view class="follow_item">
					<view class="follow_img">
						<image src="https://fucai.yiruit.com/UpFiles/tupian/img1.png" mode="aspectFill"></image>
					</view>
					<view class="follow_title">时尚与娱乐</view>
				</view>
				<view class="follow_item">
					<view class="follow_img">
						<image src="https://fucai.yiruit.com/UpFiles/tupian/img2.png" mode="aspectFill"></image>
					</view>
					<view class="follow_title">运动与健康</view>
				</view>
				<view class="follow_item">
					<view class="follow_img">
						<image src="https://fucai.yiruit.com/UpFiles/tupian/img3.png" mode="aspectFill"></image>
					</view>
					<view class="follow_title">旅游与美食</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import SwiperItem from "../../components/swiper/SwiperItem.vue";
	import swiperImg from '@/components/hswiper/swiper.vue'
	import common from '../../common/common';
	var _self;
	export default {
		components: {
			SwiperItem,
			swiperImg
		},
		data() {
			return {	
				isFormal:2,
				banner: [],
				selectCode: [
					{
						title: "双色球",
						url: "../selectCode/selectCode",
						sureUrl:'../kaijiang/shuangseDetail',
						pic: "https://fucai.yiruit.com/UpFiles/shouye/shuangseqiu.png"
					},
					{
						title: "七乐彩",
						url: "../selectCode/selectCodeqicai",
						sureUrl:'../kaijiang/qilecaiDetail',
						pic: "https://fucai.yiruit.com/UpFiles/shouye/qilecai.png"
					},
					{
						title: "福彩3D",
						url: "../selectCode/selectThreeD",
						sureUrl:'../kaijiang/fucaiDetail',
						pic: "https://fucai.yiruit.com/UpFiles/shouye/fucai3d.png "
					}
				],
				text: [
					{
						id:0,
						name:'福彩到家'
					},
					{
						id:1,
						name:'刮刮乐'
					}
				],
				guagualeMenu:[],
				guagualeList:[],				
				isHide:false,
				midPlat:0,
				Plat:0,
				total:0,
				page:1,
				Merchants:false,
				F_ItemValue:''
			}
		},
		onLoad() {
			_self = this;
			 // _self.getTitle();
			
		},
		async onShow(options) {
			
			let result = await _self.getVersion();
			_self.isFormal = result
			if(!!uni.getStorageSync('type')){
				_self.midPlat = 1;
				_self.Plat = 0;
				_self.isHide = true;
				_self.guagualeQuest(2,1)
			}else{
				_self.midPlat = 0;
				_self.Plat = 1;
				_self.isHide = false;
			}
			getApp().globalData.saveNum = [];
			_self.getIndex();
			if(_self.isFormal == 2){
				uni.setNavigationBarTitle({  // 设置title
				　　title:'福彩到家'
				})
				
			}
		},
		onHide() {
			uni.removeStorageSync('type')			
		},
		methods: {
			// goDetail
			goDetail(sureUrl){
				uni.navigateTo({
					url:sureUrl
				})
			},
			// 获取标题
			getTitle(){
					common.request({
						path:'Development/getname',
						success:(res)=>{
							_self.text = res.data.rows
						}
					})
			},
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
						res.data.rows.forEach(element => {
							element.Images = common.PicURL + element.Images
						});
						_self.banner = res.data.rows
					}
				})
			},	
			// 获取刮刮乐
			guagualeQuest(types,page){
				common.request({
					path: "Order/getscraping",
					// method:'POST',
					data: {
						types:types,
						rows: 6,
						page: page,
						sidx: "",
						sord: "desc",
					},
					success: res => {
						_self.guagualeMenu = res.data.type1;						
						res.data.rows.forEach(element => {
							element.Images = common.PicURL + '/UpFiles/tupian/le.png'
						});						
						_self.guagualeList = [..._self.guagualeList,...res.data.rows];						
						_self.total = res.data.total
					}
				})
				// _self.isHide = false;
			},
			goDetailPage(url) {
				uni.navigateTo({
					url,
				})
			},
			handleActive(i) {
				_self.midPlat = i;		
				_self.guagualeList = [];
				_self.Merchants = false;
				if(i === 1){
					_self.isHide = true;
					_self.Plat = 0;
					_self.guagualeQuest(1,1)
				}else{
					_self.isHide = false					
				}				
				_self.text.forEach(element => {
					i === element.id ? element.isActive = true : element.isActive = false;
				});
			},
			handleGua(i,_list){
				_self.F_ItemValue = _list.F_ItemValue
				_self.Plat = i;				
				_self.guagualeList = [];										
				_self.Merchants = false;
				_self.guagualeQuest(_self.F_ItemValue,1)
			},
			onReachBtn(){  // 下拉
				_self.page += 1;
				if(_self.page > _self.total){
					_self.Merchants = true;
					return
				}
				_self.guagualeQuest(_self.F_ItemValue,1)
			},
			handleGuaInfo(_list){				
				uni.navigateTo({
				     url: '../selectOrder/selectOrder?type=4&item=' + (JSON.stringify(_list)), // 去购买
				})
			}
		}
	}
</script>
<style lang="scss">
	.gethome {
		background-color: #faf6f7;
	}
	.scroll_wrap {
		display: flex;
		padding: 20rpx;
		.scroll_one {
			flex: 1;
			background-color: #fff;
			border-radius: 10rpx;
			.scroll_title {
				font-size: 34rpx;
				font-weight: bolder;
				text-align: center;
				margin-top: 35rpx;
				text{
					color: #999;
					font-weight: normal;
				}
			}
			>.active {
				border-left: 10rpx solid $color;	
				text{
					font-weight: bold;
					color: #333;
				}
			}
			.scroll_item{
				width: 100%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				.scroll_info{
					width: 80%;
					height: 80rpx;
					line-height: 80rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					border-bottom: 1px solid #eee;					
					&:last-of-type{
						border-bottom: none;
					}
					&:first-of-type{
						margin-top: 40rpx;
						border-top: 1px solid #eee;
					}
					.scroll_text{
						font-size: 28rpx;
					}
				}
				>.active {
					text{
						border-left: 10rpx solid $color;	
						font-weight: bold;
						color: #333;					
						width: 100%;
						height: 40rpx;
						line-height: 40rpx;
						text-align: center;
					}
				}
			}
		}

		.scroll_two {
			flex: 3;
			height: calc(100vh - 360rpx);
			background-color: #fff;
			margin-left: 15rpx;
			border-radius: 10rpx;
			.title{
				width: 100%;
				text-align: center;
				padding: 40rpx 0;
				color: #ccc;
			}
			.scroll_item {
				display: flex;
				justify-content: space-around;
				align-items: center;
				padding: 20rpx 0;
				border-bottom: 1px solid #eee;
				>image {
					width: 100rpx;
					height: 100rpx;
					border-radius: 50%;
				}
				>.ggl_img{
					width: 100rpx;
					height: 100rpx;
					border-radius: 50%;
				}
				.item_duanxin {
					background-color: #e5e5e5;
					width: 120rpx;
					height: 50rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					border-radius: 8rpx;
					font-size: 12px;
				}
			}
		}
	}
	.gethomeWall{
		margin: 0 auto;
		background: #f5f5f5;
		.readAll{
			padding: 0 20rpx 30rpx;
			height: auto;
			overflow: hidden;
			background-color: #fff;
			.title{
				font-size: 36rpx;
				color: #333;
				height: 100rpx;
				line-height: 100rpx;
			}
			.title_info{
				display: flex;
				justify-content: space-between;
				flex-direction: row;
				flex-wrap: wrap;
				.title_item{
					width: 45%;
					height: 80rpx;
					line-height: 80rpx;
					padding-left: 10rpx;
					margin-top: 20rpx;
					background-color: #f8f9fe;
					color: #666;
					font-size: 30rpx;
				}
			}			
		}
		.followAll{			
			padding: 0 20rpx;		
			background: #fff;
			overflow: hidden;
			margin-top: 20rpx;
			.follow_name{
				font-size: 36rpx;
				color: #333;
				height: 100rpx;
				line-height: 100rpx;
			}
			.follow_info{
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				justify-content: space-between;
				padding: 10rpx 0 20rpx;
				.follow_item{
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					align-items: center;
					width: 32%;
					height: 200rpx;
					background-color: #fff;
					.follow_img{
						width: 100%;
						height: 150rpx;
						image{
							width: 100%;
							height: 100%;
						}
					}
					.follow_title{
						font-size: 28rpx;
						color: #666;
					}					
				}
			}
		}
	}
</style>
